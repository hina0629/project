// ベースになるコード
const http = require("http")

http.createServer(function(req, res) {
    res.write("Hello")
    res.end()
}).listen(4000, function() {
    console.log("Listening on localhost port 4000")
})
// end ベース