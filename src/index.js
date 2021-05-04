const events  = require('./events')
const { report: { handlerErrorNotTreatment, handlerRequestApplication } } = require('./integrations')
const { mountedErrorResponse, mountedApplicationResponse } = require('./helpers/mountedRequest')

const logResponseBody = ({ key, env }) => async (req, res, next) => {
    let oldWrite = res.write
    let oldEnd = res.end

    let initDate = new Date()
    let chunks = []

    res.write = function (chunk) {
        chunks.push(new Buffer.from(chunk));
        oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk) chunks.push(new Buffer.from(chunk));

        const responseBody = Buffer.concat(chunks).toString('utf8');

        const diffTime = Math.abs(new Date() - initDate);
        handlerRequestApplication({ key, env }, mountedApplicationResponse(req, res, diffTime))
        if (Number(res.statusCode) >= 500)  handlerErrorNotTreatment({ key, env }, mountedErrorResponse(req, res, responseBody, diffTime))

        oldEnd.apply(res, arguments);
    };

    return next();
}

/**
 * @function
 * @param key
 * @returns {{handlerListen: (function(*, *=, *, *): *)}}
 */
module.exports = ({ key, env = 'development' }) => {
    events({ key, env }).eventListening()
    return {
        captureHandler: logResponseBody(  { key, env })
    }
}
