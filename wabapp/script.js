

// ข้อมูลห้อง
const rooms = [
    { name: 'Hall', id: 'Hall' },
    { name: 'Kitchen', id: 'kitchen' },
    { name: 'Garage', id: 'Garage' },
    { name: 'Garden', id: 'Garden' }
  ];

  // ข้อมูลการแจ้งเตือน
  const alerts = [
    {
      id: 1,
      type: 'movement',
      title: 'Orange ถูกตรวจพบความเคลื่อนไหวที่ผิดปกติ',
      content: 'ตรวจพบการเคลื่อนไหวด้านนอกเวลา 15:12 น. 25/02/2568',
      cat: 'Orange',
      priority: 'high',
      timestamp: '2024-02-25 15:12:00',
      date: '2024-02-25'
    },
    {
      id: 2,
      type: 'feeding',
      title: 'Orange กินข้าวเวลาที่ตั้งไว้แล้ว',
      content: 'กินข้าวช่วงเช้าครบตามกำหนด',
      cat: 'Orange',
      priority: 'low',
      timestamp: '2024-02-25 08:30:00',
      date: '2024-02-25'
    },
    {
      id: 3,
      type: 'sleeping',
      title: 'Gray หลับนานผิดปกติ',
      content: 'หลับติดต่อกันเกิน 14 ชั่วโมง',
      cat: 'Gray',
      priority: 'medium',
      timestamp: '2024-02-24 20:15:00',
      date: '2024-02-24'
    },
    {
      id: 4,
      type: 'unusual',
      title: 'White มีพฤติกรรมแปลก',
      content: 'วิ่งไปมาในห้องนั่งเล่นอย่างต่อเนื่อง',
      cat: 'White',
      priority: 'medium',
      timestamp: '2024-02-24 16:45:00',
      date: '2024-02-24'
    },
    {
      id: 5,
      type: 'movement',
      title: 'Black ไม่มีความเคลื่อนไหว',
      content: 'ไม่พบความเคลื่อนไหวนานกว่า 3 ชั่วโมง',
      cat: 'Black',
      priority: 'high',
      timestamp: '2024-02-23 14:20:00',
      date: '2024-02-23'
    }
  ];

  let filteredAlerts = [...alerts];

  // ข้อมูล Notifications
  const notifications = [
    {
      id: 1,
      title: 'Orange ออกจากพื้นที่บ้าน!',
      message: 'ตรวจพบใน Kitchen',
      time: 'เมื่อ 18:20 น. 22/02/2568',
      cat: 'Orange',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=50&h=50&fit=crop',
      isRead: false,
      isOnline: true
    },
    {
      id: 2,
      title: 'Orange กลับมาที่บ้านแล้ว!',
      message: 'ตรวจพบใน Hall',
      time: 'เมื่อ 18:20 น. 22/02/2568',
      cat: 'Orange',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=50&h=50&fit=crop',
      isRead: false,
      isOnline: true
    },
    {
      id: 3,
      title: 'Orange ไม่กินอาหาร 12 ชั่วโมง!',
      message: 'ตรวจพบความผิดปกติ',
      time: 'เมื่อ 18:12 น. 26/02/2568',
      cat: 'Orange',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=50&h=50&fit=crop',
      isRead: false,
      isOnline: false
    },
    {
      id: 4,
      title: 'XXX กลับมาที่บ้านแล้ว!',
      message: 'ตรวจพบใน XXX',
      time: 'เมื่อ xx:xx น. dd/mm/yyyy',
      cat: 'Unknown',
      image: null,
      isRead: true,
      isOnline: false
    },
    {
      id: 5,
      title: 'XXX ออกจากพื้นที่บ้าน!',
      message: 'ตรวจพบใน XXX',
      time: 'เมื่อ xx:xx น. dd/mm/yyyy',
      cat: 'Unknown',
      image: null,
      isRead: true,
      isOnline: false
    },
    {
      id: 6,
      title: 'XXX กลับมาที่บ้านแล้ว!',
      message: 'ตรวจพบใน XXX',
      time: 'เมื่อ xx:xx น. dd/mm/yyyy',
      cat: 'Unknown',
      image: null,
      isRead: true,
      isOnline: false
    }
  ];

  // ข้อมูลแมว
  const cats = [
    {
      name: 'Orange',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
      location: 'Hall',
      stats: 'Playful',
      status: 'active'
    },
    {
      name: 'Gray',
      image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&h=300&fit=crop',
      location: 'Kitchen',
      stats: 'Sleepy',
      status: 'resting'
    },
    {
      name: 'White',
      image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=300&h=300&fit=crop',
      location: 'Garden',
      stats: 'Calm',
      status: 'active'
    },
    {
      name: 'Black',
      image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop',
      location: 'Garage',
      stats: 'Alert',
      status: 'active'
    },
    {
      name: 'Striped',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop',
      location: 'Garden',
      stats: 'Hunting',
      status: 'active'
    },
    {
      name: 'Calico',
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&h=300&fit=crop',
      location: 'Hall',
      stats: 'Relaxed',
      status: 'resting'
    }
  ];

  let currentRoomIndex = 0;

  // ฟังก์ชันเลือกห้อง
  function selectRoom(roomIndex) {
    currentRoomIndex = roomIndex;
    showCameraPage();
  }

  // แสดงหน้ากล้อง
  function showCameraPage() {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('cameraPage').classList.remove('hidden');
    updateCameraInfo();
    startTimestamp();
  }

  // กลับไปหน้าหลัก
  function goBack() {
    document.getElementById('cameraPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
    stopTimestamp();
  }

  // ฟังก์ชันเมนูแฮมเบอร์เกอร์
  function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const overlay = document.getElementById('menuOverlay');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    if (menu.classList.contains('hidden')) {
      menu.classList.remove('hidden');
      menu.classList.add('show');
      overlay.classList.add('show');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.innerHTML = '';
    } else {
      closeMenu();
    }
  }

  function closeMenu() {
    const menu = document.getElementById('navMenu');
    const overlay = document.getElementById('menuOverlay');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    menu.classList.remove('show');
    overlay.classList.remove('show');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.innerHTML = '☰';

    setTimeout(() => {
      menu.classList.add('hidden');
    }, 300);
  }

  // แสดงหน้าหลัก
  function showMainPage() {
    document.getElementById('cameraPage').classList.add('hidden');
    document.getElementById('catPage').classList.add('hidden');
    document.getElementById('catDetailPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
  }

  // แสดงหน้า Home (เหมือนกับ showMainPage)
  function showHomePage() {
    document.getElementById('cameraPage').classList.add('hidden');
    document.getElementById('catPage').classList.add('hidden');
    document.getElementById('catDetailPage').classList.add('hidden');
    document.getElementById('statisticsPage').classList.add('hidden');
    document.getElementById('alertsPage').classList.add('hidden');
    document.getElementById('notificationsPage').classList.add('hidden');
    document.getElementById('profilePage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
    
  }

  // แสดงหน้า Cat
  function showCatPage() {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('catPage').classList.remove('hidden');
    document.getElementById('profilePage').classList.add('hidden');
  }

  // แสดงหน้า Statistics
  function showStatisticsPage() {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('catPage').classList.add('hidden');
    document.getElementById('catDetailPage').classList.add('hidden');
    document.getElementById('cameraPage').classList.add('hidden');
    document.getElementById('statisticsPage').classList.remove('hidden');
    document.getElementById('profilePage').classList.add('hidden');

    // เริ่มต้นการตั้งค่าตัวกรองวันที่
    updateDateFilter();

    // อัพเดทสถิติเมื่อเปิดหน้า
    updateStatistics();
    drawChart();
  }

  // แสดงหน้าสถิติของแมวจากหน้าข้อมูลแมว
  function showCatStatisticsPage() {
    // ดึงข้อมูลแมวที่กำลังดูอยู่จากชื่อในหน้า
    const currentCatName = document.getElementById('catDetailName').textContent;
    const catIndex = cats.findIndex(cat => cat.name === currentCatName);

    // ตั้งค่า dropdown ให้ตรงกับแมวที่เลือก
    if (catIndex !== -1) {
      document.getElementById('catSelect').value = catIndex;
    }

    // ซ่อนหน้าข้อมูลแมวและแสดงหน้าสถิติ
    document.getElementById('catDetailPage').classList.add('hidden');
    document.getElementById('statisticsPage').classList.remove('hidden');

    // เริ่มต้นการตั้งค่าตัวกรองวันที่
    updateDateFilter();

    // อัพเดทสถิติ
    updateStatistics();
    drawChart();
  }

  // อัพเดทสถิติตามแมวที่เลือก
  function updateStatistics() {
    const selectedCatIndex = document.getElementById('catSelect').value;
    const selectedCat = cats[selectedCatIndex];

    // อัพเดทชื่อในหัวข้อ
    document.getElementById('statisticsTitle').textContent = `${selectedCat.name}'s Statistics`;

    // สร้างข้อมูลสถิติแบบสุ่มตามแมวที่เลือก
    const statsData = generateRandomStats(selectedCat.name);

    document.getElementById('totalMovement').textContent = `${statsData.movement} นาที`;
    document.getElementById('sleepTime').textContent = `${statsData.sleep} ชั่วโมง`;
    document.getElementById('eatTime').textContent = `${statsData.eat} นาที`;

    // วาดกราฟใหม่
    drawChart();
  }

  // อัพเดทตัวกรองวันที่
  function updateDateFilter() {
    const periodSelect = document.getElementById('periodSelect');
    const monthSelect = document.getElementById('monthSelect');

    // แสดง/ซ่อน dropdown เดือนตามประเภทที่เลือก
    if (periodSelect.value === 'daily' || periodSelect.value === 'monthly') {
      monthSelect.style.display = 'block';
    } else {
      monthSelect.style.display = 'none';
    }
  }

  // ค้นหาสถิติ
  function searchStatistics() {
    const period = document.getElementById('periodSelect').value;
    const year = document.getElementById('yearSelect').value;
    const month = document.getElementById('monthSelect').value;
    const cat = document.getElementById('catSelect').value;

    console.log(`ค้นหาสถิติ: ${period}, ปี ${year}, เดือน ${month}, แมว ${cats[cat].name}`);

    // อัพเดทกราฟและข้อมูลตามการค้นหา
    updateStatistics();
    drawChart();
  }

  // สร้างข้อมูลสถิติแบบสุ่ม
  function generateRandomStats(catName) {
    const baseStats = {
      'Orange': { movement: 280, sleep: 9.2, eat: 55 },
      'Gray': { movement: 150, sleep: 12.5, eat: 35 },
      'White': { movement: 200, sleep: 10.0, eat: 40 },
      'Black': { movement: 320, sleep: 8.5, eat: 60 },
      'Striped': { movement: 350, sleep: 7.8, eat: 65 },
      'Calico': { movement: 180, sleep: 11.2, eat: 38 }
    };

    return baseStats[catName] || baseStats['Orange'];
  }

  // วาดกราฟอย่างง่าย (จำลอง)
  function drawChart() {
    const canvas = document.getElementById('statsChart');
    const ctx = canvas.getContext('2d');

    // ตั้งค่าขนาด canvas
    canvas.width = 600;
    canvas.height = 200;

    // ล้างกราฟ
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // วาดกรอบ
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 20, 500, 150);

    // วาดเส้นกราฟ
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();

    // สร้างข้อมูลกราหแบบสุ่ม
    const dataPoints = [];
    for (let i = 0; i < 7; i++) {
      dataPoints.push(Math.random() * 100 + 20);
    }

    // วาดเส้นกราฟ
    for (let i = 0; i < dataPoints.length; i++) {
      const x = 70 + (i * 70);
      const y = 170 - (dataPoints[i] * 1.2);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // วาดจุด
      ctx.fillStyle = '#667eea';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.stroke();

    // เพิ่มข้อความ
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // ป้ายชื่อวัน
    const days = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'];
    for (let i = 0; i < days.length; i++) {
      const x = 70 + (i * 70);
      ctx.fillText(days[i], x, 190);
    }

    // ชื่อกราฟ
    ctx.font = '14px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('กราฟแสดงความเคลื่อนไหวรายวัน', 300, 15);
  }

  // ตัวแปรเก็บหน้าที่เข้ามาจาก
  let previousPage = 'home';

  // แสดงหน้า Alerts
  function showAlertsPage() {
    // ตรวจสอบว่าเข้ามาจากหน้าไหน
    const catDetailPage = document.getElementById('catDetailPage');
    if (!catDetailPage.classList.contains('hidden')) {
      // เข้ามาจากหน้าข้อมูลแมว
      previousPage = 'catDetail';
      
      // ดึงชื่อแมวจากหน้าข้อมูลแมว
      const currentCatName = document.getElementById('catDetailName').textContent;
      
      // กรองข้อมูล alerts ให้แสดงเฉพาะแมวตัวนั้น
      filteredAlerts = alerts.filter(alert => alert.cat === currentCatName);
      
      // ตั้งค่า filter dropdown ให้ตรงกับแมวที่เลือก
      document.getElementById('catFilter').value = currentCatName;
    } else {
      // เข้ามาจากหน้าอื่น (เมนู) แสดงทุกการแจ้งเตือน
      previousPage = 'home';
      filteredAlerts = [...alerts];
    }

    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('catPage').classList.add('hidden');
    document.getElementById('catDetailPage').classList.add('hidden');
    document.getElementById('statisticsPage').classList.add('hidden');
    document.getElementById('cameraPage').classList.add('hidden');
    document.getElementById('alertsPage').classList.remove('hidden');
    document.getElementById('profilePage').classList.add('hidden');
    
    renderAlerts();
  }

  // แสดง/ซ่อน Filter
  function toggleFilter() {
    const filterSection = document.getElementById('filterSection');
    const filterBtn = document.querySelector('.filter-btn');
    
    if (filterSection.classList.contains('hidden')) {
      filterSection.classList.remove('hidden');
      filterBtn.textContent = '🔼';
    } else {
      filterSection.classList.add('hidden');
      filterBtn.textContent = '🔽';
    }
  }

  // ใช้ตัวกรอง
  function applyFilters() {
    const typeFilter = document.getElementById('alertTypeFilter').value;
    const catFilter = document.getElementById('catFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    filteredAlerts = alerts.filter(alert => {
      let matchType = typeFilter === 'all' || alert.type === typeFilter;
      let matchCat = catFilter === 'all' || alert.cat === catFilter;
      let matchDate = !dateFilter || alert.date === dateFilter;
      
      return matchType && matchCat && matchDate;
    });

    renderAlerts();
  }

  // ล้างตัวกรอง
  function clearFilters() {
    document.getElementById('alertTypeFilter').value = 'all';
    document.getElementById('catFilter').value = 'all';
    document.getElementById('dateFilter').value = '';
    
    filteredAlerts = [...alerts];
    renderAlerts();
  }

  // แสดงรายการ Alerts
  function renderAlerts() {
    const alertsList = document.getElementById('alertsList');
    
    if (filteredAlerts.length === 0) {
      alertsList.innerHTML = `
        <div class="alert-item">
          <div class="alert-content" style="text-align: center; color: #6c757d;">
            ไม่พบการแจ้งเตือนที่ตรงกับเงื่อนไขที่เลือก
          </div>
        </div>
      `;
      return;
    }

    alertsList.innerHTML = filteredAlerts.map(alert => `
      <div class="alert-item ${alert.priority}-priority">
        <div class="alert-header">
          <h3 class="alert-title">${alert.title}</h3>
          <span class="alert-time">${formatDateTime(alert.timestamp)}</span>
        </div>
        <div class="alert-content">${alert.content}</div>
        <div class="alert-footer">
          <span class="alert-cat">${alert.cat}</span>
          <span class="alert-priority ${alert.priority}">${getPriorityText(alert.priority)}</span>
        </div>
      </div>
    `).join('');
  }

  // แปลงวันที่เวลา
  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // แปลงระดับความสำคัญ
  function getPriorityText(priority) {
    switch(priority) {
      case 'high': return 'สูง';
      case 'medium': return 'กลาง';
      case 'low': return 'ต่ำ';
      default: return 'ปกติ';
    }
  }

  // แสดงหน้า Notifications
  function showNotificationsPage() {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('catPage').classList.add('hidden');
    document.getElementById('catDetailPage').classList.add('hidden');
    document.getElementById('statisticsPage').classList.add('hidden');
    document.getElementById('alertsPage').classList.add('hidden');
    document.getElementById('cameraPage').classList.add('hidden');
    document.getElementById('notificationsPage').classList.remove('hidden');
    document.getElementById('profilePage').classList.add('hidden');
    
    renderNotifications();
    updateNotificationBadge();
  }

  // แสดงรายการ Notifications
  function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    
    notificationsList.innerHTML = notifications.map(notification => `
      <div class="notification-item ${notification.isRead ? 'read' : 'unread'}" onclick="markAsRead(${notification.id})">
        ${notification.image ? 
          `<img src="${notification.image}" alt="${notification.cat}" class="notification-avatar">` :
          `<div class="notification-placeholder">🐱</div>`
        }
        <div class="notification-content">
          <h3 class="notification-title">${notification.title}</h3>
          <p class="notification-message">${notification.message}</p>
          <div class="notification-time">
            <span class="status-dot ${notification.isOnline ? '' : 'offline'}"></span>
            ${notification.time}
          </div>
        </div>
      </div>
    `).join('');
  }

  // อัพเดทจำนวน badge
  function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const badge = document.getElementById('notificationBadge');
    
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'block';
    } else {
      badge.style.display = 'none';
    }
  }

  // ทำเครื่องหมายว่าอ่านแล้ว
  function markAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      renderNotifications();
      updateNotificationBadge();
    }
  }

  // แสดงหน้า Profile
  function showProfilePage() {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('catPage').classList.add('hidden');
    document.getElementById('catDetailPage').classList.add('hidden');
    document.getElementById('statisticsPage').classList.add('hidden');
    document.getElementById('alertsPage').classList.add('hidden');
    document.getElementById('notificationsPage').classList.add('hidden');
    document.getElementById('cameraPage').classList.add('hidden');
    document.getElementById('profilePage').classList.remove('hidden');
  }

  // แสดงข้อมูลส่วนตัว
  function showMyInformation() {
    alert('My Information - แสดงข้อมูลส่วนตัวของผู้ใช้');
  }

  // แสดงการตั้งค่าแจ้งเตือน
  function showNotificationSettings() {
    alert('Notification Settings - ตั้งค่าการแจ้งเตือน');
  }

  // ออกจากระบบ
  function signOut() {
    const confirmSignOut = confirm('คุณต้องการออกจากระบบหรือไม่?');
    if (confirmSignOut) {
      alert('ออกจากระบบสำเร็จ');
      // ในการใช้งานจริงจะทำการ logout และเปลี่ยนเส้นทางไปหน้า login
      showHomePage();
    }
  }

  // แสดงหน้า About (ตัวอย่าง)
  function showAboutPage() {
    alert('หน้า About - ระบบกล้องวงจรปิดสำหรับบ้าน');
  }

  // กลับจากหน้า Cat
  function goBackFromCat() {
    document.getElementById('catPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
  }

  // เลือกแมว
  function selectCat(catIndex) {
    const selectedCat = cats[catIndex];

    document.getElementById('catDetailName').textContent = selectedCat.name;
    document.getElementById('catProfileName').textContent = `Name ${selectedCat.name}`;
    document.getElementById('catDetailImage').src = selectedCat.image;
    document.getElementById('catLocation').textContent = selectedCat.location;



    // แสดงหน้าข้อมูลแมว
    document.getElementById('catPage').classList.add('hidden');
    document.getElementById('catDetailPage').classList.remove('hidden');
  }

  // กลับไปหน้า Cat Gallery
  function goBackToCatGallery() {
    document.getElementById('catDetailPage').classList.add('hidden');
    document.getElementById('catPage').classList.remove('hidden');
  }

  // กลับจากหน้าสถิติไปหน้าข้อมูลแมว
  function goBackFromStatistics() {
    document.getElementById('statisticsPage').classList.add('hidden');
    document.getElementById('catDetailPage').classList.remove('hidden');
  }

  // กลับจากหน้า Alerts ไปหน้าที่เข้ามา
  function goBackFromAlerts() {
    document.getElementById('alertsPage').classList.add('hidden');
    
    if (previousPage === 'catDetail') {
      document.getElementById('catDetailPage').classList.remove('hidden');
    } else {
      document.getElementById('homePage').classList.remove('hidden');
    }
  }


  // อัพเดทข้อมูลกล้อง
  function updateCameraInfo() {
    const currentRoom = rooms[currentRoomIndex];
    document.getElementById('currentRoomName').textContent = currentRoom.name;
    document.getElementById('cameraInfo').textContent = `กล้อง ${currentRoomIndex + 1} จาก ${rooms.length}`;

    // อัพเดทปุ่มนำทาง
    const prevBtn = document.querySelector('.camera-controls .nav-btn:first-child');
    const nextBtn = document.querySelector('.camera-controls .nav-btn:last-child');

    prevBtn.disabled = currentRoomIndex === 0;
    nextBtn.disabled = currentRoomIndex === rooms.length - 1;
  }

  // กล้องก่อนหน้า
  function previousCamera() {
    if (currentRoomIndex > 0) {
      currentRoomIndex--;
      updateCameraInfo();
      simulateCameraSwitch();
    }
  }

  // กล้องถัดไป
  function nextCamera() {
    if (currentRoomIndex < rooms.length - 1) {
      currentRoomIndex++;
      updateCameraInfo();
      simulateCameraSwitch();
    }
  }

  // จำลองการสลับกล้อง
  function simulateCameraSwitch() {
    const cameraFeed = document.getElementById('cameraFeed');
    cameraFeed.style.opacity = '0.5';

    setTimeout(() => {
      cameraFeed.style.opacity = '1';
    }, 300);
  }

  // อัพเดทเวลา
  let timestampInterval;

  function startTimestamp() {
    updateTimestamp();
    timestampInterval = setInterval(updateTimestamp, 1000);
  }

  function stopTimestamp() {
    if (timestampInterval) {
      clearInterval(timestampInterval);
    }
  }

  function updateTimestamp() {
    const now = new Date();
    const timeString = now.toLocaleString('th-TH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
      timestampElement.textContent = `เวลา: ${timeString}`;
    }
  }


  // เริ่มต้นเมื่อโหลดหน้าเว็บ
  document.addEventListener('DOMContentLoaded', function() {
    console.log('ระบบกล้องวงจรปิดพร้อมใช้งาน');
    
    // อัพเดท notification badge เริ่มต้น
    updateNotificationBadge();

    // ปิดเมนูเมื่อคลิกภายนอก
    document.addEventListener('click', function(event) {
      const menu = document.getElementById('navMenu');
      const hamburgerBtn = document.querySelector('.hamburger-btn');

      if (!menu.contains(event.target) && !hamburgerBtn.contains(event.target) && !menu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  });

  // เพิ่มเอฟเฟกต์เสียงเมื่อคลิก (จำลอง)
  function playClickSound() {
    // ในการใช้งานจริงสามารถเพิ่มเสียงได้
    console.log('🔊 คลิก');
  }

  // เพิ่มการจัดการ keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    // ถ้าอยู่ในหน้ากล้อง
    if (!document.getElementById('cameraPage').classList.contains('hidden')) {
      switch(event.key) {
        case 'ArrowLeft':
          previousCamera();
          break;
        case 'ArrowRight':
          nextCamera();
          break;
        case 'Escape':
          goBack();
          break;
      }
    }
  });

  // เพิ่มการแสดงสถานะการเชื่อมต่อ
  function simulateConnectionStatus() {
    const statuses = ['เชื่อมต่อแล้ว', 'กำลังบันทึก', 'สัญญาณดี'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const statusElements = document.querySelectorAll('.simulated-video p:first-of-type');
    statusElements.forEach(element => {
      if (element.textContent.includes('สถานะ:')) {
        element.textContent = `สถานะ: ${randomStatus}`;
      }
    });
  }

  // อัพเดทสถานะทุก 5 วินาที
  setInterval(simulateConnectionStatus, 5000);
