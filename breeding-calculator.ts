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

  getChildrenRankRange(children: Pal) {
    const sorterdRanksWithoutSpecialBreeds = this.sortedRanks.filter(
      (rank) => !this.specialBreeds.some((breed) => breed[2].CombiRank === rank)
    );
    const index = sorterdRanksWithoutSpecialBreeds.findIndex(
      (r) => r === children.CombiRank
    );

    if (index === -1) {
      throw new Error(`Rank ${children.CombiRank} not found`);
    }

    let startRange = children.CombiRank;
    const previousRank = sorterdRanksWithoutSpecialBreeds[index - 1];

    if (previousRank) {
      const previousPal = this.palsByCombiRank.get(previousRank)!;

      // check distance to previous rank
      const previousRankDistance = Math.floor(
        (children.CombiRank - sorterdRanksWithoutSpecialBreeds[index - 1]) / 2
      );

      if (previousPal.Order < children.Order) {
        startRange = children.CombiRank - previousRankDistance + 1;
      } else {
        startRange = children.CombiRank - previousRankDistance;
      }
    }

    let endRange = children.CombiRank;
    const nextRank = sorterdRanksWithoutSpecialBreeds[index + 1];

    if (nextRank) {
      const nextPal = this.palsByCombiRank.get(nextRank)!;

      // check distance to next rank
      const nextRankDistance = Math.floor(
        (sorterdRanksWithoutSpecialBreeds[index + 1] - children.CombiRank) / 2
      );

      if (nextPal.Order < children.Order) {
        endRange = children.CombiRank + nextRankDistance - 1;
      } else {
        endRange = children.CombiRank + nextRankDistance;
      }
    }

    return [startRange, endRange] satisfies [number, number];
  }

  findMates(childrenRankRange: [number, number], parentRank: number) {
    const mates: Pal[] = [];

    for (let i = 0; i <= this.sortedRanks.length; i++) {
      const mateRank = this.sortedRanks[i];
      const possibleChildrenRank = (mateRank + parentRank) / 2;

      if (possibleChildrenRank < childrenRankRange[0]) {
        continue;
      }

      if (possibleChildrenRank >= childrenRankRange[1]) {
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

    const childrenRankRange = this.getChildrenRankRange(pal);

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

      // skip if possibleChild is specialBreed
      if (this.specialBreeds.some((breed) => breed[2] === possibleChild)) {
        continue;
      }

      const mates = this.findMates(
        this.getChildrenRankRange(possibleChild),
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
