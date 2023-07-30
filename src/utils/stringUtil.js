export function replaceUIntSuffix(number) {
  return number ? number.replace(/u\d+/g, "") : number;
}

export function currencyFormat(number) {
  return new Intl.NumberFormat().format(number);
}
