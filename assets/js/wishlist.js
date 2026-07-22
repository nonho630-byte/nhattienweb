'use strict';

const WISHLIST_STORAGE_KEY = 'anon-wishlist';

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
  updateWishlistBadges();
  window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}

function getWishlistCount() {
  return getWishlist().length;
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function toggleWishlist(productId) {
  let list = getWishlist();
  if (list.includes(productId)) {
    list = list.filter((id) => id !== productId);
  } else {
    list.push(productId);
  }
  saveWishlist(list);
  return list.includes(productId);
}

function getWishlistItems() {
  return getWishlist()
    .map((id) => getProductById(id))
    .filter(Boolean);
}

function updateWishlistBadges() {
  const count = getWishlistCount();
  document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
    el.textContent = count;
  });
}

document.addEventListener('DOMContentLoaded', updateWishlistBadges);
