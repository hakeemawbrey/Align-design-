# Align PS2 reels: the look

Picked from three art-direction tests (`art/tests/`). **Direction C,
"real-time in-engine PS2"**, won. It reads instantly as a 2003 console
cutscene, and the faces are characterful and funny when played straight.
Direction A (cold noir) looked good but risks reading muddy on a phone.
Direction B (glossy FMV) never ran because of the image limit.

Frames are made with **gemini-3.1-flash-image** through Figma's image generation
(file "Align PS2 reels – pilot frames", 1080×1920 requested, comes back
768×1376). The ElevenLabs free plan hit its daily image limit. Frames live in
`art/<episode>/` and are cut together by `film.mjs` (`films/<id>.json`):
slow push-ins, crossfades, captions, end card and score.

```bash
node reels/ps2/film.mjs a01      # → reels/out/ps2/film/a01-he-didnt-align.mp4
```

## Style paragraph (paste into every prompt)

> Style: rendered in real time in a 2003 console game engine, a cutscene
> frame, not a photograph, not modern CGI, not a cartoon. Low-polygon models
> with visible faceted silhouettes: angular jawlines, blocky faceted
> shoulders, fingers as simple tapered boxes; blurry low-resolution textures
> with photo-sourced faces stretched over simple head meshes; hair as a solid
> textured shell with hard polygon edges; flat ambient lighting with soft
> shadows baked into the textures; jagged aliased edges, slight colour
> banding and ordered dithering, soft bloom, 480i resolution feel. Full-bleed
> frame, no TV bezel or border. Deadpan, dramatic, slightly absurd mood. No
> on-screen text, no logos, no UI overlays.

## The cast (use the same words every time)

- **THE DETECTIVE:** a heavyset man in his late 50s with a broad square face, deep-set tired eyes with heavy bags, a thick grey walrus moustache, short receding salt-and-pepper hair, wearing a navy blue police uniform shirt with dark epaulettes, a silver badge on the chest and a black tie.
- **HER:** a slim woman in her late 20s with light-brown skin, a sharp chin-length black bob with straight blunt bangs, almond-shaped hazel eyes with winged eyeliner, a small gold hoop in each ear, wearing a fitted dark-burgundy leather jacket over a white tank top.
- **HIM:** a lean, athletic man in his late 20s with warm olive skin, short dark-brown hair styled in a slightly messy quiff, thick dark eyebrows, light stubble along a strong angular jaw, brown eyes, wearing a plain black crew-neck t-shirt and a thin silver chain. *(Not generated yet.)*
- **THE CORONER:** a thin, tall man in his 60s, completely bald with a pale head, a long narrow face, small round wire-rimmed glasses, a neat white goatee, wearing a rumpled charcoal-grey suit, white shirt and a thin dark-grey tie. *(Not generated yet.)*

All characters are original. Never name real games or real people in a prompt.

## Settings that matter

- Set the image node's **aspect ratio to 9:16**. The prompt alone doesn't
  change it, and the default is 16:9.
- Once a character exists, generate new shots of them by passing their best
  frame as a reference (connect_from), so they stay the same person.
- For the eye-close beat, make the eyes-open frame first, then edit it to
  close the eyes. `film.mjs` crossfades between them (a beat's `layers`).

## Pilot shot list (a01, "He didn't align")

| # | Frame | Caption |
| --- | --- | --- |
| 1 | Gurney in the precinct, his hand slipping out from under the sheet holding a phone (dating app); detective and coroner behind, looking down | DETECTIVE, WHAT KILLED HIM? |
| 2 | Close on the hand and phone: a match, 0 messages | |
| 3 | Detective close-up, eyes open → eyes closed (have it: `tests/c-detective-eyes-closed.png`) | HE DIDN'T ALIGN. |
| 4 | Detective and coroner, deadpan two-shot | ANOTHER VICTIM. |
| 5 | Black and white: Him and Her walking out of the precinct together, cool | |
| 6 | Align end card (drawn in code) | it has to be mutual. |
