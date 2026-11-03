// Text lives in i18n/<lang>.json with identical keys; zh is the original. ?lang= wins (the AIWANNA player always passes it), then the browser language, then English.
export const LANGS=['zh','en','ja','ko','es'];
const match=code=>{const base=String(code||'').toLowerCase().split(/[-_]/)[0];return LANGS.includes(base)?base:null;};
export function pickLanguage(search='',languages=[]){let asked=null;try{asked=new URLSearchParams(search).get('lang');}catch{}return match(asked)||languages.map(match).find(Boolean)||'en';}
export const format=(text,params={})=>text.replace(/\{(\w+)\}/g,(m,name)=>name in params?String(params[name]):m);
const load=code=>fetch(new URL(`./i18n/${code}.json`,import.meta.url)).then(r=>r.ok?r.json():{}).catch(()=>({}));
export const lang=pickLanguage(location.search,navigator.languages||[]);
const [dict,original]=await Promise.all([load(lang),load('zh')]);
export const t=(key,params)=>format(dict[key]??original[key]??key,params);
// Static markup: data-i18n sets text and data-i18n-<attr> sets that attribute. The markup's own text stays if a file failed to load.
document.documentElement.lang=lang==='zh'?'zh-CN':lang;
for(const el of document.querySelectorAll('[data-i18n]')){const v=dict[el.dataset.i18n]??original[el.dataset.i18n];if(v)el.textContent=v;}
for(const el of document.querySelectorAll('[data-i18n-aria]')){const v=dict[el.dataset.i18nAria]??original[el.dataset.i18nAria];if(v)el.setAttribute('aria-label',v);}
document.documentElement.classList.remove('i18n-pending');
