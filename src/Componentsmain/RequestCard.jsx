import { Check, X, Terminal, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removerequest } from "../lib/requestSlice";

const RequestCard = ({ request }) => {
  const sender = request?.fromUserId;
    const dispatch = useDispatch();
  if (!sender) return null;

  const requestreview = (status,id) => {
    try{const res = axios.post("http://localhost:3000/request/review/" + status + "/" + id, {} , {
      withCredentials: true
    }
       );
    dispatch(removerequest(id));}
       catch(err){console.error("Error reviewing request:", err);}

  }

  return (
    <div className="relative rounded-2xl border border-zinc-200 p-5 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
      
      {/* Top Ribbon Indicator */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-orange-500" />

      <div className="space-y-4 mt-2">
        
        {/* Header: Avatar, Name, and Status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={sender.avatar || "https://github.com/shadcn.png"} 
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border border-zinc-200"
            />
            <div>
              <Link to={`/user/${sender._id}`} className="hover:underline text-zinc-900">
                <h3 className="font-bold text-base capitalize line-clamp-1">
                  {sender.firstName} {sender.lastName}
                </h3>
              </Link>
              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                <Terminal className="h-3 w-3" /> @{sender.username || "dev"}
              </p>
            </div>
          </div>
          
          {/* Pending Status Badge */}
          <span className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-[10px] font-bold text-amber-600 border border-amber-200">
            <Clock className="h-3 w-3" /> Pending
          </span>
        </div>

        {/* Bio Section */}
        <p className="text-sm text-zinc-500 line-clamp-2 min-h-[2.5rem]">
          {sender.about || "This developer hasn't added a bio yet."}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {sender.skills?.length > 0 ? (
            sender.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 rounded-full bg-zinc-100 text-[10px] font-medium text-zinc-600 border border-zinc-200 capitalize"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-[10px] italic text-zinc-400">No skills specified</span>
          )}
        </div>
      </div>

      {/* Action Buttons (Using CSS Grid for perfect 50/50 sizing) */}
      <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-zinc-100">
        <Button 
          variant="outline" 
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 shadow-none"
        onClick={() => requestreview("rejected",request._id)}
        >
          <X className="h-4 w-4 mr-1.5" /> Reject
        </Button>
        
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white shadow-none"
        onClick={() => requestreview("accepted",request._id)}
        >
          <Check className="h-4 w-4 mr-1.5" /> Accept
        </Button>
      </div>

    </div>
  );
};

export default RequestCard;