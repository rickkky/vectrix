import { VectorBase } from './vector-base';
import { MatrixBase } from './matrix-base';

export function createMatPrototype<
  V extends VectorBase,
  M extends MatrixBase<V>,
>(Matrix: new () => M) {
  const prototype = {
    clone(m: M, target = new Matrix()) {
      return m.clone(target);
    },

    equals(m0: M, m1: M, precision?: number) {
      return m0.equals(m1, precision);
    },

    multiplyScalar(m: M, s: number, target = new Matrix()) {
      return m.multiplyScalar(s, target);
    },

    multiply(m0: M, m1: M, target = new Matrix()) {
      return m0.multiply(m1, target);
    },

    multiplication(...ms: M[]) {
      const m0 = prototype.identity();
      for (const m of ms) {
        m0.multiply(m);
      }
      return m0;
    },

    transpose(m: M, target = new Matrix()) {
      return m.transpose(target);
    },

    minor(m: M, row: number, col: number) {
      return m.minor(row, col);
    },

    cofactor(m: M, row: number, col: number) {
      return m.cofactor(row, col);
    },

    determinant(m: M) {
      return m.determinant();
    },

    invert(m: M, target = new Matrix()) {
      return m.invert(target);
    },

    identity(target = new Matrix()) {
      return target.identity();
    },

    toArray(m: M) {
      return m.toArray();
    },

    toArray2D(m: M) {
      return m.toArray2D();
    },

    toColMajorArray(m: M) {
      return m.toColMajorArray();
    },

    toColMajorArray2D(m: M) {
      return m.toColMajorArray2D();
    },

    toRowMajorArray(m: M) {
      return m.toRowMajorArray();
    },

    toRowMajorArray2D(m: M) {
      return m.toRowMajorArray2D();
    },
  };

  return prototype;
}
