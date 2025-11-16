// 精韧指挥系统 - 飞书机器人 API (超高速响应版)
// 北斗七星智能体生态系统 - 专为3秒超时优化

export default async function handler(request, response) {
  // 立即开始处理，不等待任何异步操作
  const startTime = Date.now();
  
  // 设置 CORS 头部
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 预检请求 - 立即返回
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  // 处理 GET 请求 - 简化版本
  if (request.method === 'GET') {
    return response.status(200).json({
      success: true,
      message: '精韧指挥系统 API 运行正常',
      timestamp: new Date().toISOString()
    });
  }
  
  // 处理 POST 请求 - 超高速版本
  if (request.method === 'POST') {
    try {
      let body = '';
      
      // 超快速读取请求体
      for await (const chunk of request) {
        body += chunk;
        // 如果读取时间超过1秒，立即处理
        if (Date.now() - startTime > 1000) break;
      }
      
      const data = JSON.parse(body);
      
      // 飞书 URL 验证 - 最高优先级处理
      if (data.type === 'url_verification') {
        // 立即返回，不进行任何其他处理
        return response.status(200).json({
          challenge: data.challenge
        });
      }
      
      // 其他事件快速响应
      return response.status(200).json({ 
        code: 0,
        msg: 'success'
      });
      
    } catch (error) {
      // 错误时也快速响应
      return response.status(200).json({
        code: 0,
        msg: 'success'
      });
    }
  }
  
  // 其他方法快速拒绝
  return response.status(405).json({
    error: 'Method Not Allowed'
  });
}
