"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, Key, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

async function loginUser(credentials) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true };
}

async function verify2FA(code) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true };
}

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

const twoFactorSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

export function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginStep, setLoginStep] = useState("credentials");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: register2FA,
    handleSubmit: handleSubmit2FA,
    formState: { errors: errors2FA },
  } = useForm({
    resolver: zodResolver(twoFactorSchema),
  });

  const onSubmit = async (data) => {
    if (!captchaValue) {
      toast({
        title: "CAPTCHA Required",
        description: "Please complete the CAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginUser(data);
      if (result.success) {
        setLoginStep("2fa");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit2FA = async (data) => {
    setIsLoading(true);
    try {
      const result = await verify2FA(data.code);
      if (result.success) {
        setLoginStep("success");
        setTimeout(() => router.push("/admin/dashboard"), 2000);
      } else {
        throw new Error("2FA verification failed");
      }
    } catch (error) {
      toast({
        title: "2FA Verification Failed",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-600 to-base-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-10"></div>
          <CardHeader className="relative z-10 space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Admin Login
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Secure access to your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6 p-6">
            {loginStep === "credentials" && (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username or Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      className="pl-10"
                      {...register("username")}
                    />
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      {...register("password")}
                    />
                    <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" {...register("rememberMe")} />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <ReCAPTCHA
                  sitekey="6Lf3Z3UqAAAAADUJalltYKRaNO_7i8cyV8F3J8z6"
                  onChange={setCaptchaValue}
                  className="transform scale-90 origin-left"
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </motion.form>
            )}
            {loginStep === "2fa" && (
              <motion.form
                onSubmit={handleSubmit2FA(onSubmit2FA)}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-sm font-medium">
                    2FA Code
                  </Label>
                  <div className="relative">
                    <Input
                      id="code"
                      type="text"
                      className="pl-10"
                      {...register2FA("code")}
                    />
                    <Shield className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                  {errors2FA.code && (
                    <p className="text-sm text-red-500">
                      {errors2FA.code.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </motion.form>
            )}
            {loginStep === "success" && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Lock className="mx-auto h-16 w-16 text-green-500" />
                <p className="mt-4 text-xl font-semibold text-green-600">
                  Login Successful
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Redirecting to dashboard...
                </p>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="relative z-10 flex justify-center pb-6">
            <Button
              variant="link"
              className="text-sm font-normal text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
