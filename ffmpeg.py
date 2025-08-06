import os 
import subprocess 
from datetime import datetime 
from threading import Thread 
import time 

FFMPEG_PATH = "C:/ffmpeg/ffmpeg-7.1.1-essentials_build/bin/ffmpeg.exe" 
RECORD_DURATION = 2 * 60  # 2 นาที 
BASE_FOLDER = "recorded_videos" 
MAX_FOLDER_SIZE_MB = 50  # จำกัดความจุสูงสุดของโฟลเดอร์กล้อง 


#กล้องที่ใช้งาน 
CAMERA_CONFIG = { 
    "Garage": [ 
        "rtsp://admin:05032544@192.168.22.41:10554/tcp/av0_0","rtsp://admin:05032544@192.168.22.41:10554/tcp/av0_0" 
    ], 
    "Hall": ["rtsp://admin:05032544@192.168.22.41:10554/tcp/av0_0"], 

    "Kitchen": [], 

    "Garden": [], 

} 

 

def create_folders(): 
    """สร้างโฟลเดอร์สำหรับห้อง/กล้อง""" 
    for room, urls in CAMERA_CONFIG.items(): 
        for i in range(len(urls)): 
            folder = os.path.join(BASE_FOLDER, room, f"camera{i+1}") 
            os.makedirs(folder, exist_ok=True) 

def get_folder_size_mb(folder_path): 
    """คำนวณขนาดโฟลเดอร์ (หน่วย MB)""" 
    total_size = 0 
    for root, _, files in os.walk(folder_path): 
        for f in files: 
            fp = os.path.join(root, f) 
            if os.path.isfile(fp): 
                total_size += os.path.getsize(fp) 
    return total_size / (1024 * 1024) 
 
def delete_oldest_files_until_under_limit(folder_path): 
    """ลบไฟล์เก่าสุดจนขนาดโฟลเดอร์อยู่ใน limit""" 
    while get_folder_size_mb(folder_path) > MAX_FOLDER_SIZE_MB: 
        files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))] 
        if not files: 
            break 
        oldest = min(files, key=os.path.getctime) 
        try: 
            os.remove(oldest) 
            print(f"🗑️ ลบไฟล์เก่า: {oldest}") 
        except Exception as e: 
            print(f"⚠️ ลบไม่ได้: {e}") 
            break 
 
def record_ffmpeg(room_name, cam_index, cam_url): 
    """ใช้ ffmpeg บันทึกวิดีโอแบบวนลูป""" 
    folder = os.path.join(BASE_FOLDER, room_name, f"camera{cam_index+1}") 
    os.makedirs(folder, exist_ok=True) 
    while True: 
        delete_oldest_files_until_under_limit(folder) 
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S") 
        output_path = os.path.join(folder, f"video_{timestamp}.mp4") 
        print(f" [{room_name} Cam {cam_index+1}] เริ่มบันทึก: {output_path}") 

        cmd = [ 
            FFMPEG_PATH, 
            "-rtsp_transport", "tcp", 
            "-i", cam_url, 
            "-t", str(RECORD_DURATION), 
            "-vcodec", "libx264", 
            "-preset", "ultrafast", 
            "-crf", "23", 
            "-pix_fmt", "yuv420p", 
            output_path 
        ] 
 
        try: 
            subprocess.run(cmd, check=True) 
        except subprocess.CalledProcessError: 
            print(f" [ERROR] [{room_name} Cam {cam_index+1}] ffmpeg error") 
        except Exception as e: 
            print(f" [ERROR] [{room_name} Cam {cam_index+1}] : {e}") 
        time.sleep(1)  # ป้องกัน CPU loop เต็ม 

def start_all_recordings(): 
    """เริ่มบันทึกกล้องทั้งหมด""" 
    threads = [] 
    for room, urls in CAMERA_CONFIG.items(): 
        for idx, url in enumerate(urls): 
            if url.strip(): 
                t = Thread(target=record_ffmpeg, args=(room, idx, url)) 
                t.start() 
                threads.append(t) 
    for t in threads: 
        t.join() 
 
# MAIN 
if __name__ == "__main__": 
    create_folders() 
    start_all_recordings() 
