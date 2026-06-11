import {
  useGetReportStats,
  useListReports,
  getGetReportStatsQueryKey,
  getListReportsQueryKey,
} from "@workspace/api-client-react";
import { format } from "date-fns";
import { ShieldAlert, CheckCircle, Clock, BarChart3, Activity, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const STATUS_COLORS: Record<string, string> = {
  pending:    "text-amber-400  bg-amber-400/10  border-amber-400/30",
  processing: "text-blue-400   bg-blue-400/10   border-blue-400/30",
  resolved:   "text-green-400  bg-green-400/10  border-green-400/30",
};

const REASON_LABELS: Record<string, string> = {
  spam:        "Spam",
  scam:        "Scam",
  harassment:  "Harassment",
  fake_account:"Fake Account",
  other:       "Other",
};

export default function Stats() {
  const { data: stats, isLoading: isStatsLoading } = useGetReportStats({
    query: { queryKey: getGetReportStatsQueryKey() },
  });
  const { data: reports, isLoading: isReportsLoading } = useListReports({
    query: { queryKey: getListReportsQueryKey() },
  });

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-8">

      {/* Header */}
      <div className="text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(263_70%_60%/0.3)] bg-[hsl(263_70%_60%/0.06)] mb-4">
          <TrendingUp className="w-3.5 h-3.5 text-[hsl(263,70%,72%)]" />
          <span className="text-[hsl(263,70%,72%)] text-xs font-medium tracking-widest uppercase">Live Data</span>
        </div>
        <h1
          className="gradient-title text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
          data-testid="text-stats-title"
        >
          Statistics
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm font-light">
          Live overview of all submitted reports
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="Total Reports"
          value={stats?.total}
          icon={<ShieldAlert className="w-4 h-4 text-[hsl(263,70%,72%)]" />}
          loading={isStatsLoading}
          testId="stat-total"
          delay="delay-100"
        />
        <StatCard
          title="Pending"
          value={stats?.pending}
          icon={<Clock className="w-4 h-4 text-amber-400" />}
          loading={isStatsLoading}
          testId="stat-pending"
          delay="delay-200"
        />
        <StatCard
          title="Resolved"
          value={stats?.resolved}
          icon={<CheckCircle className="w-4 h-4 text-green-400" />}
          loading={isStatsLoading}
          testId="stat-resolved"
          delay="delay-300"
        />
        <StatCard
          title="Top Reason"
          value={stats?.topReason ? REASON_LABELS[stats.topReason] ?? stats.topReason : "—"}
          icon={<BarChart3 className="w-4 h-4 text-[hsl(263,70%,72%)]" />}
          loading={isStatsLoading}
          testId="stat-top-reason"
          delay="delay-400"
          isText
        />
      </div>

      {/* Reports table */}
      <div
        className="form-card overflow-hidden animate-fade-up delay-500"
        data-testid="reports-table"
      >
        <div
          className="flex items-center gap-2 px-5 py-4"
          style={{ borderBottom: "1px solid hsl(var(--border))" }}
        >
          <Activity className="w-4 h-4 text-[hsl(263,70%,72%)]" />
          <h2 className="font-semibold text-white text-sm">Recent Reports</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                {["Number", "Reason", "Status", "Date"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isReportsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                    {Array.from({ length: 4 }).map((__, j) => (
                      <td key={j} className="px-5 py-3.5">
                        <Skeleton className="h-3.5 w-20 bg-[hsl(265,25%,18%)]" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : !reports || reports.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-10 text-center text-[hsl(var(--muted-foreground))] text-sm font-light"
                    data-testid="text-no-reports"
                  >
                    No reports submitted yet.
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr
                    key={report.id}
                    data-testid={`row-report-${report.id}`}
                    style={{ borderBottom: "1px solid hsl(var(--border))" }}
                    className="hover:bg-[hsl(263,70%,60%,0.04)] transition-colors"
                  >
                    <td className="px-5 py-3.5 font-medium text-white text-sm">
                      {report.targetNumber}
                    </td>
                    <td className="px-5 py-3.5 text-[hsl(var(--foreground))] text-sm font-light">
                      {REASON_LABELS[report.reason] ?? report.reason}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${STATUS_COLORS[report.status] ?? ""}`}
                        data-testid={`status-report-${report.id}`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[hsl(var(--muted-foreground))] text-xs font-light">
                      {format(new Date(report.createdAt), "MMM dd, yyyy · HH:mm")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title, value, icon, loading, testId, delay, isText = false,
}: {
  title: string;
  value: string | number | undefined;
  icon: React.ReactNode;
  loading: boolean;
  testId: string;
  delay: string;
  isText?: boolean;
}) {
  return (
    <div className={`stat-card animate-fade-up ${delay}`} data-testid={testId}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-semibold uppercase tracking-widest">
          {title}
        </span>
        {icon}
      </div>
      {loading ? (
        <Skeleton className="h-8 w-16 bg-[hsl(265,25%,18%)]" />
      ) : (
        <div className={`font-bold text-white animate-count-up ${isText ? "text-base" : "text-3xl"}`}>
          {value ?? 0}
        </div>
      )}
    </div>
  );
}
