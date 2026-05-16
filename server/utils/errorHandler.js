exports.error = (code, message) => {
    return {status: false, code: code, message: message}
}