import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { specialBreedsText } from "./pal-db.ts";
import { PalWorld } from "./pals.ts";
import { Pal } from "./types.ts";

type IndexedRange = {
  index: number;
  range: [number, number];
};

export class BreedingCalculator {
  palWorld: PalWorld;
  palsByCombiRank: Map<number, Pal>;
  sortedRanks: number[];
  specialBreeds: [Pal, Pal, Pal][] = [];

  private parseSpecialBreeds() {
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

  constructor() {
    this.palWorld = new PalWorld();
    this.palsByCombiRank = this.palWorld.getPalsByCombiRank();
    this.sortedRanks = [...this.palsByCombiRank.keys()].sort((a, b) => a - b);
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
    const mates: Pal[] = [];

    for (let i = childrenRankRange.index; i <= this.sortedRanks.length; i++) {
      const mateRank = this.sortedRanks[i];
      const possibleChildrenRank = (mateRank + parentRank) / 2;

      if (possibleChildrenRank < childrenRankRange.range[0]) {
        continue;
      }

      if (possibleChildrenRank >= childrenRankRange.range[1]) {
        break;
      }

      mates.push(this.palsByCombiRank.get(mateRank)!);
    }

    return mates;
  }

  getSpecialBreedParents(pal: Pal): [Pal, Pal][] {
    return this.specialBreeds
      .filter((breed) => breed.at(-1) == pal)
      .map((breed) => [breed[0], breed[1]] as [Pal, Pal]);
  }

  parentsFor(pal: Pal) {
    const parents: [Pal, Pal][] = this.getSpecialBreedParents(pal);

    if (parents.length > 0) return parents.concat([[pal, pal]]);

    const childrenRankRange = this.getChildrenRankRange(pal.CombiRank);

    for (const rank of this.sortedRanks) {
      if (rank > pal.CombiRank) break;
      const ref = this.palsByCombiRank.get(rank)!;

      this.findMates(childrenRankRange, rank).forEach((mate) => {
        parents.push([ref, mate]);
      });
    }

    return parents;
  }

  possibleOffspringFor(pal: Pal): Pal[] {
    const offspring = new Set<Pal>();

    for (const rank of this.sortedRanks) {
      const child = this.palsByCombiRank.get(rank)!;

      if (child.Parent1 === parent1.Ref && child.Parent2 === parent2.Ref) {
        offspring.add(child);
      }
    }

    return Array.from(offspring);
  }
}
