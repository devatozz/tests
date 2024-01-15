import { useEffect, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { CurrencyFormater, getPriceFromBinance, removeLastZezo } from "src/utils/PriceFormater";
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, LineController, PointElement } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  LineController,
  PointElement);
const DEFAULT_CHART_CONFIG = {
  type: 'line',
  data: {
    // datasets: [
    //   //   {
    //   //   borderColor: "red",
    //   //   borderWidth: 1,
    //   //   radius: 0,
    //   //   data: data,
    //   // },
    // ]
  },
  options: {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)'
        }
      },
    },
    scales: {
      x: {
        type: 'linear',
        display: false
      },
      y: {
        display: false
      }
    }
  }
};
const TradingViewWidget = () => {
  const [tokenList, setTokenList] = useState([
    {
      symbol: "BTC",
      name: "Bitcoin",
      image: "/blast/home/btc.png",
      lastPrice: "5.94200000",
      volume: "10000000",
      priceChangePercent: "2.11"
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      image: "/blast/home/eth.png",
      lastPrice: "2555.03",
      volume: "10000000",
      priceChangePercent: "-1.11"
    },
    {
      symbol: "XAU",
      name: "Gold",
      image: "/blast/home/xau.png",
      lastPrice: "2555.03",
      volume: "10000000",
      priceChangePercent: "-1.11"
    },
    {
      symbol: "XAG",
      name: "Sliver",
      image: "/blast/home/xag.png",
      lastPrice: "2555.03",
      volume: "10000000",
      priceChangePercent: "-1.11"
    },
  ]);

  function getPrice() {
    // get btc, eth price
    getPriceFromBinance(`symbols=["BTCUSDT","ETHUSDT"]`)
      .then(res => res.json())
      .then(result => {
        console.log("price: ", result);
        const btc = result[0];
        const eth = result[1];
        setTokenList(tokenList.map((item, index) => {
          switch (index) {
            case 0: // set btc price
              item.lastPrice = btc.lastPrice;
              item.priceChangePercent = Number(btc.priceChangePercent).toFixed(2);
              item.volume = btc.quoteVolume;

              fetch('/api/home/getChart?id=1')
                .then(res => res.json())
                .then(result => {
                  destroyChart(btcChart);
                  btcChart = new Chart(document.getElementById('BTC-chart'), {
                    ...DEFAULT_CHART_CONFIG, data: {
                      datasets: [{
                        borderColor: item.priceChangePercent < 0 ? "red" : "green",
                        borderWidth: 1,
                        radius: 0,
                        data: result.priceHistory,
                      },
                      ]
                    }
                  });
                })
              destroyChart(btcChart);
              break;
            case 1: // set eth price
              item.lastPrice = eth.lastPrice;
              item.priceChangePercent = Number(eth.priceChangePercent).toFixed(2);
              item.volume = eth.quoteVolume;
              // destroyChart(ethChart);
              // ethChart = new Chart(document.getElementById('ETH-chart'), {
              //   ...DEFAULT_CHART_CONFIG, data: {
              //     datasets: [{
              //       borderColor: item.priceChangePercent < 0 ? "red" : "green",
              //       borderWidth: 1,
              //       radius: 0,
              //       data: data,
              //     },
              //     ]
              //   }
              // });
              break;
            default: break;
          }
          return item;
        }))
      });

    // fetch btc, eth chart from coimarketplace

    // get xau, xag price
    fetch("https://data-asg.goldprice.org/dbXRates/USD")
      .then(res => res.json())
      .then(result => {
        console.log("price xau,xag: ", result.items[0]);
        const price = result.items[0];

        setTokenList(tokenList.map((item, index) => {
          switch (index) {
            case 2: // set gold price
              item.lastPrice = price.xauPrice;
              item.priceChangePercent = Number(price.pcXau).toFixed(2);
              
              fetch('/api/home/getChart?id=10481')
                .then(res => res.json())
                .then(result => {
                  destroyChart(xauChart);
                  xauChart = new Chart(document.getElementById('XAU-chart'), {
                    ...DEFAULT_CHART_CONFIG, data: {
                      datasets: [{
                        borderColor: item.priceChangePercent < 0 ? "red" : "green",
                        borderWidth: 1,
                        radius: 0,
                        data: result.priceHistory,
                      },
                      ]
                    }
                  });
                })
              
              break;
            case 3: // set sliver price
              item.lastPrice = price.xagPrice;
              item.priceChangePercent = Number(price.pcXag).toFixed(2);
              // item.volume = eth.quoteVolume;
              break;
            default: break;
          }
          return item;
        }))
      });
  }

  const data = [];
  let prev = 100;
  for (let i = 0; i < 24; i++) {
    prev += 5 - Math.random() * 10;
    data.push({ x: i, y: prev });
  }

  let btcChart = undefined;
  let ethChart = undefined;
  let xauChart = undefined;
  let xagChart = undefined;

  const [chartUrl, setChartUrl] = useState("");
  const destroyChart = (chart) => { if (chart) chart.destroy() }
  useEffect(() => {
    getPrice();
  }, [])


  return (
    // <div className="tradingview-widget-container" ref={containerRef}></div>
    <>
      <SimpleGrid
        columns={{ md: "4", base: "1" }}
        spacing={{ md: "30px", base: "10px" }}
        paddingTop={{ md: "60px", base: "40px" }}
        paddingBottom={{ md: "60px", base: "40px" }}
      >
        {
          tokenList.map((token, index) =>
            <Box key={index}
              borderRadius={"8px"}
              border={"1px solid #FCFDC7"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={6}
              height={"170px"}
              width={"100%"}
              paddingX={"20px"}
              paddingY={"28px"}
            >
              <Box width={"45%"} height={"100%"} alignContent={"space-between"} display={"grid"} gap={5}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} justifyItems={"center"}>
                  <Image width={"50px"} height={"50px"} borderRadius={"50%"} p={"5px"} src={token.image} alt={token.name} />
                  <Box fontWeight={"700"} textAlign={"left"}>
                    <Text color={"#FCFDC7"}
                      fontSize={"20px"}
                      fontFamily="Lakes"
                      fontStyle={"normal"}>{token.symbol}</Text>
                    <Text color={"#FCFDC7"}
                      fontSize={"12px"}
                      fontFamily="Lakes">{token.name}</Text>
                  </Box>
                </Box>

                <Box display={"flex"} alignItems={"self-start"}>
                  <Text color={"#FCFDC7"}
                    fontSize={"11px"}
                    fontFamily="Lakes">${removeLastZezo(token.lastPrice)}</Text>
                </Box>
              </Box>

              <Box width={"50%"} height={"100%"} alignContent={"space-between"} display={"grid"} gap={5}>
                <Box position={'relative'} display={'flex'} alignContent={'center'} maxWidth={"150px"} height={"60px"}>
                  <canvas id={token.symbol + "-chart"} maxWidth={'400px'} style={{ position: 'absolute', top: 0, left: '20%' }}></canvas>
                </Box>

                <Box >
                  <Box display={"flex"} gap={5} justifyContent={"space-between"}>
                    <Text color={"#FCFDC7"}
                      fontSize={"11px"}
                      fontFamily="Lakes"
                      opacity={"0.6"}
                    >PRICE</Text>

                    <Box display={"flex"} gap={1} >
                      {
                        Number(token.priceChangePercent) <= 0 ?
                          <svg style={{ marginTop: "5px" }} width="10" height="7" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.28674 7.69154C5.63555 8.18243 6.36445 8.18243 6.71326 7.69154L11.0803 1.5459C11.4919 0.966549 11.0777 0.164062 10.367 0.164062H1.633C0.922276 0.164062 0.508057 0.966548 0.919733 1.5459L5.28674 7.69154Z" fill="#F45353" />
                          </svg>
                          :
                          <svg style={{ marginTop: "5px" }} width="10" height="7" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.28674 1.32408C5.63555 0.833193 6.36445 0.833193 6.71326 1.32408L11.0803 7.46973C11.4919 8.04908 11.0777 8.85156 10.367 8.85156H1.633C0.922276 8.85156 0.508057 8.04908 0.919733 7.46973L5.28674 1.32408Z" fill="#58FF5D" />
                          </svg>
                      }

                      <Text color={Number(token.priceChangePercent) <= 0 ? "#F45353" : "#58FF5D"}
                        fontSize={"11px"}
                        fontFamily="Lakes">{removeLastZezo(token.priceChangePercent)}%</Text>
                    </Box>
                  </Box>

                  <Box display={"flex"} gap={1} justifyContent={"space-between"}>
                    <Text color={"#FCFDC7"}
                      fontSize={"11px"}
                      fontFamily="Lakes"
                      opacity={"0.6"}>VOL</Text>
                    <Text color={"#FCFDC7"}
                      fontSize={"11px"}
                      fontFamily="Lakes">{CurrencyFormater(token.volume)}</Text>

                  </Box>
                </Box>
              </Box>


            </Box>)
        }

      </SimpleGrid>
    </>
  );
};

export default TradingViewWidget;
