//SERVER ROUTES
export const USER_SERVER = '/api/users';

export const API_ENCODED_KEY =
  'r1%2FX7uK7cJ0DtLUvgK%2F9c95mWzoTl6toUTh7YKCij2%2BGRd8OaBD%2FjNqTcjoxP8uJTshSyggHh4ZIBjXCk1qGYA%3D%3D';

export const API_DECODED_KEY =
  'r1/X7uK7cJ0DtLUvgK/9c95mWzoTl6toUTh7YKCij2+GRd8OaBD/jNqTcjoxP8uJTshSyggHh4ZIBjXCk1qGYA==';

export const SafetyNews_URL =
  'http://apis.data.go.kr/1262000/CountryCovid19SafetyServiceNew/getCountrySafetyNewsListNew'; // 국가 지역별 최신안전소식(코로나관련)

export const ArrivalsService_URL =
  'http://apis.data.go.kr/1262000/CountryOverseasArrivalsService/getCountryOverseasArrivalsList'; // 국가별 해외입국자 조치현황

export const EntranceVisaService_URL =
  'http://apis.data.go.kr/1262000/EntranceVisaService2/getEntranceVisaList2'; // 국가·지역별 입국허가요건

export const KoreaDepartureService_URL =
  'http://apis.data.go.kr/1262000/CountryKoreaDepartureService/getCountryKoreaDepartureList'; // 국가별 한국발 입국자 조치

export const getCovid19NatInfStateJson_URL =
  'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson'; // 보건복지부 코로나19해외발생 현황

export const getTravelAlarm_URL =
  'http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2'; // 국가∙지역별 여행경보

export const TravelWarning_URL =
  'http://apis.data.go.kr/1262000/TravelWarningService/getTravelWarningList'; // 여행경보제도 xml

export const TravelWarningInfo_URL =
  'http://apis.data.go.kr/1262000/TravelWarningService/getTravelWarningInfo'; // 여행경보제도 단일 xml

export const SptravelWarningService_URL =
  'http://apis.data.go.kr/1262000/SptravelWarningService2/getSptravelWarningList2'; // 국가∙지역별 특별여행주의보
