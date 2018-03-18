const Util = require("./util")
const Hanzo = require("./hanzo")
const fs = require("fs")

var oldState = {
    str: "string",
    num: 202,
    obj: {
        test: 1,
        test2: "string"
    },
    arr: [{
        temp: "1",
        dht: 11
    }, {
        temp: "1",
        dht: 11
    }]
}

var newState = {
    str: "string2",
    num: 2023,
    obj: {
        test: 2,
        test2: "string"
    },
    arr: [{
        temp: "1",
        dht: 11
    }, {
        temp: "2",
        dht: 22
    }, {
        temp: "3",
        dht: 33
    }]
}

var state = JSON.parse(fs.readFileSync("./config.json").toString())

// console.log(Util.prototype.checkChange(oldState, newState))
// console.log(Util.prototype.checkChange({}, state))