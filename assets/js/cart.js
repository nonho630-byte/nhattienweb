'use strict';

const CART_STORAGE_KEY = 'anon-cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadges();
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartItems() {
  return getCart()
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean);
}

function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.product.price * item.qty, 0);
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 99);
  } else {
    cart.push({ id: productId, qty: Math.min(qty, 99) });
  }

  saveCart(cart);
  return cart;
}

function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return cart;

  if (qty <= 0) {
    return removeFromCart(productId);
  }

  item.qty = Math.min(qty, 99);
  saveCart(cart);
  return cart;
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  return cart;
}

function clearCart() {
  saveCart([]);
}

function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? '' : '';
  });
}

function showCartToast(message) {
  let toast = document.querySelector('.add-cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'add-cart-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<ion-icon name="checkmark-circle"></ion-icon><span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function t(key) {
  const isVi = getLang() === 'vi-VN';
  const texts = {
    added: isVi ? 'Đã thêm vào giỏ hàng!' : 'Added to cart!',
    removed: isVi ? 'Đã xóa khỏi giỏ hàng.' : 'Removed from cart.',
    empty: isVi ? 'Giỏ hàng trống.' : 'Cart is empty.',
    orderSuccess: isVi ? 'Đặt hàng thành công!' : 'Order placed successfully!'
  };
  return texts[key] || key;
}

function initCartButtons() {
  document.querySelectorAll('[data-cart-link]').forEach((btn) => {
    if (btn.dataset.cartBound) return;
    btn.dataset.cartBound = '1';
    btn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  });

  updateCartBadges();
}

document.addEventListener('DOMContentLoaded', initCartButtons);
