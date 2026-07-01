import { Flame, Bell, User, Settings, LogOut, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux"; // Importing useSelector to access Redux store
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux"; // Importing useDispatch to dispatch actions
import { removeUser } from "../lib/userSlice";
import { useNavigate } from "react-router-dom"; // Importing useNavigate to programmatically navigate
import axios from "axios"; // Importing axios for making HTTP requests


// Added 'user' as a prop so it doesn't throw a "user is not defined" error
export default function Header() {
  const user = useSelector((store) => store.user?.message || store.user);
  const dispatch = useDispatch(); // Importing useDispatch to dispatch actions
  const navigate = useNavigate(); // Importing useNavigate to programmatically navigate
  
  const handleLogout = async () => {

    try{ await axios.post("https://devtinder-backend-1-usc5.onrender.com/logout", {}, { withCredentials: true })
  dispatch(removeUser());
return navigate("/login");}catch(error){console.error("Logout failed:", error);}

  }
  
  return (

    
    // Sticky header with glass-morphism effect
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      {/* MAIN CONTAINER DIV */}
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Logo & Brand Name */}
        <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
             {/* Random Modern Logo combining Code and Tinder concepts */}
            <Code2 className="h-5 w-5 text-white absolute" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 hidden sm:inline-block">
            InstaDev
          </span>
        </div>

        {/* Center: Main Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8  text-lg font-semibold text-foreground">
          <Link to="/feed" className="text-foreground transition-colors hover:text-indigo-500">Feed</Link>
          <Link to="/Matches" className="text-muted-foreground transition-colors hover:text-indigo-500">Matches</Link>
          <Link to="/Message" className="text-muted-foreground transition-colors hover:text-indigo-500">Message</Link>
          <Link to="/Connections" className="text-muted-foreground transition-colors hover:text-indigo-500">Connections</Link>
        </nav>

        {/* Right Side: Actions & Profile DIV (This was the one causing the error) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-indigo-500 rounded-full">
            <Bell className="h-10 w-10" />
          </Button>

          {/* Profile Dropdown */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full border border-border/50 hover:bg-accent">
                  <Avatar className="h-12 w-12">
                    {/* Random placeholder image, fallback to initials */}
                    <AvatarImage src= {user.avatar || "https://github.com/shadcn.png" } alt="@user" />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold">BS</AvatarFallback> 
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-stretch-extra-condensed">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">{user?.firstName || "UNKNOWN"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/profile" className="flex w-full items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div> {/* <--- I ADDED THIS MISSING CLOSING TAG HERE */}

      </div> {/* THIS CLOSES THE MAIN CONTAINER */}
    </header>
  );
}