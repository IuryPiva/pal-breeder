import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { PalWorld } from "./pals.ts";
import { BreedingCalculator } from "./breeding-calculator.ts";

Deno.test("BreedingCalculator.parentsFor", () => {
  const palworld = new PalWorld();
  palworld.setup();
  const breedingCalculator = new BreedingCalculator(palworld);

  const pal = palworld.findPal("Mossanda")!;
  console.log(breedingCalculator.getChildrenRankRange(pal.CombiRank));
  const parents = breedingCalculator.parentsFor(pal);
  console.log({ pal: pal.CombiRank, parents });

  assert(parents.length > 0, "parents should not be empty");
});

Deno.test("BreedingCalculator.specialBreeds", () => {
  const palworld = new PalWorld();
  palworld.setup();
  const breedingCalculator = new BreedingCalculator(palworld);
  breedingCalculator.parseSpecialBreeds();

  assert(
    breedingCalculator.specialBreeds.length > 0,
    "specialBreeds should not be empty"
  );
});
