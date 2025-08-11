
A full-stack scheduling system to create and manage services and time slots, with user authentication, CRUD operations, and Google Maps integration.

Features
Secure user authentication (JWT)

Create, read, update, delete services and appointments

Availability/time-slot management

Google Maps embedded on the frontend

Form validation & error handling

Responsive UI

Tech Stack
Backend

Node.js + Express

MongoDB (Mongoose)

JWT auth, validation middleware

Environment variables via dotenv

(Optional) file uploads with Multer

Frontend

React 17 (Create React App)

Redux Toolkit + React-Redux

React Router v6

Axios, React Icons

Google Maps via @react-google-maps/api

Tests: Jest + React Testing Library

react-scripts for build/dev

Getting Started
Prerequisites
Node.js 16+ and npm

MongoDB (local or Atlas)

A Google Maps API Key

1) Clone
bash
Copiar
Editar
git clone https://github.com/maykon92/schedule
cd schedule
2) Backend setup
Create backend/.env with values like:

env
Copiar
Editar
PORT=5000
MONGO_URI=mongodb://localhost:27017/schedule
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
# Optional uploads:
UPLOAD_DIR=uploads
Install & run:

bash
Copiar
Editar
cd backend
npm install
# choose the script your project uses:
npm run dev   # or: npm start
3) Frontend setup
Create frontend/.env with:

env
Copiar
Editar
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
Install & run:

bash
Copiar
Editar
cd ../frontend
npm install
npm start
Open http://localhost:3000.

API (quick glance)
Common endpoints (may vary by implementation—see source):

Auth: POST /api/auth/register, POST /api/auth/login

Services: GET/POST/PUT/DELETE /api/services

Appointments: GET/POST/PUT/DELETE /api/appointments

Me: GET /api/users/me (requires JWT)

Scripts
Frontend

npm start — run dev server

npm run build — production build

npm test — run tests

Backend

npm start or npm run dev — start the API

Deployment
Frontend: build with npm run build and host (Netlify/Vercel/static hosting).

Backend: deploy Node/Express API (Render/Heroku/VPS) and point REACT_APP_API_BASE_URL to the public API URL. Use MongoDB Atlas in production.

Roadmap / Ideas
Role-based permissions

Email/notification reminders

Calendar export (iCal)

E2E tests

Contributing
PRs and issues are welcome.

License
Add a license of your choice (e.g., MIT) to the repo.

🇧🇷 Resumo (PT-BR)
Aplicação web de agendamentos com autenticação, CRUD de serviços e horários, integração com Google Maps. Back-end: Node/Express + MongoDB. Front-end: React 17, Redux Toolkit, React Router v6, Axios, @react-google-maps/api. Execução local: subir API (Node) e depois o front (CRA). Configure .env no backend (MONGO_URI, JWT_SECRET) e no frontend (REACT_APP_API_BASE_URL, REACT_APP_GOOGLE_MAPS_API_KEY).
