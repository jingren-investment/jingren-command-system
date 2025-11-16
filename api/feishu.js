// 精韧指挥系统 - Vercel 兼容版飞书机器人 API
export default async function handler(request, response) {
  // 设置响应头
  response.setHeader('Content-Type', 'application/json');
  
  try {
    // 处理 POST 请求
    if (request.method === 'POST') {
      // Vercel 兼容的请求体解析方式
      let body = '';
      for await (const chunk of request) {
        body += chunk;
      }
      
      const data = JSON.parse(body);
      console.log('收到飞书请求:', data.type);
      
      // 飞书 URL 验证
      if (data.type === 'url_verification') {
        console.log('返回 challenge:', data.challenge);
        return response.end(JSON.stringify({
          challenge: data.challenge
        }));
      }
      
      // 其他事件
      return response.end(JSON.stringify({ 
        code: 0,
        msg: 'success'
      }));
    }
    
    // GET 请求返回基本信息
    if (request.method === 'GET') {
      return response.end(JSON.stringify({
        success: true,
        message: '精韧指挥系统 API 运行正常',
        system: '北斗七星智能体生态系统',
        timestamp: new Date().toISOString()
      }));
    }
    
    // 其他方法
    return response.end(JSON.stringify({
      code: 1,
      msg: 'Method Not Allowed'
    }));
    
  } catch (error) {
    console.error('处理错误:', error.message);
    return response.end(JSON.stringify({
      code: 0,
      msg: 'success'
    }));
  }
}
