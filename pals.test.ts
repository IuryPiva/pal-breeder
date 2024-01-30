import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { PalWorld } from "./pals.ts";

Deno.test("PalWorld.parseRefMaps", () => {
  const palworld = new PalWorld();
  palworld.parseDataTable();
  assert(palworld.nameToPal);
});

Deno.test("PalWorld.findPal", () => {
  const palworld = new PalWorld();
  palworld.parseDataTable();
  const pal = palworld.findPal("Mossanda");
  assert(pal);
});

Deno.test("PalWorld.combiRanks", () => {
  const palworld = new PalWorld();
  palworld.parseDataTable();
  const combiRanks = palworld.getPalsByCombiRanks();
  assert(combiRanks.size > 0, "combiRanks should not be empty");
});
