# Butcher

Butcher is an online butcher shop application built with React, TypeScript, and Vite for the frontend, and Express and MongoDB for the backend. The application allows users to browse products, add them to the cart, and place orders. Admins can manage product prices and view orders.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse products (Chicken, Mutton, Eggs)
- Add products to the cart
- Update product quantities in the cart
- Place orders
- Admin panel to manage product prices and view orders

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Backend Setup

1. Navigate to the `backend` directory:

```sh
cd backend
```

2. Install dependencies:

```sh
npm install
```

3. create a .env file in the backend directory and ad your MongoDB connection string:

```sh
DB=<your-mongodb-connection-string>
PORT=5000
```

4. start the backend server:

```sh
npm run dev
```

Admin And Client Frontend Setup

1. Navigate to the admin/client directory:

```sh
cd admin 
# or
cd client
```

2. Install dependencies:

```sh
npm install
```

3. create a .env file in the client or admin directory and ad your backend connection string:

```sh
REACT_APP_API_URL="http://localhost:3000/"
```

4. start development server:

```sh
npm run dev
```

## Usage

1. Open your browser and navigate to http://localhost:5173 for client frontend.

2. Open your browser and navigate to http://localhost:5174 for admin frontend.

3. The backend server will be running on http://localhost:3000

## Project Structure

.<br>
├── admin<br>
│   ├── .gitignore<br>
│   ├── components.json<br>
│   ├── eslint.config.js<br>
│   ├── index.html<br>
│   ├── package.json<br>
│   ├── postcss.config.js<br>
│   ├── public<br>
│   ├── README.md<br>
│   ├── src<br>
│   ├── tailwind.config.js<br>
│   ├── tsconfig.app.json<br>
│   ├── tsconfig.json<br>
│   ├── tsconfig.node.json<br>
│   └── vite.config.ts<br>
├── backend<br>
│   ├── .env<br>
│   ├── controllers<br>
│   ├── database<br>
│   ├── functions<br>
│   ├── middleware<br>
│   ├── modals<br>
│   ├── package.json<br>
│   ├── routes<br>
├── client<br>
│   ├── .env<br>
│   ├── .gitignore<br>
│   ├── components.json<br>
│   ├── eslint.config.js<br>
│   ├── index.html<br>
│   ├── package.json<br>
│   ├── postcss.config.js<br>
│   ├── public<br>
│   ├── README.md<br>
│   ├── src<br>
│   ├── tailwind.config.js<br>
│   ├── tsconfig.app.json<br>
│   ├── tsconfig.json<br>
│   ├── tsconfig.node.json<br>
│   └── vite.config.ts<br>
├── .gitignore<br>
└── README.md

## Technologies Used

- Frontend:
   - React
   - Typescript
   - vite
   - Tailwind CSS
   - Axios
- Backend:
   - Express
   - MongoDB
   - Mongoose
   - dotenv

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes

## License

This project is licensed under the MIT License.