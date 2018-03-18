/*
 * @Author: Zuoteng Jiang
 * @Date: 2018-03-15 19:34:06 
 */
const EventEmitter = require('events').EventEmitter;
const Util = require("./util")
const util = new Util()

class Saee {
    constructor(origin = {}, action = {}, effect = {}) {
        this.state = origin
        this.action = action
        this.effect = effect
        this.event = {}
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
            this.state = newState
            this.responseChange(changes)
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
    dispatch(method, state = this.state) {
        // console.log(method)
        if (method in this.action) {
            this.state = this.action[method](this.state);
        }
    }
    _checkEffect(changes, route = "/") {
        let keys = []
        switch (util.assertType(changes)) {
            case "Object":
                {
                    for (let i in changes) {
                        switch (util.assertType(changes[i])) {
                            case "atom":
                                {
                                    keys.push(`${route}${i}`)
                                    break
                                }
                            case "Object":
                                {
                                    keys = keys.concat(this._checkEffect(changes[i], `${route}`))
                                    break
                                }
                            case "Array":
                                {
                                    for (let num = 0; num < changes[i].length; num++) {
                                        keys = keys.concat(this._checkEffect(changes[i][num], `${route}${i}/${num}/`))
                                        break
                                    }
                                }
                            default:
                                {}
                        }
                    }
                    break
                }
            case "Array":
                {
                    for (let num = 0; num < changes.length; i++) {
                        this._effect(changes[num], `${route}/${i}/`)
                        break
                    }
                }
        }
        return keys
    }
    _activateEffect(list) {
        list.forEach(element => {
            if (this.effect.hasOwnProperty(element)) {
                // console.log("run")
                this.dispatch(this.effect[element])
            }
        });
    }
    responseChange(changes) {
        // console.log(this._checkEffect(changes))
        this._activateEffect(this._checkEffect(changes))
    }
}

module.exports = Saee;