/** Liquid chrome — metallic mercury; cyan only in selective reflection bands. */
export const chromeVertex = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
uniform float uAmp;
uniform float uStructure;
uniform float uComplexity;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vWorld;
varying float vEdge;
varying vec2 vUv;
varying float vFold;

vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vUv = uv;
  vec3 pos = position;
  float t = uTime * 0.28;
  float along = pos.y;

  // Soft multi-axis liquid twist (tubes already curve — keep displacement organic)
  float twistA = along * (0.85 - uStructure * 0.5) * uComplexity + uPointer.x * 0.35;
  float twistB = along * 0.35 * uComplexity - uPointer.y * 0.2;
  float c1 = cos(twistA); float s1 = sin(twistA);
  float c2 = cos(twistB * 0.55); float s2 = sin(twistB * 0.55);
  pos.xz = mat2(c1, -s1, s1, c1) * pos.xz;
  pos.xy = mat2(c2, -s2, s2, c2) * pos.xy;

  float n1 = snoise(vec3(pos.x * 1.4, pos.y * 0.55 + t, pos.z * 1.2));
  float n2 = snoise(vec3(pos.y * 1.9 - t * 0.4, pos.z * 0.95, t * 0.3));
  float n3 = snoise(vec3(pos.x * 2.6 + t * 0.15, pos.y * 1.4, pos.z * 1.7));
  float amp = uAmp * (1.0 - uStructure * 0.85) * uComplexity;
  float disp = (n1 * 0.48 + n2 * 0.34 + n3 * 0.18) * amp;
  disp += (uPointer.y * normal.y + uPointer.x * normal.x) * 0.1 * amp;

  // Soft belly / surface tension
  float belly = (1.0 - abs(pos.y) * 0.35) * 0.16 * uComplexity * (1.0 - uStructure);
  pos += normal * (disp + belly * max(n1, 0.0));

  float harden = smoothstep(0.15, 1.0, uStructure);
  pos.z = mix(pos.z, pos.z * (0.4 + 0.6 * (1.0 - harden)), harden);

  vFold = n1 * 0.5 + 0.5;
  vEdge = abs(uv.x - 0.5) * 2.0;
  vec4 world = modelMatrix * vec4(pos, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  vView = cameraPosition - world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const chromeFragment = /* glsl */ `
uniform float uTime;
uniform float uStructure;
uniform vec3 uChromeCold;
uniform vec3 uChromeWarm;
uniform vec3 uRim;
uniform float uMetal;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vWorld;
varying float vEdge;
varying vec2 vUv;
varying float vFold;

void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float ndv = max(dot(N, V), 0.0);
  float fresnel = pow(1.0 - ndv, 3.6);
  float fresnelSoft = pow(1.0 - ndv, 1.45);

  vec3 R = reflect(-V, N);
  float envY = R.y * 0.5 + 0.5;
  float envX = atan(R.z, R.x) / 6.28318 + 0.5;

  // Mercury / studio chrome — silver-graphite base, not cyan glass
  vec3 env = mix(vec3(0.02, 0.022, 0.028), uChromeCold, smoothstep(0.08, 0.65, envY));
  env = mix(env, uChromeWarm, smoothstep(0.5, 1.0, envY) * 0.62);
  env += vec3(0.92, 0.95, 0.98) * pow(max(R.y, 0.0), 9.0) * 0.85;

  // Soft anisotropic metal — avoid hard UV ridges / zebra banding
  float streak = pow(abs(sin(envX * 11.0 + vWorld.y * 2.2 + uTime * 0.08)), 6.0);
  env += vec3(0.95, 0.97, 1.0) * streak * 0.22 * uMetal;

  // Broad studio soft-box reflection
  float softBox = smoothstep(0.35, 0.95, envY) * (0.55 + 0.45 * sin(envX * 3.14159));
  env = mix(env, uChromeWarm * 0.7, softBox * 0.35 * (1.0 - fresnel * 0.5));

  // Selective cyan ONLY in deep folds / tight reflection bands
  float cyanBand = pow(abs(sin(envX * 5.5 + vFold * 4.0)), 14.0) * fresnel;
  float cyanCore = pow(max(1.0 - abs(vFold - 0.4) * 2.8, 0.0), 5.0) * (1.0 - ndv);
  vec3 cyan = uRim * (cyanBand * 0.28 + cyanCore * 0.22);

  vec3 lightA = normalize(vec3(0.7, 0.95, 0.25));
  vec3 lightB = normalize(vec3(-0.45, 0.15, 0.9));
  float specA = pow(max(dot(reflect(-lightA, N), V), 0.0), 96.0);
  float specB = pow(max(dot(reflect(-lightB, N), V), 0.0), 56.0);

  vec3 color = env * (0.72 + fresnelSoft * 0.55) * uMetal;
  color += cyan;
  color += vec3(0.97, 0.98, 1.0) * specA * 1.25;
  color += uChromeWarm * specB * 0.5;
  color += uRim * fresnel * 0.12; // hairline rim only

  float alpha = mix(0.92, 0.98, fresnelSoft);
  gl_FragColor = vec4(color, alpha);
}
`;
