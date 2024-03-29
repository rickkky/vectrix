import { MatrixBase } from './matrix-base';
import { VectorBase } from './vector-base';

export abstract class Matrix2Base<V extends VectorBase> extends MatrixBase<V> {
  get 0() {
    return this._vecs[0];
  }

  set 0(v: V) {
    this._vecs[0].set(v);
  }

  get 1() {
    return this._vecs[1];
  }

  set 1(v: V) {
    this._vecs[1].set(v);
  }
}
