// 音声認識機能のモジュール
class SpeechRecognitionManager {
  constructor() {
    const Recognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new Recognition();
    this.recognition.continuous = false;
    this.recognition.lang = "ja-JP";
    this.recognition.interimResults = true; // 解析中の結果を表示する
    this.recognition.continuous = true; // 認識のたびに継続的に結果を返す
    
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    // 認識した音声の結果を処理するイベントハンドラー
    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let results = event.results;
        if (results[i].isFinal) {
          console.log('解析終了');
          // 解析が終了したあとの処理
          console.log(event.results[i][0].transcript);
          this.endSpeechText();
        } else {
          console.log('認識中');
          // 解析中の処理
          // console.log(event.results[i][0].transcript);
        }
      }
    };

    this.recognition.onaudiostart = () => {
      console.log('Audio capturing started onaudiostart');
    };

    this.recognition.onaudioend = () => {
      console.log("Audio capturing ended onaudioend");
    };

    this.recognition.onerror = (event) => {
      console.log('エラーが発生しました。', event.error);
    };

    this.recognition.onnomatch = () => {
      console.log('認識できませんでした。');
    };
  }

  startSpeechText() {
    this.recognition.start();
    console.log('start');
  }

  endSpeechText() {
    this.recognition.stop();
    console.log('end');
  }
}

// グローバルインスタンスを作成
const speechManager = new SpeechRecognitionManager();

// グローバル関数として公開
window.startSpeechText = () => speechManager.startSpeechText();
window.endSpeechText = () => speechManager.endSpeechText();

// モジュールとしても使用可能
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpeechRecognitionManager;
} 