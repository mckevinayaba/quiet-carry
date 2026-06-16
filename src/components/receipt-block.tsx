interface ReceiptBlockProps {
  from?: string;
  to?: string;
  date?: string;
  total?: string;
}

const rows = [
  { key: "from", label: "FROM" },
  { key: "to", label: "TO" },
  { key: "date", label: "DATE" },
  { key: "total", label: "TOTAL" },
] as const;

export function ReceiptBlock({ from, to, date, total }: ReceiptBlockProps) {
  const values = { from, to, date, total };
  const hasContent = Object.values(values).some(Boolean);

  if (!hasContent) return null;

  return (
    <section className="paper-panel receipt-panel space-y-3" aria-label="Note receipt details">
      {rows.map((row) => {
        const value = values[row.key];
        if (!value) return null;

        return (
          <div key={row.key} className="receipt-row grid grid-cols-[5.25rem_1fr] gap-3 pb-3 last:pb-0">
            <div className="font-label text-2xl text-foreground">{row.label}:</div>
            <p className="text-sm leading-6 text-foreground sm:text-base">{value}</p>
          </div>
        );
      })}
    </section>
  );
}
