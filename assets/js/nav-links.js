'use strict';

/** Gắn link menu/footer trên index.html */
const NAV_LINKS = {
  'Home': 'index.html',
  'Categories': 'products.html',
  "Men's": 'products.html?cat=Clothes',
  "Women's": 'products.html?cat=Clothes',
  'Jewelry': 'products.html?cat=Jewellery',
  'Perfume': 'products.html?cat=Perfume',
  'Blog': 'blog.html',
  'Hot Offers': 'products.html?filter=offers',
  'Contact us': 'contact.html',
  'About us': 'about.html',
  'Prices drop': 'products.html?filter=offers',
  'New products': 'products.html?filter=new',
  'Best sales': 'products.html',
  'Delivery': 'about.html',
  'Legal Notice': 'about.html',
  'Terms and conditions': 'about.html',
  'Secure payment': 'about.html',
  'Sitemap': 'products.html',
  'Fashion': 'products.html?cat=Clothes',
  'Electronic': 'products.html?cat=Watches',
  'Cosmetic': 'products.html?cat=cosmetics',
  'Health': 'products.html',
  'Watches': 'products.html?cat=Watches'
};

function wireSiteNav() {
  document.querySelectorAll('.menu-title, .submenu-title, .footer-nav-link, .footer-category-link').forEach((el) => {
    const text = (el.dataset.i18nOriginal || el.textContent).trim();
    const href = NAV_LINKS[text];
    if (href && el.getAttribute('href') === '#') {
      el.setAttribute('href', href);
    }
  });

  document.querySelectorAll('.blog-card').forEach((card) => {
    const titleEl = card.querySelector('.blog-title');
    if (!titleEl) return;
    const text = (titleEl.dataset.i18nOriginal || titleEl.textContent).trim();
    const post = BLOG_POSTS.find((p) => p.title === text || p.titleVi === text);
    if (!post) return;
    const url = `blog-detail.html?id=${post.id}`;
    card.querySelectorAll('a[href="#"]').forEach((a) => { a.href = url; });
  });

  const personBtn = document.querySelector('.header-user-actions .action-btn ion-icon[name="person-outline"]');
  if (personBtn && personBtn.closest('button')) {
    personBtn.closest('.action-btn').outerHTML =
      '<a href="login.html" class="action-btn"><ion-icon name="person-outline"></ion-icon></a>';
  }

  const heartBtn = document.querySelector('.header-user-actions .action-btn ion-icon[name="heart-outline"]');
  if (heartBtn && heartBtn.closest('button')) {
    heartBtn.closest('.action-btn').outerHTML =
      '<a href="wishlist.html" class="action-btn"><ion-icon name="heart-outline"></ion-icon><span class="count" data-wishlist-count>0</span></a>';
  }
}

document.addEventListener('DOMContentLoaded', wireSiteNav);
