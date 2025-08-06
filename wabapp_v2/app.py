from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# การตั้งค่าการเชื่อมต่อฐานข้อมูล
db_config = {
    'host': 'localhost',
    'user': 'root',  
    'password': 'root',  
    'database': 'pet_monitoring'
}

# ดึงข้อมูลแมวพร้อมห้องที่แมวอยู่
@app.route('/api/cats', methods=['GET'])
def get_cats():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)

    # SQL Query เพื่อดึงข้อมูลแมวพร้อมห้องปัจจุบัน
    query = """
        SELECT c.name, c.image_url, c.status, r.name AS current_room
        FROM cats c
        LEFT JOIN (
            SELECT cat_name, room_name
            FROM cat_movements
            WHERE exit_time IS NULL
        ) cm ON c.name = cm.cat_name
        LEFT JOIN rooms r ON cm.room_name = r.name
    """
    
    cursor.execute(query)
    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
