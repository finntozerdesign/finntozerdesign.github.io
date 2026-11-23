# How to update finntozerdesign

All the words, projects, images and journal posts live in **one file: `content.js`**.
You never need to touch the other code files to add or change content.

---

## 0. Tools (one-off, 5 minutes)

1. Install **Visual Studio Code** (free): https://code.visualstudio.com
   It colours the code and warns you about typos.
2. In VS Code: **File → Open Folder…** and choose the `finntozerdesign` folder.
3. To preview, open the folder in Finder/File Explorer and **double-click `index.html`**.
   It opens in your browser. After each change, save (Ctrl/Cmd + S) and refresh the browser.

> The "Copy email" button may not work in this local preview. It works once the site is online.

---

## 1. Change any text

1. Open `content.js`.
2. Find the text (Ctrl/Cmd + F) and edit what is **between the quote marks**.
3. Save, then refresh the browser.

Anything still reading `[PLACEHOLDER: …]` shows on the site with a **dashed orange outline**,
so you can see at a glance what is left to write.

Small formatting you can use inside any text:

| You type | You get |
|---|---|
| `*word*` | emphasis (orange in the big intro line) |
| `[link text](https://example.com)` | a link |

---

## 2. Add a journal post (e.g. your critical review)

1. Open `content.js` and scroll to **`posts: [`** (near the bottom).
2. Copy this block and paste it **straight after `posts: [`**, so the newest post comes first:

```js
    {
      id: "my-new-post",              // web address: post.html?id=my-new-post (lowercase, hyphens, no spaces)
      title: "Title of the post",
      date: "2026-11-25",             // YYYY-MM-DD
      summary: "One sentence for the journal list.",
      body: [
        "First paragraph.",
        "Second paragraph.",
        { type: "heading", text: "A subheading" },
        { type: "image", src: "photo.webp", alt: "What the photo shows", caption: "Optional caption" },
        "Another paragraph.",
      ],
    },
```

3. Save and refresh. The post appears in the Journal section, and **the word count is shown automatically**
   on the list and on the post. Use it to check your review is 250 words.

**For the critical review:** a placeholder post with the id `critical-review` already exists. Just
replace its title, date, summary and paragraphs.

**To make the PDF for Canvas:** open the post in Chrome → **File → Print → Save as PDF**.
The navigation is hidden in print, and the page's web address is printed under the header.

---

## 3. Add a project

1. Prepare images (see section 4) and put them in the main site folder, next to `index.html`.
   Start each file name with the project, e.g. `myproject-render.webp`, so they stay easy to find.
2. In `content.js`, find **`projects: [`**. Copy a whole existing project, from its opening `{` to its
   closing `},`, and paste it where you want it. **The order in the file is the order on the record wheel.**
3. Change the `id` (lowercase, hyphens), the text, and the image paths.
4. Building blocks for the project page (`body: [ … ]`):

```js
{ type: "text",    heading: "Heading", paragraphs: ["Paragraph one.", "Paragraph two."] },
{ type: "list",    heading: "Heading", items: ["Point one", "Point two"] },   // no heading? leave it out
{ type: "quote",   text: "Quote text", cite: "Who said it (year)" },
{ type: "image",   src: "photo.webp", alt: "Description", caption: "Caption" },   // add  narrow: true  for tall images
{ type: "pair",    images: [ { src: "…", alt: "…", caption: "…" }, { src: "…", alt: "…", caption: "…" } ] },
{ type: "gallery", caption: "Caption", images: [ { src: "…", alt: "…" }, { src: "…", alt: "…" }, { src: "…", alt: "…" } ] },
{ type: "poem",    title: "Title", stanzas: [ ["line", "line"], ["line"] ] },
{ type: "turntable", label: "Turn the vase", caption: "Caption", images: [ { src: "…", alt: "…" }, … ] },
```

**Turntable tips:** photograph the object on a plain background from the same height and distance,
turning it the same amount each time (4–8 shots all the way round). Put the photos in turning order
and keep them the same size (e.g. 900 × 1150 px), so the object doesn't jump between frames.

- `status: "in-progress"` adds the orange **In progress** tag. Change it to `"complete"` when finished.
- If a cover is cropped badly on the wheel (sleeves are square), add `position: "70% 50%"` to the cover
  (horizontal %, vertical %): it chooses which part of the image stays in view.

---

## 4. Preparing images (keeps the site fast)

1. Export or crop your image. **About 1600 px wide** is plenty (1000 px for portrait photos).
2. Go to **https://squoosh.app** (free, works in the browser), drop the image in,
   choose **WebP** on the right, quality about **75**, and download it.
   Aim for **under 300 KB** per image.
3. Name it in lowercase with hyphens, e.g. `vase-detail.webp`, and put it in the main site folder.
   Every file name must be different — two files can't share a name.
4. Always write **alt text**: one sentence describing what's in the picture for someone who can't see it.

> iPhone photos are HEIC. Squoosh converts them, or set the iPhone to
> Settings → Camera → Formats → **Most Compatible** for future photos.

---

## 5. Publishing changes

Once the site is on GitHub Pages (we'll set this up together), updating it is:

1. Go to your repository on github.com.
2. Open the file (e.g. `content.js`) → click the **pencil** icon → paste in your edited version → **Commit changes**.
   For new images: on the repository's main page → **Add file → Upload files**.
3. Wait 1–2 minutes and refresh the live site (Ctrl/Cmd + Shift + R to skip the cache).

---

## 6. Fixing mistakes

If the page shows **"Content couldn't load"**, there is a typo in `content.js`. It is almost always one of these:

- a missing **comma** at the end of a line or after a `}` (each item in a list ends in `,`)
- a missing **closing quote** `"`
- a straight double quote `"` inside your text. Use curly quotes ’ “ ” instead, or type `\"`.
- a missing **bracket** `}` or `]`

How to find it:

1. Undo your last change (Ctrl/Cmd + Z), save, and refresh. If it works again, redo the change more carefully.
2. Or, in Chrome, press **F12 → Console**. The red error names the line number in `content.js`.
3. VS Code underlines the problem in red.

---

## File map

Everything sits in **one folder** — there are no sub-folders. That keeps uploading to GitHub simple:
drag the files onto the upload page and they all land in the right place.

```
index.html        Home page (intro, work, about, journal, contact)
project.html      Template for every project page
post.html         Template for every journal post
404.html          "Page not found"
content.js        ← ALL YOUR CONTENT. Edit this.
main.js           Builds the pages from content.js (no need to edit)
styles.css        The look. Colours and fonts are in section 2, "Design tokens".
*.webp / *.png    Images (logo.svg and favicon.svg too)
*.woff            Fonts: Inter, Inter Display, Anonymous Pro (free licences in the LICENSE files)
*.mp4             Video
```
