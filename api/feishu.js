// 精韧指挥系统 - 飞书机器人极简 API
export default async function handler(request, response) {
  console.log('收到请求，方法:', request.method);
  
  // 立即设置响应头
  response.setHeader('Content-Type', 'application/json');
  
  try {
    // 只处理 POST 请求
    if (request.method === 'POST') {
      const body = await request.json();
      console.log('请求类型:', body.type);
      
      // 飞书 URL 验证
      if (body.type === 'url_verification') {
        console.log('返回 challenge:', body.challenge);
        return response.status(200).json({
          challenge: body.challenge
        });
      }
      
      // 其他事件
      return response.status(200).json({ 
        code: 0,
        msg: 'success'
      });
    }
    
    // 其他方法
    return response.status(405).json({
      code: 1,
      msg: 'Method Not Allowed'
    });
    
  } catch (error) {
    console.error('错误详情:', error.message);
    return response.status(200).json({
      code: 1,
      msg: '处理失败: ' + error.message
    });
  }
}
