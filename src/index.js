const events  = require('./events')
const { report: { handlerErrorNotTreatment, handlerRequestApplication } } = require('./integrations')
const { mountedErrorResponse, mountedApplicationResponse } = require('./helpers/mountedRequest')

/**
 * @function
 * @param key
 * @returns {{handlerListen: (function(*, *=, *, *): *)}}
 */
module.exports = ({ key, env = 'development' }) => {
    events({ key, env }).eventListening()

    return {
        captureHandler: (req, res, next) => {
            let initDate = new Date()
            res.once('finish', async () => {
                const diffTime = Math.abs(new Date() - initDate);
                if (Number(res.statusCode) >= 500) await handlerErrorNotTreatment({ key, env }, mountedErrorResponse(req, res, diffTime))
                else await handlerRequestApplication({ key, env }, mountedApplicationResponse(req, diffTime))
            });
            return next()
        }
    }
}
