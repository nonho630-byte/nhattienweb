'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const isVi = getLang() === 'vi-VN';
  initSubPageLayout();

  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const root = document.getElementById('page-root');
    root.innerHTML = `
      <div class="contact-success content-box">
        <ion-icon name="checkmark-circle"></ion-icon>
        <h2>${isVi ? 'Gửi tin nhắn thành công!' : 'Message sent successfully!'}</h2>
        <p>${isVi ? 'Cảm ơn bạn. Chúng tôi sẽ phản hồi sớm nhất có thể.' : 'Thank you. We will reply as soon as possible.'}</p>
        <a href="index.html" style="color:var(--salmon-pink);margin-top:15px;display:inline-block;">${isVi ? '← Về trang chủ' : '← Back home'}</a>
      </div>
    `;
  });

  let activeTab = 'login';
  const tabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeTab = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle('active', t.dataset.tab === activeTab));
      loginForm.style.display = activeTab === 'login' ? 'block' : 'none';
      registerForm.style.display = activeTab === 'register' ? 'block' : 'none';
    });
  });

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('[name="email"]').value;
    localStorage.setItem('anon-user', JSON.stringify({ email, name: email.split('@')[0] }));
    document.getElementById('auth-message').textContent = isVi ? 'Đăng nhập thành công!' : 'Login successful!';
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
  });

  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('[name="name"]').value;
    const email = registerForm.querySelector('[name="email"]').value;
    localStorage.setItem('anon-user', JSON.stringify({ email, name }));
    document.getElementById('auth-message').textContent = isVi ? 'Đăng ký thành công!' : 'Registration successful!';
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
  });
});
