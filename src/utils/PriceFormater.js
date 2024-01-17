export const CurrencyFormater = (value) => {
    if (value >= 1e9)
        return (value / 1e9).toFixed(1) + 'B';
    else if (value >= 1e6)
        return (value / 1e6).toFixed(1) + 'M';
    else if (value >= 1e3) {
        return (value / 1e3).toFixed(1) + 'K';
    } else {
        return value.toFixed(1);
    }
}

export function removeLastZezo(value) {
    return Number(String(value).replace(/\.?0+$/, ''));
}