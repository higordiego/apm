const { report: { handlerRequestEvents } } = require('../integrations')
const { mountedEventsError } = require('../helpers/mountedRequest')


/**
 * @function
 * @param key
 * @param env
 * @returns {function(*, *): *}
 */
const mountedError = (key, env) => async (error, origin) => {
    console.log(error)
    await handlerRequestEvents({ key, env }, mountedEventsError(error, origin))
    process.exit(1)
}


/**
 * @function
 * @param key
 * @param env
 * @returns {{eventListening(): void}}
 */
module.exports = ({ key, env }) => ({
    eventListening() {
        process.on('uncaughtException', mountedError(key, env));
    }
})



