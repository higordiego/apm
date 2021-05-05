const { handlerErrorNotTreatment, handlerRequestApplication } = require('./report')
const { mountedErrorResponse, mountedApplicationResponse } = require('../helpers/mountedRequest')

/**
 * @function
 * @param key
 * @param env
 * @returns {function(*=, *=, *): *}
 */
exports.logResponseBody = ({ key, env }) => async (req, res, next) => {
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
