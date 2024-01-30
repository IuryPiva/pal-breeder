import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { PalWorld } from "./pals.ts";

Deno.test("PalWorld.parseRefMaps", () => {
  const palworld = new PalWorld();
  palworld.parseRefMaps();
  assert(palworld.palNameToRef);
});

Deno.test("PalWorld.findPal", () => {
  const palworld = new PalWorld();
  palworld.parseRefMaps();
  const pal = palworld.findPal("Mossanda");
  assert(pal);
});

Deno.test("PalWorld.specialBreeds", () => {
  const palworld = new PalWorld();
  palworld.parseRefMaps();
  palworld.parseSpecialBreeds();

  assert(
    palworld.specialBreeds.length > 0,
    "specialBreeds should not be empty"
  );
});

Deno.test("PalWorld.combiRanks", () => {
  const palworld = new PalWorld();
  palworld.parseRefMaps();
  const combiRanks = palworld.combiRanks();
  assert(Object.keys(combiRanks).length > 0, "combiRanks should not be empty");
});
