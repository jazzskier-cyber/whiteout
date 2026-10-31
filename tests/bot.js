import {Run,boundAt,sectionAt,pathX} from '../engine.js';
// A simple look-ahead line picker used to prove every level is finishable without tricks.
export function playBot(level,{seconds=240,gear='ski'}={}){const r=new Run(level,gear),ramps=r.objects.filter(o=>o.type==='ramp');let target=0;
 for(let i=0;i<seconds*120&&r.status==='playing';i++){
  if(i%6===0){const b=boundAt(level,r.z)-.6,ahead=r.objects.filter(o=>o.z>r.z-1&&o.z<r.z+34&&!r.seen.has(o.id));let best=null;
   for(let x=-b;x<=b;x+=.5){let cost=Math.abs(x-r.x)*.08;for(const o of ahead){const dz=o.z-r.z,w=Math.exp(-Math.max(0,dz-3)/9);
     if(o.type==='tree'||o.type==='rock'){if(Math.abs(x-o.x)<o.radius+1.4)cost+=40*w;}
     else if(o.type==='log'){if(x>o.x0-1.2&&x<o.x1+1.2)cost+=dz<12?4:25*w;}
     else if(o.type==='gate'&&dz>4){if(Math.abs(x-o.x)<o.width/2-.8)cost-=6*w;}
     else if(o.type==='ramp'){const inside=Math.abs(x-o.x)<o.width/2-.6,edge=Math.abs(x-o.x)<o.width/2+1.2;if(r.z>o.z-o.len-3&&edge&&!inside&&Math.abs(r.x-o.x)>o.width/2-.6)cost+=60;else if(inside)cost-=4*w;}}
    if(!best||cost<best.cost)best={x,cost};}
   target=best.x;const here=sectionAt(level,r.z+8);if(here.kind==='glade')target=pathX(here,Math.min(here.z1,r.z+r.speed*.35));const big=ramps.find(o=>o.kind!=='kicker'&&o.z>r.z&&o.z-r.z<130);if(big)target=big.x;}
  const logAhead=r.objects.find(o=>o.type==='log'&&!r.seen.has(o.id)&&o.z-r.z>0&&o.z-r.z<r.speed*.28&&r.x>o.x0-.7&&r.x<o.x1+.7);
  const sec=sectionAt(level,r.z),dx=target-r.x;
  r.step(1/120,{steer:Math.abs(dx)>.25?-Math.sign(dx)*Math.min(1,Math.abs(dx)/1.5)*-1:0,brake:sec.kind==='moguls'||sec.kind==='chute'&&r.speed>24||sec.kind==='glade'&&r.speed>26,jump:!!logAhead});
 }
 return r;}
