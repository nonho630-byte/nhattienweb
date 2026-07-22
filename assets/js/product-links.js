'use strict';

function wireProductLinks() {
  document.querySelectorAll('.showcase').forEach((showcase) => {
    const product = findProductByShowcase(showcase);
    if (!product) return;

    const url = getProductDetailUrl(product.id);
    showcase.classList.add('product-linkable');

    showcase.querySelectorAll('a[href="#"]').forEach((link) => {
      link.href = url;
    });

    const banner = showcase.querySelector('.showcase-banner');
    if (banner && !banner.closest('a')) {
      banner.style.cursor = 'pointer';
      banner.addEventListener('click', (e) => {
        if (e.target.closest('.btn-action, .showcase-actions')) return;
        window.location.href = url;
      });
    }

    const eyeBtn = showcase.querySelector('.btn-action ion-icon[name="eye-outline"]');
    if (eyeBtn) {
      eyeBtn.closest('.btn-action').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = url;
      });
    }

    const cartBtn = showcase.querySelector('.btn-action ion-icon[name="bag-add-outline"]');
    if (cartBtn) {
      cartBtn.closest('.btn-action').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product.id, 1);
        showCartToast(t('added'));
      });
    }

    const heartBtn = showcase.querySelector('.btn-action ion-icon[name="heart-outline"]');
    if (heartBtn) {
      heartBtn.closest('.btn-action').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggleWishlist(product.id);
        showCartToast(added ? (getLang() === 'vi-VN' ? 'Đã thêm vào yêu thích!' : 'Added to wishlist!') : (getLang() === 'vi-VN' ? 'Đã bỏ khỏi yêu thích' : 'Removed from wishlist'));
      });
    }

    const addCartBtn = showcase.querySelector('.add-cart-btn');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product.id, 1);
        showCartToast(t('added'));
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', wireProductLinks);
