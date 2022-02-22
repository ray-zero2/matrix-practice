attribute vec3 color;
attribute vec3 position;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vColor;

void main(void){
  vColor = color;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
}