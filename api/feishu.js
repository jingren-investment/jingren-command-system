export default async function handler(request, response) {
  try {
    // 飞书验证处理
    if (request.method === 'POST') {
      const body = await request.json();
      
      // 飞书 URL 验证
      if (body.type === 'url_verification') {
        return response.status(200).json({
          challenge: body.challenge
        });
      }
      
      // 处理飞书事件回调
      console.log('飞书事件:', body);
      
      // 这里添加您的业务逻辑
      return response.status(200).json({ 
        success: true,
        message: '事件处理成功'
      });
    }
    
    // 其他 HTTP 方法返回错误
    return response.status(405).json({
      error: 'Method Not Allowed',
      hint: '此端点仅处理飞书机器人事件'
    });
    
  } catch (error) {
    console.error('API 错误:', error);
    return response.status(500).json({
      success: false,
      error: error.message
    });
  }
}
