attribute vec3 color;
attribute vec3 position;
uniform mat4 modelMatrix;

varying vec3 vColor;

void main(void){
  vColor = color;
  gl_Position = modelMatrix * vec4(position, 1.);
}