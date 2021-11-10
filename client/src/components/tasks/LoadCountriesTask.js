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
        //console.log(item);
        this.cnt = item.natDefCnt;
      },
    );
    return this.cnt;
  };

  load = async setState => {
    this.setState = setState;

    await Axios.get(
      `${getCovid19NatInfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20211110`,
    ).then(res => {
      //   console.log(res.data.response.body.items.item);
      this.Defcnt = res.data.response.body.items.item;
    });
    //console.log(this.Defcnt);
    
    this.mapCountries.map((item, index) => {
      item.properties = {
        ...item.properties,
        natDefCnt: this.filtercnt(item.properties.ADMIN),
      };
    })
    this.#processCovidData(this.mapCountries);
    console.log(this.mapCountries);
  };
  
  
  #processCovidData = (covidCountries) => {
      for(let i=0; i<this.mapCountries.length;i++){
          const mapCountry = this.mapCountries[i];
          const covidCountry = covidCountries.find(
              (covidCountry) => covidCountry.properties.ISO_A3 === mapCountry.properties.ISO_A3
        );

        mapCountry.properties.confirmed = 0;
        mapCountry.properties.confirmedText = "0";

        if(covidCountry != null){
            const confirmed = Number(covidCountry.properties.natDefCnt);
            mapCountry.properties.confirmed = confirmed;
            mapCountry.properties.confirmedText = this.#formatNumberWithCommas(confirmed);
        }
    }

    this.setState(this.mapCountries);
  };

    #formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

}

export default LoadCountriesTask;
