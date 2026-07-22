'use strict';

function renderSubHeader(options = {}) {
  const isVi = getLang() === 'vi-VN';
  const backHref = options.backHref || 'index.html';
  const backText = options.backText || (isVi ? 'Quay lại cửa hàng' : 'Back to shop');
  const showWishlist = options.showWishlist !== false;

  return `
    <header class="detail-header">
      <div class="header-top">
        <div class="container">
          <ul class="header-social-container">
            <li><a href="#" class="social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="#" class="social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
            <li><a href="#" class="social-link"><ion-icon name="logo-instagram"></ion-icon></a></li>
          </ul>
          <div class="header-alert-news">
            <p><b>Free Shipping</b> This Week Order Over - $55</p>
          </div>
          <div class="header-top-actions">
            <select name="language">
              <option value="vi-VN">Tiếng Việt</option>
              <option value="en-US">English</option>
            </select>
          </div>
        </div>
      </div>
      <div class="header-main">
        <div class="container">
          <a href="index.html" class="header-logo">
            <img src="./assets/images/logo/logo.svg" alt="Anon" width="120" height="36">
          </a>
          <a href="${backHref}" class="back-link">
            <ion-icon name="arrow-back-outline"></ion-icon>
            <span>${backText}</span>
          </a>
          <div class="header-user-actions" style="margin-left: auto;">
            <a href="login.html" class="action-btn">
              <ion-icon name="person-outline"></ion-icon>
            </a>
            ${showWishlist ? `
            <a href="wishlist.html" class="action-btn">
              <ion-icon name="heart-outline"></ion-icon>
              <span class="count" data-wishlist-count>0</span>
            </a>` : ''}
            <button type="button" class="action-btn" data-cart-link>
              <ion-icon name="bag-handle-outline"></ion-icon>
              <span class="count" data-cart-count>0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderSubFooter() {
  return `
    <footer>
      <div class="footer-bottom">
        <div class="container">
          <p class="copyright">Copyright &copy; <a href="index.html">Anon</a> all rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function initSubPageLayout(options) {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = renderSubHeader(options);
  if (footerEl) footerEl.innerHTML = renderSubFooter();

  if (typeof updateCartBadges === 'function') updateCartBadges();
  if (typeof updateWishlistBadges === 'function') updateWishlistBadges();
  if (typeof initCartButtons === 'function') initCartButtons();
}
