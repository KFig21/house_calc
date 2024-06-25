export const formatToWholeDollarAmount = (amt: number | undefined) => {
  if (amt === undefined) {
    return '$0';
  }
  return '$' + amt.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const closeAnimation = (modalHook: any) => {
  setTimeout(() => {
    modalHook(false);
  }, 1000);
};
