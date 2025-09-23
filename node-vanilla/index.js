// ベースになるコード
const http = require("http")

http.createServer(function(req, res) {
    if(req.url === "/" && req.method === "GET"){
        // console.log("reqの中身", req)
        res.setHeader("Content-type", "text/plain; charset=utf-8")
        res.write("こんにちは")
        res.end()
    }else if(req.url === "/about" && req.method === "GET"){
        res.setHeader("Content-type", "text/plain; charset=utf-8")
        res.write("ここはAboutページです")
        res.end()
    }else if(req.url === "/hobby" && req.method === "GET"){
        res.setHeader("Content-type", "text/html")
        res.write(`
            <form action="/outdoor" method="POST">
                <input type="text" name="sports">
                <button type="submit">Submit</button>
            </form>
        `)
        res.end()
    }else if(req.url === "/outdoor" && req.method === "POST"){
        // "/hobbyのフォームのSubmitボタンからページに飛んだ時（POST）と、検索窓から直接飛んだ時（GET）でmethodが違うからifにmethodの条件を追加した"
        console.log(req)
    }
}).listen(4000, function() {
    console.log("Listening on localhost port 4000")
})
// end ベース