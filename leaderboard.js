// AIWANNA board "mountain-total-v2": the sum of a player's best score on each of the 50 runs. The platform keeps only the best single submission, so the game adds up and submits the total.
// Scores are client-reported casual competition. Opened outside AIWANNA, the game never contacts the platform.
export const BOARD={gameId:'b1309400-5f5b-480c-b975-89cccf2ccdd4',gameSlug:'dfd0c8790b37cccbc089d967729cb6fc-834902d8',boardId:'2638b981-b24f-4321-84d0-6aca9fe9fbea',minScore:1,maxScore:10000000,origin:'https://www.aiwanna.games',origins:['https://www.aiwanna.games','https://aiwanna.games','https://www.ai-made.games','https://ai-made.games','https://1gp-game-platform.vercel.app']};
export function requestSession(win=window,config=BOARD){
 if(win.parent===win)return Promise.reject(Error('standalone'));
 return new Promise((resolve,reject)=>{const requestId=crypto.randomUUID();
  const done=(error,session)=>{win.clearTimeout(timer);win.removeEventListener('message',receive);error?reject(error):resolve(session);};
  const receive=e=>{const d=e.data;if(e.source!==win.parent||!config.origins.includes(e.origin)||d?.source!=='aimadegames-platform'||d.type!=='leaderboard-session'||d.requestId!==requestId)return;if(d.error||!d.session?.token||d.apiOrigin!==e.origin)return done(Error(String(d.error||'invalid session')));done(null,{...d.session,apiOrigin:e.origin});};
  const timer=win.setTimeout(()=>done(Error('session timeout')),15000);win.addEventListener('message',receive);
  for(const origin of config.origins)win.parent.postMessage({source:'aimadegames',type:'leaderboard-session',requestId},origin);});
}
export class Leaderboard{
 constructor({config=BOARD,embedded=()=>globalThis.window?.parent!==globalThis.window,sessionProvider=()=>requestSession(window,config),fetcher=(...a)=>fetch(...a),wait=ms=>new Promise(r=>setTimeout(r,ms))}={}){Object.assign(this,{config,embedded,sessionProvider,fetcher,wait});this.session=null;}
 get available(){return this.embedded();}
 url(){return `${this.session?.apiOrigin||this.config.origin}/games/${this.config.gameSlug}/leaderboard?board=${this.config.boardId}`;}
 async token(refresh=false){let s=this.session;if(refresh||!s||(s.expiresAt&&Date.parse(s.expiresAt)<=Date.now()+60000))s=this.session=await this.sessionProvider();return s;}
 // A 401 means the token expired: shake hands again and repeat with the same idempotency key. A 429 waits for Retry-After.
 async request(path,{key,body,method='POST'}={}){let refresh=false;
  for(let attempt=0;attempt<4;attempt++){const s=await this.token(refresh);refresh=false;
   const response=await this.fetcher(`${s.apiOrigin}/api/v1/${path}`,{method,credentials:'omit',headers:{Authorization:`Bearer ${s.token}`,...(key?{'Idempotency-Key':key}:{}),...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
   if(response.ok)return response.json();
   if(response.status===401){refresh=true;continue;}
   if(response.status===429){await this.wait(Math.min(30,Number(response.headers?.get?.('Retry-After'))||2)*1000);continue;}
   const data=await response.json().catch(()=>({}));throw Error(data.error?.code||`HTTP ${response.status}`);}
  throw Error('gave up');}
 // Called when a run really starts. Returns null outside AIWANNA, and never rejects.
 begin(){if(!this.available)return null;const run={startKey:crypto.randomUUID(),scoreKey:crypto.randomUUID(),runId:null};run.started=this.request(`leaderboards/${this.config.boardId}/runs`,{key:run.startKey}).then(d=>{run.runId=d.runId;return d.runId;});run.started.catch(()=>{});return run;}
 async submit(run,score){if(!run)throw Error('no run');if(!Number.isSafeInteger(score)||score<this.config.minScore||score>this.config.maxScore)throw Error('score out of range');const id=await run.started;return this.request(`runs/${encodeURIComponent(id)}/score`,{key:run.scoreKey,body:{score}});}
 async standings(limit=10){const id=this.config.boardId,[top,me]=await Promise.all([this.request(`leaderboards/${id}/entries?limit=${limit}`,{method:'GET'}),this.request(`leaderboards/${id}/me?around=0`,{method:'GET'})]);return {entries:top.entries||[],me:me.entry||null};}
}
