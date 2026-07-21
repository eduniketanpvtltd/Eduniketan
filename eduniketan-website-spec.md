# Eduniketan Private Limited — Website Spec (Features & MVP)

**Reference sites:** iamneo.ai (multi-page nav, milestone counters, product segmentation) · codetantra.com (feature-dense sections, client logo wall)
**Theme:** Light, clean corporate
**Structure:** Multi-page (separate URLs per section)
**Assets:** Logo + real event photos to be added later — build with placeholders now

---

## 1. Site Map / Pages

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Brand intro, product overview, trust signals, CTA |
| Products | `/products` | TheEduCode, TheEduLive, TheEduBootCamp, Placement Mastery Program |
| Product detail | `/products/thee-educode`, `/products/thee-edulive`, `/products/thee-edubootcamp`, `/products/placement-mastery-program` | Deep dive per product |
| Our Journey | `/journey` | Timeline of company milestones |
| Albums / Gallery | `/albums` | Photo galleries by event/college, filterable |
| About | `/about` | Company, founders, mission, culture |
| Clients / Partners | `/clients` | College/university logos, case studies |
| Contact | `/contact` | Enquiry form, contact details |
| Privacy Policy / Terms | `/privacy`, `/terms` | Legal (footer links) |
| Admin Panel | `/admin` (internal only, auth-gated) | Gallery uploads, enquiry inbox, demo/meeting tracker — not linked in public nav |

---

## 2. Global Elements

### Navigation (sticky header)
- Logo (left) — placeholder mark until real logo supplied
- Nav items: Home · Products (dropdown: TheEduCode / TheEduLive / Placement Mastery Program) · Journey · Albums · About · Clients · Contact
- CTA button, top-right: "Request a Demo"
- Shrinks/condenses on scroll (height + shadow transition)
- Mobile: hamburger → full-screen slide-in menu

### Footer
- Logo + 1-line tagline
- Quick links (same as nav)
- Contact block: phone, email, address (placeholder until finalized)
- Social icons (LinkedIn at minimum)
- Newsletter signup (email capture — optional for MVP)
- Legal links: Privacy Policy, Terms
- Copyright line

### Design System
- **Colors:** white/off-white base, one primary brand blue (or brand color once logo is set), a secondary accent (e.g., teal/green) for CTAs and highlights, dark navy/charcoal for text
- **Typography:** modern sans-serif (e.g., Inter, Poppins, or Satoshi) — bold display weight for headings, regular for body
- **Components:** rounded cards (12–16px radius), soft shadows, generous whitespace, pill-shaped buttons
- **Animation library suggestions:** GSAP or Framer Motion (if React) / AOS (Animate On Scroll) for vanilla HTML

---

## 3. Page-by-Page Feature Breakdown

### Home (`/`)
1. **Hero section**
   - Headline + subheadline (company positioning statement)
   - Primary CTA ("Request a Demo") + secondary CTA ("Explore Products")
   - Animated background: subtle gradient blobs or particle/mesh animation
   - Optional: rotating/typewriter text cycling through value props
2. **Partner/college logo strip** — auto-scrolling marquee of partnered institutions (LPU, Pyramid College, etc. — placeholders until more logos available)
3. **Product overview cards** (3 cards: TheEduCode, TheEduLive, Placement Mastery Program) — icon, one-liner, "Learn More" link, hover-lift animation
4. **Why Eduniketan** — 4–5 feature tiles (e.g., Impact at Scale, Placement-Focused Curriculum, Dedicated Mentors, Real-Time Analytics, Growing Campus Network) with icons
5. **Milestones / stats counter** — animated count-up on scroll (e.g., colleges partnered, students onboarded, courses offered) — numbers to be filled in as real data grows
6. **Testimonials carousel** — placeholder slots for TPO/college quotes, star rating, auto-rotate + manual nav
7. **CTA banner** — full-width closing call to action before footer

### Products (`/products`)
- Four product cards: TheEduCode, TheEduLive, TheEduBootCamp, Placement Mastery Program — each links to its detail page
- Suggested grouping: **Platforms** (TheEduCode, TheEduLive — the underlying tech/training infrastructure) vs. **Programs** (TheEduBootCamp, Placement Mastery Program — the packaged offerings sold to institutions)
- Feature comparison table (optional MVP+): Placement Mastery Program tiers (Base/Silver/Gold/Platinum, per-student-per-semester) alongside TheEduBootCamp's per-course pricing (₹2,199 / ₹2,599)

### Product Detail — TheEduCode
- Hero banner with product name + tagline ("Question-and-autograder platform")
- Course catalog grid: Quantitative Aptitude, Logical Reasoning, Verbal Ability & English Comprehension, Data Interpretation, General Awareness/Current Affairs, DSA, SQL & Database Basics, Excel for Business/Analytics, Python (Beginner/Data Analysis), branch-wise core subject crash courses, Basic Coding for non-CS branches
- Feature list: auto-grading, weekly question-format tests, leaderboard, analytics dashboard
- "How it works" step-by-step visual (3–4 steps)
- CTA: Request Demo

### Product Detail — TheEduLive
- Hero banner with product name + tagline (mentor-led, industry-professional training)
- Program catalog grid: GD Techniques, PI Prep/Mock Interviews, Resume & LinkedIn Building, Business/Email Communication Writing, Public Speaking & Presentation Skills, Body Language & Personal Branding
- Feature list: dedicated mentors, GD/interview-format weekly tests, leaderboard
- CTA: Request Demo

### Product Detail — TheEduBootCamp
- Hero banner: "Industry-Aligned Placement Enhancement Program" — positioning line on closing the gap between what universities teach and what companies test in online assessments
- Proof strip: already deployed at LPU — 99.9% uptime, zero security incidents, 91/100 faculty NPS, 87/100 student NPS
- "The Gap" comparison table: What Universities Teach vs. What Companies Test vs. What TheEduBootCamp Delivers
- Three Pillars section (icon tiles): Live Streaming · Recorded Lectures for Revision · TheEduCode Platform Access (included free with every programming course)
- Engagement model breakdown: 45 hrs core live training + 10 hrs doubt sessions + weekly assessments + final coding test/viva (~55 hrs total)
- Course catalog — two tracks, tabbed or two-column:
  - **Track 1 — DSA, Logic & OOPS**: OOPS & Basic DSA (C++/Java), Job Ready DSA BootCamp with LeetCode (C++/Java/Python) — ₹2,199/student
  - **Track 2 — Industry Development & Emerging Tech**: MERN Stack, Flutter, AI & ML, DevOps & Cloud — ₹2,599/student
- Instructor panel section: active SDE credentials (company logos/names — confirm consent before publishing names publicly)
- Batch parameters: 40–60 students/batch, online live delivery, 9-working-day kickoff
- Collaboration models tile row: Full PEP Integration / Summer Training / Elective Add-On / Custom Batch
- CTA: Request Proposal

### Product Detail — Placement Mastery Program
- Positioned as the flagship bundled offering combining TheEduCode + TheEduLive
- Pricing tiers table: Base / Silver / Gold / Platinum (per-student-per-semester)
- What's included per tier (feature checklist)
- CTA: Request Proposal

### Our Journey (`/journey`)
- Vertical (or horizontal-scroll) animated timeline
- Milestone nodes with year/date, short description, optional image
- Built to be easily extendable — new milestones append to the timeline as the company grows
- Reveal-on-scroll animation per node

### Albums / Gallery (`/albums`)
- Masonry or grid photo layout
- Filter/tag by category (Campus Visits, MOU Signings, Team Events, Workshops)
- Lightbox on click (enlarged image, caption, prev/next nav)
- Placeholder image set until real photos are supplied
- Optional MVP+: album-level grouping (each event = one album/folder)

### About (`/about`)
- Company overview / mission statement
- Founders section: Souvik Gupta & Saif Siddique — photo placeholder, bio, role
- Culture/values tiles
- Optional: team grid (if more members to be featured later)

### Clients (`/clients`)
- Logo wall of partnered colleges/universities (LPU, Pyramid College, others as onboarded)
- Optional case-study cards (TPO quote + result stat, e.g., placement % increase)

### Contact (`/contact`)
- Enquiry form: Name, Institution/Organization, Email, Phone, Message, dropdown for "Interested In" (TheEduCode / TheEduLive / Placement Mastery Program / General Enquiry)
- Contact details block (phone, email, office address)
- Embedded map (optional MVP+)
- Form submission → email notification (backend requirement, not front-end only)

---

## 3.5 Admin Panel (Internal Use Only — Not Public)

A separate, authenticated back-office area — not linked from the public nav, not indexed by search engines.

**Access:** `/admin` (or a separate subdomain, e.g. `admin.eduniketanpvtltd.com`) — login-gated, restricted to your team only (Souvik, Saif, and whoever else needs access).

### Core Admin Features

1. **Gallery Manager**
   - Upload images (single or bulk upload)
   - Add caption + tag/category per image (e.g., Campus Visit, MOU Signing, Team Event) so it slots into the right filter on the public Albums page
   - Group images into albums/events
   - Edit or delete existing images/captions
   - Reorder images within an album (drag-and-drop)
   - Set a cover image per album

2. **Messages / Enquiries Inbox**
   - List view of all Contact-page form submissions (name, institution, email, phone, "interested in" selection, message, submitted date)
   - Mark as read/unread, archived, or flagged for follow-up
   - Filter/search by date, institution, or product interest
   - Export to CSV (for tracking against your existing lead pipeline)

3. **Meetings / Demo Requests**
   - List of "Request a Demo" submissions separate from general enquiries (if you want a dedicated CTA path)
   - Status field per entry: New / Scheduled / Completed / No Response
   - Optional: note field for internal follow-up comments
   - Optional MVP+: calendar view or integration with your scheduling tool

4. **Admin Auth**
   - Simple email/password login (or Google OAuth restricted to your company domain) — no public signup
   - Session-based access control; single role is fine for MVP (no need for granular permission tiers unless your team grows)

### Notes for Antigravity build
- This needs actual backend/database support (not a static site) — image storage (e.g., S3 or similar), a database for messages/meetings/gallery metadata, and authenticated API routes
- Keep the admin panel and public site on the same codebase/backend but gate all admin routes behind auth middleware
- MVP-wise, this can ship after the public pages — public site can go live first with a placeholder gallery while the admin panel is built in parallel

---

## 4. Animation & Interaction Inventory

| Element | Animation |
|---|---|
| Hero background | Slow-moving gradient/mesh or blob shapes |
| Nav bar | Condense + shadow on scroll |
| Cards (products, features) | Hover lift + shadow deepen |
| Stats counters | Count-up when scrolled into view |
| Timeline nodes | Fade/slide-in on scroll |
| Testimonials | Auto-rotating carousel, swipe-enabled on mobile |
| Logo strip | Continuous horizontal auto-scroll (marquee) |
| Gallery images | Fade-in on load, zoom-on-hover, lightbox open/close transition |
| Buttons | Subtle scale/color transition on hover |
| Page transitions | Fade or slide between page loads (if SPA-style routing) |

---

## 5. MVP Scope (Phase 1 — build this first)

**Must-have for launch:**
1. Home page — hero, product overview cards, why-us section, CTA footer (stats/testimonials can use placeholder content)
2. Products page + 4 product detail pages (TheEduCode, TheEduLive, TheEduBootCamp, Placement Mastery Program) with course/program lists
3. Journey page — timeline with milestones already known (founding → LPU → West Bengal expansion → Pyramid College MOU)
4. About page — company + founders
5. Contact page — working enquiry form
6. Global nav + footer, responsive across mobile/tablet/desktop
7. Core scroll-reveal + hover animations (don't need full animation inventory day one)

**Defer to Phase 2:**
- Admin Panel (needs backend/auth/database — can be built in parallel while public site launches with placeholder content)
- Albums/Gallery (needs real photos first — placeholders can hold the page structure but full build waits on assets)
- Clients page with full logo wall / case studies
- Testimonials with real quotes
- Pricing table made public (only once finalized for public display)
- Blog/Resources section (not requested yet, but common in this space — flag as future option)

---

## 6. Content Still Needed From You
- Final logo file (SVG preferred)
- Real photos for Albums/Gallery
- Office address, phone, email for footer/contact
- Finalized stats (colleges partnered, students onboarded) for the counters
- Founder photos + short bios
- Any existing testimonial quotes with permission to publish
- Confirmation that named instructors (for TheEduBootCamp's SDE panel) have consented to their name/employer being published publicly on the site — a formal proposal to one institution is different exposure than a public webpage
