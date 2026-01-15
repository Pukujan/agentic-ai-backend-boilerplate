import express from "express";
import cors from "cors";
import { supabase } from "./shared/db";
import { pingSupabase } from "./shared/db/ping";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/supabase-health", async (_req, res) => {
  const { data, error } = await supabase
    .from("information_schema.tables")
    .select("table_name")
    .limit(1);

  if (error) return res.status(500).json({ ok: false, error: error.message });
  return res.json({ ok: true, sample: data });
});

// Optional: keep this if you already use it (requires `events` table)
app.get("/db-health", async (_req, res) => {
  try {
    const data = await pingSupabase();
    res.json({ ok: true, sample: data });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message ?? "db error" });
  }
});

export default app;
