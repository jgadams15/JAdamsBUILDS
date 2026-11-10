# JADAMS Builds

The personal portfolio site of Jackson Adams, with a home page covering my background, projects, and skills, plus a detail page for each project. It is built with plain HTML, CSS, and vanilla JavaScript, with no framework, packages, or build step. Everything deployed lives in `public/`, which is hosted on Firebase Hosting at https://jadams-portfolio.web.app. Anything still marked `[PLACEHOLDER: ...]` or `#PLACEHOLDER-...` has not been written yet.

## Folder structure

```
JAdamsBUILDS/
├── public/
│   ├── index.html            # home page: hero, about, projects, skills
│   ├── projects/
│   │   ├── foilio.html
│   │   └── plc-hmi.html
│   ├── css/
│   │   └── styles.css        # one stylesheet for the whole site
│   ├── js/
│   │   └── main.js           # nav, scroll fade-ins, lightbox
│   └── assets/
│       ├── headshot.jpg
│       ├── resume.pdf
│       ├── favicon.svg
│       ├── plc/
│       └── foilio/
├── reference/                # inspo screenshots and write-up, never deployed
├── firebase.json             # hosting config: clean URLs, cache headers
├── .firebaserc               # default Firebase project (jadams-portfolio)
├── .gitignore
├── LICENSE
└── README.md
```
