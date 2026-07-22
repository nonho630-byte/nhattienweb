'use strict';

function getProductsPageFilter() {
  const params = new URLSearchParams(window.location.search);
  return {
    cat: params.get('cat') || '',
    filter: params.get('filter') || ''
  };
}

function filterProductsList() {
  const { cat, filter } = getProductsPageFilter();
  let list = [...PRODUCTS];

  if (cat) {
    const key = cat.toLowerCase();
    list = list.filter((p) =>
      p.category.toLowerCase().includes(key) ||
      p.categoryVi.toLowerCase().includes(key) ||
      (p.title && p.title.toLowerCase().includes(key))
    );
  }

  if (filter === 'offers') {
    list = list.filter((p) => p.oldPrice || p.badge);
  }

  if (filter === 'new') {
    list = list.filter((p) => p.badge === 'new');
  }

  return list;
}

function renderProductsPage() {
  const isVi = getLang() === 'vi-VN';
  const root = document.getElementById('page-root');
  const { cat, filter } = getProductsPageFilter();
  const products = filterProductsList();
  const imageBase = './assets/images/products/';

  let pageTitle = isVi ? 'Tất cả sản phẩm' : 'All Products';
  if (filter === 'offers') pageTitle = isVi ? 'Ưu đãi hot' : 'Hot Offers';
  if (filter === 'new') pageTitle = isVi ? 'Sản phẩm mới' : 'New Products';
  if (cat) pageTitle = cat;

  document.querySelector('.page-title').textContent = pageTitle;

  const gridHtml = products.length
    ? products.map((p) => `
        <article class="product-card-page">
          <a href="${getProductDetailUrl(p.id)}" class="card-img">
            <img src="${imageBase}${p.images[0]}" alt="${getProductTitle(p)}">
            ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
          </a>
          <div class="card-body">
            <p class="card-cat">${getProductCategory(p)}</p>
            <a href="${getProductDetailUrl(p.id)}" class="card-title">${getProductTitle(p)}</a>
            <p class="card-price">${formatPrice(p.price)}${p.oldPrice ? `<del>${formatPrice(p.oldPrice)}</del>` : ''}</p>
            <div class="card-actions">
              <button type="button" class="btn-card-cart" data-add-cart="${p.id}">${isVi ? 'Thêm giỏ' : 'Add cart'}</button>
              <a href="${getProductDetailUrl(p.id)}" class="btn-card-view">${isVi ? 'Xem' : 'View'}</a>
            </div>
          </div>
        </article>
      `).join('')
    : `<div class="empty-state"><ion-icon name="cube-outline"></ion-icon><h2>${isVi ? 'Không có sản phẩm' : 'No products found'}</h2></div>`;

  root.innerHTML = `
    <div class="products-toolbar">
      <select id="filter-category">
        <option value="">${isVi ? 'Tất cả danh mục' : 'All categories'}</option>
        ${[...new Set(PRODUCTS.map((p) => p.category))].map((c) =>
          `<option value="${c}" ${cat === c ? 'selected' : ''}>${c}</option>`
        ).join('')}
      </select>
      <select id="filter-type">
        <option value="">${isVi ? 'Bộ lọc' : 'Filter'}</option>
        <option value="offers" ${filter === 'offers' ? 'selected' : ''}>${isVi ? 'Ưu đãi' : 'Offers'}</option>
        <option value="new" ${filter === 'new' ? 'selected' : ''}>${isVi ? 'Mới' : 'New'}</option>
      </select>
    </div>
    <div class="products-grid-page">${gridHtml}</div>
  `;

  document.getElementById('filter-category').addEventListener('change', (e) => {
    const url = new URL(window.location.href);
    if (e.target.value) url.searchParams.set('cat', e.target.value);
    else url.searchParams.delete('cat');
    window.location.href = url.toString();
  });

  document.getElementById('filter-type').addEventListener('change', (e) => {
    const url = new URL(window.location.href);
    if (e.target.value) url.searchParams.set('filter', e.target.value);
    else url.searchParams.delete('filter');
    window.location.href = url.toString();
  });

  root.querySelectorAll('[data-add-cart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.addCart, 1);
      showCartToast(t('added'));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSubPageLayout();
  renderProductsPage();
  document.querySelector('select[name="language"]')?.addEventListener('change', () => {
    setTimeout(renderProductsPage, 100);
  });
});
