import { palMapArray, palTranslations } from "./pal-db.ts";
import { Pal } from "./types.ts";

export class PalWorld {
  pals = new Map(palMapArray);
  palCodeToName = palTranslations;
  nameToPal = {} as Record<string, Pal>;

  setup() {
    this.parseDataTable();
  }

  parseDataTable() {
    this.pals.forEach((pal, ref) => {
      const code = pal.OverrideNameTextID ?? "PAL_NAME_" + ref;
      const name = this.palCodeToName[code] ?? code;

      this.nameToPal[name] = pal;
    });
  }

  findPal(refOrName: string): Pal | undefined {
    return this.nameToPal[refOrName] ?? this.pals.get(refOrName);
  }

  getPalsByCombiRanks() {
    const palsByCombiRank = new Map<number, Pal>();

    this.pals.forEach((pal) => {
      if (!pal.CombiRank || pal.CombiRank == 9999) return;
      palsByCombiRank.set(pal.CombiRank, pal);
    });

    return palsByCombiRank;
  }
}
