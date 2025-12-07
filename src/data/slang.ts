import { SlangPhrase } from '../types';

// Real Japanese slang and casual expressions
export const slangPhrases: SlangPhrase[] = [
  // Greetings & Reactions
  {
    id: 1,
    phrase: 'マジで',
    reading: 'まじで',
    meaning: 'Seriously, for real',
    usage: 'Express disbelief or emphasize something is true',
    formality: 'slang',
    example: 'マジで？信じられない！',
    exampleTranslation: "Seriously? I can't believe it!"
  },
  {
    id: 2,
    phrase: 'やばい',
    reading: 'やばい',
    meaning: 'Amazing / Terrible / Oh no (context dependent)',
    usage: 'Universal reaction word - can be positive or negative',
    formality: 'slang',
    example: 'この料理やばい！めっちゃうまい！',
    exampleTranslation: 'This food is insane! So good!',
    warning: 'Originally meant "dangerous" - now mostly positive among youth'
  },
  {
    id: 3,
    phrase: 'めっちゃ',
    reading: 'めっちゃ',
    meaning: 'Super, very, really',
    usage: 'Intensifier - replaces とても in casual speech',
    formality: 'slang',
    example: 'めっちゃ楽しかった！',
    exampleTranslation: 'It was super fun!'
  },
  {
    id: 4,
    phrase: 'ウケる',
    reading: 'うける',
    meaning: 'LOL, hilarious, that cracks me up',
    usage: "When something is funny - like saying 'lol' in real life",
    formality: 'slang',
    example: 'ウケるー！何それ！',
    exampleTranslation: "LOL! What's that!"
  },
  {
    id: 5,
    phrase: 'それな',
    reading: 'それな',
    meaning: "That's so true, I know right, facts",
    usage: 'Strong agreement - like "fr fr" or "no cap"',
    formality: 'youth',
    example: 'A: この授業だるい　B: それな',
    exampleTranslation: "A: This class is such a drag. B: Fr though"
  },
  {
    id: 6,
    phrase: 'うざい',
    reading: 'うざい',
    meaning: 'Annoying, irritating',
    usage: 'When someone or something is bothering you',
    formality: 'slang',
    example: 'あいつマジうざい',
    exampleTranslation: "That guy is so annoying",
    warning: 'Pretty rude - use carefully'
  },
  {
    id: 7,
    phrase: 'だるい',
    reading: 'だるい',
    meaning: "Tired, can't be bothered, lethargic",
    usage: 'Physical tiredness or lack of motivation',
    formality: 'casual',
    example: '今日だるいから家にいる',
    exampleTranslation: "I'm too tired today so I'm staying home"
  },
  {
    id: 8,
    phrase: 'きもい',
    reading: 'きもい',
    meaning: 'Gross, disgusting, creepy',
    usage: 'Shortened from 気持ち悪い',
    formality: 'slang',
    example: 'きもっ！触らないで！',
    exampleTranslation: 'Ew! Don\'t touch me!',
    warning: 'Very harsh - can be offensive'
  },
  {
    id: 9,
    phrase: 'ガチ',
    reading: 'がち',
    meaning: 'Legit, seriously, hardcore',
    usage: 'Emphasize something is real or serious',
    formality: 'slang',
    example: 'ガチで好き',
    exampleTranslation: 'I legit like it',
  },
  {
    id: 10,
    phrase: 'エグい',
    reading: 'えぐい',
    meaning: 'Intense, extreme, insane',
    usage: 'Originally harsh, now often impressed',
    formality: 'slang',
    example: 'この辛さエグい',
    exampleTranslation: 'This spiciness is insane'
  },
  // Agreement & Reactions
  {
    id: 11,
    phrase: 'わかりみ',
    reading: 'わかりみ',
    meaning: 'I feel that, I understand deeply',
    usage: 'Deep understanding or agreement',
    formality: 'youth',
    example: 'わかりみが深い',
    exampleTranslation: 'I feel that so hard'
  },
  {
    id: 12,
    phrase: 'ワンチャン',
    reading: 'わんちゃん',
    meaning: "There's a chance, maybe",
    usage: 'Expressing slight possibility',
    formality: 'youth',
    example: 'ワンチャンいける？',
    exampleTranslation: 'Think we can make it?'
  },
  {
    id: 13,
    phrase: '草',
    reading: 'くさ',
    meaning: 'LOL (internet slang)',
    usage: 'wwww looks like grass - so 草 = laughing',
    formality: 'internet',
    example: '草生える',
    exampleTranslation: 'Makes me laugh (lit: grass is growing)'
  },
  {
    id: 14,
    phrase: 'ぴえん',
    reading: 'ぴえん',
    meaning: 'Sad face, crying',
    usage: 'Cute way to express sadness',
    formality: 'youth',
    example: 'テスト落ちた、ぴえん🥺',
    exampleTranslation: 'Failed the test, sadge 🥺'
  },
  {
    id: 15,
    phrase: 'エモい',
    reading: 'えもい',
    meaning: 'Emotional, nostalgic, aesthetic',
    usage: 'For things that evoke feelings',
    formality: 'youth',
    example: 'この曲エモい',
    exampleTranslation: 'This song hits different'
  },
  // Casual Speech Patterns
  {
    id: 16,
    phrase: '〜っす',
    reading: 'っす',
    meaning: 'Casual です',
    usage: 'Informal politeness, often used by young men',
    formality: 'casual',
    example: 'そうっすね',
    exampleTranslation: 'Yeah, I guess so'
  },
  {
    id: 17,
    phrase: '〜じゃん',
    reading: 'じゃん',
    meaning: "Isn't it? / It's..., right?",
    usage: 'Seeking agreement or stating the obvious',
    formality: 'casual',
    example: 'いいじゃん！',
    exampleTranslation: "That's good, right!"
  },
  {
    id: 18,
    phrase: '〜てか',
    reading: 'てか',
    meaning: "Or rather, like, I mean",
    usage: 'Change topic or correct yourself',
    formality: 'casual',
    example: 'てかさ、話変わるけど',
    exampleTranslation: 'Anyway, changing the subject...'
  },
  {
    id: 19,
    phrase: '知らんけど',
    reading: 'しらんけど',
    meaning: "I dunno though, but that's just me",
    usage: 'Disclaimer after stating opinion',
    formality: 'slang',
    example: '多分大丈夫、知らんけど',
    exampleTranslation: "Probably fine, I dunno though"
  },
  {
    id: 20,
    phrase: 'なんか',
    reading: 'なんか',
    meaning: 'Like, something, somehow',
    usage: "Filler word - Japanese 'like'",
    formality: 'casual',
    example: 'なんかさ、最近忙しくて',
    exampleTranslation: "Like, I've been busy lately"
  },
  // Texting Abbreviations
  {
    id: 21,
    phrase: 'りょ',
    reading: 'りょ',
    meaning: 'Roger, got it',
    usage: 'Short for 了解',
    formality: 'youth',
    example: 'A: 8時ね　B: りょ！',
    exampleTranslation: 'A: 8 o\'clock, yeah?  B: Got it!'
  },
  {
    id: 22,
    phrase: 'おけ',
    reading: 'おけ',
    meaning: 'OK',
    usage: 'Casual OK in texting',
    formality: 'youth',
    example: 'おけおけ！',
    exampleTranslation: 'OK OK!'
  },
  {
    id: 23,
    phrase: 'あざす',
    reading: 'あざす',
    meaning: 'Thanks',
    usage: 'Super casual ありがとうございます',
    formality: 'slang',
    example: 'マジあざす！',
    exampleTranslation: 'Thanks so much!'
  },
  {
    id: 24,
    phrase: 'おつ',
    reading: 'おつ',
    meaning: 'Good work, bye',
    usage: 'Short for お疲れ様',
    formality: 'casual',
    example: '今日もおつ！',
    exampleTranslation: 'Good work today!'
  },
  {
    id: 25,
    phrase: 'とりま',
    reading: 'とりま',
    meaning: 'For now',
    usage: 'Short for とりあえず、まあ',
    formality: 'youth',
    example: 'とりま飯いこ',
    exampleTranslation: "Let's eat for now"
  },
  // More expressions
  {
    id: 26,
    phrase: 'イケメン',
    reading: 'いけめん',
    meaning: 'Hot guy, handsome man',
    usage: 'Describe attractive men',
    formality: 'casual',
    example: 'あの人イケメンじゃない？',
    exampleTranslation: "Isn't that guy hot?"
  },
  {
    id: 27,
    phrase: 'ブサイク',
    reading: 'ぶさいく',
    meaning: 'Ugly',
    usage: 'Harsh term for ugly',
    formality: 'slang',
    example: '自分ブサイクだから...',
    exampleTranslation: "I'm ugly so...",
    warning: 'Offensive - mostly used self-deprecatingly'
  },
  {
    id: 28,
    phrase: 'ドンマイ',
    reading: 'どんまい',
    meaning: "Don't worry, it's ok",
    usage: "From English 'don't mind'",
    formality: 'casual',
    example: '失敗しちゃった... ドンマイドンマイ！',
    exampleTranslation: "I messed up... Don't worry about it!"
  },
  {
    id: 29,
    phrase: 'KY',
    reading: 'けーわい',
    meaning: "Can't read the room",
    usage: '空気読めない (kuuki yomenai)',
    formality: 'slang',
    example: 'あいつKYだよね',
    exampleTranslation: "That guy can't read the room"
  },
  {
    id: 30,
    phrase: 'リア充',
    reading: 'りあじゅう',
    meaning: 'Someone with a fulfilling real life',
    usage: "Used for people who are 'normies' with good social life",
    formality: 'internet',
    example: 'リア充爆発しろ',
    exampleTranslation: 'Normies should explode (internet joke)'
  },
  // Otaku/Fan culture
  {
    id: 31,
    phrase: '推し',
    reading: 'おし',
    meaning: 'Favorite person/character you support',
    usage: "Your 'stan' or favorite",
    formality: 'youth',
    example: '推しが尊い',
    exampleTranslation: 'My fave is precious'
  },
  {
    id: 32,
    phrase: '尊い',
    reading: 'とうとい',
    meaning: 'Precious, pure, too good',
    usage: 'Overwhelming positive emotion for something cute',
    formality: 'youth',
    example: 'あー尊い...',
    exampleTranslation: 'Ahh... so precious...'
  },
  {
    id: 33,
    phrase: '沼',
    reading: 'ぬま',
    meaning: 'Deep obsession (swamp)',
    usage: "Getting stuck in a hobby/fandom like a swamp",
    formality: 'slang',
    example: 'アニメ沼にハマった',
    exampleTranslation: 'I fell into the anime hole'
  },
  {
    id: 34,
    phrase: '神',
    reading: 'かみ',
    meaning: 'God-tier, amazing',
    usage: 'Extremely good',
    formality: 'slang',
    example: '神曲！',
    exampleTranslation: 'God-tier song!'
  },
  {
    id: 35,
    phrase: '爆死',
    reading: 'ばくし',
    meaning: 'Bombed, total failure',
    usage: 'When gacha gives you nothing good',
    formality: 'internet',
    example: 'ガチャ爆死した...',
    exampleTranslation: 'Got nothing from the gacha...'
  },
  // Common casual phrases
  {
    id: 36,
    phrase: 'ちょっと待って',
    reading: 'ちょっとまって',
    meaning: 'Wait a sec',
    usage: 'Casual way to ask someone to wait',
    formality: 'casual',
    example: 'ちょっと待って！今行く！',
    exampleTranslation: 'Wait a sec! Coming now!'
  },
  {
    id: 37,
    phrase: 'いいよ',
    reading: 'いいよ',
    meaning: "It's fine / OK / Sure",
    usage: 'Giving permission or agreeing',
    formality: 'casual',
    example: 'A: これ使っていい？　B: いいよ！',
    exampleTranslation: 'A: Can I use this?  B: Sure!'
  },
  {
    id: 38,
    phrase: 'ちがくて',
    reading: 'ちがくて',
    meaning: 'No, wait, that\'s not it',
    usage: 'Correcting a misunderstanding',
    formality: 'casual',
    example: 'ちがくて、そういう意味じゃなくて...',
    exampleTranslation: "No wait, I didn't mean it like that..."
  },
  {
    id: 39,
    phrase: 'まあね',
    reading: 'まあね',
    meaning: "I guess, kind of, well...",
    usage: 'Non-committal agreement',
    formality: 'casual',
    example: 'A: 疲れた？　B: まあね',
    exampleTranslation: 'A: Tired?  B: I guess'
  },
  {
    id: 40,
    phrase: 'やっぱ',
    reading: 'やっぱ',
    meaning: 'As I thought, after all',
    usage: 'Short for やっぱり',
    formality: 'casual',
    example: 'やっぱやめる',
    exampleTranslation: "Actually, I'll pass"
  },
  // Relationship/Social
  {
    id: 41,
    phrase: '彼氏できた',
    reading: 'かれしできた',
    meaning: 'I got a boyfriend',
    usage: 'Announcing a new relationship',
    formality: 'casual',
    example: '聞いて！彼氏できた！',
    exampleTranslation: 'Listen! I got a boyfriend!'
  },
  {
    id: 42,
    phrase: 'フラれた',
    reading: 'ふられた',
    meaning: 'Got rejected/dumped',
    usage: 'When someone breaks up with you',
    formality: 'casual',
    example: 'また別れた...',
    exampleTranslation: 'Got dumped again...'
  },
  {
    id: 43,
    phrase: '脈あり',
    reading: 'みゃくあり',
    meaning: 'There\'s a chance (romantically)',
    usage: 'When you think someone likes you back',
    formality: 'slang',
    example: 'あれ、脈ありかな？',
    exampleTranslation: 'Hmm, is there a chance?'
  },
  {
    id: 44,
    phrase: 'ヤバT',
    reading: 'やばてぃー',
    meaning: 'Really bad situation',
    usage: 'やばい + T (from Twitter)',
    formality: 'youth',
    example: '宿題忘れた、ヤバT',
    exampleTranslation: 'Forgot my homework, big oof'
  },
  {
    id: 45,
    phrase: 'おわた',
    reading: 'おわた',
    meaning: "It's over, I'm done for",
    usage: 'Dramatic way to say things are bad',
    formality: 'internet',
    example: '人生おわた',
    exampleTranslation: 'My life is over (dramatic)'
  },
  // Food & Drink
  {
    id: 46,
    phrase: 'とりあえずビール',
    reading: 'とりあえずびーる',
    meaning: 'Beer first!',
    usage: 'Classic izakaya first order',
    formality: 'casual',
    example: 'とりあえず生で！',
    exampleTranslation: 'Draft beer first!'
  },
  {
    id: 47,
    phrase: '飲み放題',
    reading: 'のみほうだい',
    meaning: 'All you can drink',
    usage: 'Common at izakayas',
    formality: 'casual',
    example: '今日飲み放題のコースで！',
    exampleTranslation: 'All-you-can-drink course today!'
  },
  {
    id: 48,
    phrase: 'シメ',
    reading: 'しめ',
    meaning: 'Final dish (to close out)',
    usage: 'Last food item after drinking',
    formality: 'casual',
    example: 'シメはラーメンね',
    exampleTranslation: "Ramen to finish, right?"
  },
  {
    id: 49,
    phrase: '別腹',
    reading: 'べつばら',
    meaning: 'Separate stomach (for dessert)',
    usage: 'Excuse to eat dessert when full',
    formality: 'casual',
    example: 'デザートは別腹！',
    exampleTranslation: 'Dessert is a separate stomach!'
  },
  {
    id: 50,
    phrase: '飯テロ',
    reading: 'めしてろ',
    meaning: 'Food terrorism (posting delicious food)',
    usage: 'When food pics make you hungry',
    formality: 'internet',
    example: '夜中に飯テロやめて！',
    exampleTranslation: 'Stop posting food pics at night!'
  }
];

// Get slang by formality
export const getSlangByFormality = (formality: string): SlangPhrase[] => {
  return slangPhrases.filter(phrase => phrase.formality === formality);
};

// Get random slang for quiz
export const getRandomSlang = (count: number): SlangPhrase[] => {
  const shuffled = [...slangPhrases].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
