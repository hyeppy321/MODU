import { features } from 'assets/geo-data/countries.json';
import React, { useEffect, useState } from 'react';
import {
  API_ENCODED_KEY,
  getCovid19NatInfStateJson_URL,
  chanbi_key,
  yeongin_key,
} from '../Config';
import Axios from 'axios';
import legendItems from '../../entities/LegendItems';
import moment from 'moment';
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
    this.yesterdayEndpointInfo = `${getCovid19NatInfStateJson_URL}?serviceKey=${chanbi_key}&startCreateDt=${this.yesterday}&endCreateDt=${this.yesterday}`;
    this.todayEndpointInfo = `${getCovid19NatInfStateJson_URL}?serviceKey=${chanbi_key}&startCreateDt=${this.today}`;
    await Axios.get(this.yesterdayEndpointInfo).then(res => {
      // console.log(res.data.response.body.items.item);
      console.log(res.data);
      this.yesterdayDefcnt = res.data.response.body.items.item;
    });
    await Axios.get(this.todayEndpointInfo).then(res => {
      // console.log(res.data.response.body.items.item);
      console.log(res.data);
      this.todayDefcnt = res.data.response.body.items.item;
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
    // console.log(this.mapCountries);
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
