from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# 配置数据库（这里使用 SQLite，你也可以改成 MySQL）
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///emotions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 定义学生情绪表
class Emotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(50), nullable=False)
    emotion = db.Column(db.String(20), nullable=False)
    timestamp = db.Column(db.String(50), nullable=False)

# 创建数据库表
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Flask 后端运行成功！"

# **1. 获取所有学生情绪数据**
@app.route('/api/emotions', methods=['GET'])
def get_emotions():
    emotions = Emotion.query.all()
    data = [{"id": e.id, "student": e.student_name, "emotion": e.emotion, "time": e.timestamp} for e in emotions]
    return jsonify(data)

# **2. 添加学生情绪数据**
@app.route('/api/emotions', methods=['POST'])
def add_emotion():
    data = request.json
    new_emotion = Emotion(student_name=data['student'], emotion=data['emotion'], timestamp=data['time'])
    db.session.add(new_emotion)
    db.session.commit()
    return jsonify({"message": "数据添加成功！"}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
