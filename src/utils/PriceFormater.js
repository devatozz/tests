export const CurrencyFormater = (value, locale = "en-US", currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        notation: "compact",
        currency: "USD",
    }).format(value)
}

export function removeLastZezo(value) {
    return Number(String(value).replace(/\.?0+$/, ''));
}