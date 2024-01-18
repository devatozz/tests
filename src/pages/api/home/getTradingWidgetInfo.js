


// https://api.coingecko.com/api/v3/coins/${req.query.id}/market_chart?vs_currency=usd&days=1
// bitcoin
// ethereum
// tether-gold
// tsilver

const CACHE_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
const CACHE_DATA = {
    BTC: {
        lastRetriveTime: undefined,
        data: undefined
    },
    ETH: {
        lastRetriveTime: undefined,
        data: undefined
    },
    XAU: {
        lastRetriveTime: undefined,
        data: undefined
    },
    XAG: {
        lastRetriveTime: undefined,
        data: undefined
    }
}
export default async function handler(req, res) {
    if (!req.query.symbol) res.status(500).json({
        message: "Missed symbol"
    });
    let symbol = String(req.query.symbol);
    try {
        let tokenInfo = {
            symbol
        };
        symbol = symbol.toUpperCase();

        const currentTime = Date.now();
        const cacheItem = CACHE_DATA[symbol];
        if (
            !cacheItem.data ||
            (currentTime - cacheItem.lastRetriveTime > CACHE_EXPIRY_TIME)
        ) {
            // if (symbol == "BTC" || symbol == "ETH")
            //     tokenInfo = await getPriceFromBinance(symbol);
            // else
            //     tokenInfo = await getPriceFromGoldPrice(symbol);
            await getPriceHistory(tokenInfo);

            cacheItem.lastRetriveTime = Date.now();
            cacheItem.data = tokenInfo;
            res.status(200).json(tokenInfo);
        } else {
            console.log("cache");
            // Return data from the cache
            res.status(200).json(cacheItem.data);
        }
    }
    catch (err) {
        console.log(err);
        if (!symbol) res.status(500).json({
            message: "Failed to get"
        });
    }
}


async function getPriceHistory(item) {
    let tokenId = undefined;
    switch (item.symbol) {
        case "BTC":
            tokenId = 1;
            break;
        case "ETH":
            tokenId = 279;
            break;
        case "XAU":
            tokenId = 10481;
            break;
        case "XAG":
            tokenId = 27829;
            break;
        default:
            break;
    }
    const response = await (await fetch(`https://www.coingecko.com/price_charts/${tokenId}/usd/24_hours.json`)).json();
    const dataList = [];
    for (let i = 0; i < response.stats.length; i += 12) {
        dataList.push(Number(response.stats[i][1]))
    }

    const quoteVolume = response.total_volumes[response.total_volumes.length - 1][1];
    item.volume = quoteVolume;
    item.priceHistory = dataList;

    const lastPrice24HAgo = Number(response.stats[0][1]);
    item.lastPrice = Number(response.stats[response.total_volumes.length - 1][1]);
    console.log("last price", item.lastPrice );
    console.log('24h ago: ', lastPrice24HAgo);
    item.priceChangePercent = Number(((item.lastPrice - lastPrice24HAgo)/lastPrice24HAgo)*100).toFixed(2)
}
async function getPriceFromBinance(symbol) {
    try {
        const result = await (await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`)).json()
        return {
            symbol,
            lastPrice: result.lastPrice,
            priceChangePercent: Number(result.priceChangePercent).toFixed(2)
        };
    }
    catch (err) {
        console.log(err);
        throw "getPriceFromBinance failed to get";
    }
}
async function getPriceFromGoldPrice(symbol) {
    try {
        const result = await (await fetch("https://data-asg.goldprice.org/dbXRates/USD")).json();
        const price = result.items[0];
        return symbol == "XAU"
            ?
            {
                symbol,
                lastPrice: price.xauPrice,
                priceChangePercent: Number(price.pcXau).toFixed(2)
            } :
            {
                symbol,
                lastPrice: price.xagPrice,
                priceChangePercent: Number(price.pcXau).toFixed(2)
            };
    }
    catch (err) {
        console.log(err);
        throw "getPriceFromGoldPrice failed to get";
    }
}