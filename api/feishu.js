// 精韧指挥系统 - 飞书机器人终极简化 API
export default async function handler(request, response) {
  // 立即设置响应头
  response.setHeader('Content-Type', 'application/json');
  
  try {
    const body = await request.json();
    console.log('收到飞书请求:', body.type);
    
    // 飞书 URL 验证 - 这是关键！
    if (body.type === 'url_verification') {
      console.log('返回 challenge:', body.challenge);
      return response.json({
        challenge: body.challenge
      });
    }
    
    // 其他事件都返回成功
    return response.json({ 
      code: 0,
      msg: 'success'
    });
    
  } catch (error) {
    console.error('错误:', error.message);
    // 即使出错也要返回成功格式，避免飞书超时
    return response.json({
      code: 0,
      msg: 'success'
    });
  }
}
