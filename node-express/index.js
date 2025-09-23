// HTMLのbodyやheadみたいなもの
// 毎回必ず書く
const fs = require("fs")
const express = require("express")
const app = express()
// const coronaData = require("./coronaData.json")

// フォームタグから投稿されたデータを解析するために必要
app.use(express.urlencoded({ extended: true }))

const activities = require("./activities.json")

app.get("/", function(req, res) {
    // 文字を返す
    // res.send("こんにちは")

    // HTMLを返す
    // res.send("<h1>こんにちはの見出し</h1>")

    // JSONを返す
    // res.send(
    //     {
    //         "name": "平岡",
    //         "age": "45"
    //     }
    // )

    // JSONファイルの中身を返す
    // res.send(coronaData)

    // HTMLファイルの中身を返す
    // __dirnameのなかにはindex.htmlのパス情報が入っている（C:\hina\node-express）
    // console.log("dirnameの中身", __dirname)
    res.sendFile(__dirname + "/index.html")
})

app.post("/autumn", function(req, res) {
    // 投稿ボタンを押すと表示される
    // console.log("POSTリクエストの確認")
    // console.log("reqの中身", req)

    // req.body.activityのactivityはinputタグのname属性の中身
    // console.log("reqの中身", req.body.activity)

    // 入力された文字がdata.txtに書き込まれる
    fs.writeFile(__dirname + "/data.txt", req.body.activity, function() {
        res.send("投稿完了")
    })
})

// PUTリクエストとDELETEリクエストはブラウザに対応していない->ポストを使う
// app.put("/update", function(req, res) {
//     console.log(activities[0].activity)
//     activities[0].activity = req.body.updateActivity
//     res.send(activities)
// })

app.post("/update", function(req, res) {
    // console.log(activities[0].activity)
    activities[0].activity = req.body.updateActivity
    res.send(activities)
})

app.post("/delete", function(req, res) {
    // console.log(req.body.number)
    activities.splice(req.body.number, 1)
    res.send(activities)
})

const port = process.env.PORT || 5000

// app.listen()->バックエンドのサーバーとブラウザをつなげるはたらき
app.listen(port, function() {
    // エラーおきたら5050に変える
    console.log(`Listening on localhost port ${port}`)
})

// 公開しないバージョン
// app.listen()->バックエンドのサーバーとブラウザをつなげるはたらき
// app.listen(5000, function() {
//     エラーおきたら5050に変える
//     console.log("Listening on localhost port 5000")
// })