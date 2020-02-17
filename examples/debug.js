// Use a custom logger to filter and manipulate the data being written.
//
// The example shows how you can ignore logs tagged with 'debug'
// unless the `DEBUG` env var is set.
const ratlog = require('../index')

const log = ratlog.logger(log => {
  if (process.env.DEBUG || !log.tags.includes('debug')) {
    process.stdout.write(ratlog.stringify(log))
  }
})

log('log')

const debug = log.tag('debug')

debug('debugging only')
