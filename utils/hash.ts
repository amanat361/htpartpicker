const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const BASE = CHARS.length;
const MAX_ID = 3843;  // Slightly under 62^2 to be safe
const MAX_PRODUCTS = 50;

function encodeId(num: number): string {
  if (num < 0 || num > MAX_ID) {
    throw new Error(`Invalid ID: ${num}. Must be between 0 and ${MAX_ID}.`);
  }
  return CHARS[Math.floor(num / BASE)] + CHARS[num % BASE];
}

function decodeId(str: string): number {
  const first = CHARS.indexOf(str[0]);
  const second = CHARS.indexOf(str[1]);
  if (first === -1 || second === -1) {
    throw new Error(`Invalid encoded ID: ${str}`);
  }
  return first * BASE + second;
}

export function createHash(ids: number[]): string {
  if (ids.length > MAX_PRODUCTS) {
    throw new Error(`Too many products. Maximum is ${MAX_PRODUCTS}.`);
  }
  return ids.slice().sort((a, b) => a - b).map(encodeId).join('');
}

export function decodeHash(hash: string): number[] {
  if (hash.length % 2 !== 0) {
    throw new Error('Invalid hash length. Must be even.');
  }
  const ids: number[] = [];
  for (let i = 0; i < hash.length; i += 2) {
    ids.push(decodeId(hash.slice(i, i + 2)));
  }
  return ids;
}

export function getProductIds(products: { id: number }[]): number[] {
  return products.map(product => product.id);
}