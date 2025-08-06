#code หา RTSP URL :RTSP URL: rtsp://192.168.22.41:10554/tcp/av0_0 ผลที่ได้ 
from onvif import ONVIFCamera 
cam = ONVIFCamera('192.168.22.41', 10080, 'admin', '05032544') 
 #192.168.22.41 ipกล้อง 
 #10080 คือ port ทั่วไปของ Vstarcam 
 #admin คงเดิมไว้ เป็นค่าUsername 
 #05032544 passwordที่ตั้งไว้ในIpcamera 
media_service = cam.create_media_service() 
profiles = media_service.GetProfiles() 
stream_uri = media_service.GetStreamUri({'StreamSetup': {'Stream': 'RTP-Unicast', 'Transport': {'Protocol': 'RTSP'}}, 'ProfileToken': profiles[0].token}) 
print("RTSP URL:", stream_uri.Uri) 

 
