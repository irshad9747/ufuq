# BroComplain - Complaint Management System

A modern, responsive complaint management system built with React, Vite, and Tailwind CSS.

> **Live Site:** https://irshad9747.github.io/bro-code/

## Features

- 🎨 **Modern UI/UX** - Beautiful interface with smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔐 **Role-Based Access** - Support for Students, Staff, and Admin roles
- 📊 **Dashboard Analytics** - Track complaint statistics and status
- 🔔 **Notifications** - Real-time updates on complaint status changes
- 🎯 **Status Management** - Easy status updates with optional notes
- 🔍 **Advanced Filtering** - Filter complaints by status, priority, and search
- ⚡ **Fast Performance** - Built with Vite for optimal performance

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/brocomplain.git
cd brocomplain
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
brocomplain/
├── public/          # Static assets
├── src/
│   ├── components/ # Reusable components
│   ├── context/    # React context providers
│   ├── data/       # Mock data
│   ├── pages/      # Page components
│   ├── utils/      # Utility functions
│   ├── App.jsx     # Main app component
│   └── main.jsx    # Entry point
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api/v1
```

## Features Overview

### Student View
- Submit new complaints
- View personal complaint history
- Track complaint status
- Receive notifications

### Staff/Admin View
- View all complaints
- Update complaint status
- Add notes to complaints
- Filter and search complaints
- View analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Your Name

