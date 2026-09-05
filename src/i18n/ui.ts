export type Locale = 'zh' | 'en' | 'ja' | 'ko' | 'vi';

export const DEFAULT_LOCALE: Locale = 'zh';

export const LOCALES: Record<Locale, { label: string; name: string; prefix: string }> = {
  zh: { label: '中', name: '简体中文', prefix: '' },
  en: { label: 'EN', name: 'English', prefix: '/en' },
  ja: { label: '日', name: '日本語', prefix: '/ja' },
  ko: { label: '韓', name: '한국어', prefix: '/ko' },
  vi: { label: '越', name: 'Tiếng Việt', prefix: '/vi' },
};

export const UI_TRANSLATIONS = {
  zh: {
    'site.title': 'Quotes',
    'site.description': '精选智者格言、经典洞察与思维模型，记录穿越时空的智慧火花。',
    'nav.quotes': '语录',
    'nav.topics': '话题',
    'nav.about': '关于',
    'feed.random': '随机卡片',
    'feed.shuffle': '换一换',
    'feed.empty': '暂无金句，请通过 npm run new 发布第一条！',
    'card.pinned': '精选置顶',
    'action.poster': '生成海报',
    'action.copy': '复制金句',
    'action.share': '分享 / 复制链接',
    'action.shareTitle': 'Quotes 精选金句',
    'action.copied': '已复制原文链接！',
    'action.copyFailed': '复制失败，请手动选择内容复制',
    'poster.title': '金句海报',
    'poster.save': '保存图片',
    'poster.copyImg': '复制图片',
    'poster.copied': '已复制图片到剪贴板！',
    'poster.scan': '扫码查看原文',
    'poster.lang': '海报语言',
    'search.btn': '搜索 (⌘K)',
    'search.placeholder': '搜索金句、作者、出处或标签...',
    'search.noResults': '没有找到匹配的金句',
    'search.count': '条金句',
    'tags.title': '话题标签',
    'tags.desc': '按主题分类浏览精选智慧',
    'time.justNow': '刚刚',
    'time.minutesAgo': '分钟前',
    'time.hoursAgo': '小时前',
    'time.yesterday': '昨天',
    'time.daysAgo': '天前',
  },
  en: {
    'site.title': 'Quotes',
    'site.description': 'Curated wisdom, timeless insights, and mental models across civilizations.',
    'nav.quotes': 'Quotes',
    'nav.topics': 'Topics',
    'nav.about': 'About',
    'feed.random': 'Random',
    'feed.shuffle': 'Shuffle',
    'feed.empty': 'No quotes yet. Publish the first one with npm run new!',
    'card.pinned': 'Featured',
    'action.poster': 'Create Poster',
    'action.copy': 'Copy Quote',
    'action.share': 'Share / Copy Link',
    'action.shareTitle': 'Quotes Wisdom Curation',
    'action.copied': 'Link copied to clipboard!',
    'action.copyFailed': 'Failed to copy, please copy manually',
    'poster.title': 'Quote Poster',
    'poster.save': 'Save Image',
    'poster.copyImg': 'Copy Image',
    'poster.copied': 'Image copied to clipboard!',
    'poster.scan': 'Scan to view quote',
    'poster.lang': 'Language',
    'search.btn': 'Search (⌘K)',
    'search.placeholder': 'Search quotes, authors, topics...',
    'search.noResults': 'No matching quotes found',
    'search.count': 'quotes',
    'tags.title': 'Topics & Tags',
    'tags.desc': 'Explore curated insights by themes',
    'time.justNow': 'just now',
    'time.minutesAgo': 'm ago',
    'time.hoursAgo': 'h ago',
    'time.yesterday': 'yesterday',
    'time.daysAgo': 'd ago',
  },
  ja: {
    'site.title': 'Quotes',
    'site.description': '時空を超える賢者の格言、不朽の洞察、思考モデルを厳選。',
    'nav.quotes': '名言',
    'nav.topics': 'トピック',
    'nav.about': '概要',
    'feed.random': 'ランダム',
    'feed.shuffle': 'シャッフル',
    'feed.empty': 'まだ名言がありません。npm run new で最初の一句を投稿しましょう！',
    'card.pinned': '注目の名言',
    'action.poster': 'ポスター作成',
    'action.copy': '名言をコピー',
    'action.share': '共有 / リンクをコピー',
    'action.shareTitle': 'Quotes 厳選名言',
    'action.copied': 'リンクをコピーしました！',
    'action.copyFailed': 'コピーに失敗しました',
    'poster.title': '名言ポスター',
    'poster.save': '画像を保存',
    'poster.copyImg': '画像をコピー',
    'poster.copied': '画像をクリップボードにコピーしました！',
    'poster.scan': 'スキャンして原文を表示',
    'poster.lang': '言語',
    'search.btn': '検索 (⌘K)',
    'search.placeholder': '名言、著者、出典、タグを検索...',
    'search.noResults': '一致する名言が見つかりません',
    'search.count': '件の名言',
    'tags.title': 'トピックとタグ',
    'tags.desc': 'テーマ別に厳選された智慧を探索',
    'time.justNow': 'たった今',
    'time.minutesAgo': '分前',
    'time.hoursAgo': '時間前',
    'time.yesterday': '昨日',
    'time.daysAgo': '日前',
  },
  ko: {
    'site.title': 'Quotes',
    'site.description': '시공을 초월하는 현자의 격언, 시대를 초월한 통찰과 생각 모델을 큐레이션합니다.',
    'nav.quotes': '명언',
    'nav.topics': '주제',
    'nav.about': '소개',
    'feed.random': '랜덤',
    'feed.shuffle': '셔플',
    'feed.empty': '아직 등록된 명언이 없습니다. npm run new 로 첫 번째 명언을 등록해보세요!',
    'card.pinned': '주요 명언',
    'action.poster': '포스터 생성',
    'action.copy': '명언 복사',
    'action.share': '공유 / 링크 복사',
    'action.shareTitle': 'Quotes 엄선 명언',
    'action.copied': '링크가 복사되었습니다!',
    'action.copyFailed': '복사 실패, 수동으로 복사해주세요',
    'poster.title': '명언 포스터',
    'poster.save': '이미지 저장',
    'poster.copyImg': '이미지 복사',
    'poster.copied': '클립보드에 이미지가 복사되었습니다!',
    'poster.scan': '스캔하여 원문 보기',
    'poster.lang': '언어',
    'search.btn': '검색 (⌘K)',
    'search.placeholder': '명언, 저자, 출처, 태그 검색...',
    'search.noResults': '일치하는 명언을 찾을 수 없습니다',
    'search.count': '개의 명언',
    'tags.title': '주제 및 태그',
    'tags.desc': '주제별로 엄선된 지혜 탐색',
    'time.justNow': '방금 전',
    'time.minutesAgo': '분 전',
    'time.hoursAgo': '시간 전',
    'time.yesterday': '어제',
    'time.daysAgo': '일 전',
  },
  vi: {
    'site.title': 'Quotes',
    'site.description': 'Tuyển tập những câu nói thông tuệ, những chiêm nghiệm sâu sắc và mô hình tư duy vượt thời gian.',
    'nav.quotes': 'Danh ngôn',
    'nav.topics': 'Chủ đề',
    'nav.about': 'Giới thiệu',
    'feed.random': 'Ngẫu nhiên',
    'feed.shuffle': 'Đổi câu',
    'feed.empty': 'Chưa có danh ngôn. Hãy tạo câu đầu tiên bằng npm run new!',
    'card.pinned': 'Ghim nổi bật',
    'action.poster': 'Tạo áp phích',
    'action.copy': 'Sao chép',
    'action.share': 'Chia sẻ / Sao chép liên kết',
    'action.shareTitle': 'Quotes - Tuyển tập danh ngôn',
    'action.copied': 'Đã sao chép liên kết!',
    'action.copyFailed': 'Sao chép thất bại',
    'poster.title': 'Áp phích danh ngôn',
    'poster.save': 'Lưu hình ảnh',
    'poster.copyImg': 'Sao chép ảnh',
    'poster.copied': 'Đã sao chép hình ảnh vào khay nhớ tạm!',
    'poster.scan': 'Quét mã xem nguyên văn',
    'poster.lang': 'Ngôn ngữ',
    'search.btn': 'Tìm kiếm (⌘K)',
    'search.placeholder': 'Tìm kiếm danh ngôn, tác giả, chủ đề...',
    'search.noResults': 'Không tìm thấy danh ngôn phù hợp',
    'search.count': 'câu danh ngôn',
    'tags.title': 'Chủ đề & Nhãn',
    'tags.desc': 'Khám phá tri thức tuyển chọn theo chủ đề',
    'time.justNow': 'vừa xong',
    'time.minutesAgo': 'phút trước',
    'time.hoursAgo': 'giờ trước',
    'time.yesterday': 'hôm qua',
    'time.daysAgo': 'ngày trước',
  },
} as const;

export type TranslationKey = keyof typeof UI_TRANSLATIONS.zh;

export function useTranslations(locale: Locale = DEFAULT_LOCALE) {
  const dict = UI_TRANSLATIONS[locale] || UI_TRANSLATIONS[DEFAULT_LOCALE];
  return function t(key: TranslationKey): string {
    return (dict as any)[key] || (UI_TRANSLATIONS[DEFAULT_LOCALE] as any)[key] || key;
  };
}

// 格式化相对时间
export function formatLocalizedRelativeTime(date: Date, locale: Locale = DEFAULT_LOCALE): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const t = useTranslations(locale);

  if (diffInSeconds < 60) {
    return t('time.justNow');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return locale === 'en' ? `${diffInMinutes}m ago` : `${diffInMinutes} ${t('time.minutesAgo')}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return locale === 'en' ? `${diffInHours}h ago` : `${diffInHours} ${t('time.hoursAgo')}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return t('time.yesterday');
  }
  if (diffInDays < 30) {
    return locale === 'en' ? `${diffInDays}d ago` : `${diffInDays} ${t('time.daysAgo')}`;
  }

  // 超过一个月显示年月日
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 转换当前路径到目标语言路径
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  // 移除开头的语种前缀
  let cleanPath = pathname;
  for (const [code, info] of Object.entries(LOCALES)) {
    if (code !== DEFAULT_LOCALE && info.prefix) {
      if (cleanPath === info.prefix || cleanPath.startsWith(`${info.prefix}/`)) {
        cleanPath = cleanPath.slice(info.prefix.length) || '/';
        break;
      }
    }
  }

  if (targetLocale === DEFAULT_LOCALE) {
    return cleanPath || '/';
  }

  const prefix = LOCALES[targetLocale]?.prefix || '';
  return cleanPath === '/' ? `${prefix}` : `${prefix}${cleanPath}`;
}
