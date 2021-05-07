const events = require('./events')
const { logResponseBody } = require('./integrations/interceptor')
const { log }  = require('./loggers')
const { getConfig } = require('./config')


/**
 * @function
 * @param key
 * @returns {{handlerListen: (function(*, *=, *, *): *)}}
 */
module.exports = ({ key, env = 'development' }) => {
    events({ key, env }).eventListening()
    getConfig({ key, env })

    return {
        captureHandler: logResponseBody(  { key, env }),
        logger: ({ log: log({ key, env }) })
    }
}

