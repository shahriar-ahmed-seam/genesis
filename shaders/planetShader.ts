export const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vHeight;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    // Calculate height (distance from origin)
    vHeight = length(position);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform vec3 deepOceanColor;
  uniform vec3 shallowOceanColor;
  uniform vec3 landColor;
  uniform vec3 mountainColor;
  uniform vec3 snowColor;
  uniform float seaLevel;
  uniform float landLevel;
  uniform float mountainLevel;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vHeight;

  // Fresnel effect for atmosphere glow
  float fresnel(vec3 direction, vec3 normal, float power) {
    return pow(1.0 - abs(dot(direction, normal)), power);
  }

  void main() {
    vec3 color;
    
    // Normalize height to 0-1 range (approximately)
    float normalizedHeight = (vHeight - 0.8) / 0.6;
    
    // Deep ocean (lowest)
    if (normalizedHeight < seaLevel * 0.3) {
      color = deepOceanColor;
    }
    // Shallow ocean
    else if (normalizedHeight < seaLevel) {
      float t = (normalizedHeight - seaLevel * 0.3) / (seaLevel - seaLevel * 0.3);
      color = mix(deepOceanColor, shallowOceanColor, t);
    }
    // Beach/Land transition
    else if (normalizedHeight < landLevel) {
      float t = (normalizedHeight - seaLevel) / (landLevel - seaLevel);
      color = mix(shallowOceanColor, landColor, t);
    }
    // Land to Mountain
    else if (normalizedHeight < mountainLevel) {
      float t = (normalizedHeight - landLevel) / (mountainLevel - landLevel);
      color = mix(landColor, mountainColor, t);
    }
    // Mountain to Snow
    else {
      float t = (normalizedHeight - mountainLevel) / (1.2 - mountainLevel);
      t = clamp(t, 0.0, 1.0);
      color = mix(mountainColor, snowColor, t);
    }

    // Add fresnel glow for atmosphere effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnelTerm = fresnel(viewDirection, vNormal, 3.0);
    vec3 atmosphereColor = vec3(0.4, 0.7, 1.0); // Light blue atmosphere
    color = mix(color, atmosphereColor, fresnelTerm * 0.3);

    // Add subtle rim lighting
    float rimLight = fresnel(viewDirection, vNormal, 2.0);
    color += rimLight * 0.2;

    gl_FragColor = vec4(color, 1.0);
  }
`;
