// import world50m from 'assets/geo-data/world-50m.json';
// import { scaleLinear } from 'd3-scale';
// import React, { Component } from 'react';
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
//   Markers,
//   ZoomableGroup,
// } from 'react-simple-maps';
// import { getColor } from 'utils/colors';

// const cityScale = scaleLinear().domain([0, 37843000]).range([1, 25]);

// function BubbleMap(props) {
//   const secondaryColor = getColor('secondary');
//   const lightColor = getColor('light');

//   // let { Info } = props;
//   // Info.map(item => console.log(item.country_iso_alp2));

//   return (
//     <ComposableMap
//       projectionConfig={{ scale: 205 }}
//       width={980}
//       height={551}
//       style={{
//         width: '100%',
//         height: 'auto',
//       }}
//     >
//       <ZoomableGroup center={[0, 20]} disablePanning>
//         <Geographies geography={world50m}>
//           {(geographies, projection) =>
//             geographies.map(
//               (geography, i) =>
//                 geography.id !== 'ATA' && (
//                   <Geography
//                     key={i}
//                     geography={geography}
//                     projection={projection}
//                     style={{
//                       default: {
//                         fill: lightColor,
//                         stroke: lightColor,
//                         strokeWidth: 0.75,
//                         outline: 'none',
//                       },
//                       hover: {
//                         fill: secondaryColor,
//                         stroke: secondaryColor,
//                         strokeWidth: 0.75,
//                         outline: 'none',
//                       },
//                       pressed: {
//                         fill: secondaryColor,
//                         stroke: secondaryColor,
//                         strokeWidth: 0.75,
//                         outline: 'none',
//                       },
//                     }}
//                   />
//                 ),
//             )
//           }
//         </Geographies>
//       </ZoomableGroup>
//     </ComposableMap>
//   );
// }

// export default BubbleMap;
