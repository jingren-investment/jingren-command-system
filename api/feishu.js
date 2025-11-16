// 精韧指挥系统 - 飞书机器人 API (Vercel 特调版)
// 北斗七星智能体生态系统

export default async function handler(request, response) {
  console.log('=== 收到请求 ===');
  console.log('方法:', request.method);
  console.log('URL:', request.url);
  
  // 设置 CORS 头部
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 预检请求
  if (request.method === 'OPTIONS') {
    console.log('处理 OPTIONS 预检请求');
    return response.status(200).end();
  }
  
  // 处理 GET 请求 - 用于测试和验证
  if (request.method === 'GET') {
    console.log('处理 GET 测试请求');
    return response.status(200).json({
      success: true,
      message: '精韧指挥系统 API 运行正常',
      system: '北斗七星智能体生态系统',
      timestamp: new Date().toISOString(),
      endpoint: '飞书机器人接口',
      status: '等待飞书平台验证'
    });
  }
  
  // 处理 POST 请求
  if (request.method === 'POST') {
    try {
      console.log('处理 POST 请求');
      
      // Vercel 环境特调 - 正确处理请求体
      let body = '';
      for await (const chunk of request) {
        body += chunk;
      }
      
      console.log('原始请求体:', body);
      
      let data;
      try {
        data = JSON.parse(body);
      } catch (parseError) {
        console.error('JSON 解析错误:', parseError);
        return response.status(400).json({
          code: 1,
          msg: '无效的 JSON 格式'
        });
      }
      
      console.log('解析后的数据:', JSON.stringify(data, null, 2));
      
      // 飞书 URL 验证
      if (data.type === 'url_verification') {
        console.log('处理飞书 URL 验证, challenge:', data.challenge);
        return response.status(200).json({
          challenge: data.challenge
        });
      }
      
      // 其他飞书事件
      console.log('处理飞书事件, 类型:', data.type);
      return response.status(200).json({ 
        code: 0,
        msg: 'success',
        handled: true,
        event_type: data.type || 'unknown'
      });
      
    } catch (error) {
      console.error('处理 POST 请求错误:', error);
      return response.status(500).json({
        code: 1,
        msg: error.message
      });
    }
  }
  
  // 其他方法返回错误
  console.log('不允许的方法:', request.method);
  return response.status(405).json({
    error: 'Method Not Allowed',
    hint: '此端点处理 GET 测试和飞书机器人 POST 事件',
    allowed_methods: ['GET', 'POST', 'OPTIONS']
  });
}
