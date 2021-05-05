
const REQUEST_HANDLER_REPORT = 'https://foil.higordiego.com.br/apm/handler-log'
const METHOD_REPORT = 'POST'

const { requestApi } = require('../helpers/request')

exports.handlerLog = async ({ key, env }, {  type, tag, message }) => {
    try {
        await requestApi({
            url: REQUEST_HANDLER_REPORT,
            method: METHOD_REPORT,
            data: { type, tag, key, env, message }
        })
    } catch (error) {
        return
    }
}
