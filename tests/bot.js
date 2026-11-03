import {Run,boundAt,sectionAt,pathX} from '../engine.js';
// A simple look-ahead line picker used to prove every level is finishable without tricks.
export function playBot(level,{seconds=240,gear='ski'}={}){const r=new Run(level,gear),ramps=r.objects.filter(o=>o.type==='ramp');let target=0,crowded=false;
 for(let i=0;i<seconds*120&&r.status==='playing';i++){
  if(i%6===0){const b=boundAt(level,r.z)-.6,reach=Math.max(34,r.speed*1.5),fade=reach/3.8,ahead=r.objects.filter(o=>o.z>r.z-1&&o.z<r.z+reach&&!r.seen.has(o.id));let best=null;
   for(let x=-b;x<=b;x+=.5){let cost=Math.abs(x-r.x)*.08;for(const o of ahead){const dz=o.z-r.z,w=Math.exp(-Math.max(0,dz-3)/fade);
     if(o.type==='tree'||o.type==='rock'){if(Math.abs(x-o.x)<o.radius+1.4)cost+=40*w;}
     else if(o.type==='log'){if(x>o.x0-1.2&&x<o.x1+1.2)cost+=dz<12?4:25*w;}
     else if(o.type==='gate'&&dz>4){if(Math.abs(x-o.x)<o.width/2-.8)cost-=6*w;}
     else if(o.type==='ramp'){const inside=Math.abs(x-o.x)<o.width/2-.6,edge=Math.abs(x-o.x)<o.width/2+1.2;if(r.z>o.z-o.len-3&&edge&&!inside&&Math.abs(r.x-o.x)>o.width/2-.6)cost+=60;else if(inside)cost-=4*w;}}
    if(!best||cost<best.cost)best={x,cost};}
   crowded=ahead.filter(o=>(o.type==='tree'||o.type==='rock')&&Math.abs(o.x-r.x)<10).length>=2;target=best.x;const here=sectionAt(level,r.z+8);if(here.kind==='glade')target=pathX(here,Math.min(here.z1,r.z+r.speed*.35));const big=ramps.find(o=>o.kind!=='kicker'&&o.z>r.z&&o.z-r.z<130);if(big)target=big.x;}
  const logAhead=r.objects.find(o=>o.type==='log'&&!r.seen.has(o.id)&&o.z-r.z>0&&o.z-r.z<r.speed*.28&&r.x>o.x0-.7&&r.x<o.x1+.7);
  const sec=sectionAt(level,r.z),dx=target-r.x;
  r.step(1/120,{steer:Math.abs(dx)>.25?-Math.sign(dx)*Math.min(1,Math.abs(dx)/1.5)*-1:0,brake:crowded&&r.speed>24||sec.kind==='moguls'||sec.kind==='chute'&&r.speed>24||sec.kind==='glade'&&r.speed>26,jump:!!logAhead});
 }
 return r;}
// Proves a level can be passed without touching a tree or rock: sweeps the run metre by metre, tracking every lane position reachable at braking speed.
export function clearLine(level,course,boundAt,{speed=18,lateral=12}={}){const step=.5,slip=lateral/speed,hazards=course(level).filter(o=>o.type==='tree'||o.type==='rock').sort((a,b)=>a.z-b.z);const size=Math.ceil(90/step),at=x=>Math.round((x+45)/step);let reach=new Uint8Array(size+1);reach[at(0)]=1;const spread=Math.max(1,Math.floor(slip/step));let first=0;
 for(let z=1;z<=level.length;z++){const next=new Uint8Array(size+1),b=boundAt(level,z);for(let i=0;i<=size;i++){if(!reach[i])continue;for(let j=Math.max(0,i-spread);j<=Math.min(size,i+spread);j++)next[j]=1;}
  while(first<hazards.length&&hazards[first].z<z-3)first++;for(let i=0;i<=size;i++){if(!next[i])continue;const x=-45+i*step;if(Math.abs(x)>b){next[i]=0;continue;}for(let h=first;h<hazards.length&&hazards[h].z<=z+3;h++){const o=hazards[h];if(Math.abs(o.z-z)<2&&Math.abs(o.x-x)<o.radius+.65){next[i]=0;break;}}}
  if(!next.some(Boolean))return {ok:false,z};reach=next;}return {ok:true,z:level.length};}
