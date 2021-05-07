/**
 * @function
 * @param obj
 * @returns {boolean}
 */
exports.isJsonBoolean = (obj) => {
    try {
        JSON.parse(obj)
        return true
    } catch(_) {
        return false
    }
}
