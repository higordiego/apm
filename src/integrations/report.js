
const REQUEST_HANDLER_REPORT = 'http://localhost:7000/apm/handler-request'
const METHOD_REPORT = 'POST'

const { requestApi } = require('./request')

/**
 * @function
 * @param key
 * @param headers
 * @param path
 * @param body
 * @param stack
 * @returns {Promise<void>}
 */
exports.handlerErrorNotTreatment = async ({ key, env }, { headers, path, method, body, stack, message, params, query }) => {
    try {
        await requestApi({
            url: REQUEST_HANDLER_REPORT,
            method: METHOD_REPORT,
            data: { headers, path, method, body, message, params, query, stack, key, env }
        })
    } catch (error) {
        return
    }
}
