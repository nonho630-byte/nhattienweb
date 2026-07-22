'use strict';

function renderCartPage() {
  const isVi = getLang() === 'vi-VN';
  const root = document.getElementById('cart-root');
  const items = getCartItems();

  if (!items.length) {
    root.innerHTML = `
      <div class="cart-empty">
        <ion-icon name="bag-handle-outline"></ion-icon>
        <h2>${isVi ? 'Giỏ hàng trống' : 'Your cart is empty'}</h2>
        <p>${isVi ? 'Hãy thêm sản phẩm vào giỏ để tiếp tục mua sắm.' : 'Add some products to get started.'}</p>
        <a href="index.html" class="btn-back">${isVi ? 'Tiếp tục mua sắm' : 'Continue shopping'}</a>
      </div>
    `;
    return;
  }

  const imageBase = './assets/images/products/';
  const itemsHtml = items.map(({ id, qty, product }) => `
    <div class="cart-item" data-id="${id}">
      <a href="${getProductDetailUrl(id)}" class="cart-item-img">
        <img src="${imageBase}${product.images[0]}" alt="${getProductTitle(product)}">
      </a>
      <div class="cart-item-info">
        <a href="${getProductDetailUrl(id)}" class="cart-item-title">${getProductTitle(product)}</a>
        <p class="cart-item-price">${formatPrice(product.price)}</p>
        <div class="cart-item-actions">
          <div class="quantity-box">
            <button type="button" class="quantity-btn cart-qty-minus" data-id="${id}">−</button>
            <input type="number" class="quantity-input cart-qty-input" data-id="${id}" value="${qty}" min="1" max="99">
            <button type="button" class="quantity-btn cart-qty-plus" data-id="${id}">+</button>
          </div>
          <button type="button" class="btn-remove" data-id="${id}">
            <ion-icon name="trash-outline"></ion-icon>
            ${isVi ? 'Xóa' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 55 ? 0 : 5;
  const total = subtotal + shipping;

  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${itemsHtml}</div>
      <aside class="cart-summary">
        <h3>${isVi ? 'Tóm tắt đơn hàng' : 'Order Summary'}</h3>
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
        <a href="checkout.html" class="btn-checkout">${isVi ? 'Đặt hàng' : 'Checkout'}</a>
        <a href="index.html" class="btn-continue">${isVi ? '← Tiếp tục mua sắm' : '← Continue shopping'}</a>
      </aside>
    </div>
  `;

  bindCartEvents(root);
}

function bindCartEvents(root) {
  root.querySelectorAll('.cart-qty-minus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const input = root.querySelector(`.cart-qty-input[data-id="${id}"]`);
      updateCartQty(id, +input.value - 1);
      renderCartPage();
    });
  });

  root.querySelectorAll('.cart-qty-plus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const input = root.querySelector(`.cart-qty-input[data-id="${id}"]`);
      updateCartQty(id, +input.value + 1);
      renderCartPage();
    });
  });

  root.querySelectorAll('.cart-qty-input').forEach((input) => {
    input.addEventListener('change', () => {
      updateCartQty(input.dataset.id, +input.value || 1);
      renderCartPage();
    });
  });

  root.querySelectorAll('.btn-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      showCartToast(t('removed'));
      renderCartPage();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.title = getLang() === 'vi-VN' ? 'Giỏ hàng - Anon' : 'Cart - Anon';
  renderCartPage();

  window.addEventListener('cartUpdated', renderCartPage);

  document.querySelector('select[name="language"]')?.addEventListener('change', () => {
    document.title = getLang() === 'vi-VN' ? 'Giỏ hàng - Anon' : 'Cart - Anon';
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) pageTitle.textContent = getLang() === 'vi-VN' ? 'Giỏ hàng' : 'Shopping Cart';
    renderCartPage();
  });
});
