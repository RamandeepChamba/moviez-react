export function formatNumber(num, decimalPlaces) {
  const fixedNum = num.toFixed(decimalPlaces);
  const parsedNum = parseFloat(fixedNum);

  // Check if the parsed number is an integer
  if (parsedNum % 1 === 0) {
    return parsedNum;
  } else {
    return fixedNum;
  }
}

export function getUrlSearchParams(urlString, paramsToGet) {
  const url = new URL(urlString);
  const searchParams = new URLSearchParams(url.search);

  const params = {};

  paramsToGet.forEach((param) => (params[param] = searchParams.get(param)));

  return params;
}
