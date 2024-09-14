import { expect, test, describe } from "bun:test";
import { createHash, decodeHash, getProductIds } from "@/utils/hash";

describe("Hash Functions", () => {
  test("encoding and decoding are reversible", () => {
    const ids = [0, 1, 10, 62, 100, 1000, 3843];
    const hash = createHash(ids);
    const decodedIds = decodeHash(hash);
    expect(decodedIds).toEqual(ids);
  });

  test("handles duplicate IDs", () => {
    const ids = [1, 2, 2, 3, 1, 4];
    const hash = createHash(ids);
    const decodedIds = decodeHash(hash);
    expect(decodedIds).toEqual([1, 1, 2, 2, 3, 4]);
  });

  test("sorts IDs", () => {
    const ids = [3, 1, 4, 1, 5, 9, 2, 6];
    const hash = createHash(ids);
    const decodedIds = decodeHash(hash);
    expect(decodedIds).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  test("throws error for negative IDs", () => {
    expect(() => createHash([-1])).toThrow();
  });

  test("throws error for IDs exceeding maximum", () => {
    expect(() => createHash([3844])).toThrow();
  });

  test("throws error for too many products", () => {
    const ids = Array.from({ length: 51 }, (_, i) => i);
    expect(() => createHash(ids)).toThrow();
  });

  test("throws error for invalid hash length", () => {
    expect(() => decodeHash('ABC')).toThrow();
  });

  test("throws error for invalid characters in hash", () => {
    expect(() => decodeHash('!@')).toThrow();
  });

  test("getProductIds extracts IDs correctly", () => {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ];
    expect(getProductIds(products)).toEqual([1, 2, 3]);
  });

  test("end-to-end test with products", () => {
    const products = [
      { id: 1000, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3843, name: 'Product 3' },
    ];
    const ids = getProductIds(products);
    const hash = createHash(ids);
    const decodedIds = decodeHash(hash);
    expect(decodedIds).toEqual([2, 1000, 3843]);
  });

    describe("Specific hash values", () => {
    test("single digit numbers", () => {
      expect(createHash([0])).toBe("00");
      expect(createHash([1])).toBe("01");
      expect(createHash([9])).toBe("09");
    });

    test("double digit numbers", () => {
      expect(createHash([10])).toBe("0A");
      expect(createHash([35])).toBe("0Z");
      expect(createHash([36])).toBe("0a");
      expect(createHash([61])).toBe("0z");
      expect(createHash([62])).toBe("10");
    });

    test("larger numbers", () => {
      expect(createHash([100])).toBe("1c");
      expect(createHash([1000])).toBe("G8");
      expect(createHash([3843])).toBe("zz");  // Maximum allowed ID
    });

    test("multiple numbers", () => {
      expect(createHash([1, 62, 1000])).toBe("0110G8");
      expect(createHash([3843, 0, 61, 62])).toBe("000z10zz");
    });

    test("duplicate numbers", () => {
      expect(createHash([1, 1, 2, 2])).toBe("01010202");
    });
  });

  test("decoding specific hashes", () => {
    expect(decodeHash("00")).toEqual([0]);
    expect(decodeHash("01")).toEqual([1]);
    expect(decodeHash("0A")).toEqual([10]);
    expect(decodeHash("zz")).toEqual([3843]);
    expect(decodeHash("010AG8")).toEqual([1, 10, 1000]);
    expect(decodeHash("000z10zz")).toEqual([0, 61, 62, 3843]);
  });
});