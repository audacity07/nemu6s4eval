const { BlackListModel } = require("../models/blacklist");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(200).json({ msg: `Token required` });
    } else {
      let list = await BlackListModel.find();
      for (let val of list) {
        if (token === val.token) {
          return res
            .status(200)
            .json({ msg: `Token has expired, login again` });
        }
      }
      jwt.verify(token, "masai", function (err, decoded) {
        if (decoded) {
          // console.log(decoded);
          req.body.name = decoded.name;
          req.body.userID = decoded.userID;
          // console.log(req.body);
        }
        next();
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { auth };
