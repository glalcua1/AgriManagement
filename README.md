# Lal Farms Management System

A comprehensive farm management application built with React, TypeScript, and Material-UI. This system helps agricultural land owners manage their farms, leases, finances, and operations with an intuitive and responsive interface.

## 🎯 **Current Status: Farms & Leases Fully Implemented**

### ✅ **Completed Features**

#### 🚜 **Farm Management (Fully Functional)**
- **Farm Registration**: Complete form for adding farms with validation
- **Farm Dashboard**: Beautiful card-based view of all farms
- **Farm Details**: Comprehensive dialog with tabs for overview, plots, and activity
- **Plot Management**: Visual plot tracking within farms
- **Search & Filters**: Real-time search and filtering capabilities
- **Location Support**: GPS coordinates for Bilari, Moradabad region
- **Area Management**: Support for bighas (traditional Indian unit)

#### 📋 **Lease Management (Fully Functional)**
- **Lease Dashboard**: Card-based view with payment status
- **Payment Tracking**: Visual payment status with quick actions
- **Revenue Analytics**: Summary cards with financial metrics
- **Advanced Filtering**: Filter by status, crop type, farm, etc.
- **Lessee Management**: Complete lessee information tracking
- **Contract Terms**: Detailed lease terms and conditions

#### 📊 **Analytics Dashboard**
- **Real-time Metrics**: Updated dashboard with actual farm/lease data
- **Interactive Charts**: Revenue trends with Recharts
- **Weather Integration**: Current weather for farm locations
- **Financial Overview**: Profit/loss tracking and ROI analysis

### 🌾 **Sample Data Included**

#### **Farms (3 farms, 200 bighas total)**
- **North Bilari Farm**: 80 bighas (3 plots - sugarcane, wheat, rice)
- **South Bilari Farm**: 75 bighas (3 plots - sugarcane, mangoes, wheat)  
- **East Bilari Farm**: 45 bighas (2 plots - rice, wheat)

#### **Active Leases (4 contracts)**
- **Sugarcane Leases**: ₹25,000-₹28,000 per bigha
- **Wheat Lease**: ₹15,000 per bigha (seasonal)
- **Mango Orchard**: ₹35,000 per bigha (multi-year)
- **Total Annual Revenue**: ₹26.5 lakhs

## Features

### 🚜 Farm Management
- **Farm Registration**: Add multiple farms with GPS coordinates and detailed information
- **Plot Division**: Divide farms into smaller plots for different crops
- **Soil Quality Tracking**: Monitor soil types and quality ratings
- **Irrigation Management**: Track different irrigation systems per plot

### 📋 Lease Management
- **Digital Contracts**: Create and manage lease agreements
- **Dynamic Pricing**: Set rates per crop type and area unit (bighas/acres)
- **Payment Tracking**: Monitor payment schedules and overdue amounts
- **Auto-renewal**: Automated lease renewal notifications

### 💰 Financial Management
- **Revenue Tracking**: Track lease income by farm and plot
- **Expense Management**: Categorized expense tracking with receipt storage
- **Financial Analytics**: Profit/Loss statements and ROI analysis
- **Reporting**: Generate comprehensive financial reports

### 🌤️ Weather Integration
- **Real-time Data**: Current weather conditions for each farm location
- **7-day Forecasts**: Detailed weather predictions
- **Agricultural Insights**: Crop-specific weather recommendations
- **Weather Alerts**: Notifications for severe weather conditions

### 📊 Analytics & Reporting
- **Dashboard**: Real-time metrics and KPIs
- **Interactive Charts**: Revenue trends and performance analytics
- **Custom Reports**: Generate reports in PDF/Excel formats
- **Performance Tracking**: Monitor farm productivity and lease utilization

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI) with responsive design
- **State Management**: Redux Toolkit
- **Charts**: Recharts for data visualization
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LalFarms
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Sidebar, etc.)
│   └── Farm/           # Farm-specific components (AddFarmForm, FarmDetailsDialog)
├── pages/              # Page components
├── store/              # Redux store and slices
│   └── slices/        # Redux slices for different features
├── types/              # TypeScript type definitions
├── theme/              # Material-UI theme configuration
├── services/           # API services (future implementation)
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## Features Overview

### Responsive Design
- **Mobile-First**: Optimized for mobile devices with progressive enhancement
- **Adaptive Layout**: Sidebar collapses on mobile, responsive grid system
- **Touch-Friendly**: Large touch targets and mobile-optimized interactions

### Material Design
- **Clean Interface**: Modern Material Design principles
- **Consistent Theming**: Agricultural green theme with cohesive color scheme
- **Accessibility**: WCAG compliant with proper contrast ratios

### Performance
- **Code Splitting**: Lazy loading for optimal performance
- **Optimized Builds**: Production builds with minification and compression
- **Progressive Web App**: PWA capabilities for offline usage

## Current Implementation Status

### ✅ Completed
- Project setup with Vite and TypeScript
- Material-UI theme configuration with agricultural colors
- Responsive layout with sidebar and header
- Redux store with type-safe slices
- **Farm Management**: Complete CRUD operations with forms and dialogs
- **Lease Management**: Full lease tracking with payment management
- Dashboard with interactive charts and real metrics
- Navigation system with routing
- Mock data for 3 farms (200 bighas) and 4 active leases

### 🚧 In Development
- Weather API integration (currently using mock data)
- Real-time notifications system
- PDF report generation
- Data export/import functionality

### 📋 Planned Features
- User authentication and authorization
- Mobile app (React Native)
- Advanced analytics and insights
- Multi-language support
- IoT sensor integration
- Marketplace integration for commodity trading

## API Integration

The application is structured to easily integrate with backend APIs. Mock data is currently used for development, but the Redux slices are designed to work with real API endpoints.

### Weather API
Integration planned with services like:
- OpenWeatherMap
- AccuWeather
- WeatherAPI

### Payment Integration
Future support for:
- Payment gateways for automated lease payments
- Invoice generation
- Payment reminders

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Guidelines

- Follow TypeScript best practices
- Use Material-UI components consistently
- Maintain responsive design principles
- Write clean, self-documenting code
- Add proper error handling
- Include loading states for better UX

## Sample Data

The application includes realistic sample data for:
- 3 farms in Bilari, Moradabad region totaling 200 bighas
- 8 plots across the farms with different crops
- 4 active lease agreements with payment schedules
- 4 lessees with complete contact information
- Financial data showing ₹26.5 lakhs annual revenue

## Support

For support and questions, please create an issue in the repository or contact the development team.

## License

This project is licensed under the MIT License - see the LICENSE file for details. # AgriManagement
