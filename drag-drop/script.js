// 動かしたいコンテンツ
const draggableItem = document.getElementById('draggable-item');

// ドロップする場所
const dropZone = document.getElementById('drop-zone');

// ものをつかんだ瞬間に発生するイベント
draggableItem.addEventListener('dragstart', function(e) {
    // イベント発生時に、
    // 詳細情報を含むイベントオブジェクトが自動的に渡される
    // それが e

    // 転送するデータを設定
    // eの中のdataTransferという箱を使う
    // setDataで箱の中にデータを入れる
    // setData(データの種類, その中身)
    // setData('text/plain'(普通のテキスト), e.target.id(動かしている要素のID))
    e.dataTransfer.setData('text/plain', e.target.id);

    // ドラッグ中の見た目を指定するcssを追加
    e.target.classList.add('dragging');
})

// ものを離した瞬間に発生するイベント
draggableItem.addEventListener('dragend', (e) => {
    // 元の見た目にもどす
    e.target.classList.remove('dragging');
});

// ものが置き場の上に乗っている間に発生するイベント
dropZone.addEventListener('dragover', function(e) {
    // ドロップを許可(マウスでつかんでいるときにつかんでいる段階でも🚫マークが表示されるからこの段階から必要)
    e.preventDefault();

    // マウスでつかんで重ねているときの置き場のcssを追加
    e.target.classList.add('drag-over');
})

// ものが置き場から離れたとき(マウスでつかんでいるときに置き場以外の場所に移動)に発生するイベント
dropZone.addEventListener('dragleave', (e) => {
    // 元の見た目にもどす
    e.target.classList.remove('drag-over');
});

// ものが実際にドロップされたとき
dropZone.addEventListener('drop', function(e) {
    // ここでもドロップを許可(ドロップがテキストやファイルだった場合にブラウザが開こうとするのを阻止)
    e.preventDefault();

    // さっきのdragstartでsetData()を使って記憶したデータ(動かした要素のID(draggable-item))をgetData()で取り出す
    const data = e.dataTransfer.getData('text/plain');

    // 取り出したID(draggable-item)を使って移動された要素を取得
    const draggedElement = document.getElementById(data);

    // 取得した要素をドロップした場所の子要素として追加(内部的にはHTMLの構造が変わっただけ)
    e.target.appendChild(draggedElement);

    // 元の見た目にもどす
    e.target.classList.remove('drag-over');
})