# Project Shield - AI-Powered Security Dashboard

An intelligent security analytics platform that ingests network logs, analyzes them using Machine Learning models, and generates threat scores to identify potential cyber attacks.

## 🎯 Project Overview

Project Shield is a full-stack security analytics suite designed for cyber investigators and security analysts. It combines real-time log monitoring with AI-powered anomaly detection to provide actionable security insights.

### Key Features

- **Real-time Log Ingestion**: Upload and process CSV security logs
- **AI-Powered Threat Detection**: Isolation Forest ML model for anomaly detection
- **Interactive Dashboard**: Visualize security metrics and threat scores
- **User Authentication**: JWT-based secure authentication system
- **Protocol Analysis**: Track TCP, UDP, ICMP traffic patterns
- **Security Best Practices**: OWASP Top 10 vulnerability prevention

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  ML Service │
│  (React)    │     │ (Express)   │     │  (Flask)    │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  MongoDB    │
                    │  Database   │
                    └─────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

### Backend
- **Node.js/Express** - API server
- **MongoDB/Mongoose** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **Bcrypt** - Password hashing

### ML Service
- **Python 3.11** - Runtime
- **Flask** - ML API server
- **Scikit-learn** - ML library
- **Isolation Forest** - Anomaly detection algorithm
- **Pandas/NumPy** - Data processing

## 📊 ML Model Performance

- **Algorithm**: Isolation Forest
- **Accuracy**: 98%
- **Precision**: 90%
- **Recall**: 100%
- **F1 Score**: 94.74%
- **Features**: duration, src_bytes, dst_bytes
- **Dataset Size**: 600 rows (450 training, 150 testing)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- MongoDB 6.0+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project-shield-complete
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **ML Service Setup**
```bash
cd ml
pip install -r requirements.txt
python preprocess.py  # Generate dataset
python train.py      # Train model
python app.py        # Start ML service
```

4. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

### Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shield
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
ML_SERVICE_URL=http://localhost:8000
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
project-shield-complete/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth, security, upload
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── uploads/        # Log file storage
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service layer
│   │   └── assets/     # Static assets
│   └── index.html
├── ml/
│   ├── datasets/       # Training data
│   ├── app.py          # Flask ML service
│   ├── train.py        # Model training
│   ├── preprocess.py   # Data preprocessing
│   ├── predict.py      # Prediction logic
│   ├── model.pkl       # Trained model
│   └── metrics.json    # Model performance
└── docker-compose.yml  # Container orchestration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Logs
- `POST /api/logs/upload` - Upload log file (protected)
- `GET /api/logs/all` - Get all logs (protected)
- `GET /api/logs/stats` - Get log statistics (protected)
- `GET /api/logs/protocols` - Get protocol distribution (protected)

### ML Service
- `POST /predict` - Get threat predictions
- `GET /metrics` - Get model performance metrics
- `GET /health` - Health check

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password storage
- **CORS Protection**: Configurable origin whitelist
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, etc.
- **Input Validation**: File type and size restrictions
- **SQL Injection Prevention**: Parameterized queries via Mongoose
- **XSS Protection**: Input sanitization and Content Security Policy

## 🐳 Docker Deployment

### Using Docker Compose
```bash
docker-compose up --build
```

### Individual Services
```bash
# Backend
cd backend
docker build -t shield-backend .
docker run -p 5000:5000 shield-backend

# ML Service
cd ml
docker build -t shield-ml .
docker run -p 8000:8000 shield-ml
```

## 🌐 Cloud Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_URL=<backend-url>`
4. Deploy

### Backend (Render)
1. Connect GitHub repository to Render
2. Set root directory to `backend`
3. Add environment variables from `.env.example`
4. Deploy

### ML Service (Render/Heroku)
1. Connect GitHub repository
2. Set root directory to `ml`
3. Deploy as a web service

## 📈 Usage

1. **Register/Login**: Create an account or sign in
2. **Upload Logs**: Navigate to Upload page and upload CSV logs
3. **View Dashboard**: Monitor security metrics and threat scores
4. **Analyze Events**: Search and filter security events in Logs page

### CSV Format Requirements

Required columns:
- `timestamp` - Event timestamp
- `sourceIP` - Source IP address
- `destinationIP` - Destination IP address
- `protocol` - Network protocol (TCP/UDP/ICMP)

Optional columns (improves ML accuracy):
- `duration` - Connection duration
- `src_bytes` - Bytes sent from source
- `dst_bytes` - Bytes sent to destination

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### ML Model Evaluation
```bash
cd ml
python train.py  # View metrics output
```

## 📝 Development

### Running in Development Mode

**Quick Start (Windows)**
```bash
start-dev.bat
```

**Manual Setup**

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 - ML Service**
```bash
cd ml
python app.py
```

**Terminal 3 - Frontend**
```bash
cd frontend
npm run dev
```

## 🤝 Contributing

This project is part of the CFSS Global Internship Program 2026. For contributions, please follow the internship guidelines.

## 📄 License

This project is confidential and part of the CFSS Internship Program. Do not share outside the CFSS ecosystem.

## 👨‍💻 Author

**Prabhat Kumar**  
CFSS Global Intern 2026  
Domain: Full-Stack, Backend, Frontend, AI, ML, Data Science

## 🏆 Acknowledgments

- CFSS India (Cyber & Forensics Security Solutions)
- Startup India
- Skill India

---

**Note**: This project is strictly confidential. Sharing any part of this project outside the CFSS ecosystem will lead to immediate disqualification and blacklisting.
