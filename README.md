# 📚 docs_platform

A RESTful API for managing and consuming IT documentation, built with **NestJS**, **Prisma ORM**, and **PostgreSQL**.

---

## 🚀 Features

### 👤 Users

- Sign up / Sign in
- View all documents
- Read document details
- Comment on documents and reply to comments
- Like / Dislike documents and comments
- Update own profile

### 🛠 Admin

- Login (only one admin)
- Create, update, delete documents
- Categorize documents
- Moderate comments (optional)

---

## ⚙️ Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Auth**: JWT (access + refresh tokens)
- **Hashing**: bcrypt
