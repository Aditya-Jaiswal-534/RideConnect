import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify';
import image from './image.png'


function Signin() {
   const [errors,setErrors] = useState({email:"",password:""})
   const [data,setData] = useState({email:"",password:""})
   const handleChange = (e) => {
    const {name,value} = e.target;
    setData(
      {
        ...data,
        [name]:value
      }
    )
   }


   const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrors({});
    let count =0;
    const validationErrors = {email:"",password:""};
    if(!data.email){
      validationErrors.email = "email is required";
      count++;
    }
    if(!data.password){
      validationErrors.password = "password  is required";
      count++;
    }
    if(count>0){
      setErrors(validationErrors);
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_API}/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials:'include',
  })
  .then((res) => {
      
      return res.json();
  })
  .then((response) => {
      
      if (response.ok) {
        const token = response.token 
        const user = response.user
        toast(response.message , {
          type: 'success',
          position: 'top-right',
          autoClose: 2000
      });
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user);
      window.location.href="/dashboard";
      
          setData(
              {
               
                  email: '',
                  password: '',
              
              }
          )
      } else {
        // alert(response.error);
          toast(response.error, {
              type: 'error',
              position: 'top-right',
              autoClose: 2000
          });
          
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
   const checkLogin= () =>{
    fetch(`${import.meta.env.VITE_BACKEND_API}/auth/checkLogin`,{
     method:"GET",
     headers:{
         'Content-Type': 'application/json',
     },
     credentials: 'include'
    }).then((res)=>{return res.json()})
 }
   var inputstyles ='p-2 rounded-lg border text-black border-black flex-1 placeholder:text-center placeholder:text-slate-700 w-full';
  return (
    <>

  
    <div className="authout flex w-full bg h-[700px] p-4 items-center justify-center bg-auto sign">
    <div className="flex items-center justify-center  w-[50%]  ">
    <div className='flex justify-center items-center'>
     <img src={image} alt="Sample" className="  w-64 object-contain" />
     </div>
      
  </div>
        <div className="authin flex w-[70%]">
           
            <div className="right-side flex flex-col items-stretch w-full">
                <form action=""  className='flex flex-col justify-between  h-80 ' onSubmit={handleSubmit}>
                 <div className="forminputcont flex justify-between  items-center">
                    <label htmlFor="email" className='mr-4 font-bold text-xl'>Email</label>
                    <input type="text" id='email' placeholder='enter your email here'  name="email" onChange={handleChange} className={inputstyles}/>
                    {errors.email && <span className="form-error">{errors.email}</span>}
                 </div>
                 <div className="forminputcont flex justify-between  items-center">
                    <label className='mr-4 font-bold text-xl'htmlFor="password">Password</label>
                    <input type="password" id='password' placeholder='enter your password  here' name="password"  onChange={handleChange}  className={inputstyles}/>
                 </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
                <div className='flex justify-center mt-4'>
                <button type='submit' className='bg-black text-white hover:bg-slate-600 p-4 rounded-lg'> Login</button></div>
                <div className='flex justify-center'>
                <p className='inline-block font-bold'>Don't have an account?  </p>
                </div>
                <div className='flex flex-col
                 items-center'>
                <Link to='/auth/signup'className='bg-black text-white hover:bg-slate-600 px-4 py-2 rounded-lg text-center'> <u>SignUp</u></Link></div>

                </form>
                
            </div>
        </div>
    </div>
    <ToastContainer></ToastContainer>
    </>
  )
}

export default Signin