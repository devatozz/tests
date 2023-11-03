import { useEffect, useRef, useMemo } from "react";
const TradingViewWidget = () => {
  const containerRef = useRef(null);

  const script = useMemo(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
          },
          {
            "description": "Dogecoin",
            "proName": "COINBASE:DOGEUSD"
          },
          {
            "description": "Chainlink",
            "proName": "BINANCE:LINKUSD"
          }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": true,
        "displayMode": "regular",
        "locale": "en"
      }
      `;
    return script;
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, [containerRef, script]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}></div>
  );
};

export default TradingViewWidget;
