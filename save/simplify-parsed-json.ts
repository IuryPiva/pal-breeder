import parsedJson from './parsed.json' with { type: "json" };

const simplified: any[] = []

function appendToObjectFromString(obj: any, str: string, value: any) {
  const keys = str.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!key) continue;

    // if key is number, then it's an array
    if (!isNaN(parseInt(key))) {
      if (current[key] === undefined) {
        current[key] = [];
      }
    } else {
      if (current[key] === undefined) {
        current[key] = {};
      }
    }

    if (i === keys.length) {
      current[key] = value;
    }

    current = current[key];
  }

  return obj
}

function recursiveTraverse(obj: any, path: string) {
  for (const key in obj) {
    if (key == "key") continue;

    if (typeof obj[key] === "object") {
      recursiveTraverse(obj[key], `${path}.${key}`);
    } else {
      appendToObjectFromString(simplified, path.replaceAll(".value", ""), obj[key]);
    }
  }
}

recursiveTraverse(parsedJson.slice(0, 10), "");
console.log(simplified);
Deno.writeTextFileSync("./simplified-parsed.json", JSON.stringify(simplified, null, 2) + "\n");


