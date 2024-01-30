import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { PalWorld } from "./pals.ts";
import { BreedingCalculator } from "./breeding-calculator.ts";

Deno.test("BreedingCalculator.specialBreeds", () => {
  const palworld = new PalWorld();
  palworld.setup();
  const breedingCalculator = new BreedingCalculator(palworld);

  assert(
    breedingCalculator.specialBreeds.length > 0,
    "specialBreeds should not be empty"
  );
});

Deno.test("BreedingCalculator.parentsFor", () => {
  const palworld = new PalWorld();
  palworld.setup();
  const breedingCalculator = new BreedingCalculator(palworld);
  const pal = palworld.findPal("Mossanda")!;

  const parents = breedingCalculator.parentsFor(pal);
  assert(parents.length > 0, "parents should not be empty");
});