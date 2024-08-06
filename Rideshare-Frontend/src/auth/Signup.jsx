import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import image from './image.png'

function Signup() {
  const [formData, setFormData] = useState({name:"",email:"",password:"",confirmPassword:""});
  const [errors,setErrors] = useState({name:"",email:"",password:"",confirmPassword:""});
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleSubmit = async (e) => { 
        
  e.preventDefault();
  setErrors({});
  let count = 0;
  const validationErrors  = {name: "", email:"",password: "", confirmPassword:""};
  if (!formData.email) {
      validationErrors.email = 'Email is required';
      count++;
  }
  if (!formData.password) {
      validationErrors.password = 'Password is required';
      count++;
  }
  if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
      count++;
    }
   
  if (count > 0) {
      setErrors(validationErrors);
      return;
  }
  
  fetch(`${import.meta.env.VITE_BACKEND_API}/auth/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
})
.then((res) => {
    
    return res.json();
})
.then((response) => {
    
    if (response.ok) {
        toast(response.message, {
            type: 'success',
            position: 'top-right',
            autoClose: 2000
        })
        setFormData(
            {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        )
    } else {
        toast(response.error, {
            type: 'error',
            position: 'top-right',
            autoClose: 2000
        });
        // alert(response.error);
    }
})
.catch((error) => {
    toast(error.message, {
        type: 'error',
        position: 'top-right',
        autoClose: 2000
    });
})
}
var inputstyles ='p-2 rounded-lg border border-black flex-1 placeholder:text-center placeholder:text-slate-700 w-full';
return(
    <>
    
    
    <div className="authout flex w-full mt-0 bg h-[700px]  items-center p-4 justify-between align-middle bg-auto sign"  >
    <div className="flex items-center justify-center  w-[50%]  ">
    <div className='flex justify-center items-center'>
     <img src={image} alt="Sample" className="  w-64 object-contain" />
     </div>
      
  </div>
        <div className="authin flex w-[70%]">


        


            <div className="right-side flex flex-col items-stretch w-full">
                <form action="" className='flex flex-col justify-between  h-80 ' onSubmit={handleSubmit}>
                 <div className="forminputcont flex justify-between  items-center" >
                    <label htmlFor="name" className='mr-4 font-bold text-xl'>Name</label>

                    <input type="text" id='name' placeholder='enter your username here' name="name" value ={formData.name} onChange={handleChange} className='p-2 rounded-lg border border-black flex-1 placeholder:text-center placeholder:text-slate-700 w-full'/>
                    {errors.name && <span className="formerror">{errors.name}</span>}
                 </div>
                 <div className="forminputcont flex items-center">
                    <label htmlFor="email" className='mr-4 font-bold text-xl'>Email</label>
                    <input type="text" id='email' placeholder='enter your username here' name="email" value ={formData.email} onChange={handleChange} className={inputstyles}/>
                    {errors.email && <span className="formerror">{errors.email}</span>}
                 </div>
                 <div className="forminputcont flex items-center">
                    <label htmlFor="password" className='mr-4 font-bold text-xl'>Password</label>
                    <input type="password" id='password' placeholder='enter your password  here' name="password" value ={formData.password} onChange={handleChange} className={inputstyles}/>
                    {errors.password && (
                                <span className="formerror">{errors.password}</span>
                            )}
                 </div>
                 <div className="forminputcont flex items-center">
                    <label htmlFor="confirmation" className='mr-4  text-lg font-bold'>Confirm Password</label>
                    <input type="password" id='confirmation' placeholder='please confirm your password' name="confirmPassword" value ={formData.confirmPassword} onChange={handleChange} className={inputstyles}/>
                    {errors.confirmPassword && (
                                <span className="formerror">{errors.confirmPassword}</span>
                            )}
                 </div>
                 <div className='flex justify-center mt-4'>
                 <button type='submit' className='bg-black text-white hover:bg-slate-600 p-2 rounded-lg'> Submit</button></div>
                 <div className='flex flex-col
                 items-center'>
                 <p className='inline-block font-bold'>Already have an account?  </p><Link to='/auth/signin'className='bg-black text-white hover:bg-slate-600 px-4 py-2 rounded-lg text-center'> <u>Login</u></Link></div>

                </form>
                
            </div>
        </div>
    </div>
    <ToastContainer></ToastContainer>
    </>
  )
}

export default Signup