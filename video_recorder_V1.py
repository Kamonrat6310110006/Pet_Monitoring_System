import cv2 
import os 
import time 
from datetime import datetime 
# ตั้งค่าการบันทึกวิดีโอ 

VIDEO_FOLDER = "recorded_videos"  # โฟลเดอร์เก็บวิดีโอ 
MAX_STORAGE_MB = 64  # ความจุสูงสุด (MB) ก่อนจะลบไฟล์เก่าทิ้ง 
VIDEO_DURATION = 2 * 60  # ระยะเวลาต่อไฟล์ (2 นาที) ทดสอบ 
FRAME_WIDTH = 640 
FRAME_HEIGHT = 480 
FPS = 20 
CAMERA_SOURCE = "http://172.22.100.241:4747/video" 

# สร้างโฟลเดอร์ถ้ายังไม่มี 
if not os.path.exists(VIDEO_FOLDER): 
    os.makedirs(VIDEO_FOLDER) 

def get_folder_size(folder): 
    """ ตรวจสอบขนาดของโฟลเดอร์เป็น MB """ 
    total_size = sum(os.path.getsize(os.path.join(folder, f)) for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))) 
    return total_size / (1024 * 1024) 

def get_oldest_file(folder): 
    """ ค้นหาไฟล์ที่เก่าที่สุดในโฟลเดอร์ """ 
    files = [os.path.join(folder, f) for f in os.listdir(folder)] 
    files = [f for f in files if os.path.isfile(f)] 
    return min(files, key=os.path.getctime) if files else None 

# เปิดกล้อง 
cap = cv2.VideoCapture(CAMERA_SOURCE) 
cap.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH) 
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT) 
cap.set(cv2.CAP_PROP_FPS, FPS) 

if not cap.isOpened(): 
    print("ไม่สามารถเปิดกล้องได้!") 
    exit() 

# ตัวแปรสำหรับหยุดโปรแกรม 
stop_program = False 
while not stop_program: 
    # ตั้งชื่อไฟล์ตามเวลาปัจจุบัน 
    timestamp = datetime.now().strftime("%d_%m_%y_%H_%M")  # เปลี่ยน '.' เป็น '_' 
    video_filename = os.path.join(VIDEO_FOLDER, f"video_{timestamp}.mp4") 
    fourcc = cv2.VideoWriter_fourcc(*'mp4v') 
    out = cv2.VideoWriter(video_filename, fourcc, FPS, (FRAME_WIDTH, FRAME_HEIGHT)) 
    start_time = time.time() 
    while time.time() - start_time < VIDEO_DURATION: 
        ret, frame = cap.read() 
        if not ret: 
            print("เกิดข้อผิดพลาดในการอ่านภาพจากกล้อง!") 
            stop_program = True  # หยุดลูปหลักหากเกิดข้อผิดพลาด 
            break 
        out.write(frame) 
        cv2.imshow('Recording', frame) 

        # ตรวจจับการกด 'q' เพื่อหยุดการทำงาน 
        if cv2.waitKey(1) & 0xFF == ord('q'): 
            stop_program = True 
            break 
    out.release() 
    # ตรวจสอบขนาดโฟลเดอร์ และลบไฟล์ที่เก่าที่สุดถ้าเกินความจุที่กำหนด 
    while get_folder_size(VIDEO_FOLDER) > MAX_STORAGE_MB: 
        oldest_file = get_oldest_file(VIDEO_FOLDER) 
        if oldest_file: 
            os.remove(oldest_file) 
            print(f"ลบไฟล์เก่า: {oldest_file}") 
cap.release() 
cv2.destroyAllWindows()
