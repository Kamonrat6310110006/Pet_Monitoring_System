import cv2 
import os 
import time 
from datetime import datetime 

# ตั้งค่าการบันทึกวิดีโอ 
VIDEO_FOLDER = "recorded_videos"  # โฟลเดอร์เก็บวิดีโอ 
MAX_STORAGE_MB = 128   
VIDEO_DURATION = 2 * 60  # ระยะเวลาต่อไฟล์ (2 นาที) 
FRAME_WIDTH = 640 
FRAME_HEIGHT = 480 
FPS = 20 

# URL กล้อง 
CAMERA1_SOURCE = "http://172.22.101.12:4747/video" 
CAMERA2_SOURCE = "http://172.22.101.226:4747/video"   
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
cap1 = cv2.VideoCapture(CAMERA1_SOURCE) 
cap2 = cv2.VideoCapture(CAMERA2_SOURCE) 
for cap in [cap1, cap2]: 
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, FRAME_WIDTH) 
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, FRAME_HEIGHT) 
    cap.set(cv2.CAP_PROP_FPS, FPS) 
 
if not cap1.isOpened() or not cap2.isOpened(): 
    print("ไม่สามารถเปิดกล้องได้!") 
    exit() 

# ตัวแปรสำหรับหยุดโปรแกรม 
stop_program = False 

while not stop_program: 
    # ตั้งชื่อไฟล์ตามเวลาปัจจุบัน 
    timestamp = datetime.now().strftime("%d_%m_%y_%H_%M") 
    video_filename1 = os.path.join(VIDEO_FOLDER, f"camera1_{timestamp}.mp4") 
    video_filename2 = os.path.join(VIDEO_FOLDER, f"camera2_{timestamp}.mp4") 
    fourcc = cv2.VideoWriter_fourcc(*'mp4v') 
    out1 = cv2.VideoWriter(video_filename1, fourcc, FPS, (FRAME_WIDTH, FRAME_HEIGHT)) 
    out2 = cv2.VideoWriter(video_filename2, fourcc, FPS, (FRAME_WIDTH, FRAME_HEIGHT)) 
    start_time = time.time() 
    while time.time() - start_time < VIDEO_DURATION: 
        ret1, frame1 = cap1.read() 
        ret2, frame2 = cap2.read() 
        if not ret1 or not ret2: 
            print("เกิดข้อผิดพลาดในการอ่านภาพจากกล้อง!") 
            stop_program = True 
            break 
        out1.write(frame1) 
        out2.write(frame2) 
        # แสดงภาพจากกล้องทั้งสอง 
        cv2.imshow('Camera 1', frame1) 
        cv2.imshow('Camera 2', frame2) 
        # ตรวจจับการกด 'q' เพื่อหยุดการทำงาน 
        if cv2.waitKey(1) & 0xFF == ord('q'): 
            stop_program = True 
            break 
    out1.release() 
    out2.release() 
    # ตรวจสอบขนาดโฟลเดอร์ และลบไฟล์เก่าที่สุดถ้าเกินความจุที่กำหนด 
    while get_folder_size(VIDEO_FOLDER) > MAX_STORAGE_MB: 
        oldest_file = get_oldest_file(VIDEO_FOLDER) 
        if oldest_file: 
            os.remove(oldest_file) 
            print(f"ลบไฟล์เก่า: {oldest_file}") 
cap1.release() 
cap2.release() 

cv2.destroyAllWindows() 
