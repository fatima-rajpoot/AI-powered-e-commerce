# ShopEase — Responsive E-Commerce Website

A modern, fully responsive e-commerce storefront built with HTML, CSS, and JavaScript.

## Features

- **Mobile-first responsive design** — adapts from phone to desktop
- **Hamburger menu** on mobile, horizontal nav on tablet/desktop
- **Product grid** — 1 column (mobile) → 2 (tablet) → 3–4 (desktop)
- **Category filters** and add-to-cart with toast notifications
- **Newsletter signup** and sticky header

## How to Run

Open `index.html` in your browser, or use a local server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`

## Breakpoints

| Screen   | Width      | Layout                          |
|----------|------------|---------------------------------|
| Mobile   | < 768px    | 1-column products, hamburger menu |
| Tablet   | 768–1023px | 2-column products, full nav     |
| Desktop  | 1024px+    | 3–4 column products             |

## File Structure

```
index.html   — Page structure
styles.css   — Responsive styles & media queries
app.js       — Products, cart, menu, filters
```
