// src/pages/CreateFeedback.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CreateFeedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    feedback: '',
    trip_id: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/feedback/createFeedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
        credentials: 'include',
      });

      const result = await response.json();
      if (response.ok) {
        toast(result.message, {
          type: 'success',
          position: 'top-right',
          autoClose: 2000,
        });
        navigate('/dashboard');
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

  return (
    <>
    
      <div className="flex items-center justify-center p-8 min-h-screen bg-gray-100">
        <div className='flex justify-start mr-8'> <h1 className='text-4xl font-bold font-mono inline mr-2'>Sumit Your Feedback</h1></div>
     
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
            <input
              type="number"
              name="rating"
              value={feedbackData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Feedback</label>
            <textarea
              name="feedback"
              value={feedbackData.feedback}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Trip ID</label>
            <input
              type="text"
              name="trip_id"
              value={feedbackData.trip_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateFeedback;
