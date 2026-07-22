'use strict';

const PRODUCTS = [
  {
    id: 'baby-fabric-shoes',
    title: 'baby fabric shoes',
    titleVi: 'Giày vải em bé',
    category: 'Footwear',
    categoryVi: 'Giày dép',
    price: 4,
    oldPrice: 5,
    rating: 5,
    images: ['1.jpg'],
    description: 'Soft and comfortable fabric shoes for babies. Lightweight design with flexible sole, perfect for everyday wear.',
    descriptionVi: 'Giày vải mềm mại, thoải mái cho bé. Thiết kế nhẹ với đế linh hoạt, phù hợp mang hàng ngày.'
  },
  {
    id: 'mens-hoodies-tshirt',
    title: "men's hoodies t-shirt",
    titleVi: 'Áo hoodie nam',
    category: 'Clothes',
    categoryVi: 'Quần áo',
    price: 7,
    oldPrice: 17,
    rating: 4.5,
    images: ['2.jpg'],
    description: 'Casual hoodie t-shirt for men. Made from breathable cotton blend, ideal for relaxed everyday style.',
    descriptionVi: 'Áo hoodie casual cho nam. Chất liệu cotton thoáng mát, phong cách thoải mái hàng ngày.'
  },
  {
    id: 'girls-tshirt',
    title: 'girls t-shirt',
    titleVi: 'Áo thun bé gái',
    category: 'Clothes',
    categoryVi: 'Quần áo',
    price: 3,
    oldPrice: 5,
    rating: 4.5,
    images: ['3.jpg'],
    description: 'Cute and colorful t-shirt for girls. Soft fabric that is gentle on skin, easy to mix and match.',
    descriptionVi: 'Áo thun xinh xắn cho bé gái. Vải mềm, dễ phối đồ.'
  },
  {
    id: 'woolen-hat-men',
    title: 'woolen hat for men',
    titleVi: 'Mũ len nam',
    category: 'Accessories',
    categoryVi: 'Phụ kiện',
    price: 12,
    oldPrice: 15,
    rating: 5,
    images: ['4.jpg'],
    description: 'Warm woolen hat for cold weather. Classic knit design, one size fits most.',
    descriptionVi: 'Mũ len ấm cho mùa lạnh. Kiểu dệt cổ điển, freesize.'
  },
  {
    id: 'relaxed-tshirt',
    title: 'Relaxed Short full Sleeve T-Shirt',
    titleVi: 'Áo thun tay ngắn thoải mái',
    category: 'Clothes',
    categoryVi: 'Quần áo',
    price: 45,
    oldPrice: 12,
    rating: 4,
    images: ['clothes-1.jpg'],
    description: 'Relaxed fit short sleeve t-shirt. Premium cotton fabric with a comfortable loose cut.',
    descriptionVi: 'Áo thun tay ngắn form rộng thoải mái. Cotton cao cấp, dễ mặc.'
  },
  {
    id: 'girls-embro-top',
    title: 'Girls pnk Embro design Top',
    titleVi: 'Áo thiết kế thêu hồng bé gái',
    category: 'Clothes',
    categoryVi: 'Quần áo',
    price: 61,
    oldPrice: 9,
    rating: 4,
    images: ['clothes-2.jpg'],
    description: 'Pink embroidered design top for girls. Elegant floral embroidery on soft cotton.',
    descriptionVi: 'Áo thêu hồng cho bé gái. Họa tiết hoa tinh tế trên nền cotton mềm.'
  },
  {
    id: 'black-floral-skirt',
    title: 'Black Floral Wrap Midi Skirt',
    titleVi: 'Chân váy midi hoa đen',
    category: 'Clothes',
    categoryVi: 'Quần áo',
    price: 76,
    oldPrice: 25,
    rating: 5,
    badge: 'new',
    images: ['clothes-3.jpg', 'clothes-4.jpg'],
    description: 'Black floral wrap midi skirt. Flattering wrap design with beautiful floral print.',
    descriptionVi: 'Chân váy midi wrap họa tiết hoa đen. Thiết kế wrap tôn dáng, dễ phối.'
  },
  {
    id: 'cotton-shirt',
    title: 'Pure Garment Dyed Cotton Shirt',
    titleVi: 'Áo cotton nhuộm garment',
    category: 'Mens Fashion',
    categoryVi: 'Thời trang nam',
    price: 68,
    oldPrice: 31,
    rating: 4,
    badge: 'sale',
    images: ['shirt-1.jpg', 'shirt-2.jpg'],
    description: 'Pure garment dyed cotton shirt. Rich color depth and soft hand-feel that improves with every wash.',
    descriptionVi: 'Áo cotton nhuộm garment thuần. Màu sắc bền, càng giặt càng mềm.'
  },
  {
    id: 'fleece-jacket',
    title: 'MEN Yarn Fleece Full-Zip Jacket',
    titleVi: 'Áo khoác fleece kéo khóa nam',
    category: 'Winter wear',
    categoryVi: 'Đồ mùa đông',
    price: 58,
    oldPrice: 65,
    rating: 4,
    images: ['jacket-5.jpg', 'jacket-6.jpg'],
    description: 'Full-zip fleece jacket for men. Warm yarn fleece material, perfect for layering in cold weather.',
    descriptionVi: 'Áo khoác fleece kéo khóa nam. Giữ ấm tốt, dễ mặc nhiều lớp.'
  },
  {
    id: 'mens-winter-jacket',
    title: 'Mens Winter Leathers Jackets',
    titleVi: 'Áo khoác da mùa đông nam',
    category: 'jacket',
    categoryVi: 'Áo khoác',
    price: 48,
    oldPrice: 75,
    rating: 3,
    badge: '15%',
    images: ['jacket-3.jpg', 'jacket-4.jpg', 'jacket-1.jpg', 'jacket-2.jpg'],
    description: 'Premium leather winter jacket for men. Durable genuine leather with warm inner lining.',
    descriptionVi: 'Áo khoác da mùa đông nam cao cấp. Da bền, lót ấm bên trong.'
  },
  {
    id: 'french-terry-shorts',
    title: 'Better Basics French Terry Sweatshorts',
    titleVi: 'Quần short sweat French Terry',
    category: 'Shorts',
    categoryVi: 'Quần short',
    price: 78,
    oldPrice: 85,
    rating: 4,
    badge: 'sale',
    images: ['shorts-1.jpg', 'shorts-2.jpg'],
    description: 'French terry sweatshorts with comfortable elastic waist. Perfect for casual and athletic wear.',
    descriptionVi: 'Quần short French Terry thoải mái. Lưng thun co giãn, mặc casual hoặc thể thao.'
  },
  {
    id: 'running-shoes-white',
    title: 'Running & Trekking Shoes - White',
    titleVi: 'Giày chạy & leo núi - Trắng',
    category: 'Sports',
    categoryVi: 'Thể thao',
    price: 49,
    oldPrice: 15,
    rating: 4,
    images: ['sports-1.jpg'],
    description: 'White running and trekking shoes. Lightweight with excellent grip and cushioned sole.',
    descriptionVi: 'Giày chạy và leo núi màu trắng. Nhẹ, đế êm, bám tốt.'
  },
  {
    id: 'trekking-shoes-black',
    title: 'Trekking & Running Shoes - black',
    titleVi: 'Giày leo núi & chạy - Đen',
    category: 'Sports',
    categoryVi: 'Thể thao',
    price: 58,
    oldPrice: 64,
    rating: 4,
    badge: 'sale',
    images: ['sports-2.jpg', 'sports-4.jpg'],
    description: 'Black trekking and running shoes. Rugged design built for outdoor adventures.',
    descriptionVi: 'Giày leo núi màu đen. Thiết kế bền bỉ cho hoạt động ngoài trời.'
  },
  {
    id: 'party-wear-shoes',
    title: 'Womens Party Wear Shoes',
    titleVi: 'Giày dự tiệc nữ',
    category: 'Party wear',
    categoryVi: 'Dự tiệc',
    price: 94,
    oldPrice: 42,
    rating: 4,
    badge: 'sale',
    images: ['party-wear-1.jpg', 'party-wear-2.jpg'],
    description: 'Elegant party wear shoes for women. Stylish design with comfortable heel height.',
    descriptionVi: 'Giày dự tiệc nữ thanh lịch. Gót vừa phải, đi thoải mái.'
  },
  {
    id: 'sports-claw-shoes',
    title: "Sports Claw Women's Shoes",
    titleVi: 'Giày thể thao nữ Sports Claw',
    category: 'Sports',
    categoryVi: 'Thể thao',
    price: 54,
    oldPrice: 65,
    rating: 4,
    images: ['sports-3.jpg'],
    description: 'Sports claw design women\'s shoes. Enhanced traction and sporty aesthetic.',
    descriptionVi: 'Giày thể thao nữ đế claw. Bám đường tốt, phong cách năng động.'
  },
  {
    id: 'air-trekking-shoes',
    title: 'Air Trekking Shoes - white',
    titleVi: 'Giày Air Trekking - trắng',
    category: 'Sports',
    categoryVi: 'Thể thao',
    price: 52,
    oldPrice: 55,
    rating: 4,
    images: ['sports-6.jpg'],
    description: 'Air cushioning trekking shoes in white. Breathable upper with shock-absorbing sole.',
    descriptionVi: 'Giày trekking đệm khí màu trắng. Thoáng khí, giảm chấn tốt.'
  },
  {
    id: 'suede-boot',
    title: 'Boot With Suede Detail',
    titleVi: 'Bốt chi tiết da lộn',
    category: 'boots',
    categoryVi: 'Bốt',
    price: 20,
    oldPrice: 30,
    rating: 4,
    images: ['shoe-3.jpg'],
    description: 'Stylish boot with suede detail accents. Durable construction for everyday wear.',
    descriptionVi: 'Bốt phong cách với chi tiết da lộn. Bền chắc, dễ phối đồ.'
  },
  {
    id: 'formal-leather-shoes',
    title: "Men's Leather Formal Wear shoes",
    titleVi: 'Giày da công sở nam',
    category: 'formal',
    categoryVi: 'Công sở',
    price: 56,
    oldPrice: 78,
    rating: 4,
    images: ['shoe-1.jpg', 'shoe-1_1.jpg'],
    description: 'Classic leather formal shoes for men. Polished look suitable for office and events.',
    descriptionVi: 'Giày da công sở nam cổ điển. Bóng bẩy, phù hợp đi làm và sự kiện.'
  },
  {
    id: 'casual-brown-shoes',
    title: "Casual Men's Brown shoes",
    titleVi: 'Giày nâu nam casual',
    category: 'Casual',
    categoryVi: 'Thường ngày',
    price: 99,
    oldPrice: 105,
    rating: 5,
    images: ['shoe-2.jpg', 'shoe-2_1.jpg'],
    description: 'Brown casual shoes for men. Versatile style that pairs well with jeans and chinos.',
    descriptionVi: 'Giày nâu casual nam. Dễ phối với quần jean và kaki.'
  },
  {
    id: 'pocket-watch',
    title: 'Pocket Watch Leather Pouch',
    titleVi: 'Túi da đồng hồ bỏ túi',
    category: 'Watches',
    categoryVi: 'Đồng hồ',
    price: 150,
    oldPrice: 170,
    rating: 4,
    badge: 'sale',
    images: ['watch-3.jpg', 'watch-4.jpg'],
    description: 'Vintage pocket watch with leather pouch. Classic timepiece with elegant carrying case.',
    descriptionVi: 'Đồng hồ bỏ túi vintage kèm túi da. Phụ kiện cổ điển sang trọng.'
  },
  {
    id: 'silver-necklace',
    title: 'Silver Deer Heart Necklace',
    titleVi: 'Dây chuyền tim hươu bạc',
    category: 'Jewellery',
    categoryVi: 'Trang sức',
    price: 84,
    oldPrice: 30,
    rating: 5,
    images: ['jewellery-3.jpg'],
    description: 'Silver deer heart necklace. Delicate craftsmanship with a meaningful heart design.',
    descriptionVi: 'Dây chuyền tim hươu bạc. Chế tác tinh xảo, ý nghĩa.'
  },
  {
    id: 'titan-perfume',
    title: 'Titan 100 Ml Womens Perfume',
    titleVi: 'Nước hoa nữ Titan 100ml',
    category: 'Perfume',
    categoryVi: 'Nước hoa',
    price: 42,
    oldPrice: 10,
    rating: 4,
    images: ['perfume.jpg'],
    description: 'Titan 100ml women\'s perfume. Long-lasting floral fragrance for daily elegance.',
    descriptionVi: 'Nước hoa nữ Titan 100ml. Hương hoa lưu giữ lâu, thanh lịch.'
  },
  {
    id: 'reversible-belt',
    title: "Men's Leather Reversible Belt",
    titleVi: 'Thắt lưng da hai mặt nam',
    category: 'Belt',
    categoryVi: 'Thắt lưng',
    price: 24,
    oldPrice: 10,
    rating: 4,
    images: ['belt.jpg'],
    description: 'Reversible leather belt for men. Two colors in one belt for maximum versatility.',
    descriptionVi: 'Thắt lưng da hai mặt nam. Hai màu trong một, tiện phối đồ.'
  },
  {
    id: 'zircon-ring',
    title: 'platinum Zircon Classic Ring',
    titleVi: 'Nhẫn Zircon cổ điển bạch kim',
    category: 'jewellery',
    categoryVi: 'Trang sức',
    price: 62,
    oldPrice: 65,
    rating: 4,
    images: ['jewellery-2.jpg'],
    description: 'Platinum zircon classic ring. Sparkling zircon stone in timeless setting.',
    descriptionVi: 'Nhẫn Zircon bạch kim cổ điển. Đá lấp lánh, kiểu dáng timeless.'
  },
  {
    id: 'smart-watch',
    title: 'Smart watche Vital Plus',
    titleVi: 'Đồng hồ thông minh Vital Plus',
    category: 'Watches',
    categoryVi: 'Đồng hồ',
    price: 100,
    oldPrice: 120,
    rating: 4.5,
    images: ['watch-1.jpg', 'watch-2.jpg'],
    description: 'Smart watch Vital Plus. Track fitness, notifications, and health metrics on your wrist.',
    descriptionVi: 'Đồng hồ thông minh Vital Plus. Theo dõi sức khỏe, thông báo tiện lợi.'
  },
  {
    id: 'shampoo-pack',
    title: 'shampoo conditioner packs',
    titleVi: 'Combo dầu gội & dưỡng tóc',
    category: 'cosmetics',
    categoryVi: 'Mỹ phẩm',
    price: 20,
    oldPrice: 30,
    rating: 4,
    images: ['shampoo.jpg'],
    description: 'Shampoo and conditioner combo pack. Nourishing formula for healthy, shiny hair.',
    descriptionVi: 'Combo dầu gội và dưỡng tóc. Công thức dưỡng tóc khỏe và bóng mượt.'
  },
  {
    id: 'shampoo-deal',
    title: 'shampoo, conditioner & facewash packs',
    titleVi: 'Combo dầu gội, dưỡng tóc & rửa mặt',
    category: 'cosmetics',
    categoryVi: 'Mỹ phẩm',
    price: 150,
    oldPrice: 200,
    rating: 3,
    images: ['shampoo.jpg'],
    description: 'Complete care pack: shampoo, conditioner and facewash. Everything you need for daily grooming.',
    descriptionVi: 'Combo chăm sóc đầy đủ: dầu gội, dưỡng tóc và rửa mặt. Tiện lợi mỗi ngày.'
  },
  {
    id: 'rose-gold-earrings',
    title: 'Rose Gold Peacock Earrings',
    titleVi: 'Bông tai chim công vàng hồng',
    category: 'jewellery',
    categoryVi: 'Trang sức',
    price: 20,
    oldPrice: 30,
    rating: 4,
    images: ['jewellery-1.jpg'],
    description: 'Rose gold peacock earrings. Eye-catching design with premium rose gold finish.',
    descriptionVi: 'Bông tai chim công vàng hồng. Thiết kế nổi bật, mạ vàng hồng cao cấp.'
  },
  {
    id: 'rose-gold-diamond-earring',
    title: 'Rose Gold diamonds Earring',
    titleVi: 'Bông tai kim cương vàng hồng',
    category: 'jewellery',
    categoryVi: 'Trang sức',
    price: 1990,
    oldPrice: 2000,
    rating: 3,
    images: ['jewellery-1.jpg'],
    description: 'Rose gold diamond earrings. Luxurious piece featuring brilliant cut diamonds.',
    descriptionVi: 'Bông tai kim cương vàng hồng. Trang sức xa xỉ với kim cương sáng.'
  }
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

function findProductByShowcase(showcase) {
  const img = showcase.querySelector('img[src*="products/"]');
  const titleEl = showcase.querySelector('.showcase-title');
  if (!img) return null;

  const filename = img.getAttribute('src').split('/').pop();
  const title = titleEl
    ? (titleEl.dataset.i18nOriginal || titleEl.textContent.trim()).toLowerCase()
    : '';

  const candidates = PRODUCTS.filter((p) => p.images.includes(filename));
  if (candidates.length === 1) return candidates[0];
  if (candidates.length > 1 && title) {
    return candidates.find((p) => p.title.toLowerCase() === title) || candidates[0];
  }

  return PRODUCTS.find((p) => p.id === filename.replace('.jpg', '')) || null;
}

function getRelatedProducts(product, limit = 4) {
  return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);
}

function getProductDetailUrl(id) {
  return `product-detail.html?id=${encodeURIComponent(id)}`;
}

function getLang() {
  return localStorage.getItem('anon-language') || 'vi-VN';
}

function getProductTitle(product) {
  return getLang() === 'vi-VN' ? product.titleVi : product.title;
}

function getProductCategory(product) {
  return getLang() === 'vi-VN' ? product.categoryVi : product.category;
}

function getProductDescription(product) {
  return getLang() === 'vi-VN' ? product.descriptionVi : product.description;
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<ion-icon name="star"></ion-icon>';
  if (half) html += '<ion-icon name="star-half-outline"></ion-icon>';
  const empty = 5 - full - (half ? 1 : 0);
  for (let i = 0; i < empty; i++) html += '<ion-icon name="star-outline"></ion-icon>';
  return html;
}
