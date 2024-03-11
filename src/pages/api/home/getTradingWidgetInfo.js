


// https://api.coingecko.com/api/v3/coins/${req.query.id}/market_chart?vs_currency=usd&days=1
// bitcoin
// ethereum
// tether-gold
// tsilver

const CACHE_EXPIRY_TIME = 120 * 60 * 1000; // 10 minutes in milliseconds
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

const DEFAULT_HISTORY = {
    XAU: {
        "symbol": "XAU",
        "volume": 13959046.750789044,
        "priceHistory": [
            2176.936489975734,
            2176.9659973634907,
            2177.43033096318,
            2176.9087916266094,
            2177.9265743635765,
            2175.6403391327913,
            2175.6861794571887,
            2178.160629914819,
            2178.7556935310677,
            2178.167491957654,
            2178.398555913244,
            2177.4190992362173,
            2177.08940351837,
            2176.2041506957535,
            2179.8387461220586,
            2184.919278862065,
            2181.3189638879685,
            2177.909197852024,
            2173.7860035228373,
            2174.178140712862,
            2174.9138995121602,
            2174.4102694604435,
            2178.412669280857,
            2176.41532548378
        ],
        "lastPrice": 2180.0025,
        "priceChangePercent": "-0.11"
    },
    XAG: {
        "symbol": "XAG",
        "volume": 295606.74847180565,
        "priceHistory": [
            24.735653380406287,
            24.746465898576822,
            24.461011946668222,
            24.603340181003976,
            24.593377581488383,
            24.45451715359332,
            24.559891710718432,
            24.68595093159236,
            24.427863511722215,
            24.704128825015747,
            24.370483293272663,
            24.60578827736956,
            24.730016117715113,
            24.450807068364536,
            24.50399706087979,
            24.65301735202174,
            24.60995594029135,
            24.63065838967927,
            24.690471565511054,
            24.546654677583145,
            24.695370289594432,
            24.60067274703462,
            24.452437511036553,
            24.762055397670828
        ],
        "lastPrice": 24.3349,
        "priceChangePercent": "-0.26"
    },
    ETH: {
        "symbol": "ETH",
        "volume": 25766435643.02017,
        "priceHistory": [
            3950.937954896759,
            3936.9159441961056,
            3958.1792347055375,
            3941.827176350568,
            3947.6959372063043,
            3925.6588379494788,
            3910.7679752745244,
            3900.6298204065756,
            3929.282254627222,
            3914.9281855756913,
            3917.886340189999,
            3904.555689079853,
            3902.7629056738047,
            3896.46911892081,
            3849.5508579243233,
            3860.903752407411,
            3856.195042181379,
            3805.1216130023,
            3835.6582545070287,
            3855.076910252138,
            3859.085341497708,
            3855.9206764354294,
            3843.6723543704657,
            3999.188691968199
        ],
        "lastPrice": 4007.1154698879327,
        "priceChangePercent": "1.42"
    },
    BTC: {
        "symbol": "BTC",
        "volume": 48312445623.16442,
        "priceHistory": [
            69616.22024129538,
            69418.68925155539,
            69976.36991582658,
            69723.6850967005,
            69925.59098211116,
            69657.95422363971,
            69379.51106179791,
            69402.28983109133,
            69902.4559928225,
            69588.33811758291,
            69524.92059598728,
            69467.5869140499,
            69425.43409588865,
            69311.64298562352,
            68849.17394449691,
            68753.93909927401,
            68519.37583261511,
            67785.1222269255,
            68468.63119497888,
            68448.93370991296,
            68604.51026327792,
            68589.41220487421,
            68598.53657991248,
            71230.19620928868
        ],
        "lastPrice": 71560.56793528948,
        "priceChangePercent": "2.79"
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
            await getPriceHistory(tokenInfo);
            if (["XAU", "XAG"].includes(symbol))
                await getPriceFromGoldPrice(tokenInfo);

            cacheItem.lastRetriveTime = Date.now();
            cacheItem.data = tokenInfo;
            res.status(200).json(tokenInfo);
        } else {
            // Return data from the cache
            res.status(200).json(cacheItem.data);
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to get"
        });
    }
}


async function getPriceHistory(item) {
    try {
        let tokenId = undefined;
        switch (item.symbol) {
            case "BTC":
                tokenId = 'bitcoin';
                break;
            case "ETH":
                tokenId = 'ethereum';
                break;
            case "XAU":
                tokenId = 'tether-gold';
                break;
            case "XAG":
                tokenId = 'kinesis-silver';
                break;
            default:
                break;
        }
        const response = await (await fetch(`https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=1`)).json();
        const dataList = [];
        for (let i = 0; i < response.prices.length; i += 12)
            dataList.push(Number(response.prices[i][1]))
        const quoteVolume = response.total_volumes[response.total_volumes.length - 1][1];
        item.volume = quoteVolume;
        item.priceHistory = dataList;

        const lastPrice24HAgo = Number(response.prices[0][1]);
        item.lastPrice = Number(response.prices[response.total_volumes.length - 1][1]);
        item.priceChangePercent = Number(((item.lastPrice - lastPrice24HAgo) / lastPrice24HAgo) * 100).toFixed(2);
    }
    catch (err) {
        console.log("heee", DEFAULT_HISTORY[item.symbol]);

        item.volume = DEFAULT_HISTORY[item.symbol].volume;
        item.lastPrice = DEFAULT_HISTORY[item.symbol].lastPrice;
        item.priceChangePercent = DEFAULT_HISTORY[item.symbol].priceChangePercent;
        item.priceHistory = DEFAULT_HISTORY[item.symbol].priceHistory;
    }
}

async function getPriceFromGoldPrice(item) {
    try {
        const result = await (await fetch("https://data-asg.goldprice.org/dbXRates/USD")).json();
        const price = result.items[0];

        if (item.symbol == "XAU") {
            item.lastPrice = price.xauPrice;
            item.priceChangePercent = Number(price.pcXau).toFixed(2);
        }
        else {
            item.lastPrice = price.xagPrice;
            item.priceChangePercent = Number(price.pcXag).toFixed(2);
        }
    }
    catch (err) {
        console.log(err);
        throw "getPriceFromGoldPrice failed to get";
    }
}