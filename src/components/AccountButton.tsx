
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import AccountDialog from "./AccountDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AccountButton = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = isAuthenticated && user?.fields?.Username === "admincontrol@5678";

  const handleProfileClick = () => {
    navigate("/profile");
  };
  
  const getInitials = () => {
    if (!user?.fields?.Name) return "U";
    return user.fields.Name.split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full relative p-0">
              <Avatar className="h-9 w-9 border border-gray-200">
                <AvatarFallback className={isAdmin ? "bg-blue-500 text-white" : "bg-black text-white"}>
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              {isAdmin && (
                <Badge variant="success" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                  A
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <span className="font-medium">{user?.fields?.Name || 'User'}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              Profile
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link to="/admin">Admin Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          onClick={() => setShowAuthDialog(true)} 
          variant="ghost" 
          size="icon"
          className="rounded-full"
        >
          <User className="h-5 w-5" />
        </Button>
      )}

      <AccountDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      />
    </>
  );
};

export default AccountButton;
