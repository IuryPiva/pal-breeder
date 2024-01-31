import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { palMapArray, palTranslations, PalWithOptionalName } from "./pal-db.ts";
import { Pal } from "./types.ts";

function validatePal(pal: PalWithOptionalName | Pal): pal is Pal {
  return Boolean(pal.Name && typeof pal.Order === "number");
}

export class PalWorld {
  pals = new Map<string, Pal>();
  palCodeToName = palTranslations;
  nameToPal = {} as Record<string, Pal>;

  constructor() {
    this.parseDataTable();
  }

  parseDataTable() {
    let order = 0;

    palMapArray.forEach(([ref, pal]) => {
      const code =
        pal.OverrideNameTextID !== "None"
          ? pal.OverrideNameTextID
          : "PAL_NAME_" + ref;

      const name = this.palCodeToName[code] ?? code;
      pal.Name = name;
      pal.Order = order++;

      assert(validatePal(pal), `Invalid pal: ${JSON.stringify(pal)}`);

      this.pals.set(ref, pal);
      this.nameToPal[pal.Name] = pal;
    });
  }

  findPal(refOrName: string): Pal | undefined {
    return this.nameToPal[refOrName] ?? this.pals.get(refOrName);
  }

  getPalsByCombiRank() {
    const palsByCombiRank = new Map<number, Pal>();

    this.pals.forEach((pal) => {
      if (!pal.CombiRank || pal.CombiRank == 9999) return;
      palsByCombiRank.set(pal.CombiRank, pal);
    });

    return palsByCombiRank;
  }
}
