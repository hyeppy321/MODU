const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
  });
});

router.post("/info", (req, res) => {
  var request = require("request");

  var url =
    "http://apis.data.go.kr/1262000/CountryCovid19SafetyServiceNew/getCountrySafetyNewsListNew";
  var queryParams =
    "?" +
    encodeURIComponent("serviceKey") +
    `${req.body.encodedKey}`; /* Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("serviceKey") +
    "=" +
    encodeURIComponent(`${req.body.decodedKey}`); /* */
  queryParams +=
    "&" +
    encodeURIComponent("returnType") +
    "=" +
    encodeURIComponent(`${req.body.returnType}`); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent(`${req.body.numOfRows}`); /* */
  queryParams +=
    "&" +
    encodeURIComponent("pageNo") +
    "=" +
    encodeURIComponent(`${req.body.pageNo}`); /* */
  queryParams +=
    "&" +
    encodeURIComponent("cond[country_nm::EQ]") +
    "=" +
    encodeURIComponent(`${req.body.country_nm}`); /* */
  queryParams +=
    "&" +
    encodeURIComponent("cond[country_iso_alp2::EQ]") +
    "=" +
    encodeURIComponent(`${req.body.ncountry_iso}`); /* */

  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, body) {
      console.log("Status", response.statusCode);
      console.log("Headers", JSON.stringify(response.headers));
      console.log("Reponse received", body);
    }
  );
  res.send("성공");
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
