import {mapObjIndexed} from 'ramda';
import Koa from 'koa'
import koaRouter from 'koa-router'

import routes from './routes'


const moi = mapObjIndexed;
const app = new Koa()
const router = koaRouter();


moi((routeObj, endpoint) => {
    moi((r, callType) => {
        router[callType](endpoint, r)
    }, routeObj)
})(routes);


app.use(router.routes())
app.use(router.allowedMethods())

app.listen(5050, () => console.log('listening on port 5050'))

export default app
