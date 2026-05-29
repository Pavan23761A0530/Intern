# KRR School Website Deployment Checklist

## Backend (Render) Environment Variables
- MONGO_URI: MongoDB Atlas connection string
- RAZORPAY_KEY_ID: Razorpay production key ID
- RAZORPAY_KEY_SECRET: Razorpay production key secret
- FRONTEND_URL: Render static site URL (e.g., https://your-frontend.onrender.com)

## Frontend (Render) Environment Variables
- VITE_API_URL: Render backend URL (e.g., https://your-backend.onrender.com)

## Deployment Steps
1. Push all changes to GitHub
2. Deploy backend to Render
3. Deploy frontend to Render
4. Verify health check: GET /api/health returns 200 OK
5. Verify hostel availability stats: GET /api/debug/hostel
6. Verify transport stats: GET /api/debug/transport
7. Test Razorpay payment flow
8. Verify receipt generation and download
9. Verify real-time updates via Socket.io

## Post-Deployment Checks
- [ ] Backend server starts without errors
- [ ] MongoDB connects successfully
- [ ] Auto-seeding runs if collections are empty
- [ ] Health check endpoints work
- [ ] Razorpay keys are set correctly
- [ ] Frontend loads without errors
- [ ] API calls from frontend work
- [ ] Real-time updates via Socket.io work
- [ ] Hostel availability is displayed correctly
- [ ] Transport dashboard loads data
- [ ] Payment flow works from start to finish
- [ ] Receipts are generated and downloaded
