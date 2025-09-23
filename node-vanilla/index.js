// ベースになるコード
const http = require("http")

http.createServer(function(req, res) {
    if(req.url === "/"){
        // console.log("reqの中身", req)
        res.setHeader("Content-type", "text/plain; charset=utf-8")
        res.write("こんにちは")
        res.end()
    }else if(req.url === "/about"){
        res.setHeader("Content-type", "text/plain; charset=utf-8")
        res.write("ここはAboutページです")
        res.end()
    }
}).listen(4000, function() {
    console.log("Listening on localhost port 4000")
})
// end ベース