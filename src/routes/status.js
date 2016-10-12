export default {
    '/status': {
        get: async (ctx, next) => ctx.body = 'came here to check the status, did you?'
    }
}
