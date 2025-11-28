**Purpose**
-: Quick, actionable guidance for AI coding agents to work productively in this repository.

**Big Picture**

- **Monorepo structure**: three separate apps live side-by-side: `backend` (Express + MongoDB API), `admin` (React + Vite admin panel), and `frontend` (React + Vite public site).
- **Service boundaries**: `backend` is the single source of truth for data (routes in `backend/routes/` -> controllers in `backend/controller/` -> models in `backend/model/`). `admin` and `frontend` are thin clients that call `backend` via REST under `http://localhost:5000/api`.
- **Auth & permissions**: JWT-based auth. `backend/middleware/auth.middleware.js` (`protect`) accepts tokens in `auth-token`, `Authorization: Bearer <token>`, or `token`. Admin-only endpoints use `backend/middleware/admin.middleware.js` (`adminAuth`) and expect the token payload to match `ADMIN_EMAIL` and `ADMIN_PASSWORD` env values.

**Key files & patterns (quick reference)**

- **Entry & boot**: `backend/server.js` — DB/cloudinary connect, CORS, route mounting.
- **Routes**: `backend/routes/*.route.js` — request paths (e.g., `/api/orders/list` in `order.route.js`).
- **Controllers**: `backend/controller/*.controller.js` — business logic called by routes.
- **Models**: `backend/model/*.js` — Mongoose schemas.
- **Middleware**: `backend/middleware/*` — `auth.middleware.js`, `admin.middleware.js`, `multer.js` (uploads).
- **Config & secrets**: `backend/config/db.js`, `backend/config/cloudinary.js`, and environment variables loaded by `dotenv` in `server.js`.
- **Client API wrappers**: `admin/src/services/api.js` and `frontend/src/service/api.js` — both create an Axios `api` instance with interceptors that add `auth-token` and `Authorization: Bearer <token>` from `localStorage`.
- **Extras**: `backend/utils/sendEmail.js` for emails and `middleware/multer.js` + Cloudinary for image uploads.

**Environment & secrets**

- Backend expects these environment variables (discoverable in `config/*.js` and middleware):
  - `MONGO_URI` — MongoDB connection string used in `backend/config/db.js`.
  - `JWT_SECRET` — used to sign/verify tokens.
  - `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary config in `backend/config/cloudinary.js`.
  - `ADMIN_EMAIL`, `ADMIN_PASSWORD` — required by `admin.middleware.js` to validate admin tokens.
  - Any email SMTP credentials referenced by `backend/utils/sendEmail.js`.

**Dev & debug workflows (exact commands)**

- Install and run backend in dev (uses `nodemon`):
  - `cd backend` && `npm install` && `npm run dev` (runs `nodemon server.js`).
- Admin app (Vite):
  - `cd admin` && `npm install` && `npm run dev` (default Vite port ~5173).
- Frontend app (Vite):
  - `cd frontend` && `npm install` && `npm run dev`.
- When debugging auth errors: check headers set by `admin/src/services/api.js` or `frontend/src/service/api.js` (they set both `auth-token` and `Authorization`). Confirm token payload and `ADMIN_*` env values — admin endpoints use payload equality checks.

**Common, repo-specific patterns & gotchas**

- **Multiple token header forms**: `protect` and `adminAuth` accept `auth-token`, `Authorization: Bearer <token>`, or `token` — look for any of these when debugging failing requests.
- **Admin endpoints are strict**: `order.route.js` mounts `/list` behind `adminAuth`. If you see messages like `Token Failed, Not Authorized to change`, decode the token and compare `email`/`password` fields with `ADMIN_EMAIL`/`ADMIN_PASSWORD` in the backend `.env`.
- **CORS & ports**: `server.js` allows origins `http://localhost:5173` and `http://localhost:5174` — when adding a new dev client port, update `allowedOrigins`.
- **Axios interceptors**: both clients auto-redirect on `401` responses (they remove `localStorage` token/user and send to `/login`). Keep that in mind when writing integration/debug flows.

**Where to look when adding features**

- New API endpoints: add a route in `backend/routes/`, implement logic in `backend/controller/`, and use models in `backend/model/`.
- File uploads: add multer middleware in route then upload to Cloudinary using `backend/config/cloudinary.js` helpers.
- Admin-only UI flows: confirm admin login flow produces a JWT with `email` and `password` fields matching env values.

**Examples (how a request flows now)**

- Request: `GET http://localhost:5000/api/orders/list`
  - `backend/routes/order.route.js` → `adminAuth` middleware (`backend/middleware/admin.middleware.js`) → `backend/controller/order.controller.js` → `backend/model/order.model.js`.

**How to extend agent behavior**

- Prefer small, local changes — respect existing file layout and controllers. Follow the route→controller→model pattern.
- When modifying auth behavior, update both middleware and client interceptors (`admin/src/services/api.js`, `frontend/src/service/api.js`) to keep header expectations consistent.

If anything above is unclear or you want more examples (token payload format, key env samples, or a quick `curl` example to reproduce a failing admin endpoint), tell me which area to expand and I'll iterate.
