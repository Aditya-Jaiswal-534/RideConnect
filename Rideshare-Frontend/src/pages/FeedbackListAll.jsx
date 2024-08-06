// src/pages/FeedbackListAll.jsx

import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const FeedbackListAll = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/feedback/allFeedbacks`, {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {loading ? (
        <p className="text-xl font-semibold">Loading...</p>
      ) : (
        <>
          {feedbacks.length > 0 ? (
            <div className="w-full max-w-5xl p-6 bg-white rounded shadow-md">
              <h2 className="text-3xl font-bold mb-6">All Feedbacks</h2>
              <ul className="space-y-4">
                {feedbacks.map((feedback) => (
                  <li key={feedback._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <p className="text-lg"><strong>Rating:</strong> {feedback.rating}</p>
                    <p className="text-lg"><strong>Feedback:</strong> {feedback.feedback}</p>
                    <p className="text-lg"><strong>Traveler:</strong> {feedback.traveler}</p>
                    <p className="text-lg"><strong>Trip ID:</strong> {feedback.trip_id}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xl font-semibold">No feedbacks found.</p>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default FeedbackListAll;
