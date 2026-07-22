'use strict';

const BLOG_POSTS = [
  {
    id: 'clothes-retail-kpis',
    title: 'Clothes Retail KPIs 2021 Guide for Clothes Executives.',
    titleVi: 'Hướng dẫn KPI bán lẻ quần áo 2021 cho lãnh đạo ngành.',
    category: 'Fashion',
    categoryVi: 'Thời trang',
    author: 'Mr Admin',
    date: '2022-04-06',
    dateVi: '06/04/2022',
    image: 'blog-1.jpg',
    excerpt: 'Key performance indicators every fashion retail leader should track in 2021.',
    excerptVi: 'Các chỉ số KPI quan trọng mà mọi lãnh đạo bán lẻ thời trang cần theo dõi.',
    content: 'Understanding retail KPIs helps fashion executives make data-driven decisions. Focus on conversion rate, average order value, inventory turnover, and customer retention. Anon recommends reviewing these metrics weekly to stay competitive in the fast-moving apparel market.',
    contentVi: 'Hiểu rõ KPI bán lẻ giúp lãnh đạo ngành thời trang ra quyết định dựa trên dữ liệu. Tập trung vào tỷ lệ chuyển đổi, giá trị đơn hàng trung bình, vòng quay tồn kho và giữ chân khách hàng. Anon khuyên bạn nên xem lại các chỉ số này hàng tuần để cạnh tranh trong thị trường may mặc biến động nhanh.'
  },
  {
    id: 'curbside-fashion-trends',
    title: 'Curbside fashion Trends: How to Win the Pickup Battle.',
    titleVi: 'Xu hướng thời trang: Cách chiến thắng trong cuộc đua giao nhận.',
    category: 'Clothes',
    categoryVi: 'Quần áo',
    author: 'Mr Robin',
    date: '2022-01-18',
    dateVi: '18/01/2022',
    image: 'blog-2.jpg',
    excerpt: 'How brands optimize curbside pickup for fashion shoppers.',
    excerptVi: 'Cách thương hiệu tối ưu giao nhận tại cửa cho khách mua thời trang.',
    content: 'Curbside pickup has become essential for fashion retailers. Clear signage, SMS notifications, and dedicated pickup zones improve customer satisfaction. Speed and convenience win repeat orders in today\'s omnichannel landscape.',
    contentVi: 'Giao nhận tại cửa đã trở thành điều cần thiết với nhà bán lẻ thời trang. Biển báo rõ ràng, thông báo SMS và khu vực lấy hàng riêng giúp nâng cao trải nghiệm khách hàng. Tốc độ và tiện lợi giúp giữ khách quay lại trong kỷ nguyên đa kênh.'
  },
  {
    id: 'ebt-vendors-snap',
    title: 'EBT vendors: Claim Your Share of SNAP Online Revenue.',
    titleVi: 'Nhà cung cấp EBT: Nhận phần doanh thu SNAP trực tuyến.',
    category: 'Shoes',
    categoryVi: 'Giày',
    author: 'Mr Selsa',
    date: '2022-02-10',
    dateVi: '10/02/2022',
    image: 'blog-3.jpg',
    excerpt: 'Online SNAP acceptance opens new revenue streams for vendors.',
    excerptVi: 'Chấp nhận SNAP trực tuyến mở nguồn doanh thu mới cho nhà cung cấp.',
    content: 'SNAP online programs allow eligible vendors to reach more customers. Compliance, clear product labeling, and seamless checkout integration are critical. Early adopters gain loyalty from underserved communities.',
    contentVi: 'Chương trình SNAP trực tuyến giúp nhà cung cấp đủ điều kiện tiếp cận nhiều khách hàng hơn. Tuân thủ quy định, ghi nhãn sản phẩm rõ ràng và tích hợp thanh toán mượt mà là yếu tố then chốt.'
  },
  {
    id: 'electronics-fashion-trends',
    title: 'Curbside fashion Trends: How to Win the Pickup Battle.',
    titleVi: 'Xu hướng công nghệ & thời trang trong bán lẻ.',
    category: 'Electronics',
    categoryVi: 'Điện tử',
    author: 'Mr Pawar',
    date: '2022-03-15',
    dateVi: '15/03/2022',
    image: 'blog-4.jpg',
    excerpt: 'Wearables and smart accessories reshape fashion retail.',
    excerptVi: 'Thiết bị đeo và phụ kiện thông minh đang thay đổi bán lẻ thời trang.',
    content: 'Smart watches, fitness trackers, and connected accessories blend fashion with technology. Retailers who merchandise electronics alongside apparel create higher basket values and younger customer segments.',
    contentVi: 'Đồng hồ thông minh, vòng đeo tay và phụ kiện kết nối kết hợp thời trang với công nghệ. Nhà bán lẻ trưng bày điện tử cùng quần áo thường có giá trị giỏ hàng cao hơn và thu hút khách trẻ.'
  }
];

function getBlogPost(id) {
  return BLOG_POSTS.find((p) => p.id === id) || null;
}

function getBlogTitle(post) {
  return getLang() === 'vi-VN' ? post.titleVi : post.title;
}

function getBlogCategory(post) {
  return getLang() === 'vi-VN' ? post.categoryVi : post.category;
}
