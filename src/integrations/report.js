
const REQUEST_HANDLER_REPORT = 'https://foil.higordiego.com.br/apm/handler-request'
const METHOD_REPORT = 'POST'

const { requestApi } = require('./request')

/**
 * @function
 * @param key
 * @param env
 * @param headers
 * @param path
 * @param method
 * @param body
 * @param stack
 * @param message
 * @param params
 * @param query
 * @returns {Promise<void>}
 */
exports.handlerErrorNotTreatment = async ({ key, env }, { headers, path, method, body, stack, message, params, query, type, statusCode }) => {
    try {
        await requestApi({
            url: REQUEST_HANDLER_REPORT,
            method: METHOD_REPORT,
            data: { headers, path, method, body, message, params, query, stack, type, statusCode, key, env }
        })
    } catch (error) {
        return
    }
}
/**
 * @function
 * @param key
 * @param env
 * @param headers
 * @param path
 * @param method
 * @param body
 * @param params
 * @param query
 * @returns {Promise<void>}
 */
exports.handlerRequestApplication = async ({ key, env }, { path, method, type, statusCode }) => {
    try {
        await requestApi({
            url: REQUEST_HANDLER_REPORT,
            method: METHOD_REPORT,
            data: { path, method, type, statusCode, key, env }
        })
    } catch (error) {
        return
    }
}
/**
 * @function
 * @param key
 * @param env
 * @param origin
 * @param message
 * @param stack
 * @param type
 * @returns {Promise<void>}
 */
exports.handlerRequestEvents = async ({ key, env }, { origin, message, stack, type }) => {
    try {
        await requestApi({
            url: REQUEST_HANDLER_REPORT,
            method: METHOD_REPORT,
            data: { origin, message, stack, type, key, env }
        })
    } catch (error) {
        return
    }
}
