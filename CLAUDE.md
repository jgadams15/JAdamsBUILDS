# JADAMS Builds

Personal portfolio site for Jackson Adams, a computer engineering student at Miami University. This file records the decisions made so far. Read it before changing anything.

## How to work on this project

- **Follow Jackson's written instructions first.** The screenshots in `reference/` are a secondary check for when an instruction is unclear. Don't redesign toward them.
- **Never invent content.** Unwritten text is marked `[PLACEHOLDER: ...]`, and unwritten links are `#PLACEHOLDER-...`. Search for `PLACEHOLDER` before calling a page done.
- **Work in the stages Jackson asks for.** He reviews each one before the next: skeleton (done), then content (built, in review). Don't fill in content, move ahead, or deploy until he asks.
- **Source of truth for Foilio is the Foilio repo, not the resume** (see the Foilio section below).

## Tech constraints (fixed, don't change)

- Plain HTML, CSS and vanilla JavaScript. No framework, no npm packages, no build step.
- **Hosting:** Firebase Hosting on the free Spark plan, project `jadams-portfolio`, live at https://jadams-portfolio.web.app (first deployed 2026-11-09). Everything deployed lives in `public/`. `firebase.json` sets `cleanUrls` (pages are served at `/projects/foilio`, with `.html` URLs 301-redirecting), ignores dotfiles, `node_modules` and `firebase.json`, and sets cache headers: images 7 days, CSS/JS 1 day, PDF 1 hour, HTML `no-cache`. File names aren't hashed, so keep those caches short. Canonical and `og:` URLs use the `jadams-portfolio.web.app` domain. Never enable anything that needs billing, and add demo videos as YouTube embeds, not uploads. Publish with `firebase deploy --only hosting` after committing.
- **Shared code:** one stylesheet (`public/css/styles.css`) and one script (`public/js/main.js`).
- **Public repo:** `github.com/jgadams15/JAdamsBUILDS` is public, so everything committed is public. `reference/` contents and the PLC write-up are gitignored.

## Structure

```
public/
  index.html               # sections #hero, #about, #projects, #skills, then footer
  projects/foilio.html     # same template as plc-hmi.html
  projects/plc-hmi.html
  css/styles.css           # design tokens in :root at the top
  js/main.js               # mobile menu, scroll reveal, lightbox
  assets/                  # favicon.svg, headshot, resume, plc/, foilio/
reference/                 # local only: inspo screenshots + PLC write-up PDF
```

## Design system (`styles.css`, `:root`)

| Area | Decision |
|---|---|
| **Color** | Espresso theme (adopted 2026-11-18, replacing black and Miami red). bg espresso `#2a221d`, surface `#352c26`, border `#4a3f37`, text cream `#f0e6da`, muted taupe `#b3a496`, accent and accent-light both amber `#e6b06a`. Jackson chose the four base colors (`#2A221D`, `#F0E6DA`, `#B3A496`, `#E6B06A`); surface and border are derived steps of the espresso |
| **Type** | Inter (Google Fonts), body 400, headings 700–800. Hero name `clamp(3rem, 1.45rem + 6.62vw, 6rem)` (48px at 375, 96px at 1100+) |
| **Spacing** | `--space-1`…`--space-8` (4px to 96px), max width 1100px, section padding `clamp(4rem, 3rem + 5vw, 7rem)` |
| **Shape** | card radius 12px, button radius 8px, pill radius 999px |
| **Motion** | one timing, `--transition: 250ms ease`. The `prefers-reduced-motion` block turns off all animation and transitions |

**Contrast:**
- **Text:** cream is 12.67:1 on bg and 11.07:1 on surface. Taupe is 6.44:1 on bg and 5.63:1 on surface.
- **Accent:** amber is 8.02:1 on bg and 7.00:1 on surface, so it's safe for small text too. `--color-accent-light` is kept as a separate token (same value) so small accent text can be retuned on its own later.

**Components (styled once, reused):**
- **Header:** sticky, with a minimal "JA" monogram (cream, 22px, weight 800; `aria-label="Jackson Adams, home"`) and nav About · Projects · Skills. On project pages the nav points to `../index.html#...`. Below 720px it collapses to a menu button, but only when JS is running.
- **Footer:** © 2026 Jackson Adams, email, GitHub and LinkedIn icons.
- **Buttons and tags:** a dark button with an icon slot (`.btn`), and an outlined tag pill (`.tag`) with an amber border on hover. Keep the pills outlined; the reference's filled tags weren't adopted.
- **Project card:** `.card`. The whole card is a link that lifts with an amber glow on hover.
- **Section heading:** `.section-heading` with an optional subtitle.
- **Dotted grid:** `.dots`, an absolutely positioned decoration made with a radial-gradient. `.dots--pulse` makes a few dots pulse amber slowly.
- **Media:** `.media-placeholder` (a 16:9 dashed box reading "Demo video coming soon"), `.gallery`, and `.table-wrap` + `.table` (scrolls sideways on mobile).
- **Icons:** an inline SVG `<symbol>` sprite at the top of each page, used via `<use href="#icon-...">`. The sprite is inline because external sprites fail over `file://`.
- **Added in the content pass:**
  - **Badge:** `.tag--status`, the "In development" badge, built as an amber-outlined variant of `.tag`.
  - **Text accents:** `.period` (the amber period after the name and section headings), `.highlight` (amber key phrases), `.text-link` and `.inline-links`.
  - **Media:**
    - `.figure` is the large media spot.
    - `.frame-light` is the white card behind the white-background PLC screenshots.
    - `.phone-row` holds the Foilio screenshots.
    - `.gallery--natural` shows images uncropped.
    - `.gallery__item--wide` makes a ladder rung span the full row.
    - `.gallery--phones` lays out the Foilio gallery.
    - `.table--wide` sets a min-width so the PLC table scrolls instead of squishing.
  - **Content blocks:** `.feature-list` (titled points) and `.note` (the disclaimer).
  - **Video:** the demo-video spots are HTML comments on each project page with a ready `<video>` snippet. Nothing visible renders until a file is added.
- **Open Graph:** `assets/og-image.png` (1200×630) was rendered from HTML with headless Chrome and is used by all three pages. It shows the hero ("Hi, I'm", name, subtitle) with "JA" top right, in the espresso theme. It needs regenerating if the name, subtitle or colors change.
- **Favicon:** `assets/favicon.svg`, a "JA" monogram drawn as strokes (no font) in amber on espresso. `theme-color` is `#2a221d` and `og:site_name` is "Jackson Adams".

**JS (`main.js`):**
- **Load order:** the script loads in `<head>` without `defer` and adds `.js` to `<html>` before first paint. The CSS hides `.reveal` content and collapses the menu only under `.js`, so with JS off, or if the file fails to load, everything stays visible.
- **Reveal:** IntersectionObserver adds `.is-visible`, once per element.
- **Lightbox:** applies to `img[data-lightbox]`, which can name a larger file. Click, Enter or Space opens it; Esc or a click closes it; focus returns to the image.

## Site-wide content decisions

- **Contacts:** email `adamsjg3@miamioh.edu`, GitHub `https://github.com/jgadams15`, LinkedIn `https://www.linkedin.com/in/jackson-adams-miami/`.
- **No phone number anywhere** on the site or in deployed files.
- **Resume:** use Jackson's web copy `public/assets/JAdamsResumeNoNumber.pdf` (no phone number). Rename it to `assets/resume.pdf`, which the Resume button already links to.
- **Headshot:** the source is `reference/JacksonAdams2025-1.jpg` (portrait, 1996×2909, 1.1 MB). It was cropped square around the face into `assets/headshot.jpg` (800×800, 70 KB).
- **Hero:** the small amber intro line above the name is "Hi, I'm". The subtitle is "Computer Engineering Student @ Miami University".
- **About:** the first sentence is Jackson's, verbatim: "Computer Engineering Student with a passion for entrepreneurship, app development, and hardware." Jackson approved this continuation, which includes the 4.0 GPA:
  > I'm studying computer engineering at Miami University with a minor in Deep Learning and AI, where I hold a 4.0 GPA and was named to the President's List. I like building things that span software and hardware, from Foilio, an app for pricing and tracking a trading card collection, to a simulated pick-and-place cell I programmed in ladder logic. I'm also an undergraduate teaching assistant for Fundamentals of Programming, helping 30 students learn to debug Python.
- **Skills:** Jackson approved these pills. TypeScript and React Native come from Foilio, not the resume.
  - **Programming Languages:** Python, Java, TypeScript, HTML, CSS
  - **Hardware & Automation:** PLC programming (ladder logic), CODESYS, HMI design, FPGA design, Arduino
  - **Frameworks:** Expo, Expo Router, React Native, PyTorch, Hugging Face Transformers
  - **Tools:** Git/GitHub, MATLAB, Excel, Claude Code
- **"Demo video coming soon":** show it only where no real media exists. With the decisions below, neither project page currently needs it.

## PLC project page (`projects/plc-hmi.html`)

**Source:** `reference/rpGatta PLC & HMI Project.pdf`. It is reference material only: never put it in `public/`, never link it, and never offer it as a download. Turn it into normal web content, keeping Jackson's first-person wording apart from the fixes listed here.

- **Title:** "Simulated Pick-and-Place Cell", with "PLC & HMI" in the subtitle. Keep "simulated" prominent.
- **Facts:** built Oct 15–31, 2026 with CODESYS V3.5 SP22 (ladder logic and CODESYS Visualization). He taught himself CODESYS and ladder logic in about two weeks.
- **Buttons:** none. There's no GitHub repo and no PDF download.
- **Large media spot:** `assets/plc/hmi-fault.png`, captioned verbatim: "Fault state: the Fault light and banner latch on and the machine stops. (The status bar's RUNNING text stays greyed out; I'll fix that in a later revision.)"
- **Gallery:** the other five images, shown uncropped, with no placeholder tile. The ladder rungs are very wide (about 7–10:1), so a 16:9 crop would cut them off. Jackson approved rewriting the PDF captions to be more detailed. Use these final captions, each checked against its image:

  | File to create | PDF source | Caption |
  |---|---|---|
  | `hmi-running.png` | p3, 2048×1247 | Operator HMI mid-cycle: step 10 (Feed) is active, the conveyor output is on, and 12 good parts have been counted. The simulator buttons along the bottom stand in for real sensors. |
  | `rung-seal-in.png` | p4, 1846×276 | Rung 1, the seal-in run circuit: the xRunning contact in parallel with Start keeps the machine running after Start is released, until Stop is pressed, the E-stop OK signal drops, or a fault latches. |
  | `rung-transition.png` | p4, 1852×226 | Transition rung from step 10 to step 20: once step 10 is active and the part-present sensor turns on, the rung resets step 10 and sets step 20. |
  | `rung-fault-timer.png` | p5, 1864×190 | Fault timer rung for step 40: a 2-second TON timer runs while the step is active, and if the step hasn't finished in time it latches the clamp-retract fault. |
  | `state-diagram.jpg` | p5, 1197×1022, hand-drawn photo | Hand-drawn state diagram: the cycle runs 10 → 20 → 30 → 40 and back to 10. A timeout in steps 20, 30 or 40 moves the machine to Faulted, and Reset, Stop or E-stop returns it to Stopped. |

  The fault screen (`hmi-fault.png`) is p4, 2048×1267. The images extract at full resolution with `pypdf`. Pillow isn't installed, so write the raw JPEG streams directly and wrap the Flate pixel data in a minimal PNG writer.
- **Overview:** from PDF p2.
- **How It Works:** state-machine text from PDF p2, plus this table. It must scroll sideways inside its container on mobile rather than squish.

  | Step | What the machine does | Outputs on | Moves when | Timeout fault |
  |---|---|---|---|---|
  | 10 Feed | Conveyor brings part to stop | Conveyor | Sensor sees part | none |
  | 20 Clamp | Clamp cylinder closes on part | Clamp | Clamp sensor confirms closed | 2 s |
  | 30 Pick | Robot arm picks up part | Clamp, Robot Go | Robot reports done | 10 s |
  | 40 Release | Clamp opens, robot moves part | none | Clamp open AND Robot off AND Part gone | 2 s |

  Step 40's "Moves when" follows Jackson's later correction, which replaced "Clamp opens" in his first table.
- **Design Decisions:** the four items from PDF p3, with two approved fixes.
  - **Seal-in run circuit:** use "...so the machine keeps running after the start button is released, until stop, a fault, or E-stop breaks the circuit." The PDF wrongly said "as long as the start button is pressed."
  - **Moore Machine:** add "All outputs depend only on the current step."
  - **Full robot handshake** and **latched faults with a timeout per step:** as written in the PDF.
- **What I Learned** (the PDF has none; these are Jackson's points to write up):
  - how a state machine makes sequencing and debugging easier
  - why every step needs feedback plus a timeout
  - designing an HMI for an operator rather than for himself
  - picking up a new IDE and language fast

## Foilio project page (`projects/foilio.html`)

- **Source of truth:** the Foilio repo (local `C:\claudeProjects\foilio`, public `https://github.com/jgadams15/Foilio`), especially its README and `docs/roadmap.md`.
- **Where the resume overstates:**
  - It says recognition is on-device with no server calls. The repo shows a Python DINOv2 prototype, and the plan is to run it on a free Hugging Face Space.
  - It says eBay/TCGplayer data is integrated, but graded eBay prices are planned.
  - It says "160 sets / 20,000+ cards"; the README says about 22k cards.
- **AI recognition:** say clearly that the Hugging Face Space and AI image recognition don't fully work yet. As of 2026-11-09, the Space deploy code (scanner phase 4) is uncommitted in the local repo, and the last commit is phase 3 (auto-crop and accuracy testing).
- **Tech stack** (Jackson's description):
  - Expo with Expo Router in TypeScript, one codebase for iOS, Android and web, run on iPhone through Expo Go
  - a `packages/shared` folder with TypeScript types and the API client, including the `CardDataProvider` adapter
  - the TCGdex API (free, no key)
  - Scanner AI: DINOv2 embeddings plus a nearest-neighbor index built from TCGdex images, in Python in `ml/`, called on a free Hugging Face Space
  - **Exceptions:** Supabase (Postgres, edge functions, a daily price-snapshot job) is planned, since the repo says "Not yet initialized". Describe it as planned, not built. Colab fine-tuning appears nowhere in the repo, so omit it unless Jackson confirms or adds it.
- **Buttons:** only "View on GitHub", linking to the repo. There's no live demo, so show an "In development" badge, both on the page and on the home page card. The badge component doesn't exist yet; build it as a variant of the tag pill.
- **Large media spot:** all four screenshots in a row, with no video placeholder. Copy them from the Foilio repo's `docs/screenshots/` (`portfolio.png`, `search.png`, `card-detail.png`, `scanner.png`, each 390×670 portrait) into `public/assets/foilio/`. They're small, so the lightbox won't enlarge them much.
- **Gallery:** real images only. For now it repeats the four screenshots (Jackson approved), with lightbox enabled. Add more as they're made.
- **Disclaimer:** include the README's Pokémon disclaimer, since the screenshots show card art: unofficial fan project, not affiliated with Nintendo, The Pokémon Company, Creatures or Game Freak, and card data and images come from TCGdex.

## Still open

As of 2026-11-09 the content pass is built and awaiting Jackson's review.
- **Foilio placeholders:** two remain on purpose, "What I Learned" and "Roadmap". Jackson asked for the roadmap to be left for him to write.
- **Headshot source:** the original photo was moved out of `public/` into `reference/` (local only), so the 1.1 MB file isn't deployed.

Ask Jackson about anything new instead of guessing.

## Verification checklist (run after changes)

Run the checks in headless Chrome over the DevTools protocol (Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`, Node 24 has a built-in WebSocket), so Jackson's own browser isn't touched.
- **Widths:** 320, 375 (mobile emulation) and 1280, with no sideways page scroll.
- **Content:** every `.reveal` becomes visible, images load, and there are no console or network errors.
- **Menu:** opens and closes via the button, a link click and Esc.
- **Reveal:** shows on scroll and stays visible.
- **Lightbox:** opens on click with focus, and closes on Esc and on click with focus returned.
- **Reduced motion:** turns all effects off.
- **JS disabled:** all content and the nav visible, with no menu button.
- **Contrast:** check new color pairs.
- **Links:** local links and anchors resolve.
- **Visual check:** take full-page screenshots and look at them.
