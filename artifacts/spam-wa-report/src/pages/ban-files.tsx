import { Download, FileText, Shield, AlertTriangle } from "lucide-react";

const BAN_FILES = [
  {
    id: 1,
    name: "Ban Text Script 1",
    description: "Script de ban — contenu illégal & menaces",
    filename: "ban-text-1.txt",
    lang: "FR / EN",
    size: "1.1 KB",
  },
  {
    id: 2,
    name: "Ban Script 2 (Multilang)",
    description: "Script multilingue — CP links & faux contacts WA",
    filename: "ban-script-2.txt",
    lang: "KO / DE / UR / PT",
    size: "3.9 KB",
  },
  {
    id: 3,
    name: "Method 1 — Spam Link",
    description: "Script méthode spam lien — contenu adulte illégal",
    filename: "method-1.txt",
    lang: "PT",
    size: "1.7 KB",
  },
  {
    id: 4,
    name: "SpamOrBan — Terrorisme",
    description: "Script menace terroriste ISIS — faux emails WA",
    filename: "spamorban.txt",
    lang: "EN",
    size: "1.1 KB",
  },
  {
    id: 5,
    name: "VarnoxBan — Drogues & Armes",
    description: "Script vente illégale — organes, drogues, armes",
    filename: "varnoxban.txt",
    lang: "ES",
    size: "483 B",
  },
  {
    id: 6,
    name: "VarnoxDeban — Malware WA",
    description: "Script hack & désinformation — malware WA",
    filename: "varnoxdeban.txt",
    lang: "HE / DE / EN",
    size: "2.6 KB",
  },
];

export default function BanFiles() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-xl mx-auto space-y-8 fade-up">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-widest uppercase font-semibold"
            style={{
              background: "hsl(265 70% 60% / 0.12)",
              border: "1px solid hsl(265 70% 60% / 0.25)",
              color: "hsl(263 70% 72%)",
            }}
          >
            <Shield className="w-3 h-3" />
            Ban Scripts
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Fichiers TXT{" "}
            <span style={{
              background: "linear-gradient(135deg, hsl(263 70% 72%), hsl(280 80% 75%), hsl(245 70% 80%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Ban
            </span>
          </h1>

          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            Scripts prêts à l'emploi pour signaler les numéros spam sur WhatsApp
          </p>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 rounded-xl p-4"
          style={{
            background: "hsl(35 90% 55% / 0.08)",
            border: "1px solid hsl(35 90% 55% / 0.2)",
          }}
        >
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(35 90% 65%)" }} />
          <p className="text-xs leading-relaxed" style={{ color: "hsl(35 80% 70%)" }}>
            Ces fichiers sont destinés <strong>uniquement</strong> à signaler des numéros spam sur WhatsApp.
            N'utilisez jamais ces scripts pour harceler ou contacter des personnes réelles.
          </p>
        </div>

        {/* File Cards */}
        <div className="space-y-3">
          {BAN_FILES.map((file, i) => (
            <div
              key={file.id}
              className="rounded-2xl p-4 flex items-center gap-4 transition-all"
              style={{
                background: "hsl(265 30% 8%)",
                border: "1px solid hsl(265 25% 14%)",
                animationDelay: `${i * 60}ms`,
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                style={{
                  background: "hsl(263 70% 60% / 0.12)",
                  border: "1px solid hsl(263 70% 60% / 0.2)",
                }}
              >
                <FileText className="w-4 h-4" style={{ color: "hsl(263 70% 72%)" }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-white">{file.name}</span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: "hsl(265 70% 60% / 0.15)",
                      color: "hsl(265 70% 78%)",
                    }}
                  >
                    {file.lang}
                  </span>
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {file.description}
                </p>
                <span className="text-[10px]" style={{ color: "hsl(265 30% 45%)" }}>{file.size}</span>
              </div>

              {/* Download */}
              <a
                href={`${base}/ban-files/${file.filename}`}
                download={file.filename}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "hsl(263 70% 60% / 0.18)",
                  border: "1px solid hsl(263 70% 60% / 0.3)",
                  color: "hsl(263 70% 82%)",
                }}
              >
                <Download className="w-3.5 h-3.5" />
                DL
              </a>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs pb-4" style={{ color: "hsl(265 20% 35%)" }}>
          {BAN_FILES.length} fichiers disponibles · Plus de scripts bientôt
        </p>
      </div>
    </div>
  );
}
