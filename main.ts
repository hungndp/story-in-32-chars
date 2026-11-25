// Tell a Whole Story in 32 Characters — make.fun bounty entry.
// Writes the single Wi-Fi network name (32 chars max) to /output/entry.txt
// (no trailing newline) and prints it to stdout. Node 22.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry name, built in two parts: the setup — Dad's bequest, the Wi-Fi —
// then the reversal, which lands on the last word: the debts came with it.
const SETUP = "DadLeftMeTheWiFiAndAll";
const PUNCH = "HisDebts";
const NAME = SETUP + PUNCH;
const CHAR_LIMIT = 32; // chars — the gate caps the file at 32

// A network name a phone shows in its list: printable ASCII only, no
// control characters, and it must read as one name, not a sentence fragment.
function assertSsidShape(name: string): void {
  if (/[^\x20-\x7e]/.test(name)) {
    throw new Error("name must be printable ASCII only");
  }
  if (name.includes("\n") || name.includes("\r")) {
    throw new Error("name must be a single line");
  }
}

function main(): void {
  assertSsidShape(NAME);
  if (NAME.length < 1 || NAME.length > CHAR_LIMIT) {
    throw new Error(`name is ${NAME.length} chars, limit is ${CHAR_LIMIT}`);
  }
  if (NAME !== NAME.trim()) {
    throw new Error("name must not start or end with whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", NAME, { encoding: "utf-8" });
  process.stdout.write(NAME + "\n");
}

main();
