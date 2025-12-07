import { Kanji } from '../types';

// Most common kanji organized by JLPT level and frequency
export const kanjiData: Kanji[] = [
  // N5 Level - Essential Kanji (1-80)
  {
    id: 1,
    character: '日',
    onyomi: ['ニチ', 'ジツ'],
    kunyomi: ['ひ', 'か'],
    meaning: ['day', 'sun', 'Japan'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '日本', reading: 'にほん', meaning: 'Japan' },
      { word: '今日', reading: 'きょう', meaning: 'today' },
      { word: '日曜日', reading: 'にちようび', meaning: 'Sunday' }
    ],
    radicals: ['日'],
    mnemonics: 'Picture the sun ☀️ - it\'s a box with a line through it, like sunlight streaming through a window.'
  },
  {
    id: 2,
    character: '月',
    onyomi: ['ゲツ', 'ガツ'],
    kunyomi: ['つき'],
    meaning: ['month', 'moon'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '月曜日', reading: 'げつようび', meaning: 'Monday' },
      { word: '一月', reading: 'いちがつ', meaning: 'January' },
      { word: '今月', reading: 'こんげつ', meaning: 'this month' }
    ],
    radicals: ['月'],
    mnemonics: 'The moon 🌙 with legs! Those two lines inside are craters you can see on a full moon.'
  },
  {
    id: 3,
    character: '火',
    onyomi: ['カ'],
    kunyomi: ['ひ'],
    meaning: ['fire'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '火曜日', reading: 'かようび', meaning: 'Tuesday' },
      { word: '花火', reading: 'はなび', meaning: 'fireworks' },
      { word: '火事', reading: 'かじ', meaning: 'fire (disaster)' }
    ],
    radicals: ['火'],
    mnemonics: 'A person 人 with flames shooting out! The dots are sparks flying off the fire 🔥'
  },
  {
    id: 4,
    character: '水',
    onyomi: ['スイ'],
    kunyomi: ['みず'],
    meaning: ['water'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '水曜日', reading: 'すいようび', meaning: 'Wednesday' },
      { word: '水', reading: 'みず', meaning: 'water' },
      { word: '水泳', reading: 'すいえい', meaning: 'swimming' }
    ],
    radicals: ['水'],
    mnemonics: 'A river flowing down 💧 - the vertical line is the stream, droplets splashing on both sides.'
  },
  {
    id: 5,
    character: '木',
    onyomi: ['モク', 'ボク'],
    kunyomi: ['き', 'こ'],
    meaning: ['tree', 'wood'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '木曜日', reading: 'もくようび', meaning: 'Thursday' },
      { word: '木', reading: 'き', meaning: 'tree' },
      { word: '木村', reading: 'きむら', meaning: 'Kimura (name)' }
    ],
    radicals: ['木'],
    mnemonics: 'A tree 🌳 with branches spreading up and roots going down!'
  },
  {
    id: 6,
    character: '金',
    onyomi: ['キン', 'コン'],
    kunyomi: ['かね', 'かな'],
    meaning: ['gold', 'money', 'metal'],
    strokeCount: 8,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '金曜日', reading: 'きんようび', meaning: 'Friday' },
      { word: 'お金', reading: 'おかね', meaning: 'money' },
      { word: '金持ち', reading: 'かねもち', meaning: 'rich person' }
    ],
    radicals: ['金'],
    mnemonics: 'A mountain ⛰️ with treasure inside! The top is the peak, dots are gold nuggets.'
  },
  {
    id: 7,
    character: '土',
    onyomi: ['ド', 'ト'],
    kunyomi: ['つち'],
    meaning: ['earth', 'soil', 'ground'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '土曜日', reading: 'どようび', meaning: 'Saturday' },
      { word: '土地', reading: 'とち', meaning: 'land' },
      { word: '土', reading: 'つち', meaning: 'soil' }
    ],
    radicals: ['土'],
    mnemonics: 'A plant sprouting from the ground 🌱 - cross shows ground level, vertical is the sprout!'
  },
  {
    id: 8,
    character: '一',
    onyomi: ['イチ', 'イツ'],
    kunyomi: ['ひと'],
    meaning: ['one'],
    strokeCount: 1,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '一つ', reading: 'ひとつ', meaning: 'one (thing)' },
      { word: '一人', reading: 'ひとり', meaning: 'one person' },
      { word: '一番', reading: 'いちばん', meaning: 'number one, best' }
    ],
    radicals: ['一'],
    mnemonics: 'One single horizontal line = 1️⃣'
  },
  {
    id: 9,
    character: '二',
    onyomi: ['ニ'],
    kunyomi: ['ふた'],
    meaning: ['two'],
    strokeCount: 2,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '二つ', reading: 'ふたつ', meaning: 'two (things)' },
      { word: '二人', reading: 'ふたり', meaning: 'two people' },
      { word: '二月', reading: 'にがつ', meaning: 'February' }
    ],
    radicals: ['二'],
    mnemonics: 'Two horizontal lines = 2️⃣'
  },
  {
    id: 10,
    character: '三',
    onyomi: ['サン'],
    kunyomi: ['み', 'みっ'],
    meaning: ['three'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '三つ', reading: 'みっつ', meaning: 'three (things)' },
      { word: '三人', reading: 'さんにん', meaning: 'three people' },
      { word: '三月', reading: 'さんがつ', meaning: 'March' }
    ],
    radicals: ['三'],
    mnemonics: 'Three horizontal lines = 3️⃣'
  },
  {
    id: 11,
    character: '四',
    onyomi: ['シ'],
    kunyomi: ['よ', 'よん', 'よっ'],
    meaning: ['four'],
    strokeCount: 5,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '四つ', reading: 'よっつ', meaning: 'four (things)' },
      { word: '四人', reading: 'よにん', meaning: 'four people' },
      { word: '四月', reading: 'しがつ', meaning: 'April' }
    ],
    radicals: ['口', '八'],
    mnemonics: 'A window with 4 panes 🪟. The 八 (eight) inside is split in half!'
  },
  {
    id: 12,
    character: '五',
    onyomi: ['ゴ'],
    kunyomi: ['いつ'],
    meaning: ['five'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '五つ', reading: 'いつつ', meaning: 'five (things)' },
      { word: '五人', reading: 'ごにん', meaning: 'five people' },
      { word: '五月', reading: 'ごがつ', meaning: 'May' }
    ],
    radicals: ['五'],
    mnemonics: 'An abacus with 5 beads! The crossed lines look like 5 arranged beads.'
  },
  {
    id: 13,
    character: '六',
    onyomi: ['ロク'],
    kunyomi: ['む', 'むい', 'むっ'],
    meaning: ['six'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '六つ', reading: 'むっつ', meaning: 'six (things)' },
      { word: '六人', reading: 'ろくにん', meaning: 'six people' },
      { word: '六月', reading: 'ろくがつ', meaning: 'June' }
    ],
    radicals: ['亠', '八'],
    mnemonics: 'A person doing a split with a hat on top - 6 limbs/points!'
  },
  {
    id: 14,
    character: '七',
    onyomi: ['シチ'],
    kunyomi: ['なな', 'なの'],
    meaning: ['seven'],
    strokeCount: 2,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '七つ', reading: 'ななつ', meaning: 'seven (things)' },
      { word: '七人', reading: 'しちにん', meaning: 'seven people' },
      { word: '七月', reading: 'しちがつ', meaning: 'July' }
    ],
    radicals: ['七'],
    mnemonics: 'Looks like an upside-down 7! Or a samurai sword ⚔️ cutting at an angle.'
  },
  {
    id: 15,
    character: '八',
    onyomi: ['ハチ'],
    kunyomi: ['や', 'やっ', 'よう'],
    meaning: ['eight'],
    strokeCount: 2,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '八つ', reading: 'やっつ', meaning: 'eight (things)' },
      { word: '八人', reading: 'はちにん', meaning: 'eight people' },
      { word: '八月', reading: 'はちがつ', meaning: 'August' }
    ],
    radicals: ['八'],
    mnemonics: 'Two lines spreading apart - like 8 sliced in half!'
  },
  {
    id: 16,
    character: '九',
    onyomi: ['キュウ', 'ク'],
    kunyomi: ['ここの'],
    meaning: ['nine'],
    strokeCount: 2,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '九つ', reading: 'ここのつ', meaning: 'nine (things)' },
      { word: '九人', reading: 'きゅうにん', meaning: 'nine people' },
      { word: '九月', reading: 'くがつ', meaning: 'September' }
    ],
    radicals: ['九'],
    mnemonics: 'A twisted 9! Or someone\'s arm flexing 💪 nine times.'
  },
  {
    id: 17,
    character: '十',
    onyomi: ['ジュウ', 'ジッ'],
    kunyomi: ['とお', 'と'],
    meaning: ['ten'],
    strokeCount: 2,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '十', reading: 'じゅう', meaning: 'ten' },
      { word: '二十', reading: 'にじゅう', meaning: 'twenty' },
      { word: '十月', reading: 'じゅうがつ', meaning: 'October' }
    ],
    radicals: ['十'],
    mnemonics: 'A cross ✝️ represents 10 - like counting on both hands!'
  },
  {
    id: 18,
    character: '百',
    onyomi: ['ヒャク'],
    kunyomi: [],
    meaning: ['hundred'],
    strokeCount: 6,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '百', reading: 'ひゃく', meaning: 'hundred' },
      { word: '百円', reading: 'ひゃくえん', meaning: '100 yen' },
      { word: '三百', reading: 'さんびゃく', meaning: '300' }
    ],
    radicals: ['一', '白'],
    mnemonics: 'One (一) on top of white (白) - 100 is "one white" or one complete set!'
  },
  {
    id: 19,
    character: '千',
    onyomi: ['セン'],
    kunyomi: ['ち'],
    meaning: ['thousand'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '千', reading: 'せん', meaning: 'thousand' },
      { word: '千円', reading: 'せんえん', meaning: '1000 yen' },
      { word: '二千', reading: 'にせん', meaning: '2000' }
    ],
    radicals: ['千'],
    mnemonics: 'A person (亻) carrying 10 (十) bags - 10 x 100 = 1000!'
  },
  {
    id: 20,
    character: '万',
    onyomi: ['マン', 'バン'],
    kunyomi: [],
    meaning: ['ten thousand'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '一万', reading: 'いちまん', meaning: '10,000' },
      { word: '万円', reading: 'まんえん', meaning: '10,000 yen' },
      { word: '万歳', reading: 'ばんざい', meaning: 'hurray!' }
    ],
    radicals: ['万'],
    mnemonics: 'A fancy 7 with a hat - like 10,000 is fancy big number!'
  },
  // More essential kanji
  {
    id: 21,
    character: '人',
    onyomi: ['ジン', 'ニン'],
    kunyomi: ['ひと'],
    meaning: ['person', 'people'],
    strokeCount: 2,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '人', reading: 'ひと', meaning: 'person' },
      { word: '日本人', reading: 'にほんじん', meaning: 'Japanese person' },
      { word: '三人', reading: 'さんにん', meaning: 'three people' }
    ],
    radicals: ['人'],
    mnemonics: 'A person walking 🚶 - two legs taking a step!'
  },
  {
    id: 22,
    character: '口',
    onyomi: ['コウ', 'ク'],
    kunyomi: ['くち'],
    meaning: ['mouth', 'opening'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '口', reading: 'くち', meaning: 'mouth' },
      { word: '人口', reading: 'じんこう', meaning: 'population' },
      { word: '入口', reading: 'いりぐち', meaning: 'entrance' }
    ],
    radicals: ['口'],
    mnemonics: 'An open mouth 👄 - a simple square opening!'
  },
  {
    id: 23,
    character: '目',
    onyomi: ['モク', 'ボク'],
    kunyomi: ['め'],
    meaning: ['eye'],
    strokeCount: 5,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '目', reading: 'め', meaning: 'eye' },
      { word: '目的', reading: 'もくてき', meaning: 'purpose' },
      { word: '一番目', reading: 'いちばんめ', meaning: 'first' }
    ],
    radicals: ['目'],
    mnemonics: 'An eye 👁️ turned sideways - you can see the pupil lines inside!'
  },
  {
    id: 24,
    character: '耳',
    onyomi: ['ジ'],
    kunyomi: ['みみ'],
    meaning: ['ear'],
    strokeCount: 6,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '耳', reading: 'みみ', meaning: 'ear' },
      { word: '耳鼻科', reading: 'じびか', meaning: 'ENT doctor' }
    ],
    radicals: ['耳'],
    mnemonics: 'An ear 👂 from the side with the inner ear details!'
  },
  {
    id: 25,
    character: '手',
    onyomi: ['シュ'],
    kunyomi: ['て'],
    meaning: ['hand'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '手', reading: 'て', meaning: 'hand' },
      { word: '上手', reading: 'じょうず', meaning: 'skilled' },
      { word: '下手', reading: 'へた', meaning: 'unskilled' }
    ],
    radicals: ['手'],
    mnemonics: 'A hand 🤚 with fingers spread out - three fingers and a thumb!'
  },
  {
    id: 26,
    character: '足',
    onyomi: ['ソク'],
    kunyomi: ['あし', 'た'],
    meaning: ['foot', 'leg', 'sufficient'],
    strokeCount: 7,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '足', reading: 'あし', meaning: 'foot/leg' },
      { word: '一足', reading: 'いっそく', meaning: 'one pair (shoes)' },
      { word: '足りる', reading: 'たりる', meaning: 'to be sufficient' }
    ],
    radicals: ['口', '止'],
    mnemonics: 'A mouth (口) on top of a footprint - your foot stops at your mouth level when sitting! 🦶'
  },
  {
    id: 27,
    character: '大',
    onyomi: ['ダイ', 'タイ'],
    kunyomi: ['おお'],
    meaning: ['big', 'large'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '大きい', reading: 'おおきい', meaning: 'big' },
      { word: '大学', reading: 'だいがく', meaning: 'university' },
      { word: '大人', reading: 'おとな', meaning: 'adult' }
    ],
    radicals: ['大'],
    mnemonics: 'A person with arms spread wide showing "THIS BIG!" 🙆'
  },
  {
    id: 28,
    character: '小',
    onyomi: ['ショウ'],
    kunyomi: ['ちい', 'こ', 'お'],
    meaning: ['small', 'little'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '小さい', reading: 'ちいさい', meaning: 'small' },
      { word: '小学校', reading: 'しょうがっこう', meaning: 'elementary school' },
      { word: '小説', reading: 'しょうせつ', meaning: 'novel' }
    ],
    radicals: ['小'],
    mnemonics: 'A tiny thing being held - two dots like small crumbs! 🤏'
  },
  {
    id: 29,
    character: '中',
    onyomi: ['チュウ'],
    kunyomi: ['なか'],
    meaning: ['inside', 'middle', 'China'],
    strokeCount: 4,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '中', reading: 'なか', meaning: 'inside' },
      { word: '中国', reading: 'ちゅうごく', meaning: 'China' },
      { word: '中学', reading: 'ちゅうがく', meaning: 'middle school' }
    ],
    radicals: ['口', '丨'],
    mnemonics: 'A box with a line through the MIDDLE! 📦'
  },
  {
    id: 30,
    character: '上',
    onyomi: ['ジョウ', 'ショウ'],
    kunyomi: ['うえ', 'あ', 'のぼ'],
    meaning: ['up', 'above', 'top'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '上', reading: 'うえ', meaning: 'above' },
      { word: '上手', reading: 'じょうず', meaning: 'good at' },
      { word: '上がる', reading: 'あがる', meaning: 'to go up' }
    ],
    radicals: ['上'],
    mnemonics: 'An arrow pointing UP ⬆️ from a surface!'
  },
  {
    id: 31,
    character: '下',
    onyomi: ['カ', 'ゲ'],
    kunyomi: ['した', 'さ', 'くだ', 'お'],
    meaning: ['down', 'below', 'under'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '下', reading: 'した', meaning: 'below' },
      { word: '下手', reading: 'へた', meaning: 'bad at' },
      { word: '下がる', reading: 'さがる', meaning: 'to go down' }
    ],
    radicals: ['下'],
    mnemonics: 'An arrow pointing DOWN ⬇️ below a surface!'
  },
  {
    id: 32,
    character: '左',
    onyomi: ['サ'],
    kunyomi: ['ひだり'],
    meaning: ['left'],
    strokeCount: 5,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '左', reading: 'ひだり', meaning: 'left' },
      { word: '左手', reading: 'ひだりて', meaning: 'left hand' }
    ],
    radicals: ['ナ', '工'],
    mnemonics: 'The worker (工) uses their LEFT hand to write ナ!'
  },
  {
    id: 33,
    character: '右',
    onyomi: ['ウ', 'ユウ'],
    kunyomi: ['みぎ'],
    meaning: ['right'],
    strokeCount: 5,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '右', reading: 'みぎ', meaning: 'right' },
      { word: '右手', reading: 'みぎて', meaning: 'right hand' }
    ],
    radicals: ['ナ', '口'],
    mnemonics: 'Use your RIGHT hand to eat (口 mouth) ナナ!'
  },
  {
    id: 34,
    character: '男',
    onyomi: ['ダン', 'ナン'],
    kunyomi: ['おとこ'],
    meaning: ['man', 'male'],
    strokeCount: 7,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '男', reading: 'おとこ', meaning: 'man' },
      { word: '男性', reading: 'だんせい', meaning: 'male' },
      { word: '男の子', reading: 'おとこのこ', meaning: 'boy' }
    ],
    radicals: ['田', '力'],
    mnemonics: 'A man works with power (力) in the rice field (田)! 👨‍🌾'
  },
  {
    id: 35,
    character: '女',
    onyomi: ['ジョ', 'ニョ'],
    kunyomi: ['おんな', 'め'],
    meaning: ['woman', 'female'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '女', reading: 'おんな', meaning: 'woman' },
      { word: '女性', reading: 'じょせい', meaning: 'female' },
      { word: '女の子', reading: 'おんなのこ', meaning: 'girl' }
    ],
    radicals: ['女'],
    mnemonics: 'A woman kneeling gracefully 👩 - looks like someone sitting with crossed legs!'
  },
  {
    id: 36,
    character: '子',
    onyomi: ['シ', 'ス'],
    kunyomi: ['こ'],
    meaning: ['child'],
    strokeCount: 3,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '子供', reading: 'こども', meaning: 'child' },
      { word: '女子', reading: 'じょし', meaning: 'girl' },
      { word: '男子', reading: 'だんし', meaning: 'boy' }
    ],
    radicals: ['子'],
    mnemonics: 'A baby with arms raised 👶 wanting to be picked up!'
  },
  {
    id: 37,
    character: '学',
    onyomi: ['ガク'],
    kunyomi: ['まな'],
    meaning: ['study', 'learning'],
    strokeCount: 8,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '学生', reading: 'がくせい', meaning: 'student' },
      { word: '大学', reading: 'だいがく', meaning: 'university' },
      { word: '学ぶ', reading: 'まなぶ', meaning: 'to learn' }
    ],
    radicals: ['子', '冖'],
    mnemonics: 'A child (子) under a roof (冖) studying! 📚'
  },
  {
    id: 38,
    character: '生',
    onyomi: ['セイ', 'ショウ'],
    kunyomi: ['い', 'う', 'は', 'なま'],
    meaning: ['life', 'birth', 'raw'],
    strokeCount: 5,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '先生', reading: 'せんせい', meaning: 'teacher' },
      { word: '学生', reading: 'がくせい', meaning: 'student' },
      { word: '生きる', reading: 'いきる', meaning: 'to live' }
    ],
    radicals: ['生'],
    mnemonics: 'A plant growing from the ground 🌱 - new life sprouting!'
  },
  {
    id: 39,
    character: '先',
    onyomi: ['セン'],
    kunyomi: ['さき'],
    meaning: ['before', 'ahead', 'previous'],
    strokeCount: 6,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '先生', reading: 'せんせい', meaning: 'teacher' },
      { word: '先週', reading: 'せんしゅう', meaning: 'last week' },
      { word: '先に', reading: 'さきに', meaning: 'ahead, first' }
    ],
    radicals: ['先'],
    mnemonics: 'Person with long legs walking AHEAD of others! 🚶‍♂️'
  },
  {
    id: 40,
    character: '年',
    onyomi: ['ネン'],
    kunyomi: ['とし'],
    meaning: ['year'],
    strokeCount: 6,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '今年', reading: 'ことし', meaning: 'this year' },
      { word: '去年', reading: 'きょねん', meaning: 'last year' },
      { word: '来年', reading: 'らいねん', meaning: 'next year' }
    ],
    radicals: ['年'],
    mnemonics: 'Grain harvested once a YEAR - the crop cycle! 🌾'
  },
  // Continue with more kanji...
  {
    id: 41,
    character: '時',
    onyomi: ['ジ'],
    kunyomi: ['とき'],
    meaning: ['time', 'hour'],
    strokeCount: 10,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '時間', reading: 'じかん', meaning: 'time' },
      { word: '時計', reading: 'とけい', meaning: 'clock' },
      { word: '何時', reading: 'なんじ', meaning: 'what time' }
    ],
    radicals: ['日', '寺'],
    mnemonics: 'The sun (日) at the temple (寺) - monks track TIME by the sun!'
  },
  {
    id: 42,
    character: '分',
    onyomi: ['ブン', 'フン', 'ブ'],
    kunyomi: ['わ'],
    meaning: ['minute', 'part', 'understand'],
    strokeCount: 4,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '五分', reading: 'ごふん', meaning: 'five minutes' },
      { word: '分かる', reading: 'わかる', meaning: 'to understand' },
      { word: '自分', reading: 'じぶん', meaning: 'oneself' }
    ],
    radicals: ['八', '刀'],
    mnemonics: 'A knife (刀) dividing (八) something into PARTS!'
  },
  {
    id: 43,
    character: '今',
    onyomi: ['コン', 'キン'],
    kunyomi: ['いま'],
    meaning: ['now', 'present'],
    strokeCount: 4,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '今', reading: 'いま', meaning: 'now' },
      { word: '今日', reading: 'きょう', meaning: 'today' },
      { word: '今週', reading: 'こんしゅう', meaning: 'this week' }
    ],
    radicals: ['今'],
    mnemonics: 'A roof covering the moment - NOW, in this instant! ⏰'
  },
  {
    id: 44,
    character: '週',
    onyomi: ['シュウ'],
    kunyomi: [],
    meaning: ['week'],
    strokeCount: 11,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '今週', reading: 'こんしゅう', meaning: 'this week' },
      { word: '来週', reading: 'らいしゅう', meaning: 'next week' },
      { word: '週末', reading: 'しゅうまつ', meaning: 'weekend' }
    ],
    radicals: ['辶', '周'],
    mnemonics: 'Going around (辶) in a cycle (周) - a WEEK goes around! 📅'
  },
  {
    id: 45,
    character: '来',
    onyomi: ['ライ'],
    kunyomi: ['く', 'き', 'こ'],
    meaning: ['come', 'next'],
    strokeCount: 7,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '来る', reading: 'くる', meaning: 'to come' },
      { word: '来年', reading: 'らいねん', meaning: 'next year' },
      { word: '来週', reading: 'らいしゅう', meaning: 'next week' }
    ],
    radicals: ['来'],
    mnemonics: 'A tree with fruit COMING soon - branches with grain! 🌳'
  },
  {
    id: 46,
    character: '行',
    onyomi: ['コウ', 'ギョウ'],
    kunyomi: ['い', 'ゆ', 'おこな'],
    meaning: ['go', 'carry out'],
    strokeCount: 6,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '行く', reading: 'いく', meaning: 'to go' },
      { word: '旅行', reading: 'りょこう', meaning: 'travel' },
      { word: '銀行', reading: 'ぎんこう', meaning: 'bank' }
    ],
    radicals: ['彳', '亍'],
    mnemonics: 'Crossroads where you GO in different directions! 🚶'
  },
  {
    id: 47,
    character: '見',
    onyomi: ['ケン'],
    kunyomi: ['み'],
    meaning: ['see', 'look', 'show'],
    strokeCount: 7,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '見る', reading: 'みる', meaning: 'to see' },
      { word: '意見', reading: 'いけん', meaning: 'opinion' },
      { word: '見せる', reading: 'みせる', meaning: 'to show' }
    ],
    radicals: ['目', '儿'],
    mnemonics: 'An eye (目) on legs (儿) - SEEing and moving! 👀'
  },
  {
    id: 48,
    character: '聞',
    onyomi: ['ブン', 'モン'],
    kunyomi: ['き'],
    meaning: ['hear', 'ask', 'listen'],
    strokeCount: 14,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '聞く', reading: 'きく', meaning: 'to hear/ask' },
      { word: '新聞', reading: 'しんぶん', meaning: 'newspaper' }
    ],
    radicals: ['門', '耳'],
    mnemonics: 'An ear (耳) at the gate (門) - LISTENING at the door! 👂🚪'
  },
  {
    id: 49,
    character: '食',
    onyomi: ['ショク', 'ジキ'],
    kunyomi: ['た', 'く'],
    meaning: ['eat', 'food'],
    strokeCount: 9,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '食べる', reading: 'たべる', meaning: 'to eat' },
      { word: '食事', reading: 'しょくじ', meaning: 'meal' },
      { word: '食堂', reading: 'しょくどう', meaning: 'cafeteria' }
    ],
    radicals: ['食'],
    mnemonics: 'A person with a roof, eating with a spoon - FOOD time! 🍽️'
  },
  {
    id: 50,
    character: '飲',
    onyomi: ['イン'],
    kunyomi: ['の'],
    meaning: ['drink'],
    strokeCount: 12,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '飲む', reading: 'のむ', meaning: 'to drink' },
      { word: '飲み物', reading: 'のみもの', meaning: 'beverage' }
    ],
    radicals: ['食', '欠'],
    mnemonics: 'Food radical (食) + lack (欠) - you DRINK when you lack food! 🥤'
  },
  // More N4 level kanji
  {
    id: 51,
    character: '書',
    onyomi: ['ショ'],
    kunyomi: ['か'],
    meaning: ['write', 'book'],
    strokeCount: 10,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '書く', reading: 'かく', meaning: 'to write' },
      { word: '辞書', reading: 'じしょ', meaning: 'dictionary' },
      { word: '図書館', reading: 'としょかん', meaning: 'library' }
    ],
    radicals: ['聿', '日'],
    mnemonics: 'A brush writing on the sun (日) - ancient WRITING! ✍️'
  },
  {
    id: 52,
    character: '読',
    onyomi: ['ドク', 'トク', 'トウ'],
    kunyomi: ['よ'],
    meaning: ['read'],
    strokeCount: 14,
    level: 3,
    jlpt: 'N5',
    examples: [
      { word: '読む', reading: 'よむ', meaning: 'to read' },
      { word: '読書', reading: 'どくしょ', meaning: 'reading (books)' }
    ],
    radicals: ['言', '売'],
    mnemonics: 'Words (言) being sold (売) - READING text that was published! 📖'
  },
  {
    id: 53,
    character: '話',
    onyomi: ['ワ'],
    kunyomi: ['はな', 'はなし'],
    meaning: ['speak', 'talk', 'story'],
    strokeCount: 13,
    level: 3,
    jlpt: 'N5',
    examples: [
      { word: '話す', reading: 'はなす', meaning: 'to speak' },
      { word: '電話', reading: 'でんわ', meaning: 'telephone' },
      { word: '話', reading: 'はなし', meaning: 'story' }
    ],
    radicals: ['言', '舌'],
    mnemonics: 'Words (言) from the tongue (舌) - TALKING! 🗣️'
  },
  {
    id: 54,
    character: '言',
    onyomi: ['ゲン', 'ゴン'],
    kunyomi: ['い', 'こと'],
    meaning: ['say', 'word'],
    strokeCount: 7,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '言う', reading: 'いう', meaning: 'to say' },
      { word: '言葉', reading: 'ことば', meaning: 'word, language' }
    ],
    radicals: ['言'],
    mnemonics: 'Sound waves coming from a mouth - SAYING words! 💬'
  },
  {
    id: 55,
    character: '語',
    onyomi: ['ゴ'],
    kunyomi: ['かた'],
    meaning: ['language', 'word'],
    strokeCount: 14,
    level: 3,
    jlpt: 'N5',
    examples: [
      { word: '日本語', reading: 'にほんご', meaning: 'Japanese language' },
      { word: '英語', reading: 'えいご', meaning: 'English language' },
      { word: '言語', reading: 'げんご', meaning: 'language' }
    ],
    radicals: ['言', '吾'],
    mnemonics: 'Words (言) that are mine (吾) - my LANGUAGE! 🌐'
  },
  // Adding more kanji for variety
  {
    id: 56,
    character: '車',
    onyomi: ['シャ'],
    kunyomi: ['くるま'],
    meaning: ['car', 'vehicle'],
    strokeCount: 7,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '車', reading: 'くるま', meaning: 'car' },
      { word: '電車', reading: 'でんしゃ', meaning: 'train' },
      { word: '自転車', reading: 'じてんしゃ', meaning: 'bicycle' }
    ],
    radicals: ['車'],
    mnemonics: 'A CAR from above - wheels and body! 🚗'
  },
  {
    id: 57,
    character: '電',
    onyomi: ['デン'],
    kunyomi: [],
    meaning: ['electricity', 'electric'],
    strokeCount: 13,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '電話', reading: 'でんわ', meaning: 'telephone' },
      { word: '電車', reading: 'でんしゃ', meaning: 'train' },
      { word: '電気', reading: 'でんき', meaning: 'electricity' }
    ],
    radicals: ['雨', '電'],
    mnemonics: 'Rain (雨) with lightning - ELECTRICITY from the sky! ⚡'
  },
  {
    id: 58,
    character: '買',
    onyomi: ['バイ'],
    kunyomi: ['か'],
    meaning: ['buy'],
    strokeCount: 12,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '買う', reading: 'かう', meaning: 'to buy' },
      { word: '買い物', reading: 'かいもの', meaning: 'shopping' }
    ],
    radicals: ['网', '貝'],
    mnemonics: 'A net (网) catching money shells (貝) - BUYing things! 🛒'
  },
  {
    id: 59,
    character: '売',
    onyomi: ['バイ'],
    kunyomi: ['う'],
    meaning: ['sell'],
    strokeCount: 7,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '売る', reading: 'うる', meaning: 'to sell' },
      { word: '売り場', reading: 'うりば', meaning: 'sales floor' }
    ],
    radicals: ['士', '冖', '儿'],
    mnemonics: 'A samurai (士) selling under a roof - time to SELL! 💰'
  },
  {
    id: 60,
    character: '店',
    onyomi: ['テン'],
    kunyomi: ['みせ'],
    meaning: ['shop', 'store'],
    strokeCount: 8,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '店', reading: 'みせ', meaning: 'store' },
      { word: '店員', reading: 'てんいん', meaning: 'store clerk' },
      { word: '喫茶店', reading: 'きっさてん', meaning: 'coffee shop' }
    ],
    radicals: ['广', '占'],
    mnemonics: 'A roof (广) with divination (占) - fortune-telling SHOP! 🏪'
  },
  // Adding essential N3/N2 kanji for advanced learners
  {
    id: 61,
    character: '好',
    onyomi: ['コウ'],
    kunyomi: ['す', 'この'],
    meaning: ['like', 'fond of', 'good'],
    strokeCount: 6,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '好き', reading: 'すき', meaning: 'to like' },
      { word: '大好き', reading: 'だいすき', meaning: 'to love' }
    ],
    radicals: ['女', '子'],
    mnemonics: 'A woman (女) with a child (子) - mothers LOVE their kids! ❤️'
  },
  {
    id: 62,
    character: '友',
    onyomi: ['ユウ'],
    kunyomi: ['とも'],
    meaning: ['friend'],
    strokeCount: 4,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '友達', reading: 'ともだち', meaning: 'friend' },
      { word: '友人', reading: 'ゆうじん', meaning: 'friend (formal)' }
    ],
    radicals: ['友'],
    mnemonics: 'Two hands reaching out to each other - FRIENDS holding hands! 🤝'
  },
  {
    id: 63,
    character: '会',
    onyomi: ['カイ', 'エ'],
    kunyomi: ['あ'],
    meaning: ['meet', 'society', 'association'],
    strokeCount: 6,
    level: 2,
    jlpt: 'N4',
    examples: [
      { word: '会う', reading: 'あう', meaning: 'to meet' },
      { word: '会社', reading: 'かいしゃ', meaning: 'company' },
      { word: '会議', reading: 'かいぎ', meaning: 'meeting' }
    ],
    radicals: ['会'],
    mnemonics: 'People gathering under a roof to MEET! 🤝'
  },
  {
    id: 64,
    character: '社',
    onyomi: ['シャ'],
    kunyomi: ['やしろ'],
    meaning: ['company', 'shrine', 'society'],
    strokeCount: 7,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '会社', reading: 'かいしゃ', meaning: 'company' },
      { word: '社会', reading: 'しゃかい', meaning: 'society' },
      { word: '神社', reading: 'じんじゃ', meaning: 'shrine' }
    ],
    radicals: ['示', '土'],
    mnemonics: 'A place of worship (示) on earth (土) - SHRINE/COMPANY! 🏢'
  },
  {
    id: 65,
    character: '仕',
    onyomi: ['シ', 'ジ'],
    kunyomi: ['つか'],
    meaning: ['serve', 'work'],
    strokeCount: 5,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '仕事', reading: 'しごと', meaning: 'work, job' },
      { word: '仕方', reading: 'しかた', meaning: 'way of doing' }
    ],
    radicals: ['亻', '士'],
    mnemonics: 'A person (亻) serving as a samurai (士) - WORKING! 💼'
  },
  {
    id: 66,
    character: '事',
    onyomi: ['ジ', 'ズ'],
    kunyomi: ['こと'],
    meaning: ['thing', 'matter', 'affair'],
    strokeCount: 8,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '仕事', reading: 'しごと', meaning: 'work' },
      { word: '事故', reading: 'じこ', meaning: 'accident' },
      { word: '大事', reading: 'だいじ', meaning: 'important' }
    ],
    radicals: ['事'],
    mnemonics: 'A hand holding something - dealing with THINGS! 📋'
  },
  {
    id: 67,
    character: '思',
    onyomi: ['シ'],
    kunyomi: ['おも'],
    meaning: ['think', 'thought'],
    strokeCount: 9,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '思う', reading: 'おもう', meaning: 'to think' },
      { word: '思い出', reading: 'おもいで', meaning: 'memory' }
    ],
    radicals: ['田', '心'],
    mnemonics: 'A field (田) in your heart (心) - THINKING about the farm! 🧠'
  },
  {
    id: 68,
    character: '心',
    onyomi: ['シン'],
    kunyomi: ['こころ'],
    meaning: ['heart', 'mind', 'spirit'],
    strokeCount: 4,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '心', reading: 'こころ', meaning: 'heart/mind' },
      { word: '安心', reading: 'あんしん', meaning: 'peace of mind' },
      { word: '心配', reading: 'しんぱい', meaning: 'worry' }
    ],
    radicals: ['心'],
    mnemonics: 'A heart shape with a dot - your HEART beating! ❤️'
  },
  {
    id: 69,
    character: '持',
    onyomi: ['ジ'],
    kunyomi: ['も'],
    meaning: ['hold', 'have', 'possess'],
    strokeCount: 9,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '持つ', reading: 'もつ', meaning: 'to hold' },
      { word: '気持ち', reading: 'きもち', meaning: 'feeling' },
      { word: '金持ち', reading: 'かねもち', meaning: 'rich person' }
    ],
    radicals: ['扌', '寺'],
    mnemonics: 'A hand (扌) at the temple (寺) - HOLDING offerings! 🤲'
  },
  {
    id: 70,
    character: '待',
    onyomi: ['タイ'],
    kunyomi: ['ま'],
    meaning: ['wait', 'depend on'],
    strokeCount: 9,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '待つ', reading: 'まつ', meaning: 'to wait' },
      { word: '期待', reading: 'きたい', meaning: 'expectation' }
    ],
    radicals: ['彳', '寺'],
    mnemonics: 'Walking (彳) to the temple (寺) and WAITING there! ⏳'
  },
  // Add more high-frequency kanji
  {
    id: 71,
    character: '気',
    onyomi: ['キ', 'ケ'],
    kunyomi: [],
    meaning: ['spirit', 'mind', 'energy', 'mood'],
    strokeCount: 6,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '元気', reading: 'げんき', meaning: 'healthy, energetic' },
      { word: '天気', reading: 'てんき', meaning: 'weather' },
      { word: '気持ち', reading: 'きもち', meaning: 'feeling' }
    ],
    radicals: ['气', '米'],
    mnemonics: 'Steam (气) rising from rice (米) - the ENERGY of food! 💨'
  },
  {
    id: 72,
    character: '入',
    onyomi: ['ニュウ'],
    kunyomi: ['い', 'はい'],
    meaning: ['enter', 'insert'],
    strokeCount: 2,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '入る', reading: 'はいる', meaning: 'to enter' },
      { word: '入口', reading: 'いりぐち', meaning: 'entrance' }
    ],
    radicals: ['入'],
    mnemonics: 'An arrow pointing down ENTERING! ⬇️'
  },
  {
    id: 73,
    character: '出',
    onyomi: ['シュツ', 'スイ'],
    kunyomi: ['で', 'だ'],
    meaning: ['exit', 'leave', 'come out'],
    strokeCount: 5,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '出る', reading: 'でる', meaning: 'to leave' },
      { word: '出口', reading: 'でぐち', meaning: 'exit' },
      { word: '出す', reading: 'だす', meaning: 'to take out' }
    ],
    radicals: ['山'],
    mnemonics: 'Mountains popping OUT of the ground! 🏔️'
  },
  {
    id: 74,
    character: '立',
    onyomi: ['リツ', 'リュウ'],
    kunyomi: ['た'],
    meaning: ['stand', 'rise', 'establish'],
    strokeCount: 5,
    level: 2,
    jlpt: 'N4',
    examples: [
      { word: '立つ', reading: 'たつ', meaning: 'to stand' },
      { word: '役立つ', reading: 'やくだつ', meaning: 'to be useful' }
    ],
    radicals: ['立'],
    mnemonics: 'A person STANDING with legs apart on the ground! 🧍'
  },
  {
    id: 75,
    character: '休',
    onyomi: ['キュウ'],
    kunyomi: ['やす'],
    meaning: ['rest', 'break', 'holiday'],
    strokeCount: 6,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '休む', reading: 'やすむ', meaning: 'to rest' },
      { word: '休み', reading: 'やすみ', meaning: 'holiday' },
      { word: '休憩', reading: 'きゅうけい', meaning: 'break' }
    ],
    radicals: ['亻', '木'],
    mnemonics: 'A person (亻) RESTING against a tree (木)! 😴'
  },
  {
    id: 76,
    character: '間',
    onyomi: ['カン', 'ケン'],
    kunyomi: ['あいだ', 'ま'],
    meaning: ['between', 'interval', 'space'],
    strokeCount: 12,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '時間', reading: 'じかん', meaning: 'time' },
      { word: '間', reading: 'あいだ', meaning: 'between' },
      { word: '人間', reading: 'にんげん', meaning: 'human' }
    ],
    radicals: ['門', '日'],
    mnemonics: 'The sun (日) shining through the gate (門) - the SPACE between! 🚪'
  },
  {
    id: 77,
    character: '前',
    onyomi: ['ゼン'],
    kunyomi: ['まえ'],
    meaning: ['before', 'in front'],
    strokeCount: 9,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '前', reading: 'まえ', meaning: 'front, before' },
      { word: '名前', reading: 'なまえ', meaning: 'name' },
      { word: '午前', reading: 'ごぜん', meaning: 'morning, AM' }
    ],
    radicals: ['前'],
    mnemonics: 'A knife cutting what\'s IN FRONT - preparing for battle! ⚔️'
  },
  {
    id: 78,
    character: '後',
    onyomi: ['ゴ', 'コウ'],
    kunyomi: ['あと', 'うし', 'のち'],
    meaning: ['after', 'behind', 'later'],
    strokeCount: 9,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '後', reading: 'あと', meaning: 'after' },
      { word: '午後', reading: 'ごご', meaning: 'afternoon, PM' },
      { word: '後ろ', reading: 'うしろ', meaning: 'behind' }
    ],
    radicals: ['彳', '幺', '夊'],
    mnemonics: 'Walking slowly BEHIND - taking your time AFTER! 🚶'
  },
  {
    id: 79,
    character: '外',
    onyomi: ['ガイ', 'ゲ'],
    kunyomi: ['そと', 'はず', 'ほか'],
    meaning: ['outside', 'foreign'],
    strokeCount: 5,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '外', reading: 'そと', meaning: 'outside' },
      { word: '外国', reading: 'がいこく', meaning: 'foreign country' },
      { word: '外出', reading: 'がいしゅつ', meaning: 'going out' }
    ],
    radicals: ['夕', '卜'],
    mnemonics: 'Evening (夕) is OUTSIDE - go out at night! 🌙'
  },
  {
    id: 80,
    character: '多',
    onyomi: ['タ'],
    kunyomi: ['おお'],
    meaning: ['many', 'much'],
    strokeCount: 6,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '多い', reading: 'おおい', meaning: 'many' },
      { word: '多分', reading: 'たぶん', meaning: 'probably' }
    ],
    radicals: ['夕'],
    mnemonics: 'Two evenings (夕夕) stacked - MANY nights! 🌃'
  },
  // Continue adding more kanji...
  {
    id: 81,
    character: '少',
    onyomi: ['ショウ'],
    kunyomi: ['すく', 'すこ'],
    meaning: ['few', 'little'],
    strokeCount: 4,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '少ない', reading: 'すくない', meaning: 'few' },
      { word: '少し', reading: 'すこし', meaning: 'a little' },
      { word: '少年', reading: 'しょうねん', meaning: 'boy' }
    ],
    radicals: ['小', '丿'],
    mnemonics: 'Small (小) with a slash - even LESS than small! 📉'
  },
  {
    id: 82,
    character: '高',
    onyomi: ['コウ'],
    kunyomi: ['たか'],
    meaning: ['high', 'tall', 'expensive'],
    strokeCount: 10,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '高い', reading: 'たかい', meaning: 'high, expensive' },
      { word: '高校', reading: 'こうこう', meaning: 'high school' },
      { word: '高速', reading: 'こうそく', meaning: 'high-speed' }
    ],
    radicals: ['高'],
    mnemonics: 'A HIGH tower with a gate at the bottom! 🗼'
  },
  {
    id: 83,
    character: '安',
    onyomi: ['アン'],
    kunyomi: ['やす'],
    meaning: ['cheap', 'peaceful', 'safe'],
    strokeCount: 6,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '安い', reading: 'やすい', meaning: 'cheap' },
      { word: '安心', reading: 'あんしん', meaning: 'peace of mind' },
      { word: '安全', reading: 'あんぜん', meaning: 'safety' }
    ],
    radicals: ['宀', '女'],
    mnemonics: 'A woman (女) under a roof (宀) is SAFE and peaceful! 🏠'
  },
  {
    id: 84,
    character: '新',
    onyomi: ['シン'],
    kunyomi: ['あたら', 'あら', 'にい'],
    meaning: ['new'],
    strokeCount: 13,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '新しい', reading: 'あたらしい', meaning: 'new' },
      { word: '新聞', reading: 'しんぶん', meaning: 'newspaper' },
      { word: '新年', reading: 'しんねん', meaning: 'new year' }
    ],
    radicals: ['立', '木', '斤'],
    mnemonics: 'Cutting (斤) a standing (立) tree (木) - NEW wood! 🌲'
  },
  {
    id: 85,
    character: '古',
    onyomi: ['コ'],
    kunyomi: ['ふる'],
    meaning: ['old'],
    strokeCount: 5,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '古い', reading: 'ふるい', meaning: 'old' },
      { word: '中古', reading: 'ちゅうこ', meaning: 'secondhand' },
      { word: '古典', reading: 'こてん', meaning: 'classic' }
    ],
    radicals: ['十', '口'],
    mnemonics: 'A ten (十) year old mouth (口) - OLD stories passed down! 📜'
  },
  {
    id: 86,
    character: '長',
    onyomi: ['チョウ'],
    kunyomi: ['なが'],
    meaning: ['long', 'leader', 'chief'],
    strokeCount: 8,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '長い', reading: 'ながい', meaning: 'long' },
      { word: '社長', reading: 'しゃちょう', meaning: 'company president' },
      { word: '部長', reading: 'ぶちょう', meaning: 'department head' }
    ],
    radicals: ['長'],
    mnemonics: 'A person with LONG flowing hair! 💇'
  },
  {
    id: 87,
    character: '短',
    onyomi: ['タン'],
    kunyomi: ['みじか'],
    meaning: ['short'],
    strokeCount: 12,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '短い', reading: 'みじかい', meaning: 'short' },
      { word: '短期', reading: 'たんき', meaning: 'short-term' }
    ],
    radicals: ['矢', '豆'],
    mnemonics: 'An arrow (矢) hitting beans (豆) - SHORT distance! 🏹'
  },
  {
    id: 88,
    character: '白',
    onyomi: ['ハク', 'ビャク'],
    kunyomi: ['しろ', 'しら'],
    meaning: ['white'],
    strokeCount: 5,
    level: 1,
    jlpt: 'N5',
    examples: [
      { word: '白い', reading: 'しろい', meaning: 'white' },
      { word: '白黒', reading: 'しろくろ', meaning: 'black and white' }
    ],
    radicals: ['白'],
    mnemonics: 'The sun with a ray - WHITE bright light! ☀️'
  },
  {
    id: 89,
    character: '黒',
    onyomi: ['コク'],
    kunyomi: ['くろ'],
    meaning: ['black'],
    strokeCount: 11,
    level: 2,
    jlpt: 'N4',
    examples: [
      { word: '黒い', reading: 'くろい', meaning: 'black' },
      { word: '黒人', reading: 'こくじん', meaning: 'Black person' }
    ],
    radicals: ['里', '灬'],
    mnemonics: 'A village (里) with fire (灬) below - BLACK from burning! 🔥'
  },
  {
    id: 90,
    character: '赤',
    onyomi: ['セキ', 'シャク'],
    kunyomi: ['あか'],
    meaning: ['red'],
    strokeCount: 7,
    level: 2,
    jlpt: 'N4',
    examples: [
      { word: '赤い', reading: 'あかい', meaning: 'red' },
      { word: '赤ちゃん', reading: 'あかちゃん', meaning: 'baby' }
    ],
    radicals: ['土', '赤'],
    mnemonics: 'Earth (土) covered in RED - like Mars! 🔴'
  },
  // More kanji...
  {
    id: 91,
    character: '青',
    onyomi: ['セイ', 'ショウ'],
    kunyomi: ['あお'],
    meaning: ['blue', 'green'],
    strokeCount: 8,
    level: 2,
    jlpt: 'N4',
    examples: [
      { word: '青い', reading: 'あおい', meaning: 'blue' },
      { word: '青年', reading: 'せいねん', meaning: 'youth' }
    ],
    radicals: ['青'],
    mnemonics: 'Plants growing toward the moon - BLUE/GREEN like nature! 🌿'
  },
  {
    id: 92,
    character: '道',
    onyomi: ['ドウ', 'トウ'],
    kunyomi: ['みち'],
    meaning: ['road', 'path', 'way'],
    strokeCount: 12,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '道', reading: 'みち', meaning: 'road' },
      { word: '道路', reading: 'どうろ', meaning: 'road' },
      { word: '柔道', reading: 'じゅうどう', meaning: 'judo' }
    ],
    radicals: ['辶', '首'],
    mnemonics: 'Walk (辶) where the head (首) leads - the WAY! 🛣️'
  },
  {
    id: 93,
    character: '場',
    onyomi: ['ジョウ'],
    kunyomi: ['ば'],
    meaning: ['place', 'location'],
    strokeCount: 12,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '場所', reading: 'ばしょ', meaning: 'place' },
      { word: '駐車場', reading: 'ちゅうしゃじょう', meaning: 'parking lot' }
    ],
    radicals: ['土', '昜'],
    mnemonics: 'Earth (土) where the sun rises (昜) - the PLACE! 📍'
  },
  {
    id: 94,
    character: '所',
    onyomi: ['ショ'],
    kunyomi: ['ところ'],
    meaning: ['place', 'location'],
    strokeCount: 8,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '所', reading: 'ところ', meaning: 'place' },
      { word: '場所', reading: 'ばしょ', meaning: 'place' },
      { word: '住所', reading: 'じゅうしょ', meaning: 'address' }
    ],
    radicals: ['戸', '斤'],
    mnemonics: 'A door (戸) with an axe (斤) - marking the PLACE! 🚪'
  },
  {
    id: 95,
    character: '住',
    onyomi: ['ジュウ'],
    kunyomi: ['す'],
    meaning: ['live', 'dwell', 'reside'],
    strokeCount: 7,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '住む', reading: 'すむ', meaning: 'to live' },
      { word: '住所', reading: 'じゅうしょ', meaning: 'address' }
    ],
    radicals: ['亻', '主'],
    mnemonics: 'A person (亻) being the master (主) - LIVING there! 🏠'
  },
  {
    id: 96,
    character: '家',
    onyomi: ['カ', 'ケ'],
    kunyomi: ['いえ', 'や', 'うち'],
    meaning: ['house', 'home', 'family'],
    strokeCount: 10,
    level: 2,
    jlpt: 'N4',
    examples: [
      { word: '家', reading: 'いえ', meaning: 'house' },
      { word: '家族', reading: 'かぞく', meaning: 'family' },
      { word: '作家', reading: 'さっか', meaning: 'author' }
    ],
    radicals: ['宀', '豕'],
    mnemonics: 'A roof (宀) with a pig (豕) - ancient HOMES had pigs! 🏡'
  },
  {
    id: 97,
    character: '族',
    onyomi: ['ゾク'],
    kunyomi: [],
    meaning: ['tribe', 'family', 'clan'],
    strokeCount: 11,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '家族', reading: 'かぞく', meaning: 'family' },
      { word: '民族', reading: 'みんぞく', meaning: 'ethnic group' }
    ],
    radicals: ['方', '矢'],
    mnemonics: 'People from all directions (方) with arrows (矢) - a TRIBE! 👨‍👩‍👧‍👦'
  },
  {
    id: 98,
    character: '親',
    onyomi: ['シン'],
    kunyomi: ['おや', 'した'],
    meaning: ['parent', 'intimate', 'close'],
    strokeCount: 16,
    level: 3,
    jlpt: 'N4',
    examples: [
      { word: '親', reading: 'おや', meaning: 'parent' },
      { word: '両親', reading: 'りょうしん', meaning: 'parents' },
      { word: '親切', reading: 'しんせつ', meaning: 'kind' }
    ],
    radicals: ['立', '木', '見'],
    mnemonics: 'Standing (立) by a tree (木), watching (見) - PARENTS watching over! 👪'
  },
  {
    id: 99,
    character: '父',
    onyomi: ['フ'],
    kunyomi: ['ちち'],
    meaning: ['father'],
    strokeCount: 4,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '父', reading: 'ちち', meaning: 'father' },
      { word: 'お父さん', reading: 'おとうさん', meaning: 'father (polite)' }
    ],
    radicals: ['父'],
    mnemonics: 'Two arms crossed, holding something - FATHER protecting! 👨'
  },
  {
    id: 100,
    character: '母',
    onyomi: ['ボ'],
    kunyomi: ['はは'],
    meaning: ['mother'],
    strokeCount: 5,
    level: 2,
    jlpt: 'N5',
    examples: [
      { word: '母', reading: 'はは', meaning: 'mother' },
      { word: 'お母さん', reading: 'おかあさん', meaning: 'mother (polite)' }
    ],
    radicals: ['母'],
    mnemonics: 'Two breasts feeding - MOTHER nurturing! 👩'
  }
];

// Get kanji by level
export const getKanjiByLevel = (level: number): Kanji[] => {
  return kanjiData.filter(kanji => kanji.level === level);
};

// Get kanji by JLPT
export const getKanjiByJLPT = (jlpt: string): Kanji[] => {
  return kanjiData.filter(kanji => kanji.jlpt === jlpt);
};

// Get random kanji for quiz
export const getRandomKanji = (count: number, level?: number): Kanji[] => {
  const filtered = level ? kanjiData.filter(k => k.level <= level) : kanjiData;
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
