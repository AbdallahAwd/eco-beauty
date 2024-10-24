"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export function LoginDialog({ triggerComponent }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsOpen(false);
    console.log("Redirecting to Google OAuth");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Replace DialogTrigger with custom triggerComponent */}
      {triggerComponent({ openDialog: () => setIsOpen(true) })}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center space-y-2 pt-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="EcoBeauty Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <span className="text-2xl font-bold text-center text-primary">
              EcoBeauty
            </span>
          </DialogTitle>
          <DialogDescription className="text-center px-4">
            Organic Beauty, Naturally Yours
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <p className="text-center text-sm text-muted-foreground px-4">
            Welcome back! Sign in with Google to continue your eco-friendly
            beauty journey.
          </p>
          <Button
            variant="outline"
            className="w-full max-w-xs h-12 font-semibold text-black bg-white hover:bg-gray-50 border border-gray-300"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Image
                src="/placeholder.svg?height=24&width=24"
                alt="Google logo"
                width={24}
                height={24}
                className="mr-2"
              />
            )}
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </div>
        <div className="flex flex-col items-center pt-4">
          <p className="text-xs text-center text-muted-foreground mt-4">
            By signing in, you agree to our{" "}
            <a href="#" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
