const fs = require('fs')
const filesize = require('filesize')
const chalk = require('chalk')

const getBundleSize = fileName => {
    try {
        const read = fs.statSync(fileName)
        return read.size
    } catch (e) {
        return null
    }
}

const diffFileSize = (sizeBeforeBuild, sizeAfterBuild) => {
    if (!sizeAfterBuild) {
        return ''
    }
    const afterBuildFormatted = filesize(sizeAfterBuild, {
        base: 10,
        output: 'object',
    })
    if (!sizeBeforeBuild) {
        return chalk.green(
            `${afterBuildFormatted.value} ${afterBuildFormatted.suffix}`
        )
    }
    const diff = filesize(sizeAfterBuild - sizeBeforeBuild, {
        base: 10,
        output: 'object',
    })
    if (diff.value === 0) {
        return `${afterBuildFormatted.value} ${
            afterBuildFormatted.suffix
        } (+0 B)`
    } else if (diff.value > 0) {
        return chalk.yellow(
            `${afterBuildFormatted.value} ${afterBuildFormatted.suffix} (+${
                diff.value
            } ${diff.suffix})`
        )
    } else {
        return chalk.green(
            `${afterBuildFormatted.value} ${afterBuildFormatted.suffix} (${
                diff.value
            } ${diff.suffix})`
        )
    }
}

module.exports = {
    getBundleSize,
    diffFileSize,
}
