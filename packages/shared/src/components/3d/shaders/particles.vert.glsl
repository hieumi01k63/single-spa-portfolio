precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 uMouse;
uniform float uRingRadius;
uniform float uRingWidth;
uniform float uDisplacement;
uniform float uPixelRatio;
uniform float uPointSize;
uniform float uHeartbeatScale;
uniform float uTime;
uniform float uSwimSpeed;

attribute vec3 position;
attribute float aScale;
attribute float aColorIndex;
attribute vec3 aVelocity;

varying float vColorMix;
varying float vAlpha;

// Ease-out cubic
float easeOutCubic(float t) {
  return 1.0 - pow(1.0 - t, 3.0);
}

void main() {
  // ── Globe orbit ──
  float orbitAngle = uTime * uSwimSpeed;
  vec3 globeCenter = vec3(
    cos(orbitAngle) * 1.0,
    sin(orbitAngle * 0.7) * 0.6,
    sin(orbitAngle * 1.3) * 0.2
  );

  // ── Globe rotation ──
  // Slowly spin the globe on its axes
  float spinTime = uTime * 0.4;
  mat3 rotY = mat3(
    cos(spinTime), 0.0, sin(spinTime),
    0.0, 1.0, 0.0,
    -sin(spinTime), 0.0, cos(spinTime)
  );
  mat3 rotX = mat3(
    1.0, 0.0, 0.0,
    0.0, cos(spinTime * 0.7), -sin(spinTime * 0.7),
    0.0, sin(spinTime * 0.7), cos(spinTime * 0.7)
  );
  mat3 rotZ = mat3(
    cos(spinTime * 0.5), -sin(spinTime * 0.5), 0.0,
    sin(spinTime * 0.5), cos(spinTime * 0.5), 0.0,
    0.0, 0.0, 1.0
  );

  vec3 localPos = rotY * rotX * rotZ * position;

  // Add per-particle jitter for organic movement
  float jitterX = sin(uTime * aVelocity.x * 4.0 + position.x * 10.0) * 0.02;
  float jitterY = cos(uTime * aVelocity.y * 4.0 + position.y * 10.0) * 0.02;
  float jitterZ = sin(uTime * aVelocity.z * 4.0 + position.z * 10.0) * 0.02;
  localPos += vec3(jitterX, jitterY, jitterZ);

  vec3 pos = globeCenter + localPos;

  // ── Mouse interaction with ease-out ──
  float dist = distance(pos.xy, uMouse.xy);
  float rawRingFactor = 1.0 - smoothstep(0.0, uRingWidth, abs(dist - uRingRadius));
  float ringFactor = easeOutCubic(rawRingFactor);

  if (dist > 0.001) {
    vec2 dir = normalize(pos.xy - uMouse.xy);
    pos.xy += dir * ringFactor * uDisplacement;
  }

  vColorMix = aColorIndex;

  // Alpha: particles at the back of the globe (local z < 0) fade out slightly for depth
  vAlpha = smoothstep(-0.4, 0.4, localPos.z) * 0.6 + 0.4;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // ── Heartbeat scale pulsing (controlled by uHeartbeatScale) ──
  float heartPhase = mod(uTime * 1.8 + aScale * 6.28, 6.28);
  float beat1 = max(0.0, sin(heartPhase * 2.0)) * 0.25 * uHeartbeatScale;
  float beat2 = max(0.0, sin(heartPhase * 2.0 - 0.8)) * 0.15 * uHeartbeatScale;
  float heartbeat = 1.0 + beat1 + beat2;

  // Particles further away shrink slightly for depth
  float depthScale = smoothstep(-0.5, 0.5, localPos.z) * 0.4 + 0.8;

  gl_PointSize = uPointSize * aScale * depthScale * heartbeat * uPixelRatio * (1.0 / -mvPosition.z);
}
