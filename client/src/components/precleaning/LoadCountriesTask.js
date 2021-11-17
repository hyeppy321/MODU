import Axios from 'axios';
import moment from 'moment';
import { features } from 'assets/geo-data/countries.json';
import legendItems from '../../entities/LegendItems';
class LoadCountriesTask {
  today = moment().format('YYYYMMDD');
  yesterday = moment().subtract(1, 'days').format('YYYYMMDD');
  setState = null;
  mapCountries = features;
  yesterdayDefcnt = [];
  todayDefcnt = [];

  filtercnt = nation => {
    this.cnt = 0;
    this.todayDefcnt
      .filter(item => item.nationNmEn.indexOf(nation) != -1)
      .map((item, index) => {
        if (nation === item.nationNmEn) {
          this.cnt = item.todayNatDefCnt;
        }
      });
    return this.cnt;
  };

  load = async setState => {
    this.setState = setState;
    await Axios.get(`api/info/YesterdayCovid19Nat`).then(res => {
      this.yesterdayDefcnt = res.data.data.body.response.body.items.item;
    });
    await Axios.get(`api/info/TodayCovid19Nat`).then(res => {
      this.todayDefcnt = res.data.data.body.response.body.items.item;
    });

    this.todayDefcnt.map((item, index) => {
      this.todayDefcnt[index] = {
        ...this.todayDefcnt[index],
        todayNatDefCnt: item.natDefCnt - this.yesterdayDefcnt[index].natDefCnt,
      };
    });

    this.mapCountries.map((item, index) => {
      item.properties = {
        ...item.properties,
        natDefCnt: this.filtercnt(item.properties.ADMIN),
      };
    });
    this.#processCovidData(this.mapCountries);
  };

  #processCovidData = covidCountries => {
    for (let i = 0; i < this.mapCountries.length; i++) {
      const mapCountry = this.mapCountries[i];
      const covidCountry = covidCountries.find(
        covidCountry =>
          covidCountry.properties.ISO_A3 === mapCountry.properties.ISO_A3,
      );

      mapCountry.properties.confirmed = 0;
      mapCountry.properties.confirmedText = '0';

      if (covidCountry != null) {
        const confirmed = Number(covidCountry.properties.natDefCnt);
        mapCountry.properties.confirmed = confirmed;
        mapCountry.properties.confirmedText =
          this.#formatNumberWithCommas(confirmed);
      }

      this.#setCountryColor(mapCountry);
    }

    this.setState(this.mapCountries);
  };

  #setCountryColor = country => {
    const legendItem = legendItems.find(item =>
      item.isFor(country.properties.confirmed),
    );

    if (legendItem != null) country.properties.color = legendItem.color;
  };

  #formatNumberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
}

export default LoadCountriesTask;
