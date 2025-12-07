import { Lesson } from '../types';

export const lessons: Lesson[] = [
  // Level 1 - Absolute Beginner
  {
    id: 1,
    title: 'First Words',
    titleJp: '最初の言葉',
    description: 'Learn the most essential Japanese words everyone uses daily',
    type: 'vocabulary',
    level: 1,
    content: [
      {
        type: 'text',
        data: {
          title: 'Welcome to Real Japanese!',
          body: "Forget what textbooks taught you. Japanese people don't actually talk like robots. In this lesson, you'll learn words you'll hear every single day in Japan - on TV, on the street, and in conversations with friends."
        }
      },
      {
        type: 'tip',
        data: {
          title: '💡 Real Talk',
          body: "Textbooks teach you 私 (watashi) for 'I', but guys rarely use it! Most men say 俺 (ore) with friends or 僕 (boku) in semi-formal situations. Only use 私 in very formal settings."
        }
      },
      {
        type: 'vocabulary',
        data: {
          words: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
      },
      {
        type: 'dialogue',
        data: {
          title: 'At a Convenience Store',
          lines: [
            { speaker: 'You', japanese: 'これください', english: 'This please' },
            { speaker: 'Clerk', japanese: '108円です', english: "That's 108 yen" },
            { speaker: 'You', japanese: 'はい', english: 'Here you go' },
            { speaker: 'Clerk', japanese: 'ありがとうございます！', english: 'Thank you!' }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'What does やばい mean?',
        options: ['Boring', 'Amazing/Terrible (context)', 'Hungry', 'Tired'],
        correctAnswer: 'Amazing/Terrible (context)',
        explanation: 'やばい is one of the most versatile slang words! It can mean amazing, terrible, crazy, or just express strong emotion.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Which word do most guys use for "I" when talking casually?',
        options: ['私 (watashi)', '俺 (ore)', 'あなた', '彼'],
        correctAnswer: '俺 (ore)',
        explanation: '俺 is the casual masculine "I". 私 sounds too formal for casual conversation among men.',
        points: 10
      },
      {
        id: 3,
        type: 'typing',
        question: 'Type "this" in Japanese (hiragana)',
        correctAnswer: ['これ'],
        explanation: 'これ means "this" (near the speaker)',
        points: 15
      }
    ],
    xpReward: 50
  },
  {
    id: 2,
    title: 'Essential Reactions',
    titleJp: 'リアクション',
    description: "Learn how Japanese people actually react - not the textbook way",
    type: 'vocabulary',
    level: 1,
    content: [
      {
        type: 'text',
        data: {
          title: 'Sound Natural!',
          body: "Japanese conversation is full of reactions and filler words. Without them, you sound like a robot or too formal. Let's learn the real sounds of Japanese conversation."
        }
      },
      {
        type: 'vocabulary',
        data: {
          words: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]
        }
      },
      {
        type: 'tip',
        data: {
          title: '💡 Pro Tip: Aizuchi (相槌)',
          body: 'Japanese speakers constantly give verbal feedback while listening. Use えー, へー, そうなんだ, マジで? to show you\'re engaged. Silence makes you seem disinterested!'
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Someone tells you something surprising. What do you say?',
        options: ['すごい', 'マジで？', 'わかった', 'だるい'],
        correctAnswer: 'マジで？',
        explanation: 'マジで？ (Seriously?/For real?) is the natural reaction to surprising news.',
        points: 10
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'What does すごい mean?',
        options: ['Bad', 'Amazing/Incredible', 'Small', 'Fast'],
        correctAnswer: 'Amazing/Incredible',
        explanation: 'すごい expresses that something is impressive or incredible. すげー is the casual masculine version.',
        points: 10
      }
    ],
    xpReward: 50
  },
  {
    id: 3,
    title: 'Days & Time',
    titleJp: '日と時間',
    description: 'Master talking about days, weeks, and making plans',
    type: 'vocabulary',
    level: 1,
    content: [
      {
        type: 'text',
        data: {
          title: 'Making Plans Like a Native',
          body: "Knowing time words is essential for making plans. Japanese people love to plan, and you'll hear these words constantly."
        }
      },
      {
        type: 'vocabulary',
        data: {
          words: [25, 26, 27, 28, 29, 36, 37, 38]
        }
      },
      {
        type: 'dialogue',
        data: {
          title: 'Making Plans',
          lines: [
            { speaker: 'A', japanese: '明日、暇？', english: 'Are you free tomorrow?' },
            { speaker: 'B', japanese: '明日はちょっと...', english: "Tomorrow is a bit..." },
            { speaker: 'A', japanese: 'じゃあ、今週末は？', english: 'How about this weekend then?' },
            { speaker: 'B', japanese: 'いいよ！どこ行く？', english: "Sure! Where should we go?" }
          ]
        }
      },
      {
        type: 'tip',
        data: {
          title: '💡 Soft Refusals',
          body: "Japanese rarely say 'no' directly. ちょっと... (a bit...) is a polite refusal. The trailing off signals they can't make it without being rude."
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'How do you casually ask "Are you free today?"',
        options: ['今日、暇？', '今日は大丈夫ですか', '本日はいかがですか', '今日は何'],
        correctAnswer: '今日、暇？',
        explanation: '今日、暇？is the casual natural way to ask if someone is free.',
        points: 10
      },
      {
        id: 2,
        type: 'typing',
        question: 'Type "tomorrow" in Japanese (hiragana)',
        correctAnswer: ['あした', 'あす'],
        explanation: '明日 can be read as あした (common) or あす (more formal)',
        points: 15
      }
    ],
    xpReward: 50
  },
  // Kanji Lessons
  {
    id: 4,
    title: 'First Kanji: Numbers',
    titleJp: '数字の漢字',
    description: 'Learn kanji for numbers 1-10 - you see these everywhere!',
    type: 'kanji',
    level: 1,
    content: [
      {
        type: 'text',
        data: {
          title: 'Your Kanji Journey Begins!',
          body: "Number kanji are the easiest to learn and you'll see them everywhere in Japan - prices, dates, floors in buildings. Master these first!"
        }
      },
      {
        type: 'kanji',
        data: {
          characters: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
        }
      },
      {
        type: 'tip',
        data: {
          title: '💡 Number Kanji Pattern',
          body: 'Notice how 一, 二, 三 are literally 1, 2, 3 horizontal lines? Ancient Chinese made these super logical! After 三, they got creative to avoid confusion.'
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'What number is 五?',
        options: ['3', '5', '7', '9'],
        correctAnswer: '5',
        explanation: '五 (go/itsutsu) means 5',
        points: 10
      },
      {
        id: 2,
        type: 'matching',
        question: 'Match the kanji to its meaning',
        options: ['一', '三', '七', '十'],
        correctAnswer: ['1', '3', '7', '10'],
        explanation: '一=1, 三=3, 七=7, 十=10',
        points: 20
      }
    ],
    xpReward: 60
  },
  {
    id: 5,
    title: 'Days of the Week Kanji',
    titleJp: '曜日の漢字',
    description: 'Learn the kanji for each day of the week',
    type: 'kanji',
    level: 1,
    content: [
      {
        type: 'text',
        data: {
          title: 'Days of the Week',
          body: "Japanese days are based on celestial bodies - Sun, Moon, and the 5 elements. This makes them easier to remember!"
        }
      },
      {
        type: 'kanji',
        data: {
          characters: [1, 2, 3, 4, 5, 6, 7]
        }
      },
      {
        type: 'tip',
        data: {
          title: '💡 Memory Trick',
          body: 'Sunday = 日 (Sun), Monday = 月 (Moon), then Fire, Water, Wood, Metal, Earth. Same as Western planets: Sun-day, Moon-day, Mars (火), Mercury (水), Jupiter (木), Venus (金), Saturn (土)!'
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Which kanji means "fire" (Tuesday)?',
        options: ['水', '火', '木', '金'],
        correctAnswer: '火',
        explanation: '火 (hi/ka) means fire. 火曜日 = Tuesday',
        points: 10
      },
      {
        id: 2,
        type: 'matching',
        question: 'Match the kanji to its meaning',
        options: ['日', '月', '木', '土'],
        correctAnswer: ['Sun', 'Moon', 'Tree', 'Earth'],
        explanation: '日=Sun, 月=Moon, 木=Tree, 土=Earth/Soil',
        points: 20
      }
    ],
    xpReward: 60
  },
  // Slang Lesson
  {
    id: 6,
    title: 'Youth Slang 101',
    titleJp: '若者言葉',
    description: "Learn the slang that young Japanese people actually use",
    type: 'slang',
    level: 2,
    content: [
      {
        type: 'text',
        data: {
          title: 'Real Youth Japanese',
          body: "This is the Japanese you'll hear on the street, in dramas, and when chatting with young people. Textbooks won't teach you this!"
        }
      },
      {
        type: 'vocabulary',
        data: {
          slangIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
      },
      {
        type: 'dialogue',
        data: {
          title: 'Chat Between Friends',
          lines: [
            { speaker: 'A', japanese: '昨日のテスト、マジやばかった', english: "Yesterday's test was seriously crazy" },
            { speaker: 'B', japanese: 'それなー。めっちゃ難しかった', english: 'Fr though. It was super hard' },
            { speaker: 'A', japanese: 'エグいよね。絶対落ちた', english: "It was brutal right? I definitely failed" },
            { speaker: 'B', japanese: 'ドンマイドンマイ！', english: "Don't worry about it!" }
          ]
        }
      },
      {
        type: 'tip',
        data: {
          title: '⚠️ Warning',
          body: "Slang is casual by nature. Don't use these with your boss, teachers, or in formal situations! Save them for friends and casual settings."
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'What does ウケる mean?',
        options: ['Sad', 'Angry', 'LOL/Hilarious', 'Scary'],
        correctAnswer: 'LOL/Hilarious',
        explanation: 'ウケる is like saying "lol" out loud when something is funny',
        points: 10
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'それな is used to express:',
        options: ['Disagreement', 'Strong agreement', 'Confusion', 'Anger'],
        correctAnswer: 'Strong agreement',
        explanation: "それな means 'that\'s so true' or 'I know right' - used when you strongly agree",
        points: 10
      }
    ],
    xpReward: 75
  },
  // Grammar Lesson
  {
    id: 7,
    title: 'Casual Sentence Endings',
    titleJp: 'カジュアルな文末',
    description: 'Sound natural with these casual sentence patterns',
    type: 'grammar',
    level: 2,
    content: [
      {
        type: 'text',
        data: {
          title: 'Ditch the です/ます!',
          body: "In casual speech, Japanese people drop the polite endings. Here's how to sound natural with friends."
        }
      },
      {
        type: 'grammar',
        data: {
          patterns: [
            {
              pattern: '〜じゃん',
              meaning: "Isn't it? / It's obviously...",
              formal: '〜でしょう',
              casual: '〜じゃん',
              examples: ['いいじゃん！', 'かわいいじゃん！', '知ってるじゃん']
            },
            {
              pattern: '〜っけ',
              meaning: 'Was it...? (trying to remember)',
              formal: '〜でしたか',
              casual: '〜っけ',
              examples: ['何時だっけ？', '名前なんだっけ？']
            },
            {
              pattern: '〜んだけど',
              meaning: 'The thing is... / Actually...',
              formal: '〜のですが',
              casual: '〜んだけど',
              examples: ['ちょっと聞きたいんだけど...', '話があるんだけど...']
            }
          ]
        }
      },
      {
        type: 'tip',
        data: {
          title: '💡 じゃん is from Tokyo!',
          body: 'じゃん originated in Yokohama/Tokyo area. Osaka people use やん instead. Both mean the same thing!'
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'fill_blank',
        question: 'Complete: いい___！(That\'s good, right!)',
        correctAnswer: ['じゃん'],
        explanation: 'いいじゃん！is a casual way to express approval',
        points: 15
      }
    ],
    xpReward: 70
  },
  // Conversation/Culture Lesson
  {
    id: 8,
    title: 'Ordering at Restaurants',
    titleJp: 'レストランで注文',
    description: 'Real phrases for eating out in Japan',
    type: 'conversation',
    level: 2,
    content: [
      {
        type: 'text',
        data: {
          title: 'Essential Restaurant Japanese',
          body: "Japan has amazing food everywhere. Here's exactly what to say from entering to paying!"
        }
      },
      {
        type: 'dialogue',
        data: {
          title: 'At an Izakaya',
          lines: [
            { speaker: 'Staff', japanese: 'いらっしゃいませ！何名様ですか？', english: 'Welcome! How many people?' },
            { speaker: 'You', japanese: '2人です', english: 'Two people' },
            { speaker: 'Staff', japanese: 'こちらへどうぞ', english: 'This way please' },
            { speaker: 'You', japanese: 'とりあえずビールで！', english: 'Beer first!' },
            { speaker: 'Friend', japanese: '私も！', english: 'Me too!' },
            { speaker: 'You', japanese: 'あと、枝豆と唐揚げください', english: 'And edamame and karaage please' }
          ]
        }
      },
      {
        type: 'vocabulary',
        data: {
          custom: [
            { japanese: 'お会計お願いします', reading: 'おかいけいおねがいします', english: 'Check please' },
            { japanese: '別々で', reading: 'べつべつで', english: 'Separately (splitting bill)' },
            { japanese: '一緒で', reading: 'いっしょで', english: 'Together (one bill)' },
            { japanese: 'おすすめは？', reading: 'おすすめは？', english: "What's recommended?" },
            { japanese: 'これ何ですか？', reading: 'これなんですか？', english: 'What is this?' }
          ]
        }
      },
      {
        type: 'tip',
        data: {
          title: '💡 Izakaya Culture',
          body: "とりあえずビール (Beer first!) is the classic izakaya opening. It's so common it's almost a ritual. Usually everyone orders at least one drink immediately."
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'How do you ask for the check?',
        options: ['お会計お願いします', 'いくらですか', 'ください', 'すみません'],
        correctAnswer: 'お会計お願いします',
        explanation: 'お会計お願いします is the standard phrase for asking for the check',
        points: 10
      }
    ],
    xpReward: 80
  },
  // More advanced lessons
  {
    id: 9,
    title: 'Texting & Line Japanese',
    titleJp: 'LINEの日本語',
    description: 'How to text like a Japanese person',
    type: 'slang',
    level: 3,
    content: [
      {
        type: 'text',
        data: {
          title: 'Digital Japanese',
          body: "Texting in Japanese is a whole different language! Learn the abbreviations, emoji culture, and patterns that everyone uses."
        }
      },
      {
        type: 'vocabulary',
        data: {
          slangIds: [21, 22, 23, 24, 25]
        }
      },
      {
        type: 'tip',
        data: {
          title: '📱 Texting Patterns',
          body: `Common abbreviations:
• りょ = 了解 (roger)
• おけ = OK
• あざす = ありがとうございます
• おつ = お疲れ様
• とりま = とりあえず、まあ
• www = LOL (looks like grass 草)`
        }
      },
      {
        type: 'dialogue',
        data: {
          title: 'Typical LINE Conversation',
          lines: [
            { speaker: 'A', japanese: '今どこ？', english: 'Where are you now?' },
            { speaker: 'B', japanese: '駅！もうすぐ着く', english: "Station! Almost there" },
            { speaker: 'A', japanese: 'りょ。マック前で待ってる', english: "Roger. Waiting in front of McDonald's" },
            { speaker: 'B', japanese: 'おけおけ！', english: 'OK OK!' }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'matching',
        question: 'Match the abbreviation to its meaning',
        options: ['りょ', 'おつ', 'あざす', 'とりま'],
        correctAnswer: ['了解', 'お疲れ様', 'ありがとう', 'とりあえず'],
        explanation: 'These are common texting abbreviations',
        points: 20
      }
    ],
    xpReward: 80
  },
  {
    id: 10,
    title: 'Work & Keigo Basics',
    titleJp: '仕事と敬語',
    description: 'Essential polite Japanese for work situations',
    type: 'grammar',
    level: 4,
    content: [
      {
        type: 'text',
        data: {
          title: 'Workplace Japanese',
          body: "Keigo (敬語) is formal language used at work and with strangers. You need the basics to survive in a Japanese workplace!"
        }
      },
      {
        type: 'vocabulary',
        data: {
          custom: [
            { japanese: 'お疲れ様です', reading: 'おつかれさまです', english: 'Hello/Goodbye at work' },
            { japanese: 'お先に失礼します', reading: 'おさきにしつれいします', english: "I'm leaving before you (excuse me)" },
            { japanese: '承知しました', reading: 'しょうちしました', english: 'Understood (formal)' },
            { japanese: '少々お待ちください', reading: 'しょうしょうおまちください', english: 'Please wait a moment' },
            { japanese: 'お忙しいところ恐れ入りますが', reading: 'おいそがしいところおそれいりますが', english: 'Sorry to bother you when you\'re busy, but...' }
          ]
        }
      },
      {
        type: 'tip',
        data: {
          title: '💼 お疲れ様です is EVERYTHING',
          body: "お疲れ様です is the most important work phrase. Use it as: greeting in morning, greeting in hallway, saying goodbye, answering phone, starting email. It's the Swiss Army knife of work Japanese!"
        }
      }
    ],
    quiz: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'What do you say when leaving work before others?',
        options: ['さようなら', 'お先に失礼します', 'バイバイ', 'じゃあね'],
        correctAnswer: 'お先に失礼します',
        explanation: "お先に失礼します shows respect for coworkers who are still working",
        points: 10
      }
    ],
    xpReward: 100
  }
];

// Get lessons by level
export const getLessonsByLevel = (level: number): Lesson[] => {
  return lessons.filter(lesson => lesson.level <= level);
};

// Get lessons by type
export const getLessonsByType = (type: Lesson['type']): Lesson[] => {
  return lessons.filter(lesson => lesson.type === type);
};

// Get lesson by ID
export const getLessonById = (id: number): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id);
};
