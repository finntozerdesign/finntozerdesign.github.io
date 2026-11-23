/* =====================================================================
   finntozerdesign — CONTENT FILE
   ---------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE WORDS, PROJECTS,
   IMAGES OR JOURNAL POSTS. See HOW-TO-UPDATE.md for step-by-step help.

   Rules that keep it working:
   • Text goes inside "double quotes". If your text contains a double
     quote, use ’ curly quotes or write \" instead.
   • Every item in a list ends with a comma , (a trailing comma is fine).
   • Anything that still says [PLACEHOLDER: ...] shows on the site with
     a dashed orange outline, so you can spot what is left to write.
   • Leave a field as "" (empty) to hide it.
   ===================================================================== */

window.SITE = {

  /* ---------------------------------------------------------------
     1. SITE-WIDE DETAILS
     --------------------------------------------------------------- */
  site: {
    name: "finntozerdesign",
    owner: "Finn Tozer",
    // One line used by search engines and link previews
    description: "Finn Tozer — product designer. Designing for the relationship a person forms with an object.",
  },

  /* ---------------------------------------------------------------
     2. INTRO (top of the homepage)
     --------------------------------------------------------------- */
  intro: {
    name: "Finn Tozer",
    role: "Product designer",
    detail: "Final-year Product Design student at the University of Sussex.",
    qualities: ["Observant", "Experimental", "Playful"],
  },

  /* ---------------------------------------------------------------
     2b. CLOSING THOUGHT (the big statement just before Contact)
     --------------------------------------------------------------- */
  closing: {
    label: "A closing thought",
    // Wrap a word in *stars* to make it orange
    statement: "The world does not have a waste problem; it has a *design* problem.",
    detail: "",
  },

  /* ---------------------------------------------------------------
     3. ABOUT
     --------------------------------------------------------------- */
  about: {
    portrait: {
      src: "finn.webp",
      alt: "Portrait of Finn Tozer",
    },
    // Intro paragraphs (big text)
    paragraphs: [
      "I’m Finn, a final-year Product Design student at the University of Sussex. My work is drawn to the moment a person and an object meet — and the relationship they build through use, habit and attachment.",
      "Design plays an integral role in the world today. With the climate crisis and mass overconsumption, designers need to keep these relationships at the forefront, and help people appreciate the things they already own. That’s why my work starts with the people and the experience; the object comes second.",
    ],
    // A second, smaller block with its own heading
    approach: {
      heading: "How I work",
      paragraphs: [
        "My approach starts with understanding how the people around a product behave. For Schofield, that meant understanding Giles Ellis’s philosophy as a designer; for Bird & Blend, it meant watching how customers used the tasting stations and the store itself.",
        "Observation shows what really matters. Experiments and testing show what works. And play keeps the process open to surprises.",
      ],
    },
    // Short facts shown as a list beside the text. Delete any you don't want.
    facts: [
      { label: "Studying", value: "Product Design, University of Sussex (final year)" },
      { label: "Focus", value: "People, experiences and the objects between them" },
      { label: "Skills", value: "CAD modelling (SolidWorks, Onshape) · Sketching and concept development (Illustrator) · Prototyping and material testing · Sensory and experience design · Game and mechanics design · User research and surveys · Photography and editing (Photoshop) · Editorial layout (InDesign) · Project documentation and presentation" },
      { label: "Looking for", value: "2027 placements or graduate roles, and further design experience" },
    ],
    cv: "",  // e.g. "files/finn-tozer-cv.pdf" — leave "" to hide the CV link
  },

  /* ---------------------------------------------------------------
     4. CONTACT
     --------------------------------------------------------------- */
  contact: {
    email: "tozerfinn@gmail.com",
    links: [
      { label: "Instagram — design", handle: "@finntozer.design", url: "https://www.instagram.com/finntozer.design/" },
      { label: "Instagram — personal", handle: "@finntozer", url: "https://www.instagram.com/finntozer/" },
      // { label: "LinkedIn", handle: "Finn Tozer", url: "https://www.linkedin.com/in/YOUR-NAME/" },
    ],
  },

  /* ---------------------------------------------------------------
     5. PROJECTS
     ---------------------------------------------------------------
     The ORDER here is the order on the record wheel.
     id        → used in the web address: project.html?id=schofield
                 (lowercase, no spaces; never change it once shared)
     status    → "complete" or "in-progress" (shows an orange tag)
     context   → shown under the title. Be honest about who set the brief.
     cover     → the big image at the top of the project page
     sleeve    → (optional) a different image for the record wheel and grid, e.g. a logo.
                 Leave it out to use the cover there too.
     body      → the project page, built from blocks:
       { type: "text",    heading: "…", paragraphs: ["…", "…"] }
       { type: "list",    heading: "…", items: ["…", "…"] }
       { type: "quote",   text: "…", cite: "…" }
       { type: "image",   src: "…", alt: "…", caption: "…" }   (add narrow: true for tall images)
       { type: "pair",    images: [ {src, alt, caption}, {src, alt, caption} ] }
       { type: "gallery", caption: "…", images: [ {src, alt}, … ] }
       { type: "poem",    title: "…", stanzas: [ ["line", "line"], ["line"] ] }
       { type: "turntable", label: "…", caption: "…", images: [ {src, alt}, … ] }   (photos of each side, in turning order)
       { type: "deck", heading: "…", intro: "…", back: "card-back.webp", ratio: "2 / 3",
         cards: [ { src: "…", kind: "Keep", text: "What the card does" }, … ] }   (a spread of cards to draw)
       { type: "video", src: "file.mp4", poster: "…", caption: "…" }
     IMAGES: export ~1600px wide as .webp (see HOW-TO-UPDATE.md).
     ALT TEXT: describe what is in the picture for someone who can't see it.
     --------------------------------------------------------------- */
  projects: [
    /* ---------- 001 — ALIENS IN THE OCEAN (copy adapted from your Toy & Game Design portfolio and rulebook — please read it through) ---------- */
    {
      id: "aliens-in-the-ocean",
      title: "Aliens in the Ocean",
      subtitle: "A bluffing dice game",
      year: "2026",
      status: "complete",
      tags: ["Game design", "Product", "Graphics"],
      context: "Live university brief set by Big Potato Games — Toy & Game Design module. A concept, not marked or approved by Big Potato Games.",
      summary: "A fast, Perudo-inspired party game: researchers hunt shape-shifting aliens hiding among the sea creatures on their dice — before a UFO takes them home.",
      sleeve: { src: "big-potato-sleeve.webp", alt: "Big Potato Games logo, drawn with alien eyes" },
      cover: {
        src: "hero.webp",
        alt: "Render of the game: a navy and silver tube box, red, blue and green rocket-shaped dice cups with small coloured dice, and two fanned decks of cards — white transmission cards and yellow locator cards.",
      },
      facts: [
        { label: "Brief", value: "An original party game: learnt in ~5 minutes, ~30 minutes to play, fun to watch, minimal language" },
        { label: "Players", value: "2–6" },
        { label: "Contents", value: "30 species dice, 6 research pods, 12 transmission cards, 6 species cards" },
        { label: "Outcome", value: "Tested prototype, CAD renders, cards, rulebook and a sizzle video" },
      ],
      body: [
        {
          type: "text",
          heading: "The brief",
          paragraphs: [
            "Create an original dexterity, abstract strategy or outdoor game for Big Potato Games. It had to be learnt in about five minutes, play in around thirty, be as fun to watch as to play, rely on as little language as possible, and keep every player involved in every round.",
          ],
        },
        {
          type: "text",
          heading: "Starting point",
          paragraphs: [
            "Playing Perudo with groups of two to five — three of them first-timers — created high-emotion moments, and even players who weren’t taking their turn stayed hooked. But it dragged in big groups and the interaction got repetitive. A simple game with no theme: a clear opportunity.",
            "In the first test of my version, new players picked it up quickly, and the added chance cards were the most exciting, competitive part.",
          ],
        },
        {
          type: "text",
          heading: "The story",
          paragraphs: [
            "Players are researchers tracking shape-shifting aliens before an incoming UFO collects them. The aliens hide among five sea species, so they count as whatever species is being bid. Players scan the ocean, estimate what’s down there, and drop out through ‘insufficient research’ until one researcher is left.",
          ],
        },
        {
          type: "pair",
          images: [
            { src: "theme-sketch.webp", alt: "Pen sketches exploring four themes: aliens in the ocean, a snake in the boot, a mole in our ranks, and needles in a haystack.", caption: "Theme ideation." },
            { src: "title.webp", alt: "The Aliens in the Ocean title in white on a navy, rippling water pattern, with green alien heads in the corners.", caption: "Branding." },
          ],
        },
        {
          type: "deck",
          heading: "Draw a card",
          intro: "Two kinds of card, one spread. White transmission cards are drawn when you shout “Scan!” out of turn — some act instantly, others you keep for later. Yellow locator cards come out in the Last Signal round: if your final die matches the species, you win a die back.",
          back: "t-back.webp",
          ratio: "440 / 616",
          cards: [
            { src: "t-reveal-their-hand.webp", kind: "Keep", text: "Pick a player to reveal their hand for one round." },
            { src: "t-reveal-your-hand.webp", kind: "Instant", text: "You must reveal your hand for one round." },
            { src: "t-first-to-match.webp", kind: "Instant", text: "All players pick a locator card — first to match gains a dice." },
            { src: "t-last-to-match.webp", kind: "Instant", text: "All players pick a locator card — last to match loses a dice." },
            { src: "t-extra-dice.webp", kind: "Keep", text: "You collect one extra dice." },
            { src: "t-lose-a-dice.webp", kind: "Instant", text: "You lose a single dice." },
            { src: "t-they-show-you.webp", kind: "Keep", text: "Pick a player who must show you their hand." },
            { src: "t-you-show-them.webp", kind: "Instant", text: "Pick a player who you must show your hand to." },
            { src: "t-species-wild.webp", kind: "Keep", text: "Pick a locator card — this species becomes wild for one round." },
            { src: "t-aliens-not-wild.webp", kind: "Keep", text: "Aliens are no longer wild for one round." },
            { src: "t-roll-to-gain.webp", kind: "Keep", text: "Pick a locator card and roll one dice — if the species match, gain a dice." },
            { src: "t-roll-to-lose.webp", kind: "Instant", text: "Pick a locator card and roll one dice — if the species match, lose a dice." },
            { src: "l-alien.webp", back: "l-back.webp", kind: "Locator", text: "Alien" },
            { src: "l-shrimp.webp", back: "l-back.webp", kind: "Locator", text: "Shrimp" },
            { src: "l-clownfish.webp", back: "l-back.webp", kind: "Locator", text: "Clownfish" },
            { src: "l-seal.webp", back: "l-back.webp", kind: "Locator", text: "Seal" },
            { src: "l-shark.webp", back: "l-back.webp", kind: "Locator", text: "Shark" },
            { src: "l-whale.webp", back: "l-back.webp", kind: "Locator", text: "Whale" },
          ],
        },
        {
          type: "text",
          heading: "Components",
          paragraphs: [
            "Every die carries the six species — alien, shrimp, clownfish, seal, shark and whale — with the alien wild. The cups became ‘research pods’, designed so you can see your own dice without revealing them to anyone else.",
            "Through testing I swapped written cards for graphic ones, so the game relies less on language — one of the brief’s key points.",
          ],
        },
        {
          type: "image",
          src: "dice.webp",
          alt: "Two rendered dice in grey with species printed on each face: alien, seal, clownfish, shark and whale.",
          caption: "Species dice.",
        },
        {
          type: "pair",
          images: [
            { src: "cup-cad.webp", alt: "Grey CAD model of the rocket-shaped research pod with a viewing window.", caption: "Research pod in CAD." },
            { src: "cups.webp", alt: "Rendered research pods in red, blue and green with matching small dice.", caption: "Research pods." },
          ],
        },
        {
          type: "video",
          src: "aliens-in-the-ocean-sizzle.mp4",
          poster: "sizzle-poster.webp",
          label: "Aliens in the Ocean sizzle video",
          caption: "Sizzle video (1 minute).",
        },
        {
          type: "image",
          src: "packaging.webp",
          alt: "Render of the packaging: a cylindrical tube with a navy and silver water pattern, a blue end cap, and the research pods beside it.",
          caption: "Packaging.",
        },
        {
          type: "text",
          heading: "Reflection",
          paragraphs: [
            "I think the final game meets most of the brief. Perudo’s simple bluffing, plus the card mechanics and the theme, makes for fast play that keeps everyone engaged, and testing helped me catch pitfalls in the mechanics, turn structure and pacing.",
            "The theme on its own could feel a little generic for Big Potato, but the narrative behind it makes it feel more relevant. Next, I’d add more chance cards, or new rules that increase player-to-player interaction.",
          ],
        },
      ],
    },

    /* ---------- 002 — BIRD & BLEND (copy adapted from your IPD portfolio — please read it through) ---------- */
    {
      id: "bird-and-blend",
      title: "Bird & Blend",
      subtitle: "A multi-sensory tea sampling station",
      year: "2026",
      status: "complete",
      tags: ["Experience", "User research", "Retail"],
      context: "Live university brief set by Bird & Blend Tea Co. — Integrated Product Design module, individual project. Not marked or approved by Bird & Blend.",
      summary: "A self-led sampling station that pairs each tea with a sound and a texture, turning a ten-second taste into a calm, multi-sensory moment — no conversation with staff required.",
      sleeve: { src: "bird-and-blend-sleeve.webp", alt: "Bird & Blend Tea Co. logo" },
      cover: {
        src: "station-render.webp",
        position: "38% 50%",
        alt: "Render of the sampling station: a tall blue panel with a rounded top and a clear upper window, a pale timber tasting shelf, an L-shaped blue counter, and a timber box base with finger joints.",
      },
      facts: [
        { label: "Brief", value: "A self-led, interactive, multi-sensory tea sampling display" },
        { label: "Role", value: "Individual project" },
        { label: "Methods", value: "In-store observation, three-phase sensory testing with 10 participants" },
        { label: "Outcome", value: "CAD model, renders and flat-pack drawings" },
      ],
      body: [
        {
          type: "text",
          heading: "Starting point",
          paragraphs: [
            "Bird & Blend is an independent tea company from Brighton. Tea has long been a ritual of calm and attention — so I asked how a store’s sampling experience could feel like that, rather than a quick sip on the way past.",
            "I framed the project around sensory nourishment: intentional, mindful engagement with what you can taste, touch, smell, see and hear.",
          ],
        },
        {
          type: "pair",
          images: [
            { src: "store-heatmap.webp", alt: "Hand-drawn plan of the shop with product walls on three sides and a heat map of where customers spent time, red at the edges and blue in the middle.", caption: "Where customers lingered in store." },
            { src: "sketch-layout.webp", alt: "Line sketch of an early station: a tall panel divided into areas labelled Info, Graphic, Visual and Tactile feature, above a counter.", caption: "Early layout sketch." },
          ],
        },
        {
          type: "text",
          heading: "Watching",
          paragraphs: [
            "At the North Laine store I did two things: I talked to staff and handled the products, then took a ‘kid in the corner’ approach, quietly watching how customers used the space.",
            "Sampling lasted only 10–15 seconds — a taste, not a moment. And of the 30 customers I observed, 35% were wearing headphones, which makes them less likely to talk to the staff who usually explain the teas.",
          ],
        },
        {
          type: "quote",
          text: "The lack of sensory stimuli in tea sampling limits flavour interpretation and sensory nourishment.",
          cite: "My problem statement",
        },
        {
          type: "text",
          heading: "Research",
          paragraphs: [
            "I looked into cross-modal correspondence: the links people make between senses. Studies show smooth, rounded textures are associated with sweetness and rough, angular ones with bitterness, while higher-pitched sounds are associated with sweeter tastes and lower ones with savoury tastes — sometimes called ‘sonic seasoning’.",
            "If sound and texture can shape how a flavour is perceived, they could be deliberately paired with a tea to deepen the tasting.",
          ],
        },
        {
          type: "list",
          heading: "Three rounds of testing",
          items: [
            "Sound → flavour: blindfolded participants heard ten sounds and matched each to a flavour profile.",
            "Texture → flavour: they felt ten materials, unseen, and did the same.",
            "Together: they tasted four Bird & Blend teas with their matched sound and texture, then rated flavour intensity and experience.",
          ],
        },
        {
          type: "image",
          src: "results-phase-3.webp",
          alt: "Three results tables for Peppermint Cream, Great British Cuppa, Blueberry & Peach and Nearly Nirvana: intensity and experience scores with sounds, with textures, and with both.",
          caption: "Phase 3 results — scores with sound, with texture, and with both.",
          narrow: true,
        },
        {
          type: "text",
          heading: "What I found",
          paragraphs: [
            "Each tea ended up paired with a profile, a texture and a soundtrack: Peppermint Cream (fresh, textured card), Great British Cuppa (rich, bark), Blueberry & Peach (sweet, tile) and Nearly Nirvana (fruity/floral, embossed paper).",
            "With both sound and texture present, flavour was rated more intense and, apart from the rich tea, the experience scored higher. 8 of the 10 participants described it as nourishing. The bark changed the experience so strongly that it shaped how I designed the tasting feature.",
            "The tests had limits: participants knew they were being timed, the room wasn’t closed off, and repeat participants may have been influenced by earlier rounds.",
          ],
        },
        {
          type: "pair",
          images: [
            { src: "concept-models.webp", alt: "Two simple 3D concept models of a seated station with an arched back panel; the second is coloured blue with labels for logo, tea info and texture.", caption: "Concept development." },
            { src: "flat-pack-drawing.webp", alt: "Flat-pack drawing on a grid: the arched back panel, shelf and counter shapes with finger-joint slots, and two arched base pieces.", caption: "Flat-pack parts." },
          ],
        },
        {
          type: "pair",
          images: [
            { src: "render-timber.webp", alt: "Timber-finish render of the station: tall arched back panel with a clear window, a tasting shelf, and an L-shaped counter on a box base.", caption: "Timber render." },
            { src: "render-detail.webp", alt: "Close-up render of the box base showing finger joints, a round hand hole and an arched cut-out.", caption: "Base detail." },
          ],
        },
        {
          type: "text",
          heading: "Outcome",
          paragraphs: [
            "The final design is a sampling station that pairs Bird & Blend teas with specific soundtracks and textures, creating an introspective moment of sensory nourishment. It encourages people to taste while they touch and listen, and gives them knowledge about the tea without needing to talk to anyone.",
          ],
        },
        {
          type: "list",
          heading: "Next steps",
          items: [
            "Add the audio output and a mount for it.",
            "Test against safety requirements and assess a realistic manufacturing cost.",
            "Trial more blends, materials and sounds.",
            "Check people can use it intuitively, without staff — with clear signage and on-brand information.",
            "Work out how seated and standing versions fit real stores.",
          ],
        },
      ],
    },

    /* ---------- 003 — SCHOFIELD (copy adapted from your DFI portfolio — please read it through) ---------- */
    {
      id: "schofield",
      title: "Schofield",
      subtitle: "‘The Shuckle’ watch box",
      year: "2026",
      status: "complete",
      tags: ["Product", "Packaging", "Narrative"],
      context: "Live university brief set by Schofield Watch Company — Design for Industry module, individual project. Not marked or approved by Schofield.",
      summary: "A watch box and packaging system for the British watch brand Schofield, built around a story: every box is an artefact tied to the beach its oyster shells came from.",
      sleeve: { src: "schofield-sleeve.webp", alt: "Schofield wordmark" },
      cover: {
        src: "shuckle-render.webp",
        position: "70% 50%",  // optional: which part to keep when the image is cropped (left-right, top-bottom)
        alt: "Render of the Shuckle watch box: a pale, stone-textured circular box with three faceted lugs and a dark domed lid. Typewriter text reads: Shuckle Mk.1, Artifact 001, Origin unknown.",
      },
      facts: [
        { label: "Brief", value: "Watch box, secondary and postal packaging" },
        { label: "Role", value: "Individual project" },
        { label: "Material", value: "Jesmonite with oyster-shell aggregate, cork, card, glass" },
        { label: "Outcome", value: "CAD model, renders, graphics and packaging nets (no physical prototype)" },
      ],
      body: [
        {
          type: "text",
          heading: "The brief",
          paragraphs: [
            "Design a watch box, secondary packaging and postal packaging for Schofield, a British watch brand founded by Giles Ellis. The box had to stay under 5 kg and within budget, work as a decorative object rather than simply a watch box, and match Schofield’s design language and identity.",
          ],
        },
        {
          type: "text",
          heading: "Reading the brand",
          paragraphs: [
            "Researching Schofield across its many channels, I realised that understanding why people buy into the brand mattered more than the object itself. Schofield communicates through atmosphere and subtlety rather than heavy-handed branding, and its products are full of small details that owners only discover long after purchase.",
            "So before designing anything, I wrote a set of values to design under:",
          ],
        },
        {
          type: "list",
          items: [
            "Every bit of design is important.",
            "Be bold — quietly and subtly.",
            "Vibes first.",
            "Prioritise longevity.",
            "Be aware of the environment, and therefore resourceful.",
          ],
        },
        {
          type: "quote",
          text: "Design is primordial. Design is not summoned or produced; design is hosted.",
          cite: "Krzysztof Wodiczko (1994)",
        },
        {
          type: "image",
          src: "sketches-motifs.webp",
          alt: "Twelve ink sketches of box forms drawn inside construction cubes, including dials, domes and a geared outline.",
          caption: "Initial ideas — Schofield motifs.",
        },
        {
          type: "text",
          heading: "Direction",
          paragraphs: [
            "I structured ideation around three parts of Schofield’s language — motifs, forms, and treasure or storytelling — then combined the strongest elements. The chosen direction draws on a maritime bulkhead lamp: a circular, enclosed, imposing form that suggests protection and permanence, with a geared outline that makes the box intuitive and forgiving to open.",
          ],
        },
        {
          type: "image",
          src: "sketches-development.webp",
          alt: "Development sketches: two perspective views of the box, a side elevation with the domed lid, top views of the geared outline, a magnified detail of the lid’s 60-degree twist, and side and front sections.",
          caption: "Development — the twist-to-open lid.",
        },
        {
          type: "text",
          heading: "Material",
          paragraphs: [
            "I compared six materials — brass, aluminium, pewter, Jesmonite, Ecrylimer and concrete — against six criteria. Metals suited Schofield’s motifs but were heavy and impractical to prototype; castable composites balanced the brand language with feasibility.",
            "The final choice is Jesmonite with an oyster-shell aggregate. The shells are a waste product, they tie the material to the coast, and Jesmonite’s range of pigments means the box can be matched to the watch it holds.",
          ],
        },
        {
          type: "text",
          heading: "The story",
          paragraphs: [
            "The narrative builds on Schofield’s interest in artefacts and sightings. Shells collected from a particular beach go into each box, so every box is tied to a real place. It is marked with the date and coordinates of the collection and paired with a landscape card of the site — an artefact, not just a container.",
          ],
        },
        {
          type: "gallery",
          caption: "Artefact cards — each box carries the date and coordinates of the beach its shells came from.",  // CHECK: add a photo credit here if the photographs are not yours
          images: [
            { src: "artefact-card-1.webp", alt: "Instant-photo style card: black-and-white beach with two people at the water’s edge and a black marker pointing at the shore. Labelled West Wittering, 18/05/2025." },
            { src: "artefact-card-2.webp", alt: "Card showing a low coastal path beside the sea under a grey sky, marker on the horizon. Labelled Isle of Wight, 29/05/2025." },
            { src: "artefact-card-3.webp", alt: "Card showing jagged rocks around a small sea inlet, marker among the rocks. Labelled Brittany, 11/04/2026." },
            { src: "artefact-card-4.webp", alt: "Card showing salt marsh at low tide with two small boats on the mud. Labelled Suffolk, 22/11/2025." },
            { src: "artefact-card-5.webp", alt: "Card showing a pebbly loch shore with mountains behind, marker at the water’s edge. Labelled Isle of Skye, 14/02/2026." },
            { src: "artefact-card-6.webp", alt: "Card showing a long lake winding through a rocky valley. Labelled Lake District, 18/10/2025." },
          ],
        },
        {
          type: "pair",
          images: [
            { src: "cad.webp", alt: "Three grey CAD views of the box: assembled, the hollow main shell, and the lid ring.", caption: "CAD development." },
            { src: "exploded-graphic.webp", alt: "Flat graphic of the five parts — glass dome, Jesmonite lid top and underside, cork watch insert and Jesmonite main shell — with material labels.", caption: "Five parts: shell, cork insert, lid underside, lid top, glass dome." },
          ],
        },
        {
          type: "text",
          heading: "Making it real",
          paragraphs: [
            "The box is designed for mould casting, which suits both prototyping and the 50-unit small batch in the brief. I estimated the cost at roughly £70 per box, depending on final dimensions. The main risks — chipping, brittle mixes, release from the mould and inconsistent finishes between batches — would be addressed by testing wall thickness and casting methods.",
          ],
        },
        {
          type: "pair",
          images: [
            { src: "internal-packaging.webp", alt: "Internal packaging graphic: orange and mauve layered inserts in elevation, a box net, and an artefact card from Suffolk, branded ‘The Shuckle’, Schofield.", caption: "Internal packaging." },
            { src: "external-packaging.webp", alt: "External packaging: a die-cut box net, a sample of honeycomb paper wrap, and a section through the packed box.", caption: "External packaging." },
          ],
        },
        {
          type: "text",
          heading: "Reflection",
          paragraphs: [
            "I’m happy with the outcome. I didn’t make a physical prototype, but I developed the design fully in CAD, and I think the narrative behind it strongly resonates with Schofield — that was the most important and most challenging part. The project taught me how to translate a brand into a physical object, and how much first impressions and packaging matter.",
          ],
        },
      ],
    },

    /* ---------- 004 — VASE (copy adapted from your A3 sheet — please read it through) ---------- */
    {
      id: "vase",
      title: "Vase",
      subtitle: "A self-portrait in clay, paper and verse",
      year: "2026",
      status: "complete",
      tags: ["Object", "Ceramics", "Writing"],
      context: "University project — Design Philosophy module.",
      summary: "A handmade ceramic vase layered with torn photographs and words, made alongside a poem. Together they show how my memories and experiences have shaped the way I design.",
      cover: {
        src: "vase-peace.webp",
        alt: "A round-bellied ceramic vase covered in collaged, torn photographs and hand-painted words, with ‘PEACE’ in large letters across the front and ‘PLAY’ near the neck.",
      },
      facts: [
        { label: "Pieces", value: "Ceramic vase and the poem ‘The Perspective’" },
        { label: "Materials", value: "Handmade ceramic, torn printed images, paint" },
        { label: "Role", value: "Individual project" },
      ],
      body: [
        {
          type: "text",
          heading: "The object",
          paragraphs: [
            "The vase is handmade ceramic. Its natural imperfections celebrate the beauty of irregularity: an object’s character is shaped by the individuality of how it was made.",
            "It is layered with individually torn images. On its own, each fragile piece stands for how fleeting a single experience is. As the layers build up they form a more substantial surface — the way a design philosophy isn’t fixed, but is built from memories, influences and personal interpretations.",
          ],
        },
        {
          type: "turntable",
          label: "Turn the vase",
          caption: "Turn the vase — four sides, photographed.",
          images: [
            { src: "turn-3.webp", alt: "Front of the vase: ‘PEACE’ in large letters across the belly, ‘PLAY’ near the neck, childhood photographs around it." },
            { src: "turn-4.webp", alt: "Next side: a black panel reading ‘MODERN LIFE IS RUBBISH’ above childhood photographs of a smiling toddler." },
            { src: "turn-1.webp", alt: "Next side: ‘GROW’ painted in yellow above a yellow flower, a white bicycle, ‘HOME’ in white, and ‘Seek understanding, not answers’ around the neck." },
            { src: "turn-2.webp", alt: "Next side: ‘JUST DO YOU’ painted in white over green-toned photographs and a band of white patterned shapes." },
          ],
        },
        {
          type: "pair",
          images: [
            { src: "vase-explore.webp", alt: "Close view of the vase: ‘EXPLORE’ and ‘INSPIRE’ written in black on white torn paper, a bicycle, real dried grass, and a yellow flower outline." },
            { src: "vase-detail.webp", alt: "Close-up of the lower half of the vase: yellow ‘GROW’ lettering, a painted flower and layered photographs, with ‘Seek understanding, not answers’ around the neck.", caption: "Layers of torn images build a single surface." },
          ],
        },
        {
          type: "text",
          heading: "The poem",
          paragraphs: [
            "Alongside the vase I wrote ‘The Perspective’. The vase offers an insight into my memories and experiences; the poem is a more explicit, personal exploration of how those experiences continue to form my perspective.",
          ],
        },
        {
          type: "poem",
          title: "The Perspective",
          stanzas: [
            [
              "Oh, who’s this? He who holds onto the simple goodness of life with everything he has and sees past the bad in a joyous infatuation with that good itself.",
              "Casted in concrete. Cured in nature.",
              "A child born in blissful commotion.",
              "A holy place where tracks crossed and roots were rife.",
              "Livelier than most.",
              "A son to a cowboy who taught peace as he rode.",
              "The young eye notices in abundance and sees in optimism.",
              "The perspective of a novice, where boundaries are scarce.",
              "He wouldn’t have it any other way.",
            ],
            [
              "Oh, who’s this? He who reaches for the simple goodness of life with everything he has and converses with the bad seeking to understand the value of that good itself.",
              "Seeing the world with him in it, seeking some truth.",
              "Undefined by place or reason.",
              "The future, an impending stranger, evaded with parties and pubescence.",
              "He who lost his mirrors, half-blind.",
              "Yet wanders through fields, hoping nothing catches up",
              "Where he discerned it must rain for plants to grow.",
              "And rained it did.",
              "He who seeks the intangible future and yearns for memories he’s not yet created.",
              "Follows the riderless horse.",
              "With no triumph in his search for truth, he found treasure.",
              "He who saw the good in the rain yet still hoped for sun.",
            ],
            [
              "He who holds onto the simple goodness of life with everything he has yet confronts the bad in a joyous defence of that good itself.",
              "Picks the petals of life’s meadows and spreads its seed throughout the concrete.",
              "He who learns the perspective of a novice with the eye of an expert.",
              "Who dreams without dreams becoming his master and thinks without thoughts being his aim.",
              "He who’s willing to wander and committed to endeavour.",
              "And doesn’t fear misunderstanding but greets it with grace.",
              "He who sees the world with his own eyes but always seeks the insight of others.",
              "And leaves the world not as he found it, but a little bit better.",
            ],
            [
              "He who’s still wondering",
            ],
          ],
        },
        {
          type: "text",
          heading: "Reading them together",
          paragraphs: [
            "The final stanza holds several design philosophies. ‘Picks the petals of life’s meadows and spreads its seed throughout the concrete’ invites two readings: that design should draw on past ideas and experiences to answer future problems, or that man-made objects should work alongside nature, using its beauty and restorative qualities to address contemporary challenges.",
            "The last line has no full stop. Set apart from the rest, it leaves the ideas unresolved — my philosophy stays open to change through new experiences and shifting perspectives.",
          ],
        },
      ],
    },

    /* ---------- 005 — MONDAYN (in progress — a sneak preview, not a full project page) ---------- */
    {
      id: "mondayn",
      title: "MONDAYN",
      subtitle: "Issue 01: ‘This is not a coaster…’",
      year: "2026",
      status: "in-progress",
      tags: ["Editorial", "A5 magazine"],
      context: "University project — Design Philosophy module.",
      summary: "An A5 magazine, still in the making. Here’s a spread from Issue 01 as a first look — the full issue will go up when it’s finished.",
      sleeve: { src: "wordmark.webp", alt: "The MONDAYN wordmark with ‘Issue 01:’ above and ‘This is not a coaster…’ below." },
      cover: {
        src: "wordmark-wide.webp",
        alt: "The MONDAYN wordmark in heavy black capitals, with ‘Issue 01:’ above and ‘This is not a coaster…’ below.",
      },
      facts: [
        { label: "Format", value: "A5 magazine" },
        { label: "Issue", value: "01 — ‘This is not a coaster…’" },
        { label: "Status", value: "In progress" },
      ],
      body: [
        {
          type: "list",
          heading: "In this issue",
          items: [
            "Machines for Living — on Rod Kitson’s life-size painted replica of his studio flat.",
            "Hair — what the way we wear our hair says about us.",
            "The Bank Holiday Weekend — the routines we keep when routine breaks.",
          ],
        },
        {
          type: "image",
          src: "hair-spread.webp",
          alt: "Magazine spread for the Hair piece: an introduction on the left page; on the right, three film-strip stills of different people with quotes about what their hair means to them.",
          caption: "Hair — from a documentary by Holly Ziegler, used with permission.",
        },
        {
          type: "text",
          heading: "Coming soon",
          paragraphs: ["The finished issue will be added here when it’s done."],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------
     6. JOURNAL POSTS (newest first)
     ---------------------------------------------------------------
     id     → used in the web address: post.html?id=your-post-id
     date   → written as "YYYY-MM-DD", e.g. "2026-11-25"
     body   → a list. Plain "text" = one paragraph. You can also use:
                { type: "heading", text: "…" }
                { type: "image", src: "…", alt: "…", caption: "…" }
                { type: "quote", text: "…", cite: "…" }
     The word count shown on the page is worked out automatically
     (paragraphs and headings only).
     --------------------------------------------------------------- */
  posts: [
    {
      id: "critical-review",
      title: "The planet isn’t a line in the brief",  // CHECK: title is a suggestion — change it if you like
      date: "2026-11-23",
      summary: "A critical review of Tom Lloyd’s talk on how Pearson Lloyd’s practice has changed — and why the planet can’t be one requirement among many.",
      body: [
        "Watching Tom Lloyd’s talk on how Pearson Lloyd’s practice has changed, the part that stuck with me was when he questioned ‘user-centred design’. It’s usually presented as the aim, so it’s interesting to see it treated as the problem. His point was that, by focusing so hard on what one person wants, industrial design has quietly left the planet out of the brief.",
        "This challenges my own approach, because I design around people’s relationships with objects. I agree the planet has been left out, but the phrase “putting it into the brief” treats it as optional: one requirement among many, to be traded off when it doesn’t suit. For me, the planet is an obligatory constraint that sits over every project before a brief even exists. No brief is valid without it. If something can’t be made, used and discarded responsibly, it isn’t yet a design problem worth solving.",
        "It’s the wording I’m critiquing. The planet ends up as a line in the brief because of how design presents itself, and sometimes how it’s taught: good design is framed as appeal — the desire to buy something, or how it looks — with sustainability added later. Lloyd argues this should be flipped. I think the two are intertwined. User-centred design can shape how long a product lasts, because when someone truly values something, they treat it with more respect. Your second-favourite teddy bear didn’t go in the bin; it went to your little cousin, or was donated. (The first one, of course, must be kept.)",
      ],
      // Shown under the post as a link — not counted in the word count
      source: { label: "Watch the talk: Tom Lloyd, Pearson Lloyd (YouTube)", url: "https://www.youtube.com/watch?v=qMKQdXnYVRo" },
    },
  ],
};
