'use strict';

function getQueryId() {
  return new URLSearchParams(window.location.search).get('id');
}

function showToast(message) {
  showCartToast(message);
}

function renderProductDetail(product) {
  const isVi = getLang() === 'vi-VN';
  const title = getProductTitle(product);
  const category = getProductCategory(product);
  const description = getProductDescription(product);
  const imageBase = './assets/images/products/';

  document.title = `${title} - Anon`;

  const badgeHtml = product.badge
    ? `<span class="product-gallery-badge ${product.badge === 'sale' || product.badge === 'new' ? product.badge : ''}">${product.badge}</span>`
    : '';

  const thumbsHtml = product.images.map((img, i) => `
    <button type="button" class="product-gallery-thumb ${i === 0 ? 'active' : ''}" data-image="${img}">
      <img src="${imageBase}${img}" alt="${title}">
    </button>
  `).join('');

  const related = getRelatedProducts(product);
  const relatedHtml = related.length
    ? related.map((p) => `
        <a href="${getProductDetailUrl(p.id)}" class="related-card">
          <div class="related-card-img">
            <img src="${imageBase}${p.images[0]}" alt="${getProductTitle(p)}">
          </div>
          <div class="related-card-body">
            <h4 class="related-card-title">${getProductTitle(p)}</h4>
            <p class="related-card-price">${formatPrice(p.price)}</p>
          </div>
        </a>
      `).join('')
    : '';

  const root = document.getElementById('product-detail-root');
  root.innerHTML = `
    <nav class="breadcrumb container">
      <a href="index.html">${isVi ? 'Trang chủ' : 'Home'}</a>
      <ion-icon name="chevron-forward-outline"></ion-icon>
      <a href="index.html#product-container">${isVi ? 'Sản phẩm' : 'Products'}</a>
      <ion-icon name="chevron-forward-outline"></ion-icon>
      <span>${title}</span>
    </nav>

    <div class="container product-detail">
      <div class="product-gallery">
        <div class="product-gallery-main">
          <img id="main-product-image" src="${imageBase}${product.images[0]}" alt="${title}">
          ${badgeHtml}
        </div>
        <div class="product-gallery-thumbs">${thumbsHtml}</div>
      </div>

      <div class="product-info">
        <span class="product-info-category">${category}</span>
        <h1 class="product-info-title">${title}</h1>
        <div class="product-info-rating">
          ${renderStars(product.rating)}
          <span>(${product.rating}/5)</span>
        </div>
        <div class="product-info-price">
          <p class="price">${formatPrice(product.price)}</p>
          ${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ''}
        </div>
        <p class="product-info-desc">${description}</p>
        <div class="product-info-meta">
          <p>${isVi ? 'Tình trạng' : 'Availability'}: <b>${isVi ? 'Còn hàng' : 'In Stock'}</b></p>
          <p>${isVi ? 'Danh mục' : 'Category'}: <b>${category}</b></p>
          <p>${isVi ? 'Mã SP' : 'SKU'}: <b>ANON-${product.id.toUpperCase().slice(0, 8)}</b></p>
        </div>
        <div class="product-quantity">
          <label for="qty">${isVi ? 'Số lượng' : 'Quantity'}:</label>
          <div class="quantity-box">
            <button type="button" class="quantity-btn" id="qty-minus">−</button>
            <input type="number" id="qty" class="quantity-input" value="1" min="1" max="99">
            <button type="button" class="quantity-btn" id="qty-plus">+</button>
          </div>
        </div>
        <div class="product-actions">
          <button type="button" class="btn-add-cart" id="add-to-cart">
            ${isVi ? 'Thêm vào giỏ hàng' : 'Add to cart'}
          </button>
          <button type="button" class="btn-buy-now" id="buy-now">
            ${isVi ? 'Mua ngay' : 'Buy now'}
          </button>
          <button type="button" class="btn-wishlist" id="toggle-wishlist" aria-label="Wishlist">
            <ion-icon name="heart-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>

    ${related.length ? `
      <section class="related-products container">
        <h2 class="title">${isVi ? 'Sản phẩm liên quan' : 'Related Products'}</h2>
        <div class="related-grid">${relatedHtml}</div>
      </section>
    ` : ''}
  `;

  const mainImg = document.getElementById('main-product-image');
  document.querySelectorAll('.product-gallery-thumb').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.product-gallery-thumb').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      mainImg.src = `${imageBase}${btn.dataset.image}`;
    });
  });

  const qtyInput = document.getElementById('qty');
  document.getElementById('qty-minus').addEventListener('click', () => {
    if (+qtyInput.value > 1) qtyInput.value = +qtyInput.value - 1;
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    if (+qtyInput.value < 99) qtyInput.value = +qtyInput.value + 1;
  });

  document.getElementById('add-to-cart').addEventListener('click', () => {
    addToCart(product.id, +qtyInput.value);
    const msg = isVi
      ? `Đã thêm ${qtyInput.value} "${title}" vào giỏ hàng!`
      : `Added ${qtyInput.value} "${title}" to cart!`;
    showToast(msg);
  });

  document.getElementById('buy-now').addEventListener('click', () => {
    addToCart(product.id, +qtyInput.value);
    window.location.href = 'checkout.html';
  });

  const wishBtn = document.getElementById('toggle-wishlist');
  if (wishBtn) {
    const updateWishIcon = () => {
      const icon = wishBtn.querySelector('ion-icon');
      if (isInWishlist(product.id)) {
        icon.setAttribute('name', 'heart');
        wishBtn.style.color = 'var(--salmon-pink)';
      } else {
        icon.setAttribute('name', 'heart-outline');
        wishBtn.style.color = '';
      }
    };
    updateWishIcon();
    wishBtn.addEventListener('click', () => {
      toggleWishlist(product.id);
      updateWishIcon();
      showCartToast(getLang() === 'vi-VN' ? 'Đã cập nhật yêu thích!' : 'Wishlist updated!');
    });
  }
}

function renderNotFound() {
  const isVi = getLang() === 'vi-VN';
  document.getElementById('product-detail-root').innerHTML = `
    <div class="product-not-found container">
      <h2>${isVi ? 'Không tìm thấy sản phẩm' : 'Product not found'}</h2>
      <p>${isVi ? 'Sản phẩm bạn tìm không tồn tại hoặc đã bị xóa.' : 'The product you are looking for does not exist.'}</p>
      <a href="index.html" class="btn-back">${isVi ? '← Quay lại cửa hàng' : '← Back to shop'}</a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const id = getQueryId();
  const product = id ? getProductById(id) : null;

  if (product) {
    renderProductDetail(product);
  } else {
    renderNotFound();
  }

  const langSelect = document.querySelector('select[name="language"]');
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      const current = getProductById(getQueryId());
      if (current) renderProductDetail(current);
    });
  }
});
