'use strict';

function renderBlogList() {
  const isVi = getLang() === 'vi-VN';
  const root = document.getElementById('page-root');
  const imageBase = './assets/images/';

  root.innerHTML = `
    <div class="blog-grid-page">
      ${BLOG_POSTS.map((post) => `
        <article class="blog-card-page">
          <a href="blog-detail.html?id=${post.id}">
            <img src="${imageBase}${post.image}" alt="${getBlogTitle(post)}">
          </a>
          <div class="blog-body">
            <p class="blog-cat">${getBlogCategory(post)}</p>
            <a href="blog-detail.html?id=${post.id}">
              <h2 class="blog-title">${getBlogTitle(post)}</h2>
            </a>
            <p class="blog-meta">${isVi ? 'Bởi' : 'By'} ${post.author} / ${isVi ? post.dateVi : post.date}</p>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderBlogDetail() {
  const isVi = getLang() === 'vi-VN';
  const id = new URLSearchParams(window.location.search).get('id');
  const post = getBlogPost(id);
  const root = document.getElementById('page-root');

  if (!post) {
    root.innerHTML = `<div class="empty-state"><h2>${isVi ? 'Không tìm thấy bài viết' : 'Post not found'}</h2><a href="blog.html">${isVi ? '← Về Blog' : '← Back to Blog'}</a></div>`;
    return;
  }

  document.title = `${getBlogTitle(post)} - Anon Blog`;
  const content = isVi ? post.contentVi : post.content;

  root.innerHTML = `
    <article class="blog-detail-article content-box">
      <img src="./assets/images/${post.image}" alt="${getBlogTitle(post)}">
      <p class="blog-cat">${getBlogCategory(post)}</p>
      <h1>${getBlogTitle(post)}</h1>
      <p class="blog-meta">${isVi ? 'Bởi' : 'By'} <cite>${post.author}</cite> / ${isVi ? post.dateVi : post.date}</p>
      <div class="blog-content-text"><p>${content}</p></div>
    </article>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const isDetail = document.body.dataset.page === 'blog-detail';
  initSubPageLayout({
    backHref: isDetail ? 'blog.html' : 'index.html',
    backText: getLang() === 'vi-VN'
      ? (isDetail ? 'Quay lại Blog' : 'Quay lại cửa hàng')
      : (isDetail ? 'Back to Blog' : 'Back to shop')
  });

  if (isDetail) renderBlogDetail();
  else renderBlogList();

  document.querySelector('select[name="language"]')?.addEventListener('change', () => {
    setTimeout(() => {
      if (isDetail) renderBlogDetail();
      else renderBlogList();
    }, 100);
  });
});
