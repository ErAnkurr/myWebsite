import{r,b as Oe}from"./react-vendor-Baq773mE.js";import{c as T,D as Ce,d as K,P as ue,O as fe,g as ze,h as We,i as Fe,j as $e,k as Le,l as me,m as Q,n as Te,M as Ve,o as He}from"./three-core-BvKzW4Nn.js";import{u as X,a as de,e as _e}from"./fiber-vendor-Cr55C_z9.js";function L(){return L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)({}).hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},L.apply(null,arguments)}const k=new T,Y=new T,Ie=new T,ce=new K;function ke(e,t,i){const n=k.setFromMatrixPosition(e.matrixWorld);n.project(t);const o=i.width/2,u=i.height/2;return[n.x*o+o,-(n.y*u)+u]}function De(e,t){const i=k.setFromMatrixPosition(e.matrixWorld),n=Y.setFromMatrixPosition(t.matrixWorld),o=i.sub(n),u=t.getWorldDirection(Ie);return o.angleTo(u)>Math.PI/2}function Ne(e,t,i,n){const o=k.setFromMatrixPosition(e.matrixWorld),u=o.clone();u.project(t),ce.set(u.x,u.y),i.setFromCamera(ce,t);const f=i.intersectObjects(n,!0);if(f.length){const h=f[0].distance;return o.distanceTo(i.ray.origin)<h}return!0}function Ge(e,t){if(t instanceof fe)return t.zoom;if(t instanceof ue){const i=k.setFromMatrixPosition(e.matrixWorld),n=Y.setFromMatrixPosition(t.matrixWorld),o=t.fov*Math.PI/180,u=i.distanceTo(n);return 1/(2*Math.tan(o/2)*u)}else return 1}function Be(e,t,i){if(t instanceof ue||t instanceof fe){const n=k.setFromMatrixPosition(e.matrixWorld),o=Y.setFromMatrixPosition(t.matrixWorld),u=n.distanceTo(o),f=(i[1]-i[0])/(t.far-t.near),h=i[1]-f*t.far;return Math.round(f*u+h)}}const q=e=>Math.abs(e)<1e-10?0:e;function he(e,t,i=""){let n="matrix3d(";for(let o=0;o!==16;o++)n+=q(t[o]*e.elements[o])+(o!==15?",":")");return i+n}const Ue=(e=>t=>he(t,e))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),Ze=(e=>(t,i)=>he(t,e(i),"translate(-50%,-50%)"))(e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1]);function Je(e){return e&&typeof e=="object"&&"current"in e}const rt=r.forwardRef(({children:e,eps:t=.001,style:i,className:n,prepend:o,center:u,fullscreen:f,portal:h,distanceFactor:p,sprite:V=!1,transform:l=!1,occlude:c,onOcclude:w,castShadow:j,receiveShadow:b,material:R,geometry:A,zIndexRange:v=[16777271,0],calculatePosition:W=ke,as:s="div",wrapperClass:M,pointerEvents:ee="auto",...P},te)=>{const{gl:re,camera:m,scene:ne,size:y,raycaster:xe,events:pe,viewport:be}=X(),[d]=r.useState(()=>document.createElement(s)),U=r.useRef(),x=r.useRef(null),ie=r.useRef(0),D=r.useRef([0,0]),H=r.useRef(null),Z=r.useRef(null),F=(h==null?void 0:h.current)||pe.connected||re.domElement.parentNode,E=r.useRef(null),N=r.useRef(!1),G=r.useMemo(()=>c&&c!=="blending"||Array.isArray(c)&&c.length&&Je(c[0]),[c]);r.useLayoutEffect(()=>{const g=re.domElement;c&&c==="blending"?(g.style.zIndex=`${Math.floor(v[0]/2)}`,g.style.position="absolute",g.style.pointerEvents="none"):(g.style.zIndex=null,g.style.position=null,g.style.pointerEvents=null)},[c]),r.useLayoutEffect(()=>{if(x.current){const g=U.current=Oe(d);if(ne.updateMatrixWorld(),l)d.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const a=W(x.current,m,y);d.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${a[0]}px,${a[1]}px,0);transform-origin:0 0;`}return F&&(o?F.prepend(d):F.appendChild(d)),()=>{F&&F.removeChild(d),g.unmount()}}},[F,l]),r.useLayoutEffect(()=>{M&&(d.className=M)},[M]);const oe=r.useMemo(()=>l?{position:"absolute",top:0,left:0,width:y.width,height:y.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:u?"translate3d(-50%,-50%,0)":"none",...f&&{top:-y.height/2,left:-y.width/2,width:y.width,height:y.height},...i},[i,u,f,y,l]),Me=r.useMemo(()=>({position:"absolute",pointerEvents:ee}),[ee]);r.useLayoutEffect(()=>{if(N.current=!1,l){var g;(g=U.current)==null||g.render(r.createElement("div",{ref:H,style:oe},r.createElement("div",{ref:Z,style:Me},r.createElement("div",{ref:te,className:n,style:i,children:e}))))}else{var a;(a=U.current)==null||a.render(r.createElement("div",{ref:te,style:oe,className:n,children:e}))}});const $=r.useRef(!0);de(g=>{if(x.current){m.updateMatrixWorld(),x.current.updateWorldMatrix(!0,!1);const a=l?D.current:W(x.current,m,y);if(l||Math.abs(ie.current-m.zoom)>t||Math.abs(D.current[0]-a[0])>t||Math.abs(D.current[1]-a[1])>t){const O=De(x.current,m);let S=!1;G&&(Array.isArray(c)?S=c.map(C=>C.current):c!=="blending"&&(S=[ne]));const _=$.current;if(S){const C=Ne(x.current,m,xe,S);$.current=C&&!O}else $.current=!O;_!==$.current&&(w?w(!$.current):d.style.display=$.current?"block":"none");const B=Math.floor(v[0]/2),Pe=c?G?[v[0],B]:[B-1,0]:v;if(d.style.zIndex=`${Be(x.current,m,Pe)}`,l){const[C,ae]=[y.width/2,y.height/2],J=m.projectionMatrix.elements[5]*ae,{isOrthographicCamera:le,top:Se,left:we,bottom:Ae,right:Ee}=m,je=Ue(m.matrixWorldInverse),Re=le?`scale(${J})translate(${q(-(Ee+we)/2)}px,${q((Se+Ae)/2)}px)`:`translateZ(${J}px)`;let z=x.current.matrixWorld;V&&(z=m.matrixWorldInverse.clone().transpose().copyPosition(z).scale(x.current.scale),z.elements[3]=z.elements[7]=z.elements[11]=0,z.elements[15]=1),d.style.width=y.width+"px",d.style.height=y.height+"px",d.style.perspective=le?"":`${J}px`,H.current&&Z.current&&(H.current.style.transform=`${Re}${je}translate(${C}px,${ae}px)`,Z.current.style.transform=Ze(z,1/((p||10)/400)))}else{const C=p===void 0?1:Ge(x.current,m)*p;d.style.transform=`translate3d(${a[0]}px,${a[1]}px,0) scale(${C})`}D.current=a,ie.current=m.zoom}}if(!G&&E.current&&!N.current)if(l){if(H.current){const a=H.current.children[0];if(a!=null&&a.clientWidth&&a!=null&&a.clientHeight){const{isOrthographicCamera:O}=m;if(O||A)P.scale&&(Array.isArray(P.scale)?P.scale instanceof T?E.current.scale.copy(P.scale.clone().divideScalar(1)):E.current.scale.set(1/P.scale[0],1/P.scale[1],1/P.scale[2]):E.current.scale.setScalar(1/P.scale));else{const S=(p||10)/400,_=a.clientWidth*S,B=a.clientHeight*S;E.current.scale.set(_,B,1)}N.current=!0}}}else{const a=d.children[0];if(a!=null&&a.clientWidth&&a!=null&&a.clientHeight){const O=1/be.factor,S=a.clientWidth*O,_=a.clientHeight*O;E.current.scale.set(S,_,1),N.current=!0}E.current.lookAt(g.camera.position)}});const se=r.useMemo(()=>({vertexShader:l?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[l]);return r.createElement("group",L({},P,{ref:x}),c&&!G&&r.createElement("mesh",{castShadow:j,receiveShadow:b,ref:E},A||r.createElement("planeGeometry",null),R||r.createElement("shaderMaterial",{side:Ce,vertexShader:se.vertexShader,fragmentShader:se.fragmentShader})))}),nt=r.forwardRef(function({points:t,color:i=16777215,vertexColors:n,linewidth:o,lineWidth:u,segments:f,dashed:h,...p},V){var l,c;const w=X(v=>v.size),j=r.useMemo(()=>f?new ze:new We,[f]),[b]=r.useState(()=>new Fe),R=(n==null||(l=n[0])==null?void 0:l.length)===4?4:3,A=r.useMemo(()=>{const v=f?new $e:new Le,W=t.map(s=>{const M=Array.isArray(s);return s instanceof T||s instanceof me?[s.x,s.y,s.z]:s instanceof K?[s.x,s.y,0]:M&&s.length===3?[s[0],s[1],s[2]]:M&&s.length===2?[s[0],s[1],0]:s});if(v.setPositions(W.flat()),n){i=16777215;const s=n.map(M=>M instanceof Q?M.toArray():M);v.setColors(s.flat(),R)}return v},[t,f,n,R]);return r.useLayoutEffect(()=>{j.computeLineDistances()},[t,j]),r.useLayoutEffect(()=>{h?b.defines.USE_DASH="":delete b.defines.USE_DASH,b.needsUpdate=!0},[h,b]),r.useEffect(()=>()=>{A.dispose(),b.dispose()},[A]),r.createElement("primitive",L({object:j,ref:V},p),r.createElement("primitive",{object:A,attach:"geometry"}),r.createElement("primitive",L({object:b,attach:"material",color:i,vertexColors:!!n,resolution:[w.width,w.height],linewidth:(c=o??u)!==null&&c!==void 0?c:1,dashed:h,transparent:R===4},p)))}),qe=()=>parseInt(Te.replace(/\D+/g,"")),Ke=qe();class Qe extends He{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${Ke>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const ye=e=>e&&e.constructor===Float32Array,Xe=e=>[e.r,e.g,e.b],ge=e=>e instanceof K||e instanceof T||e instanceof me,ve=e=>Array.isArray(e)?e:ge(e)?e.toArray():[e,e,e];function I(e,t,i){return r.useMemo(()=>{if(t!==void 0){if(ye(t))return t;if(t instanceof Q){const n=Array.from({length:e*3},()=>Xe(t)).flat();return Float32Array.from(n)}else if(ge(t)||Array.isArray(t)){const n=Array.from({length:e*3},()=>ve(t)).flat();return Float32Array.from(n)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},i)},[t])}const it=r.forwardRef(({noise:e=1,count:t=100,speed:i=1,opacity:n=1,scale:o=1,size:u,color:f,children:h,...p},V)=>{r.useMemo(()=>_e({SparklesImplMaterial:Qe}),[]);const l=r.useRef(null),c=X(s=>s.viewport.dpr),w=ve(o),j=r.useMemo(()=>Float32Array.from(Array.from({length:t},()=>w.map(Ve.randFloatSpread)).flat()),[t,...w]),b=I(t,u,Math.random),R=I(t,n),A=I(t,i),v=I(t*3,e),W=I(f===void 0?t*3:t,ye(f)?f:new Q(f),()=>1);return de(s=>{l.current&&l.current.material&&(l.current.material.time=s.clock.elapsedTime)}),r.useImperativeHandle(V,()=>l.current,[]),r.createElement("points",L({key:`particle-${t}-${JSON.stringify(o)}`},p,{ref:l}),r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[j,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[b,1]}),r.createElement("bufferAttribute",{attach:"attributes-opacity",args:[R,1]}),r.createElement("bufferAttribute",{attach:"attributes-speed",args:[A,1]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[W,3]}),r.createElement("bufferAttribute",{attach:"attributes-noise",args:[v,3]})),h||r.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:c,depthWrite:!1}))});export{rt as H,nt as L,it as S};
