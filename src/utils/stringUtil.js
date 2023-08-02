export function replaceUIntSuffix(number) {
  return number ? number.replace(/u\d+/g, "") : number;
}

export function currencyFormat(number) {
  return new Intl.NumberFormat().format(number);
}

export function formatInputAmount(amount) {
  // Handle the special case where the input is '0' or '0.' and leave it unchanged
  if (amount === "0" || amount === "0.") {
    return amount;
  }

  // For other inputs, eliminate leading zeros
  let tokenAmount = amount.replace(/^0+/, "");

  // If the result after removing leading zeros is '.', add a '0' before the dot
  if (tokenAmount.startsWith(".")) {
    tokenAmount = "0" + tokenAmount;
  }

  // Verify that the format is a valid number with an optional trailing dot, and extract the match
  const validNumberFormatMatch = tokenAmount.match(/^-?\d+(\.\d*)?/);
  tokenAmount = validNumberFormatMatch ? validNumberFormatMatch[0] : "";

  return tokenAmount;
}
