import React from 'react'
import RequestCard from '../Componentsmain/requestCard'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../lib/requestSlice';
import { useEffect } from 'react';
import axios from 'axios';

// http://localhost:3000/request/received
const Matches = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/request/received', { withCredentials: true });
        dispatch(addRequests(response.data.message));
        console.log('Received requests:', response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
  useEffect(() => {
   
    fetchRequests();
  }, [dispatch]);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-foreground">No Requests Yet</h2>
        <p className="text-muted-foreground text-sm">
          You don't have any pending requests. Keep swiping to find potential matches!
        </p>
      </div>
    );
  }

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Notice the curly braces wrap the map function */}
    {requests.map((req) => (
      <RequestCard 
        key={req._id} 
        request={req} 
         
      />
    ))} 
  </div>
);
}

export default Matches
