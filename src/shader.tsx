// Write a vertex and fragment shader with some pulsing noise on the UV coordinates
export const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform float time;
uniform vec2 resolution;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  // Add some perlin noise
  float noise = 0.5 + 0.5 * (sin(time + uv.x * 0.5) + cos(time + uv.y * 0.5));

  // Add some contrast
  noise = (noise - 0.5) * 0.6;

  // Add some brightness
  noise *= 1.5;

  // Set the color
  gl_FragColor = vec4(noise, noise, noise, 1.0);
}
`;
