import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, IdCard, GraduationCap, MapPin, Phone, Loader2, Navigation, Clock, Bus, CheckCircle2, CreditCard, Receipt, IndianRupee } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TransportRegistration = ({ nearestInfo, searchedLocation, onRegisterSuccess, onManualLocationDetect }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    studentRollNo: '',
    studentClass: '',
    studentPhone: '',
    address: ''
  });

  const [registeredAssignment, setRegisteredAssignment] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (searchedLocation) {
      setFormData(prev => ({ ...prev, address: searchedLocation.name }));
    }
  }, [searchedLocation]);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    let currentNearestInfo = nearestInfo;
    let currentSearchedLocation = searchedLocation;

    try {
      // 1. If no nearest info detected yet, try to detect it from the address field
      if (!currentNearestInfo && formData.address) {
        toast.loading('Detecting nearest route from address...');
        const searchRes = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address + ' Eluru Andhra Pradesh')}&countrycodes=in&limit=1`
        );

        if (searchRes.data && searchRes.data.length > 0) {
          const loc = searchRes.data[0];
          const lat = parseFloat(loc.lat);
          const lng = parseFloat(loc.lon);
          
          const locationObj = {
            name: loc.display_name,
            lat,
            lng
          };
          currentSearchedLocation = locationObj;

          const detectRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/transport/find-nearest`, { lat, lng });
          if (detectRes.data.success) {
            currentNearestInfo = detectRes.data;
            // Notify parent component about the detected location to update map/stats
            if (onManualLocationDetect) {
              onManualLocationDetect(loc, detectRes.data);
            }
          }
        } else {
          toast.dismiss();
          toast.error('Could not find location for the entered address');
          setLoading(false);
          return;
        }
        toast.dismiss();
      }

      if (!currentNearestInfo) {
        toast.error('Please enter a valid village/address to detect a route');
        setLoading(false);
        return;
      }

      // 2. Proceed with registration
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/transport/register`, {
        ...formData,
        location: currentSearchedLocation,
        pickupPointId: currentNearestInfo.nearestPoint._id,
        routeId: currentNearestInfo.nearestPoint.route._id,
        busId: currentNearestInfo.nearestPoint.route.bus._id
      });

      if (response.data.success) {
        setRegisteredAssignment(response.data.data);
        toast.success('Registration details saved! Please proceed to payment.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    console.log('[TransportRegistration] handlePayment called');
    console.log('[TransportRegistration] Registered Assignment:', registeredAssignment);
    
    if (!registeredAssignment) {
      console.error('[TransportRegistration] No registered assignment');
      toast.error('Please register first');
      return;
    }

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      console.error('[TransportRegistration] Razorpay key missing');
      toast.error('Payment configuration missing');
      return;
    }

    setPaymentLoading(true);
    try {
      console.log('[TransportRegistration] Loading Razorpay SDK...');
      const isLoaded = await loadRazorpay();
      console.log('[TransportRegistration] Razorpay SDK loaded:', isLoaded, 'window.Razorpay exists:', !!window.Razorpay);
      
      if (!isLoaded || !window.Razorpay) {
        toast.error('Razorpay SDK failed to load');
        return;
      }

      // 1. Create Order
      console.log('[TransportRegistration] Creating transport order...');
      const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/transport/create-order`, {
        assignmentId: registeredAssignment._id,
        amount: registeredAssignment.fee
      });
      console.log('[TransportRegistration] Order response:', orderRes.data);

      if (!orderRes.data.success) throw new Error(orderRes.data.message || 'Order creation failed');

      const { order } = orderRes.data;
      console.log('[TransportRegistration] Order details:', order);

      // Log Razorpay key
      console.log('[TransportRegistration] Razorpay Key (from env):', import.meta.env.VITE_RAZORPAY_KEY_ID);

      // 2. Open Razorpay Popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR", // Add fallback
        name: "KRR BrightMinds School",
        description: "Transport Fee Payment",
        order_id: order.id,
        handler: async (response) => {
          console.log('[TransportRegistration] Razorpay payment success:', response);
          try {
            const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/transport/verify-payment`, {
              ...response,
              assignmentId: registeredAssignment._id
            });
            console.log('[TransportRegistration] Verify payment response:', verifyRes.data);

            if (verifyRes.data.success) {
              toast.success('Payment successful! Transport assigned.');
              
              // Trigger professional PDF download from backend
              const paymentId = verifyRes.data.paymentId || verifyRes.data.assignment?._id;
              console.log('[TransportRegistration] Downloading receipt for paymentId:', paymentId);
              if (paymentId) {
                window.location.href = `${import.meta.env.VITE_API_URL}/api/transport/receipt/${paymentId}`;
              }
              
              onRegisterSuccess(verifyRes.data.assignment);
            }
          } catch (err) {
            console.error('[TransportRegistration] Payment verification error:', err);
            toast.error(err.response?.data?.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: formData.studentName,
          contact: formData.studentPhone
        },
        theme: { color: "#3b82f6" },
        modal: {
          ondismiss: () => {
            console.log('[TransportRegistration] Razorpay modal dismissed');
            toast.error('Payment cancelled');
          }
        }
      };

      console.log('[TransportRegistration] Opening Razorpay with options:', options);
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('[TransportRegistration] Razorpay payment failed:', response);
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error('[TransportRegistration] Payment initialization error:', error);
      toast.error(error.response?.data?.message || 'Payment initialization failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div id="transport-registration" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {/* Registration Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600/20 rounded-2xl">
            <IdCard className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold">Transport Registration</h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Student Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={formData.studentName}
                  onChange={e => setFormData({...formData, studentName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Student ID</label>
              <div className="relative">
                <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  placeholder="ID Number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={formData.studentId}
                  onChange={e => setFormData({...formData, studentId: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Class</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  placeholder="e.g. 10th Grade"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={formData.studentClass}
                  onChange={e => setFormData({...formData, studentClass: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="tel"
                  placeholder="Parent Contact"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={formData.studentPhone}
                  onChange={e => setFormData({...formData, studentPhone: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Village / Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                required
                type="text"
                placeholder="Residential Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
            Save & Check Route
          </button>
        </form>
      </motion.div>

      {/* Details and Payment Section */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {nearestInfo ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl" />
              
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bus className="w-5 h-5 text-blue-400" />
                Selected Transport Details
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Assigned Route</p>
                  <p className="font-bold text-white">{nearestInfo.nearestPoint.route.routeName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Bus Number</p>
                  <p className="font-bold text-white">{nearestInfo.nearestPoint.route.bus.busNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Pickup Timing</p>
                  <p className="font-bold text-green-400">{nearestInfo.nearestPoint.route.timing.pickup}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Driver</p>
                  <p className="font-bold text-white">{nearestInfo.nearestPoint.route.bus.driverName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 mb-8">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Navigation className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Distance from School</p>
                  <p className="text-sm font-bold">{nearestInfo.distanceToSchool.toFixed(2)} km</p>
                </div>
              </div>

              {/* Payment Section */}
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Payment Section</h4>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Transport Fee (Annual)</p>
                    <div className="flex items-center gap-1 text-2xl font-bold text-white">
                      <IndianRupee className="w-5 h-5" />
                      {nearestInfo.nearestPoint.route.fee.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                      registeredAssignment?.paymentStatus === 'paid' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {registeredAssignment?.paymentStatus || 'Pending Payment'}
                    </span>
                  </div>
                </div>

                <button
                  disabled={!registeredAssignment || paymentLoading || registeredAssignment?.paymentStatus === 'paid'}
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-700 disabled:to-gray-800 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                >
                  {paymentLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                  {registeredAssignment?.paymentStatus === 'paid' ? 'Payment Completed' : 'Pay Now with Razorpay'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-[2.5rem] border-dashed text-center"
            >
              <div className="p-4 bg-white/5 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-gray-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-400 mb-2">No Location Detected</h4>
              <p className="text-sm text-gray-500 max-w-[250px]">
                Search for your village or area to automatically detect the nearest bus route and fee details.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TransportRegistration;
