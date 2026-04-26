import React, { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockIcon, UserCircle2Icon } from 'lucide-react'

const LoginPage = () => {
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);

  const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='hidden md:flex w-1/2 bg-indigo-950 relative overflow-hidden border-r border-slate-200 loginDisplayImg'>
        <div className='absolute -top-30 -right-30 w-72 h-72 bg-[#111C2D] rounded-full blur-3xl'></div>

        <div className='relative z-10 flex flex-col items-start justify-between p-12 lg-p-20 w-full h-full'>
          <div>
            <img src="systemLogo1.png" alt="" className='h-15'/>
          </div>

          <div>
            <h1 className='text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight tracking-tight'>Centalize and Take Control of Your <span>Operations</span></h1>
            <p className='text-slate-400 text-lg max-w-md leading-relaxed'>Manage your enterprise resources with the clarity and calm of a high-end service.</p>
          </div>

          <div className='flex space-x-5'>
            <div className='flex flex-col space-y-1 border-r-1 border-muted-foreground/30 pr-5'>
              <span className='text-primary-brighter text-xs font-black'>CLOUD HOSTED</span>
              <span className='text-muted-foreground text-xs'>99.99% Availability</span>
            </div>
            <div className='flex flex-col space-y-1 border-r-1 border-muted-foreground/30 pr-5'>
              <span className='text-primary-brighter text-xs font-black'>ACCESS CONTROL</span>
              <span className='text-muted-foreground text-xs'>Role-Based (RBAC)</span>
            </div>
            <div className='flex flex-col space-y-1 '>
              <span className='text-primary-brighter text-xs font-black'>DATA ENCRYPTION</span>
              <span className='text-muted-foreground text-xs'>256-bit AES Standard</span>
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col justify-center items-center md:w-1/2 bg-background/70 min-h-screen'>
        <div className='w-fit lg:w-125 mx-auto px-10'>
          <div className='mb-10'>
            <h1 className='font-bold text-4xl mb-1'>Welcome Back!</h1>
            <p className='text-muted text-lg'>Please enter your credentials to access the suite.</p>
          </div>

          <div>
            <div className='mb-10'>
              <div className='mb-1'>
                <span className='text-xs font-semibold uppercase tracking-widest'>Username</span>
              </div>
              <div className='flex items-center border border-gray-200 rounded-2xl bg-white/60 px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-300 gap3 focus-within:ring-2 focus:bg-white/80'>
                <UserCircle2Icon size={20} className='text-gray-500' />
                <input 
                  type="text" 
                  name="" 
                  id="" 
                  placeholder='Joe123'
                  className='h-10 pl-5 w-full bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400' 
                />
              </div>
            </div>

            <div className='mb-10'>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-xs font-semibold uppercase tracking-widest'>Password</span>
                <span className='text-xs font-semibold uppercase tracking-widest hover:cursor-pointer hover:text-primary transition-colors duration-200'>Forgot Password?</span>
              </div>
              <div className='flex items-center border border-gray-200 rounded-2xl bg-white/60 px-4 py-2 shadow-sm shadow-sm hover:shadow-md transition-shadow duration-300 gap3 focus-within:ring-2 focus:bg-white/80'>
                <LockIcon size={20} className='text-gray-500' />
                <input 
                  type={ isPasswordVisible? "text": "password" } 
                  name="" 
                  id="" 
                  placeholder='**********'
                  className='h-10 pl-5 w-full bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400' 
                />
                <button type='button' className='text-gray-500 hover:text-primary transition-colors duration-200 hover:cursor-pointer' onClick={toggleVisibility}>
                  {
                    isPasswordVisible ? <Eye size={20}/> : <EyeOff size={20}/>
                  }
                </button>
              </div>
            </div>

            <div className='mb-10'>
              <div className='flex items-center'>
                <input 
                  type="checkbox" 
                  name="" 
                  id=""  
                  className='h-5 w-5 rounded-md appearance-none border border-gray-400 bg-transparent 
                            checked:bg-primary checked:border-primary cursor-pointer
                            relative checked:after:content-["✓"] checked:after:text-white 
                            checked:after:text-xs checked:after:flex checked:after:items-center 
                            checked:after:justify-center'                  />
                <span className='pl-3 text-muted'>Keep me signed in</span>
              </div>
            </div>

            <div>
              <button type="button" className='w-full rounded-2xl h-15 flex justify-center items-center space-x-4 bg-primary text-white shadow-sm hover:shadow-lg hover:bg-primary/90 hover:cursor-pointer'>
                  Sign In <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage