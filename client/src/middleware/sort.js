export const sort = ({ priceFrom = null, priceTo = null, flag = null, products }) => {
  if (!products || !products.length) return [];
  let arr = [...products];

  const getPrice = (prod) => prod.discont_price ?? prod.price;

  if (priceFrom && priceTo) {
    arr = products.filter(
      (product) => getPrice(product) >= priceFrom && getPrice(product) <= priceTo,
    );
  } else if (priceFrom && !priceTo) {
    arr = products.filter((product) => getPrice(product) >= priceFrom);
  } else if (priceTo && !priceFrom) {
    arr = products.filter((product) => getPrice(product) <= priceTo);
  }

  switch (flag) {
    case 'price: high-low':
      arr = arr.sort((a, b) => getPrice(b) - getPrice(a));
      break;
    case 'price: low-high':
      arr = arr.sort((a, b) => getPrice(a) - getPrice(b));
      break;
  }

  return arr;
};
