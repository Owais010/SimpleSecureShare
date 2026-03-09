<div align="center">
  <img src="Main%20Page.png" alt="Simple Secure Share Preview" width="700" />
</div>

<h1 align="center">Simple Secure Share 🔒</h1>

<p align="center">
  <b>Share files securely. Leave no trace.</b>
</p>

<p align="center">
  A fast, privacy-focused, end-to-end encrypted file sharing platform built with Next.js 15.  
  Files are encrypted directly in the browser before upload, ensuring true zero-knowledge security.
</p>

<p align="center">
  <a href="https://simplesecureshare.vercel.app/"><b>Live Demo</b></a> •
  <a href="https://github.com/Owais010/SimpleSecureShare"><b>GitHub Repository</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black"/>
  <img src="https://img.shields.io/badge/React-19-blue"/>
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38BDF8"/>
  <img src="https://img.shields.io/badge/Supabase-Backend-green"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow"/>
</p>

---

<div align="center">
  <img src="Upload%20And%20Share.png" alt="Upload and Share Preview" width="700" />
</div>

---

# ✨ Features

### 🔐 End-to-End Encryption

Files are encrypted **in the browser** using the Web Crypto API before upload.
The server never sees the original file.

### 🙈 Zero Knowledge System

The server stores **only encrypted blobs**, meaning it cannot decrypt or access user data.

### ⏳ Temporary Secure Links

Users can create **time-limited links** with optional password protection.

### ⚡ High Performance

Built using **Next.js 15 App Router and Server Actions** for modern performance.

### 📱 QR Code Sharing

Instantly generate a **QR code** for quick file sharing between devices.

### 💅 Modern UI

Glassmorphism-inspired interface built using **Tailwind CSS and Radix/Lucide icons**.

---

# 🧠 Architecture Overview

The platform follows a **zero-knowledge architecture** where encryption happens entirely on the client side.

1. User selects a file.
2. File is encrypted in the browser using the **Web Crypto API**.
3. Encrypted file is uploaded to **Supabase Storage**.
4. Metadata such as expiry time and password settings are stored in **Supabase Database**.
5. The encryption key is embedded in the **URL fragment (`#`)**, which is never sent to the server.

Because URL fragments are handled only by the browser, the server never receives the encryption key.

---

# 🔐 Security Model

Simple Secure Share is designed to protect user privacy.

* Files are encrypted **before leaving the user's device**
* Encryption keys are **never stored on the server**
* Keys are shared via **URL fragments**
* Optional **password protection**
* **Automatic file expiration and deletion**
* The server only stores **encrypted data**

This ensures a **true zero-knowledge file sharing system**.

---

# 🚀 Tech Stack

### Frontend

* Next.js 15 (App Router)
* React 19
* Tailwind CSS v4

### Backend & Storage

* Supabase (Database + Storage)

### Additional Libraries

* Lucide React (Icons)
* QRCode.react (QR code generation)

---

# 🛠️ Getting Started

## Prerequisites

Make sure you have:

* Node.js **v20 or higher**
* npm / yarn / pnpm / bun
* A Supabase project

---

## 1. Clone the Repository

```bash
git clone https://github.com/Owais010/SimpleSecureShare.git cd SimpleSecureShare
cd simple-secure-share
```

---

## 2. Install Dependencies

```bash
npm install
```

or

```
yarn install
pnpm install
bun install
```

---

## 3. Setup Environment Variables

Create a `.env.local` file in the root directory.

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can obtain these from your **Supabase Project Settings → API Keys**.

---

## 4. Run the Development Server

```
npm run dev
```

---

## 5. Open the App

Visit

```
http://localhost:3000
```

---

# 📖 How It Works

### 1️⃣ Upload

The user selects a file which is immediately **encrypted in the browser** using the Web Crypto API.

### 2️⃣ Store

The encrypted file is uploaded to **Supabase Storage**.

### 3️⃣ Share

A secure shareable link is generated containing the **decryption key in the URL fragment**.

Example:

```
https://example.com/download#encryption-key
```

Since fragments are not sent to servers, the key stays on the client side.

### 4️⃣ Download

The recipient opens the link, the browser extracts the key, downloads the encrypted file, and decrypts it locally.

### 5️⃣ Expire

Once the file expires or is deleted, it is permanently removed.

---

# 📂 Project Structure

```
simple-secure-share
│
├── app
│   ├── upload
│   ├── download
│   └── api
│
├── components
│
├── lib
│   ├── encryption
│   └── supabase
│
├── public
│
└── styles
```

---

# 🗺️ Future Improvements

* Multi-file uploads
* Drag and drop support
* Download analytics
* One-time download links
* Secure link revocation
* File size progress indicators

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to contribute:

1. Fork the repository
2. Create a new branch
3. Submit a pull request

You can also open issues for bugs or feature requests.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Owais Uddin**

* Portfolio: https://owaiseuddinportfolio.vercel.app
* LinkedIn: https://www.linkedin.com/in/mir-owaiseuddin-baseer/
* Live Project: https://simplesecureshare.vercel.app

---

⭐ If you found this project useful, consider giving it a star!
