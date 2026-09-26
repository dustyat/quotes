/**
 * 智能根据显式指定的心情、标签或正文内容推导生动多样的微标 Emoji
 */
export function getQuoteMood(data: {
  mood?: string;
  tags?: string[];
  body?: string;
  source?: string;
}): string {
  // 如果显式指定了 mood，优先使用
  if (data.mood && data.mood.trim()) {
    return data.mood.trim();
  }

  const tags = data.tags || [];
  const text = `${data.body || ''} ${data.source || ''}`.toLowerCase();

  // 根据标签精确匹配
  if (tags.includes('AI时代') || tags.includes('人工智能')) return '🤖';
  if (tags.includes('设计') || tags.includes('极简主义')) return '📐';
  if (tags.includes('投资') || tags.includes('商业')) return '📈';
  if (tags.includes('行动') || tags.includes('执行')) return '⚡';
  if (tags.includes('创造力') || tags.includes('灵感')) return '🎨';
  if (tags.includes('读书笔记')) return '📖';
  if (tags.includes('人生哲学')) return '🌌';
  if (tags.includes('思维模型')) return '🧩';
  if (tags.includes('认知')) return '💡';
  if (tags.includes('生活') || tags.includes('日常')) return '☕';

  // 根据文本内容语义关键词匹配
  if (/代码|算法|模型|智能|机器人|gpt|ai/i.test(text)) return '🤖';
  if (/设计|美学|简约|极简|建筑|比例/i.test(text)) return '📐';
  if (/投资|股票|复利|财富|资本|买卖|巴菲特|芒格/i.test(text)) return '📈';
  if (/行动|坚持|执行|自律|习惯|脚步|开始/i.test(text)) return '⚡';
  if (/灵感|创造|创意|艺术|画|写/i.test(text)) return '🎨';
  if (/冲突|博弈|牌桌|社会|规则|输赢/i.test(text)) return '♟️';
  if (/矛盾|爆发|忍耐|情绪/i.test(text)) return '⚡';
  if (/秩序|稳定|从容|笃定/i.test(text)) return '🏛️';
  if (/界限|保护|拒绝|伤害/i.test(text)) return '🛡️';
  if (/船|航行|方向|漂泊/i.test(text)) return '⛵';
  if (/时间|岁月|衰老|黄金期|系统/i.test(text)) return '⏳';
  if (/戏剧|角色|人间|面具/i.test(text)) return '🎭';
  if (/深渊|高山|前程|无畏|攀登/i.test(text)) return '🏔️';
  if (/自由|灵魂|飞翔|宁静/i.test(text)) return '🕊️';
  if (/植物|生长|种子|春天|生命/i.test(text)) return '🌱';
  if (/书|阅读|文字|作家|摘录/i.test(text)) return '📖';

  // 默认知性保底微标
  return '💡';
}
