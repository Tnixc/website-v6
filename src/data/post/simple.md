I have an unhealthy addiction to redoing my personal website every few months (I have an article the history of this site [here](https://tnixc.space/content/site_history.html)). As of v6, I've already tried Vue(and Nuxt), Svelte(kit), as well as Astro, and I was getting pretty tired of those.

So obviously, I decided to write my own component-based html assembler in rust, and I'm calling it **simple** because it is. It was quite daunting at first, but now that it's somewhat functional it seemed pretty easy, although some compromises were made. It's pretty damn slow right now, hopefully I can fix that.

# Features

- Components, with props and slots.
- Templating engine
- `<markdown>` component for rendering markdown.

# Todo

This is a project that I do want to keep working on, and I want to make it proper. Here's some goals for this project that I still want to implement:

- [ ] Fix bugs (extremely buggy right now).
- [ ] Include formatting and minify-ing support.
- [ ] Fix problem where there are 2 sources of truth for md in the current way I do blog posts, will hopefully be fixed with proper md rendering.
- [ ] Actually good logs with color, status, etc.
- [ ] Keep some elements loaded to avoid reading from disk every time.
- [ ] Switch to using a .config file
- [ ] Proper escaping from `{}, ""`, etc.
- [x] Check for circular deps.
- [ ] Implement MD rendering (external lib) from .md files. Not needed tho maybe?
- [ ] Look into testing (tons of edge cases)
- [ ] OG Image and meta generation, especially for markdown posts
- [ ] Give warnings for unused and not found components
- [ ] CSS scoping in components but waiting for [@scope general support](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) , so just use tailwind for now
- [ ] Type safety-ish warnings when template doesn't match data
- [ ] Cache what has changed with hashing so no need to rebuild if stuff is same. -> can massively speed it up if lots of templating.
- [ ] Improve flexibility w/ markdown syntax highlighting
- [ ] Watcher or HMR (HMR is too complex so probably not) -> livejs is not ideal and is quite broken rn.
- [x] `<markdown>` component
- [x] Commands such as `dev`, `build`, `new`.
- [x] Props and slots
- [x] The error handling is abysmal. Mainly due to me using unwrap(), Result type and ? everywhere. - more work to be done but it's in an ok state for now
- [x] Make it so it ignores commented out lines.
- [x] Speed tests.
- [x] Get templates working
- [x] Get components working
- [x] Copy files from /public to /dist

In reality, it's just a lot of regexing and string manipulation. I've got the easy parts down, now it's up to me to keep going and implement the harder stuff. I've only spent around ~10 hours seriously working on this, and it's around 600 lines of rust at the moment.

---

# Syntax

The file tree should look something like this:

```rust
example
└── src
    ├── components
    │  ├── Component.html
    │  └── Folder
    │     └── Component.html
    ├── data
    │  └── Something.json
    ├── pages
    │  ├── folder
    │  │  └── page.html
    │  └── index.html
    ├── public
    │  ├── image.png
    │  ├── folder
    │  │  └── image2.png
    └── templates
        └── Something.html
```

### Components

Components, and folders in /components must be in `PascalCase`. The first letter must be capitalized.

To use a component:

```html
<Component />
```

It searches from /components, so if a component is in a subfolder do this:

```html
<Folder:Component />
```

so don't use `:` in your component or folder names.

### Templates

The templates are stored in /templates, and the data for the corresponding template is in /data.

A data file should have the same name as the template file. Keep in mind the template file is the one that's being repeated.

To use:

```html
<-{Template} />
```

And in templates/Template.html and data/Template.json,

```html
<p>${something}</p>
```

Will match

```json
[{ "something": "a" }, { "something": "b" }]
```

You can use components in templates and vice versa. It recursively resolves each one so if a lot of places use a component it could become inefficient because it reads from disk every time. It also doesn't halt on circular dependencies (yet!).

It also works with tailwind:

```sh
bunx tailwindcss -i ./src/public/input.css -o ./src/public/output.css --watch
```

---

I tried to build it with minimal dependencies.

1. `comrak` → markdown parser.
2. `fancy-regex` → Regex for negative lookbehind/lookahead for comments.
3. `notify` → File watcher to rebuild during `simple dev`.
4. `rouille` → Web server to serve `dist` during `simple dev`.
5. `serde_json` → JSON deserialization for data.json parsing.

After all, it's too simple to warrant a large number of dependencies.

---

Of course there's no reactivity, though I would like to build my own framework with reactivity someday. That's why I called this an "assembler" and not a "framework". Not much logic here. It also feels surprisingly fast in dev when I save and see the changes, but I haven't tested it with a lot of components yet. And actually, SPAs feel faster than sites like these, and if you want something actually good for templating, you should use tera and extend it.

> You can view the source code [here](https://github.com/Tnixc/simple)(it's really bad).
> This article is super outdated now, check out the readme on the github for updates!
