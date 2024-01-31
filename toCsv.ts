import { BreedingCalculator } from "./breeding-calculator.ts";

const palsToCsv = () => {
  const bc = new BreedingCalculator();
  const headers = ["Name", "CombiRank", "BPClass"] as const;
  const csv = [headers.join(",")];

  for (const rank of bc.sortedRanks) {
    const pal = bc.palsByCombiRank.get(rank)!;
    const line = headers.map((header) => pal[header]).join(",");
    csv.push(line);
  }

  return csv.join("\n");
};

// write to pals.csv
const csv = palsToCsv();
const encoder = new TextEncoder();
await Deno.writeFile("pals.csv", encoder.encode(csv));
