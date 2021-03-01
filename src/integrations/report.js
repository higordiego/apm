
const REQUEST_HANDLER_REPORT = 'https://foil.higordiego.com.br/apm/handler-request'
const REQUEST_EVENTS_REPORT = 'https://foil.higordiego.com.br/apm/events-throw'
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
exports.handlerErrorNotTreatment = async ({ key, env }, { headers, path, body, stack }) => {
    try {
        await requestApi({ url: REQUEST_HANDLER_REPORT,  method: METHOD_REPORT,  data: { headers,  path,  body,  stack, key, env } })
    } catch (error) {
        return
    }
}

/**
 * @function
 * @param key
 * @returns {Promise<void>}
 */
exports.eventsHandlerTreatment = async ({ key, env }, { origin, error }) => {
    try {
        await requestApi({ url: REQUEST_EVENTS_REPORT,  method: METHOD_REPORT,  data: { origin, error , key, env } })
    } catch (error) {
        return
    }
}
