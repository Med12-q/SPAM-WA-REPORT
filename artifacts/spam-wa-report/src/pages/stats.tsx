import { ShieldAlert, CheckCircle, Clock, BarChart3, Activity, TrendingUp, Globe, Zap } from "lucide-react";

const REASON_LABELS: Record<string, string> = {
  spam: "Spam",
  scam: "Scam",
  harassment: "Harassment",
  fake_account: "Fake Account",
  other: "Other",
};

const COMMUNITY_STATS = {
  total: 2847,
  pending: 134,
  resolved: 2591,
  topReason: "spam",
};

const RECENT_REPORTS = [
  { number: "+224 6XX XXX 432", reason: "spam",         status: "resolved",   date: "Jun 11, 2026 · 19:42" },
  { number: "+33 7XX XXX 018",  reason: "scam",         status: "pending",    date: "Jun 11, 2026 · 18:31" },
  { number: "+1 849 XXX XXXX",  reason: "harassment",   status: "resolved",   date: "Jun 11, 2026 · 17:15" },
  { number: "+55 11 XXXX XXXX", reason: "fake_account", status: "processing", date: "Jun 11, 2026 · 16:04" },
  { number: "+82 10 XXXX XXXX", reason: "spam",         status: "resolved",   date: "Jun 11, 2026 · 14:50" },
  { number: "+49 XXXX XXXXXX",  reason: "scam",         status: "pending",    date: "Jun 11, 2026 · 13:27" },
];

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  pending:    { color: "hsl(38 92% 65%)",  background: "hsl(38 92% 65% / 0.1)",  border: "1px solid hsl(38 92% 65% / 0.25)" },
  processing: { color: "hsl(213 94% 68%)", background: "hsl(213 94% 68% / 0.1)", border: "1px solid hsl(213 94% 68% / 0.25)" },
  resolved:   { color: "hsl(142 60% 55%)", background: "hsl(142 60% 55% / 0.1)", border: "1px solid hsl(142 60% 55% / 0.25)" },
};

export default function Stats() {
  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-8">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="text-center fade-up">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "hsl(263 70% 60% / 0.1)",
            border: "1px solid hsl(263 70% 60% / 0.28)",
            color: "hsl(263 70% 75%)",
          }}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Community Data
        </div>
        <h1 className="gradient-title text-4xl md:text-5xl font-extrabold tracking-tight mb-2" data-testid="text-stats-title">
          Statistics
        </h1>
        <p className="text-sm font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
          Community overview of all submitted reports worldwide
        </p>
      </div>

      {/* ── Live indicator ────────────────────────────────────── */}
      <div
        className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl fade-up"
        style={{
          background: "hsl(142 60% 45% / 0.06)",
          border: "1px solid hsl(142 60% 45% / 0.18)",
          animationDelay: "80ms",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-green-400 text-xs font-semibold">LIVE</span>
        </div>
        <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
          Updated in real-time · {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        </span>
        <Globe className="w-3.5 h-3.5 ml-auto" style={{ color: "hsl(263 70% 65%)" }} />
      </div>

      {/* ── Stats grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="Total Reports"
          value={COMMUNITY_STATS.total.toLocaleString()}
          icon={<ShieldAlert className="w-4 h-4" style={{ color: "hsl(263 70% 72%)" }} />}
          delay="100ms"
          accent="hsl(263 70% 60%)"
          testId="stat-total"
        />
        <StatCard
          title="Pending Review"
          value={COMMUNITY_STATS.pending.toLocaleString()}
          icon={<Clock className="w-4 h-4" style={{ color: "hsl(38 92% 65%)" }} />}
          delay="180ms"
          accent="hsl(38 92% 55%)"
          testId="stat-pending"
        />
        <StatCard
          title="Resolved"
          value={COMMUNITY_STATS.resolved.toLocaleString()}
          icon={<CheckCircle className="w-4 h-4" style={{ color: "hsl(142 60% 55%)" }} />}
          delay="260ms"
          accent="hsl(142 60% 45%)"
          testId="stat-resolved"
        />
        <StatCard
          title="Top Reason"
          value={REASON_LABELS[COMMUNITY_STATS.topReason]}
          icon={<BarChart3 className="w-4 h-4" style={{ color: "hsl(263 70% 72%)" }} />}
          delay="340ms"
          accent="hsl(263 70% 60%)"
          testId="stat-top-reason"
          isText
        />
      </div>

      {/* ── Success rate bar ─────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 fade-up space-y-3"
        style={{
          background: "hsl(265 30% 8%)",
          border: "1px solid hsl(265 25% 14%)",
          animationDelay: "420ms",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: "hsl(263 70% 72%)" }} />
            <span className="text-white text-sm font-semibold">Resolution Rate</span>
          </div>
          <span className="font-bold text-sm" style={{ color: "hsl(142 60% 55%)" }}>91.0%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(265 25% 14%)" }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: "91%",
              background: "linear-gradient(90deg, hsl(263 70% 60%), hsl(142 60% 50%))",
              boxShadow: "0 0 12px hsl(142 60% 50% / 0.4)",
            }}
          />
        </div>
        <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
          2,591 out of 2,847 reports successfully resolved
        </p>
      </div>

      {/* ── Recent reports table ─────────────────────────────── */}
      <div
        className="form-card overflow-hidden fade-up"
        style={{ animationDelay: "480ms" }}
        data-testid="reports-table"
      >
        <div
          className="flex items-center gap-2.5 px-5 py-4"
          style={{ borderBottom: "1px solid hsl(var(--border))" }}
        >
          <Activity className="w-4 h-4" style={{ color: "hsl(263 70% 72%)" }} />
          <h2 className="font-bold text-white text-sm">Recent Reports</h2>
          <span
            className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "hsl(263 70% 60% / 0.12)",
              color: "hsl(263 70% 75%)",
            }}
          >
            {RECENT_REPORTS.length} latest
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                {["Number", "Reason", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_REPORTS.map((report, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: "1px solid hsl(var(--border))" }}
                  className="transition-colors hover:bg-[hsl(263,70%,60%,0.04)]"
                >
                  <td className="px-5 py-3.5 font-semibold text-white text-sm font-mono">
                    {report.number}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-light" style={{ color: "hsl(var(--foreground))" }}>
                    {REASON_LABELS[report.reason]}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize"
                      style={STATUS_STYLE[report.status] ?? {}}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-light" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {report.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="px-5 py-3 text-center text-xs font-light"
          style={{
            borderTop: "1px solid hsl(var(--border))",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Numbers are anonymized for privacy
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title, value, icon, delay, accent, testId, isText = false,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  delay: string;
  accent: string;
  testId: string;
  isText?: boolean;
}) {
  return (
    <div
      className="stat-card fade-up"
      style={{ animationDelay: delay }}
      data-testid={testId}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
          {title}
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: `${accent} / 0.12`, background: `color-mix(in srgb, ${accent} 12%, transparent)` }}
        >
          {icon}
        </div>
      </div>
      <div
        className={`font-extrabold text-white ${isText ? "text-lg" : "text-3xl"}`}
        style={{ letterSpacing: isText ? "0" : "-0.03em" }}
      >
        {value}
      </div>
      <div
        className="mt-2 h-0.5 rounded-full w-8"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
    </div>
  );
}
