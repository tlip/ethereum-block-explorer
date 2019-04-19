const thousandsFormat = (n: number = 0) => (
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
);

export default thousandsFormat;
