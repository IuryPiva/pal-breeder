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

Deno.test("BreedingCalculator.getOffspringFor", () => {
  const reference = new Set([
    "Beakon",
    "Beakon",
    "Beakon",
    "Menasting",
    "Menasting",
    "Menasting",
    "Menasting",
    "Menasting",
    "Relaxaurus",
    "Relaxaurus",
    "Relaxaurus",
    "Relaxaurus",
    "Jormuntide",
    "Mossanda Lux",
    "Reptyro",
    "Reptyro",
    "Elizabee",
    "Elizabee",
    "Warsect ",
    "Warsect ",
    "Quivern",
    "Pyrin",
    "Pyrin",
    "Pyrin",
    "Pyrin",
    "Ragnahawk",
    "Ragnahawk",
    "Ragnahawk",
    "Ragnahawk",
    "Ragnahawk",
    "Sweepa",
    "Sweepa",
    "Sweepa",
    "Sweepa",
    "Nitewing",
    "Nitewing",
    "Mossanda",
    "Mossanda",
    "Sibelyx",
    "Sibelyx",
    "Sibelyx",
    "Sibelyx",
    "Wumpo",
    "Wumpo",
    "Kingpaca",
    "Wumpo Botan",
    "Wumpo Botan",
    "Wumpo Botan",
    "Cinnamoth",
    "Azurobe",
    "Azurobe",
    "Azurobe",
    "Grintale",
    "Penking",
    "Elphidran",
    "Elphidran",
    "Elphidran",
    "Surfent",
    "Anubis",
    "Anubis",
    "Grizzbolt",
    "Incineram",
    "Incineram",
    "Lyleen",
    "Incineram",
    "Incineram",
    "Bushi",
    "Bushi",
    "Bushi",
    "Bushi",
    "Bushi",
    "Bushi",
    "Vanwyrm",
    "Vanwyrm",
    "Vanwyrm",
    "Vanwyrm",
    "Vanwyrm",
    "Univolt",
    "Univolt",
    "Univolt",
    "Univolt",
    "Univolt",
    "Blazehowl",
    "Blazehowl",
    "Blazehowl",
    "Blazehowl",
    "Rayhound",
    "Rayhound",
    "Rayhound",
    "Rayhound",
    "Tombat",
    "Tombat",
    "Tombat",
    "Foxcicle",
    "Foxcicle",
    "Foxcicle",
    "Petallia",
    "Petallia",
    "Arsox",
    "Arsox",
    "Arsox",
    "Arsox",
    "Chillet",
    "Dinossom",
    "Dinossom",
    "Kitsun",
    "Kitsun",
    "Kitsun",
    "Digtoise",
    "Digtoise",
    "Digtoise",
    "Digtoise",
    "Broncherry",
    "Broncherry",
    "Celaray",
    "Reindrix",
    "Reindrix",
    "Melpaca",
    "Melpaca",
    "Dumud",
    "Dumud",
    "Mozzarina",
    "Mozzarina",
    "Eikthyrdeer",
    "Eikthyrdeer",
    "Eikthyrdeer",
    "Eikthyrdeer",
    "Caprity",
    "Caprity",
    "Caprity",
    "Lovander",
    "Lovander",
    "Loupmoon",
    "Loupmoon",
    "Loupmoon",
    "Loupmoon",
    "Loupmoon",
  ]);
  const breedingCalculator = new BreedingCalculator();
  const pal = breedingCalculator.palWorld.findPal("Mossanda")!;

  const offspring = breedingCalculator.getOffspringFor(pal);
  const offspringNames = new Set(offspring.map((pal) => pal.Name));

  let hasError = false;

  if (offspringNames.size !== reference.size) {
    console.error(
      "My results: ",
      offspringNames.size,
      "Reference: ",
      reference.size
    );

    hasError = true;
  }

  for (const item of reference) {
    if (!offspringNames.has(item)) {
      console.error("Missing: ", item);
      hasError = true;
    }
  }

  for (const item of offspringNames) {
    if (!item || !reference.has(item)) {
      console.error("Extra: ", item);
      hasError = true;
    }
  }

  assert(!hasError, "Error in getOffspringFor");
});
