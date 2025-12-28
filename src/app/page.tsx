import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Bell,
  ShieldCheck,
  CheckCircle2,
  LayoutDashboard,
  Zap,
  ArrowRight,
  Lock,
  Search,
  AlertTriangle,
  Wallet,
  Globe,
  Fingerprint,
} from "lucide-react";
import { SignInButton } from "@/components/auth/SignInButton";

export const metadata = {
  title: "SubTrack - Master Your Subscriptions",
  description:
    "The intelligent way to track, manage, and optimize your recurring expenses.",
};

export default function LandingPage() {
  return (
    // Force Dark Mode Wrapper
    <div className="dark min-h-screen bg-[#050505] text-foreground font-satoshi selection:bg-primary/30 overflow-x-hidden">
      {/* 🟢 Premium Floating Navbar */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-5xl rounded-full border border-white/10 bg-black/60 px-4 md:px-6 py-3 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-black/30 transition-all hover:border-white/20">
          <div className="flex items-center justify-between">
            {/* ✨ Custom Brand Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-blue-600 shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 group-hover:shadow-primary/40">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-white"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    className="opacity-50"
                  />
                  <path d="M8 11h8" />
                  <path d="M8 15h8" />
                  <path d="M12 7v1" />
                </svg>
              </div>
              <span className="hidden md:block text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                SubTrack
              </span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* 👇 FIX: Removed 'hidden sm:block' so it shows on mobile too */}
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-white cursor-pointer hover:bg-white/5 rounded-full px-3 md:px-4"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="rounded-full px-4 md:px-6 h-9 text-xs md:text-sm shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-[0_0_25px_-5px_var(--color-primary)] transition-all hover:scale-105 cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ⚡ Hero Section */}
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[130px] rounded-full pointer-events-none opacity-40" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto max-w-6xl px-6 relative z-10 text-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
                Stop paying for <br />
                <span className="bg-gradient-to-r from-primary via-violet-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                  forgotten subscriptions.
                </span>
              </h1>
            </div>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground/80 leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
              The average person wastes <strong>$500/year</strong> on unused
              subscriptions. SubTrack helps you find, track, and cancel the
              noise.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              <div className="w-full sm:w-auto">
                <SignInButton />
              </div>
              <Link href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white cursor-pointer h-12 px-8 backdrop-blur-sm transition-all hover:border-white/20"
                >
                  How it works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 🛡️ REPLACEMENT SECTION: Trust & Impact Strip */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <TrustItem
                icon={ShieldCheck}
                title="Bank-Grade Security"
                desc="AES-256 Encryption"
              />
              <TrustItem
                icon={Fingerprint}
                title="Privacy First"
                desc="No Data Selling"
              />
              <TrustItem
                icon={Globe}
                title="Global Support"
                desc="150+ Currencies"
              />
              <TrustItem
                icon={Zap}
                title="Instant Setup"
                desc="No Bank Login Needed"
              />
            </div>
          </div>
        </section>

        {/* ⚠️ The Problem Section */}
        <section className="py-24 relative">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-red-500/10 text-red-500 mb-6 shadow-inner shadow-red-500/10">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  The "Free Trial" <br />
                  Trap is Real.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Companies bank on you forgetting. That 7-day trial turns into
                  a $50 monthly charge, and before you know it, you've paid for
                  a year of service you never used.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Forgot to cancel free trials</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Duplicate subscriptions (Spotify + Apple Music)</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Mystery charges on your bank statement</span>
                  </li>
                </ul>
              </div>
              {/* Visual Mockup */}
              <div className="relative group cursor-default">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl space-y-4 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-red-500/20 flex items-center justify-center">
                        <span className="font-bold text-red-500">N</span>
                      </div>
                      <div>
                        <p className="font-bold text-white">Netflix Premium</p>
                        <p className="text-xs text-red-400">
                          Charged yesterday
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-white">-$19.99</p>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center">
                        A
                      </div>
                      <div>
                        <p className="font-bold text-white">
                          Adobe Creative Cloud
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Charged 2 days ago
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-white">-$54.99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🍱 Features Grid */}
        <section
          id="features"
          className="py-24 bg-white/[0.02] border-y border-white/5"
        >
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Everything you need to <br />
                <span className="text-primary">master your monthly spend.</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                We've packed SubTrack with power-user features without the
                clutter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large Card 1 */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-8 transition-all hover:border-primary/20 hover:bg-white/[0.03] cursor-default">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-500 ring-1 ring-inset ring-blue-500/20">
                    <LayoutDashboard className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Centralized Command Center
                  </h3>
                  <p className="text-muted-foreground max-w-md leading-relaxed">
                    Get a bird's eye view of your financial health. Track
                    monthly burns, yearly forecasts, and upcoming bills in one
                    cohesive interface.
                  </p>
                </div>
                {/* Decorative Gradient */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all" />
              </div>

              {/* Tall Card */}
              <div className="md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-8 transition-all hover:border-primary/20 hover:bg-white/[0.03] cursor-default">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6 inline-flex w-fit rounded-xl bg-emerald-500/10 p-3 text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
                    <Bell className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Smart Alerts
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Never get caught off guard by an auto-renewal again. Get
                    notified via email 3 days before a charge hits your card.
                  </p>
                  <div className="mt-auto rounded-xl bg-black/40 border border-white/5 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs font-bold">
                        N
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-white/10 rounded mb-1.5" />
                        <div className="h-1.5 w-12 bg-white/5 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs font-bold">
                        S
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-20 bg-white/10 rounded mb-1.5" />
                        <div className="h-1.5 w-16 bg-white/5 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small Card 2 */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-8 transition-all hover:border-primary/20 hover:bg-white/[0.03] cursor-default">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-500 ring-1 ring-inset ring-violet-500/20">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Spending Velocity
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Visualizes your projected spending for the next 6 months so
                    you can plan ahead.
                  </p>
                </div>
              </div>

              {/* Small Card 3 */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-8 transition-all hover:border-primary/20 hover:bg-white/[0.03] cursor-default">
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-xl bg-amber-500/10 p-3 text-amber-500 ring-1 ring-inset ring-amber-500/20">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Private & Secure
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We don't sell your data to advertisers. Your financial
                    privacy is our top priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🚀 How it Works */}
        <section id="how-it-works" className="py-24">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Simple, powerful, and effective.
                </h2>
                <div className="space-y-10">
                  <StepItem
                    icon={Search}
                    title="Add your subscriptions"
                    desc="Manually input your recurring services. We support 150+ currencies so you can track global spend."
                  />
                  <StepItem
                    icon={Zap}
                    title="Set your preferences"
                    desc="Choose your preferred display currency. We automatically convert foreign costs to your home currency."
                  />
                  <StepItem
                    icon={Lock}
                    title="Stay in control"
                    desc="Get insights, alerts, and weekly digests to keep your budget lean and your wallet happy."
                  />
                </div>
              </div>
              <div className="relative cursor-default">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-[80px] rounded-full" />
                <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
                  {/* Abstract UI representation */}
                  <div className="space-y-4 opacity-90">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20" />
                        <div className="space-y-2">
                          <div className="h-2 w-32 bg-white/20 rounded" />
                          <div className="h-2 w-20 bg-white/10 rounded" />
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-white/5 rounded" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-75">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20" />
                        <div className="space-y-2">
                          <div className="h-2 w-28 bg-white/20 rounded" />
                          <div className="h-2 w-16 bg-white/10 rounded" />
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-white/5 rounded" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-500/20" />
                        <div className="space-y-2">
                          <div className="h-2 w-24 bg-white/20 rounded" />
                          <div className="h-2 w-16 bg-white/10 rounded" />
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ❓ FAQ Section */}
        <section className="py-24 bg-white/[0.02] border-t border-white/5">
          <div className="container mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <FaqItem
                question="Is SubTrack really free?"
                answer="Yes! Our Free Tier gives you unlimited subscriptions and manual tracking. We believe financial health should be accessible to everyone."
              />
              <FaqItem
                question="Do you connect to my bank account?"
                answer="No. SubTrack is a manual tracking tool. We prioritize privacy and security, meaning we never ask for your bank login credentials."
              />
              <FaqItem
                question="Does it support different currencies?"
                answer="Absolutely. You can add subscriptions in any currency (USD, EUR, PHP, JPY, etc.) and we'll automatically convert them to your preferred base currency for reporting."
              />
              <FaqItem
                question="Can I export my data?"
                answer="Yes. You can export your entire subscription history to CSV at any time from the Settings page."
              />
            </div>
          </div>
        </section>

        {/* 📢 CTA Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-primary/10 via-background to-background p-12 md:p-20 text-center">
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Take back control of your wallet.
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Join smart spenders who are saving money every month with
                  SubTrack. It takes less than 2 minutes to set up.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/auth/signup">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto rounded-full text-base cursor-pointer px-10 h-12 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
                    >
                      Start Tracking Now
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> No credit
                    card needed
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Free
                    forever
                  </span>
                </div>
              </div>
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[100px] pointer-events-none" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ---------------- Helper Components ----------------

function StepItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-5 group cursor-default">
      <div className="mt-1 h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/10 transition-colors shrink-0">
        <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-white hover:bg-white/5 transition-colors list-none">
          {question}
          <span className="transition group-open:rotate-180">
            <ArrowRight className="h-4 w-4 rotate-90" />
          </span>
        </summary>
        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
          {answer}
        </div>
      </details>
    </div>
  );
}

// ✨ New Component: Trust Strip Item
function TrustItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-default">
      <div className="p-3 rounded-full bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
