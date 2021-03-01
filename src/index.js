

const { report: { handlerErrorNotTreatment } } = require('./integrations')
const eventsErrors = require('./events')

/**
 * @function
 * @param req
 * @param err
 * @returns {{headers: any, path, stack: any, method: *, body: *}}
 */
const mountedError = (req, err) => ({
    headers: JSON.stringify(req.headers),
    path: req.path,
    method: req.method,
    body: JSON.stringify(req.body),
    stack: err.stack
})

/**
 * @function
 * @param key
 * @param env
 */
const initEventsError = ({ key, env }) => {
    const { eventsTreatment } = eventsErrors({ key, env })
    eventsTreatment()
}


/**
 * @function
 * @param key
 * @returns {{handlerListen: (function(*, *=, *, *): *)}}
 */
module.exports = ({ key, env = 'development' }) => {
    initEventsError({ key, env })
    return {
        errorHandler: (err, req, res, next) => {
            handlerErrorNotTreatment(key, mountedError(req, err))
            return next()
        },
        requestHandler: (data, {req}, next) => {
            return next()
        }
    }
}
