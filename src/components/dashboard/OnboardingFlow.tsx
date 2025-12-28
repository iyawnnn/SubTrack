"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Moon, 
  Sun, 
  Bell, 
  Sparkles 
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogTitle, // 👈 Added Import
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { finishOnboarding } from "@/actions/onboarding-actions";
import { cn } from "@/lib/utils"; // Ensure cn is imported if not already

export function OnboardingFlow({ isOpen }: { isOpen: boolean }) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(isOpen);
  const { setTheme, theme } = useTheme();
  const [loading, setLoading] = useState(false);

  // Form State
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState(true);

  const totalSteps = 3;

  const handleFinish = async () => {
    setLoading(true);
    const result = await finishOnboarding({ currency, notifications });
    
    if (result.success) {
      toast.success("All set! Welcome to SubTrack.");
      setOpen(false);
    } else {
      toast.error("Something went wrong saving your settings.");
    }
    setLoading(false);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));

  // Slide Animation Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      {/* preventDefault blocks closing by clicking outside or pressing Escape */}
      <DialogContent 
        className="sm:max-w-[500px] p-0 overflow-hidden bg-background/80 backdrop-blur-2xl border-primary/20"
        onInteractOutside={(e) => e.preventDefault()} 
        onEscapeKeyDown={(e) => e.preventDefault()}
        aria-describedby="onboarding-description" // Good practice
      >
        {/* 👇 FIX: Added Hidden DialogTitle for Accessibility */}
        <DialogTitle className="sr-only">Welcome to SubTrack Onboarding</DialogTitle>
        <div id="onboarding-description" className="sr-only">
          Set up your currency and theme preferences.
        </div>

        <div className="relative p-8 min-h-[400px] flex flex-col">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-primary/20 w-full">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / totalSteps) * 100}%` }} 
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
              <motion.div
                key="step1"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col gap-6"
              >
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Welcome to SubTrack</h2>
                  <p className="text-muted-foreground">
                    Let's personalize your experience in just a few seconds.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <Label>Select your primary currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="h-12 bg-secondary/50 border-border/50 cursor-pointer">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD" className="cursor-pointer">🇺🇸 USD - US Dollar</SelectItem>
                      <SelectItem value="EUR" className="cursor-pointer">🇪🇺 EUR - Euro</SelectItem>
                      <SelectItem value="GBP" className="cursor-pointer">🇬🇧 GBP - British Pound</SelectItem>
                      <SelectItem value="JPY" className="cursor-pointer">🇯🇵 JPY - Japanese Yen</SelectItem>
                      <SelectItem value="PHP" className="cursor-pointer">🇵🇭 PHP - Philippine Peso</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    We'll automatically convert other currencies to this one.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col gap-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Choose your vibe</h2>
                  <p className="text-muted-foreground">
                    SubTrack looks great in any light. Which do you prefer?
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:bg-secondary/50 cursor-pointer",
                      theme === "light" 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Sun className="h-8 w-8" />
                    <span className="font-medium">Light</span>
                    {theme === "light" && (
                      <div className="absolute top-3 right-3 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:bg-secondary/50 cursor-pointer",
                      theme === "dark" 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Moon className="h-8 w-8" />
                    <span className="font-medium">Dark</span>
                    {theme === "dark" && (
                      <div className="absolute top-3 right-3 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col gap-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Stay in the loop</h2>
                  <p className="text-muted-foreground">
                    Get notified before your subscriptions renew so you're never charged unexpectedly.
                  </p>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/20 p-2 text-primary">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-medium">Renewal Alerts</p>
                        <p className="text-xs text-muted-foreground">Email me 3 days before renewal</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications} 
                      onCheckedChange={setNotifications} 
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between pt-6 mt-auto">
            <div className="flex gap-1">
              {/* Pagination Dots */}
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`h-2 w-2 rounded-full transition-colors ${
                    step === i ? "bg-primary" : "bg-secondary"
                  }`} 
                />
              ))}
            </div>

            <Button 
              onClick={step === totalSteps ? handleFinish : nextStep}
              className="gap-2 rounded-full px-6 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                "Setting up..."
              ) : step === totalSteps ? (
                <>Get Started <Sparkles className="h-4 w-4" /></>
              ) : (
                <>Next <ArrowRight className="h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}