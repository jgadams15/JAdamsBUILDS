# JADAMS Builds

The personal portfolio site of Jackson Adams, with a home page covering his background, projects, and skills, plus a detail page for each project. It is built with plain HTML, CSS, and vanilla JavaScript, with no framework, packages, or build step. Everything deployed lives in `public/`, which is set up to be hosted on Firebase Hosting later. Anything still marked `[PLACEHOLDER: ...]` or `#PLACEHOLDER-...` has not been written yet.

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
├── .gitignore
├── LICENSE
└── README.md
```
