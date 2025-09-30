// script.js

const timeline = document.getElementById('timeline-track');
let draggedData = null; // ドラッグ中の素材のデータを保持

// 1. ドラッグ開始 (on dragstart)
document.querySelectorAll('.material-loop').forEach(material => {
    material.addEventListener('dragstart', (e) => {
        // ドラッグした素材の情報を保持 (ファイルパスなど)
        draggedData = {
            path: e.target.getAttribute('data-audio-path'),
            name: e.target.textContent.trim()
        };
        // dataTransferを使うのが一般的だが、ここではシンプルなグローバル変数で代用
    });
});

// 2. ドロップオーバー（ドロップ可能であることをブラウザに伝える）
timeline.addEventListener('dragover', (e) => {
    e.preventDefault(); // これがないとドロップできない
});

// 3. ドロップ時の処理 (on drop)
timeline.addEventListener('drop', (e) => {
    e.preventDefault();

    if (draggedData) {
        // 新しい素材要素を作成
        const placedElement = document.createElement('div');
        placedElement.className = 'placed-material';
        placedElement.textContent = draggedData.name;
        placedElement.setAttribute('data-audio-path', draggedData.path);
        
        // 実際には e.clientX/Y などから配置場所を計算し、CSSで位置を指定する
        // 例: placedElement.style.left = (e.clientX - timeline.getBoundingClientRect().left) + 'px';

        // タイムラインに追加
        timeline.appendChild(placedElement);

        // 再生機能を追加（ステップ b. で定義）
        addPlayFunctionality(placedElement);

        draggedData = null; // データのリセット
    }
});





// Web Audio API の設定
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioBuffers = {}; // 読み込んだオーディオデータを保持するオブジェクト

// ファイルを読み込み、AudioBufferにデコードする関数
async function loadAudio(path) {
    if (audioBuffers[path]) return audioBuffers[path]; // 既にロード済みの場合はそれを返す

    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    audioBuffers[path] = audioBuffer;
    return audioBuffer;
}

// 配置された素材にクリックで再生する機能を追加する関数
function addPlayFunctionality(element) {
    element.addEventListener('click', async () => {
        const path = element.getAttribute('data-audio-path');
        try {
            const buffer = await loadAudio(path);

            // AudioBufferSourceNode を作成し、再生する
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination); // スピーカーに接続
            source.start(0); // すぐに再生開始 (0秒から)
            
            // ループ設定（ループ素材の場合）
            // source.loop = true;

        } catch (error) {
            console.error('オーディオの再生に失敗しました:', error);
        }
    });
}

// タイムラインの全ての素材に再生機能を追加（ページロード時など）
document.querySelectorAll('.placed-material').forEach(addPlayFunctionality);

// グローバルな「再生」ボタンの機能 (より複雑な同期再生に必要だが、ここでは省略)
document.getElementById('play-button').addEventListener('click', () => {
    console.log('全体再生機能は現在開発中です！');
    // 実際には全ての配置された素材を、タイムライン上の位置に合わせて同時に start() させる処理を実装します
});

// 注意: このコードを動かすには、'drum_loop.mp3' や 'bass_line.mp3' などのオーディオファイルが
// 同じディレクトリに存在している必要があります。