# GrabGood

GrabGood is a comprehensive platform that connects users with local businesses while promoting community engagement and social responsibility. The platform consists of two main portals: a User Portal for customers and a Partner Portal (CMS) for business owners.

## Features

### User Portal
- Authentication system
- Business discovery and search
- Booking management for all business types
- Community features
- Donation system
- Integrated payment processing

### Partner Portal (CMS)
- Business management dashboard
- Listing management
- Order processing
- Analytics
- Profile and settings
- Type-specific management interfaces
- Notification system
- Surplus management

### Business Types
1. Restaurants
   - Menu management
   - Review system
2. Hotels
   - Room booking
   - Amenities management
3. Function Halls
   - Availability calendar
   - Facilities management
4. Sweet Shops
   - Product catalog
   - Category management

## Tech Stack

### Frontend
- React.js
- Vite
- Material-UI
- TailwindCSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Pranay-chary/GrabGood.git
cd GrabGood
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install User Portal dependencies
```bash
cd ../user-portal
npm install
```

4. Install CMS dependencies
```bash
cd ../cms
npm install
```

5. Set up environment variables
- Create `.env` files in the root, server, user-portal, and cms directories
- Add necessary environment variables (refer to `.env.example` files)

### Running the Application

1. Start the backend server
```bash
cd server
npm start
```

2. Start the User Portal
```bash
cd ../user-portal
npm run dev
```

3. Start the CMS
```bash
cd ../cms
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
