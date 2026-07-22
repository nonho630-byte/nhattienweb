'use strict';

function generateOrderId() {
  return 'ANON-' + Date.now().toString(36).toUpperCase();
}

function renderCheckoutPage() {
  const isVi = getLang() === 'vi-VN';
  const root = document.getElementById('checkout-root');
  const items = getCartItems();

  if (!items.length) {
    root.innerHTML = `
      <div class="cart-empty">
        <ion-icon name="bag-handle-outline"></ion-icon>
        <h2>${isVi ? 'Giỏ hàng trống' : 'Your cart is empty'}</h2>
        <p>${isVi ? 'Thêm sản phẩm trước khi đặt hàng.' : 'Add products before checkout.'}</p>
        <a href="index.html" class="btn-back">${isVi ? 'Tiếp tục mua sắm' : 'Continue shopping'}</a>
      </div>
    `;
    return;
  }

  const imageBase = './assets/images/products/';
  const itemsHtml = items.map(({ qty, product }) => `
    <div class="checkout-item">
      <img src="${imageBase}${product.images[0]}" alt="${getProductTitle(product)}">
      <div class="checkout-item-info">
        <p class="checkout-item-name">${getProductTitle(product)}</p>
        <p class="checkout-item-meta">${qty} x ${formatPrice(product.price)} = ${formatPrice(qty * product.price)}</p>
      </div>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 55 ? 0 : 5;
  const total = subtotal + shipping;

  root.innerHTML = `
    <div class="checkout-layout">
      <form class="checkout-form" id="checkout-form" novalidate>
        <h3>${isVi ? 'Thông tin giao hàng' : 'Shipping Information'}</h3>
        <div class="form-row">
          <div class="form-group">
            <label for="name">${isVi ? 'Họ và tên' : 'Full Name'} *</label>
            <input type="text" id="name" name="name" required placeholder="${isVi ? 'Nguyễn Văn A' : 'John Doe'}">
            <span class="form-error">${isVi ? 'Vui lòng nhập họ tên' : 'Please enter your name'}</span>
          </div>
          <div class="form-group">
            <label for="phone">${isVi ? 'Số điện thoại' : 'Phone'} *</label>
            <input type="tel" id="phone" name="phone" required placeholder="0901234567">
            <span class="form-error">${isVi ? 'Vui lòng nhập số điện thoại' : 'Please enter phone number'}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="email">${isVi ? 'Email' : 'Email'} *</label>
          <input type="email" id="email" name="email" required placeholder="email@example.com">
          <span class="form-error">${isVi ? 'Vui lòng nhập email hợp lệ' : 'Please enter a valid email'}</span>
        </div>
        <div class="form-group">
          <label for="address">${isVi ? 'Địa chỉ giao hàng' : 'Delivery Address'} *</label>
          <textarea id="address" name="address" required placeholder="${isVi ? 'Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố' : 'Street, ward, district, city'}"></textarea>
          <span class="form-error">${isVi ? 'Vui lòng nhập địa chỉ' : 'Please enter address'}</span>
        </div>
        <div class="form-group">
          <label for="note">${isVi ? 'Ghi chú (tuỳ chọn)' : 'Note (optional)'}</label>
          <textarea id="note" name="note" placeholder="${isVi ? 'Ghi chú thêm cho đơn hàng...' : 'Additional notes...'}"></textarea>
        </div>
        <div class="form-group">
          <label for="payment">${isVi ? 'Phương thức thanh toán' : 'Payment Method'}</label>
          <select id="payment" name="payment">
            <option value="cod">${isVi ? 'Thanh toán khi nhận hàng (COD)' : 'Cash on Delivery (COD)'}</option>
            <option value="bank">${isVi ? 'Chuyển khoản ngân hàng' : 'Bank Transfer'}</option>
          </select>
        </div>
      </form>

      <aside class="cart-summary">
        <h3>${isVi ? 'Đơn hàng của bạn' : 'Your Order'}</h3>
        <div class="checkout-items">${itemsHtml}</div>
        <div class="summary-row">
          <span>${isVi ? 'Tạm tính' : 'Subtotal'}</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>${isVi ? 'Phí vận chuyển' : 'Shipping'}</span>
          <span>${shipping === 0 ? (isVi ? 'Miễn phí' : 'Free') : formatPrice(shipping)}</span>
        </div>
        <div class="summary-row total">
          <span>${isVi ? 'Tổng cộng' : 'Total'}</span>
          <span>${formatPrice(total)}</span>
        </div>
        <button type="submit" form="checkout-form" class="btn-place-order" id="place-order">
          ${isVi ? 'Xác nhận đặt hàng' : 'Place Order'}
        </button>
        <a href="cart.html" class="btn-continue">${isVi ? '← Quay lại giỏ hàng' : '← Back to cart'}</a>
      </aside>
    </div>
  `;

  document.getElementById('checkout-form').addEventListener('submit', handlePlaceOrder);
}

function validateForm(form) {
  let valid = true;
  const required = form.querySelectorAll('[required]');

  required.forEach((field) => {
    const group = field.closest('.form-group');
    const isValid = field.checkValidity();
    group.classList.toggle('invalid', !isValid);
    if (!isValid) valid = false;
  });

  return valid;
}

function handlePlaceOrder(e) {
  e.preventDefault();
  const form = e.target;
  if (!validateForm(form)) return;

  const isVi = getLang() === 'vi-VN';
  const orderId = generateOrderId();
  const formData = new FormData(form);

  const order = {
    id: orderId,
    date: new Date().toISOString(),
    customer: {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      note: formData.get('note'),
      payment: formData.get('payment')
    },
    items: getCartItems().map(({ id, qty, product }) => ({
      id,
      qty,
      title: product.title,
      price: product.price
    })),
    total: getCartTotal() + (getCartTotal() >= 55 ? 0 : 5)
  };

  const orders = JSON.parse(localStorage.getItem('anon-orders') || '[]');
  orders.push(order);
  localStorage.setItem('anon-orders', JSON.stringify(orders));

  clearCart();
  renderOrderSuccess(orderId, formData.get('name'));
}

function renderOrderSuccess(orderId, name) {
  const isVi = getLang() === 'vi-VN';
  const root = document.getElementById('checkout-root');

  root.innerHTML = `
    <div class="order-success">
      <ion-icon name="checkmark-circle"></ion-icon>
      <h2>${isVi ? 'Đặt hàng thành công!' : 'Order Placed Successfully!'}</h2>
      <p>${isVi ? `Cảm ơn bạn ${name}! Đơn hàng đang được xử lý.` : `Thank you ${name}! Your order is being processed.`}</p>
      <p class="order-id">${isVi ? 'Mã đơn hàng' : 'Order ID'}: ${orderId}</p>
      <div class="order-success-actions">
        <a href="index.html" class="btn-primary">${isVi ? 'Tiếp tục mua sắm' : 'Continue shopping'}</a>
        <a href="cart.html" class="btn-secondary">${isVi ? 'Xem giỏ hàng' : 'View cart'}</a>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  document.title = getLang() === 'vi-VN' ? 'Đặt hàng - Anon' : 'Checkout - Anon';
  renderCheckoutPage();

  document.querySelector('select[name="language"]')?.addEventListener('change', () => {
    document.title = getLang() === 'vi-VN' ? 'Đặt hàng - Anon' : 'Checkout - Anon';
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) pageTitle.textContent = getLang() === 'vi-VN' ? 'Đặt hàng' : 'Checkout';
    renderCheckoutPage();
  });
});
