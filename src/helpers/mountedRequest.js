/**
 * @function
 * @param req
 * @param res
 * @param diffTime
 * @returns {{duration, headers: string, path, stack: string, method: *, query: string, params: string, body: string, type: string, message: string}}
 */
exports.mountedErrorResponse = (req, res, body, diffTime) => ({
    headers: JSON.stringify(req.headers),
    path: req.url,
    method: req.method,
    query: JSON.stringify(req.query || {}),
    params: JSON.stringify(req.params || {}),
    body: JSON.stringify(req.body || {}),
    duration: diffTime,
    statusCode: res.statusCode,
    type: 'handler-error',
    stack: body,
    message: `${res.statusMessage} - ${req.url}`
})

/**
 * @function
 * @param req
 * @param diffTime
 * @returns {{duration, headers: string, path, method: *, query: string, params: string, body: string, type: string}}
 */
exports.mountedApplicationResponse = (req, res, diffTime) => ({
    headers: JSON.stringify(req.headers),
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
