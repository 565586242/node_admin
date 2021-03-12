module.exports = {
  successMsg(message) {
    return {
      code: 0,
      message
    }
  },
  errorMsg(message) {
    return {
      code: 500,
      message
    }
  },
  successData(data) {
    return {
      code: 0,
      ...data
    }
  }
}