class UserDTO {
  static withoutPassword (user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      userPic: user.userPic,
      country: user.country,
      email: user.email
    }
  }

  static auth (user) {
    return {
      firstName: user.firstName,
      userPic: user.userPic
    }
  }
}

module.exports = UserDTO
