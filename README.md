# CitizenConnect

CitizenConnect is a unified platform that consolidates all government schemes, enabling users to check their eligibility, browse schemes based on domains, and access official scheme websites. It features an AI-powered chatbot that assists users in the application process and answers queries.

## Features

- **Unified Government Schemes**: Access all available government schemes in one place.
- **Eligibility Checker**: Determine your eligibility for different schemes.
- **Scheme Browsing**: Explore schemes based on various domains.
- **Official Links**: Get direct access to scheme websites.
- **AI Chatbot Assistance**: Utilize an AI-powered chatbot (powered by Gemini API) to clarify doubts and guide users through the application process.

## Tech Stack

- **Frontend**: Next.js with Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB Atlas
- **AI Integration**: Gemini API

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

### Clone the Repository
```sh
git clone https://github.com/yourusername/CitizenConnect.git
cd CitizenConnect
```

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

4. Run the frontend:
   ```sh
   npm run dev
   ```

### Running the Application

1. Start the backend server:
   ```sh
   cd backend && npm start
   ```

2. Start the frontend application:
   ```sh
   cd frontend && npm run dev
   ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## API Endpoints

### Authentication
- **`POST /api/auth/register`** - User Registration
- **`POST /api/auth/login`** - User Login

### Schemes
- **`GET /api/schemes`** - Fetch all schemes
- **`GET /api/schemes/:id`** - Get details of a specific scheme
- **`GET /api/schemes/domain/:domain`** - Fetch schemes by domain

### Eligibility Checker
- **`POST /api/eligibility/check`** - Check eligibility for schemes

### AI Chatbot
- **`POST /api/chatbot/query`** - Get responses from the AI chatbot

## Contributing

1. Fork the repository
2. Create a new branch (`feature-xyz`)
3. Commit your changes
4. Push to your branch
5. Create a pull request

## Contact
For any inquiries or support, feel free to reach out:
- **Email**: support@citizenconnect.com
- **GitHub Issues**: [CitizenConnect Repository](https://github.com/yourusername/CitizenConnect/issues)
- **Twitter**: [@CitizenConnect](https://twitter.com/CitizenConnect)
