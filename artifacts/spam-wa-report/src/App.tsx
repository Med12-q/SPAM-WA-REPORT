import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Stats from "@/pages/stats";
import { Shield, Github, Mail, Send } from "lucide-react";

const queryClient = new QueryClient();

/* ── Telegram icon (not in lucide) ─────────────────────────────── */
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
    </svg>
  );
}

/* ── WhatsApp icon ──────────────────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function Navigation() {
  const [location] = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 py-3.5 px-4"
      style={{
        background: "hsl(265 50% 5% / 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid hsl(265 25% 14%)",
      }}
    >
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer" data-testid="link-home-logo">
            <div className="w-7 h-7 rounded-lg bg-[hsl(263,70%,60%,0.15)] border border-[hsl(263,70%,60%,0.3)] flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[hsl(263,70%,72%)]" />
            </div>
            <span className="font-bold text-white text-sm tracking-wide">SPAM WA REPORT</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={`nav-pill ${location === "/" ? "active" : ""}`}
            data-testid="link-nav-report"
          >
            Report
          </Link>
          <Link
            href="/stats"
            className={`nav-pill ${location === "/stats" ? "active" : ""}`}
            data-testid="link-nav-stats"
          >
            Stats
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer
      className="pt-10 pb-8 px-4 mt-auto"
      style={{ borderTop: "1px solid hsl(265 25% 14%)" }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center gap-5">

        {/* Social icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Med12-q/VARNOX-WA-REPORT"
            target="_blank" rel="noopener noreferrer"
            className="social-icon" aria-label="GitHub" data-testid="link-social-github"
          >
            <Github className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
          </a>
          <a
            href="https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F"
            target="_blank" rel="noopener noreferrer"
            className="social-icon" aria-label="WhatsApp Channel" data-testid="link-social-whatsapp"
          >
            <WhatsAppIcon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
          </a>
          <a
            href="https://t.me/varnox_official"
            target="_blank" rel="noopener noreferrer"
            className="social-icon" aria-label="Telegram" data-testid="link-social-telegram"
          >
            <TelegramIcon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
          </a>
          <a
            href="mailto:varnoxnovark@gmail.com"
            className="social-icon" aria-label="Email" data-testid="link-social-email"
          >
            <Mail className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
          </a>
        </div>

        {/* Credit */}
        <div className="text-center space-y-1">
          <p className="shimmer-text text-xs font-medium tracking-widest uppercase" data-testid="text-footer-credit">
            Dev by 𝐕𝚫𝚪𝐍𝐎𝐗 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵
          </p>
          <p className="text-[hsl(var(--muted-foreground))] text-[11px] font-light">
            © 2025 SPAM WA REPORT — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-screen flex flex-col" style={{ background: "hsl(var(--background))" }}>
            <Navigation />
            <main className="flex-1">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/stats" component={Stats} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
