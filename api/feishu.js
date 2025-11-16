// 精韧指挥系统 - 飞书机器人专用 API
export default async function handler(request, response) {
  console.log('=== 飞书回调请求 ===');
  console.log('方法:', request.method);
  console.log('Headers:', request.headers);
  
  // 设置响应头
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 预检请求
  if (request.method === 'OPTIONS') {
    console.log('处理 OPTIONS 预检请求');
    return response.status(200).end();
  }
  
  // 只处理 POST 请求
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      console.log('飞书请求体:', JSON.stringify(body, null, 2));
      
      // 飞书 URL 验证（必须立即返回 challenge）
      if (body.type === 'url_verification') {
        console.log('处理飞书 URL 验证, challenge:', body.challenge);
        // 飞书要求立即返回 challenge，不能有任何延迟
        return response.status(200).json({
          challenge: body.challenge
        });
      }
      
      // 其他飞书事件处理
      console.log('处理飞书事件, 类型:', body.type);
      // 飞书要求所有事件都要立即返回成功
      return response.status(200).json({ 
        code: 0,
        msg: 'success'
      });
      
    } catch (error) {
      console.error('处理飞书请求错误:', error);
      // 即使出错也要立即返回，避免超时
      return response.status(200).json({
        code: 1,
        msg: '处理失败'
      });
    }
  }
  
  // 其他方法立即返回错误
  return response.status(405).json({
    code: 1,
    msg: 'Method Not Allowed'
  });
}
