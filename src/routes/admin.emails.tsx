import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import {
  getEmailLog,
  getEmailStats,
  type EmailLogRow,
  type EmailStats,
} from "@/lib/admin-email.functions";

const ADMIN_KEY = "admin_emails_unlocked";
const ADMIN_PIN = "QUIETLETTER";

const STATUS_LABELS: Record<string, string> = {
  sent: "Sent",
  pending: "Pending",
  dlq: "Failed",
  suppressed: "Suppressed",
};

const STATUS_COLORS: Record<string, string> = {
  sent: "text-emerald-700 dark:text-emerald-400",
  pending: "text-amber-600 dark:text-amber-400",
  dlq: "text-destructive",
  suppressed: "text-muted-foreground",
};

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 3);
  return `${visible}***@${domain}`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const Route = createFileRoute("/admin/emails")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [{ title: "Email Dashboard — Admin" }],
  }),
  component: AdminEmailsPage,
});

function AdminEmailsPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(ADMIN_KEY) === "true");
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;
  return <Dashboard />;
}

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin.trim().toUpperCase() === ADMIN_PIN) {
      localStorage.setItem(ADMIN_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setPin("");
    }
  }

  return (
    <AppLayout className="flex min-h-[70vh] items-center justify-center pb-12">
      <div className="paper-panel w-full max-w-sm space-y-6 p-8">
        <div className="space-y-1">
          <div className="stitched-label">Admin</div>
          <h1 className="font-display text-2xl text-foreground">Email dashboard</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(false); }}
            placeholder="Access PIN"
            autoComplete="off"
            className="w-full rounded-none border border-border bg-background px-4 py-3 font-label tracking-widest text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground"
          />
          {error && (
            <p className="text-sm text-destructive">Incorrect PIN.</p>
          )}
          <Button type="submit" variant="note" className="w-full min-h-11" disabled={!pin.trim()}>
            Unlock
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}

function Dashboard() {
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [rows, setRows] = useState<EmailLogRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 25;

  async function load(p: number, s: string) {
    setLoading(true);
    try {
      const [statsData, logData] = await Promise.all([
        getEmailStats(),
        getEmailLog({ data: { page: p, status: s } }),
      ]);
      setStats(statsData);
      setRows(logData.rows);
      setTotal(logData.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load(page, statusFilter);
  }, [page, statusFilter]);

  function handleFilter(s: string) {
    setStatusFilter(s);
    setPage(0);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <AppLayout className="space-y-8 pb-12">
      <section className="space-y-2 py-2">
        <div className="stitched-label">Admin</div>
        <h1 className="font-display text-4xl leading-none text-foreground">Email dashboard</h1>
      </section>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Subscribers" value={stats.totalSubscribers} />
          <StatCard label="Active" value={stats.activeSubscribers} />
          <StatCard label="Sent" value={stats.sent} color="text-emerald-700 dark:text-emerald-400" />
          <StatCard label="Pending" value={stats.pending} color="text-amber-600 dark:text-amber-400" />
          <StatCard label="Failed" value={stats.dlq} color="text-destructive" />
          <StatCard label="Suppressed" value={stats.suppressed} />
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {["all", "sent", "pending", "dlq", "suppressed"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleFilter(s)}
            className={`rounded-full border px-3 py-1 text-xs font-label uppercase tracking-widest transition-colors ${
              statusFilter === s
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {s === "all" ? "All" : STATUS_LABELS[s] ?? s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="paper-panel overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No emails found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-label text-xs uppercase tracking-widest text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-label text-xs uppercase tracking-widest text-muted-foreground">Recipient</th>
                  <th className="px-4 py-3 text-left font-label text-xs uppercase tracking-widest text-muted-foreground">Template</th>
                  <th className="px-4 py-3 text-left font-label text-xs uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-label text-xs uppercase tracking-widest text-muted-foreground">Note</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-border/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {formatDate(row.created_at)}
                    </td>
                    <td className="px-4 py-3 font-label">{maskEmail(row.recipient_email)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.template_name}</td>
                    <td className={`px-4 py-3 font-label uppercase tracking-widest text-xs ${STATUS_COLORS[row.status] ?? ""}`}>
                      {STATUS_LABELS[row.status] ?? row.status}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-xs text-muted-foreground">
                      {row.error_message ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-3">
          <Button
            variant="paper"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="min-h-9"
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="paper"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="min-h-9"
          >
            Next
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Showing {rows.length} of {total} records. Recipient emails are partially masked.
      </p>
    </AppLayout>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="paper-panel space-y-1 p-4">
      <p className="text-xs font-label uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`font-display text-3xl ${color ?? "text-foreground"}`}>{value}</p>
    </div>
  );
}
