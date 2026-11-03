// Promo video director for record_game_video. Plays level 1 through the game's real key handlers.
// A shadow copy of the simulation only decides which keys to press; nothing in the game is changed.
(async()=>{
const {LEVELS,Run,boundAt,sectionAt}=await import(new URL('engine.js',location.href));
const FPS=30,SECONDS=26,W=REC.width,H=REC.height;
const out=document.createElement('canvas');out.width=W;out.height=H;const ctx=out.getContext('2d'),world=document.querySelector('#world');
const shadow=new Run(LEVELS[0],'ski'),ramps=shadow.objects.filter(o=>o.type==='ramp');
const held=new Set(),setKey=(key,on)=>{if(on===held.has(key))return;on?held.add(key):held.delete(key);window.dispatchEvent(new KeyboardEvent(on?'keydown':'keyup',{key,bubbles:true}));};
// The same look-ahead line picker as tests/bot.js.
function pickLine(r){const b=boundAt(r.route,r.z)-.6,ahead=r.objects.filter(o=>o.z>r.z-1&&o.z<r.z+40&&!r.seen.has(o.id));let best=null;
 for(let x=-b;x<=b;x+=.5){let cost=Math.abs(x-r.x)*.08;for(const o of ahead){const dz=o.z-r.z,w=Math.exp(-Math.max(0,dz-3)/9);
   if(o.type==='tree'||o.type==='rock'){if(Math.abs(x-o.x)<o.radius+1.6)cost+=40*w;}
   else if(o.type==='gate'&&dz>4){if(Math.abs(x-o.x)<o.width/2-.8)cost-=6*w;}
   else if(o.type==='coin'&&dz>2){if(Math.abs(x-o.x)<1.2)cost-=1.5*w;}
   else if(o.type==='ramp'){const inside=Math.abs(x-o.x)<o.width/2-.6,edge=Math.abs(x-o.x)<o.width/2+1.2;if(r.z>o.z-o.len-3&&edge&&!inside&&Math.abs(r.x-o.x)>o.width/2-.6)cost+=60;else if(inside)cost-=4*w;}}
  if(!best||cost<best.cost)best={x,cost};}
 const big=ramps.find(o=>o.z>r.z&&o.z-r.z<130);return big?big.x:best.x;}
// A trick is only held on real air and released once a whole rotation is banked, so landings stay clean.
function controls(r){const dx=pickLine(r)-r.x,steer=Math.abs(dx)>.25?Math.sign(dx):0,spinning=r.air&&r.height>2.5&&(r.rotation+.3<Math.PI*2||r.airTime<1.1&&(r.rotation+.3)%(Math.PI*2)>1);
 setKey('ArrowLeft',steer>0);setKey('ArrowRight',steer<0);setKey('ArrowUp',true);setKey('f',spinning);
 return {steer,tuck:true,trick:spinning};}
const title=(alpha,y)=>{if(alpha<=0)return;ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle='#123a4c';ctx.textAlign='center';ctx.font=`700 ${Math.round(H*.15)}px "Space Grotesk",system-ui,sans-serif`;ctx.letterSpacing='8px';ctx.fillText('WHITEOUT',W/2,y);ctx.restore();};
const text=id=>document.querySelector(id).textContent;
function draw(t){ctx.drawImage(world,0,0,W,H);ctx.save();ctx.fillStyle='#123a4c';ctx.font=`600 ${Math.round(H*.06)}px "Space Grotesk",system-ui,sans-serif`;ctx.textAlign='left';ctx.fillText(text('#score'),W*.03,H*.11);ctx.textAlign='right';ctx.fillText(text('#speed')+' km/h',W*.97,H*.11);ctx.restore();
 const fade=(a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));title(1-fade(1.6,2.4),H*.3);title(fade(SECONDS-2.4,SECONDS-1.6),H*.3);}
await document.fonts.ready;
REC.run({fps:FPS,seconds:SECONDS,canvas:out,
 async setup(){document.querySelector('#start').click();REC.log('started: '+text('#route-label'));},
 async step(i,t){const c=controls(shadow);for(let k=0;k<4;k++)shadow.step(1/120,c);await REC.advance(1000/FPS);draw(t);if(i%FPS===0)REC.log(`t=${Math.round(t)} real=${text('#distance')} shadow=${Math.floor(shadow.z)} v=${text('#speed')} hearts=${shadow.hearts} score=${text('#score')}`);
  if(i===Math.round(SECONDS*FPS)-1)for(const k of [...held])setKey(k,false);}});
})().catch(e=>REC.log("director failed: "+e.stack));
