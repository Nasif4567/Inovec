'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const router = useRouter();
  const [page, setPage] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Handle Login
  // Replace your handleLogin with:
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
    else router.push("/product"); // redirect after login
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  // Handle Registration
  const handleRegister = async () => {
    setError('');
    setLoading(true);

    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccess('Registration successful! You can now log in.');
      setPage('login');
      setRegName(''); setRegEmail(''); setRegPassword(''); setRegConfirmPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      {page === "login" ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8 backdrop-blur">
          <h2 className="text-3xl text-center mb-6 text-gray-900">Welcome Back</h2>

          {error && <p className="text-red-600 text-center mb-2">{error}</p>}
          {success && <p className="text-green-600 text-center mb-2">{success}</p>}

          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 border rounded-xl placeholder-gray-600 text-black"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-3 border rounded-xl placeholder-gray-600 text-black"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              disabled={loading}
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium text-lg disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <p className="text-center text-sm text-gray-900 mt-4">
            Don't have an account? <button onClick={() => setPage('register')} className="text-blue-600 hover:underline">Create one</button>
          </p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8 backdrop-blur">
          <h2 className="text-3xl text-center mb-6 text-gray-900">Create Your Account</h2>

          {error && <p className="text-red-600 text-center mb-2">{error}</p>}
          {success && <p className="text-green-600 text-center mb-2">{success}</p>}

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-3 border rounded-xl placeholder-gray-600 text-black"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 border rounded-xl placeholder-gray-600 text-black"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-3 border rounded-xl placeholder-gray-600 text-black"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              className="w-full p-3 border rounded-xl placeholder-gray-600 text-black"
              value={regConfirmPassword}
              onChange={(e) => setRegConfirmPassword(e.target.value)}
            />
            <button
              disabled={loading}
              onClick={handleRegister}
              className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium text-lg disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
          <p className="text-center text-sm text-gray-900 mt-4">
            Already have an account? <button onClick={() => setPage('login')} className="text-blue-600 hover:underline">Login</button>
          </p>
        </motion.div>
      )}
    </div>
  );
}
