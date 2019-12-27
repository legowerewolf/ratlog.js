const ratlog = require('../index')

const main = () => {
  const log = ratlog(process.stdout)

  log('app starting')

  const counterLog = log.tag('counter')

  startCounter({
    max: 2,
    log: (msg, fields = {}, ...tags) => {
      if (tags.includes('event')) {
        countMetric(fields.count)
      }
      counterLog(msg, fields, ...tags)
    },
    done: () => {
      log('app shutting down')
    }
  })

  log('app ready')
}

const startCounter = ({ max = 0, interval = 3000, log, done }) => {
  log('starting')

  const count = (x = 1) => {
    if (x > max) {
      log('stopped')
      done()
      return
    }

    log('counting', { count: x }, 'event')

    setTimeout(count, interval, x + 1)
  }

  log('started')

  // Run async after init is done
  setImmediate(count)
}

// Simulate metrics counting. Would normally be done by an external system.
let globalCount = 0

// Writing metrics to stderr to simulate metrics collecting
const countMetric = count => {
  globalCount += count
  process.stderr.write(`count = ${globalCount}\n`)
}

main()
