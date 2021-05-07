const { handlerLog } = require('./report')

/**
 * @function
 * @param type
 * @param message
 * @param tag
 */
const logDebug = ({ type, message, tag }) => {
    console.log(`${new Date().toLocaleString("pt-BR")} - log`, JSON.stringify({ type, tag, message }, null, 4))
}

/**
 * @function
 * @param type
 * @returns {string|*}
 */
const typeChoice = (type) => {
    switch (String(type).toLowerCase()) {
        case 'info':
        case 'warn':
        case 'error':
            return type
        default:
            return 'info'
    }
    return 'info'
}

/**
 * @function
 * @param tag
 * @returns {string|*}
 */
const typeTag = (tag) => {
    if (!tag | Array.isArray(tag) || tag === undefined || tag.trim().length === 0) return 'default'
    return tag
}


/**
 * @function
 * @param message
 * @returns {string}
 */
const parseMessage = (message) => JSON.stringify(message)

/**
 * @function
 * @param type
 * @param tag
 * @param message
 * @param key
 * @param env
 * @returns {Promise<void>}
 */
const mountedRequest = ({ type, tag, message, key, env, debug }) => {
    if (debug) logDebug({ type, tag, message })
    return handlerLog({ key, env }, { type, tag, message: parseMessage(message) })
}


/**
 * @function
 * @param key
 * @param env
 * @returns {function({type?: *, tag?: *, message?: *}): Promise<void>}
 */
exports.log = ({ key, env }) => ({ type = 'info', tag = 'default', message = '', debug = false }) => {
    return mountedRequest({ type: typeChoice(type) , tag: typeTag(tag), message: message, key, env, debug })
}