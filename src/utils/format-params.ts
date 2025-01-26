type ParamsValue = Params | ParamsValue[] | boolean | number | string | undefined;

export interface Params {
  [key: string]: ParamsValue;
}

function serializeValue(value: ParamsValue): string {
  if (value === undefined) return '';
  if (typeof value === 'boolean' || typeof value === 'number') return value.toString();
  if (Array.isArray(value)) return value.map(serializeValue).join('&');
  if (typeof value === 'object') return paramsSerializer(value);
  return encodeURIComponent(value);
}

function serializeKey(key: string, isArrayItem = false): string {
  return isArrayItem ? `${key}%5B%5D` : key;
}

function serializeParam(key: string, value: ParamsValue): string {
  if (Array.isArray(value)) return value.map((item) => `${serializeKey(key, true)}=${serializeValue(item)}`).join('&');
  if (typeof value === 'object' && !Array.isArray(value)) return paramsSerializer(value, key);
  return `${serializeKey(key)}=${serializeValue(value)}`;
}

export function paramsSerializer(params: Params, prefix = ''): string {
  const serializedParams: string[] = [];

  for (const key in params) {
    if (Object.hasOwn(params, key)) {
      const value = params[key];
      if (value !== undefined) {
        const serializedKey = prefix ? `${prefix}.${key}` : key;
        serializedParams.push(serializeParam(serializedKey, value));
      }
    }
  }

  return serializedParams.join('&');
}
