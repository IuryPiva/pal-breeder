import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { BreedingCalculator } from "./breeding-calculator.ts";

Deno.test("BreedingCalculator.specialBreeds", () => {
  const breedingCalculator = new BreedingCalculator();

  assert(
    breedingCalculator.specialBreeds.length > 0,
    "specialBreeds should not be empty"
  );
});

Deno.test("BreedingCalculator.parentsFor", () => {
  const breedingCalculator = new BreedingCalculator();
  const pal = breedingCalculator.palWorld.findPal("Mossanda")!;

  const parents = breedingCalculator.parentsFor(pal);
  assert(parents.length > 0, "parents should not be empty");
});

Deno.test("BreedingCalculator.parentsFor specialBreed", () => {
  const breedingCalculator = new BreedingCalculator();
  const pal = breedingCalculator.palWorld.findPal("Mossanda Lux")!;

  const parents = breedingCalculator.parentsFor(pal);
  assert(parents.length > 0, "parents should not be empty");
});
