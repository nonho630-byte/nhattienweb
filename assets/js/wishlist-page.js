'use strict';

function renderWishlistPage() {
  const isVi = getLang() === 'vi-VN';
  const root = document.getElementById('page-root');
  const items = getWishlistItems();
  const imageBase = './assets/images/products/';

  if (!items.length) {
    root.innerHTML = `
      <div class="empty-state">
        <ion-icon name="heart-outline"></ion-icon>
        <h2>${isVi ? 'Danh sách yêu thích trống' : 'Wishlist is empty'}</h2>
        <p>${isVi ? 'Lưu sản phẩm bạn thích để xem lại sau.' : 'Save products you love for later.'}</p>
        <a href="products.html" class="btn-back" style="display:inline-block;margin-top:15px;background:var(--salmon-pink);color:#fff;padding:12px 24px;border-radius:5px;">${isVi ? 'Khám phá sản phẩm' : 'Browse products'}</a>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <div class="products-grid-page">
      ${items.map((p) => `
        <article class="product-card-page">
          <a href="${getProductDetailUrl(p.id)}" class="card-img">
            <img src="${imageBase}${p.images[0]}" alt="${getProductTitle(p)}">
          </a>
          <div class="card-body">
            <p class="card-cat">${getProductCategory(p)}</p>
            <a href="${getProductDetailUrl(p.id)}" class="card-title">${getProductTitle(p)}</a>
            <p class="card-price">${formatPrice(p.price)}</p>
            <div class="card-actions">
              <button type="button" class="btn-card-cart" data-add-cart="${p.id}">${isVi ? 'Thêm giỏ' : 'Add cart'}</button>
              <button type="button" class="btn-card-view" data-remove-wish="${p.id}">${isVi ? 'Bỏ thích' : 'Remove'}</button>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;

  root.querySelectorAll('[data-add-cart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.addCart, 1);
      showCartToast(t('added'));
    });
  });

  root.querySelectorAll('[data-remove-wish]').forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleWishlist(btn.dataset.removeWish);
      renderWishlistPage();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSubPageLayout();
  renderWishlistPage();
  window.addEventListener('wishlistUpdated', renderWishlistPage);
  document.querySelector('select[name="language"]')?.addEventListener('change', () => setTimeout(renderWishlistPage, 100));
});
