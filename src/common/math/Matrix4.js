import * as Mat4 from './functions/mat4';

export default class Matrix4 {
  constructor(data) {
    this.element = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];

    if(data?.length === 16) this.set(...data);
  }

  set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    const elm = this.element;
    elm[0] = m00;
    elm[1] = m01;
    elm[2] = m02;
    elm[3] = m03;
    elm[4] = m10;
    elm[5] = m11;
    elm[6] = m12;
    elm[7] = m13;
    elm[8] = m20;
    elm[9] = m21;
    elm[10] = m22;
    elm[11] = m23;
    elm[12] = m30;
    elm[13] = m31;
    elm[14] = m32;
    elm[15] = m33;
    return this;
  }

  identity() {
    Mat4.identity(this.element);
		return this;
	}

  clone() {
    return new this.constructor(this.element);
  }

  /**
   * 左から
   * 1 0 0 0
   * 0 1 0 0
   * 0 0 1 0
   * x y z 1
   * の行列をかける。
   * @param {[number, number, number]} vec3
   */
  translate(vec3) {
    const elm = this.element;
    Mat4.translate(elm, vec3, elm)
    return this;
  }

  /**
   * 
   * @param {number} rad 
   * @param {[number, number, number]} axis 
   */
  rotate(rad, axis) {
    const elm = this.element;
    Mat4.rotate(elm, rad, axis, elm);
    return this;
  }

  rotateX(rad) {
    const elm = this.element;
    Mat4.rotate(elm, rad, [1, 0, 0], elm);
    return this;
  }
  rotateY(rad) {
    const elm = this.element;
    Mat4.rotate(elm, rad, [0, 1, 0], elm);
    return this;
  }
  rotateZ(rad) {
    const elm = this.element;
    Mat4.rotate(elm, rad, [0, 0, 1], elm);
    return this;
  }

  /**
   * 
   * @param {[number, number, number]} position : ;
   * @param {[number, number, number]} lookAt 
   * @param {[number, number, number]} up 
   * @param {boolean} isViewMat
   */
  lookAt(position, lookAt, up, isViewMat = true) {
    const elm = this.element;
    Mat4.lookAt(position, lookAt, up, elm);
    if(isViewMat) Mat4.inverse(elm, elm);
    return this;
  }
}