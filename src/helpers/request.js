const axios = require('axios')

/**
 * @function
 * {@link module:https://www.npmjs.com/package/axios}.
 * @requires module:axios
 * @param  {Object} data
 */
const request = async (params, attempt, maxium) => {
    try {
        const { data } = await axios.request({...params, timeout: 2000 })
        return data
    } catch (e) {
        if (attempt >= maxium) throw e
        return request(params, attempt + 1, maxium)
    }
}

/**
 * @function
 * @param  {Object} data
 * @return {Promise}
 */
exports.requestApi = (params) => request(params, 0, 3)

