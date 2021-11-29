const express = require("express");
const router = express.Router();
const request = require("request");

const API_ENCODED_KEY =
  "r1%2FX7uK7cJ0DtLUvgK%2F9c95mWzoTl6toUTh7YKCij2%2BGRd8OaBD%2FjNqTcjoxP8uJTshSyggHh4ZIBjXCk1qGYA%3D%3D";
const chanbi_key =
  "V19PpK7VUIMrF9WqDKk%2BgZRET7zWU34lPAAJyIEe96VmWDu%2FhGu9B%2Bcon3Dn%2FP4Oj74lzzyuV7aqEBKvc5xRkw%3D%3D";
const friend_key =
  "SgEk8mUduv4ezkK8AO822hSARBK0YI3i4p0CCsVOU4k0dMJ7IS6qMCO8gYqIr%2BqD82RelttqPqESYRZKZbZFbQ%3D%3D";
const yeongin_key =
  "qUnQJ2qjsQ38NOd3FvjN4BKHgEzg5tZwfb0%2BWThnkETsqkGcAgCKXg3rPwQoohdGMR4vSQ8CaHmxQNomvSVrbQ%3D%3D";

const getCovid19NatInfStateJson_URL =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson";
const ArrivalsService_URL =
  "http://apis.data.go.kr/1262000/CountryOverseasArrivalsService/getCountryOverseasArrivalsList";
const getTravelAlarm_URL =
  "http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2"; // 국가∙지역별 여행경보
const TravelSpecialWarningService_URL =
  "http://apis.data.go.kr/1262000/TravelSpecialWarningService/getTravelSpecialWarningList"; //특별여행경보
const getCovid19InfStateJson_URL =
  "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson"; // 보건복지부 코로나19 감염현황
const getCountryPopulation_URL =
  "http://apis.data.go.kr/1262000/CountryPopulationService2/getCountryPopulationList2"; // 외교부_국가∙지역별 인구증감 정보

const endpointInfo1 = `${getCovid19NatInfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20211109&endCreateDt=20211109`;
const endpointInfo3 = `${getTravelAlarm_URL}?serviceKey=${API_ENCODED_KEY}&pageNo=1&numOfRows=200`;
const endpointInfo4 = `${TravelSpecialWarningService_URL}?serviceKey=${API_ENCODED_KEY}&pageNo=1&numOfRows=200`;

const ReturnType = "JSON";
const NumOfRows = 10;
const PageNo = 1;

router.post("/Covid19Chart1", (req, res) => {
  const chart1EndpointInfo = `${getCovid19InfStateJson_URL}?serviceKey=${yeongin_key}&numOfRows=7&startCreateDt=${req.body.createdt}&endCreateDt=${req.body.enddt}`;
  request(
    { url: chart1EndpointInfo, method: "GET", json: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data: response });
    }
  );
});

router.post("/Covid19Chart2", (req, res) => {
  const chart2EndpointInfo = `${getCovid19InfStateJson_URL}?serviceKey=${chanbi_key}&numOfRows=7&startCreateDt=${req.body.createdt}&endCreateDt=${req.body.enddt}`;
  request(
    { url: chart2EndpointInfo, method: "GET", json: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data: response });
    }
  );
});

router.get("/Covid19Nat", (req, res) => {
  request(
    { url: endpointInfo1, method: "GET", json: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data: response });
    }
  );
});

router.get("/YesterdayCovid19Nat/:yesterday", (req, res) => {
  const yesterdayEndpointInfo = `${getCovid19NatInfStateJson_URL}?serviceKey=${chanbi_key}&startCreateDt=${req.params.yesterday}&endCreateDt=${req.params.yesterday}`;
  request(
    { url: yesterdayEndpointInfo, method: "GET", json: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data: response });
    }
  );
});

router.get("/TodayCovid19Nat/:today", (req, res) => {
  const todayEndpointInfo = `${getCovid19NatInfStateJson_URL}?serviceKey=${friend_key}&startCreateDt=${req.params.today}&endCreateDt=${req.params.today}`;
  request(
    { url: todayEndpointInfo, method: "GET", json: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data: response });
    }
  );
});

router.post("/ArrivalsService", (req, res) => {
  const endpointInfo2 =
    `${ArrivalsService_URL}?serviceKey=${API_ENCODED_KEY}&returnType=${ReturnType}
    &numOfRows=${NumOfRows}&pageNo=${PageNo}&cond[country_nm::EQ]=` +
    encodeURI(`${req.body.CountryName}`) +
    `&cond[country_iso_alp2::EQ]=${req.body.CountryIso}`;
  request(
    { url: endpointInfo2, method: "GET", json: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data: response });
    }
  );
});

router.get("/TravelAlarm", (req, res) => {
  request(
    { url: endpointInfo3, method: "GET", json: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data: response });
    }
  );
});

router.get("/SpecialWarning", (req, res) => {
  request(
    { url: endpointInfo4, method: "GET", json: true },
    (err, response) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, data: response });
    }
  );
});

router.post("/getCountryPopulation", (req, res) => {
  const endpointInfo =
    `${getCountryPopulation_URL}?serviceKey=${API_ENCODED_KEY}&returnType=${ReturnType}
  &numOfRows=${NumOfRows}&pageNo=${PageNo}&cond[country_nm::EQ]=` +
    encodeURI(`${req.body.CountryName}`) +
    `&cond[country_iso_alp2::EQ]=${req.body.CountryIso}`;
  request({ url: endpointInfo, method: "GET", json: true }, (err, response) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, data: response });
  });
});
module.exports = router;
