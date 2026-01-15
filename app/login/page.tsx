"use client";

import { useState, use ,useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
// Import the phone input and styles
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function AuthPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ callbackUrl?: string }> 
}) {
  const router = useRouter();
  const resolvedSearchParams = use(searchParams);
  const callbackUrl = resolvedSearchParams?.callbackUrl || "/";
  
  const [page, setPage] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Billing toggle & state
  const [showcodeInput, setShowCodeInput] = useState(false);
  const [code, setcodeValue] = useState('');
  const [showBilling, setShowBilling] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [timer, setTimer] = useState(0);

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: loginEmail,
        password: loginPassword,
      });
      if (res?.error) setError(res.error);
      else router.push("/product");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //-----------------------------------------
  const handleSendCode = async () => {
    if (!regEmail) return setError("Please enter an email first");
    // STRICT VALIDATION
    if (!regName || !regPassword || !phone || !address || !city) {
      setError("All fields including billing address and phone are required.");
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/sendcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: regEmail }),
      });

      console.log(res);
      
      if (!res.ok) throw new Error("Failed to send verification email");
      
      setTimer(60); // Start 60s cooldown
      setShowCodeInput(true);
      setSuccess("Verification code sent! Please check your email.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Timer logic for resending code
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ---------------- REGISTER ----------------
  const handleRegister = async () => {
    setError('');
    
    // STRICT VALIDATION
    if (!regName || !regEmail || !regPassword || !phone || !address || !city) {
      setError("All fields including billing address and phone are required.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Phone length validation (Qatar numbers are usually 8 digits + prefix)
    if (phone.length < 8) {
        setError("Please enter a valid phone number");
        return;
    }

    setLoading(true);

    try {
      // 1. ATTEMPT SECONDARY SETUP (ZOHO/INVENTORY)
      const createcontact = await fetch('/api/inventory/createContacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          phone: phone,
          billing_address: {
            address,
            city,
            zip: postalCode || "00000",
            country: "Qatar",
          },
        }),
      });

      const secondaryData = await createcontact.json();
      if (!createcontact.ok) {
        throw new Error(secondaryData.error || "Inventory setup failed. Registration aborted.");
      }

      const extractedZohoId = secondaryData.data?.contact?.contact_id;

      // 2. CREATE USER IN YOUR DB
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zohoCusID: extractedZohoId,
          name: regName,
          email: regEmail,
          password: regPassword,
          phone,
          address,
          city,
          postalCode,
          code // Send the verification code entered by user
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      // 3. SUCCESS
      setSuccess("Registration successful!");
      await signIn("credentials", {
        email: regEmail,
        password: regPassword,
        redirect: true,
        callbackUrl,
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <style jsx global>{`
        .react-international-phone-input { width: 100% !important; border-radius: 0 0.75rem 0.75rem 0 !important; height: 50px !important; color: black !important; }
        .react-international-phone-country-selector-button { border-radius: 0.75rem 0 0 0.75rem !important; height: 50px !important; background: white !important; }
      `}</style>

      {page === "login" ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8 backdrop-blur">
          <h2 className="text-3xl text-center mb-6 text-gray-900 font-bold">Welcome Back</h2>
          {error && <p className="text-red-600 text-center mb-2 bg-red-50 p-2 rounded-lg">{error}</p>}
          {success && <p className="text-green-600 text-center mb-2">{success}</p>}

          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl placeholder-gray-600 text-black" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            {/* LOGIN PASSWORD WITH TOGGLE */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full p-3 border rounded-xl placeholder-gray-600 text-black pr-12" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500 hover:text-black"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            <button disabled={loading} onClick={handleLogin} className="w-full py-3 rounded-xl bg-yellow-400 text-white font-medium text-lg disabled:opacity-50">
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-900 mt-4">
            Don't have an account? <button onClick={() => { setPage('register'); setShowBilling(false); }} className="text-blue-600 hover:underline">Create one</button>
          </p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8 backdrop-blur mt-24 mb-10">
          <h2 className="text-3xl text-center mb-6 text-gray-900 font-bold">Create Your Account</h2>
          {error && <p className="text-red-600 text-center mb-4 bg-red-50 p-2 rounded-lg">{error}</p>}

          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-xl text-black" value={regName} onChange={(e) => setRegName(e.target.value)} />
            <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl text-black" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
            {/* Reg PASSWORD WITH TOGGLE */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full p-3 border rounded-xl placeholder-gray-600 text-black pr-12" 
                value={regPassword} 
                onChange={(e) => setRegPassword(e.target.value)} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500 hover:text-black"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Confirmed Password" 
                className="w-full p-3 border rounded-xl placeholder-gray-600 text-black pr-12" 
                value={regConfirmPassword} 
                onChange={(e) => setRegConfirmPassword(e.target.value)} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500 hover:text-black"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            
            <div className="phone-container">
               <PhoneInput
                defaultCountry="qa"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                className="w-full"
              />
            </div>

            {!showBilling && (
              <button
                onClick={() => {
                  if (!regName || !regEmail || !regPassword || !regConfirmPassword || !phone) {
                    setError("Please fill all account fields and phone number");
                    return;
                  }
                  setError("");
                  setShowBilling(true);
                }}
                className="w-full py-3 rounded-xl bg-yellow-400 text-white font-medium text-lg"
              >
                Next: Billing Details
              </button>
            )}
          </div>

          {showBilling && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 space-y-4 border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-900 text-center">Billing Information</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Address (Building, Street, Zone)" className="w-full p-3 border rounded-xl text-black" value={address} onChange={(e) => setAddress(e.target.value)} />
                <div className="flex gap-4">
                  <select className="w-1/2 p-3 border rounded-xl text-black bg-white" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="" disabled>Select City</option>
                    <option value="Doha">Doha</option>
                    <option value="Al Rayyan">Al Rayyan</option>
                    <option value="Al Wakrah">Al Wakrah</option>
                    <option value="Al Khor">Al Khor</option>
                    <option value="Al Shahaniya">Al Shahaniya</option>
                    <option value="Al Daayen">Al Daayen</option>
                    <option value="Umm Salal">Umm Salal</option>
                    <option value="Madinat ash Shamal">Madinat ash Shamal</option>
                  </select>
                  <div className="w-1/2 p-3 border rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center font-medium">Qatar</div>
                </div>
                <input type="text" placeholder="Postal Code (Optional - use 00000)" className="w-full p-3 border rounded-xl text-black" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                <button disabled={loading} onClick={handleSendCode} className="w-full py-3 rounded-xl bg-green-500 text-white font-medium text-lg disabled:opacity-50 hover:bg-green-600 transition-colors">
                  {loading ? "Sending Code..." : "Verify email"}
                </button>
                <button onClick={() => setShowBilling(false)} className="w-full text-sm text-gray-500 hover:text-gray-700">Go Back</button>
              </div>
            </motion.div>
          )}


          {showcodeInput && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 space-y-4 border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-900 text-center">Enter Verification Code</h3>
              <div className="space-y-4">
                <input type="text" placeholder="6-digit Code" className="w-full p-3 border rounded-xl text-black" value={code} onChange={(e) => setcodeValue(e.target.value)} />
                <button disabled={loading} onClick={handleRegister} className="w-full py-3 rounded-xl bg-yellow-400 text-white font-medium text-lg disabled:opacity-50 hover:bg-yellow-500 transition-colors">
                  {loading ? "Registering..." : "Complete Registration"}
                </button>
              </div>
            </motion.div>
          )}



          <p className="text-center text-sm text-gray-900 mt-4">
            Already have an account? <button onClick={() => { setPage('login'); setShowBilling(false); }} className="text-blue-600 hover:underline">Login</button>
          </p>
        </motion.div>
      )}
    </div>
  );
}