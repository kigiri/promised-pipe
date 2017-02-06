// Public intefrace
module.exports = promisedPipe

const chain = (q, fn) => q.then(fn)

function promisedPipe() {
    if (arguments.length < 1) {
        throw Error('pipe requires at least one argument')
    }

    let i = -1
    const fns = Array(arguments.length - 1)
    const start = arguments[0]

    while (++i < arguments.length) {
        if (typeof arguments[i] !== 'function') {
            throw Error(`pipe requires each argument to be a function. Argument #${i+1} is of type "${typeof arguments[i]}"`)
        }
        i && (fns[i - 1] = arguments[i])
    }

    return function() {
        let j = -1
        let head

        function exec(val) {
            while (++j < fns.length) {
                val = fns[j](val)
                if (val && typeof val.then === 'function') {
                    return val
                }
            }
            return val
        }

        try {
            head = start.apply(null, arguments)
            if (!head || typeof head.then !== 'function') {
                head = exec(head)
            }
        } catch (err) {
            return Promise.reject(err)
        }

        let k = j
        while (++k < fns.length) {
            head = head.then(exec)
        }

        return (head && typeof head.then === 'function')
            ? head
            : Promise.resolve(head)
    }
}

