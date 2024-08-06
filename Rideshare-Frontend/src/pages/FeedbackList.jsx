// src/pages/FeedbackList.jsx

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/feedback`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const result = await response.json();
        if (response.ok) {
          setFeedbacks(result.data);
        } else {
          toast(result.msg, {
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
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {feedbacks.length > 0 ? (
            <div className="w-full max-w-4xl p-4 bg-white rounded shadow-md">
              <h2 className="text-2xl font-bold mb-4">Your Feedbacks</h2>
              <ul>
                {feedbacks.map((feedback) => (
                  <li key={feedback._id} className="mb-4 p-4 border rounded">
                    <p><strong>Rating:</strong> {feedback.rating}</p>
                    <p><strong>Feedback:</strong> {feedback.feedback}</p>
                    <p><strong>Trip ID:</strong> {feedback.trip_id}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No feedbacks found.</p>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default FeedbackList;
