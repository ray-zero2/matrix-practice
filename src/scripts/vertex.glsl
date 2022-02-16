attribute vec3 color;
attribute vec3 position;

varying vec3 vColor;

void main(void){
  vColor = color;
  gl_Position = vec4(position, 1.);
}