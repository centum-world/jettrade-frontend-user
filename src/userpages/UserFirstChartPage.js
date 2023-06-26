// import React, { useEffect, useState } from 'react';
// import { ChartCanvas, Chart } from 'react-stockcharts';
// import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series';
// import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
// import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
// import { fitWidth } from 'react-stockcharts/lib/helper';
// import { last } from 'react-stockcharts/lib/utils'

 
// const UserFirstChartPage = ({ width, }) => {

//     const apiKey = '84ef2f9ee3msh9f99942ec3b2520p17a6e2jsne9585699c596';
//     const symbol = 'MSFT';
    
//     const [data, setData] = useState([]);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await fetchForexData(symbol, apiKey);
//           const jsonData = await response.json();
//           const forexData = jsonData['Time Series FX (Daily)'];
  
//           // Convert data to an array of objects
//           const chartData = Object.keys(forexData).map((date) => ({
//             date: new Date(date),
//             open: parseFloat(forexData[date]['1. open']),
//             high: parseFloat(forexData[date]['2. high']),
//             low: parseFloat(forexData[date]['3. low']),
//             close: parseFloat(forexData[date]['4. close']),
//           }));
  
//           setData(chartData);
//         } catch (error) {
//           console.error('Error fetching forex data:', error);
//         }
//       };
  
//       fetchData();
//     }, [symbol, apiKey]);

//     const fetchForexData = async (symbol, apiKey) => {
//         const apiUrl = `https://www.alphavantage.com/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&apikey=${apiKey}`;
      
//         const response = await fetch(apiUrl);
//         return response;
//       };
  
//     // Calculate the domain for x-axis and y-axis scales
//     const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
//       (d) => d.date
//     );
//     const { data: xData, xScale, xAccessor, displayXAccessor } =
//       xScaleProvider(data);
  
//     const start = xAccessor(last(xData));
//     const end = xAccessor(xData[Math.max(0, xData.length - 100)]);
//     const xExtents = [start, end];


  
//     return (
//       <ChartCanvas
//         width={width}
//         height={400}
//         margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
//         seriesName="FX"
//         data={data}
//         xScale={xScale}
//         xAccessor={xAccessor}
//         displayXAccessor={displayXAccessor}
//         xExtents={xExtents}
//       >
//       <XAxis axisAt="bottom" />
//         <Chart id={1} yExtents={(d) => [d.high, d.low]}>
//           <XAxis />
//           <YAxis />
  
//           <CandlestickSeries />
//         </Chart>
  
//         <Chart id={2} yExtents={(d) => d.volume}>
//           <YAxis
//             axisAt="right"
//             orient="right"
//             ticks={5}
//             tickFormat={(volume) => volume / 1000000 + 'M'}
//           />
  
//           <BarSeries yAccessor={(d) => d.volume} />
//         </Chart>
//       </ChartCanvas>
//     );
//   };
  
//   export default fitWidth(UserFirstChartPage);