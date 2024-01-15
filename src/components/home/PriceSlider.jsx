"use client"
import { useEffect } from "react";
import {
  SimpleGrid,
} from "@chakra-ui/react";
import PriceSliderItem from "./PriceSliderItem";

const TradingViewWidget = () => {
  const tokenList =　[
    {
      symbol: "BTC",
      name: "Bitcoin",
      image: "/blast/home/btc.png",
      lastPrice: "5.94200000",
      volume: "10000000",
      priceChangePercent: "2.11",
      priceHistory: []
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      image: "/blast/home/eth.png",
      lastPrice: "2555.03",
      volume: "10000000",
      priceChangePercent: "-1.11",
      priceHistory: []
    },
    {
      symbol: "XAU",
      name: "Gold",
      image: "/blast/home/xau.png",
      lastPrice: "2555.03",
      volume: "10000000",
      priceChangePercent: "-1.11",
      priceHistory: []
    },
    {
      symbol: "XAG",
      name: "Sliver",
      image: "/blast/home/xag.png",
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
        columns={{ xl: "4", base: "1", md: "2" }}
        spacing={{ md: "30px", base: "20px" }}
        paddingTop={{ md: "60px", base: "40px" }}
        paddingBottom={{ md: "60px", base: "40px" }}
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
