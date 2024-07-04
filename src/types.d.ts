export interface LLama3Response {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export interface Query {
  text: string; //需要翻译的文本。
  from: string; //用户选中的源语言代码，可能是 auto
  to: string; //用户选中的目标语言代码，可能是 auto
  detectFrom: string; // 检测过后的源语言，一定不是 auto，如果插件不具备检测语言的能力，可直接使用该属性。
  detectTo: string; // 检测过后的目标语言，一定不是 auto，如果插件不具备检测语言的能力，可直接使用该属性。
  cancelSignal: Signal;
  onStream: (stream: Stream) => void; // 流式数据回调函数
  onCompletion: ({ result, error }: { result?: any; error?: string }) => void; // 翻译完成回调函数
}

export interface Signal {
  new: () => void; // 初始化一个信号对象
  send: (...args: any[]) => void; // 发送信号，可以在参数中传一些数据
  subscribe: (callback: (...args: any[]) => void) => void; // 订阅信号，需传入一个函数接受回调，方法会返回一个 disposable 对象，用于取消对信号的订阅。
  removeAllSubscriber: () => void; // 移除信号的所有订阅者，之前的订阅全部失效。
}

export interface Stream {
  text: string;
  rawData: any;
}

export interface TranslateResult {
  toParagraphs: string[];
  toDict: ToDict;
}

export interface ToDict {
  word: string; // 单词/词组，一般英文查词会有。
  phonetics: Phonetic[]; // 音标数据数组，一般英文查词会有。
  parts: Part[];
  exchanges: Exchange[];
}

export interface Phonetic {
  type: string | "uk" | "us"; // 音标类型，值可以是 us 或 uk，分别对应美式音标和英式音标。
  value: string; // 音标字符串。例如 ɡʊd。
  tts: TTSResult; // 音标发音数据。
}

export interface Part {
  part: string; // 单词词性，例如 n. vi....
  means: string[]; // 词义 string 数组。
}

export interface Exchange {
  name: string; // 形式的名字，例如 比较级、最高级...
  words: string[]; // 该形式对于的单词 string 数组，一般只有一个
}

export interface TTSResult {
  type: "url" | "base64"; // 数据类型，必传。
  value: string; // 值，必传。
  raw?: any; // 如果插件内部调用了某语音合成接口，可将接口原始数据传回，方便定位问题，可不传。
}
