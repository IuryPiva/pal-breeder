import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { palMapArray, palTranslations, specialBreedsText } from "./pal-db.ts";
import { Pal } from "./types.ts";

export class PalWorld {
  pals = new Map(palMapArray);
  palCodeToName = palTranslations;
  palCodeToRef = {} as { [key: string]: string };
  palNameToRef = {} as { [key: string]: string };
  specialBreeds: [Pal, Pal, Pal][] = [];

  setup() {
    this.parseRefMaps();
    this.parseSpecialBreeds();
  }

  parseRefMaps() {
    this.pals.forEach((pal, ref) => {
      const code = pal.OverrideNameTextID ?? "PAL_NAME_" + ref;
      const name = this.palCodeToName[code] ?? code;
      this.palCodeToRef[code] = ref;
      this.palNameToRef[name] = ref;
    });
  }

  parseSpecialBreeds() {
    specialBreedsText.split("\n").map((line) => {
      const [parent1, rest] = line.split("+");
      const [parent2, child] = rest.split("=");

      const palNames = [parent1, parent2, child].map((name) => name.trim());

      const pals = palNames.map((name) => {
        const pal = this.findPal(name);

        assert(pal, `Could not find pal with name: ${name}`);

        return pal;
      }) as [Pal, Pal, Pal]; // https://twitter.com/IuryPiva/status/1752342264389554548;

      this.specialBreeds.push(pals);
    });
  }

  findRef(refOrName: string): string {
    return this.palNameToRef[refOrName] ?? refOrName;
  }

  findPal(refOrName: string): Pal | undefined {
    return this.pals.get(this.findRef(refOrName));
  }

  combiRanks() {
    const refCombiRank = {} as { [key: number]: string };

    this.pals.forEach((pal, ref) => {
      if (!pal.CombiRank || pal.CombiRank == 9999) return;
      refCombiRank[pal.CombiRank] = ref;
    });

    return refCombiRank;
  }
}
