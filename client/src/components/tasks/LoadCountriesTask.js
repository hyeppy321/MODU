import { features } from 'assets/geo-data/countries.json';
import React, { useEffect, useState } from 'react';
import { API_ENCODED_KEY, getCovid19NatInfStateJson_URL } from '../Config';
import Axios from 'axios';

class LoadCountriesTask {
  setState = null;
  mapCountries = features;
  Defcnt = [];

  filtercnt = nation => {
    this.cnt = 0;
    this.Defcnt.filter(item => item.nationNmEn.indexOf(nation) != -1).map(
      item => {
        console.log(item);
        this.cnt = item.natDefCnt;
      },
    );
    return this.cnt;
  };

  load = async setState => {
    await Axios.get(
      `${getCovid19NatInfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20211110`,
    ).then(res => {
      //   console.log(res.data.response.body.items.item);
      this.Defcnt = res.data.response.body.items.item;
    });
    console.log(this.Defcnt);
    this.mapCountries.map((item, index) => {
      item.properties = {
        ...item.properties,
        natDefCnt: this.filtercnt(item.properties.ADMIN),
      };
    });
    console.log(this.mapCountries);
    setState(features);
  };
}

export default LoadCountriesTask;
