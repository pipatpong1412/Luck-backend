const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const thaiId = require("thaiid");

exports.register = async (req, res, next) => {
  const { card_id, password, email, name, lastname, role } = req.body;
  try {
    // validation
    if (!(card_id && password && email && name && lastname  )) {
      return next(new Error("Fulfill all inputs"));
    }
    
    const red = thaiId.verify(card_id);
    // console.log(thaiId.verify(card_id))
    

    if (!red || card_id.length != 13) {
      return next(new Error("รหัสบัตรประชาชนไม่ถูกต้อง"))
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    // console.log(hashedPassword);
    const data = {
      card_id,
      password: hashedPassword,
      email,
      name,
      lastname,
      role
    };

    await db.user.create({ data });
    // console.log(rs)

    res.json({ msg: "Register successful" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { card_id, password } = req.body;
  try {
    // validation
    if (!(card_id.trim() && password.trim())) {
      throw new Error("username or password must not blank");
    }
    // find username in db.user
    const user = await db.user.findFirstOrThrow({ where: { card_id } });
    // check password
    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error("invalid login");
    }
    // issue jwt token
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // console.log(token)
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.getme = (req, res, next) => {
  res.json(req.user);
};