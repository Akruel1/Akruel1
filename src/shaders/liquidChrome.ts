/** Asymmetrical liquid-chrome: matter that can harden into structure. */
export const chromeVertex = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
uniform float uAmp;
uniform float uStructure; // 0 = liquid matter, 1 = structured
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vWorld;
varying float vEdge;
varying vec2 vUv;

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

  // Elongated sheet space: stronger along Y, taper at ends
  float along = pos.y * 0.55;
  float twist = along * (1.15 - uStructure * 0.85) + uPointer.x * 0.35;
  float c = cos(twist);
  float s = sin(twist);
  pos.xz = mat2(c, -s, s, c) * pos.xz;

  // Directional liquid folds (not radial blob)
  float t = uTime * 0.28;
  float liquid = snoise(vec3(pos.x * 1.4, pos.y * 0.55 + t, pos.z * 1.1));
  float ridge = snoise(vec3(pos.y * 2.2 - t * 0.6, pos.x * 0.8, t * 0.4));
  float amp = uAmp * (1.0 - uStructure * 0.92);
  float disp = (liquid * 0.55 + ridge * 0.35) * amp;
  disp += (uPointer.y * normal.y + uPointer.x * normal.x) * 0.1 * amp;

  // Structure pull: flatten toward a hard plane with scored edges
  float harden = smoothstep(0.15, 1.0, uStructure);
  pos.x = mix(pos.x + normal.x * disp, pos.x * (1.0 - harden * 0.12), harden);
  pos.z = mix(pos.z + normal.z * disp, pos.z * (0.35 + 0.65 * (1.0 - harden)), harden);
  pos.y = mix(pos.y + normal.y * disp * 0.35, pos.y, harden * 0.5);

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
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vWorld;
varying float vEdge;
varying vec2 vUv;

void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float ndv = max(dot(N, V), 0.0);
  float fresnel = pow(1.0 - ndv, 3.2);
  float fresnelSoft = pow(1.0 - ndv, 1.5);

  // Fake studio environment in reflection vector
  vec3 R = reflect(-V, N);
  float envY = R.y * 0.5 + 0.5;
  float envX = atan(R.z, R.x) / 6.28318 + 0.5;
  vec3 env = mix(vec3(0.02, 0.03, 0.04), uChromeCold, smoothstep(0.15, 0.75, envY));
  env = mix(env, uChromeWarm, smoothstep(0.55, 1.0, envY) * 0.45);
  env += vec3(0.55, 0.62, 0.7) * pow(max(R.y, 0.0), 8.0) * 0.55;

  // Anisotropic chrome streak
  float streak = pow(abs(sin(envX * 18.0 + vWorld.y * 3.0 + uTime * 0.15)), 12.0);
  env += vec3(0.75, 0.85, 0.95) * streak * 0.22;

  vec3 lightDir = normalize(vec3(0.55, 0.85, 0.25));
  float spec = pow(max(dot(reflect(-lightDir, N), V), 0.0), 64.0);

  vec3 color = env * (0.55 + fresnelSoft * 0.55);
  color += uRim * fresnel * (0.55 + (1.0 - uStructure) * 0.45);
  color += vec3(0.9, 0.95, 1.0) * spec * 0.9;

  // Structured: cooler, harder edge light, less soft glow
  float hard = smoothstep(0.2, 1.0, uStructure);
  color = mix(color, color * vec3(0.85, 0.92, 1.0) + uRim * fresnel * 0.35, hard);
  color += uRim * step(0.82, vEdge) * hard * 0.25;

  float alpha = 0.78 + fresnel * 0.2;
  gl_FragColor = vec4(color, alpha);
}
`;
