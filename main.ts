import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
if (!scriptPath) throw new Error("Unable to resolve script path");

const line = "Are you a neural network? Because you've got me training all night just to get a little closer to your loss function.";
const characterCount = [...line].length;
if (characterCount < 1 || characterCount > 199 || /[\r\n]/.test(line)) {
  throw new Error("Entry does not satisfy the text gate");
}

const expected = Buffer.from(`${line}\n`, "utf8");
await mkdir("/output", { recursive: true });
await writeFile("/output/entry.txt", expected);
const actual = await readFile("/output/entry.txt");
if (!actual.equals(expected)) throw new Error("Written entry does not match expected bytes");
