const isObject = (obj: unknown): obj is AnyObject =>
  obj !== null && typeof obj === "object";

type AnyObject = Record<string, any>;

export const simplifyObject = (obj: AnyObject): AnyObject => {
  if (isObject(obj)) {
    if ("value" in obj) {
      if (isObject(obj.value)) {
        return simplifyObject(obj.value);
      }

      return obj.value;
    }

    if ("Value" in obj) {
      if (isObject(obj.Value)) {
        return simplifyObject(obj.Value);
      }

      return obj.Value;
    }

    if ("values" in obj) {
      if (Array.isArray(obj.values)) {
        return obj.values.map((value) => simplifyObject(value));
      }
    }

    for (const [key, value] of Object.entries(obj)) {
      if (isObject(value)) {
        obj[key] = simplifyObject(value);
      }
    }
  }

  return obj;
};
