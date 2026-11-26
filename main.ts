import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const text = "Are you a neural network? Because you've got me training all night just to get a little closer to your loss function.";
const outputUrl = new URL("file:///output/", import.meta.url);
const outputDirectory = fileURLToPath(outputUrl);
const outputFile = fileURLToPath(new URL("entry.txt", outputUrl));
const expected = Buffer.from(text + "\n", "utf8");

if ([...text].length < 1 || [...text].length > 199 || /[\r\n]/.test(text)) {
  throw new Error("Entry does not satisfy the text gate");
}

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputFile, expected);
if (!readFileSync(outputFile).equals(expected)) {
  throw new Error("Written entry does not match the expected text");
}
