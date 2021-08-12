class RequestResponse {
  static validations (message, errors, status) {
    return {
      success: false,
      message,
      errors,
      status
    }
  }

  static success (status, data) {
    return {
      success: true,
      status,
      data
    }
  }

  static fail (message, status) {
    return {
      success: false,
      message,
      status
    }
  }
}

module.exports = RequestResponse
