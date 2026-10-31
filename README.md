# WHITEOUT · 霁线

An original 3D arcade skiing game with 20 deterministic levels across four mountain areas. Built with locally vendored Three.js 0.186.1; the upstream MIT license is included in vendor/THREE-LICENSE.txt. No runtime CDN required for rendering. Google Fonts are optional with local fallback fonts.

`npm run dev` → http://127.0.0.1:5192/ (PORT optional).
`npm test` runs simulation tests. `npm run build` creates deployable static dist/.

Controls: arrows or WASD to steer, brake and tuck; Space to jump; hold F in the air to spin, G to backflip. Touch buttons support simultaneous steering/jump/trick presses. Escape pauses/resumes. Switching away automatically pauses.

Blue gates award 150 base points, close passes 100, landed spins 350 per full rotation; these build a multiplier up to ×5. Orange crystals award 50. Missed gates, unstable spins and collisions break the combo. Three collisions end a run; collisions grant two seconds of protection. Successful finishes grant a health/time bonus. Best scores are stored separately per level in this browser, including unfinished-run scores. There is no online leaderboard.

## 20 levels

Each level is a sequence of terrain sections (`engine.js` `SPECS`): cruise, slalom and giant slalom, forest glades with one winding clear lane, mogul fields, kicker lines, big air, mega jumps, giant long slopes, rollers, narrow chutes, flats with boost pads, log obstacles, steeps and cliff drops.

Speed is physical: gravity along the section pitch against snow friction and air drag (`terminalSpeed`). Flats settle around 40 km/h, giant slopes pass 140 km/h, and tucking (↑) cuts drag. Ramps are real curved surfaces with the same shape in physics and rendering, so approach speed decides the flight: kickers give about 3 m, big air about 10 m, mega jumps 30 m+ and over 3 s of air. Pressing Space at the lip adds a pop. Hold F to spin and G to backflip; spin plus flip lands as a ×1.5 combo. Coins weave in S-curves with gates on the outside of each turn, and coin arcs trace each ramp's flight path. Ramp sides block you instead of costing a heart.

Moguls pop you into the air above 83 km/h; hold ↓ to absorb them (every six in a row is a rhythm bonus). Level n unlocks after finishing level n−1. Progress is stored in `whiteout-progress-v2`, and best scores per level in `whiteout-best-l01`…`l20`.

`tests/bot.js` is a look-ahead line picker; the tests use it to prove every level can be finished. Other tests cover ground continuity, clear glade lanes, the speed model, mega vs kicker flight, ramp side blocking, backflip combos, mogul pop/absorb, cliff airtime, logs and chute width.

The fixed 120 Hz simulation is separate from rendering. Terrain, trees, skier, mountains, flags and ramps are procedural geometry; trees are instanced. Snow spray, ski tracks, chase camera, speed FOV and optional synthesized effects provide feedback. Reduced-motion preference disables speed FOV changes. WebGL 2 is required; startup shows a fallback error when unavailable.

Validation: 18 simulation tests (see above plus gates, collision protection, ramp/spin landing, braking/bounds/finish and failure settlement). Headless Chrome screenshots checked the level select (desktop and phone width), moguls, glade, logs, chute, cliff and big air. Desktop Chrome rendered the 3D menu and gameplay successfully. Mobile controls are implemented but have not had a physical-device playtest.

Not yet published to AIWANNA.
