const db = require('../models/db')

exports.getByUser = async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = await db.user.findFirst({
      where: { id: req.user.id }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
}
exports.getallUser = async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = await db.user.findMany()
    res.json(user)
  } catch (err) {
    next(err)
  }
}
exports.editProfile = async (req, res, next) => {
  try {
    const { name, lastname, phone, email } = req.body

    const rs = await db.user.update({
      where: {
        id: req.user.id
      },
      data: {
        name,
        lastname,
        email,
        phone
      }
    })



    res.json(rs)
  } catch (error) {
    next(error)
  }

}

