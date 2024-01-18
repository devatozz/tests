export const CurrencyFormater = (value) => {
    value = Number(value);
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


export const CompactCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

export function removeLastZezo(value) {
    return Number(String(value).replace(/\.?0+$/, ''));
}