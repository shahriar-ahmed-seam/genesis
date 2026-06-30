export const gasGiantVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const gasGiantFragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform vec3 atmosphereColor;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  // 3D Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  // Domain warping for swirling effect
  vec3 domainWarp(vec3 p, float amount) {
    vec3 q = vec3(
      snoise(p + vec3(0.0, 0.0, 0.0)),
      snoise(p + vec3(5.2, 1.3, 0.0)),
      snoise(p + vec3(1.7, 9.2, 0.0))
    );
    
    vec3 r = vec3(
      snoise(p + amount * q + vec3(1.7, 9.2, 0.0)),
      snoise(p + amount * q + vec3(8.3, 2.8, 0.0)),
      snoise(p + amount * q + vec3(3.1, 5.7, 0.0))
    );
    
    return r;
  }
  
  void main() {
    // Create coordinate system based on sphere position
    // Emphasize horizontal banding (Jupiter-like)
    vec3 coord = normalize(vPosition);
    
    // Animated rotation
    float angle = time * 0.05;
    float cosAngle = cos(angle);
    float sinAngle = sin(angle);
    coord = vec3(
      coord.x * cosAngle - coord.z * sinAngle,
      coord.y,
      coord.x * sinAngle + coord.z * cosAngle
    );
    
    // Stretch vertically for banding
    vec3 samplePos = vec3(coord.x * 2.0, coord.y * 8.0, coord.z * 2.0);
    
    // Apply domain warping for swirling storms
    vec3 warped = domainWarp(samplePos, 1.5);
    
    // Multiple noise layers
    float pattern1 = snoise(samplePos + warped * 2.0);
    float pattern2 = snoise(samplePos * 2.0 + warped * 1.5);
    float pattern3 = snoise(samplePos * 4.0 + time * 0.1);
    
    // Combine patterns
    float combined = (pattern1 * 0.5 + pattern2 * 0.3 + pattern3 * 0.2);
    combined = combined * 0.5 + 0.5; // Remap to 0-1
    
    // Create band structure
    float bands = coord.y * 3.0 + combined * 2.0;
    bands = fract(bands);
    bands = smoothstep(0.3, 0.7, bands);
    
    // Color mixing based on patterns
    vec3 baseColor = mix(color1, color2, combined);
    vec3 stormColor = mix(baseColor, color3, pattern3 * 0.5 + 0.5);
    vec3 finalColor = mix(baseColor, stormColor, bands);
    
    // Fresnel for atmosphere
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);
    finalColor = mix(finalColor, atmosphereColor, fresnel * 0.3);
    
    // Add subtle variation
    float detail = snoise(coord * 20.0 + time * 0.2) * 0.1;
    finalColor += detail;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
