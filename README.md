# 🖥️ **README for FRONTEND (`frontend/README.md`)**

```md
# 💸 Expense Tracker Frontend (React)

A minimal UI for recording and tracking personal expenses via the backend API.

This UI is intentionally simple and focuses on correctness & clarity over styling.

---

## ✨ Features

✔ Add expenses (amount, category, description, date)  
✔ Display full expense list  
✔ Filter by category  
✔ Sort by newest date  
✔ Display total of visible expenses  
✔ Automatically refresh after adding new expense  
✔ Decimal-safe rendering for money values  

---

## 🧰 Tech Stack

- React (Vite)
- Axios for API requests
- UUID for idempotency tokens
- CSS (simple custom styling)

---

## 📡 API Integration

Uses environment variable:

VITE_API_URL=http://localhost:4000

yaml
Copy code

Connects to backend endpoints:
- `POST /expenses`
- `GET /expenses`

---

## 💳 Money Display Handling

Backend uses `Decimal128`, so frontend normalizes values:

```js
const getAmount = (amount) => {
  if (typeof amount === "object" && amount.$numberDecimal) {
    return Number(amount.$numberDecimal);
  }
  return Number(amount);
};
Ensures accurate total + display.

📊 Real-World Behavior
Handles:

Duplicate clicks (idempotent backend)

Browser refreshes (backend persistence)

Network retries (UUID tokens)

🏗️ Setup & Usage
1. Install
sh
Copy code
cd frontend
npm install
2. Configure Env
Create .env:

ini
Copy code
VITE_API_URL=http://localhost:4000
3. Run
sh
Copy code
npm run dev
Frontend starts at:

arduino
Copy code
http://localhost:5173