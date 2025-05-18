import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { getEmotionsData } from "./api"; // 导入 API 请求

function App() {
  const [emotionData, setEmotionData] = useState([]);  // 存储 API 获取的数据

  useEffect(() => {
    // 初始加载数据
    async function fetchData() {  // 异步函数
      try {
        const response = await getEmotionsData();
        if (Array.isArray(response)) { // 确保是数组
          setEmotionData(response);
        } else {
          console.error("数据格式错误", response);
          setEmotionData([]); // 避免 .map() 出错
        }
      } catch (error) {
        console.error("数据请求失败:", error);
        setEmotionData([]); // 网络请求失败时，避免崩溃
      }
    }

    fetchData(); // 初次加载时获取数据

    const interval = setInterval(fetchData, 5000);  // 每 5 秒更新数据
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>学生情绪记录</h1>
      <table border="1" style={{ margin: "auto", width: "60%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>学生</th>
            <th>情绪</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          {emotionData && emotionData.length > 0 ? (
            emotionData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.student}</td>
                <td>{item.emotion}</td>
                <td>{item.time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>加载中...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

