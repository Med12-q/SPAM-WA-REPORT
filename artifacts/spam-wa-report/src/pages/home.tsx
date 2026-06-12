import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, CheckCircle, Shield, AlertTriangle, FileWarning, UserX, MessageSquareWarning, HelpCircle } from "lucide-react";

const REASONS = ["spam", "scam", "harassment", "fake_account", "other"] as const;

const REASON_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
  spam:         { label: "Spam",          icon: <MessageSquareWarning className="w-3.5 h-3.5" /> },
  scam:         { label: "Scam",          icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  harassment:   { label: "Harassment",   icon: <UserX className="w-3.5 h-3.5" /> },
  fake_account: { label: "Fake Account", icon: <FileWarning className="w-3.5 h-3.5" /> },
  other:        { label: "Other",         icon: <HelpCircle className="w-3.5 h-3.5" /> },
};

const formSchema = z.object({
  targetNumber: z.string().min(1, "Target number is required"),
  reason: z.enum(REASONS, { error: "Please select a reason" }),
  details: z.string().min(5, "Please provide at least 5 characters"),
});

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { targetNumber: "", reason: undefined, details: "" },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setIsSuccess(true);
      form.reset();
    }, 1400);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 pb-10 px-4">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="text-center mb-10 fade-up">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "hsl(263 70% 60% / 0.1)",
            border: "1px solid hsl(263 70% 60% / 0.28)",
            color: "hsl(263 70% 75%)",
          }}
        >
          <Shield className="w-3.5 h-3.5" />
          Secure Platform
        </div>

        <h1
          data-testid="text-page-title"
          className="gradient-title text-5xl md:text-6xl font-extrabold tracking-tight mb-3 leading-none"
        >
          SPAM WA REPORT
        </h1>
        <p className="text-sm md:text-base font-light max-w-sm mx-auto leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
          Report suspicious WhatsApp activity safely and efficiently
        </p>
      </div>

      {/* ── Video card ───────────────────────────────────────── */}
      <div
        className="video-card fade-up w-full max-w-lg mb-10"
        style={{ aspectRatio: "16 / 7", animationDelay: "120ms" }}
        data-testid="video-card"
      >
        <video
          src={`${base}/report-video.mp4`}
          autoPlay muted loop playsInline
          className="w-full h-full object-cover rounded-[inherit]"
        />
      </div>

      {/* ── Form card ────────────────────────────────────────── */}
      <div
        className="form-card fade-up w-full max-w-lg p-7"
        style={{ animationDelay: "200ms" }}
      >
        <div className="mb-6">
          <h2 className="text-white text-lg font-bold mb-1">Submit a Report</h2>
          <p className="text-xs font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
            All reports are handled confidentially and reviewed by our team.
          </p>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 fade-up" data-testid="success-state">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "hsl(142 60% 45% / 0.12)",
                border: "2px solid hsl(142 60% 45% / 0.35)",
                boxShadow: "0 0 24px hsl(142 60% 45% / 0.15)",
              }}
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-green-400 font-bold text-xl">Report Submitted!</p>
              <p className="text-sm font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
                Your report has been logged successfully.
              </p>
            </div>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "hsl(263 70% 72%)" }}
              data-testid="button-report-another"
            >
              Submit another report →
            </button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* Target Number */}
              <FormField
                control={form.control}
                name="targetNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(var(--foreground))" }}>
                      Target Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-testid="input-target-number"
                        placeholder="+224 669 28 83 32"
                        {...field}
                        className="field-input h-11"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Reason */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(var(--foreground))" }}>
                      Reason
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-reason" className="field-input h-11">
                          <SelectValue placeholder="Select a reason..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        style={{
                          background: "hsl(265 35% 9%)",
                          border: "1px solid hsl(265 25% 18%)",
                        }}
                      >
                        {REASONS.map((r) => (
                          <SelectItem
                            key={r} value={r}
                            className="text-sm focus:bg-[hsl(263,70%,60%,0.12)] focus:text-white"
                            style={{ color: "hsl(var(--foreground))" }}
                            data-testid={`option-reason-${r}`}
                          >
                            <span className="flex items-center gap-2">
                              {REASON_LABELS[r].icon}
                              {REASON_LABELS[r].label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Details */}
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(var(--foreground))" }}>
                      Details
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        data-testid="input-details"
                        placeholder="Describe what happened, when it occurred, and any other relevant information..."
                        {...field}
                        className="field-input min-h-[110px] resize-none text-sm font-light leading-relaxed"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                data-testid="button-send-report"
                className="send-btn w-full h-12 text-white flex items-center justify-center gap-2.5 mt-1 font-semibold tracking-wide"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending report...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Report
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
