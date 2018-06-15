const fs = require('fs')

module.exports = fileName => {
    const read = fs.statSync(fileName)
    return read.size / 1000
}
