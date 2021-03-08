

const { report: { handlerErrorNotTreatment } } = require('./integrations')

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
    query: JSON.stringify(req.query),
    params: JSON.stringify(req.params),
    body: JSON.stringify(req.body),
    stack: err.stack,
    message: err.message
})

/**
 * @function
 * @param req
 * @param res
 * @returns {{headers: string, path: *, stack: string, method: *, query: string, params: string, body: string, message: string}}
 */
const mountedErrorResponse = (req, res) => ({
    headers: JSON.stringify(req.headers),
    path: req.url,
    method: req.method,
    query: JSON.stringify(req.query),
    params: JSON.stringify(req.params),
    body: JSON.stringify(req.body),
    stack: `${res.statusMessage} - ${req.url}`,
    message: `${res.statusMessage} - ${req.url}`
})




/**
 * @function
 * @param key
 * @returns {{handlerListen: (function(*, *=, *, *): *)}}
 */
module.exports = ({ key, env = 'development' }) => {
    return {
        errorHandler: (err, req, res, next) => {
            handlerErrorNotTreatment({ key, env }, mountedError(req, err))
            return next()
        },
        captureHandler: (req, res, next) => {
            res.once('finish', () => {
                if (Number(res.statusCode) === 500) handlerErrorNotTreatment({ key, env }, mountedErrorResponse(req, res))
            });
            return next()
        }
    }
}
