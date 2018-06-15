const tslintShouldEmitErrors = path => {
    const tslintConfig = require(path)
    if (tslintConfig.defaultSeverity === 'error') {
        return true
    } else {
        return false
    }
}

module.exports = {
    tslintShouldEmitErrors,
}
