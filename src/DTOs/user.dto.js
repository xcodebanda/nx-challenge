class UserDTO {
  static signUp (user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      userPic: user.userPic,
      email: user.email
    }
  }

  static token (user) {
    return {
      userPic: user.userPic,
      email: user.email,
      id: user._id
    }
  }
}

module.exports = UserDTO
