# JAY Real Estate Website

A modern, responsive real estate website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏠 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Property Listings**: Browse and search through property listings
- **Property Details**: Detailed property pages with image galleries
- **Contact Forms**: Contact forms with validation using React Hook Form
- **Services Pages**: Comprehensive information about real estate services
- **About Page**: Company information and team profiles
- **SEO Optimized**: Built-in SEO optimization with Next.js

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/CorporateGuuu/JayRealestate.git
cd JayRealestate
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 📁 Project Structure

```
jay-real-estate/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── properties/     # Properties listing page
│   │   ├── services/       # Services page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   └── components/         # React components
│       ├── Header.tsx      # Navigation header
│       ├── Footer.tsx      # Site footer
│       ├── Hero.tsx        # Hero section
│       └── [Other Components]
├── public/                 # Static assets
├── netlify.toml           # Netlify configuration
├── next.config.ts         # Next.js configuration
└── package.json           # Dependencies and scripts
```

## 🌐 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

The `netlify.toml` file is already configured for optimal deployment.

## 📱 Pages

- **Homepage** (`/`) - Hero section, featured properties, services overview
- **Properties** (`/properties`) - Property listings with search and filters
- **About** (`/about`) - Company story, team, and values
- **Services** (`/services`) - Detailed service offerings
- **Contact** (`/contact`) - Contact forms and company information

## 📞 Support

For support or questions, please create an issue on GitHub.

---

Built with ❤️ for JAY Real Estate
