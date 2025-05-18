const API_BASE_URL = "http://39.106.64.177";  // 你的服务器地址

export const getEmotionsData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/emotions`);  // Flask API 路径
    if (!response.ok) {
      throw new Error("请求失败");
    }
    return await response.json();
  } catch (error) {
    console.error("获取情绪数据失败:", error);
    return null;
  }
};
