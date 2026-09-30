const products = [
  { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 79.99, emoji: '🎧', color: '#dbeafe' },
  { id: 2, name: 'Smart Watch Pro', category: 'electronics', price: 249.99, emoji: '⌚', color: '#e0e7ff' },
  { id: 3, name: 'Classic Denim Jacket', category: 'fashion', price: 89.99, emoji: '🧥', color: '#fce7f3' },
  { id: 4, name: 'Running Sneakers', category: 'fashion', price: 119.99, emoji: '👟', color: '#fef3c7' },
  { id: 5, name: 'Ceramic Plant Pot', category: 'home', price: 34.99, emoji: '🪴', color: '#dcfce7' },
  { id: 6, name: 'Desk Lamp LED', category: 'home', price: 45.99, emoji: '💡', color: '#fef9c3' },
  { id: 7, name: 'Yoga Mat Premium', category: 'sports', price: 39.99, emoji: '🧘', color: '#ffedd5' },
  { id: 8, name: 'Fitness Tracker', category: 'electronics', price: 59.99, emoji: '📱', color: '#dbeafe' },
];

let cartCount = 0;
let activeFilter = 'all';

const productsGrid = document.getElementById('products-grid');
const cartCountEl = document.querySelector('.cart-count');
const cartToast = document.getElementById('cart-toast');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const filterTabs = document.querySelectorAll('.filter-tab');
const newsletterForm = document.getElementById('newsletter-form');

function renderProducts(filter = 'all') {
  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  productsGrid.innerHTML = filtered.map(product => `
    <article class="product-card" data-category="${product.category}">
      <div class="product-card__image" style="background: ${product.color}">
        ${product.emoji}
      </div>
      <div class="product-card__body">
        <span class="product-card__category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-card__footer">
          <span class="product-card__price">$${product.price.toFixed(2)}</span>
          <button class="product-card__btn" data-id="${product.id}" data-name="${product.name}">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join('');

  productsGrid.querySelectorAll('.product-card__btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.name));
  });
}

function addToCart(productName) {
  cartCount++;
  cartCountEl.textContent = cartCount;
  showToast(`${productName} added to cart!`);
}

function showToast(message) {
  cartToast.textContent = message;
  cartToast.classList.add('cart-toast--visible');
  setTimeout(() => cartToast.classList.remove('cart-toast--visible'), 2500);
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isOpen);
  nav.classList.toggle('nav--open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav--open');
    document.body.style.overflow = '';
  });
});

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('filter-tab--active'));
    tab.classList.add('filter-tab--active');
    activeFilter = tab.dataset.filter;
    renderProducts(activeFilter);
  });
});

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Thanks for subscribing! Check your email for 10% off.');
  newsletterForm.reset();
});

renderProducts();
