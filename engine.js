// Areas only tune how much scenery the course generator scatters; what a level looks like comes from its theme.
export const AREAS=[{id:'valley',trees:.5},{id:'ridge',trees:.7},{id:'woods',trees:1},{id:'peak',trees:.8}];
// Twelve worlds. Real place names set a mood only; the runs are not recreations of real pistes.
const T=(id,en,o)=>({id,en,tree:'cone',tall:1,wide:1,hemi:2.5,sun:3,sunColor:0xffeed7,capColor:null,...o});
export const THEMES=Object.fromEntries([
 T('village','ZERMATT',{dome:[0x4f9fe0,0xa8d8f2,0xe6f4f8],fogColor:0xd6ecf5,fog:[120,520],snow:0xf4fafc,edge:0xe6f0f6,accent:'#187e87',leaf:0x2c6970,horizon:{count:18,dist:520,h:[120,240],sides:4,near:0xa3bccd,far:0xc4d6e2,snow:0xffffff,cap:.46}}),
 T('fairytale','CANDY HOLLOW',{dome:[0xb79be8,0xf6bfd9,0xffe6d6],fogColor:0xfbdbe2,fog:[90,440],snow:0xfff6fa,edge:0xfde3ee,accent:'#c9558d',leaf:0x7cc7a8,tree:'round',wide:1.1,tall:.9,capColor:0xfffafc,hemi:2.8,sun:2.5,sunColor:0xfff0e0,particles:{count:170,color:0xffffff,size:.2,vy:-2.4,sway:.5},horizon:{count:22,dist:530,h:[50,130],sides:9,near:0xd2b4e4,far:0xe8c6df,snow:0xffffff,cap:.4}}),
 T('lake','LAKE LOUISE',{dome:[0x2f7fd6,0x94d0f0,0xe8f7f6],fogColor:0xd3edf3,fog:[160,760],snow:0xf4fbfc,edge:0xdcedf1,accent:'#0c8f9c',leaf:0x1f5f5e,tall:1.26,wide:.8,lake:0x2fb6c4,horizon:{count:15,dist:760,h:[300,620],sides:5,near:0x6d8aa3,far:0x93adc2,snow:0xffffff,cap:.4,girth:.34}}),
 T('crags','DOLOMITES',{night:true,dome:[0x4a4f76,0xd98b6a,0xf6d6b4],fogColor:0xe9c8ae,fog:[110,500],snow:0xf5efe9,edge:0xc9b8ac,accent:'#a24f3a',leaf:0x34514f,tall:1.1,wide:.82,hemi:2.1,sun:3.3,sunColor:0xffc99a,horizon:{count:30,dist:520,h:[190,430],sides:3,near:0x6b5a60,far:0x98807e,snow:0xf8eee6,cap:.2}}),
 T('meadow','ELF MEADOW',{dome:[0x57b7d6,0xbdeab8,0xfdf6c8],fogColor:0xdff3cb,fog:[100,470],snow:0xf6fbef,edge:0x79c96a,accent:'#4f9a3f',leaf:0x4fa35a,tree:'round',tall:1.05,wide:1.2,capColor:0x8ad07a,hemi:2.8,sun:2.8,sunColor:0xfff4c4,particles:{count:90,color:0xfff58a,size:.34,vy:.45,sway:1.3,glow:true,opacity:.95},horizon:{count:20,dist:530,h:[70,170],sides:8,near:0x7fc08a,far:0xa9d9ac,snow:0xf8fff0,cap:.2}}),
 T('sakura','HAKUBA',{dome:[0x8ab6ec,0xf4c6d8,0xfff0ea],fogColor:0xf8e0e6,fog:[100,470],snow:0xfff6f8,edge:0xf9dfe7,accent:'#d0527f',leaf:0xf19cbb,tree:'round',wide:1.28,tall:.92,capColor:0xffd3e1,hemi:2.8,sun:2.6,sunColor:0xfff0ea,particles:{count:200,color:0xff9dc0,size:.26,vy:-1.9,sway:2.4},horizon:{count:18,dist:525,h:[130,270],sides:7,near:0xa9b4d3,far:0xc9c6dd,snow:0xffffff,cap:.45}}),
 T('aurora','TROMSØ',{night:true,dome:[0x070c2a,0x142a55,0x3a5a86],fogColor:0x24406a,fog:[85,430],snow:0xbcd2ee,edge:0x6f8dba,accent:'#3ecf9a',leaf:0x123d4d,capColor:0xcfe2fa,hemi:1.5,sun:.85,sunColor:0x9cc2ff,horizon:{count:20,dist:530,h:[110,230],sides:5,near:0x142b4c,far:0x1f3a60,snow:0x90add6,cap:.36}}),
 T('sunset','CHAMONIX',{dome:[0x6a68b0,0xf29a6e,0xffdca6],fogColor:0xf8c9a4,fog:[110,480],snow:0xfff0e3,edge:0xf2c6ad,accent:'#c16c48',leaf:0xc98a35,tall:1.12,wide:.9,hemi:2.2,sun:3.6,sunColor:0xffb27a,horizon:{count:24,dist:525,h:[150,300],sides:3,near:0x8a6470,far:0xb88985,snow:0xffe2cb,cap:.28,gap:.42}}),
 T('icecastle','ICE PALACE',{dome:[0x5fa8e8,0xb9e7f6,0xeefbff],fogColor:0xdaf2fb,fog:[100,470],snow:0xf2fbff,edge:0xcdeafa,accent:'#2f8fc7',leaf:0x8fdcef,tree:'crystal',tall:1.1,wide:.72,capColor:0xeafaff,hemi:2.8,sun:2.8,sunColor:0xe8f7ff,particles:{count:130,color:0xffffff,size:.14,vy:-.7,sway:.9,opacity:.95},horizon:{count:22,dist:560,h:[70,180],sides:4,near:0xa9d4ec,far:0xc9e6f4,snow:0xffffff,cap:.5,gap:.36}}),
 T('balloons','BALLOON FESTIVAL',{dome:[0x3fa0e6,0xa6dcf4,0xfff0cf],fogColor:0xe9f2e0,fog:[120,540],snow:0xf8fbf4,edge:0xdcefd0,accent:'#d9583f',leaf:0x3f8560,tall:.95,wide:1.05,hemi:2.6,sun:3.1,sunColor:0xfff0cd,horizon:{count:16,dist:530,h:[80,170],sides:8,near:0x9dc8bb,far:0xbfdbd0,snow:0xffffff,cap:.28}}),
 T('rime','WHISTLER',{dome:[0x9db9b5,0xcfe2da,0xe5f0ea],fogColor:0xd5e6de,fog:[34,245],snow:0xf3f8f3,edge:0xe2ece6,accent:'#3b7d5c',leaf:0x4b7a68,tall:1.42,wide:.76,capColor:0xf7fbf8,hemi:2.9,sun:1.6,sunColor:0xf2fff4,particles:{count:90,color:0xffffff,size:.13,vy:-.9,sway:.6},horizon:{count:12,dist:540,h:[90,190],sides:6,near:0xb5cdc4,far:0xc6dad1,snow:0xf5f9f7,cap:.5}}),
 T('volcano','ICELAND',{night:true,dome:[0x2a2230,0x7a3f3a,0xe6875a],fogColor:0xa8716a,fog:[90,440],snow:0xdcd3d0,edge:0x3b3538,accent:'#e0531f',leaf:0x241f22,tall:.86,wide:.62,capColor:0xcfc7c4,hemi:1.9,sun:2.4,sunColor:0xff9a6a,particles:{count:150,color:0xff8a3c,size:.2,vy:2.4,sway:1.2,glow:true},horizon:{count:18,dist:560,h:[80,190],sides:5,near:0x3a3238,far:0x57464c,snow:0xb9aaa9,cap:.14,gap:.48}}),
].map(t=>[t.id,t]));
// Hand-picked so the view changes every level and each name suits its world.
const THEME_OF=['village','fairytale','lake','meadow','sakura','balloons','village','aurora','crags','icecastle','rime','meadow','crags','sakura','volcano','balloons','lake','aurora','icecastle','sunset','village','fairytale','balloons','lake','sakura','lake','rime','balloons','meadow','fairytale','rime','meadow','crags','icecastle','balloons','crags','sunset','meadow','volcano','crags','aurora','rime','icecastle','volcano','lake','sakura','aurora','fairytale','volcano','rime'];
// Section kinds: pitch (drop per metre) drives gravity speed, bound is the half-width of the skiable lane.
export const KINDS={
 start:{pitch:.3},sprint:{pitch:.5,label:'sec.sprint',tip:'tip.sprint'},
 cruise:{pitch:.17,label:'sec.cruise',tip:'tip.cruise'},
 slalom:{pitch:.22,label:'sec.slalom',tip:'tip.slalom'},
 gs:{pitch:.34,label:'sec.gs',tip:'tip.gs'},
 glade:{pitch:.22,bound:17,label:'sec.glade',tip:'tip.glade'},
 moguls:{pitch:.24,label:'sec.moguls',tip:'tip.moguls'},
 kickers:{pitch:.22,label:'sec.kickers',tip:'tip.kickers'},
 bigair:{pitch:.28,label:'sec.bigair',tip:'tip.bigair'},
 megajump:{pitch:.42,label:'sec.megajump',tip:'tip.megajump'},
 mega:{pitch:.47,label:'sec.mega',tip:'tip.mega'},
 rollers:{pitch:.2,label:'sec.rollers',tip:'tip.rollers'},
 chute:{pitch:.32,bound:8,label:'sec.chute',tip:'tip.chute'},
 flats:{pitch:.06,label:'sec.flats',tip:'tip.flats'},
 logs:{pitch:.18,label:'sec.logs',tip:'tip.logs'},
 steep:{pitch:.36,label:'sec.steep',tip:'tip.steep'},
 cliff:{pitch:.25,label:'sec.cliff',tip:'tip.cliff'},
 bowl:{pitch:.22,bound:42,label:'sec.bowl',tip:'tip.bowl'}};
// How far each kind of section bends (radians of heading change per bend).
const BENDS={bowl:.4,cruise:1.3,slalom:.9,gs:1.5,glade:.8,moguls:.6,kickers:.35,bigair:.12,megajump:0,mega:1.2,rollers:1,chute:1.1,flats:1.2,logs:.6,steep:1,cliff:.2};
export const MAX_CURVE=.0065;
export const BOWL_DEPTH=15;
export const MOGUL_SAFE=23,WIDE=21,G=17,TAU=Math.PI*2,MAX_SPEED=48;
// Speed model: gravity along the slope against snow friction and air drag.
const FRICTION=.6,DRAG=.0024,TUCK_DRAG=.0013,STOP_DECEL=16,TUCK_PUSH=2.2;
export const terminalSpeed=(pitch,tuck=false)=>Math.sqrt(Math.max(0,(9.8*pitch-FRICTION+(tuck?TUCK_PUSH:0))/(tuck?TUCK_DRAG:DRAG)));
// Gear changes handling: skis carve faster and tighter, a snowboard spins and flips faster and floats over moguls.
// Every item trades something away, so unlocking one changes how a run feels and never simply outscores the starter gear. unlockAt is a mountain total.
export const GEAR={
 ski:{type:'ski',en:'SKI',unlockAt:0,tip:0xee8b46,lateral:12,latK:.25,drag:1,spin:6.5,flip:6,mogul:0},
 board:{type:'board',en:'BOARD',unlockAt:0,tip:0xee8b46,lateral:11,latK:.21,drag:1.07,spin:7.6,flip:6.8,mogul:3},
 racer:{type:'ski',en:'RACER',unlockAt:8000,tip:0xe2654f,lateral:10.5,latK:.2,drag:.9,spin:5.8,flip:5.4,mogul:0},
 park:{type:'ski',en:'PARK',unlockAt:20000,tip:0x8f5bd6,lateral:12.5,latK:.25,drag:1.1,spin:8,flip:7.4,mogul:0},
 powder:{type:'board',en:'POWDER',unlockAt:50000,tip:0x4aa3c7,lateral:10.5,latK:.2,drag:1.05,spin:7.2,flip:6.4,mogul:6},
 carver:{type:'board',en:'CARVER',unlockAt:100000,tip:0xf2c14e,lateral:13,latK:.27,drag:1.03,spin:6,flip:5.6,mogul:0}};
// Outfits are looks only.
export const OUTFITS=[
 {id:'classic',unlockAt:0,jacket:0xe77956,legs:0x29556a,helmet:0x233e50,trim:0xee8b46},
 {id:'glacier',unlockAt:3000,jacket:0x4aa3c7,legs:0x1f3f57,helmet:0xf2f6f8,trim:0x2b3a48},
 {id:'forest',unlockAt:12000,jacket:0x3d7d5c,legs:0x2e3b2c,helmet:0xc9b27a,trim:0xe9d9a8},
 {id:'sunset',unlockAt:30000,jacket:0xf2a33c,legs:0x7a3b5e,helmet:0x2b2230,trim:0xe2654f},
 {id:'night',unlockAt:60000,jacket:0x1c2733,legs:0x0f1720,helmet:0x5b6fc2,trim:0x7fe3ff},
 {id:'aurora',unlockAt:120000,jacket:0x8f5bd6,legs:0x25334a,helmet:0xe9f1ff,trim:0x4fe0b0}];
export const RAMPS={kicker:{len:7,h:1.3,width:4.6},big:{len:13,h:3.4,width:7},mega:{len:24,h:8.5,width:10}};
const L=(en,area,hard,sections)=>({en,area,hard,sections});
// Difficulty 1–5 stars sets how steep and how fast a level is, how dense its obstacles are and (at five) takes a heart away.
// Levels 1–20 are the mountain path: unlocked one by one, each introducing something new. Levels 21–50 all open once level 20 is cleared.
export const PATH_LEVELS=20;
const SPECS=[
 L('FIRST FLIGHT',0,1,[['cruise',240],['kickers',240]]),
 L('SPRUCE SLALOM',0,1,[['cruise',150],['slalom',280],['kickers',180]]),
 L('ROLLER RUSH',0,1,[['rollers',280],['slalom',240],['bigair',260]]),
 L('PINE TRAIL',0,2,[['glade',300],['cruise',200],['bigair',260]]),
 L('THE LONG HILL',0,2,[['mega',360],['megajump',420]]),
 L('WINDY KICKERS',1,2,[['kickers',300],['gs',280],['bigair',260]]),
 L('LUMBERJACK',1,2,[['cruise',150],['logs',340],['gs',300]]),
 L('SKY LAUNCH',1,3,[['mega',360],['megajump',420],['flats',200]]),
 L('BUMP RIDGE',1,3,[['moguls',260],['rollers',300],['megajump',420]]),
 L('THE CHUTE',1,3,[['cruise',150],['chute',340],['steep',280],['bigair',260]]),
 L('RIME GLADE',2,3,[['glade',500],['flats',200],['bigair',260]]),
 L('BOWL IN THE PINES',2,3,[['glade',280],['bowl',460],['moguls',280]]),
 L('THE DROP',2,4,[['cruise',180],['cliff',200],['mega',420],['kickers',240]]),
 L('TIMBER RUN',2,4,[['logs',300],['glade',300],['logs',260],['bigair',260]]),
 L('AVALANCHE RUN',2,4,[['mega',640],['chute',260],['megajump',420]]),
 L('SPEED FLATS',3,4,[['flats',260],['mega',420],['slalom',260],['megajump',420]]),
 L('GIANT SLALOM',3,4,[['gs',640],['steep',300],['bigair',260]]),
 L('DOUBLE DROP',3,5,[['cliff',200],['megajump',420],['cliff',200],['rollers',320]]),
 L('MOGUL KING',3,5,[['moguls',340],['gs',300],['moguls',340],['megajump',420]]),
 L('LAST LIGHT',3,5,[['mega',500],['chute',260],['cliff',200],['moguls',260],['logs',260],['megajump',420]]),
 L('SUNDAY CRUISE',0,2,[['cruise',400],['flats',200],['kickers',240]]),
 L('CRYSTAL ALLEY',0,2,[['cruise',300],['rollers',300],['cruise',240]]),
 L('KICKER PARK',0,3,[['kickers',420],['kickers',420],['bigair',260]]),
 L('TWIN BOWLS',0,3,[['bowl',420],['cruise',150],['bowl',420]]),
 L('SLALOM SCHOOL',0,3,[['slalom',420],['gs',300],['slalom',300]]),
 L('WAVE MACHINE',1,3,[['rollers',420],['flats',200],['rollers',420]]),
 L('LOGJAM',1,3,[['logs',420],['cruise',120],['logs',420]]),
 L('AIR MAIL',1,3,[['bigair',260],['bigair',260],['bigair',260],['kickers',240]]),
 L('CROSSWIND',1,4,[['gs',420],['kickers',300],['gs',420]]),
 L('BUMP ALLEY',1,4,[['moguls',300],['cruise',150],['moguls',300],['bigair',260]]),
 L('DEEP FOREST',2,4,[['glade',800],['bigair',260]]),
 L('FOREST BOWL',2,4,[['bowl',460],['glade',420],['bowl',460]]),
 L('SLOT CANYON',2,4,[['chute',420],['steep',240],['chute',420]]),
 L('FROSTBITE',2,4,[['steep',360],['moguls',260],['steep',360]]),
 L('SKY LADDER',2,4,[['megajump',420],['flats',160],['megajump',420]]),
 L('FREE FALL',3,4,[['cliff',200],['cliff',200],['cliff',200],['megajump',420]]),
 L('SUNDOWN SLALOM',3,4,[['slalom',360],['gs',420],['steep',240],['bigair',260]]),
 L('GOLDEN HOUR',3,4,[['flats',240],['mega',500],['flats',240],['mega',400]]),
 L('EMBER RIDGE',3,5,[['kickers',300],['logs',300],['kickers',300],['megajump',420]]),
 L('BLACK DIAMOND',3,5,[['steep',500],['chute',300],['steep',300]]),
 L('THE GAUNTLET',2,5,[['logs',280],['chute',260],['moguls',260],['glade',300]]),
 L('TREE LINE',2,5,[['glade',400],['cliff',200],['glade',400],['bigair',260]]),
 L('ICE WALL',1,5,[['chute',320],['cliff',200],['chute',320],['megajump',420]]),
 L('THUNDER ROAD',0,5,[['mega',900],['flats',160],['megajump',420]]),
 L('BOWL RUN',0,5,[['bowl',460],['moguls',300],['bowl',460],['megajump',420]]),
 L('LONG WAY DOWN',3,5,[['mega',500],['gs',400],['steep',300],['mega',500],['bigair',260]]),
 L('NO BRAKES',1,5,[['steep',400],['mega',500],['chute',240],['steep',300]]),
 L('BUMP AND BURN',3,5,[['moguls',300],['steep',300],['moguls',300],['logs',260]]),
 L('STAIRWAY',3,5,[['cliff',200],['mega',300],['cliff',200],['mega',300],['cliff',200],['bigair',260]]),
 L('WHITEOUT',3,5,[['glade',300],['logs',260],['chute',260],['moguls',260],['cliff',200],['mega',400],['megajump',420]])];
// The path climbs in waves, with easier levels as breathers between spikes.
const PATH_HARD=[1,1,2,1,2,3,2,3,4,2,3,4,3,5,3,5,4,3,5,5];
// Each star makes every slope much steeper and lifts the top speed: about 122 km/h at one star, about 245 km/h at five, and up to about 273 km/h in the last levels.
const PITCH_PER_STAR=[.8,.92,1.05,1.2,1.38],SPEED_PER_STAR=[34,40,48,58,68];const LATE_RUSH_FROM=41,LATE_RUSH=.8;
export const LEVELS=SPECS.map((s,i)=>{let z=0;const hard=i<PATH_LEVELS?PATH_HARD[i]:s.hard,mul=PITCH_PER_STAR[hard-1],sections=[['start',90],...s.sections,['sprint',hard>=4?300:200]].map(([kind,len])=>{const sec={kind,z0:z,z1:z+len,...KINDS[kind]};sec.pitch*=mul;if(kind==='chute'&&hard>=4)sec.bound=7;z+=len;return sec;});const area=AREAS[s.area],theme=THEMES[THEME_OF[i]];
 return {id:'l'+String(i+1).padStart(2,'0'),n:i+1,hard,hearts:hard>=5?2:3,maxSpeed:SPEED_PER_STAR[hard-1]+Math.max(0,i+1-LATE_RUSH_FROM+1)*LATE_RUSH,en:s.en,area:s.area,seed:101+i*977,length:z,sections,theme:theme.id,sky:theme.fogColor,snow:theme.snow,accent:theme.accent,trees:area.trees,features:[...new Set(s.sections.map(([k])=>KINDS[k].label))]};});
export const isFree=i=>i>=PATH_LEVELS;
// The path unlocks in order; finishing its last level opens every free level at once.
export const isUnlocked=(i,done)=>i===0||(i<PATH_LEVELS?done.has(LEVELS[i-1].id):done.has(LEVELS[PATH_LEVELS-1].id));
export const ROUTES=LEVELS;
const smoothstep=t=>t<=0?0:t>=1?1:t*t*(3-2*t);
const CLIFF_EDGE=45,CLIFF_DROP=10;
const profiles=new WeakMap();
// Terrain only depends on z through precomputed 1 m tables, so physics and meshes stay cheap.
export function profile(level){let p=profiles.get(level.sections);if(p)return p;const secs=level.sections,len=secs.at(-1).z1,n=len+1;
 const rawP=new Float32Array(n),rawB=new Float32Array(n),rawW=new Float32Array(n);let k=0;for(let z=0;z<n;z++){while(k<secs.length-1&&z>=secs[k].z1)k++;rawP[z]=secs[k].pitch;rawB[z]=secs[k].bound||WIDE;rawW[z]=secs[k].kind==='bowl'?1:0;}
 const avg=(src,w)=>{const out=new Float32Array(n);for(let z=0;z<n;z++){let s=0,c=0;for(let j=z-w;j<=z+w;j++){s+=src[Math.max(0,Math.min(n-1,j))];c++;}out[z]=s/c;}return out;};
 const P=avg(rawP,15),B=avg(rawB,20),BW=avg(rawW,25),H=new Float32Array(n);for(let z=1;z<n;z++)H[z]=H[z-1]-P[z];
 for(let z=0;z<n;z++){H[z]+=Math.sin(z*.013)*1.2;for(const s of secs){if(s.kind==='cliff'&&z>=s.z0){const edge=s.z0+CLIFF_EDGE;if(z>=edge-8&&z<edge)H[z]+=.7*Math.sin(Math.PI*(z-edge+8)/8);H[z]-=CLIFF_DROP*smoothstep((z-edge)/4);}if(z<s.z0||z>s.z1)continue;const t=(z-s.z0)/(s.z1-s.z0);
  if(s.kind==='rollers')H[z]+=2.2*Math.sin(Math.PI*t)*Math.sin(TAU*(z-s.z0)/40);}}
 // Heading: each section bends left or right (long ones become S-curves), integrated into a world-space centreline.
 let bendSeed=level.seed^0x5bd1;const brand=()=>((bendSeed=(Math.imul(bendSeed,1664525)+1013904223)>>>0)/4294967296);const rawK=new Float32Array(n);let side=brand()>.5?1:-1;
 for(const s of secs){const mag=BENDS[s.kind]||0;if(!mag)continue;const slen=s.z1-s.z0,bends=Math.max(1,Math.round(slen/300)),blen=slen/bends;for(let b=0;b<bends;b++){const want=mag*(.75+brand()*.5),d=side*Math.min(want,MAX_CURVE*2*blen/Math.PI*.95);side=-side;for(let z=Math.ceil(s.z0+b*blen);z<Math.min(n,s.z0+(b+1)*blen);z++)rawK[z]=d*Math.PI/(2*blen)*Math.sin(Math.PI*(z-s.z0-b*blen)/blen);}}
 const K=avg(rawK,10),TH=new Float32Array(n),PX=new Float32Array(n),PZ=new Float32Array(n);for(let z=1;z<n;z++){TH[z]=TH[z-1]+K[z];PX[z]=PX[z-1]+Math.sin(TH[z]);PZ[z]=PZ[z-1]+Math.cos(TH[z]);}
 let par=0;for(let z=0;z<len;z++)par+=1/Math.max(10,terminalSpeed(P[z]));
 for(const s of secs)if(s.kind==='cliff')s.edge=s.z0+CLIFF_EDGE;
 p={len,P,B,BW,H,K,TH,PX,PZ,secs,par};profiles.set(level.sections,p);return p;}
const lerpTable=(t,z)=>{const i=Math.floor(z),f=z-i;return t[i]+(t[i+1]-t[i])*f;};
export function heightAt(level,z){const p=profile(level);if(z<=0)return p.H[0]-z*.15;if(z>=p.len){const e=z-p.len,p0=p.P[p.len],B=40,flat=.1;return p.H[p.len]-(e<B?p0*e-(p0-flat)*e*e/(2*B):(p0+flat)*B/2+(e-B)*flat);}return lerpTable(p.H,z);}
export function boundAt(level,z){const p=profile(level);return z<=0?p.B[0]:z>=p.len?p.B[p.len]:lerpTable(p.B,z);}
export function pitchAt(level,z){const p=profile(level);return z<=0?p.P[0]:z>=p.len?p.P[p.len]:lerpTable(p.P,z);}
export function bowlAt(level,z){const p=profile(level);return z<=0||z>=p.len?0:lerpTable(p.BW,z);}
export function curvatureAt(level,z){const p=profile(level);return z<=0||z>=p.len?0:lerpTable(p.K,z);}
export function headingAt(level,z){const p=profile(level);return z<=0?p.TH[0]:z>=p.len?p.TH[p.len]:lerpTable(p.TH,z);}
// Trail coordinates (x across, z along the run) to world X/Z: the centreline plus x along the lateral normal.
export function toWorld(level,x,z){const p=profile(level),th=headingAt(level,z);let cx,cz;if(z<=0){cx=p.PX[0]+Math.sin(p.TH[0])*z;cz=p.PZ[0]+Math.cos(p.TH[0])*z;}else if(z>=p.len){const e=z-p.len;cx=p.PX[p.len]+Math.sin(th)*e;cz=p.PZ[p.len]+Math.cos(th)*e;}else{cx=lerpTable(p.PX,z);cz=lerpTable(p.PZ,z);}return [cx+Math.cos(th)*x,cz-Math.sin(th)*x,th];}
export function sectionAt(level,z){const secs=level.sections;for(const s of secs)if(z<s.z1)return s;return secs.at(-1);}
// Ramps are real curved surfaces (height grows with the square of the distance up the ramp), so the lip angle and approach speed decide the flight.
export function rampLift(o,x,z){if(Math.abs(x-o.x)>o.width/2||z>o.z||z<o.z-o.len)return 0;const t=(z-o.z+o.len)/o.len;return o.h*t*t;}
// Outside the lane the snow banks up into walls, which turns narrow sections into canyons.
export function groundFor(level,withRamps=true){const cached=withRamps&&grounds.get(level.sections);if(cached)return cached;const base=(x,z)=>heightAt(level,z)-x*curvatureAt(level,z)*25+bowlAt(level,z)*BOWL_DEPTH*Math.min(1,Math.abs(x)/boundAt(level,z))**3+Math.sin(x*.08+z*.008)*.5+Math.min(12,Math.max(0,Math.abs(x)-boundAt(level,z)-1)**2*.05);if(!withRamps)return base;
 const ramps=course(level).filter(o=>o.type==='ramp'),full=(x,z)=>{let h=base(x,z);for(const o of ramps){if(o.z<z)continue;if(o.z-o.len>z)break;h+=rampLift(o,x,z);}return h;};full.base=base;grounds.set(level.sections,full);return full;}
const grounds=new WeakMap();
export const extra=level=>Math.max(0,(level.hard||2)-2);
export const gladeClear=level=>4.2-.2*extra(level);
export function pathX(sec,z){const len=sec.z1-sec.z0,waves=Math.max(1,Math.round(len/90));return Math.min(9,(sec.bound||WIDE)-4.5)*Math.sin(Math.PI*waves*(z-sec.z0)/len)*(sec.flip||1);}
// Where a skier leaving this ramp at speed v is, relative to the slope, t seconds after the lip.
export function flight(o,v,t){return {z:o.z+v*t,h:o.h+2*o.h/o.len*v*t-G/2*t*t};}
const courses=new WeakMap();
export function course(level){const cached=courses.get(level.sections);if(cached)return cached;let seed=level.seed;const k=extra(level),dense=1+.35*k,narrow=1-.05*k;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);const objects=[],scatter=[];
 const ramp=(kind,x,z,expected)=>{const o={type:'ramp',kind,x,z,...RAMPS[kind]};objects.push(o);const v=Math.min(44,Math.max(16,expected));let air=0;for(let t=.1;t<6;t+=.05){if(flight(o,v,t).h<0){air=t;break;}}
  const count=kind==='mega'?10:kind==='big'?7:4;for(let j=1;j<=count;j++){const f=flight(o,v,air*j/(count+1));if(f.h>1.2)objects.push({type:'coin',x,z:f.z,air:f.h});}return o;};
 // Coins weave across the lane; gates sit on the outside of each turn.
 const snake=(s,amp,wave,{gates=true,width=6.5*narrow,gap=7,air=0,boosts=0}={})=>{const ph=rand()>.5?0:Math.PI;const X=z=>amp*Math.sin(TAU*(z-s.z0)/wave+ph);for(let z=s.z0+18;z<s.z1-12;z+=gap)objects.push({type:'coin',x:X(z),z,air});
  if(gates)for(let z=s.z0+18+wave/4;z<s.z1-15;z+=wave/2)objects.push({type:'gate',x:X(z)*.92,z,width});if(boosts)for(let z=s.z0+40;z<s.z1-30;z+=boosts)objects.push({type:'boost',x:X(z),z,width:4});};
 level.sections.forEach((s,si)=>{const {z0,z1}=s,len=z1-z0,b=s.bound||WIDE,v=terminalSpeed(s.pitch);
  if(s.kind==='cruise'){snake(s,9,90);scatter.push({s,count:Math.round(len/24*(.5+level.trees)),rocks:.2});}
  if(s.kind==='flats'){snake(s,8,70,{width:7*narrow,boosts:70});scatter.push({s,count:Math.round(len/30*(.5+level.trees)),rocks:.1});}
  if(s.kind==='steep'){snake(s,10,130,{width:7*narrow});scatter.push({s,count:Math.round(len/24*(.5+level.trees)),rocks:.6});}
  if(s.kind==='mega'){snake(s,11,160,{width:8*narrow,gap:9,boosts:level.hard>=4?120:0});scatter.push({s,count:Math.round(len/26*(.4+level.trees)),rocks:.5,maxDense:1.15});}
  if(s.kind==='rollers'){for(let z=z0+10,i=0;z<z1-10;z+=40,i++)objects.push({type:'coin',x:(i%2?1:-1)*6,z,air:2.4},{type:'coin',x:(i%2?1:-1)*6,z:z+5,air:2});for(let z=z0+30,i=0;z<z1-20;z+=80,i++)objects.push({type:'gate',x:(i%2?-1:1)*6,z,width:6.5});scatter.push({s,count:Math.round(len/26*level.trees),rocks:.2});}
  if(s.kind==='slalom'||s.kind==='gs'){const gs=s.kind==='gs',gap=gs?42:28,w=Math.max(3.8,(gs?5.6:level.area>=2?4.3:4.8)*narrow);let last=0;for(let z=z0+25,i=0;z<z1-15;z+=gap,i++){const x=(i%2?1:-1)*((gs?8:6)+rand()*(gs?3:2.5));objects.push({type:'gate',x,z,width:w});if(i)objects.push({type:'coin',x:(x+last)/2,z:z-gap/2});last=x;}scatter.push({s,count:Math.round(len/30*level.trees),rocks:.15});}
  if(s.kind==='kickers'){for(let z=z0+40,i=0;z<z1-35;z+=62,i++)ramp('kicker',(i%2?1:-1)*6,z,v);scatter.push({s,count:Math.round(len/28*level.trees),rocks:.2});}
  if(s.kind==='bigair'){const z=z0+75;ramp('big',0,z,v);for(let zz=z0+12;zz<z-16;zz+=9)for(const side of [-1,1])objects.push({type:'flag',x:side*5.4,z:zz});objects.push({type:'boost',x:0,z:z0+30,width:4});}
  if(s.kind==='megajump'){const z=z0+150;ramp('mega',0,z,v);for(let zz=z0+40;zz<z-26;zz+=10)for(const side of [-1,1])objects.push({type:'flag',x:side*6.6,z:zz,warn:zz>z-60});for(const zz of [z0+70,z0+105])objects.push({type:'boost',x:0,z:zz,width:4});}
  if(s.kind==='glade'){s.flip=rand()>.5?1:-1;const gap=Math.max(2.7,(level.area>=2?3.3:4.4)-.3*k),clear=gladeClear(level);const prev=level.sections[si-1]?.kind,entry=prev==='cliff'||prev==='megajump'||prev==='bigair'?70:10;for(let z=z0+entry;z<z1-8;z+=gap){for(let x=-b+1.5;x<=b-1.5;x+=4.1){const tx=x+(rand()-.5)*2.2,tz=z+(rand()-.5)*1.4;if(Math.abs(tx-pathX(s,tz))<clear)continue;objects.push({type:'tree',x:tx,z:tz,radius:.95});}}for(let z=z0+18;z<z1-10;z+=11)objects.push({type:'coin',x:pathX(s,z),z});}
  if(s.kind==='moguls'){for(let z=z0+16,row=0;z<z1-12;z+=6.5-.35*k,row++)for(let x=-b+2+(row%2)*2.1;x<=b-2;x+=4.2)objects.push({type:'mogul',x,z,r:1.55});snake(s,7,90,{gates:false,gap:10,air:1});}
  if(s.kind==='chute'){for(let z=z0+40,i=0;z<z1-25;z+=34-3*k,i++)objects.push({type:'rock',x:(i%2?1:-1)*(3+rand()*1.8),z,radius:1.3});for(let z=z0+20,i=0;z<z1-15;z+=17,i++)objects.push({type:'coin',x:Math.sin(i*1.3)*4,z});}
  if(s.kind==='logs'){for(let z=z0+35,i=0;z<z1-25;z+=46,i++){if(k>=2?i%2===1:i%3===2){objects.push({type:'log',x0:-b,x1:b,x:0,z},{type:'coin',x:0,z,air:2.2});continue;}const g=(rand()-.5)*(b*1.3),half=2.4;objects.push({type:'log',x0:-b,x1:g-half,x:(g-half-b)/2,z},{type:'log',x0:g+half,x1:b,x:(g+half+b)/2,z},{type:'coin',x:g,z},{type:'coin',x:g*.5,z:z+23});}}
  if(s.kind==='bowl'){for(let z=z0+40,i=0;z<z1-30;z+=38,i++){const side=i%2?1:-1;objects.push({type:'coin',x:side*(b-7),z},{type:'coin',x:side*(b-3),z:z+5},{type:'coin',x:side*(b-.5),z:z+10,air:3.5},{type:'coin',x:side*(b-.5),z:z+14,air:6});}for(let z=z0+25;z<z1-15;z+=19)objects.push({type:'coin',x:0,z});}
  if(s.kind==='sprint'){for(let z=z0+18;z<z1-8;z+=13)objects.push({type:'coin',x:0,z});for(let z=z0+24;z<z1-60;z+=level.hard>=4?80:400)objects.push({type:'boost',x:0,z,width:5});}
  if(s.kind==='cliff'){const edge=z0+CLIFF_EDGE;for(let zz=edge-26;zz<edge-4;zz+=7)for(const side of [-1,1])objects.push({type:'flag',x:side*6,z:zz,warn:true});for(let j=0;j<5;j++)objects.push({type:'coin',x:0,z:edge+6+j*6,air:CLIFF_DROP*(1-((j+1)/6)**2)});snake({z0:edge+50,z1},9,70,{gates:false,gap:12});}
 });
 const anchors=objects.filter(o=>['gate','ramp','log','boost','coin'].includes(o.type));
 for(const {s,count,rocks,maxDense=9} of scatter)for(let i=0;i<Math.round(count*Math.min(dense,maxDense));i++){const z=s.z0+20+rand()*(s.z1-s.z0-40),x=(rand()-.5)*2*(WIDE-3);if(anchors.some(o=>o.type==='coin'?Math.abs(o.z-z)<6&&Math.abs(o.x-x)<3.5:o.type==='ramp'?z>o.z-o.len-15&&z<o.z+60&&Math.abs(o.x-x)<o.width/2+5:Math.abs(o.z-z)<18&&Math.abs(o.x-x)<7))continue;objects.push({type:rand()<rocks+.08*k?'rock':'tree',x,z,radius:1.2+rand()*.5});}
 const out=objects.sort((a,b)=>a.z-b.z).map((o,id)=>({...o,id}));courses.set(level.sections,out);return out;}
export class Run{
 constructor(route,gear='ski'){this.route=route;this.gear=GEAR[gear]?gear:'ski';this.kit=GEAR[this.gear];this.maxSpeed=route.maxSpeed||MAX_SPEED;this.mogulSafe=MOGUL_SAFE+this.kit.mogul;this.ground=groundFor(route);this.objects=course(route);this.x=0;this.z=0;this.vx=0;this.speed=18;this.y=this.ground(0,0);this.vy=-pitchAt(route,0)*this.speed;this.air=false;this.airTime=0;this.height=0;this.rotation=0;this.flipRot=0;this.score=0;this.combo=0;this.bestCombo=0;this.hearts=3;this.invincible=0;this.maxHearts=route.hearts||3;this.hearts=this.maxHearts;this.gates=0;this.coins=0;this.tricks=0;this.moguls=0;this.mogulRun=0;this.bigAir=0;this.topSpeed=0;this.maxHeight=0;this.time=0;this.jumpCooldown=0;this.status='playing';this.section=null;this.seen=new Set();this.events=[];}
 // Events carry i18n keys and parameters, never display text.
 emit(type,key,points=0,params={}){this.events.push({type,key,points,params});}
 award(points,key,params={}){this.combo++;this.bestCombo=Math.max(this.combo,this.bestCombo);const n=points*Math.min(5,1+Math.floor(this.combo/4));this.score+=n;this.emit('score',key,n,params);}
 launch(v=9){if(this.air||this.jumpCooldown>0)return;this.air=true;this.airTime=0;this.vy+=v;this.y+=.1;this.height=.1;this.rotation=0;this.flipRot=0;this.jumpCooldown=.6;if(v>=9)this.emit('jump','ev.jump');}
 land(g){const air=this.airTime;this.air=false;this.y=g;this.vy=-pitchAt(this.route,this.z)*this.speed;this.height=0;
  const spins=Math.floor((this.rotation+.3)/TAU),flips=Math.floor((this.flipRot+.3)/TAU),clean=spins||flips||this.rotation<=1.5&&this.flipRot<=1.2;
  if(spins||flips){this.tricks+=spins+flips;const mix=spins&&flips?1.5:1;this.award(Math.round((spins*350+flips*550)*mix),'ev.landed',{flips,deg:spins*360,mix});}
  else if(!clean){this.combo=0;this.speed*=.6;this.emit('miss','ev.unbalanced');}else if(air>.5)this.emit('land','ev.land');
  if(this.wallAir&&clean&&air>.5){this.walls=(this.walls||0)+1;this.award(200,'ev.wall_air');}this.wallAir=false;
  if(air>1.1&&clean){this.bigAir++;this.award(Math.round(air*air*90),air>2.5?'ev.super_air':'ev.air',{s:air.toFixed(1)});}this.rotation=0;this.flipRot=0;}
 step(dt,input={}){
  if(this.status!=='playing')return;dt=Math.min(.05,Math.max(0,dt));this.time+=dt;this.invincible=Math.max(0,this.invincible-dt);this.jumpCooldown=Math.max(0,this.jumpCooldown-dt);
  const sec=sectionAt(this.route,this.z);if(sec!==this.section){this.section=sec;if(sec.label)this.emit('section',sec.label,0,{tip:sec.tip});}
  const steer=Math.max(-1,Math.min(1,input.steer||0)),pitch=pitchAt(this.route,this.z),v=this.speed;
  const drag=(input.tuck?TUCK_DRAG:DRAG)*this.kit.drag*(1+Math.abs(steer)*.4);let a=this.air?-drag*.5*v*v:9.8*pitch-FRICTION-drag*v*v+(input.tuck?TUCK_PUSH:0);
  if(input.brake&&!this.air)a-=sec.kind==='moguls'?(v>this.mogulSafe-3?7:0):9;
  this.speed=Math.max(6,v>this.maxSpeed?Math.max(this.maxSpeed,v-12*dt):Math.min(this.maxSpeed,v+a*dt));this.topSpeed=Math.max(this.topSpeed,this.speed);
  const lateral=this.kit.lateral+this.speed*this.kit.latK,curve=curvatureAt(this.route,this.z),push=-curve*this.speed*this.speed;if(this.air)this.vx+=push*.5*dt;else this.vx+=(steer*lateral*(input.brake?.75:1)+push*.09-this.vx)*Math.min(1,dt*5);if(this.air)this.vx+=(steer*lateral-this.vx)*Math.min(1,dt*1.5);const prevX=this.x;this.x+=this.vx*dt;
  const bound=boundAt(this.route,this.z);if(Math.abs(this.x)>bound){this.x=Math.sign(this.x)*bound;this.vx*=sec.kind==='bowl'?-.15:-.3;if(sec.kind!=='bowl')this.speed*=.98;}
  if(input.jump)this.launch();const prev=this.z;this.z+=this.speed*dt;
  // Vertical motion is absolute, so ramp lips, rollers and cliff edges throw the skier into the air naturally.
  let g=this.ground(this.x,this.z);
  if(!this.air&&g-this.y>.45){this.x=prevX;this.vx*=-.4;this.speed*=.97;g=this.ground(this.x,this.z);this.emit('bump','ev.ramp_side');}
  if(!this.air){const base=this.ground.base,vg=(g-this.ground(this.x,prev))/dt+(base(this.x,this.z)-base(prevX,this.z))/dt;if((vg-this.vy)/dt<-G*1.05&&this.speed>10){this.air=true;this.airTime=0;this.rotation=0;this.flipRot=0;this.wallAir=sec.kind==='bowl'&&Math.abs(this.x)>=bound-.6;this.vy-=G*dt;this.y+=this.vy*dt;}else{this.vy=vg;this.y=g;const base=this.ground.base,side=(base(this.x+.5,this.z)-base(this.x-.5,this.z));this.vx-=side*9.8*.6*dt;}}
  else{this.airTime+=dt;this.vy-=G*dt;this.y+=this.vy*dt;if(input.trick)this.rotation+=dt*this.kit.spin;if(input.flip)this.flipRot+=dt*this.kit.flip;if(this.y<=g)this.land(g);}
  this.height=Math.max(0,this.y-g);this.maxHeight=Math.max(this.maxHeight,this.height);
  for(const o of this.objects){if(this.seen.has(o.id)||o.z<prev-4||o.z>this.z+3)continue;const d=Math.abs(this.x-o.x),crossed=prev<o.z&&this.z>=o.z;
   if(o.type==='gate'&&crossed){this.seen.add(o.id);if(d<o.width/2){this.gates++;this.award(150,'ev.gate');}else{this.combo=0;this.emit('miss','ev.gate_miss');}}
   else if(o.type==='ramp'&&crossed){this.seen.add(o.id);if(d<o.width/2&&o.kind!=='kicker')this.emit('launch',o.kind==='mega'?'ev.launch_mega':'ev.launch_big');}
   else if(o.type==='boost'&&crossed){if(d<o.width/2+.4&&!this.air){this.seen.add(o.id);this.speed=Math.min(this.maxSpeed+6,this.speed+8);this.emit('boost','ev.boost');}}
   else if(o.type==='coin'&&Math.abs(this.z-o.z)<3&&d<1.9&&Math.abs(this.height-(o.air||0))<3){this.seen.add(o.id);this.coins++;this.score+=50;this.emit('coin','ev.coin',50);}
   else if(o.type==='mogul'&&crossed){if(d>=o.r)continue;this.seen.add(o.id);if(this.air)continue;
    if(input.brake||this.speed<=this.mogulSafe){this.moguls++;this.mogulRun++;this.score+=20;this.emit('mogul',null,20);if(this.mogulRun%6===0)this.award(120,'ev.mogul_rhythm',{n:this.mogulRun});}
    else{const over=this.speed-this.mogulSafe;this.mogulRun=0;this.jumpCooldown=0;this.launch(3+over*.35);if(over>8){this.combo=0;this.speed*=.72;this.emit('miss','ev.mogul_launch');}else this.emit('bump','ev.mogul_bump');}}
   else if(o.type==='log'&&Math.abs(this.z-o.z)<1&&this.x>o.x0-.55&&this.x<o.x1+.55){if(this.height<1.1){this.seen.add(o.id);this.hit();}else if(crossed){this.seen.add(o.id);this.award(120,'ev.log');}}
   else if((o.type==='tree'||o.type==='rock')&&Math.abs(this.z-o.z)<2){
    if(d<o.radius+.65&&this.height<(o.type==='rock'?1.8:5.5)){this.seen.add(o.id);this.hit();}
    else if(crossed){this.seen.add(o.id);if(d<o.radius+2.6&&this.height<2)this.award(100,'ev.near');}
   }
  }
  if(this.z>=this.route.length&&this.status==='playing'){this.z=this.route.length;this.status='finished';const par=profile(this.route).par*1.1,bonus=Math.round(1000+this.hearts*300+Math.max(0,par-this.time)*25);this.score+=bonus;this.emit('finish','ev.finish',bonus,{kmh:Math.round(this.speed*3.6)});}
 }
 // After the line the score is settled: the skier only slides to a stop on the flat beyond it.
 coast(dt){this.speed=Math.max(0,this.speed-STOP_DECEL*dt);this.vx*=Math.max(0,1-dt*2);this.x+=this.vx*dt;this.z+=this.speed*dt;const g=this.ground(this.x,this.z);if(this.y>g+.02&&this.air){this.vy-=G*dt;this.y+=this.vy*dt;if(this.y<=g){this.y=g;this.air=false;}}else{this.y=g;this.air=false;}this.height=Math.max(0,this.y-g);}
 hit(){if(this.invincible)return;this.hearts--;this.combo=0;this.mogulRun=0;this.speed=8;this.invincible=2;this.emit('hit','ev.hit');if(!this.hearts)this.status='crashed';}
}
