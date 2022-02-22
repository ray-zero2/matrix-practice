import WebGLUtils from '../common/WebGLUtils';
import vertexShaderSource from './vertex.glsl?raw';
import fragmentShaderSource from './fragment.glsl?raw';
import Box from './Box';
import Matrix4 from '../common/math/Matrix4';
import {perspective} from '../common/math//functions/mat4';

export default class Index {
  constructor(canvasElement) {
    this.webGLUtils = new WebGLUtils(canvasElement);
    this.canvas = this.webGLUtils.canvas;
    this.gl = this.webGLUtils.gl;
    this.program = null;

    this.time = 0;
    this.box = new Box();

    this.modelMatrix = new Matrix4();
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = [];

    this.camera = {
      position: [0, 0, 2],
      lookAt: [0, 0, 0],
      up: [0, 1, 0]
    }

    this.vbo = [];
    this.attLocation = [];
    this.attStride = [];
    this.ibo = [];
    this.uniLocation = [];
    this.uniType = [];
  }

  createProgram() {
    const utils = this.webGLUtils;
    const vertexShader = utils.createShader(vertexShaderSource, 'vertex');
    const fragmentShader = utils.createShader(fragmentShaderSource, 'fragment');
    const program = utils.createProgram(vertexShader, fragmentShader);
    return program;
  }

  setAttributes() {
    const gl = this.gl;
    const utils = this.webGLUtils;

    //position
    this.vbo.push(utils.createVbo(new Float32Array(this.box.positions), gl.STATIC_DRAW));
    this.attLocation.push(gl.getAttribLocation(this.program, 'position'));
    this.attStride.push(3);

    //position
    this.vbo.push(utils.createVbo(new Float32Array(this.box.color), gl.STATIC_DRAW));
    this.attLocation.push(gl.getAttribLocation(this.program, 'color'));
    this.attStride.push(3);

    // ibo
    this.ibo = this.webGLUtils.createIbo(this.box.indices);
    this.webGLUtils.setAttribute(this.vbo, this.attLocation, this.attStride, this.ibo);
  }


  setUniforms() {
    const gl = this.gl;
    this.uniLocation.push(gl.getUniformLocation(this.program, 'time'));
    this.uniType.push('uniform1f');

    this.uniLocation.push(gl.getUniformLocation(this.program, 'modelMatrix'));
    this.uniType.push(null); // matrix4fvのため。

    this.uniLocation.push(gl.getUniformLocation(this.program, 'viewMatrix'));
    this.uniType.push(null); // matrix4fvのため。

    this.uniLocation.push(gl.getUniformLocation(this.program, 'projectionMatrix'));
    this.uniType.push(null); // matrix4fvのため。

    // this.uniLocation.push(gl.getUniformLocation(this.program, 'invMatrix'));
    // this.uniType.push(null);
  }

  setMatrixes() {
    // this.modelMatrixrotateX(Math.PI/80);
    this.viewMatrix.lookAt(this.camera.position, this.camera.lookAt, this.camera.up, true);
	  perspective(45, this.canvas.width / this.canvas.height, 0.1, 100, this.projectionMatrix);
  }

  setData() {
    this.setAttributes();
    this.setUniforms();
    this.setMatrixes();
  }

  setCanvasSize() {
    const gl = this.gl;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  setup() {
    const gl = this.gl;
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    this.setCanvasSize();

    this.program = this.createProgram();
    if (!this.program) throw new Error('program object is not found');
    this.setData();

    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.useProgram(this.program);
  }

  // resize() {
  //   this.setCanvasSize();
  // }

  // bind() {
  //   window.addEventListener('resize', this.resize.bind(this));
  // }

  render() {
    const speed = 0.4;
    const gl = this.gl;
    const utils = this.webGLUtils;
    const deltaTime = utils.getDeltaTime();
    this.time += deltaTime;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // this.modelMatrix.identity().translate([
    //   0.5,
    //   0.5,
    //   0
    // ])
    // this.modelMatrix.identity().rotateY(this.time);
    const radius = 2;
    this.camera.position = [radius*Math.cos(this.time + Math.PI/2), 0 , radius * Math.sin(this.time  +  Math.PI/2)];
    this.viewMatrix.lookAt(this.camera.position, this.camera.lookAt, this.camera.up, true);

    // this.gl.uniformMatrix4fv(uniLocation[0], false, mvpMatrix);
    this.gl.uniformMatrix4fv(this.uniLocation[1], false, this.modelMatrix.element);
    this.gl.uniformMatrix4fv(this.uniLocation[2], false, this.viewMatrix.element);
    this.gl.uniformMatrix4fv(this.uniLocation[3], false, this.projectionMatrix);
    // this.gl.uniformMatrix4fv(this.uniLocation[4], false, this.invMatrix);
    // this.gl.uniform4fv(this.uniLocation[5], this.ambientColor);
    // this.gl.uniform3fv(this.uniLocation[6], this.eyeDirection.array);
    // this.gl.uniform3fv(this.uniLocation[7], this.lightDirection.array);
		gl.drawElements(gl.TRIANGLES, this.box.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  animate() {
    this.render();
    requestAnimationFrame(this.animate.bind(this));
  }

  init() {
    this.setup();
    // this.bind();
    this.animate();
  }
}
