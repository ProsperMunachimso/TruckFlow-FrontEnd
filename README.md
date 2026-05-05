# TruckFlow – Frontend (Client‑side components)

## Team Members
- Prosper Munachimso Obiezue – 3126619
- Vitor Lopes – 3143310
- Chibuike Nwoke – 3142395

## Project Description
TruckFlow is a logistics platform that connects clients, transporters, and labourers. This frontend (built with React + Material UI) provides a responsive, role‑based dashboard where users can:
- Register / login with JWT authentication (HTTP‑only cookies).
- Clients: create, view, update, delete bookings; accept quotes; generate invoices; rate transporters.
- Transporters: view pending bookings, submit quotes, view their quote history.
- Labourers: view available labour requests, assign themselves, see assigned jobs.
- Additional pages: Services, About Us, Contact Us, Terms & Conditions.

## Technologies Used
- React 18
- Material UI (MUI) v5
- React Router v6
- Axios (with `withCredentials`)
- Environment variables (`REACT_APP_API_URL`)

## Pages / Views Implemented.
1. **Landing** – hero, features, how it works, CTA.
2. **Login / Register** – with client‑side validation.
3. **Client Dashboard** – metric cards, recent bookings, quick actions.
4. **Transporter Dashboard** – pending bookings, quote metrics.
5. **Labourer Dashboard** – available requests, assigned jobs.
6. **Create Booking** – form with validation (pickup/delivery, weight, dimensions, date, assistance checkboxes).
7. **My Bookings** – list with inline edit and delete (only for pending bookings).
8. **Booking Details** – view booking info, accept quotes, generate invoice.
9. **Profile** – update name, phone, address.
10. **Invoices** – list and pay invoices.
11. **My Quotes** (transporter) – list submitted quotes.
12. **My Labour Assignments** – show assigned labour requests.
13. **Rate Booking** – star rating + comment.
14. **Services, About Us, Contact Us, Terms & Conditions** – static info pages.

## Client‑Side Validation Examples
- **Registration**: required fields, email format, password length ≥6, password confirmation match.
- **Login**: email and password required.
- **Create Booking**: pickup/delivery/date required; weight range 1‑50000 kg; dimensions positive ≤1000 cm.
- **Create Quote**: amount required and positive; duration positive if provided.

All validation errors are shown inline (helperText or Alert), preventing submission when invalid.

## Responsive Design Approach
- Material UI Grid system (`xs`, `sm`, `md` breakpoints).
- Custom `sx` props with conditional styles.
- On the Services page, `gridTemplateColumns: '1fr 1fr'` collapses to full width on mobile.
- Tables become scrollable or use `TableContainer` for overflow.
- The layout uses `flexGrow: 1` and `mt: 'auto'` to keep footer at bottom.

## Styling Choices
- Custom Material UI theme defined in `theme.js`:
  - Primary colour: `#0047AB` (blue)
  - Secondary colour: `#FF8C42` (orange)
  - Font: Roboto (default MUI)
- Cards, Paper, Buttons, Icons from MUI.
- Consistent spacing using `sx={{ py: 4, px: 2 }}` etc.
- No custom CSS files – all inline via MUI `sx` or theme overrides.

## How the UI Interacts with Backend API
- All API calls go through `services/api.js` with `baseURL` from `REACT_APP_API_URL`.
- Authentication uses HTTP‑only cookies (JWT) – automatically sent with `withCredentials: true`.
- **Client triggers:** Register, login, create booking, update/delete booking, accept quote, generate invoice, pay invoice, rate transporter.
- **Transporter triggers:** View pending bookings, submit quote, view my quotes.
- **Labourer triggers:** View available requests, assign self, view assigned jobs.
- **Error/success messages** displayed via MUI `Alert` components (e.g., “Booking created”, “Update failed”).

## Deployment
- **Frontend** (React): Deployed on Render as a Static Site.
  - Live URL: `https://truckflow-frontend.onrender.com`
- **Backend** (Node.js/Express): Deployed on Render as a Web Service.
  - Live URL: `https://truckflow.onrender.com`
- Environment variables on Render:
  - Frontend: `REACT_APP_API_URL=https://truckflow.onrender.com`
  - Backend: `MONGODB_URI`, `SESSION_SECRET`, `JWT_SECRET`, `PORT`.

## Local Setup Instructions
1. Clone the repository.
2. Navigate to the `client` folder.
3. Run `npm install`.
4. Create a `.env` file with:
REACT_APP_API_URL=http://localhost:9002
REACT_APP_CLIENT_URL=http://localhost:3000

5. Run `npm start` – the app will open on `http://localhost:3000`.
6. Ensure the backend is running (on port 9002) and MongoDB is connected.

## Division of Labour (Assignment 3 iteration)
- **Prosper (45%)** – Client dashboard, booking CRUD, profile, invoices, rating, API integration, overall architecture.
- **Vitor (20%)** – Labourer and transporter flows, quotes, labour assignment, backend integration for labour endpoints.
- **Chibuike (35%)** – UI/UX design with Material UI, responsive layout, static pages (Services, About, Contact, Terms), deployment, README.

## Known Limitations / Future Enhancements
- Reject Quote button not implemented (planned).
- Labour request auto‑creation works only for new bookings (needs backend update for existing bookings).
- Real‑time GPS tracking deferred to future version.

## Changes from Assignment 1 (Project Proposal)
- Real‑time GPS tracking not implemented (deferred).
- Labour request creation simplified – auto‑created when client checks assistance.
- Payment gateway simulated (no Stripe integration).
- Added many static pages (Services, About, Contact, Terms) – not originally planned.

## References & Third‑Party Resources
- [Material UI Documentation](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Render Static Site Deployment Guide](https://render.com/docs/static-sites)
- Tutorials: MUI grid system, responsive typography.