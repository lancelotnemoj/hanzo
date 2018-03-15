/*
 * @Author: Zuoteng Jiang
 * @Date: 2018-03-15 19:34:06 
 */

class Event {
    constructor() {
        var events=[
            "stateChange",
            "actionChange"
        ]
        this.event=events
        for(let tag of events){
            this[`on${tag}`]=()=>{}
        }
    }
}

class Hanzo {
    constructor(origin = {}, action = {}) {
        this.state = origin;
        this.action = action;
        this.event = new Event()
    }

    /**
     * 将传入的object设置为新的state
     * 
     * @param {object} newState 
     * @memberof Hanzo
     */
    setState(newState) {
        if (this.state != newState) {
            this.state = newState
            this._activation("stateChange")
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
        this.event[`on${event}`]()
    }
    /**
     * 添加一个时间监听
     * 
     * @param {string} eventTag 
     * @param {function} action 
     * @memberof Hanzo
     */
    addEventListener(eventTag,action){
        if(arguments.length===2){
            this.event[eventTag]=action
        }
    }
}



module.exports = Hanzo;