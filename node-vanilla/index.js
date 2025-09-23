// ベースになるコード
const http = require("http")

http.createServer(function(req, res) {
    res.setHeader("Content-type", "text/plain; charset=utf-8")
    res.write("こんにちは")
    res.end()
}).listen(4000, function() {
    console.log("Listening on localhost port 4000")
})
// end ベース