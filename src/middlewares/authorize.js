const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error('Unauthorize to access')
    }
    next()
  }
}

module.exports = authorizePermission
