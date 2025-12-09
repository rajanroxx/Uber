import React from 'react'

const Login = () => {
  return (
    <div>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f7f5f0] text-slate-900">
      
      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8">
          Login to continue your ride
        </p>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#f8c020] bg-slate-50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#f8c020] bg-slate-50"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button className="text-sm text-slate-600 hover:text-slate-900">
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#f8c020] font-semibold text-lg text-slate-900 shadow-md active:scale-95 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <span className="h-px flex-1 bg-slate-200"></span>
          <span className="px-4 text-sm text-slate-400">or</span>
          <span className="h-px flex-1 bg-slate-200"></span>
        </div>

        {/* Create account */}
        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <a href="" className="font-semibold text-slate-900 hover:underline">
            Sign up
          </a>
        </p>

      </div>

    </div>
    </div>
  )
}

export default Login
