const events = require('./events')
const { logResponseBody } = require('./integrations/interceptor')
const { log }  = require('./loggers')


/**
 * @function
 * @param key
 * @returns {{handlerListen: (function(*, *=, *, *): *)}}
 */
module.exports = ({ key, env = 'development' }) => {
    events({ key, env }).eventListening()
    return {
        captureHandler: logResponseBody(  { key, env }),
        logger: ({ log: log({ key, env }) })
    }
}
