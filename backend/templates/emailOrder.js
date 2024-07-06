const { currency } = require("../utils/totalBill");

const renderListItem = (listItem) => {
  return listItem
    .map(
      (item) =>
        `
  <tr>
  <td  style="border: 1px solid black;">${item.productId.name}</td>
  <td  style="border: 1px solid black;"><img src="${
    item.productId.images[0]
  }" width="100px" height="auto"/></td>
  <td  style="border: 1px solid black;">${currency(item.productId.price)}</td>
  <td  style="border: 1px solid black;">${item.quantity}</td>
  <td  style="border: 1px solid black;">${currency(
    item.productId.price * item.quantity
  )}</td>
  </tr>
  `
    )
    .join("");
};

const emailOrder = (name, phonenumber, address, listItem, subTotal) => {
  return `
    <html>
      <head>
        <title>Email Template</title>
      </head>
      <style>
 th, td {
  border: 1px solid black;
}
</style>
      <body>
        <h1>Xin Chào, ${name}!</h1>
        <h5>Số điện thoại : ${phonenumber}</h5>
        <h5>Địa chỉ : ${address}</h5>
        
        <table >
          <caption><h3>Danh sách sản phẩm đã đặt</h3></caption>
          <tr>
            <th  style="border: 1px solid black;"
            >Tên Sản Phẩm</th>
            <th  style="border: 1px solid black;">Hình Ảnh</th>
            <th  style="border: 1px solid black;">Giá</th>
            <th  style="border: 1px solid black;">Số lượng</th>
            <th  style="border: 1px solid black;">Thành tiền</th>
          </tr>
          ${renderListItem(listItem)}
        </table>
        
        <p>Tổng Thanh Toán:</p>
        <p>${currency(subTotal)}</p>
        <h3>Cảm ơn bạn!</h3>

      </body>
    </html>
  `;
};

module.exports = emailOrder;
