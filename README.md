# Company Management

## Getting Started

### Clone the Repository
```sh
git clone https://github.com/Krishnadas7/company-management.git
cd company-management
```

### Backend Setup
```sh
cd backend
npm install
```

#### Create a `.env` file in the `backend` directory and add the following:
```
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_uri
PORT=3000
```

#### Start the Backend Server
```sh
npm start
```
Ensure the backend is running on port `3000`.

### Frontend Setup
```sh
cd ../frontend
npm install
npm start
```

The frontend does **not** require an `.env` file, but make sure the backend is running properly at `http://localhost:3000`.

## Project Structure
- `backend/` - Contains the Node.js Express backend
- `frontend/` - Contains the React application

## Usage
1. Start the backend.
2. Start the frontend.
3. Access the application in your browser.

## License
This project is licensed under the MIT License.

