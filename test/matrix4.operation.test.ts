import { describe, expect, test } from 'vitest';
import { MAT4_NUMS, expectMatrix4 } from './matrix4-prepare';
import { PRECISION, mat4 } from '/src';

describe('multiplyScalar', () => {
  const nums = MAT4_NUMS.IDENTITY;
  const expected = nums.map((n) => n * 2);

  test('Matrix4.prototype.multiplyScalar', () => {
    const m = mat4(nums);
    const result = m.multiplyScalar(2);
    expectMatrix4(m, expected);
    expect(result).toBe(m);
  });

  test('mat4.multiplyScalar', () => {
    const m = mat4(nums);
    const result = mat4.multiplyScalar(m, 2);
    expectMatrix4(result, expected);
    expectMatrix4(m, nums);
  });

  test('store result to target instance', () => {
    const m = mat4(nums);
    const target = mat4();
    const result = mat4.multiplyScalar(m, 2, target);
    expectMatrix4(target, expected);
    expect(result).toBe(target);
  });
});

describe('multiply', () => {
  // prettier-ignore
  const nums0 = [
    0,  1,  2,  3,
    4,  5,  6,  7,
    8,  9,  10, 11,
    12, 13, 14, 15,
  ];
  // prettier-ignore
  const nums1 = [
    16, 17, 18, 19,
    20, 21, 22, 23,
    24, 25, 26, 27,
    28, 29, 30, 31,
  ];
  // prettier-ignore
  const expected = [
    440, 510, 580, 650,
    536, 622, 708, 794,
    632, 734, 836, 938,
    728, 846, 964, 1082,
  ];

  test('Matrix4.prototype.multiply', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const result = m0.multiply(m1);
    expectMatrix4(m0, expected);
    expect(result).toBe(m0);
    expectMatrix4(m1, nums1);
  });

  test('mat4.multiply', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const result = mat4.multiply(m0, m1);
    expectMatrix4(result, expected);
    expectMatrix4(m0, nums0);
    expectMatrix4(m1, nums1);
  });

  test('store result to target instance', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const target = mat4();
    const result = mat4.multiply(m0, m1, target);
    expectMatrix4(target, expected);
    expect(result).toBe(target);
  });
});

describe('multiplication', () => {
  // prettier-ignore
  const nums0 = [
    0,  1,  2,  3,
    4,  5,  6,  7,
    8,  9,  10, 11,
    12, 13, 14, 15,
  ];
  // prettier-ignore
  const nums1 = [
    16, 17, 18, 19,
    20, 21, 22, 23,
    24, 25, 26, 27,
    28, 29, 30, 31,
  ];
  const nums2 = MAT4_NUMS.IDENTITY;
  // prettier-ignore
  const expected = [
    440, 510, 580, 650,
    536, 622, 708, 794,
    632, 734, 836, 938,
    728, 846, 964, 1082,
  ];

  test('Matrix4.prototype.multiplication', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const m2 = mat4(nums2);
    const target = mat4();
    const result = target.multiplication([m0, m1, m2]);
    expectMatrix4(target, expected);
    expect(result).toBe(target);
    expectMatrix4(m0, nums0);
    expectMatrix4(m1, nums1);
    expectMatrix4(m2, nums2);
  });

  test('mat4.multiplication', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const m2 = mat4(nums2);
    const result = mat4.multiplication([m0, m1, m2]);
    expectMatrix4(result, expected);
    expectMatrix4(m0, nums0);
    expectMatrix4(m1, nums1);
    expectMatrix4(m2, nums2);
  });

  test('store result to target instance', () => {
    const m0 = mat4(nums0);
    const m1 = mat4(nums1);
    const m2 = mat4(nums2);
    const target = mat4();
    const result = mat4.multiplication([m0, m1, m2], target);
    expectMatrix4(target, expected);
    expect(result).toBe(target);
  });
});

describe('transpose', () => {
  test('Matrix4.prototype.transpose', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    const result = m.transpose();
    expectMatrix4(m, MAT4_NUMS.INDEX_COL);
    expect(result).toBe(m);
  });

  test('mat4.transpose', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    const result = mat4.transpose(m);
    expectMatrix4(result, MAT4_NUMS.INDEX_COL);
    expectMatrix4(m, MAT4_NUMS.INDEX_ROW);
  });

  test('store result to target instance', () => {
    const m = mat4(MAT4_NUMS.INDEX_ROW);
    const target = mat4();
    const result = mat4.transpose(m, target);
    expectMatrix4(target, MAT4_NUMS.INDEX_COL);
    expect(result).toBe(target);
  });
});

describe('determinant', () => {
  // prettier-ignore
  const nums = [
     2,  3,   4,   5,
    -1, -21, -3,  -4,
     6,  7,   8,   10,
    -8, -9,  -10, -12
  ];
  const expected = 76;

  test('mat4.determinant', () => {
    const m = mat4(nums);
    const result = mat4.determinant(m);
    expect(result).toBe(expected);
  });
});

describe('invert', () => {
  const identity = mat4.identity();
  // prettier-ignore
  const nums = [
    1, 0, 0, 0,
    2, 3, 0, 0,
    4, 5, 6, 0,
    7, 8, 9, 10,
  ];

  test('Matrix4.prototype.invert', () => {
    const m0 = mat4(nums);
    const m1 = mat4(nums);
    const result = m1.invert();
    const multiplyResult = m0.multiply(result);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
    expect(result).toBe(m1);
  });

  test('mat4.invert', () => {
    const m = mat4(nums);
    const result = mat4.invert(m);
    const multiplyResult = mat4.multiply(m, result);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
  });

  test('store result to target instance', () => {
    const m = mat4(nums);
    const target = mat4();
    const result = mat4.invert(m, target);
    const multiplyResult = mat4.multiply(m, result);
    expect(identity.equals(multiplyResult, PRECISION[15])).toBe(true);
    expect(result).toBe(target);
  });
});
