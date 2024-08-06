// src/pages/CreateRide.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CreateRide = () => {
  const [formData, setFormData] = useState({
    driverName: '',
    driverPhoneNumber: '',
    cabNumber: '',
    source: '',
    destination: '',
    companion: '',
    companionPhoneNumber: '',
  });

  const [isSharing, setIsSharing] = useState(false); // State to check if "Create and Share Ride" is clicked
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e, share = false) => {
    e.preventDefault();

    if (share && (!formData.companion || !formData.companionPhoneNumber)) {
      toast('Companion name and phone number are required for sharing.', {
        type: 'error',
        position: 'top-right',
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/ride/createRide`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           // Assuming token is stored in local storage
        },
        body: JSON.stringify(formData),
        credentials:'include'
      });

      const result = await response.json();

      if (result.ok) {
        if (share) {
          const notificationResponse = await fetch(`${import.meta.env.VITE_BACKEND_API}/notification/send`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify(formData),
            credentials:'include',
          });

          const notificationResult = await notificationResponse.json();

          if (notificationResult.ok) {
            toast('Ride created and notification sent successfully!', {
              type: 'success',
              position: 'top-right',
              autoClose: 2000,
            });
          } else {
            toast(notificationResult.message, {
              type: 'error',
              position: 'top-right',
              autoClose: 2000,
            });
          }
        } else {
          toast('Ride created successfully!', {
            type: 'success',
            position: 'top-right',
            autoClose: 2000,
          });
        }

        navigate('/dashboard'); // Redirect to dashboard after successful operation
      } else {
        toast(result.message, {
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

  return (
    <>
      <div className="create-ride p-4">
        <h2 className="text-2xl font-bold mb-4">Create Ride</h2>
        <form onSubmit={(e) => handleSubmit(e, isSharing)}>
          <div className="form-group mb-4">
            <label htmlFor="driverName" className="block text-lg font-medium">Driver Name</label>
            <input
              type="text"
              id="driverName"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="driverPhoneNumber" className="block text-lg font-medium">Driver Phone Number</label>
            <input
              type="text"
              id="driverPhoneNumber"
              name="driverPhoneNumber"
              value={formData.driverPhoneNumber}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="cabNumber" className="block text-lg font-medium">Cab Number</label>
            <input
              type="text"
              id="cabNumber"
              name="cabNumber"
              value={formData.cabNumber}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="source" className="block text-lg font-medium">Source</label>
            <input
              type="text"
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="destination" className="block text-lg font-medium">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="companion" className="block text-lg font-medium">Companion</label>
            <input
              type="text"
              id="companion"
              name="companion"
              value={formData.companion}
              onChange={handleChange}
              className="p-2 border rounded"
              
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="companionPhoneNumber" className="block text-lg font-medium">Companion Phone Number</label>
            <input
              type="text"
              id="companionPhoneNumber"
              name="companionPhoneNumber"
              value={formData.companionPhoneNumber}
              onChange={handleChange}
              className="p-2 border rounded"
             
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              onClick={() => setIsSharing(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Ride
            </button>
            <button
              type="submit"
              onClick={() => setIsSharing(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create and Share Ride
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateRide;
