// 1) CONFIG -------------------------------------------------

const API_URL = "http://localhost:5000/api/cats"; // ปรับตาม backend 
const REFRESH_INTERVAL = 5000;                     // ดึงข้อมูลแมวใหม่ทุก 5 วิ

// รายชื่อห้องและจำนวนกล้องต่อห้อง (ปรับตามจริง)
const ROOMS = [
  { name: "Hall", cameras: 1, cameraUrl: "http://ip-camera-url-1" }, // URL กล้อง IP
  { name: "Kitchen",    cameras: 1, cameraUrl: "http://ip-camera-url-2" },
  { name: "Garage",     cameras: 1, cameraUrl: "http://ip-camera-url-3" },
  { name: "Garden",  cameras: 1, cameraUrl: "http://ip-camera-url-4" }
];

// 2) STATE --------------------------------------------------
let cats = [];                 // แมวทั้งหมด
let selectedCatId = null;      // แมวในหน้า detail
let refreshTimer = null;       // setInterval ดึงแมว

let currentRoomIndex = null;   // index ห้องปัจจุบันใน ROOMS
let currentCameraIndex = 0;    // index กล้อง (0‑based)
let cameraTimestampTimer = null; // setInterval สำหรับ timestamp

// 3) STARTUP ------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  fetchCatDataFromAPI();
  refreshTimer = setInterval(updateCatData, REFRESH_INTERVAL);
});

// 4) API HANDLERS ------------------------------------------

function fetchCatDataFromAPI() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      cats = data;
      renderCatCards(cats);
    })
    .catch(handleFetchError);
}

function updateCatData() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      cats = data;
      renderCatCards(cats);
      updateOpenCatDetail();
    })
    .catch(handleFetchError);
}

function handleFetchError(err) {
  console.error("❌ ไม่สามารถโหลดข้อมูลแมว:", err);
  if (!document.body.dataset.alerted) {
    alert("ไม่สามารถเชื่อมต่อ API ได้ กรุณาตรวจสอบว่า Flask ทำงานอยู่หรือไม่");
    document.body.dataset.alerted = "true";
  }
}

// 5) RENDER (CAT GALLERY) ----------------------------------

function renderCatCards(catList) {
  const container = document.querySelector(".cat-grid");
  if (!container) return;
  container.innerHTML = "";

  const seen = new Set();
  catList.forEach((cat) => {
    if (seen.has(cat.name)) return; // ข้ามชื่อซ้ำ
    seen.add(cat.name);

    const card = document.createElement("div");
    card.className = "cat-card";
    card.onclick = () => selectCat(cat.name); 

    card.innerHTML = `
      <img src="${cat.image_url}" alt="${cat.name}" class="cat-image">
      <h3>${cat.name}</h3>
    `;
    container.appendChild(card);
  });
}

// ฟังก์ชันแสดงหน้า Cat Page
function showCatPage() {
  selectedCatId = null;
  currentRoomIndex = null;
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("cameraPage").classList.add("hidden");
  document.getElementById("catPage").classList.remove("hidden");
  document.getElementById("catDetailPage").classList.add("hidden");
}

// 6) CAT DETAIL --------------------------------------------

function selectCat(catName) {
  const cat = cats.find((c) => c.name === catName);
  if (!cat) return;

  selectedCatId = catName;
  document.getElementById("catDetailName").textContent = cat.name;
  document.getElementById("catProfileName").textContent = `Name ${cat.name}`;
  document.getElementById("catDetailImage").src = cat.image_url;
  document.getElementById("catLocation").textContent = cat.current_room || "ไม่ทราบ";

  document.getElementById("catPage").classList.add("hidden");
  document.getElementById("catDetailPage").classList.remove("hidden");
}

function goBackToCatGallery() {
  selectedCatId = null;
  document.getElementById("catDetailPage").classList.add("hidden");
  document.getElementById("catPage").classList.remove("hidden");
}

// 7) ROOM & CAMERA NAVIGATION ------------------------------

function selectRoom(index) {
  if (index < 0 || index >= ROOMS.length) return;
  currentRoomIndex = index;
  currentCameraIndex = 0; // เริ่มต้นที่กล้องแรกของห้อง

  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("cameraPage").classList.remove("hidden");

  updateCameraUI(); // อัปเดตข้อมูลกล้องและชื่อห้อง

  if (cameraTimestampTimer) clearInterval(cameraTimestampTimer);
  cameraTimestampTimer = setInterval(() => {
    document.getElementById("timestamp").textContent = new Date().toLocaleString();
  }, 1000);
}

function updateCameraUI() {
  const room = ROOMS[currentRoomIndex];
  const totalRooms = ROOMS.length;  // จำนวนห้องทั้งหมด
  const totalCamerasInRoom = room.cameras; // จำนวนกล้องในห้อง
  const isFirstCameraOverall = currentRoomIndex === 0 && currentCameraIndex === 0;
  const isLastCameraOverall = currentRoomIndex === totalRooms - 1 && currentCameraIndex === totalCamerasInRoom - 1;

  // แสดงชื่อห้อง
  document.getElementById("currentRoomName").textContent = `${room.name}`; 

  // ข้อมูลกล้อง ("กล้อง 1 จาก 4")
  document.getElementById("cameraInfo").textContent = `กล้อง ${currentRoomIndex + 1} จาก ${totalRooms}`;

  // URL ของ IP Camera
  document.getElementById("cameraFeed").innerHTML = `<iframe width="100%" height="100%" src="${room.cameraUrl}" frameborder="0"></iframe>`;

  // ปุ่มก่อนหน้า/ถัดไป
  const prevBtn = document.querySelector(".camera-controls .nav-btn:first-child");
  const nextBtn = document.querySelector(".camera-controls .nav-btn:last-child");
  prevBtn.disabled = isFirstCameraOverall;
  nextBtn.disabled = isLastCameraOverall;

  // อัปเดต timestamp เริ่มต้น
  document.getElementById("timestamp").textContent = new Date().toLocaleString();
}

function previousCamera() {
  if (currentRoomIndex === null) return;
  const totalRooms = ROOMS.length;  // จำนวนห้องทั้งหมด
  if (currentRoomIndex > 0) {
    currentRoomIndex--;  // ย้อนกลับไปห้องก่อนหน้า
  }
  updateCameraUI(); // อัปเดต UI
}

function nextCamera() {
  if (currentRoomIndex === null) return;
  const totalRooms = ROOMS.length;  // จำนวนห้องทั้งหมด
  if (currentRoomIndex < totalRooms - 1) {
    currentRoomIndex++; // ไปห้องถัดไป
  }
  updateCameraUI(); // อัปเดต UI
}

function goBack() {
  currentRoomIndex = null;
  if (cameraTimestampTimer) {
    clearInterval(cameraTimestampTimer);
    cameraTimestampTimer = null;
  }
  document.getElementById("cameraPage").classList.add("hidden");
  document.getElementById("homePage").classList.remove("hidden");
}



// 8) PAGE NAVIGATION --------------------------------------

function showCatPage() {
  selectedCatId = null;
  currentRoomIndex = null;
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("cameraPage").classList.add("hidden");
  document.getElementById("catPage").classList.remove("hidden");
  document.getElementById("catDetailPage").classList.add("hidden");
}

function showHomePage() {
  selectedCatId = null;
  currentRoomIndex = null;
  if (cameraTimestampTimer) {
    clearInterval(cameraTimestampTimer);
    cameraTimestampTimer = null;
  }
  document.getElementById("homePage").classList.remove("hidden");
  document.getElementById("cameraPage").classList.add("hidden");
  document.getElementById("catPage").classList.add("hidden");
  document.getElementById("catDetailPage").classList.add("hidden");
}

// 9) HAMBURGER MENU ---------------------------------------

function toggleMenu() {
  const menu = document.getElementById("navMenu");
  const overlay = document.getElementById("menuOverlay");
  const hamburgerBtn = document.querySelector(".hamburger-btn");

  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    menu.classList.add("show");
    overlay.classList.add("show");
    hamburgerBtn.classList.add("active");
    hamburgerBtn.innerHTML = ""; // ไอคอน X (ถ้ามี)
  } else {
    closeMenu();
  }
}

function closeMenu() {
  const menu = document.getElementById("navMenu");
  const overlay = document.getElementById("menuOverlay");
  const hamburgerBtn = document.querySelector(".hamburger-btn");

  menu.classList.remove("show");
  overlay.classList.remove("show");
  hamburgerBtn.classList.remove("active");
  hamburgerBtn.innerHTML = "☰";

  setTimeout(() => menu.classList.add("hidden"), 300);
}
