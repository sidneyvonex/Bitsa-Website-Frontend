# BITSA Website - Components Documentation

## Overview
This project contains the BITSA (Baraton Interdisciplinary Technology Students Association) website with a modern, professional design.

## Components Created

### 1. **Topbar** (`src/Components/Topbar.tsx`)
A sticky navigation bar featuring:
- BITSA logo (using the uploaded logo from `/public/bitsa-logo.jpeg`)
- Navigation links: Home, Current Issue, Articles, Gallery, Archives, About Us, Announcements
- "SUBMIT ARTICLE" call-to-action button
- Responsive design with mobile menu button
- Blue gradient branding matching the BITSA design

### 2. **Footer** (`src/Components/Footer.tsx`)
A comprehensive footer with:
- **About BITSA** section with tagline
- **Quick Links**: About Us, Contact, Submit Article
- **Contact Information**: Email addresses (bitsa@ueab.ac.ke, info@bitsa.club)
- **Social Media Icons**: Facebook, Twitter, LinkedIn with hover effects
- **Copyright notice** and legal links (Privacy Policy, Terms of Service)
- Blue gradient background matching the brand colors

### 3. **Home Page** (`src/Pages/Home.tsx`)
A modern landing page featuring:
- **Hero Section**: Large welcome banner with gradient background
- **Call-to-Action Buttons**: "Join BITSA" and "Explore Events"
- **Features Section**: Three cards showcasing:
  - Events & Workshops
  - Research & Articles
  - Community networking
- **Partners Section**: Placeholder for partner logos
- **Bottom CTA**: Additional "Submit Article" call-to-action

## Design Features

### Color Scheme
- **Primary Blue**: `#1e3a8a` to `#1e40af` (gradient)
- **Accent Yellow**: `#fbbf24` (yellow-400)
- **Secondary Blue**: `#3b4d99` to `#00bcd4` (logo gradient)
- **Text**: White on dark backgrounds, gray on light backgrounds

### Layout
- **Responsive Grid**: Mobile-first design with breakpoints for tablets and desktop
- **Max Width Container**: `max-w-7xl` for consistent content width
- **Padding**: Consistent spacing using Tailwind's spacing scale
- **Shadows**: Elevation effects on cards and buttons

### Typography
- **Headings**: Bold, large sizes for impact
- **Body Text**: Clean, readable font sizes
- **Links**: Hover effects with color transitions

## Running the Project

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Next Steps

Based on the hackathon guide, consider adding:
1. **Events page** with calendar view and event cards
2. **Blog/Articles** section with rich text editor (TipTap)
3. **Admin dashboard** for content management
4. **User authentication** and profiles
5. **Marketplace** for BITSA merchandise
6. **Communities** feature for student groups
7. **AI chatbot** for FAQs and recommendations
8. **Multi-language support** (i18n)
9. **Payment integration** (Stripe/M-Pesa)
10. **Map integration** for event locations

## File Structure

```
src/
├── Components/
│   ├── Footer.tsx       # Site footer with links and social media
│   └── Topbar.tsx       # Navigation bar with logo and menu
├── Pages/
│   └── Home.tsx         # Landing page
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## Assets
- **Logo**: `/public/bitsa-logo.jpeg` - BITSA club logo

## Technologies
- **React** + **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **pnpm** for package management

---

**Created for the BITSA Website Hackathon**
*Advancing Interdisciplinary Research and Innovation in Technology*
