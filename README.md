# 🛒 Fullstack E-Commerce App with Supabase

A modern e-commerce application powered by **Next.js**, **Supabase**, and **Tailwind CSS**. It supports full user authentication, product management, and shopping cart functionality with persistent data and file storage.

---

## 🚀 Features

### 👤 User Authentication (Supabase Auth)
- Secure registration and login
- Email/password authentication
- Session persistence using Supabase client
- Role-based access (Admin vs User)

### 📦 Product Management
- Products stored in Supabase PostgreSQL
- Product images stored in Supabase Storage
- Admin-only interface to:
  - Add new products (name, price, image, category)
  - Edit existing product details
  - Delete products

### 🛒 Shopping Cart
- Add to cart, update quantity, and remove items
- Persistent cart using Supabase or Context + localStorage
- Checkout page shows total and selected items

### 🔐 Admin Panel
- Accessible only to admin users
- URL: `/admin`
- Manage products, users, orders

---

## 🧰 Tech Stack

| Layer     | Tool/Service        |
|-----------|---------------------|
| Frontend  | Next.js + Tailwind CSS |
| Backend   | Supabase (Auth + DB + Storage) |
| Auth      | Supabase Auth       |
| Storage   | Supabase Storage (for product images) |
| State     | React Context API   |
| Hosting   | Vercel / Netlify    |

---

## 🔐 Admin Credentials

Email: emmanueladewunmi15@gmail.com
Password: Adenuel123450##
Role: Admin

yaml
Copy
Edit

These credentials give full access to the admin dashboard and management tools.

---

## 🗂 Project Structure

/app
/admin - Admin dashboard
/checkout - Cart and checkout
/login - Login page
/register - Signup page
/products - Product listing
/components - UI components
/lib/supabase - Supabase client setup
/context - Auth & Cart context providers
.env.local - Environment variables

yaml
Copy
Edit

---

## 🔧 Environment Variables

Create a `.env.local` file and include:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
Find these in your Supabase project under Project Settings → API.

🛠 Setup Instructions
Clone the repository

Install dependencies

bash
Copy
Edit
npm install
Set up .env.local

Run locally

bash
Copy
Edit
npm run dev
🧠 Supabase Configuration Tips
✅ Tables:
products: Stores product data (id, title, price, image_url)

users or profiles: User info (id, role, email)

orders (optional): For checkout/order tracking

✅ Storage Buckets:
Create a bucket named product-images

Set public access (or use signed URLs)

Upload and link images when adding/editing products

✅ Row Level Security:
Enable RLS on products, profiles, and orders

Write policies to:

Allow authenticated users to view products

Allow only admin users to insert/update/delete products

🌐 Deployment
You can deploy the app using Vercel or Netlify.

Vercel Steps:
Push to GitHub

Go to https://vercel.com

Connect your repo

Add the .env.local variables in the Vercel dashboard

Deploy

🧑 Author
Emmanuel Adewunmi
Email: emmanueladewunmi15@gmail.com

