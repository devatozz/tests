"use client"
import { useEffect } from "react";
import {
  SimpleGrid,
} from "@chakra-ui/react";
import PriceSliderItem from "./PriceSliderItem";

const TradingViewWidget = () => {
  const tokenList = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      image: "https://raw.githubusercontent.com/Blasttrade/image-repo/master/blast/home/btc.svg",
      lastPrice: "5.94200000",
      volume: "10000000",
      priceChangePercent: "2.11",
      priceHistory: []
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      image: "https://raw.githubusercontent.com/Blasttrade/image-repo/master/blast/home/eth.svg",
      lastPrice: "2555.03",
      volume: "10000000",
      priceChangePercent: "-1.11",
      priceHistory: []
    },
    {
      symbol: "XAU",
      name: "Gold",
      image: "https://raw.githubusercontent.com/Blasttrade/image-repo/master/blast/home/xau.svg",
      lastPrice: "2555.03",
      volume: "10000000",
      priceChangePercent: "-1.11",
      priceHistory: []
    },
    {
      symbol: "XAG",
      name: "Sliver",
      image: "https://raw.githubusercontent.com/Blasttrade/image-repo/master/blast/home/xag.svg",
      lastPrice: "2555.03",
      volume: "1",
      priceChangePercent: "-1.11",
      priceHistory: []
    },
  ];


  useEffect(() => {

  }, [])


  return (
    <>
      <SimpleGrid
        width={{base: "90%", lg: "80%",  xl: "100%" }}
        columns={{ xl: "4", base: "1", md: "2" }}
        spacing={{ xl: "20px", "2xl": "30px", base: "30px" }}
        paddingTop={{ base: "45px" }}
        paddingBottom={{ base: "40px" }}
      >
        <PriceSliderItem tokenData={tokenList[0]} />
        <PriceSliderItem tokenData={tokenList[1]} />
        <PriceSliderItem tokenData={tokenList[2]} />
        <PriceSliderItem tokenData={tokenList[3]} />

      </SimpleGrid>
    </>
  );
};

export default TradingViewWidget;
