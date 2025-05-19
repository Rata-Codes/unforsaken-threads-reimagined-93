
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface AccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
  redirectAfterLogin?: string;
}

const AccountDialog = ({ 
  isOpen, 
  onClose, 
  defaultTab = "login",
  redirectAfterLogin
}: AccountDialogProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-center">
          {activeTab === "login" ? "Login to Your Account" : "Create an Account"}
        </DialogTitle>
        <DialogDescription className="text-center">
          {activeTab === "login" ? "Enter your credentials to login" : "Fill in the details to create an account"}
        </DialogDescription>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <LoginForm onClose={onClose} redirectAfterLogin={redirectAfterLogin} />
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <SignupForm onSuccess={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDialog;
