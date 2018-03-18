/*
 * @Author: Zuoteng Jiang
 * @Date: 2018-03-15 19:34:06 
 */
const EventEmitter = require('events').EventEmitter;
const Util = require("./util")
const util = new Util()

// class Event {
//     constructor() {
//         this.event = {}
//         // this.emiter = new EventEmitter()
//     }
// }

class Hanzo {
    constructor(origin = {}, action = {}) {
        this.state = origin;
        this.action = action;
        this.event = new Event()
    }
    /**
     * 
     * 将传入的object设置为新的state
     * 
     * @param {object} newState 
     * @memberof Hanzo
     */
    setState(newState = this.state) {
        if (this.state != newState) {
            let changes = util.checkChange(this.state, newState)
            // console.log(changes)
            // this._signEvent(changes)
            console.log(this.event.emiter)
            this.state = newState
            // this.event.emiter.emit("dht110", 0, 1)
        }
    }
    /**
     * 在state中新增>=0项
     * 
     * @param {object} statePair 
     * @memberof Hanzo
     */
    appendState(statePair) {
        var newState = this.state
        for (let prop in statePair) {
            newState[prop] = statePair[prop]
        }
        this.setState(newState)
    }
    /**
     * 设置action为传入的action
     * 
     * @param {object} newAction 
     * @memberof Hanzo
     */
    setAction(newAction) {
        this.action = newAction
    }
    /**
     * 新增一个action对应关系
     * 
     * @param {string} name 
     * @param {function} newAction 
     * @returns {any} error message or true
     * @memberof Hanzo
     */
    appendAction(name, newAction) {
        if (arguments.length != 2) {
            return new Error("Forbiden Action,you should pass in two parameters")
        } else {
            this.action[arguments[0]] = arguments[1]
            return true
        }
    }
    /**
     * 调起一个action
     * 
     * @param {string}method 
     * @memberof Hanzo
     */
    dispatch(method) {
        if (method in this.action) {
            this.action[method]();
        }
    }
    /**
     * 激活一个事件
     * 
     * @param {string} event 
     * @memberof Hanzo
     */
    _activation(event) {
        // this.event[`on${event}`]()
    }
    /**
     * 添加一个时间监听
     * 
     * @param {string} eventTag 
     * @param {function} action 
     * @memberof Hanzo
     */
    addEventListener(eventTag, action) {
        if (arguments.length === 2) {
            this.event[eventTag] = action
        }
    }
    // _signEvent(changes = {}, route = "") {
    //     // console.log(`${route}:${changes}`)
    //     if (util.assertType(changes) == "Object") {
    //         for (let values in changes) {
    //             switch (util.assertType(changes[values])) {
    //                 case "atom":
    //                     {
    //                         this.event.emiter.on(values, (previous, next) => {
    //                             // console.log(`${route}${changes[values]} changes from ${previous} to ${next}`)
    //                             console.log("heloo")
    //                         })
    //                         break
    //                     }
    //                 case "Array":
    //                     {
    //                         for (var i = 0; i < changes[values].length; i++) {
    //                             this._signEvent(changes[values][i], `${route}/${values}${i}`)
    //                         }
    //                         break
    //                     }
    //                 case "Object":
    //                     {
    //                         for (let element in values) {
    //                             this._signEvent(changes[values][element], `${route}/${values}`)
    //                         }
    //                         break
    //                     }
    //             }
    //         }
    //     } else if (util.assertType(changes) == "Array") {
    //         for (let i = 0; i < changes.length; i++) {
    //             this._signEvent(changes[i])
    //         }
    //     }
    // }
}

module.exports = Hanzo;