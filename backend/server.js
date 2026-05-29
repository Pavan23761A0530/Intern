const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dns = require('dns');

// Fix for querySrv ECONNREFUSED by setting DNS servers manually
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Load env vars
dotenv.config();

// --- Environment variable validation
const requiredEnvVars = [
  'MONGO_URI',
  'PORT',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'FRONTEND_URL'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('FATAL ERROR: Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

console.log('✅ All required environment variables loaded successfully');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.error(`❌ Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });

// Import models for debug APIs
const HostelRoom = require('./models/HostelRoom');
const { Bus, Route, PickupPoint, TransportAssignment, TransportPayment } = require('./models/Transport');
const { HostelPayment } = require('./models/HostelPayment');

// Routes
const feeRoutes = require('./routes/feeRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const transportRoutes = require('./routes/transportRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const hostelApplicationRoutes = require('./routes/hostelApplicationRoutes');
const hostelPaymentRoutes = require('./routes/hostelPaymentRoutes');

// --- Health & Debug APIs
app.get('/api/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbConnected = dbState === 1;
    
    // Check transport models exist
    const transportHealth = await HostelRoom.countDocuments().catch(() => 0);
    const hostelHealth = await HostelRoom.countDocuments().catch(() => 0);

    res.status(200).json({
      success: true,
      database: dbConnected,
      transport: true,
      hostel: true,
      payment: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/debug/transport', async (req, res) => {
  try {
    const [buses, routes, pickupPoints, assignments, payments] = await Promise.all([
      Bus.countDocuments(),
      Route.countDocuments(),
      PickupPoint.countDocuments(),
      TransportAssignment.countDocuments(),
      TransportPayment.countDocuments()
    ]);
    res.status(200).json({
      success: true, data: { buses, routes, pickupPoints, assignments, payments } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/debug/hostel', async (req, res) => {
  try {
    const [rooms, payments] = await Promise.all([
      HostelRoom.countDocuments(),
      HostelPayment.countDocuments()
    ]);
    res.status(200).json({ success: true, data: { rooms, payments } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/debug/payment', async (req, res) => {
  res.status(200).json({
    success: true, data: {
      razorpayKeyId: process.env.RAZORPAY_KEY_ID ? 'set' : 'missing'
    }
  });
});

// --- Normal Routes
app.use('/api/fees', feeRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/hostels', hostelRoutes);
app.use('/api/hostel', hostelRoutes); // For compatibility with frontend's "hostel"
app.use('/api/hostel-applications', hostelApplicationRoutes);
app.use('/api/hostel-payments', hostelPaymentRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('KRR BrightMinds School API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
