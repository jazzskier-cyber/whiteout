export const AREAS=[
 {id:'valley',name:'云杉谷',en:'SPRUCE VALLEY',sky:0xc3e3eb,snow:0xf1f8fa,accent:'#187e87',trees:.5},
 {id:'ridge',name:'风口山脊',en:'WINDY RIDGE',sky:0xbdd5f0,snow:0xe9f1ff,accent:'#5b6fc2',trees:.7},
 {id:'woods',name:'雾凇林海',en:'RIME WOODS',sky:0xcfe2da,snow:0xf3f8f3,accent:'#3b7d5c',trees:1},
 {id:'peak',name:'落日峰顶',en:'LAST LIGHT PEAK',sky:0xf5d4bb,snow:0xfff0e5,accent:'#c16c48',trees:.8}];
// Section kinds: pitch (drop per metre) drives gravity speed, bound is the half-width of the skiable lane.
export const KINDS={
 start:{pitch:.3},runout:{pitch:.1},
 cruise:{pitch:.17,label:'巡航雪道',tip:'跟着雪晶的 S 弯 · 穿旗门攒连击'},
 slalom:{pitch:.22,label:'回转旗门',tip:'旗门左右交错 · 提前转弯'},
 gs:{pitch:.34,label:'大回转',tip:'高速大弯 · 提前切换方向'},
 glade:{pitch:.22,bound:17,label:'林间小道',tip:'跟着雪晶穿过树林'},
 moguls:{pitch:.24,label:'雪包区',tip:'太快会被弹起 · 按住 ↓ 屈膝吸收'},
 kickers:{pitch:.22,label:'跳台群',tip:'冲上跳台 · 按住 F 转体 · G 后空翻'},
 bigair:{pitch:.28,label:'大跳台',tip:'全速冲台 · 台边按空格跳得更高'},
 megajump:{pitch:.42,label:'超级跳台',tip:'越快飞越高 · 空中转体加后空翻'},
 mega:{pitch:.47,label:'巨型长坡',tip:'一路加速 · 按 ↑ 团身冲刺'},
 rollers:{pitch:.2,label:'波浪雪道',tip:'高速冲过坡顶会自然腾空'},
 chute:{pitch:.32,bound:8,label:'窄谷',tip:'雪道变窄 · 绕开岩石'},
 flats:{pitch:.06,label:'平缓雪原',tip:'坡变缓了 · 踩加速带 · 按 ↑ 团身'},
 logs:{pitch:.18,label:'原木障碍',tip:'空格跳过原木，或找缺口'},
 steep:{pitch:.36,label:'陡坡',tip:'坡度很陡 · 按 ↓ 控速'},
 cliff:{pitch:.25,label:'断崖',tip:'冲出崖边 · 空中保持平衡'}};
// How far each kind of section bends (radians of heading change per bend).
const BENDS={cruise:1.3,slalom:.9,gs:1.5,glade:.8,moguls:.6,kickers:.35,bigair:.12,megajump:0,mega:1.2,rollers:1,chute:1.1,flats:1.2,logs:.6,steep:1,cliff:.2};
export const MAX_CURVE=.0065;
export const MOGUL_SAFE=23,WIDE=21,G=17,TAU=Math.PI*2,MAX_SPEED=48;
// Speed model: gravity along the slope against snow friction and air drag.
const FRICTION=.6,DRAG=.0024,TUCK_DRAG=.0013;
export const terminalSpeed=(pitch,tuck=false)=>Math.sqrt(Math.max(0,(9.8*pitch-FRICTION)/(tuck?TUCK_DRAG:DRAG)));
// Gear changes handling: skis carve faster and tighter, a snowboard spins and flips faster and floats over moguls.
export const GEAR={ski:{name:'双板',en:'SKI',lateral:12,latK:.25,drag:1,spin:6.5,flip:6,mogul:0},board:{name:'单板',en:'BOARD',lateral:11,latK:.21,drag:1.07,spin:7.6,flip:6.8,mogul:3}};
export const RAMPS={kicker:{len:7,h:1.3,width:4.6},big:{len:13,h:3.4,width:7},mega:{len:24,h:8.5,width:10}};
const L=(name,en,area,sections)=>({name,en,area,sections});
const SPECS=[
 L('第一跳','FIRST FLIGHT',0,[['mega',320],['bigair',260],['kickers',300]]),
 L('旗门飞台','GATES TO THE SKY',0,[['slalom',280],['megajump',420],['rollers',280]]),
 L('波浪速降','ROLLER RUSH',0,[['rollers',380],['mega',360],['bigair',260]]),
 L('松林断崖','PINE DROP',0,[['glade',360],['cliff',200],['kickers',300]]),
 L('第一道长坡','THE LONG HILL',0,[['mega',600],['megajump',420]]),
 L('风口跳台','WINDY KICKERS',1,[['kickers',360],['bigair',260],['kickers',240]]),
 L('原木障碍','LUMBERJACK',1,[['cruise',150],['logs',400],['gs',320]]),
 L('冲天跳台','SKY LAUNCH',1,[['mega',360],['megajump',420],['flats',200]]),
 L('窄谷','THE CHUTE',1,[['cruise',150],['chute',380],['steep',300],['bigair',260]]),
 L('山脊雪包','BUMP RIDGE',1,[['moguls',280],['rollers',300],['megajump',420]]),
 L('雾凇密林','RIME GLADE',2,[['glade',600],['flats',220],['bigair',260]]),
 L('林间雪包','BUMPS IN THE PINES',2,[['glade',300],['moguls',320],['glade',300]]),
 L('断崖','THE DROP',2,[['cruise',180],['cliff',200],['mega',450],['kickers',240]]),
 L('伐木场','TIMBER RUN',2,[['logs',320],['glade',320],['logs',280],['bigair',260]]),
 L('雪崩速降','AVALANCHE RUN',2,[['mega',800],['chute',260],['megajump',420]]),
 L('极速平原','SPEED FLATS',3,[['flats',300],['mega',420],['flats',260],['megajump',420]]),
 L('大回转','GIANT SLALOM',3,[['gs',700],['steep',300],['bigair',260]]),
 L('双崖','DOUBLE DROP',3,[['cliff',200],['megajump',420],['cliff',200],['rollers',320]]),
 L('雪包之王','MOGUL KING',3,[['moguls',360],['gs',300],['moguls',360],['megajump',420]]),
 L('落日终章','LAST LIGHT',3,[['mega',500],['chute',260],['cliff',200],['moguls',260],['logs',260],['megajump',420]])];
export const LEVELS=SPECS.map((s,i)=>{let z=0;const sections=[['start',90],...s.sections,['runout',90]].map(([kind,len])=>{const sec={kind,z0:z,z1:z+len,...KINDS[kind]};z+=len;return sec;});const area=AREAS[s.area];
 return {id:'l'+String(i+1).padStart(2,'0'),n:i+1,name:s.name,en:s.en,area:s.area,seed:101+i*977,length:z,sections,sky:area.sky,snow:area.snow,accent:area.accent,trees:area.trees,features:[...new Set(s.sections.map(([k])=>KINDS[k].label))]};});
export const ROUTES=LEVELS;
const smoothstep=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
const CLIFF_EDGE=45,CLIFF_DROP=10;
const profiles=new WeakMap();
// Terrain only depends on z through precomputed 1 m tables, so physics and meshes stay cheap.
export function profile(level){let p=profiles.get(level.sections);if(p)return p;const secs=level.sections,len=secs.at(-1).z1,n=len+1;
 const rawP=new Float32Array(n),rawB=new Float32Array(n);let k=0;for(let z=0;z<n;z++){while(k<secs.length-1&&z>=secs[k].z1)k++;rawP[z]=secs[k].pitch;rawB[z]=secs[k].bound||WIDE;}
 const avg=(src,w)=>{const out=new Float32Array(n);for(let z=0;z<n;z++){let s=0,c=0;for(let j=z-w;j<=z+w;j++){s+=src[Math.max(0,Math.min(n-1,j))];c++;}out[z]=s/c;}return out;};
 const P=avg(rawP,15),B=avg(rawB,20),H=new Float32Array(n);for(let z=1;z<n;z++)H[z]=H[z-1]-P[z];
 for(let z=0;z<n;z++){H[z]+=Math.sin(z*.013)*1.2;for(const s of secs){if(s.kind==='cliff'&&z>=s.z0){const edge=s.z0+CLIFF_EDGE;if(z>=edge-8&&z<edge)H[z]+=.7*Math.sin(Math.PI*(z-edge+8)/8);H[z]-=CLIFF_DROP*smoothstep((z-edge)/4);}if(z<s.z0||z>s.z1)continue;const t=(z-s.z0)/(s.z1-s.z0);
  if(s.kind==='rollers')H[z]+=2.2*Math.sin(Math.PI*t)*Math.sin(TAU*(z-s.z0)/40);}}
 // Heading: each section bends left or right (long ones become S-curves), integrated into a world-space centreline.
 let bendSeed=level.seed^0x5bd1;const brand=()=>((bendSeed=(Math.imul(bendSeed,1664525)+1013904223)>>>0)/4294967296);const rawK=new Float32Array(n);let side=brand()>.5?1:-1;
 for(const s of secs){const mag=BENDS[s.kind]||0;if(!mag)continue;const slen=s.z1-s.z0,bends=Math.max(1,Math.round(slen/300)),blen=slen/bends;for(let b=0;b<bends;b++){const want=mag*(.75+brand()*.5),d=side*Math.min(want,MAX_CURVE*2*blen/Math.PI*.95);side=-side;for(let z=Math.ceil(s.z0+b*blen);z<Math.min(n,s.z0+(b+1)*blen);z++)rawK[z]=d*Math.PI/(2*blen)*Math.sin(Math.PI*(z-s.z0-b*blen)/blen);}}
 const K=avg(rawK,10),TH=new Float32Array(n),PX=new Float32Array(n),PZ=new Float32Array(n);for(let z=1;z<n;z++){TH[z]=TH[z-1]+K[z];PX[z]=PX[z-1]+Math.sin(TH[z]);PZ[z]=PZ[z-1]+Math.cos(TH[z]);}
 let par=0;for(let z=0;z<len;z++)par+=1/Math.max(10,terminalSpeed(P[z]));
 for(const s of secs)if(s.kind==='cliff')s.edge=s.z0+CLIFF_EDGE;
 p={len,P,B,H,K,TH,PX,PZ,secs,par};profiles.set(level.sections,p);return p;}
const lerpTable=(t,z)=>{const i=Math.floor(z),f=z-i;return t[i]+(t[i+1]-t[i])*f;};
export function heightAt(level,z){const p=profile(level);if(z<=0)return p.H[0]-z*.15;if(z>=p.len)return p.H[p.len]-(z-p.len)*.1;return lerpTable(p.H,z);}
export function boundAt(level,z){const p=profile(level);return z<=0?p.B[0]:z>=p.len?p.B[p.len]:lerpTable(p.B,z);}
export function pitchAt(level,z){const p=profile(level);return z<=0?p.P[0]:z>=p.len?p.P[p.len]:lerpTable(p.P,z);}
export function curvatureAt(level,z){const p=profile(level);return z<=0||z>=p.len?0:lerpTable(p.K,z);}
export function headingAt(level,z){const p=profile(level);return z<=0?p.TH[0]:z>=p.len?p.TH[p.len]:lerpTable(p.TH,z);}
// Trail coordinates (x across, z along the run) to world X/Z: the centreline plus x along the lateral normal.
export function toWorld(level,x,z){const p=profile(level),th=headingAt(level,z);let cx,cz;if(z<=0){cx=p.PX[0]+Math.sin(p.TH[0])*z;cz=p.PZ[0]+Math.cos(p.TH[0])*z;}else if(z>=p.len){const e=z-p.len;cx=p.PX[p.len]+Math.sin(th)*e;cz=p.PZ[p.len]+Math.cos(th)*e;}else{cx=lerpTable(p.PX,z);cz=lerpTable(p.PZ,z);}return [cx+Math.cos(th)*x,cz-Math.sin(th)*x,th];}
export function sectionAt(level,z){const secs=level.sections;for(const s of secs)if(z<s.z1)return s;return secs.at(-1);}
// Ramps are real curved surfaces (height grows with the square of the distance up the ramp), so the lip angle and approach speed decide the flight.
export function rampLift(o,x,z){if(Math.abs(x-o.x)>o.width/2||z>o.z||z<o.z-o.len)return 0;const t=(z-o.z+o.len)/o.len;return o.h*t*t;}
// Outside the lane the snow banks up into walls, which turns narrow sections into canyons.
export function groundFor(level,withRamps=true){const base=(x,z)=>heightAt(level,z)-x*curvatureAt(level,z)*25+Math.sin(x*.08+z*.008)*.5+Math.min(12,Math.max(0,Math.abs(x)-boundAt(level,z)-1)**2*.05);if(!withRamps)return base;
 const ramps=course(level).filter(o=>o.type==='ramp');return (x,z)=>{let h=base(x,z);for(const o of ramps){if(o.z<z)continue;if(o.z-o.len>z)break;h+=rampLift(o,x,z);}return h;};}
export function pathX(sec,z){const len=sec.z1-sec.z0,waves=Math.max(1,Math.round(len/90));return Math.min(9,(sec.bound||WIDE)-4.5)*Math.sin(Math.PI*waves*(z-sec.z0)/len)*(sec.flip||1);}
// Where a skier leaving this ramp at speed v is, relative to the slope, t seconds after the lip.
export function flight(o,v,t){return {z:o.z+v*t,h:o.h+2*o.h/o.len*v*t-G/2*t*t};}
const courses=new WeakMap();
export function course(level){const cached=courses.get(level.sections);if(cached)return cached;let seed=level.seed;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);const objects=[],scatter=[];
 const ramp=(kind,x,z,expected)=>{const o={type:'ramp',kind,x,z,...RAMPS[kind]};objects.push(o);const v=Math.min(44,Math.max(16,expected));let air=0;for(let t=.1;t<6;t+=.05){if(flight(o,v,t).h<0){air=t;break;}}
  const count=kind==='mega'?10:kind==='big'?7:4;for(let j=1;j<=count;j++){const f=flight(o,v,air*j/(count+1));if(f.h>1.2)objects.push({type:'coin',x,z:f.z,air:f.h});}return o;};
 // Coins weave across the lane; gates sit on the outside of each turn.
 const snake=(s,amp,wave,{gates=true,width=6.5,gap=7,air=0,boosts=0}={})=>{const ph=rand()>.5?0:Math.PI;const X=z=>amp*Math.sin(TAU*(z-s.z0)/wave+ph);for(let z=s.z0+18;z<s.z1-12;z+=gap)objects.push({type:'coin',x:X(z),z,air});
  if(gates)for(let z=s.z0+18+wave/4;z<s.z1-15;z+=wave/2)objects.push({type:'gate',x:X(z)*.92,z,width});if(boosts)for(let z=s.z0+40;z<s.z1-30;z+=boosts)objects.push({type:'boost',x:X(z),z,width:4});};
 level.sections.forEach((s,si)=>{const {z0,z1}=s,len=z1-z0,b=s.bound||WIDE,v=terminalSpeed(s.pitch);
  if(s.kind==='cruise'){snake(s,9,90);scatter.push({s,count:Math.round(len/24*(.5+level.trees)),rocks:.2});}
  if(s.kind==='flats'){snake(s,8,70,{width:7,boosts:70});scatter.push({s,count:Math.round(len/30*(.5+level.trees)),rocks:.1});}
  if(s.kind==='steep'){snake(s,10,130,{width:7});scatter.push({s,count:Math.round(len/14*(.5+level.trees)),rocks:.6});}
  if(s.kind==='mega'){snake(s,11,160,{width:8,gap:9});scatter.push({s,count:Math.round(len/26*(.4+level.trees)),rocks:.5});}
  if(s.kind==='rollers'){for(let z=z0+10,i=0;z<z1-10;z+=40,i++)objects.push({type:'coin',x:(i%2?1:-1)*6,z,air:2.4},{type:'coin',x:(i%2?1:-1)*6,z:z+5,air:2});for(let z=z0+30,i=0;z<z1-20;z+=80,i++)objects.push({type:'gate',x:(i%2?-1:1)*6,z,width:6.5});scatter.push({s,count:Math.round(len/26*level.trees),rocks:.2});}
  if(s.kind==='slalom'||s.kind==='gs'){const gs=s.kind==='gs',gap=gs?42:28,w=gs?5.6:level.area>=2?4.3:4.8;let last=0;for(let z=z0+25,i=0;z<z1-15;z+=gap,i++){const x=(i%2?1:-1)*((gs?8:6)+rand()*(gs?3:2.5));objects.push({type:'gate',x,z,width:w});if(i)objects.push({type:'coin',x:(x+last)/2,z:z-gap/2});last=x;}scatter.push({s,count:Math.round(len/30*level.trees),rocks:.15});}
  if(s.kind==='kickers'){for(let z=z0+40,i=0;z<z1-35;z+=62,i++)ramp('kicker',(i%2?1:-1)*6,z,v);scatter.push({s,count:Math.round(len/28*level.trees),rocks:.2});}
  if(s.kind==='bigair'){const z=z0+75;ramp('big',0,z,v);for(let zz=z0+12;zz<z-16;zz+=9)for(const side of [-1,1])objects.push({type:'flag',x:side*5.4,z:zz});objects.push({type:'boost',x:0,z:z0+30,width:4});}
  if(s.kind==='megajump'){const z=z0+150;ramp('mega',0,z,v);for(let zz=z0+40;zz<z-26;zz+=10)for(const side of [-1,1])objects.push({type:'flag',x:side*6.6,z:zz,warn:zz>z-60});for(const zz of [z0+70,z0+105])objects.push({type:'boost',x:0,z:zz,width:4});}
  if(s.kind==='glade'){s.flip=rand()>.5?1:-1;const gap=level.area>=2?3.3:4.4;for(let z=z0+10;z<z1-8;z+=gap){for(let x=-b+1.5;x<=b-1.5;x+=4.1){const tx=x+(rand()-.5)*2.2,tz=z+(rand()-.5)*1.4;if(Math.abs(tx-pathX(s,tz))<4.2)continue;objects.push({type:'tree',x:tx,z:tz,radius:.95});}}for(let z=z0+18;z<z1-10;z+=11)objects.push({type:'coin',x:pathX(s,z),z});}
  if(s.kind==='moguls'){for(let z=z0+16,row=0;z<z1-12;z+=6.5,row++)for(let x=-b+2+(row%2)*2.1;x<=b-2;x+=4.2)objects.push({type:'mogul',x,z,r:1.55});snake(s,7,90,{gates:false,gap:10,air:1});}
  if(s.kind==='chute'){for(let z=z0+40,i=0;z<z1-25;z+=34,i++)objects.push({type:'rock',x:(i%2?1:-1)*(3+rand()*1.8),z,radius:1.3});for(let z=z0+20,i=0;z<z1-15;z+=17,i++)objects.push({type:'coin',x:Math.sin(i*1.3)*4,z});}
  if(s.kind==='logs'){for(let z=z0+35,i=0;z<z1-25;z+=46,i++){if(i%3===2){objects.push({type:'log',x0:-b,x1:b,x:0,z},{type:'coin',x:0,z,air:2.2});continue;}const g=(rand()-.5)*(b*1.3),half=2.4;objects.push({type:'log',x0:-b,x1:g-half,x:(g-half-b)/2,z},{type:'log',x0:g+half,x1:b,x:(g+half+b)/2,z},{type:'coin',x:g,z},{type:'coin',x:g*.5,z:z+23});}}
  if(s.kind==='cliff'){const edge=z0+CLIFF_EDGE;for(let zz=edge-26;zz<edge-4;zz+=7)for(const side of [-1,1])objects.push({type:'flag',x:side*6,z:zz,warn:true});for(let j=0;j<5;j++)objects.push({type:'coin',x:0,z:edge+6+j*6,air:CLIFF_DROP*(1-((j+1)/6)**2)});snake({z0:edge+50,z1},9,70,{gates:false,gap:12});}
 });
 const anchors=objects.filter(o=>['gate','ramp','log','boost','coin'].includes(o.type));
 for(const {s,count,rocks} of scatter)for(let i=0;i<count;i++){const z=s.z0+20+rand()*(s.z1-s.z0-40),x=(rand()-.5)*2*(WIDE-3);if(anchors.some(o=>o.type==='coin'?Math.abs(o.z-z)<6&&Math.abs(o.x-x)<3.5:o.type==='ramp'?z>o.z-o.len-15&&z<o.z+60&&Math.abs(o.x-x)<o.width/2+5:Math.abs(o.z-z)<18&&Math.abs(o.x-x)<7))continue;objects.push({type:rand()<rocks?'rock':'tree',x,z,radius:1.2+rand()*.5});}
 const out=objects.sort((a,b)=>a.z-b.z).map((o,id)=>({...o,id}));courses.set(level.sections,out);return out;}
export class Run{
 constructor(route,gear='ski'){this.route=route;this.gear=GEAR[gear]?gear:'ski';this.kit=GEAR[this.gear];this.mogulSafe=MOGUL_SAFE+this.kit.mogul;this.ground=groundFor(route);this.objects=course(route);this.x=0;this.z=0;this.vx=0;this.speed=18;this.y=this.ground(0,0);this.vy=-pitchAt(route,0)*this.speed;this.air=false;this.airTime=0;this.height=0;this.rotation=0;this.flipRot=0;this.score=0;this.combo=0;this.bestCombo=0;this.hearts=3;this.invincible=0;this.gates=0;this.coins=0;this.tricks=0;this.moguls=0;this.mogulRun=0;this.bigAir=0;this.topSpeed=0;this.maxHeight=0;this.time=0;this.jumpCooldown=0;this.status='playing';this.section=null;this.seen=new Set();this.events=[];}
 emit(type,text,points=0){this.events.push({type,text,points});}
 award(points,text){this.combo++;this.bestCombo=Math.max(this.combo,this.bestCombo);const n=points*Math.min(5,1+Math.floor(this.combo/4));this.score+=n;this.emit('score',text,n);}
 launch(v=9){if(this.air||this.jumpCooldown>0)return;this.air=true;this.airTime=0;this.vy+=v;this.y+=.1;this.height=.1;this.rotation=0;this.flipRot=0;this.jumpCooldown=.6;if(v>=9)this.emit('jump','起跳！');}
 land(g){const air=this.airTime;this.air=false;this.y=g;this.vy=-pitchAt(this.route,this.z)*this.speed;this.height=0;
  const spins=Math.floor((this.rotation+.3)/TAU),flips=Math.floor((this.flipRot+.3)/TAU),clean=spins||flips||this.rotation<=1.5&&this.flipRot<=1.2;
  if(spins||flips){this.tricks+=spins+flips;const mix=spins&&flips?1.5:1,name=[flips?`${flips>1?flips+' 周':''}后空翻`:'',spins?`${spins*360}°`:''].filter(Boolean).join(' + ');this.award(Math.round((spins*350+flips*550)*mix),`${name} 落地${mix>1?' · 组合 ×1.5':''}`);}
  else if(!clean){this.combo=0;this.speed*=.6;this.emit('miss','没转满 · 落地失衡');}else if(air>.5)this.emit('land','稳稳落地');
  if(air>1.1&&clean){this.bigAir++;this.award(Math.round(air*air*90),air>2.5?`超级滞空 ${air.toFixed(1)}s`:`滞空 ${air.toFixed(1)}s`);}this.rotation=0;this.flipRot=0;}
 step(dt,input={}){
  if(this.status!=='playing')return;dt=Math.min(.05,Math.max(0,dt));this.time+=dt;this.invincible=Math.max(0,this.invincible-dt);this.jumpCooldown=Math.max(0,this.jumpCooldown-dt);
  const sec=sectionAt(this.route,this.z);if(sec!==this.section){this.section=sec;if(sec.label)this.emit('section',`${sec.label} · ${sec.tip}`);}
  const steer=Math.max(-1,Math.min(1,input.steer||0)),pitch=pitchAt(this.route,this.z),v=this.speed;
  const drag=(input.tuck?TUCK_DRAG:DRAG)*this.kit.drag*(1+Math.abs(steer)*.4);let a=this.air?-drag*.5*v*v:9.8*pitch-FRICTION-drag*v*v;
  if(input.brake&&!this.air)a-=sec.kind==='moguls'?(v>this.mogulSafe-3?7:0):9;
  this.speed=Math.max(6,Math.min(MAX_SPEED,v+a*dt));this.topSpeed=Math.max(this.topSpeed,this.speed);
  const lateral=this.kit.lateral+this.speed*this.kit.latK,curve=curvatureAt(this.route,this.z),push=-curve*this.speed*this.speed;if(this.air)this.vx+=push*.5*dt;else this.vx+=(steer*lateral*(input.brake?.75:1)+push*.09-this.vx)*Math.min(1,dt*5);if(this.air)this.vx+=(steer*lateral-this.vx)*Math.min(1,dt*1.5);const prevX=this.x;this.x+=this.vx*dt;
  const bound=boundAt(this.route,this.z);if(Math.abs(this.x)>bound){this.x=Math.sign(this.x)*bound;this.vx*=-.3;this.speed*=.98;}
  if(input.jump)this.launch();const prev=this.z;this.z+=this.speed*dt;
  // Vertical motion is absolute, so ramp lips, rollers and cliff edges throw the skier into the air naturally.
  let g=this.ground(this.x,this.z);
  if(!this.air&&g-this.y>.45){this.x=prevX;this.vx*=-.4;this.speed*=.97;g=this.ground(this.x,this.z);this.emit('bump','被跳台侧壁挡住');}
  if(!this.air){const vg=(g-this.ground(this.x,prev))/dt;if((vg-this.vy)/dt<-G*1.05&&this.speed>10){this.air=true;this.airTime=0;this.rotation=0;this.flipRot=0;this.vy-=G*dt;this.y+=this.vy*dt;}else{this.vy=vg;this.y=g;}}
  else{this.airTime+=dt;this.vy-=G*dt;this.y+=this.vy*dt;if(input.trick)this.rotation+=dt*this.kit.spin;if(input.flip)this.flipRot+=dt*this.kit.flip;if(this.y<=g)this.land(g);}
  this.height=Math.max(0,this.y-g);this.maxHeight=Math.max(this.maxHeight,this.height);
  for(const o of this.objects){if(this.seen.has(o.id)||o.z<prev-4||o.z>this.z+3)continue;const d=Math.abs(this.x-o.x),crossed=prev<o.z&&this.z>=o.z;
   if(o.type==='gate'&&crossed){this.seen.add(o.id);if(d<o.width/2){this.gates++;this.award(150,'旗门通过');}else{this.combo=0;this.emit('miss','错过旗门 · 连击归零');}}
   else if(o.type==='ramp'&&crossed){this.seen.add(o.id);if(d<o.width/2&&o.kind!=='kicker')this.emit('launch',o.kind==='mega'?'超级跳台！':'大跳台！');}
   else if(o.type==='boost'&&crossed){if(d<o.width/2+.4&&!this.air){this.seen.add(o.id);this.speed=Math.min(MAX_SPEED,this.speed+8);this.emit('boost','加速带 +29 km/h');}}
   else if(o.type==='coin'&&Math.abs(this.z-o.z)<3&&d<1.9&&Math.abs(this.height-(o.air||0))<3){this.seen.add(o.id);this.coins++;this.score+=50;this.emit('coin','雪晶 +50',50);}
   else if(o.type==='mogul'&&crossed){if(d>=o.r)continue;this.seen.add(o.id);if(this.air)continue;
    if(input.brake||this.speed<=this.mogulSafe){this.moguls++;this.mogulRun++;this.score+=20;this.emit('mogul','',20);if(this.mogulRun%6===0)this.award(120,`雪包节奏 ×${this.mogulRun}`);}
    else{const over=this.speed-this.mogulSafe;this.mogulRun=0;this.jumpCooldown=0;this.launch(3+over*.35);if(over>8){this.combo=0;this.speed*=.72;this.emit('miss','雪包把你弹飞了 · 按住 ↓ 吸收');}else this.emit('bump','被雪包弹起');}}
   else if(o.type==='log'&&Math.abs(this.z-o.z)<1&&this.x>o.x0-.55&&this.x<o.x1+.55){if(this.height<1.1){this.seen.add(o.id);this.hit();}else if(crossed){this.seen.add(o.id);this.award(120,'跃过原木');}}
   else if((o.type==='tree'||o.type==='rock')&&Math.abs(this.z-o.z)<2){
    if(d<o.radius+.65&&this.height<(o.type==='rock'?1.8:5.5)){this.seen.add(o.id);this.hit();}
    else if(crossed){this.seen.add(o.id);if(d<o.radius+2.6&&this.height<2)this.award(100,'贴身擦过！');}
   }
  }
  if(this.z>=this.route.length&&this.status==='playing'){this.z=this.route.length;this.status='finished';const par=profile(this.route).par*1.1,bonus=Math.round(1000+this.hearts*300+Math.max(0,par-this.time)*25);this.score+=bonus;this.emit('finish','抵达山脚',bonus);}
 }
 hit(){if(this.invincible)return;this.hearts--;this.combo=0;this.mogulRun=0;this.speed=8;this.invincible=2;this.emit('hit','撞到了！');if(!this.hearts)this.status='crashed';}
}
