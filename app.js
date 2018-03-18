const Hanzo = require("./hanzo")
const Util = require("./util")
const fs = require("fs")

var state = JSON.parse(fs.readFileSync("./config.json").toString())

var app = new Hanzo()

app.setState(state)
app.appendState({
    test: true
})

var foo = function () {
    console.log("hello")
}

app.setAction({
    "hello": foo
})

app.appendAction("bye", foo)

// console.log(app)