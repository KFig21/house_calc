export const formatToWholeDollarAmount = (amt: number | undefined) => {
  if (amt === undefined) {
    return '$0';
  }
  return '$' + amt.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumberWithCommas = (number: number): string => {
  return Math.round(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatToPercentage = (number: number) => {
  let percentage = number * 100;
  percentage = Math.round(percentage);
  return `${percentage}%`;
};

export const parseCommaSeparatedNumber = (value: string): number => {
  const numericValue = Math.round(Number(value.replace(/,/g, '')));
  return isNaN(numericValue) ? 0 : numericValue; // Handle NaN case by returning 0 or any default value
};

export const closeAnimation = (modalHook: any) => {
  setTimeout(() => {
    modalHook(false);
  }, 1000);
};
