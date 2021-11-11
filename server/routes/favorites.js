const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favorited", (req, res) => {
  //내가 이 나라를 favorite 리스트에 넣었는지 정보를 DB에서 가져오기

  //mongoDB에서 favorite 숫자 가져오기
  Favorite.find({
    nationKrNm: req.body.nationKrNm,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    //내가 favorite 안했으면 false, 한 개라도 있으면 true
    let result = false;
    if (info.length != 0) {
      result = true;
    }

    //그 다음에 프론트에 숫자 정보 보내주기
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    nationKrNm: req.body.nationKrNm,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getFavored", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;
