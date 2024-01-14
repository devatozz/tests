import { useEffect, useRef, useMemo, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { CurrencyFormater, getPriceFromBinance, removeLastZezo } from "src/utils/PriceFormater";

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
  ])

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
              break;
            case 1: // set eth price
              item.lastPrice = eth.lastPrice;
              item.priceChangePercent = Number(eth.priceChangePercent).toFixed(2);
              item.volume = eth.quoteVolume;
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
              // item.volume = btc.quoteVolume;
              break;
            case 3: // set sliver price
              item.lastPrice = price.xagPrice;
              item.priceChangePercent = Number(price.pcXau).toFixed(2);
              // item.volume = eth.quoteVolume;
              break;
            default: break;
          }
          return item;
        }))
      });
  }

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
                <Box>
                  <svg width={"100%"} height="50" viewBox="0 0 145 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.6" d="M12.6968 62.6619L1.42902 76.9633C1.15112 77.316 1 77.752 1 78.201V86.5078H144V7.64862C144 5.62621 141.341 4.8816 140.291 6.60979L129.917 23.6761C129.215 24.8312 127.593 24.9715 126.703 23.9543L124.108 20.9879C123.027 19.7532 121.002 20.2729 120.649 21.8752L116.811 39.3233C116.466 40.8904 114.509 41.4339 113.405 40.2691L108.59 35.1857C107.751 34.3008 106.323 34.3652 105.568 35.3219L101.432 40.5609C100.529 41.7048 98.7445 41.5296 98.0812 40.2318L89.8767 24.1795C89.1164 22.6922 86.9758 22.7369 86.2784 24.2548L72.1066 55.0994C71.5519 56.3065 69.9963 56.6475 68.9876 55.7829L65.5397 52.8276C64.6929 52.1017 63.4158 52.2088 62.7017 53.0657L60.9888 55.1213C60.0575 56.2388 58.2826 56.0199 57.6508 54.7095L47.3356 33.3151C46.6024 31.7943 44.4311 31.8101 43.7201 33.3415L27.1234 69.0882C26.5618 70.2978 24.996 70.6293 23.9924 69.7511L15.5848 62.3945C14.7231 61.6405 13.4054 61.7625 12.6968 62.6619Z" fill="url(#paint0_linear_667_59125)" />
                    <path d="M1 77.5078L12.6968 62.6619C13.4054 61.7625 14.7231 61.6405 15.5848 62.3945L23.9924 69.7511C24.996 70.6293 26.5618 70.2978 27.1234 69.0882L43.7201 33.3415C44.4311 31.8101 46.6024 31.7943 47.3356 33.3151L57.6508 54.7095C58.2826 56.0199 60.0575 56.2388 60.9888 55.1213L62.7017 53.0657C63.4158 52.2088 64.6929 52.1017 65.5398 52.8276L68.9876 55.7829C69.9963 56.6475 71.5519 56.3065 72.1066 55.0994L86.2784 24.2548C86.9758 22.7369 89.1164 22.6922 89.8767 24.1795L98.0812 40.2318C98.7445 41.5296 100.529 41.7048 101.432 40.5609L105.568 35.3219C106.323 34.3652 107.751 34.3008 108.59 35.1857L113.405 40.2691C114.509 41.4339 116.466 40.8904 116.811 39.3233L120.649 21.8752C121.002 20.2729 123.027 19.7532 124.108 20.9879L126.703 23.9543C127.593 24.9715 129.215 24.8311 129.917 23.6761L140.364 6.48947C141.394 4.79535 144 5.52529 144 7.50781V7.50781" stroke="#58FF5D" />
                    <defs>
                      <linearGradient id="paint0_linear_667_59125" x1="72.5" y1="0.507812" x2="72.5" y2="86.5078" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#77EA7B" />
                        <stop offset="1" stop-color="#77EA7B" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
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
