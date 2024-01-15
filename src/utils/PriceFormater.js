export const CurrencyFormater = (value, locale = "en-US", currency = "USD") => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        notation: "compact",
        currency,
    }).format(value)
}

export function removeLastZezo(value) {
    return Number(String(value).replace(/\.?0+$/, ''));
}