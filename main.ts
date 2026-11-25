// One Line, One Laugh: Roast Your Fridge
// Writes a single roast line (<=200 chars) to /output/entry.txt.
// Runs on Node 22, stdlib only, no network, no secrets.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// Setup states the recognisable detail (a 1% battery that never dies);
// the payoff lands in the last few words (the phone is lying to stay calm).
const SETUP = "My phone has been at 1% for three hours now,";
const PAYOFF = "like it's lying to my face to keep me calm while it dies in my hand.";

function buildRoast(setup: string, payoff: string): string {
  const line = `${setup} ${payoff}`;
  if (line.length < 1 || line.length > 200) {
    throw new Error(`roast must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("roast must be a single non-blank line");
  }
  return line;
}

const ROAST = buildRoast(SETUP, PAYOFF);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(target, ROAST, "utf8");
chmodSync(target, 0o644);
console.log(`wrote ${ROAST.length} chars to ${target}`);
