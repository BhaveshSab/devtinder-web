import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnectionRequests } from '../lib/connectionSlice';
import ConnectionCard from "../Componentsmain/ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  
  const loggedInUser = useSelector((store) => store.user?.message || store.user);
  const connections = useSelector((store) => store.connections); 

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        "https://devtinder-backend-1-usc5.onrender.com/user/connections",
        { withCredentials: true }
      );
      dispatch(addConnectionRequests(res.data.message));
      console.log("Connections fetched:", res.data.message);
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-foreground">No Connections Yet</h2>
        <p className="text-muted-foreground text-sm">
          You don't have any mutually accepted connections. Keep swiping!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">My Network</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => {
          const otherUser = 
            connection.fromUserId?._id === loggedInUser?._id 
              ? connection.toUserId 
              : connection.fromUserId;

          return (
            <ConnectionCard 
              key={connection._id}
              otherUser={otherUser} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default Connections;