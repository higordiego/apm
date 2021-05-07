const REQUEST_CONFIG = 'https://foil.higordiego.com.br/apm/handler-config'
const METHOD_CONFIG = 'POST'

const { requestApi } = require('../helpers/request')
const { isJsonBoolean } = require('../helpers/parse')

/**
 * @function
 * @param time
 * @returns {number}
 */
const setMinute = (time) => new Date().setMinutes(time)


let config = null
let timeStamp = setMinute(3)

/**
 * @function
 * @param key
 * @param env
 * @returns {Promise<null>}
 */
exports.getConfig = async ({ key, env }) => {
    if (config && timeStamp < new Date()) return config
    try {
        const { excluded = null } = await requestApi({ url: REQUEST_CONFIG,  method: METHOD_CONFIG, data: { key, env } })
        if (excluded !== null) config = excluded
        timeStamp = setMinute(3)
        return config
    } catch (_) {
        return config
    }
}

/**
 * @function
 * @param equal
 * @returns {(function(*, *): (string|*))|*}
 */
const replaceValueRules = (equal) => (key, value) => {
    if (key == equal) return "none";
    return value;
}

/**
 * @function
 * @param obj
 * @param element
 * @param fn
 * @returns {any}
 */
const getCleanData = (obj, element, fn) => JSON.parse(JSON.stringify(obj, fn(element)))

/**
 * @function
 * @param obj
 * @returns {any}
 */
const parseIdentifyRequest = (obj) => {
    if (typeof obj === 'string' && isJsonBoolean(obj)) return JSON.parse(obj)
    return obj
}

/**
 * @function
 * @param arrayConfig
 * @param obj
 * @returns {*}
 */
exports.removeJsonParams = (arrayConfig, obj) => {
    const isString = typeof obj === 'string'
    if (arrayConfig && Array.isArray(arrayConfig) > 0) {
        for (const element of arrayConfig) {
            obj = getCleanData(parseIdentifyRequest(obj), element, replaceValueRules)
        }
    }
    if (isString && isJsonBoolean(obj)) return JSON.stringify(obj)
    else if(isJsonBoolean(obj)) return JSON.stringify(obj)
    return obj
}
