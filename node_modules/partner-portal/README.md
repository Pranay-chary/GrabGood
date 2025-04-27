# Partner Portal

Partner Portal is a web application for business partners to manage their profiles, listings, orders, and track analytics. This portal is designed to provide a seamless interface for partners to interact with the GrabGood platform.

## Features

- **Dashboard**: Overview of orders, revenue, and key metrics
- **Orders Management**: View and manage orders, update order status
- **Listings Management**: Create, update, and manage food/item listings
- **Surplus Management**: List and manage surplus food items
- **Bookings**: View and manage customer bookings
- **Analytics**: Detailed reports and insights on business performance
- **Profile Management**: Update business and personal information
- **Notifications**: Receive and manage system notifications
- **Settings**: Configure account preferences

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/grabgood.git
   cd grabgood/partner-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```

## Development

Run the development server:

```bash
npm run dev
```

This will start the Vite development server at http://localhost:5173.

## Building for Production

To build the application for production:

```bash
npm run build
```

This will generate a `dist` directory with the production-ready files.

## Deployment

You can use the provided deployment script (`deploy.sh`) to deploy the application:

```bash
# Make the script executable
chmod +x deploy.sh

# Run the script
./deploy.sh
```

### Manual Deployment

Alternatively, you can deploy manually:

1. Build the application
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your web server.

3. Configure your web server (Nginx, Apache, etc.) to serve the files and handle client-side routing.

#### Example Nginx Configuration

```nginx
server {
    listen 80;
    server_name partner.yourdomain.com;
    root /var/www/partner-portal;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy if needed
    location /api {
        proxy_pass http://your-api-server:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Project Structure

```
partner-portal/
├── public/           # Public assets
├── src/
│   ├── assets/       # Static assets (images, fonts, etc.)
│   ├── components/   # Reusable components
│   ├── context/      # React contexts
│   ├── pages/        # Page components
│   ├── styles/       # CSS and style files
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main application component
│   ├── App.css       # Main application styles
│   └── main.jsx      # Application entry point
├── .env              # Environment variables
├── index.html        # HTML template
├── package.json      # Project dependencies and scripts
├── vite.config.js    # Vite configuration
└── README.md         # Project documentation
```

## API Integration

The partner portal communicates with the backend API for data management. Ensure that the API endpoints are properly configured and accessible. All API requests include JWT authentication tokens stored in localStorage.

Main API endpoints:
- Authentication: `/api/auth/*`
- Profile: `/api/auth/profile`
- Listings: `/api/auth/listings`
- Orders: `/api/auth/orders`
- Analytics: `/api/auth/analytics`

## Technology Stack

- React (v19)
- React Router (v6)
- Tailwind CSS
- Chart.js/Recharts for analytics
- Vite for build tooling

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is proprietary and confidential.

## Contact

For any inquiries, please contact support@grabgood.com
