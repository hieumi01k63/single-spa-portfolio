precision highp float;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying float vColorMix;
varying float vAlpha;

void main() {
  // Create circular particle using distance from center of point sprite
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);

  // Discard fragments outside the circle
  if (dist > 0.5) discard;

  // Soft edge falloff — slightly tighter for crisper dots
  float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

  // Blend between 3 colors based on the color index
  vec3 color;
  if (vColorMix < 0.33) {
    color = uColor1;
  } else if (vColorMix < 0.66) {
    color = uColor2;
  } else {
    color = uColor3;
  }

  gl_FragColor = vec4(color, alpha * vAlpha);
}
