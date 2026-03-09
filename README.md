<div align="center">
  <img src="../Main%20Page.png" alt="Simple Secure Share Preview" width="600" />
</div>

<h1 align="center">Simple Secure Share 🔒</h1>

<p align="center">
  <b>Share files securely. Leave no trace.</b>
</p>

<p align="center">
  A simple, fast, and completely end-to-end encrypted file sharing platform built with Next.js 15. Your files are encrypted in the browser before they ever leave your device, ensuring true zero-knowledge privacy.
</p>

<div align="center">
  <img src="../Upload%20And%20Share.png" alt="Upload and Share Preview" width="600" />
</div>

## ✨ Features

- **🔐 End-to-End Encryption:** Files are encrypted via browser APIs before upload. We never see your unencrypted files.
- **⚡ Lightning Fast:** Built on Next.js 15 for top-tier performance.
- **🙈 Zero Knowledge:** The server never holds the encryption keys, and files are automatically removed upon expiry.
- **⏳ Temporary Links:** Set optional passwords and expiry times for absolute control over file lifespans.
- **💅 Beautiful UI:** A clean, glassmorphism-inspired design crafted with Tailwind CSS and Radix/Lucide icons.

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Backend/Database)
- [Lucide React](https://lucide.dev/) (Icons)
- [QRCode.react](https://github.com/zpao/qrcode.react)

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v20+ recommended) and a package manager (`npm`, `yarn`, `pnpm`, or `bun`).

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/YOUR_USERNAME/simple-secure-share.git
   cd simple-secure-share
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn / pnpm / bun target equivalents
   ```

3. **Set up Environment Variables:**
   Rename `.env.local.example` to `.env.local` (or create it) and provide your Supabase credentials. Example:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:** Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How It Works

1. **Upload:** You select a file. It is securely encrypted in your browser using the Web Crypto API.
2. **Share:** You receive a secure link that includes the decryption key within the URL fragment (so the server never sees it). You can optionally protect it with a password or set an expiry limit.
3. **Expire:** Once the link expires or is consumed, the files are deleted forever.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YOUR_USERNAME/simple-secure-share/issues).

## 📄 License

[MIT](LICENSE)
