


// https://api.coingecko.com/api/v3/coins/${req.query.id}/market_chart?vs_currency=usd&days=1
// bitcoin
// ethereum
// tether-gold
export default async function handler(
    req,
    res
) {
    try {
        // const response = await (await fetch(`https://api.coingecko.com/api/v3/coins/${req.query.id}/market_chart?vs_currency=usd&days=1`)).json();
        const response = await (await fetch(`https://www.coingecko.com/price_charts/${req.query.id}/usd/7_days.json`)).json();
        const dataList = [];
        for (let i = 0; i < response.stats.length; i += 12) {
            dataList.push(Number(response.stats[i][1]))
        }
        const quoteVolume = response.total_volumes[response.total_volumes.length - 1][1];
        console.log('data list: ', quoteVolume);
        res.status(200).json({
            quoteVolume: quoteVolume,
            priceHistory: dataList
        })
    }
    catch (err) {
        throw err
    }

}