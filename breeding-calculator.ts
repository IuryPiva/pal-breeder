import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { specialBreedsText } from "./pal-db.ts";
import { PalWorld } from "./pals.ts";
import { Pal } from "./types.ts";

type Mate = {
  ref: string;
  rank: number;
  index: number;
};

type IndexedRange = {
  index: number;
  range: [number, number];
};

export class BreedingCalculator {
  combiRanks: Map<number, string>;
  sortedRanks: number[];

  constructor(public palWorld: PalWorld) {
    this.combiRanks = this.palWorld.getCombiRanks();
    this.sortedRanks = [...this.combiRanks.keys()].sort((a, b) => a - b);
    this.parseSpecialBreeds();
  }

  getChildrenRankRange(childrenRank: number) {
    const index = this.sortedRanks.findIndex((r) => r === childrenRank);
    if (index === -1) {
      throw new Error(`Rank ${childrenRank} not found`);
    }

    return {
      index,
      range: [childrenRank, this.sortedRanks[index + 1]],
    } satisfies IndexedRange;
  }

  findMates(
    childrenRankRange: { index: number; range: [number, number] },
    parentRank: number
  ) {
    const mates: Mate[] = [];

    for (let i = childrenRankRange.index; i <= this.sortedRanks.length; i++) {
      const mateRank = this.sortedRanks[i];
      const possibleChildrenRank = (mateRank + parentRank) / 2;

      if (possibleChildrenRank < childrenRankRange.range[0]) {
        continue;
      }

      if (possibleChildrenRank >= childrenRankRange.range[1]) {
        break;
      }

      mates.push({
        ref: this.combiRanks.get(mateRank)!,
        rank: mateRank,
        index: i,
      });
    }

    return mates;
  }

  parentsFor(pal: Pal) {
    const parents: (string | number)[][] = [];

    const childrenRankRange = this.getChildrenRankRange(pal.CombiRank);

    for (const rank of this.sortedRanks) {
      if (rank > pal.CombiRank) break;
      const ref = this.combiRanks.get(rank)!;

      this.findMates(childrenRankRange, rank).forEach((mate) => {
        parents.push([rank, ref, mate.rank, mate.ref]);
      });
    }

    return parents;
  }

  specialBreeds: [Pal, Pal, Pal][] = [];

  parseSpecialBreeds() {
    specialBreedsText.split("\n").map((line) => {
      const [parent1, rest] = line.split("+");
      const [parent2, child] = rest.split("=");

      const palNames = [parent1, parent2, child].map((name) => name.trim());

      const pals = palNames.map((name) => {
        const pal = this.palWorld.findPal(name);

        assert(pal, `Could not find pal with name: ${name}`);

        return pal;
      }) as [Pal, Pal, Pal]; // https://twitter.com/IuryPiva/status/1752342264389554548;

      this.specialBreeds.push(pals);
    });
  }
}
