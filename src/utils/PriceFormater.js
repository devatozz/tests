export const CurrencyFormater = (value, locale = "en-US", currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        notation: "compact",
        currency: "USD",
    }).format(value)
}

export function getPriceFromBinance(queryParams) {
    return fetch("https://api.binance.com/api/v3/ticker/24hr?" + queryParams);
}

export function removeLastZezo(value) {
    return Number(String(value).replace(/\.?0+$/, ''));
}