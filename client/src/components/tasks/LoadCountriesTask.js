import {features} from "assets/geo-data/countries.json"
import React, { useEffect, useState } from 'react';
import { API_ENCODED_KEY, getCovid19NatInfStateJson_URL } from '../Config';
import Axios from 'axios';

class LoadCountriesTask {
    setState = null;
    mapCountries = features;

    load = (setState) =>{
        Axios.get(`${getCovid19NatInfStateJson_URL}?serviceKey=${API_ENCODED_KEY}&startCreateDt=20211111`)
        .then(res => {
            console.log(res);
        });
        setState(features);
    }
};

export default LoadCountriesTask;