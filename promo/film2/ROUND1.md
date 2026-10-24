# Film 2 — round 1 fixes (lead decisions)

GLOBAL
- ONE SKY SPINE for f2–f8: the S1 grainy nebula already used in f2–f4. f3-chart.js exports getSky / drawSky / skyCam / drawGrain
  (f2 exports buildNebula). f5, f6, f7, f8 must use this SAME nebula plate + star layers + grain (dim the nebula to ~35% under
  a vignette where cards need contrast, never swap to a different flat gradient). Camera should keep drifting continuously across
  scene boundaries (no ease-to-zero dead holds at handoffs).
- GRAIN: same clumped silver grain at ~0.5 opacity in every scene f2–f8 (share the implementation; no 0.2 scenes).
- AURORA (f7) becomes an overlay layer ON the nebula, fading in over 0.6s and out over 0.5s — not a whole-plate swap.
- RETIMING: f7 window becomes 24.0–26.8 (hand off to f8 at 26.6, crossfade 0.4s). f8 starts 26.6.
- The face we swipe past is the face we meet: f1's last (slammed) face becomes juniper.jpg, cold/desaturated, label "Juniper, 27".

Director (CD) + QA findings to address are listed per scene in each agent's prompt.
