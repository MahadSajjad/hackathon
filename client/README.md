# DonateHub - Donation Platform Frontend

A modern, responsive donation platform built with React, Vite, and Tailwind CSS. This is a complete frontend implementation with mock data and API simulation, ready for backend integration.

## 🚀 Features

### Public Features
- **Home Page**: Hero section, featured campaigns, stats, trust indicators
- **Campaigns Listing**: Search, filter, sort, and browse all campaigns
- **Campaign Details**: Full campaign information, donation form, updates, FAQs
- **Authentication**: Login/Register with role selection (Donor/NGO)

### Donor Features
- **Dashboard**: Donation history, impact tracking, analytics
- **Donation Flow**: Quick donate with preset amounts or custom input
- **Receipt Generation**: Mock PDF receipts for donations

### NGO Features
- **Campaign Management**: Create, edit, and manage campaigns
- **Analytics Dashboard**: Track donations, donor growth, campaign performance
- **Impact Tracking**: Monitor campaign progress and success metrics

### Technical Features
- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Mock API**: Complete API simulation with localStorage persistence
- **Real-time Updates**: Optimistic UI updates for donations
- **Charts & Analytics**: Data visualization with Recharts

## 🛠️ Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications
- **Axios** - HTTP client (for future backend integration)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd donationapp/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎯 Demo Accounts

The app includes pre-seeded demo accounts for testing:

- **Donor**: `donor@demo.com` / `password123`
- **NGO**: `ngo@demo.com` / `password123`
- **Admin**: `admin@demo.com` / `password123`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── ProgressBar.jsx
│   │   └── Badge.jsx
│   ├── campaigns/          # Campaign-specific components
│   │   ├── CampaignCard.jsx
│   │   └── DonationModal.jsx
│   └── layout/             # Layout components
│       ├── Navbar.jsx
│       └── Footer.jsx
├── contexts/               # React contexts
│   ├── AuthContext.jsx
│   └── DonationContext.jsx
├── pages/                  # Page components
│   ├── Home.jsx
│   ├── Campaigns.jsx
│   ├── CampaignDetails.jsx
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── dashboard/
│       ├── DonorDashboard.jsx
│       └── NGODashboard.jsx
├── services/               # API services
│   └── mockApi.js
└── App.jsx                 # Main app component
```

## 🔌 Backend Integration Points

The app is designed to easily integrate with a backend API. Here are the expected endpoints:

### Authentication Endpoints
```javascript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
```

### Campaign Endpoints
```javascript
GET    /api/campaigns
GET    /api/campaigns/:id
POST   /api/campaigns
PUT    /api/campaigns/:id
DELETE /api/campaigns/:id
```

### Donation Endpoints
```javascript
POST /api/donations
GET  /api/donations/user/:userId
GET  /api/donations/campaign/:campaignId
```

### User Endpoints
```javascript
GET  /api/users/:id
PUT  /api/users/:id
GET  /api/users/:id/campaigns
```

## 📊 Mock Data

The app includes comprehensive mock data:

- **6 Sample Campaigns** with different categories and progress levels
- **8 Categories** (Emergency Relief, Education, Health & Water, etc.)
- **Pre-seeded Users** for testing different roles
- **Sample Donations** to demonstrate the platform

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Gray Scale**: 50-900

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Sizes**: text-sm to text-6xl

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Multiple variants and sizes
- **Forms**: Consistent styling and validation
- **Modals**: Accessible with keyboard navigation

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Campaign browsing and filtering
- [ ] Donation flow completion
- [ ] Dashboard data display
- [ ] Responsive design on mobile
- [ ] Accessibility with keyboard navigation

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables
Create a `.env` file for configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=DonateHub
```

## 📱 Mobile Responsiveness

The app is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and roles
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading structure

## 🔒 Security Considerations

- **Input Validation**: Client-side validation for all forms
- **XSS Protection**: Proper data sanitization
- **CSRF Protection**: Ready for backend CSRF tokens
- **Secure Headers**: Ready for CSP implementation

## 📈 Performance Optimizations

- **Code Splitting**: Lazy loading for routes
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Analysis**: Optimized bundle size
- **Caching**: Proper cache headers for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Ready for Backend Integration!** 🚀

This frontend is production-ready and can be easily connected to any backend API that follows the expected endpoint structure outlined above.