import { JSONParser } from "npm:@streamparser/json";

const jsonparser = new JSONParser({
  paths: ["$.properties.worldSaveData.value.CharacterSaveParameterMap"],
});

jsonparser.onValue = ({ value, key, parent, stack, partial }) => {
  if (partial) {
    // console.log(`Parsing value: ${value}... (still parsing)`);
    console.log("Parsing");
  } else {
    // write value to parsed.json
    Deno.writeTextFileSync(
      "./parsed.json",
      JSON.stringify(value, null, 2) + "\n"
    );
  }
};

// const levelSavJson = Deno.readTextFileSync("./Level.sav.json");
const file = await Deno.open("./Level.sav.json");
const buffer = new Uint8Array(511 * 1024 * 1024);
let bytesRead = await file.read(buffer);

while (bytesRead !== null) {
  jsonparser.write(new TextDecoder().decode(buffer.subarray(0, bytesRead)));
  console.log(`Read ${bytesRead}`);
  bytesRead = await file.read(buffer);

  if (bytesRead === null) {
    console.log("EOF");
  }
}

file.close();
