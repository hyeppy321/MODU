import {features} from "assets/geo-data/countries.json"

class LoadCountriesTask {

    load = (setState) =>{
        setState(features);
    }
}

export default LoadCountriesTask;