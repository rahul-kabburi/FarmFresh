# 🥬 FarmFresh

**FarmFresh** is a modern and minimalistic frontend web application built using **React** and **Tailwind CSS**, designed to display fresh farm produce with a seamless shopping experience. It features dynamic category-based filtering, user authentication, localStorage cart management, and protected routing.

🔗 **Live Demo**: [https://farm-fresh-d24c.vercel.app](https://farm-fresh-d24c.vercel.app)  
📦 **GitHub Repo**: [https://github.com/rahul-kabburi/farmFresh](https://github.com/rahul-kabburi/farmFresh)

---

## ✨ Features

- 🏠 **Home Page**
  - Displays all available items.
  - Includes a sidebar with categories (e.g., Fruits, Vegetables).
  - Clicking a category filters and displays only relevant items.
  - Users can add items to the cart and increase quantity.
  - Cart item count is shown on the cart icon in real-time.

- 🛒 **Cart Page**
  - View and manage items in the cart.
  - Quantity-based pricing and total updates dynamically.
  - **Protected Route**: redirects to login if user not authenticated.

- 🔐 **Authentication**
  - LocalStorage-based login and signup system.
  - Toggle button for login/logout visibility.

- 📩 **Contact Page**
  - Contact form that redirects users to WhatsApp with the message.

- 💾 **Persistent Cart**
  - Cart and authentication info stored in localStorage.

---

## 🧪 Tech Stack

- ⚛️ React
- 💨 Tailwind CSS
- 🌐 React Router DOM
- 💾 Local Storage
- ⚡ Vite (Build Tool)

---

## 🚀 Getting Started

Clone the repository and run it locally:

```bash
git clone https://github.com/rahul-kabburi/farmFresh.git
cd farmFresh
npm install
npm run dev
