import { palMapArray, palTranslations } from "./pal-db.ts";
import { Pal } from "./types.ts";

export class PalWorld {
  pals = new Map(palMapArray);
  palCodeToName = palTranslations;
  palCodeToRef = {} as { [key: string]: string };
  palNameToRef = {} as { [key: string]: string };

  setup() {
    this.parseRefMaps();
  }

  parseRefMaps() {
    this.pals.forEach((pal, ref) => {
      const code = pal.OverrideNameTextID ?? "PAL_NAME_" + ref;
      const name = this.palCodeToName[code] ?? code;
      this.palCodeToRef[code] = ref;
      this.palNameToRef[name] = ref;
    });
  }

  findRef(refOrName: string): string {
    return this.palNameToRef[refOrName] ?? refOrName;
  }

  findPal(refOrName: string): Pal | undefined {
    return this.pals.get(this.findRef(refOrName));
  }

  getCombiRanks() {
    const refCombiRank = new Map<number, string>();

    this.pals.forEach((pal, ref) => {
      if (!pal.CombiRank || pal.CombiRank == 9999) return;
      refCombiRank.set(pal.CombiRank, ref);
    });

    return refCombiRank;
  }
}
