import parsedJson from './parsed-save.json' with { type: "json" };
import { simplifyObject } from './simplify-object.ts';
import type { PalSaveData } from './types.ts';

const saveParameters: any[] = []

function readThroughString(obj: any, path: string, ignorePath: string = "") {
  const pathArr = path.split(".");
  let result = obj;

  for (const key of pathArr) {
    result = result[key];
  }

  return result;
}

function recursiveTraverse(obj: any, path: string) {
  for (const key in obj) {
    if (key === "SaveParameter") {
      readThroughString(parsedJson, path.split(".").slice(1, -1).join("."))
      saveParameters.push(obj[key]);

      break;
    }

    if (typeof obj[key] === "object") {
      recursiveTraverse(obj[key], `${path}.${key}`);
    }
  }
}

recursiveTraverse(parsedJson, "");

const isValidPalSaveData = (pal: unknown): pal is PalSaveData => {
  if (typeof pal !== "object" || pal === null) {
    return false;
  }

  return "CharacterID" in pal;
}

const pals: PalSaveData[] = simplifyObject(saveParameters).filter(isValidPalSaveData);

Deno.writeTextFileSync(
  "./pals.json",
  JSON.stringify(pals, null, 2) + "\n"
);
