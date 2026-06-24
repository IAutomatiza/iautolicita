// ============================================================
// ANTIMETAL.COM - DottedVideoCanvas WebGL Rendering Code
// Extracted from: /_next/static/chunks/3e4461e2f85cbe38.js
// Uses Three.js for WebGL rendering
// ============================================================

// ============================================================
// DEFAULT SHADER CONFIGURATION
// (from module 419420 in chunk e499a948add99abc.js)
// ============================================================

const defaultShaderConfig = {
  dotsEnabled: true,
  dotSize: 8,
  minDotSize: 1,
  dotMargin: 0,
  dotColor: "#e0f6ff",
  dotAlphaMultiplier: 1,
  videoSource: "/assets/home/hero/video.mp4",
  maskSrc: "/assets/home/hero/video-mask.avif",
  gridLayout: "straight",   // "straight" | "radial" | "alternating-grid"
  enableMask: false,
  animSpeed: 4,
  gamma: 0.9,
  backgroundColor: "#000000",
  loopAt: 4,
  disableFluid: false,
  fluidCurl: 100,
  fluidVelocityDissipation: 0.93,
  fluidDyeDissipation: 0.95,
  fluidSplatRadius: 0.006,
  fluidPressureIterations: 1,
  fluidStrength: 0.15,
  baseFPS: 60,
  disabledOnMobile: false,
};

// ============================================================
// VERTEX SHADER: Basic (ae) - used by display, clear, splat, advection
// ============================================================
const vertexShaderBasic = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ============================================================
// VERTEX SHADER: With Neighbors (at) - used by divergence, curl, vorticity, pressure, gradient subtract
// ============================================================
const vertexShaderWithNeighbors = `
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;

  void main() {
    vUv = uv;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ============================================================
// FRAGMENT SHADER: Clear (ai)
// ============================================================
const fragmentShaderClear = `
  uniform sampler2D uTexture;
  uniform float value;
  varying vec2 vUv;

  void main() {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

// ============================================================
// FRAGMENT SHADER: Splat (an)
// ============================================================
const fragmentShaderSplat = `
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - point;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

// ============================================================
// FRAGMENT SHADER: Advection (ar)
// ============================================================
const fragmentShaderAdvection = `
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  varying vec2 vUv;

  vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize) {
    vec2 st = uv / tsize - 0.5;
    vec2 iuv = floor(st);
    vec2 fuv = fract(st);
    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }

  void main() {
    vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
    gl_FragColor = dissipation * bilerp(uSource, coord, texelSize);
  }
`;

// ============================================================
// FRAGMENT SHADER: Divergence (aa)
// ============================================================
const fragmentShaderDivergence = `
  uniform sampler2D uVelocity;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;

  void main() {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

// ============================================================
// FRAGMENT SHADER: Curl (as)
// ============================================================
const fragmentShaderCurl = `
  uniform sampler2D uVelocity;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;

  void main() {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

// ============================================================
// FRAGMENT SHADER: Vorticity (ao)
// ============================================================
const fragmentShaderVorticity = `
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;

  void main() {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = min(max(velocity, -1000.0), 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// ============================================================
// FRAGMENT SHADER: Pressure Solve (al)
// ============================================================
const fragmentShaderPressure = `
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;

  void main() {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

// ============================================================
// FRAGMENT SHADER: Gradient Subtract (ac)
// ============================================================
const fragmentShaderGradientSubtract = `
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;

  void main() {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// ============================================================
// FRAGMENT SHADER: Display / Dot Field (au) - THE MAIN EFFECT
// ============================================================
const fragmentShaderDisplay = `
  uniform sampler2D uDye;
  uniform sampler2D uVideo;
  uniform sampler2D uMask;
  uniform bool enableMask;
  uniform float fluidStrength;
  uniform float gridCellSize;
  uniform float dotRadius;
  uniform float minDotRadius;
  uniform vec2 videoResolution;
  uniform float time;
  uniform float animSpeed;
  uniform float gamma;
  uniform int gridLayout; // 0=straight, 1=radial, 2=alternating-grid
  uniform vec3 dotColor;
  uniform float dotAlphaMultiplier;
  uniform bool dotsEnabled;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {    
    vec2 gridPos;
    vec2 cellCenter;
    vec2 cellIndex;
    vec2 centerUv;
    float distanceFromCenter;
    float aspectRatio = videoResolution.x / videoResolution.y;
    
    if (gridLayout == 1) {
      // Radial layout
      // Work in pixel space but correct for aspect ratio to get circular dots
      vec2 pixelPos = vUv * videoResolution;
      vec2 center = videoResolution * 0.5;
      
      // Convert to a coordinate system where distances are isotropic (same in x and y)
      // Use the minimum dimension as reference to keep everything in bounds
      float minDim = min(videoResolution.x, videoResolution.y);
      vec2 normalizedPos = (pixelPos - center) / minDim;
      
      // Calculate polar coordinates
      float angle = atan(normalizedPos.y, normalizedPos.x);
      float radius = length(normalizedPos) * minDim;
      
      // Quantize to radial grid
      float ringIndex = floor(radius / gridCellSize);
      
      vec2 dotCenterNormalized;
      float dotIndex;
      
      if (ringIndex < 0.5) {
        // Special case: center dot (ring 0)
        dotCenterNormalized = vec2(0.0, 0.0);
        dotIndex = 0.0;
      } else {
        // Calculate number of dots in this ring based on circumference
        float ringRadius = ringIndex * gridCellSize;
        float circumference = 6.28318 * ringRadius;
        float numDotsInRing = max(1.0, floor(circumference / gridCellSize));
        float anglePerDot = 6.28318 / numDotsInRing;
        dotIndex = floor(angle / anglePerDot);
        
        // Calculate the center of the current dot
        float dotAngle = (dotIndex + 0.5) * anglePerDot;
        float dotRadius = (ringIndex + 0.5) * gridCellSize;
        
        dotCenterNormalized = vec2(cos(dotAngle), sin(dotAngle)) * (dotRadius / minDim);
      }
      
      // Convert back to pixel space
      vec2 dotCenterPixel = dotCenterNormalized * minDim + center;
      
      // Calculate distance in the isotropic space to keep dots circular
      vec2 toDotNormalized = normalizedPos - dotCenterNormalized;
      distanceFromCenter = length(toDotNormalized) * minDim;
      
      // Set centerUv for video sampling
      centerUv = dotCenterPixel / videoResolution;
      cellIndex = vec2(ringIndex, dotIndex);
      
      // Dummy values for gridPos and cellCenter
      gridPos = vec2(0.0);
      cellCenter = vec2(0.0);
      
    } else if (gridLayout == 2) {
      // Alternating grid (brick pattern)
      cellIndex = floor(vUv * videoResolution / gridCellSize);
      
      // Offset every other row by half a cell
      float rowOffset = mod(cellIndex.y, 2.0) * gridCellSize * 0.5;
      vec2 offsetPixel = vUv * videoResolution + vec2(rowOffset, 0.0);
      
      cellIndex = floor(offsetPixel / gridCellSize);
      centerUv = ((cellIndex + 0.5) * gridCellSize - vec2(rowOffset, 0.0)) / videoResolution;
      
      gridPos = mod(offsetPixel, gridCellSize);
      cellCenter = vec2(gridCellSize * 0.5);
      distanceFromCenter = length(gridPos - cellCenter);
      
    } else {
      // Straight layout (default)
      gridPos = mod(vUv * videoResolution, gridCellSize);
      cellCenter = vec2(gridCellSize * 0.5);
      cellIndex = floor(vUv * videoResolution / gridCellSize);
      centerUv = ((cellIndex + 0.5) * gridCellSize) / videoResolution;
      distanceFromCenter = length(gridPos - cellCenter);
    }
    
    // Sample video and fluid from the center of the grid cell
    vec4 video = texture2D(uVideo, centerUv);
    vec4 dye = texture2D(uDye, centerUv);
    
    // Apply gamma correction to video
    vec3 videoGammaCorrected = pow(video.rgb, vec3(gamma));
    
    // Scale dye by fluidStrength for better control
    vec3 scaledDye = dye.rgb * fluidStrength;
    
    // Apply power curve to dye for more visible layering and trails
    // Lower values create more contrast and visible layers
    scaledDye = pow(scaledDye + 0.001, vec3(0.7));
    
    // Blend video with fluid dye using additive blending
    vec3 blendedColor = videoGammaCorrected + scaledDye;
    
    // Calculate luminance from center of grid cell
    float luminance = dot(blendedColor, vec3(0.299, 0.587, 0.114));
    
    // Sample mask and apply to luminance if enabled
    if (enableMask) {
      vec4 mask = texture2D(uMask, vUv);
      float maskAlpha = mask.a;
      luminance = luminance * maskAlpha;
    }

    if (!dotsEnabled) {
      gl_FragColor = vec4(dotColor, luminance * dotAlphaMultiplier);
      return;
    }

    // Calculate scale based on luminance
    float randomValue = random(cellIndex);
    float phase = randomValue * 6.28318;
    float scaleAnimation = sin(time * animSpeed + phase) * 0.5 + 0.5;
    float randomScale = 1.0 - (scaleAnimation * 0.5);

    float luminanceMinScale = min(minDotRadius / dotRadius, 1.0);
    float finalScale = (luminanceMinScale + (luminance * (1.0 - luminanceMinScale))) * randomScale;
    float scaledRadius = dotRadius * finalScale;
    
    // Clamp radius to max gridCellSize / 2 to prevent overlap
    float maxRadius = gridCellSize * 0.5;
    scaledRadius = min(scaledRadius, maxRadius);

    // Create circular mask with scaled radius
    float edgeWidth = 0.5;
    float dotMask = 1.0 - smoothstep(scaledRadius - edgeWidth, scaledRadius + edgeWidth, distanceFromCenter);

    float luminanceCutoff = smoothstep(0.0, 0.1, luminance);
    float finalAlpha = dotMask * luminance * luminanceCutoff * dotAlphaMultiplier;
    
    // Output dots with specified color and alpha based on blended luminance
    gl_FragColor = vec4(dotColor, finalAlpha);
  }
`;

// ============================================================
// COMPONENT: DottedVideoCanvas (React + Three.js)
// ============================================================
// a_=(0,l.forwardRef)(({className:e,config:t,onReady:i,style:n,dotTheme:r="light",immediate:a=!1},c)=>...

/*
  Full minified component code:
*/
a_=(0,l.forwardRef)(({className:e,config:t,onReady:i,style:n,dotTheme:r="light",immediate:a=!1},c)=>{let u=(0,l.useRef)(null),h=(0,l.useRef)(null),d=(0,ag.useMaxWidth)(992,!1),{resolvedTheme:p}=(0,o.useTheme)(),f={...af.defaultShaderConfig,...t,...d?{disableFluid:!0}:{},..."dark"===r?{dotColor:"dark"===p?"#fae3af":"#e0f6ff"}:{dotColor:"dark"===p?"#ebc180":"#122B6D"}};return(0,l.useImperativeHandle)(c,()=>({get instances(){return h.current}}),[]),(0,l.useEffect)(()=>{var e;let t;if(!h.current)return;let i=h.current;if(!i)return;let n={straight:0,radial:1,"alternating-grid":2}[f.gridLayout]||0,r=(e=f.dotColor,(t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e))?{r:Number.parseInt(t[1],16)/255,g:Number.parseInt(t[2],16)/255,b:Number.parseInt(t[3],16)/255}:{r:1,g:1,b:1});i.displayMaterial.uniforms.animSpeed.value=f.animSpeed,i.displayMaterial.uniforms.gamma.value=f.gamma,i.displayMaterial.uniforms.dotRadius.value=f.dotSize/2,i.displayMaterial.uniforms.minDotRadius.value=f.minDotSize/2,i.displayMaterial.uniforms.gridCellSize.value=f.dotSize+f.dotMargin,i.displayMaterial.uniforms.gridLayout.value=n,i.displayMaterial.uniforms.fluidStrength.value=f.fluidStrength,i.displayMaterial.uniforms.enableMask.value=f.enableMask,i.displayMaterial.uniforms.dotColor.value.set(r.r,r.g,r.b),i.displayMaterial.uniforms.dotsEnabled.value=f.dotsEnabled,i.vorticityMaterial&&(i.vorticityMaterial.uniforms.curl.value=f.fluidCurl),i.splatMaterial&&(i.splatMaterial.uniforms.radius.value=f.fluidSplatRadius),new URL(i.video.src).pathname!==f.videoSource&&(i.video.src=f.videoSource,i.video.load(),i.video.play())},[f]),(0,ap.default)((0,l.useCallback)(()=>{if(!u.current||f.disabledOnMobile&&d||void 0===d)return;let e=()=>{h.current&&(h.current.cleanup(),h.current=null)},t=()=>{if(e(),u.current){var t,n;let e,r,a,s,o,l,c,d,p,m,g,v,_,x,S,M,y,E,T,b,A,w,R,P,U,L,I,N,O,F,B,z,V,k,H,G,W,X,j,q,Y,K,J,Z,$,Q,ee,et,ei,en,er,ea;t=u.current,(r=document.createElement("video")).src=f.videoSource,r.loop=!1,r.muted=!0,r.playsInline=!0,r.load(),r.addEventListener("ended",()=>{r.currentTime=f.loopAt,r.play().catch(e=>e)}),(a=new it(r)).minFilter=1006,a.magFilter=1006,a.format=1023,(s=new iz().load(f.maskSrc)).minFilter=1006,s.magFilter=1006,s.format=1023,o=t.clientWidth,l=t.clientHeight,(c=new r9({antialias:!1,alpha:!0})).setSize(o,l),c.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),t.appendChild(c.domElement),d=Math.floor(o/2),p=Math.floor(l/2),m=f.disableFluid?null:new t1,g=f.disableFluid?null:new iV(-1,1,1,-1,0,1),v=f.disableFluid?null:new iM(2,2),_=f.disableFluid?null:ah(d,p,1023,1016),x=f.disableFluid?null:ah(d,p,1023,1016),S=f.disableFluid?null:ah(d,p,1023,1016),M=f.disableFluid?null:ad(d,p,1023,1016),y=f.disableFluid?null:ad(d,p,1023,1016),E=f.disableFluid?null:new C(1/d,1/p),T=o/l,b=f.disableFluid?null:new tG({vertexShader:ae,fragmentShader:ai,uniforms:{uTexture:{value:null},value:{value:.98}}}),A=f.disableFluid?null:new tG({vertexShader:ae,fragmentShader:an,uniforms:{uTarget:{value:null},aspectRatio:{value:T},color:{value:new D(0,0,0)},point:{value:new C(0,0)},radius:{value:f.fluidSplatRadius}}}),w=f.disableFluid?null:new tG({vertexShader:ae,fragmentShader:ar,uniforms:{uVelocity:{value:null},uSource:{value:null},texelSize:{value:E},dt:{value:.016},dissipation:{value:.98}}}),R=f.disableFluid?null:new tG({vertexShader:at,fragmentShader:aa,uniforms:{uVelocity:{value:null},texelSize:{value:E}}}),P=f.disableFluid?null:new tG({vertexShader:at,fragmentShader:as,uniforms:{uVelocity:{value:null},texelSize:{value:E}}}),U=f.disableFluid?null:new tG({vertexShader:at,fragmentShader:ao,uniforms:{uVelocity:{value:null},uCurl:{value:null},curl:{value:f.fluidCurl},dt:{value:.016},texelSize:{value:E}}}),L=f.disableFluid?null:new tG({vertexShader:at,fragmentShader:al,uniforms:{uPressure:{value:null},uDivergence:{value:null},texelSize:{value:E}}}),I=f.disableFluid?null:new tG({vertexShader:at,fragmentShader:ac,uniforms:{uPressure:{value:null},uVelocity:{value:null},texelSize:{value:E}}}),N=f.dotSize+f.dotMargin,O=({straight:0,radial:1,"alternating-grid":2})[f.gridLayout]||0,B=new tG({vertexShader:ae,fragmentShader:au,uniforms:{uDye:{value:null},uVideo:{value:a},uMask:{value:s},enableMask:{value:f.enableMask},fluidStrength:{value:f.fluidStrength},gridCellSize:{value:N},gridLayout:{value:O},dotRadius:{value:f.dotSize/2},minDotRadius:{value:f.minDotSize/2},videoResolution:{value:new C(o,l)},time:{value:0},animSpeed:{value:f.animSpeed},gamma:{value:f.gamma},dotColor:{value:(n=f.dotColor,(F=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n))?new D(Number.parseInt(F[1],16)/255,Number.parseInt(F[2],16)/255,Number.parseInt(F[3],16)/255):new D(1,1,1))},dotAlphaMultiplier:{value:f.dotAlphaMultiplier},dotsEnabled:{value:f.dotsEnabled}},transparent:!0}),z=new t1,(V=new iV(-o/2,o/2,l/2,-l/2,.1,1e3)).position.z=1,H=new tF(k=new iM(o,l),B),z.add(H),(G=f.disableFluid?null:new tF(v,new tu))&&m&&m.add(G),W=f.disableFluid?null:(e,t)=>{m&&g&&G&&(G.material=e,c.setRenderTarget(t),c.render(m,g))},X=f.disableFluid?null:({x:e,y:t,dx:i,dy:n,color:r})=>{if(!(W&&A&&_&&x)||f.disableFluid)return;let a=new C(e/o,1-t/l);A.uniforms.uTarget.value=_.read.texture,A.uniforms.point.value=a,A.uniforms.color.value.set(i,-n,0),A.uniforms.radius.value=.003,W(A,_.write),_.swap(),A.uniforms.uTarget.value=x.read.texture,A.uniforms.color.value=r,A.uniforms.radius.value=f.fluidSplatRadius,W(A,x.write),x.swap()},j=-1,q=-1,Y=0,K=e=>{if(!X)return;let t=c.domElement.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top;if(j>=0&&q>=0){let e=(i-j)*10,t=(n-q)*10;X({x:i,y:n,dx:e,dy:t,color:new D(.5,.5,.5)}),Y=Date.now()}j=i,q=n},J=()=>{j=-1,q=-1},f.disableFluid||(c.domElement.addEventListener("pointermove",K),c.domElement.addEventListener("pointerleave",J)),Z=Date.now(),$=Date.now(),Q=Date.now(),ee=f.baseFPS||60,et=1/60,ei=0,en=()=>{if(e=requestAnimationFrame(en),r.readyState<2||r.paused)return;let t=Date.now(),i=Math.min((t-Z)/1e3,.1);Z=t,ei+=i;let n=ee;if(0!==f.loopAt&&(n=r.currentTime<f.loopAt||!f.disableFluid&&t-Y<2e3?ee:30),!(t-$<1e3/n)){if($=t,!f.disableFluid)for(;ei>=et;){if(!f.disableFluid&&W&&P&&U&&R&&b&&L&&I&&w&&_&&x&&y&&M&&S){P.uniforms.uVelocity.value=_.read.texture,W(P,y),U.uniforms.uVelocity.value=_.read.texture,U.uniforms.uCurl.value=y.texture,U.uniforms.dt.value=et,W(U,_.write),_.swap(),R.uniforms.uVelocity.value=_.read.texture,W(R,M),b.uniforms.uTexture.value=S.read.texture,b.uniforms.value.value=0,W(b,S.write),S.swap(),L.uniforms.uDivergence.value=M.texture;for(let e=0;e<f.fluidPressureIterations;e++)L.uniforms.uPressure.value=S.read.texture,W(L,S.write),S.swap();I.uniforms.uPressure.value=S.read.texture,I.uniforms.uVelocity.value=_.read.texture,W(I,_.write),_.swap(),w.uniforms.uVelocity.value=_.read.texture,w.uniforms.uSource.value=_.read.texture,w.uniforms.dt.value=et,w.uniforms.dissipation.value=f.fluidVelocityDissipation,W(w,_.write),_.swap(),w.uniforms.uVelocity.value=_.read.texture,w.uniforms.uSource.value=x.read.texture,w.uniforms.dissipation.value=f.fluidDyeDissipation,W(w,x.write),x.swap()}ei-=et}B.uniforms.time.value=(t-Q)*.001,!f.disableFluid&&x&&(B.uniforms.uDye.value=x.read.texture),B.uniforms.uVideo.value=a,c.setRenderTarget(null),c.render(z,V)}},(er=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting?(Z=Date.now(),$=Date.now(),ei=0,Y=0,r.play().catch(e=>e)):r.pause()},{threshold:0})).observe(t),(ea=new ResizeObserver(e=>{for(let t of e){let e=t.contentRect.width,i=t.contentRect.height;if(0===e||0===i)return;V.left=-e/2,V.right=e/2,V.top=i/2,V.bottom=-i/2,V.updateProjectionMatrix(),c.setSize(e,i),k.dispose(),H.geometry=new iM(e,i),!f.disableFluid&&A&&(A.uniforms.aspectRatio.value=e/i),B.uniforms.videoResolution.value.set(e,i)}})).observe(t),(0,r7.schedulerYield)().then(()=>{r.play().catch(()=>{t.dispatchEvent(new Event("autoplayblocked"))}),en()}),window.addEventListener("beforeunload",()=>{cancelAnimationFrame(e)}),h.current={video:r,renderer:c,displayMaterial:B,vorticityMaterial:U,splatMaterial:A,cleanup:()=>{er.disconnect(),ea.disconnect(),cancelAnimationFrame(e),f.disableFluid||(c.domElement.removeEventListener("pointermove",K),c.domElement.removeEventListener("pointerleave",J),_?.read.dispose(),_?.write.dispose(),x?.read.dispose(),x?.write.dispose(),S?.read.dispose(),S?.write.dispose(),M?.dispose(),y?.dispose(),b?.dispose(),A?.dispose(),w?.dispose(),R?.dispose(),P?.dispose(),U?.dispose(),L?.dispose(),I?.dispose(),G&&(G.material.dispose(),G.geometry.dispose()),v?.dispose(),m?.clear()),B.dispose(),k.dispose(),a.dispose(),s.dispose(),z.clear();let i=c.getContext().getExtension("WEBGL_lose_context");i&&i.loseContext(),c.dispose(),r.pause(),r.removeAttribute("src"),r.load(),r.remove();let n=t.querySelector("canvas");n&&t.removeChild(n)}},i?.(h.current)}};return(e(),a)?t():(0,av.default)(u.current,async()=>{await (0,r7.schedulerYield)(),"requestIdleCallback"in window&&await new Promise(e=>window.requestIdleCallback(e)),t()}),e},[d]),{timeout:500,immediate:!0}),(0,s.jsx)("div",{className:(0,am.cn)(e,f.disabledOnMobile&&"hidden lg:block",f.disableFluid&&void 0!==d&&"pointer-events-none","light"===r&&"opacity-12"),ref:u,style:n})});a_.displayName="DottedVideoCanvas",e.s(["default",0,a_],901116)}]);