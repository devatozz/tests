export const CurrencyFormater = (value) => {
    if (value >= 1e9)
        return (value / 1e9).toFixed(1) + 'B';
    else if (value >= 1e6)
        return (value / 1e6).toFixed(1) + 'M';
    else
        return Number(value).toFixed(1) + "K";
}

export function removeLastZezo(value) {
    return Number(String(value).replace(/\.?0+$/, ''));
}