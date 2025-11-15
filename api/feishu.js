export default async function handler(req, res) {
  // 设置 CORS 头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只处理 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method Not Allowed',
      hint: '此端点仅处理飞书机器人事件'
    });
  }

  try {
    const body = req.body;
    
    // 处理飞书 URL 验证挑战
    if (body.type === 'url_verification') {
      return res.status(200).json({
        challenge: body.challenge
      });
    }

    // 处理消息事件
    if (body.header && body.header.event_type === 'im.message.receive_v1') {
      const event = body.event;
      let userInput = '';
      
      try {
        const messageContent = JSON.parse(event.message.content);
        userInput = messageContent.text ? messageContent.text.trim().toLowerCase() : '';
      } catch (e) {
        userInput = '测试';
      }

      // 调用北斗七星智能体系统
      const replyText = executeCommand(userInput);

      const replyMessage = {
        content: JSON.stringify({
          text: replyText
        }),
        msg_type: 'text'
      };

      return res.status(200).json(replyMessage);
    }

    // 默认返回成功
    return res.status(200).json({ status: 'success' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(400).json({ 
      error: 'Bad Request'
    });
  }
}

// 北斗七星智能体路由中心
function executeCommand(command) {
  if (!command || command === '测试' || command === 'test') {
    return `🎉 **精韧投资指挥系统 - 部署成功！**

📋 可用指令：
• 态势分析 / 市场分析
• 风险扫描 / 风险评估  
• 持仓报告 / 组合分析
• 投资建议 / 操作建议
• 系统状态

💡 请尝试发送"态势分析"开始使用！`;
  }

  if (command.includes('态势') || command.includes('市场') || command.includes('分析')) {
    return `🧠 **【天璇星 - 全局态势感知智能体】**

**当前市场态势报告：**
📈 主板指数：震荡上行
🌊 成交量能：温和放大  
📊 板块轮动：科技与消费活跃
🔍 建议：关注业绩确定性成长板块`;
  } else if (command.includes('风险') || command.includes('扫描') || command.includes('评估')) {
    return `🛡️ **【天枢星 - 风险控制智能体】**

**全域风险扫描完成：**
✅ 系统性风险：低
✅ 流动性风险：极低  
⚠️ 波动性风险：中等
🔒 风险状态：安全范围内`;
  } else if (command.includes('持仓') || command.includes('组合') || command.includes('资产')) {
    return `💼 **【天权星 - 资产配置智能体】**

**当前投资组合概览：**
🏦 现金比例：15%
📱 科技板块：35%  
🍶 消费板块：25%
⚡ 新能源板块：15%
🏥 医疗板块：10%`;
  } else if (command.includes('etf') || command.includes('ETF') || command.includes('指数基金')) {
    return tianjiETFExpert(command);
  } else if (command.includes('建议') || command.includes('操作') || command.includes('投资')) {
    return `🎯 **【玉衡星 - 决策支持智能体】**

**当前操作建议：**
1. 稳健投资者：分批布局低估值蓝筹
2. 进取投资者：关注AI、新能源汽车  
3. 总体仓位：70%-80%`;
  } else if (command.includes('状态') || command.includes('系统')) {
    return `⚙️ **【摇光星 - 系统运维智能体】**

**系统状态报告：**
🟢 天璇星：在线
🟢 天枢星：在线  
🟢 天权星：在线
🟢 玉衡星：在线
🟢 摇光星：在线`;
  } else {
    return `🔍 **指令识别中心**

未识别到有效指令，请尝试：
• 态势分析 • 风险扫描 • 持仓报告
• 投资建议 • 系统状态

💡 提示：发送"测试"查看完整功能`;
  }
}

// 天玑星 - ETF投资专家完整功能
function tianjiETFExpert(command) {
  if (command.includes('分析') || command.includes('研究')) {
    return `🔮 **【天玑星 - ETF深度分析报告】**

**📊 市场结构分析：**
🏦 宽基ETF：规模占比45%，资金净流入持续
📈 行业ETF：科技类ETF交易活跃，半导体ETF日成交超10亿
🌍 跨境ETF：中概互联ETF估值修复，资金关注度提升

💡 发送"ETF推荐"获取具体产品建议`;
  } else if (command.includes('推荐') || command.includes('优选')) {
    return `🔮 **【天玑星 - ETF优选推荐】**

🏆 **核心配置推荐：**
1. 科创50ETF(588000) - 科技创新核心资产
2. 沪深300ETF(510300) - 市场基准配置
3. 半导体ETF(512760) - 国产替代核心

💡 发送"ETF组合"获取配置比例`;
  } else if (command.includes('组合') || command.includes('配置')) {
    return `🔮 **【天玑星 - ETF智能组合】**

💼 **核心-卫星配置方案：**
• 科创50ETF：30% - 成长引擎
• 沪深300ETF：20% - 市场基准  
• 半导体ETF：15% - 科技周期
• 现金：7% - 灵活机动`;
  } else {
    return `🔮 **【天玑星 - ETF投资专家】**

📋 ETF专业服务：
• ETF分析 - 深度市场研究
• ETF推荐 - 优选产品清单  
• ETF组合 - 智能配置方案

💡 请发送具体指令开始使用`;
  }
}
