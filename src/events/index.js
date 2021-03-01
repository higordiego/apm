const { report: { eventsHandlerTreatment } } = require('../integrations')


/**
 * @function
 * @param key
 * @param env
 * @returns {function(*, *): *}
 */
const mountedError = (key, env) => (error, origin) => eventsHandlerTreatment({ key }, { origin, error: error.stack, env })

/**
 * @function
 * @param key
 * @param env
 * @returns {{eventsTreatment: eventsTreatment}}
 */
module.exports = ({ key, env }) => ({
    eventsTreatment: () => {
        process.on('uncaughtExceptionMonitor', mountedError(key, env));
    }
})



