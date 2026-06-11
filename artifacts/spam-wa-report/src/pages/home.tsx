import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSubmitReport,
  getListReportsQueryKey,
  getGetReportStatsQueryKey,
} from "@workspace/api-client-react";
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
import { Send, CheckCircle, Upload, Shield } from "lucide-react";

const REASONS = ["spam", "scam", "harassment", "fake_account", "other"] as const;

const REASON_LABELS: Record<string, string> = {
  spam: "Spam",
  scam: "Scam",
  harassment: "Harassment",
  fake_account: "Fake Account",
  other: "Other",
};

const formSchema = z.object({
  targetNumber: z.string().min(1, "Target number is required"),
  reason: z.enum(REASONS, { error: "Please select a reason" }),
  details: z.string().min(5, "Please provide at least 5 characters"),
  evidenceUrl: z.string().optional(),
});

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [evidenceFileName, setEvidenceFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const submitReport = useSubmitReport();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetNumber: "",
      reason: undefined,
      details: "",
      evidenceUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitReport.mutate(
      { data: { ...values, evidenceUrl: values.evidenceUrl || null } },
      {
        onSuccess: () => {
          setIsSuccess(true);
          queryClient.invalidateQueries({ queryKey: getListReportsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetReportStatsQueryKey() });
          form.reset();
          setEvidenceFileName(null);
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 pb-10 px-4">

      {/* ── Hero header ───────────────────────────────────────── */}
      <div className="text-center mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(263_70%_60%/0.3)] bg-[hsl(263_70%_60%/0.06)] mb-5">
          <Shield className="w-3.5 h-3.5 text-[hsl(263,70%,72%)]" />
          <span className="text-[hsl(263,70%,72%)] text-xs font-medium tracking-widest uppercase">
            Secure Platform
          </span>
        </div>

        <h1
          data-testid="text-page-title"
          className="gradient-title text-5xl md:text-6xl font-extrabold tracking-tight mb-3 leading-none"
        >
          SPAM WA REPORT
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-base font-light max-w-sm mx-auto leading-relaxed">
          Report suspicious WhatsApp activity safely and efficiently
        </p>
      </div>

      {/* ── Video card (framed like photo 1) ─────────────────── */}
      <div
        className="video-card animate-fade-up delay-200 w-full max-w-lg mb-10 animate-float"
        style={{ aspectRatio: "16 / 7" }}
        data-testid="video-card"
      >
        <video
          src="/report-video.mp4"
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* ── Report form card ─────────────────────────────────── */}
      <div className="form-card animate-fade-up delay-300 w-full max-w-lg p-7">

        {/* Card header */}
        <div className="mb-6">
          <h2 className="text-white text-lg font-semibold mb-1">Submit a Report</h2>
          <p className="text-[hsl(var(--muted-foreground))] text-xs font-light">
            All reports are encrypted and handled confidentially.
          </p>
        </div>

        {isSuccess ? (
          /* ── Success state ──────────────────────────────────── */
          <div
            className="flex flex-col items-center justify-center py-10 space-y-4 animate-fade-up"
            data-testid="success-state"
          >
            <div className="success-ring animate-count-up">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-green-400 font-semibold text-lg">Report Submitted!</p>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">
                Your report has been logged successfully.
              </p>
            </div>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-sm text-[hsl(263,70%,72%)] hover:text-white transition-colors mt-2 font-medium"
              data-testid="button-report-another"
            >
              Submit another report →
            </button>
          </div>
        ) : (
          /* ── Form ───────────────────────────────────────────── */
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* Target Number */}
              <FormField
                control={form.control}
                name="targetNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[hsl(var(--foreground))] text-xs font-semibold uppercase tracking-widest">
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
                    <FormLabel className="text-[hsl(var(--foreground))] text-xs font-semibold uppercase tracking-widest">
                      Reason
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger
                          data-testid="select-reason"
                          className="field-input h-11"
                        >
                          <SelectValue placeholder="Select a reason..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[hsl(var(--card))] border-[hsl(var(--border))]">
                        {REASONS.map((r) => (
                          <SelectItem
                            key={r} value={r}
                            className="text-[hsl(var(--foreground))] focus:bg-[hsl(263,70%,60%,0.12)] focus:text-white text-sm"
                            data-testid={`option-reason-${r}`}
                          >
                            {REASON_LABELS[r]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Evidence */}
              <FormField
                control={form.control}
                name="evidenceUrl"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-[hsl(var(--foreground))] text-xs font-semibold uppercase tracking-widest">
                      Evidence <span className="text-[hsl(var(--muted-foreground))] font-normal normal-case">(optional)</span>
                    </FormLabel>
                    <div
                      className="evidence-box flex flex-col items-center justify-center py-5 px-4"
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="evidence-upload-box"
                    >
                      <Upload className="w-4 h-4 text-[hsl(var(--muted-foreground))] mb-1.5" />
                      <span className="text-[hsl(var(--muted-foreground))] text-sm font-light">
                        {evidenceFileName
                          ? <span className="text-[hsl(263,70%,72%)]">{evidenceFileName}</span>
                          : "Click to upload screenshot"}
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        data-testid="input-evidence-file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setEvidenceFileName(file.name);
                        }}
                      />
                    </div>
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
                    <FormLabel className="text-[hsl(var(--foreground))] text-xs font-semibold uppercase tracking-widest">
                      Details
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        data-testid="input-details"
                        placeholder="Explain what happened..."
                        {...field}
                        className="field-input min-h-[100px] resize-none text-sm font-light leading-relaxed"
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
                className="send-btn w-full h-12 text-white flex items-center justify-center gap-2.5 mt-1"
                disabled={submitReport.isPending}
              >
                <Send className="w-4 h-4" style={{ position: "relative", zIndex: 1 }} />
                <span style={{ position: "relative", zIndex: 1 }}>
                  {submitReport.isPending ? "Sending report..." : "Send Report"}
                </span>
              </Button>
            </form>
          </Form>
        )}
      </div>

      {/* ── Dimmed ready indicator ───────────────────────────── */}
      {!isSuccess && (
        <div className="flex items-center gap-2 mt-5 opacity-25 animate-fade-in delay-500" data-testid="status-ready">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-xs font-medium">Report Ready</span>
        </div>
      )}
    </div>
  );
}
