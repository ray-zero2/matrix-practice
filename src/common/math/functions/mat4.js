// ------------------------------------------------------------------------------------------------
// minMatrix.js
// version 0.0.3
// Copyright (c) doxas
// https://wgld.org/d/library/l001.html
// ------------------------------------------------------------------------------------------------
const {sin, cos, tan, hypot} = Math;

export function createMatrix() {
  return identity(new Float32Array(16))
}

export function identity(dest) {
  dest[0] = 1
  dest[1] = 0
  dest[2] = 0
  dest[3] = 0
  dest[4] = 0
  dest[5] = 1
  dest[6] = 0
  dest[7] = 0
  dest[8] = 0
  dest[9] = 0
  dest[10] = 1
  dest[11] = 0
  dest[12] = 0
  dest[13] = 0
  dest[14] = 0
  dest[15] = 1
  return dest
}

export function multiply(mat1, mat2, dest) {
  const a = mat1[0]
  const b = mat1[1]
  const c = mat1[2]
  const d = mat1[3]
  const e = mat1[4]
  const f = mat1[5]
  const g = mat1[6]
  const h = mat1[7]
  const i = mat1[8]
  const j = mat1[9]
  const k = mat1[10]
  const l = mat1[11]
  const m = mat1[12]
  const n = mat1[13]
  const o = mat1[14]
  const p = mat1[15]
  const A = mat2[0]
  const B = mat2[1]
  const C = mat2[2]
  const D = mat2[3]
  const E = mat2[4]
  const F = mat2[5]
  const G = mat2[6]
  const H = mat2[7]
  const I = mat2[8]
  const J = mat2[9]
  const K = mat2[10]
  const L = mat2[11]
  const M = mat2[12]
  const N = mat2[13]
  const O = mat2[14]
  const P = mat2[15]
  dest[0] = A * a + B * e + C * i + D * m
  dest[1] = A * b + B * f + C * j + D * n
  dest[2] = A * c + B * g + C * k + D * o
  dest[3] = A * d + B * h + C * l + D * p
  dest[4] = E * a + F * e + G * i + H * m
  dest[5] = E * b + F * f + G * j + H * n
  dest[6] = E * c + F * g + G * k + H * o
  dest[7] = E * d + F * h + G * l + H * p
  dest[8] = I * a + J * e + K * i + L * m
  dest[9] = I * b + J * f + K * j + L * n
  dest[10] = I * c + J * g + K * k + L * o
  dest[11] = I * d + J * h + K * l + L * p
  dest[12] = M * a + N * e + O * i + P * m
  dest[13] = M * b + N * f + O * j + P * n
  dest[14] = M * c + N * g + O * k + P * o
  dest[15] = M * d + N * h + O * l + P * p
  return dest
}

export function scale(mat, vec, dest) {
  dest[0] = mat[0] * vec[0]
  dest[1] = mat[1] * vec[0]
  dest[2] = mat[2] * vec[0]
  dest[3] = mat[3] * vec[0]
  dest[4] = mat[4] * vec[1]
  dest[5] = mat[5] * vec[1]
  dest[6] = mat[6] * vec[1]
  dest[7] = mat[7] * vec[1]
  dest[8] = mat[8] * vec[2]
  dest[9] = mat[9] * vec[2]
  dest[10] = mat[10] * vec[2]
  dest[11] = mat[11] * vec[2]
  dest[12] = mat[12]
  dest[13] = mat[13]
  dest[14] = mat[14]
  dest[15] = mat[15]
  return dest
}

export function translate(mat, vec, dest) {
  dest[0] = mat[0]
  dest[1] = mat[1]
  dest[2] = mat[2]
  dest[3] = mat[3]
  dest[4] = mat[4]
  dest[5] = mat[5]
  dest[6] = mat[6]
  dest[7] = mat[7]
  dest[8] = mat[8]
  dest[9] = mat[9]
  dest[10] = mat[10]
  dest[11] = mat[11]
  dest[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12]
  dest[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13]
  dest[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14]
  dest[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15]
  return dest
}

export function rotate(mat, angle, axis, dest) {
  let a = axis[0]
  let b = axis[1]
  let c = axis[2]
  let sq = hypot(a,b,c)
  if (!sq) {
    return null
  }
  if (sq !== 1) {
    sq = 1 / sq
    a *= sq
    b *= sq
    c *= sq
  }
  const d = sin(angle)
  const e = cos(angle)
  const f = 1 - e
  const g = mat[0]
  const h = mat[1]
  const i = mat[2]
  const j = mat[3]
  const k = mat[4]
  const l = mat[5]
  const m = mat[6]
  const n = mat[7]
  const o = mat[8]
  const p = mat[9]
  const q = mat[10]
  const r = mat[11]
  const s = a * a * f + e
  const t = b * a * f + c * d
  const u = c * a * f - b * d
  const v = a * b * f - c * d
  const w = b * b * f + e
  const x = c * b * f + a * d
  const y = a * c * f + b * d
  const z = b * c * f - a * d
  const A = c * c * f + e
  if (angle) {
    if (mat !== dest) {
      dest[12] = mat[12]
      dest[13] = mat[13]
      dest[14] = mat[14]
      dest[15] = mat[15]
    }
  } else {
    dest = mat
  }
  dest[0] = g * s + k * t + o * u
  dest[1] = h * s + l * t + p * u
  dest[2] = i * s + m * t + q * u
  dest[3] = j * s + n * t + r * u
  dest[4] = g * v + k * w + o * x
  dest[5] = h * v + l * w + p * x
  dest[6] = i * v + m * w + q * x
  dest[7] = j * v + n * w + r * x
  dest[8] = g * y + k * z + o * A
  dest[9] = h * y + l * z + p * A
  dest[10] = i * y + m * z + q * A
  dest[11] = j * y + n * z + r * A
  return dest
}

export function lookAt(position, target, up, dest) {
  const positionX = position[0]
  const positionY = position[1]
  const positionZ = position[2]
  const upX = up[0]
  const upY = up[1]
  const upZ = up[2]
  const targetX = target[0]
  const targetY = target[1]
  const targetZ = target[2]
  if (positionX === targetX && positionY === targetY && positionZ === targetZ) {
    return identity(dest)
  }
  let x0, x1, x2, y0, y1, y2, z0, z1, z2, l

  // ????????????https://webglfundamentals.org/webgl/lessons/ja/webgl-3d-camera.html
  // 1.????????????????????????????????????????????????????????????????????????z???????????????????????????
  z0 = positionX - target[0]
  z1 = positionY - target[1]
  z2 = positionZ - target[2]
  l = 1 / hypot(z0,z1,z2);
  z0 *= l
  z1 *= l
  z2 *= l

  // 2. ??????????????????????????????????????????????????????????????????????????????????????????x??????????????????????????????
  x0 = upY * z2 - upZ * z1
  x1 = upZ * z0 - upX * z2
  x2 = upX * z1 - upY * z0
  l = hypot(x0,x1,x2)
  if (!l) {
    x0 = 0
    x1 = 0
    x2 = 0
  } else {
    l = 1 / l
    x0 *= l
    x1 *= l
    x2 *= l
  }

  // ????????????????????????z????????????????????????????????????x??????????????????y?????????????????????????????????
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  l = hypot(y0,y1,y2);
  if (!l) {
    y0 = 0
    y1 = 0
    y2 = 0
  } else {
    l = 1 / l
    y0 *= l
    y1 *= l
    y2 *= l
  }

  // ?????????lookAt??????
  // const objectVecMat = [
  //   x0, x1, x2, 0, //x???
  //   y0, y1, y2, 0, //y???
  //   z1, z2, z3, 0, //z???
  //   positionX,  positionY,  positionZ, 1 // ???????????????
  // ];
  // return objectVecMat

  dest[0] = x0;
  dest[1] = x1;
  dest[2] = x2;
  dest[3] = 0;
  dest[4] = y0;
  dest[5] = y1;
  dest[6] = y2;
  dest[7] = 0;
  dest[8] = z0;
  dest[9] = z1;
  dest[10] = z2;
  dest[11] = 0;
  dest[12] = positionX;
  dest[13] = positionY;
  dest[14] = positionZ;
  dest[15] = 1;

  return dest;
}

/**
 * ??????1??? https://marina.sys.wakayama-u.ac.jp/~tokoi/?date=20090907
 * ??????2??? http://marupeke296.com/DXG_No70_perspective.html
 * ??????2??? http://marupeke296.com/DXG_No70_perspective.html
 * @param {number} fovy 
 * @param {number} aspect 
 * @param {number} near 
 * @param {number} far 
 * @param {number[]} dest 
 * @returns 
 */
export function perspective(fovy, aspect, near, far, dest) {
  const f = 1.0 / tan(fovy / 2);
  const nf = 1 / (near - far);
  dest[0] = f / aspect;
  dest[1] = 0;
  dest[2] = 0;
  dest[3] = 0;
  dest[4] = 0;
  dest[5] = f;
  dest[6] = 0;
  dest[7] = 0;
  dest[8] = 0;
  dest[9] = 0;
  dest[10] = (far + near) * nf;
  dest[11] = -1;
  dest[12] = 0;
  dest[13] = 0;
  dest[14] = 2 * far * near * nf;
  dest[15] = 0;
  return dest;
}

/**
 * ????????????: https://sbfl.net/blog/2016/09/05/webgl2-tutorial-3d-knowledge/#:~:text=%E4%B8%A6%E8%A1%8C%E6%8A%95%E5%BD%B1%EF%BC%88Orthographic%20Projection
 * @param {number} left
 * @param {number} right 
 * @param {number} top 
 * @param {number} bottom 
 * @param {number} near 
 * @param {number} far 
 * @param {number[]} dest 
 * @returns {number[]} 
 */
export function ortho(left, right, top, bottom, near, far, dest) {
  /** ????????????????????????????????? */
  const h = right - left

  /** ????????????????????????????????? */
  const v = top - bottom

  /** ??????????????????????????????????????? */
  const d = far - near

  // ??????????????????????????????????????????-1 ~ 1?????????????????????????????????????????????????????????2????????????
  dest[0] = 2 / h
  dest[1] = 0
  dest[2] = 0
  dest[3] = 0

  // ?????????
  dest[4] = 0
  dest[5] = 2 / v
  dest[6] = 0
  dest[7] = 0

  // ?????????
  dest[8] = 0
  dest[9] = 0
  dest[10] = -2 / d //???????????????????????????
  dest[11] = 0

  // ???????????????????????????????????? 
  dest[12] = -(left + right) / h
  dest[13] = -(top + bottom) / v
  dest[14] = -(far + near) / d
  dest[15] = 1
  return dest
}

export function transpose(mat, dest) {
  dest[0] = mat[0]
  dest[1] = mat[4]
  dest[2] = mat[8]
  dest[3] = mat[12]
  dest[4] = mat[1]
  dest[5] = mat[5]
  dest[6] = mat[9]
  dest[7] = mat[13]
  dest[8] = mat[2]
  dest[9] = mat[6]
  dest[10] = mat[10]
  dest[11] = mat[14]
  dest[12] = mat[3]
  dest[13] = mat[7]
  dest[14] = mat[11]
  dest[15] = mat[15]
  return dest
}

/**
 * https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution
 */
export function inverse(mat, dest) {
  const a = mat[0]
  const b = mat[1]
  const c = mat[2]
  const d = mat[3]
  const e = mat[4]
  const f = mat[5]
  const g = mat[6]
  const h = mat[7]
  const i = mat[8]
  const j = mat[9]
  const k = mat[10]
  const l = mat[11]
  const m = mat[12]
  const n = mat[13]
  const o = mat[14]
  const p = mat[15]
  const q = a * f - b * e
  const r = a * g - c * e
  const s = a * h - d * e
  const t = b * g - c * f
  const u = b * h - d * f
  const v = c * h - d * g
  const w = i * n - j * m
  const x = i * o - k * m
  const y = i * p - l * m
  const z = j * o - k * n
  const A = j * p - l * n
  const B = k * p - l * o
  const ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w)
  dest[0] = (f * B - g * A + h * z) * ivd
  dest[1] = (-b * B + c * A - d * z) * ivd
  dest[2] = (n * v - o * u + p * t) * ivd
  dest[3] = (-j * v + k * u - l * t) * ivd
  dest[4] = (-e * B + g * y - h * x) * ivd
  dest[5] = (a * B - c * y + d * x) * ivd
  dest[6] = (-m * v + o * s - p * r) * ivd
  dest[7] = (i * v - k * s + l * r) * ivd
  dest[8] = (e * A - f * y + h * w) * ivd
  dest[9] = (-a * A + b * y - d * w) * ivd
  dest[10] = (m * u - n * s + p * q) * ivd
  dest[11] = (-i * u + j * s - l * q) * ivd
  dest[12] = (-e * z + f * x - g * w) * ivd
  dest[13] = (a * z - b * x + c * w) * ivd
  dest[14] = (-m * t + n * r - o * q) * ivd
  dest[15] = (i * t - j * r + k * q) * ivd
  return dest
}

export function getLength(mat) {
  return hypot(mat[0], mat[1], mat[2])
}

export function normalize(mat, dest) {
  return divideScalar(mat, getLength(mat) || 1)
}

export function multiplyScalar(mat, scalar) {
  mat[0] *= scalar
  mat[1] *= scalar
  mat[2] *= scalar

  return mat
}

export function divideScalar(mat, scalar) {
  return multiplyScalar(mat, 1 / scalar)
}