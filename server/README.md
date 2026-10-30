# 🏟️ Opperd Official — Backend API

> Official REST API for **Opperd** ([opperd.com](https://opperd.com))

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Email | Nodemailer + EJS Templates |
| Package Manager | Bun |
| Deployment | Vercel |

---

## 📁 Project Structure

```
.
├── .vscode/                    # VS Code configuration settings
├── prisma/                     # Prisma ORM setup
│   ├── migrations/             # Database migration history files
│   └── schema/                 # Prisma schema definitions
├── src/                        # Application source code
│   ├── config/                 # Environment variables and configuration files
│   │   ├── cors.ts             # CORS configuration
│   │   ├── env.ts              # Environment variable loader & validator
│   │   ├── logger.ts           # Logging configuration (Winston/Pino)
│   │   ├── media.ts            # Media storage configuration (e.g., Cloudinary/AWS S3)
│   │   ├── rate-limit.ts       # API rate limiter configuration
│   │   └── socket.ts           # Socket.io configuration
│   ├── database/               # Database connections
│   │   └── prisma.ts           # Prisma client instance initialization
│   ├── interface/              # Global TypeScript interfaces/types
│   │   ├── banner.interface.ts
│   │   └── product.interface.ts
│   ├── lib/                    # Third-party utilities & external SDK wrappers
│   ├── modules/                # Feature-based modular structure
│   │   ├── auth/               # Authentication module
│   │   ├── banner/             # Banner management module
│   │   ├── product/            # See Seller Uploaded Product
│   │   └── media/              # Media handling upload image
│   ├── routes/                 # Central API routes
│   │   └── index.ts            # Aggregated route handler
│   ├── shared/                 # Code shared across multiple modules
│   │   ├── errors/             # Custom error handlers and classes
│   │   ├── middlewares/        # Express middlewares (Auth, validation, etc.)
│   │   └── utils/              # Helper utility functions
│   ├── templates/              # Email / Notification templates
│   │   └── otp.ejs             # EJS template for OTP emails
│   ├── types/                  # Custom TypeScript declaration extensions
│   │   └── express.d.ts        # Express Request/Response type overrides
│   ├── app.ts                  # Express application setup (Middlewares, routes)
│   └── server.ts               # Application entry point (Server initialization)
├── .env                        # Environment variables (Local - Do not commit)
├── .env.example                # Example environment variables template
├── .env.production             # Production environment variables
├── .gitignore                  # Files & folders ignored by Git
├── bun.lock                    # Bun dependency lockfile
├── eslint.config.mjs           # ESLint linting configuration
├── package.json                # Project dependencies and scripts
├── prisma.config.ts            # Extended Prisma configuration
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript compiler configurations
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Bun
- PostgreSQL database (or Neon)

### Installation

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env

# Run database migrations
bun prisma migrate dev

# Start development server
bun dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
APP_NAME=Your App

BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN=1d
BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE=1d

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/callback/google

EMAIL_SENDER_SMTP_USER=your_email@gmail.com
EMAIL_SENDER_SMTP_PASS=your_email_password
EMAIL_SENDER_SMTP_HOST=smtp.gmail.com
EMAIL_SENDER_SMTP_PORT=465
EMAIL_SENDER_SMTP_FROM=your_email@gmail.com

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# CORS
ALLOWED_ORIGINS=https://opperd.com
```

> ⚠️ Note: For Gmail SMTP, use an **App Password** instead of your regular password.
> Navigate to: *Google Account → Security → 2-Step Verification → App Passwords*

---

## 📜 Scripts

```bash
bun dev          # Development server (tsx watch)
bun build        # Production build (tsup)
bun start        # Start production server

bun prisma migrate dev     # Run migrations (dev)
bun prisma migrate deploy  # Run migrations (production)
bun prisma studio          # Open Prisma Studio
```

---

## 🌿 Branch Convention

```
production    → test / deploy
development   → staging / active development

---

## 🚢 Deployment

- **Platform:** Vercel
- **Branch:** `development`
- **Build Command:** `bun prisma migrate deploy && bun build`
- **Start Command:** `bun start`
- **Database:** Neon PostgreSQL

---

## 📄 License

MIT © [Opperd](https://opperd.com)
