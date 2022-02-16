export default class Matrix4 {
  constructor(data) {
    this.element = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];

    if(data.length === 16) this.set(...data);
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
		this.set(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		);
		return this;
	}

  clone() {
    return new this.constructor(this.element);
  }




}