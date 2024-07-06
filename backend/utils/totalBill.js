function TotalCart(cartList) {
  const total = cartList.reduce((a, b) => {
    a += b.productId.price * b.quantity;
    return a;
  }, 0);
  return currency(+total);
}

function currency(price) {
  if (!price && price !== 0) return;
  return (+price).toLocaleString("vi-VI") + " VND";
}

module.exports = { TotalCart, currency };
