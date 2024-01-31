import { assert } from "https://deno.land/std@0.213.0/assert/assert.ts";
import { canOnlyBreedSameSpecies, specialBreedsNames } from "./pal-db.ts";
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
  uniqueBreeds: Pal[] = [];

  private parseSpecialBreeds() {
    specialBreedsNames.map((palNames) => {
      const pals = palNames.map((name) => {
        const pal = this.palWorld.findPal(name);

        assert(pal, `Could not find pal with name: ${name}`);

        return pal;
      }) as [Pal, Pal, Pal]; // https://twitter.com/IuryPiva/status/1752342264389554548;

      this.specialBreeds.push(pals);
    });

    canOnlyBreedSameSpecies.forEach((name) => {
      const pal = this.palWorld.findPal(name);

      assert(pal, `Could not find pal with name: ${name}`);

      this.uniqueBreeds.push(pal);
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

    for (let i = 0; i <= this.sortedRanks.length; i++) {
      const mateRank = this.sortedRanks[i];
      const possibleChildrenRank = (mateRank + parentRank) / 2;

      if (possibleChildrenRank < childrenRankRange.range[0]) {
        continue;
      }

      if (possibleChildrenRank >= childrenRankRange.range[1]) {
        break;
      }

      const mate = this.palsByCombiRank.get(mateRank);
      if (mate) mates.push(mate);
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

  getOffspringFor(pal: Pal): Pal[] {
    const offspring = new Set<Pal>();

    for (const rank of this.sortedRanks) {
      const possibleChild = this.palsByCombiRank.get(rank)!;

      const mates = this.findMates(
        this.getChildrenRankRange(rank),
        pal.CombiRank
      );

      if (mates.length) {
        offspring.add(possibleChild);
      }
    }

    // remove special breeds that pal is not one of the parents
    this.specialBreeds.forEach((breed) => {
      if (pal === breed[0] || pal === breed[1]) {
        offspring.add(breed[2]);
      } else {
        offspring.delete(breed[2]);
      }
    });

    // remove pals that can only breed with themselves
    this.uniqueBreeds.forEach((p) => {
      offspring.delete(p);
    });

    return Array.from(offspring);
  }
}
