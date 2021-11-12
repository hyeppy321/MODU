import React, { useEffect, useState } from 'react';
import { API_ENCODED_KEY,getCovid19InfStateJson_URL,chanbi_key,yeongin_key } from '../Config';
import { Card, CardBody, CardHeader} from 'reactstrap';
import { getColor } from 'utils/colors';
import { Bar} from 'react-chartjs-2';
import axios from 'axios';
import Loading from '../map/Loading';


const Chart1 = () => {
  const[Load,setLoad] = useState(true);
  const [ConfirmedData,setConfirmedData] = useState({});

 useEffect(() => {
       window.scrollTo(0, 0);
       let endpointInfo = `${getCovid19InfStateJson_URL}?serviceKey=${yeongin_key}&startCreateDt=20211106&endCreateDt=20211112`; 

       const fetchEvents = async() =>{
           const res = await axios.get(endpointInfo);
           makeData(res.data.response.body.items.item);
           setLoad(false);
       }

       const makeData = (items) =>{
           const arr = items.reduce((acc,cur)=>{
               const currentDate = new Date(cur.createDt);
               const year = currentDate.getFullYear();
               const month = currentDate.getMonth();
               const date = currentDate.getDate();
               const careCnt = cur.careCnt;
               acc.push({year,month,date,careCnt});
               return acc;
       },[])

       const arrReverse = [...arr].reverse();
       const labels = arrReverse.map(a=>`${a.date+1}일`);
       setConfirmedData ({
               labels,
               datasets:[
                   {
                       label: '치료중인 환자 수',
                       backgroundColor: getColor('primary'),
                       borderColor: getColor('primary'),
                       borderWidth: 1,
                       data: arrReverse.map(a=>a.careCnt),
                   },
               ]
       });
   }    
       fetchEvents()
   })

   return (
       <Card>
           <CardHeader>국내 치료중인 환자 수</CardHeader>
           <CardBody>
             {Load === true ? (
               <Loading/>
               ) : (
           <Bar data={ConfirmedData} />
           )}
           </CardBody>
         </Card>
    );
}

export default Chart1;