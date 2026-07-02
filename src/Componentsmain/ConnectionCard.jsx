import { Link } from "react-router-dom";
import { User, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConnectionCard = ({ otherUser }) => {
  if (!otherUser) return null;

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <img 
            src={otherUser.avatar || "https://github.com/shadcn.png"} 
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover border border-zinc-100 shadow-sm"
          />
          <div>
            <h3 className="font-bold text-lg capitalize text-zinc-900 leading-tight">
              {otherUser.firstName} {otherUser.lastName}
            </h3>
            <p className="text-sm text-zinc-500 flex items-center gap-1 mt-0.5">
              <Terminal className="h-3.5 w-3.5" /> @{otherUser.username || "dev"}
            </p>
          </div>
        </div>

        <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
          {otherUser.about || "No bio description provided."}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {otherUser.skills?.length > 0 ? (
            otherUser.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-indigo-50 text-xs font-semibold text-indigo-500 border border-indigo-100 capitalize"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs italic text-zinc-400">No skills specified</span>
          )}
          {otherUser.skills?.length > 3 && (
            <span className="text-xs text-zinc-500 font-semibold px-1 self-center">
              +{otherUser.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-100">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 text-sm text-zinc-700 border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 h-10 rounded-xl" 
          asChild
        >
          <Link to={`/user/${otherUser._id}`}>
            <User className="h-4 w-4" /> Profile
          </Link>
        </Button>
      </div>

    </div>
  );
};

export default ConnectionCard;