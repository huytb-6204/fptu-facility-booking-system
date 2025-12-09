# FPTU Facility Booking System – Monorepo

This is the official repository for the Facility Booking System project at FPT University.  
It uses a monorepo structure including both the Backend (NestJS) and Frontend (React + Vite).

---

## Project Structure

fptu-facility-booking-system/
│── backend/        # NestJS API server
│── frontend/       # React + Vite frontend
│── docs/           # SRS, workflows (W1–W5), testcases (STC01–STC05)
│── README.md
│── .gitignore

---

## Backend (NestJS)

### Run Backend

cd backend
npm install
npm run start       # run application
npm run start:dev   # development mode

### Technologies

- NestJS
- TypeORM
- MongoDB / Mongoose
- JWT Authentication
- Class Validator / Class Transformer

---

## Frontend (React + Vite)

### Run Frontend

cd frontend
npm install
npm run dev

### Technologies

- React + Vite
- React Router
- Axios
- Material UI

---

## Documentation

All documents related to the project are located in the `docs/` folder:

- SRS – Software Requirements Specification
- Workflows (W1–W5)
- Testcases (STC01–STC05)
- ERD – Entity Relationship Diagram
- System Architecture Diagram

---

## Team Information

- Trần Bá Huy
- Nguyễn Đặng Đăng Quan

---

## Notes

- Do not commit `.env`, database credentials, or `node_modules`.
- Follow commit message guidelines for consistency.
