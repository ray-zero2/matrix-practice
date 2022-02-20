attribute vec3 color;
attribute vec3 position;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

varying vec3 vColor;

void main(void){
  vColor = color;
  gl_Position = viewMatrix * modelMatrix * vec4(position, 1.);
}