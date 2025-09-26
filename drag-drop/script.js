// 動かしたいコンテンツ(すべて取得)
const allDraggableItems = document.querySelectorAll('.draggable-item')

// ドロップする場所(両方とも取得)
const dropZones = document.querySelectorAll('.drop-zone');

// 取得したすべてのアイテムに適用
allDraggableItems.forEach(item => {
    // ものをつかんだ瞬間に発生するイベント
    item.addEventListener('dragstart', function(e) {
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
    item.addEventListener('dragend', (e) => {
        // 元の見た目にもどす
        e.target.classList.remove('dragging');
    });
})

// 取得したすべてのドロップ領域(zone)に対してイベント設定を１つずつ実行
dropZones.forEach(zone => {
    // ものが置き場の上に乗っている間に発生するイベント
    zone.addEventListener('dragover', function(e) {
        // ドロップを許可(マウスでつかんでいるときにつかんでいる段階でも🚫マークが表示されるからこの段階から必要)
        e.preventDefault();

        // マウスでつかんで重ねているときの置き場のcssを追加
        e.target.classList.add('drag-over');
    })

    // ものが置き場から離れたとき(マウスでつかんでいるときに置き場以外の場所に移動)に発生するイベント
    zone.addEventListener('dragleave', (e) => {
        // 元の見た目にもどす
        e.target.classList.remove('drag-over');
    });

    // ものが実際にドロップされたとき
    zone.addEventListener('drop', function(e) {
        // ここでもドロップを許可(ドロップがテキストやファイルだった場合にブラウザが開こうとするのを阻止)
        e.preventDefault();

        // さっきのdragstartでsetData()を使って記憶したデータ(動かした要素のID(draggable-item))をgetData()で取り出す
        const data = e.dataTransfer.getData('text/plain');

        // 取り出したID(draggable-item)を使って移動された要素を取得
        const draggedElement = document.getElementById(data);

        // 取得した要素をドロップした場所の子要素として追加(内部的にはHTMLの構造が変わっただけ)
        e.target.appendChild(draggedElement);

        // 要素の移動 (親要素として追加)
        e.currentTarget.appendChild(draggedElement); 

        // 座標
        // ドロップ領域(親要素)の位置情報を取得
        const dropZoneBounds = e.currentTarget.getBoundingClientRect();
        console.log(dropZoneBounds)

        // マウスカーソルの座標から、ドロップ領域の左上の座標を引いて、相対的な位置を算出
        // e.clientX/Y: 画面左上からの絶対座標
        const x = e.clientX - dropZoneBounds.left;
        const y = e.clientY - dropZoneBounds.top;
        
        // 要素自体の半分の幅/高さを引くことで、カーソルが要素の中心に来るように調整
        // 要素の中心にカーソルが合うようにオフセットを計算
        const itemWidth = draggedElement.offsetWidth;
        const itemHeight = draggedElement.offsetHeight;
        
        const finalX = x - (itemWidth / 2);
        const finalY = y - (itemHeight / 2);

        // スタイルを適用
        draggedElement.style.left = `${finalX}px`;
        draggedElement.style.top = `${finalY}px`;

        // 元の見た目にもどす
        e.target.classList.remove('drag-over');
    })
})

