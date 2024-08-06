// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
 'react-router-dom';
 import { Navigate,useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  const [current,setRide] = useState({
    _id: '',
    driverName:'',
    driverPhoneNumber:'',
    cabNumber:'',
    source:' ',
    destination:'',
    companion:' ',
    companionPhoneNumber:'',
    status:Boolean

  });
  const [userData, setUserData] = useState({
    name:"",
    email:'',
  });
  const [rides, setRides] = useState([]);
  const checkLogin= () =>{
    fetch(`${import.meta.env.VITE_BACKEND_API}/auth/checkLogin`,{
     method:"GET",
     headers:{
         'Content-Type': 'application/json',
     },
     credentials: 'include'
    }).then((res)=>{return res.json()}).then((response)=>{
      if(!response.ok){
          navigate('/auth/signin')
          toast(response.error, {
            type: 'error',
            position: 'top-right',
            autoClose: 2000
        })
      }
    })
  }
  const change = async(body)=>{
     setRide({
      ...current,
      _id:body._id,
      status:1
     })
  }
  const handlechange = async(body)=>{
    setRide(body);
    await change(body);

  }
  const handleEnd= async (e,id)=>{
   

 
    
    // console.log(current);
   
   await fetch(`${import.meta.env.VITE_BACKEND_API}/ride/updateRide`,{
      method:"PUT",
      headers:{
          'Content-Type': 'application/json',
         
          
      },
      body:JSON.stringify({_id:id}),
      credentials: 'include'
     }).then((res)=>{return res.json()}).then((response)=>{
       if(response.ok){
           
           toast(response.message, {
             type: 'success',
             position: 'top-right',
             autoClose: 2000
         })
         fetchRidesData()
         
       }
       else{
        toast(response.message, {
          type: 'error',
          position: 'top-right',
          autoClose: 2000
      })
       }
       
     })
             
  }



  const fetchRidesData = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/ride/`, {
        method: 'GET',
        credentials:'include'
      });

      const data = await response.json();

      if (response.ok) {
        setRides(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching rides data:', error);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      const result = await response.json();
      if (response.ok) {
        toast(result.message, {
          type: 'success',
          position: 'top-right',
          autoClose: 2000,
        });
        navigate('/auth/signin');
      } else {
        toast(result.error, {
          type: 'error',
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast(error.message, {
        type: 'error',
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };
  
  useEffect(() => {
   
    checkLogin();

    fetchRidesData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col text-black items-center justify-center bg-gray-200">
      <div className="flex justify-between w-full max-w-5xl">
  
    <button
      className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg"
      onClick={handleLogout}
    >
         Logout
      </button>
    </div>

      <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="flex space-x-4">
        <Link to="/createFeedback" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">
          Create Feedback
        </Link>
        <Link to="/getyourfeedbacks" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg">
          View Your Feedbacks
        </Link>
        <Link to="/all-feedbacks" className="bg-purple-500 text-white px-6 py-3 rounded-lg text-lg">
          View All Feedbacks
        </Link>
      </div>
    </div>
      <div className="bg-white p-8 rounded shadow-md w-96">
       <Link to='/createRide'><button className='bg-gray-500 text-white p-2 rounded-lg'>Create New Ride</button></Link> 
        
        {/* Display other user-specific data here */}
        <h3 className="text-xl mt-6 mb-4">Your Rides</h3>
        {rides.length > 0 ? (
          <ul>
            {rides.map((ride) => (
             
              <li key={ride._id} className="my-4 text-black">
                <hr className='mb-2' />
                <p>Ride ID: {ride._id}</p>
                <p>DriverName: {ride.driverName}</p>
                <p>DriverPhoneNumber: {ride.driverPhoneNumber}</p>
                <p>CabNumber: {ride.cabNumber}</p>
                <p>Source: {ride.source}</p>
                <p>Destination: {ride.destination}</p>
                <p>Status: {ride.status}</p>
                
                please copy the trip id before ending the ride
                {/* Add more ride details as needed */}
                {
                  !ride.status?
                <button className='bg-red-500 text-white p-2 rounded-md' onClick={async(e)=>{
                  await handleEnd(e,ride._id);
                  navigate('/createFeedback')

                }} type="submit" name="status" value={1}>Click To End</button>

                :
                <button className='bg-yellow-500 text-white p-2 rounded-md my-2'>Ride ended</button>
                }
               <hr className='mt-2'/>
              </li>
             
            ))}
         
          </ul>
          
        ) : (
          <p>No rides found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
