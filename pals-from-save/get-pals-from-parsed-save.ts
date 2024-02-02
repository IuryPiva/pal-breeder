import parsedJson from './parsed-save.json' with { type: "json" };

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

const isObject = (obj: any) => obj !== null && typeof obj === "object";
const isDefined = (value: any) => value !== undefined;
const hasValue = (obj: any) => isObject(obj) && isDefined(obj.value);

function simplifyObject(obj: any) {
  if (isObject(obj)) {
    if (isDefined(obj.value)) {
      if (isObject(obj.value)) {
        return simplifyObject(obj.value);
      }

      return obj.value;
    }

    if (isDefined(obj.Value)) {
      if (isObject(obj.Value)) {
        return simplifyObject(obj.Value);
      }

      return obj.Value;
    }

    if (isDefined(obj.values)) {
      if (Array.isArray(obj.values)) {
        return obj.values.map((value) => simplifyObject(value));
      };
    }

    for (const key in obj) {
      if (isObject(obj[key])) {
        obj[key] = simplifyObject(obj[key]);
      }
    }
  }

  return obj;
}

const pals = simplifyObject(saveParameters).filter(value => !value.IsPlayer);

Deno.writeTextFileSync(
  "./pals.json",
  JSON.stringify(pals, null, 2) + "\n"
);
