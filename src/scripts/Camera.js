import Matrix4 from "../common/math/Matrix4";
import Vector3 from "../common/Vector3";

export default class Camera {
  constructor() {
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.position = new Vector3(0, 0 ,0);
    this.target = new Vector3(0, 0 ,0);
    this.up = new Vector3(0, 1 ,0);
    this.fov = 45;
    this.aspect = 1;
    this.near = 1;
    this.far = 1000;
    this.time = 0;
    this.random = {
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
    }
    this.mouse = {
      isDown: false,
      speed: 0.7,
      position: {x: 0, y: 0},
      target: {x: 0, y: 0}
    }

    // this.bind();
  }

  getViewMatrix() {
    return this.viewMatrix.element;
  }

  getProjectionMatrix() {
    return this.projectionMatrix.element;
  }

  setPosition(x,y,z) {
    this.position.setElement(x, y, z);
  }

  setTarget(x, y, z) {
    this.target.setElement(x, y, z)
  }

  setUp(x, y, z) {
    this.up.setElement(x,y,z);
    this.up.normalize();
  }

  setFov(deg) {
    this.fov = deg;
  }

  setAspect(aspect) {
    this.aspect = aspect;
  }

  setFar(num) {
    this.far = num;
  }

  setNear(num) {
    this.near = num;
  }

  setPerspective(fov, aspect, near, far, autoUpdate = true) {
    this.setFov(fov);
    this.setAspect(aspect);
    this.setNear(near);
    this.setFar(far);
    if(autoUpdate) this.updateProjectionMatrix();
  }

  updateViewMatrix() {
    this.viewMatrix
      .identity()
      .lookAt(this.position.getElement(), this.target.getElement(), this.up.getElement(), true);
  }

  updateProjectionMatrix() {
    this.projectionMatrix
      .identity()
      .perspective(this.fov, this.aspect, this.near, this.far);
  }

  update(deltaTime) {
    this.time += deltaTime;
    this.position.setElement(
      2 * Math.cos(this.time + Math.PI/2),
      2 * Math.sin(this.time * 0.5),
      2 * Math.sin(this.time + Math.PI/2),
    );
    this.updateViewMatrix();
  }

  // bind() {
  //   window.addEventListener('mousedown', this.handleMouseDown.bind(this), { passive: true });
  //   window.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
  //   window.addEventListener('mouseup', this.handleMouseUp.bind(this), { passive: true });
  // }

  // handleMouseDown(e) {
  //   this.mouse.isDown = true;
  //   this.mouse.position = {x: e.clientX, y: e.clientY}
  // }

  // handleMouseMove(e) {
  //   if(!this.mouse.isDown) return;
  //   this.mouse.position = {x: e.clientX, y: e.clientY};
  // }

  // handleMouseUp(e) {
  //   this.mouse.isDown = false;
  // }
}