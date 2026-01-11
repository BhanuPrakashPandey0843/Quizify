import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-20 font-sans">
      <div className="max-w-6xl w-full mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
             <img src="https://th.bing.com/th/id/OIP.vlG3sSKcA4qvJIeaO58Y5AAAAA?rs=1&pid=ImgDetMain" 
             alt="Login Illustration"
             className="w-full max-w-lg object-contain rounded-lg" />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white shadow-2xl rounded-2xl p-10 relative z-10">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 font-sans">
              Login to your account
            </h2>
            
            <form className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  placeholder="Your Name" 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  placeholder="••••••••" 
                  type="password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              <button 
                type="button"
                className="w-full bg-primary text-white py-3 rounded-full text-lg font-bold shadow-lg hover:bg-blue-900 transition transform hover:scale-105"
              >
                Login
              </button>
            </form>

             <p className="mt-4 text-center text-gray-600">
              Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
