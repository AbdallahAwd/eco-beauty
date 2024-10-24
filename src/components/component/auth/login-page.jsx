"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulating OAuth process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Here you would typically redirect to Google OAuth
    console.log("Redirecting to Google OAuth");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-pink-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pt-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Image
              src="/placeholder.svg"
              alt="EcoBeauty Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-primary">
            EcoBeauty
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            Organic Beauty, Naturally Yours
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 pt-6">
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
                src="/placeholder.svg"
                alt="Google logo"
                width={24}
                height={24}
                className="mr-2"
              />
            )}
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-6 pb-8">
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
        </CardFooter>
      </Card>
      {/* <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted by eco-conscious beauty enthusiasts worldwide
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden"
            >
              <Image
                src={`/placeholder.svg`}
                alt={`Customer ${i}`}
                width={32}
                height={32}
              />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
