# WHITEOUT · 霁线

An original 3D arcade skiing game with 50 deterministic levels across four mountain areas: the first 20 unlock in order, and clearing level 20 opens the other 30 to play in any order. Built with locally vendored Three.js 0.186.1; the upstream MIT license is included in vendor/THREE-LICENSE.txt. No runtime CDN required for rendering. Google Fonts are optional with local fallback fonts.

`npm run dev` → http://127.0.0.1:5192/ (PORT optional).
`npm test` runs simulation tests. `npm run build` creates deployable static dist/.

Controls: arrows or WASD to steer, brake and tuck; Space to jump; hold F in the air to spin, G to backflip. Touch buttons support simultaneous steering/jump/trick presses and only appear on devices with a touch screen. Escape pauses/resumes. Switching away automatically pauses.

Blue gates award 150 base points, close passes 100, landed spins 350 per full rotation; these build a multiplier up to ×5. Orange crystals award 50. Missed gates, unstable spins and collisions break the combo. Three collisions end a run; collisions grant two seconds of protection. Successful finishes grant a health/time bonus. Best scores are stored separately per level in this browser, including unfinished-run scores.

## 50 levels

Each level is a sequence of terrain sections (`engine.js` `SPECS`): cruise, slalom and giant slalom, forest glades with one winding clear lane, mogul fields, kicker lines, big air, mega jumps, giant long slopes, rollers, narrow chutes, flats with boost pads, log obstacles, steeps and cliff drops.

Speed is physical: gravity along the section pitch against snow friction and air drag (`terminalSpeed`). Flats settle around 40 km/h and giant slopes pass 140 km/h. Tucking (↑, or the touch button) cuts drag and adds a push, so it is felt at every speed; speed lines, a wider view and a lower stance show it. Each difficulty star steepens the whole level and raises its speed cap, from about 122 km/h at one star to about 245 at five and about 273 in the last level. The first 20 levels climb in waves, with easier levels as breathers between spikes, and hard levels add boost pads on big slopes and in a longer final sprint. Ramps are real curved surfaces with the same shape in physics and rendering, so approach speed decides the flight: kickers give about 3 m, big air about 10 m, mega jumps 30 m+ and over 3 s of air. Pressing Space at the lip adds a pop. Hold F to spin and G to backflip; spin plus flip lands as a ×1.5 combo. Coins weave in S-curves with gates on the outside of each turn, and coin arcs trace each ramp's flight path. Ramp sides block you instead of costing a heart.

Runs bend: each section turns left or right (long ones become S-curves, jump sections stay nearly straight). Physics stays in trail coordinates; the renderer bends everything onto a world-space centreline (`toWorld`). In a bend you are pushed to the outside and must lean in, and the outside edge is banked.

Big bowls (levels 3 and 12) widen the lane to 84 m between 15 m walls that rise steepest at the rim. Slope pulls you back to the bottom, so you can swing wall to wall, and reaching the rim at speed launches a wall air (bonus on a clean landing).

Each level has a 1–5 star difficulty (`HARD` in `engine.js`). Two stars is the baseline layout. Each extra star adds about 35% more trees and rocks and more rocks in the mix, and makes gates 5% narrower. It also tightens forest rows and lanes, packs moguls closer, adds more full-width logs and narrows chutes to 14 m. Five-star levels give you only 2 hearts.

Runs end on a clear downhill sprint: you cross the line at full speed, slide to a stop on the flat beyond it, and get a close-up before the results (tap or press a key to skip). A minimap at the top right shows the run's real shape, your position, the big ramps and the finish. The level select previews every level's shape, coloured by terrain type to match its chips.

The locker holds gear and outfits, unlocked by mountain total. Every gear item trades something away (for example racer skis are faster but turn more slowly), so none is simply better than the starter skis. Outfits are looks only.

Twelve worlds (`THEMES` in `engine.js`, built by `scenery.js`) set each level's sky, horizon, trees, props and weather: a Swiss ski village with a working lift, a candy fairytale, a towering lake with reflections, jagged spires, an elf meadow with deer running beside the run, cherry blossom with torii and pagodas, northern lights, a sunset valley, an ice palace, a balloon festival, a rime forest and a volcano. Scenery never affects physics. Place names set a mood only; the runs are not recreations of real pistes.

Moguls pop you into the air above 83 km/h; hold ↓ to absorb them (every six in a row is a rhythm bonus). Progress is stored in `whiteout-progress-v3` and best scores in `whiteout-best-v2-l01`…`l50`. Players with v2 progress keep the same number of unlocks on the new path; old best scores do not carry over because the runs changed.

`tests/bot.js` holds a look-ahead line picker that must finish the whole 20-level path, and `clearLine`, which proves that every one of the 50 levels has an unbroken line clear of trees and rocks at braking speed. The simple bot does not finish four of the five-star free levels (40, 42, 46, 47). Other tests cover ground continuity, clear glade lanes, the speed model, mega vs kicker flight, ramp side blocking, backflip combos, mogul pop/absorb, cliff airtime, logs and chute width.

The fixed 120 Hz simulation is separate from rendering. Terrain, trees, skier, mountains, flags and ramps are procedural geometry; trees are instanced. Snow spray, ski tracks, chase camera, speed FOV and optional synthesized effects provide feedback. Reduced-motion preference disables speed FOV changes. WebGL 2 is required; startup shows a fallback error when unavailable.

Validation: simulation tests (see above plus gates, collision protection, ramp/spin landing, braking/bounds/finish and failure settlement), language-file tests and leaderboard client tests against a fake server. Headless Chrome screenshots checked the level select (desktop and phone width), moguls, glade, logs, chute, cliff and big air. Desktop Chrome rendered the 3D menu and gameplay successfully. Touch controls were playtested by the author on a phone in portrait, including the long-press fix in 1.1.1.

## AIWANNA

Live at https://www.aiwanna.games/games/dfd0c8790b37cccbc089d967729cb6fc-834902d8. Published as a static site from `dist/`: run `npm run build`, then point the publisher at `whiteout/dist`, because it rejects the project root on sight of the local-only `server.mjs`. Listing media lives in `1gp-kit/`.

**Leaderboard:** one active board, `mountain-total-v2` ("全山总分（50 关）", desc, points, 1–10,000,000, no minimum play time). The old 20-level board, `mountain-total-v1`, keeps its scores but receives no new ones. Score = the sum of your best score on each of the 50 runs, and crashed runs count towards a run's best. `leaderboard.js` registers a platform run when a run starts and submits the total when it ends. Quitting to the menu mid-run settles nothing. Opened outside AIWANNA, the game never contacts the platform and scores stay on the device. Scores are client-reported casual competition, not cheat-resistant.

**Languages:** 简体中文 (original), English, 日本語, 한국어, Español. Every player-visible string is in `i18n/<lang>.json` with identical keys; `engine.js` emits keys and parameters only. `i18n.js` picks `?lang=` first (the AIWANNA player always passes it), then the browser language, then English.
