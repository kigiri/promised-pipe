const path = require('path')
const prettyTime = require('pretty-hrtime')
const pipe = require(path.join(__dirname, process.env.PROMISED_PIPE_LIB_FILE || 'index.js'))
const time = 2000

let begin = Date.now()
let counter = 0
let invalidateOpt
const ff = () => invalidateOpt++
const solved = Promise.resolve(invalidateOpt)
const qq = () => solved
while ((Date.now() - begin) < time) {
    pipe(ff)
    pipe(ff, qq)
    pipe(qq, ff)
    pipe(ff, ff)
    pipe(qq, ff, ff)
    pipe(ff, qq, ff)
    pipe(ff, ff, qq)
    pipe(ff, ff, qq, ff)
    pipe(ff, ff, qq, ff)
    pipe(ff, ff, qq, ff, ff, ff)
    counter++
}

console.log((counter / time) + ' build per ms')
counter = 0

const fn1 = pipe(ff)
const fn2 = pipe(ff, qq)
const fn3 = pipe(qq, ff)
const fn4 = pipe(ff, ff)
const fn5 = pipe(qq, ff, ff)
const fn6 = pipe(ff, qq, ff)
const fn7 = pipe(ff, ff, qq)
const fn8 = pipe(ff, ff, qq, ff)
const fn9 = pipe(ff, ff, qq, ff)
const fn0 = pipe(ff, ff, qq, ff, ff, ff)

begin = Date.now()
while ((Date.now() - begin) < time) {
    fn1()
    fn2()
    fn3()
    fn4()
    fn5()
    fn6()
    fn7()
    fn8()
    fn9()
    fn0()
    counter++
}

console.log((counter / time) + ' exec per ms')
