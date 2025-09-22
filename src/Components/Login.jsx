import { User, Key, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axiosInstance from "../api/axios";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => window.history.back();

  // const tryLogin = (e) => {
  //   // If called from a keyboard event, prevent default (avoid form submit / page reload)
  //   if (e && e.preventDefault) e.preventDefault();
  //   if (email.trim() && password) {
  //    toast.success('login successfull')
  //     navigate('/admin-dashboard');
  //   } else {
  //     // optional: you can show a toast or focus the empty field
  //     // alert('Please enter email and password');
  //   }
  // };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try{
        console.log("Sending", { email, password });

    


      navigate('/admin-dashboard');


      }
      catch(e){
        console.log("Error Response:", e.response);

        alert('Please enter Valid email and password');
        console.log(e);

      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Go Back Button */}
      <button 
        onClick={handleGoBack}
        className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6 text-black" />
      </button>
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-light text-black mb-12">Admin Login</h1>
        </div>

        {/* No visible button — Enter on inputs triggers login */}
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white" />
            </div>
            <input
              type="email"
              placeholder="www.etc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-4 py-4 bg-black text-white placeholder-gray-300 border-0 rounded-lg text-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-white" />
            </div>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-4 py-4 bg-black text-white placeholder-gray-300 border-0 rounded-lg text-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
