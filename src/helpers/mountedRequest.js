const { removeJsonParams } = require('../config')

const parseJsonToString = (value) => JSON.stringify(value)


/**
 * @function
 * @param req
 * @param res
 * @param diffTime
 * @returns {{duration, headers: string, path, stack: string, method: *, query: string, params: string, body: string, type: string, message: string}}
 */
exports.mountedErrorResponse = (req, res, body, diffTime, config) => ({
    headers: parseJsonToString(removeJsonParams(config, req.headers)),
    path: req.url,
    method: req.method,
    query: parseJsonToString(removeJsonParams(config, req.query || {})),
    params: parseJsonToString(removeJsonParams(config,req.params || {})),
    body: parseJsonToString(removeJsonParams(config,req.body || {})),
    duration: diffTime,
    statusCode: res.statusCode,
    type: 'handler-error',
    stack: parseJsonToString(removeJsonParams(config, body, true)),
    message: `StatusCode ${res.statusCode} - ${req.url}`
})

/**
 * @function
 * @param req
 * @param diffTime
 * @returns {{duration, headers: string, path, method: *, query: string, params: string, body: string, type: string}}
 */
exports.mountedApplicationResponse = (req, res, diffTime, config) => ({
    headers: parseJsonToString(removeJsonParams(config, req.headers || {})),
    path: req.url,
    method: req.method,
    duration: diffTime,
    statusCode: res.statusCode,
    type: 'handler'
})

/**
 * @function
 * @param origin
 * @param error
 * @returns {{stack: (string|Object|string|*), origin, message, type: string}}
 */
exports.mountedEventsError = (origin, error) => ({
    origin: origin,
    message: error.message,
    stack: error.stack,
    type: 'event-error'
})
