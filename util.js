/*
 * @Author: Zuoteng Jiang
 * @Date: 2018-03-17 13:24:06 
 */
const equal = require("fast-deep-equal")

class Util {
    /**
     * Get the type of the param
     * 
     * @param {any} param 
     * @returns {string}
     * @memberof Util
     */
    getType(param) {
        if (typeof (param) == "string" || typeof (param) == "number") {
            return typeof (param)
        } else {
            return param.constructor.name
        }
    }

    /**
     * check the type of the param
     * 
     * @param {any} param 
     * @returns "atom" or "Array" or "Object"
     * @memberof Util
     */
    assertType(param) {
        if (this.getType(param) == "string" || this.getType(param) == "number") {
            return "atom"
        } else if (this.getType(param) == "Array") {
            return "Array"
        } else {
            return "Object"
        }
    }

    /**
     * return a object contains the different items
     * 
     * @param {object} oldState 
     * @param {object} newState 
     * @returns 
     * @memberof Util
     */
    checkChange(oldState, newState) {
        if (equal(oldState, newState)) {
            return {}
        } else {
            let changes = new Object()
            // 遍历
            for (let param in newState) {
                if (!equal(oldState[param], newState[param])) {
                    // 判断是否存在这个属性
                    if (oldState.hasOwnProperty(param)) {
                        // 根据不同的类型做出不同处理
                        switch (this.getType(newState[param])) {
                            case "Array":
                                {
                                    let items = newState[param].slice(oldState[param].length, newState[param].length)
                                    for (let i = 0; i < oldState[param].length; i++) {
                                        if (!equal(oldState[param][i], newState[param][i])) {
                                            items.splice(0, 0, newState[param][i]);
                                        }
                                    }
                                    changes[param] = items
                                    break
                                }
                            case "Object":
                                {
                                    changes[param] = this.checkChange(oldState[param], newState[param])
                                    break
                                }
                            case "number":
                                {}
                            case "string":
                                {}
                            default:
                                {
                                    changes[param] = newState[param]
                                    break
                                }
                        }
                    } else {
                        changes[param] = newState[param]
                    }
                }
            }
            return changes
        }
    }

}

module.exports = Util