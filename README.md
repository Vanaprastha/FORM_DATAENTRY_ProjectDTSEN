# FASIH - Sistem Pendataan DTSEN

Aplikasi dashboard untuk Pendataan DTSEN Kota Surabaya menggunakan **Next.js** sebagai frontend dan **Laravel** sebagai backend API.

## 📋 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TailwindCSS, Radix UI |
| **Backend** | Laravel 11, PHP 8.2+, Laravel Sanctum |
| **Database** | MySQL / PostgreSQL |

## 🏗️ Arsitektur

```
┌─────────────────────┐         ┌─────────────────────┐
│   Next.js Frontend  │  REST   │   Laravel Backend   │
│   (Port 3000)       │ ◄─────► │   (Port 8000)       │
│                     │   API   │                     │
└─────────────────────┘         └─────────────────────┘
                                         │
                                         ▼
                                ┌─────────────────────┐
                                │     Database        │
                                │     (MySQL)         │
                                └─────────────────────┘
```

## 📁 Struktur Project

```
fasih-project/
├── frontend/                    # Next.js Frontend
│   ├── app/                     # App router pages
│   ├── components/              # React components
│   │   ├── ui/                  # UI primitives (shadcn)
│   │   ├── data-table.jsx       # Data table component
│   │   ├── survey-form.jsx      # Survey form component
│   │   └── ...
│   ├── context/                 # React context providers
│   ├── lib/                     # Utilities & API service
│   └── hooks/                   # Custom React hooks
│
└── backend/                     # Laravel Backend
    ├── app/
    │   ├── Http/Controllers/Api/
    │   └── Models/
    ├── routes/api.php
    ├── database/migrations/
    └── config/
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PHP 8.2+
- Composer
- MySQL/PostgreSQL

### 1. Clone Repository

```bash
git clone <repository-url>
cd fasih-project
```

### 2. Setup Backend (Laravel)

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure database di .env
# DB_DATABASE=fasih_db
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Seed data (optional)
php artisan db:seed

# Start server
php artisan serve
```

Server akan berjalan di `http://localhost:8000`

### 3. Setup Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure API URL di .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Start dev server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🔐 Authentication

Aplikasi menggunakan **Laravel Sanctum** untuk token-based authentication.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/login` | Login user |
| `POST` | `/api/logout` | Logout user |
| `GET` | `/api/user` | Get current user |
| `GET` | `/api/surveys` | List all surveys |
| `GET` | `/api/surveys/{id}` | Get survey detail |
| `PUT` | `/api/surveys/{id}` | Update survey |
| `PATCH` | `/api/surveys/{id}/status` | Update survey status |

### Request Headers

```
Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json
```

## 📊 Database Schema

### Users Table
```sql
id, name, email, password, role, created_at, updated_at
```

### Surveys Table
```sql
id, kode_identitas, nama_kk_prelist, nama_kk_baru, alamat, 
keberadaan_keluarga, status_alur, user_saat_ini, mode, 
keterangan, assigned_to, created_at, updated_at
```

## 🔄 Flow Diagram

```
User Login Flow:
┌──────────┐    ┌───────────┐    ┌─────────┐    ┌──────────┐
│  User    │───►│  Next.js  │───►│ Laravel │───►│ Database │
│(Browser) │    │ Frontend  │    │   API   │    │          │
└──────────┘    └───────────┘    └─────────┘    └──────────┘
     │               │                │               │
     │ Enter creds   │                │               │
     │──────────────►│                │               │
     │               │ POST /login    │               │
     │               │───────────────►│               │
     │               │                │ Verify user   │
     │               │                │──────────────►│
     │               │                │◄──────────────│
     │               │◄───────────────│               │
     │               │ Token + User   │               │
     │◄──────────────│                │               │
     │ Dashboard     │                │               │
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
php artisan test
```

### Frontend Testing
```bash
cd frontend
npm run build
npm run lint
```

## 🚢 Deployment

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
```bash
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

**Backend (.env):**
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

SANCTUM_STATEFUL_DOMAINS=yourdomain.com
SESSION_DOMAIN=.yourdomain.com
```

## 📝 Development Notes

### CORS Configuration

Backend sudah dikonfigurasi untuk menerima request dari frontend. Jika deploy ke domain berbeda, update `config/cors.php`:

```php
'allowed_origins' => ['https://yourdomain.com'],
```

### API Service Layer

Frontend menggunakan `lib/api.js` sebagai service layer untuk semua API calls. Pattern ini memudahkan:
- Centralized error handling
- Auto token management
- Request/response interceptors

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Pengawas** | View all, Approve, Reject, Revoke |
| **Pencacah** | View assigned, Submit, Edit |

## 📞 Support

Untuk bantuan, hubungi tim development atau buat issue di repository.

---

**FASIH** - Pendataan DTSEN Kota Surabaya © 2026
