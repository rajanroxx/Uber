import React from 'react'
const Start = () => {
  return (
    <div className='min-h-screen flex flex flex-column bg-[#f7f5f0] text-slate-900'>
        <div className='flex-1 flex flex-col item-center px-6 py-16'>
        <div className='w-full max-w-md rounded-3xl overflow-hidden shadow-xl'>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpr8t-i5NtERiuRD8cwVtEZecViJuo2dnmVO11CTPvd_ESGpRhPvOVH8RQ05y5IfWvk5FmV8P4KKyO7zIMOu16hudU2IMedGllTr9O3NwGD6g7Je79bZIa3KtnxbWwj3YtG3_VY_ZVTudOrCBSVHFBIZnuXL3Lv6RyUEY-Ouxf7YlBfyovQqqh08gr2CdVa9qmYlCnoDdH4aH7gA8wlgq31N-uq12dS0B6MUeYRQmQznXMhhnmspabShOcahezN21x-qofFIOK2ndn" 
        alt="image" className='w-full h-full object-cover '/>
        </div>

        <h1 className='text-4xl font-semibold text-center mt-10 leading-tight tracking-tight'>Your City, Your <br/> Ride.</h1>
        <p className='text-center text-slate-500 text-base max-w-md mt-4'>Get anywhere, anytime with fast, safe, and affordable rides.</p>

        <div className='px-6 pb-10 mt-10'>
          <a href='/login'>
            <button className='w-full max-w-md mx-auto py-4 rounded-full bg-[#f8c020] text-lg font-semibold text-slate-900 shadow-xl active:scale-95 transition'>
                Start Your Ride
            </button></a>
        </div>
    </div>
    </div>
  )
}

export default Start
