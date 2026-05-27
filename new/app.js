const pageMeta = {
  "/": {
    title: "DeSaaS | Replace Bloated SaaS With Simpler Internal Tools",
    description: "DeSaaS helps companies reduce SaaS sprawl by replacing bloated subscriptions with simple, integrated tools using only the features they actually need.",
  },
  "/how-it-works": {
    title: "How DeSaaS Works | A Safe, Practical Way to Reduce Software Sprawl",
    description: "DeSaaS maps your SaaS stack, finds the first opportunity, and helps you cancel, consolidate, replace, or renegotiate — then builds the focused tools you actually need.",
  },
  "/use-cases": {
    title: "DeSaaS Use Cases | Concrete Ways to Replace SaaS Bloat With Focused Tools",
    description: "From CRM cleanup to AI-assisted support triage, these are the narrow, visible opportunities where DeSaaS creates the fastest impact.",
  },
  "/insights": {
    title: "DeSaaS Insights | Thinking Through the Shift From SaaS to Simpler Tools",
    description: "Practical guides on SaaS sprawl, internal tools, AI workflows, security, and where to start reducing software complexity.",
  },
  "/calculator": {
    title: "DeSaaS Calculator | Estimate Your SaaS Savings Opportunity",
    description: "Use the DeSaaS Calculator to see where you could save money, reduce clutter, and create more capacity in Month 1. A conservative directional model designed to start a better conversation.",
  },
  "/book-audit": {
    title: "Book a SaaS Audit | DeSaaS",
    description: "Share a little context and DeSaaS will identify the first practical place to simplify your software stack — from spend and overlap to workflow friction and renewal timing.",
  },
  "/new": {
    title: "DeSaaS Preview | Own Your Tools",
    description: "Preview a DeSaaS direction focused on owned operating surfaces, hidden complexity cost, AI-ready workflows, and practical stack simplification.",
  },
};

function updateMeta(title, description) {
  document.title = title;
  const set = (sel, attr, val) => document.querySelector(sel)?.setAttribute(attr, val);
  set('meta[name="description"]', "content", description);
  set('meta[property="og:title"]', "content", title);
  set('meta[property="og:description"]', "content", description);
  set('meta[property="og:url"]', "content", `https://desaas.co${window.location.pathname}`);
  set('meta[name="twitter:title"]', "content", title);
  set('meta[name="twitter:description"]', "content", description);
  set('link[rel="canonical"]', "href", `https://desaas.co${window.location.pathname}`);
}

const routes = {
  "/": renderHome,
  "/how-it-works": renderHowItWorks,
  "/use-cases": renderUseCases,
  "/insights": renderInsights,
  "/calculator": renderCalculatorPage,
  "/book-audit": renderBookAudit,
  "/new": renderNewHome,
};

const articles = {
  "/insights/is-custom-software-riskier-than-saas": {
    title: "Is custom software actually riskier than SaaS?",
    kicker: "Security",
    intro: "The risk is not custom software by itself. The risk is unmanaged complexity.",
    sections: [
      ["SaaS is not automatically safe", "A trusted vendor can still create exposure when access, data exports, integrations, and permissions multiply across a growing stack. The tool may be secure in isolation while the operating model around it becomes difficult to govern."],
      ["Sprawl creates its own attack surface", "Every additional platform brings accounts, admins, API keys, integrations, stored data, renewal pressure, and another place where work can drift away from policy."],
      ["Simple internal tools can reduce exposure", "A focused tool with clear access control, logging, documentation, and ownership can be easier to understand than a broad subscription used for three small workflows."],
      ["The better question", "The real decision is not SaaS versus custom. It is managed risk versus unmanaged risk. DeSaaS starts with workflow, data, access, and maintenance before recommending what to replace."],
    ],
    callout: "Less sprawl can mean fewer vendors, fewer permissions, and more control over the workflows that matter.",
  },
  "/insights/why-saas-savings-are-only-the-first-win": {
    title: "Why SaaS savings are only the first win",
    kicker: "Operations",
    intro: "Reducing spend is useful. The bigger prize is a cleaner operating system for the business.",
    sections: [
      ["Savings open the door", "When a company finds waste in its stack, it creates the budget and attention needed to improve the way work actually happens."],
      ["Simplicity changes behavior", "Fewer tools means fewer logins, fewer exports, fewer duplicate records, and fewer handoffs that depend on memory and heroic follow-up."],
      ["Capacity compounds", "Once workflows are simpler, teams can move faster and spot the next improvement more easily. Savings become the first turn of a larger flywheel."],
    ],
    callout: "Save, simplify, move faster, build better tools, create capacity.",
  },
  "/insights/cancel-consolidate-replace-or-renegotiate": {
    title: "Cancel, consolidate, replace, or renegotiate?",
    kicker: "Framework",
    intro: "The right move depends on value, usage, overlap, workflow importance, and contract timing.",
    sections: [
      ["Cancel", "Cancel tools that are unused, low value, or kept alive only because nobody owns the decision."],
      ["Consolidate", "Consolidate when two or more tools serve the same job and one can credibly cover the essential workflow."],
      ["Replace", "Replace when the workflow matters but the platform is bloated, expensive, or poorly matched to how your team operates."],
      ["Renegotiate or keep", "Renegotiate essential tools that are overpriced. Keep the ones that are high-value, well-used, and genuinely hard to improve on."],
    ],
    callout: "The goal is not fewer tools at all costs. The goal is fewer dependencies with better fit.",
  },
  "/insights/your-team-wants-to-use-ai-now-what": {
    title: "Your team wants to use AI. Now what?",
    kicker: "AI workflows",
    intro: "Start with low-risk, structured workflows where the input, output, and human review step are clear.",
    sections: [
      ["Pick practical workflows", "Good first candidates include summarizing inbound requests, routing support issues, drafting internal notes, extracting fields from documents, and searching approved internal knowledge."],
      ["Keep the workflow narrow", "The safest AI workflows are specific. They have known data boundaries, predictable outputs, and a person who can approve or correct the result."],
      ["Measure usefulness", "A useful AI workflow should save time, reduce friction, or improve consistency without forcing the team to adopt a giant new platform."],
    ],
    callout: "AI works best when it is built into the workflow, not dropped beside it as another destination.",
  },
  "/insights/five-signs-you-are-ready-to-desaas": {
    title: "Five signs your company is ready to DeSaaS",
    kicker: "Readiness",
    intro: "You do not need a giant transformation program. You need a clear first opportunity.",
    sections: [
      ["You have overlapping tools", "Different teams bought different platforms for similar jobs, and nobody has a shared map of what each one really does."],
      ["You pay for features nobody uses", "The invoice reflects the whole platform, but the team relies on a small subset of workflows."],
      ["Teams export to spreadsheets anyway", "Spreadsheets often reveal the real operating system hiding underneath the official stack."],
      ["Engineering is too busy", "Internal tools are important, but product priorities keep pushing them down the list."],
      ["AI keeps coming up", "People see the promise, but nobody owns turning it into safe, practical workflows."],
    ],
    callout: "If two or three of these sound familiar, your first DeSaaS opportunity is probably close.",
  },
};

const app = document.querySelector("#app");
let animationTimer;
let spendTimer;
let processTimers = [];

function html(strings, ...values) {
  return strings.reduce((out, str, index) => out + str + (values[index] ?? ""), "");
}

function path() {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function isPreviewPath() {
  const current = path();
  return current === "/new" || current.startsWith("/new/");
}

function normalizeRoute(route) {
  return route === "/audit.html" ? "/book-audit" : route;
}

function routePath() {
  const current = path();
  if (current === "/new") return "/new";
  if (current.startsWith("/new/")) return normalizeRoute(current.slice(4) || "/");
  return normalizeRoute(current);
}

function previewHref() {
  const current = path();
  return current === "/" ? "/new" : `/new${current}`;
}

function scopePreviewLinks(markup) {
  if (!isPreviewPath()) return markup;
  return markup.replace(/href="\/(?!\/)/g, 'href="/new/');
}

function navigate(event) {
  const link = event.target.closest("a");
  if (!link || link.origin !== window.location.origin || link.hasAttribute("data-external")) return;
  if (link.pathname === "/new/audit.html" || link.pathname.startsWith("/new/estimator")) return;
  event.preventDefault();
  history.pushState({}, "", link.pathname);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function header() {
  const current = routePath();
  const links = [
    ["/how-it-works", "How It Works"],
    ["/use-cases", "Use Cases"],
    ["/insights", "Insights"],
    ["/calculator", "Calculator"],
    ["/book-audit", "Book Audit"],
  ];
  return html`
    <header class="site-header">
      <nav class="nav" aria-label="Main navigation">
        <a class="brand" href="/">
          <span class="brand-mark">De</span>
          <span>DeSaaS</span>
        </a>
        <div class="nav-links">
          ${links.map(([href, label]) => `<a href="${href}" ${current === href ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        </div>
        <div class="nav-actions">
          <a class="button primary" href="/calculator">Find your first opportunity</a>
          <button class="menu-button" type="button" aria-label="Open menu">☰</button>
        </div>
      </nav>
    </header>
  `;
}

function footer() {
  return html`
    <footer class="footer">
      <div class="container footer-inner">
        <div>
          <a class="brand" href="/"><span class="brand-mark">De</span><span>DeSaaS</span></a>
          <p style="margin-top: 1rem">DeSaaS helps companies reduce software sprawl and build simpler systems around the way they actually work.</p>
          <p class="outcome-line">De-clutter. De-stress. DeSaaS.</p>
          <p class="disclaimer" style="margin-top: 1rem">All trademarks are the property of their respective owners. Logos are illustrative examples of common software categories and do not imply partnership, endorsement, criticism, or affiliation.</p>
        </div>
        <div class="footer-links">
          <a href="/how-it-works">How It Works</a>
          <a href="/use-cases">Use Cases</a>
          <a href="/insights">Insights</a>
          <a href="/calculator">Calculator</a>
          <a href="/book-audit">Book Audit</a>
          <a href="/privacy">Privacy</a>
          <a href="mailto:hello@desaas.com">Contact</a>
        </div>
      </div>
    </footer>
  `;
}

function pageShell(content) {
  const previewSwitch = isPreviewPath()
    ? ""
    : `<a class="preview-switch" href="${previewHref()}" aria-label="View the alternate DeSaaS preview page">View new version</a>`;
  return scopePreviewLinks(`${previewSwitch}${header()}<main id="main">${content}</main>${footer()}`);
}

function ctaButtons() {
  return html`
    <div class="actions">
      <a class="button primary" href="/calculator">Find your first DeSaaS opportunity</a>
      <a class="button secondary" href="/book-audit">Book a SaaS Audit</a>
    </div>
  `;
}

function pipelineAnimation() {
  const saasLogos = [
    { name: "Salesforce", category: "CRM", src: "/logos/salesforce.svg", action: "keep", x: 10, y: 18, r: -5, s: 1.06 },
    { name: "HubSpot", category: "CRM", src: "/logos/hubspot.svg", action: "merge", x: 31, y: 9, r: 4, s: 0.98 },
    { name: "Pipedrive", category: "CRM", src: "/logos/pipedrive.svg", action: "remove", x: 54, y: 17, r: -2, s: 0.94 },
    { name: "Slack", category: "Comms", src: "/logos/slack.svg", action: "keep", x: 77, y: 11, r: 3, s: 1.02 },
    { name: "Zoom", category: "Comms", src: "/logos/zoom.svg", action: "keep", x: 16, y: 42, r: 5, s: 0.96 },
    { name: "Asana", category: "PM", src: "/logos/asana.svg", action: "replace", x: 38, y: 40, r: -6, s: 1 },
    { name: "Monday", category: "PM", src: "/logos/monday.svg", action: "merge", x: 62, y: 43, r: 3, s: 1.05 },
    { name: "Notion", category: "Docs", src: "/logos/notion.svg", action: "keep", x: 84, y: 38, r: -4, s: 0.95 },
    { name: "Trello", category: "PM", src: "/logos/trello.svg", action: "remove", x: 24, y: 66, r: 4, s: 0.94 },
    { name: "Airtable", category: "Data", src: "/logos/airtable.svg", action: "replace", x: 47, y: 70, r: -3, s: 1.03 },
    { name: "QuickBooks", category: "Finance", src: "/logos/quickbooks.svg", action: "keep", x: 70, y: 67, r: 6, s: 0.98 },
    { name: "Expensify", category: "Finance", src: "/logos/expensify.svg", action: "merge", x: 88, y: 69, r: -5, s: 0.92 },
    { name: "Gusto", category: "Admin", src: "/logos/gusto.svg", action: "remove", x: 9, y: 76, r: -2, s: 0.9 },
    { name: "Zendesk", category: "Support", src: "/logos/zendesk.svg", action: "keep", x: 36, y: 84, r: 2, s: 0.96 },
    { name: "Intercom", category: "Support", src: "/logos/intercom.svg", action: "merge", x: 61, y: 84, r: -4, s: 0.92 },
    { name: "Zapier", category: "Automation", src: "/logos/zapier.svg", action: "replace", x: 82, y: 83, r: 5, s: 0.95 },
  ];
  return html`
    <div class="animation-card" data-stage="0" aria-label="DeSaaS pipeline animation">
      <div class="animation-stage">
        <div class="grid-glow"></div>
        ${saasLogos.map((logo, index) => {
          const { name, category, src, action, x, y, r, s } = logo;
          const auditX = Math.min(88, Math.max(8, x + (index % 2 === 0 ? 4 : -4)));
          const auditY = Math.min(80, Math.max(10, y + (index % 3 === 0 ? -6 : 5)));
          const pipeX = 14 + (index % 4) * 23;
          const pipeY = 48 + Math.floor(index / 4) * 7;
          const gridPositions = {
            Salesforce: [15, 22],
            HubSpot: [28, 22],
            Pipedrive: [41, 22],
            Slack: [59, 22],
            Zoom: [72, 22],
            Notion: [85, 22],
            Asana: [15, 45],
            Monday: [28, 45],
            Trello: [41, 45],
            Airtable: [59, 45],
            Zapier: [72, 45],
            QuickBooks: [15, 68],
            Expensify: [28, 68],
            Gusto: [41, 68],
            Zendesk: [59, 68],
            Intercom: [72, 68],
          };
          const finalPositions = {
            Salesforce: [18, 28],
            Slack: [78, 24],
            Zoom: [20, 72],
            Notion: [82, 70],
            QuickBooks: [50, 86],
            Zendesk: [50, 16],
          };
          const final = finalPositions[name] || [50, 50];
          const grid = gridPositions[name] || [50, 50];
          const decisions = { keep: "used feature", merge: "integrate", replace: "migrate data", remove: "cancel" };
          return `<div class="logo-tile" data-action="${action}" data-decision="${decisions[action]}" data-current-step="" data-name="${name}" data-category="${category}" style="--x:${x}%;--y:${y}%;--audit-x:${auditX}%;--audit-y:${auditY}%;--pipe-x:${pipeX}%;--pipe-y:${pipeY}%;--grid-x:${grid[0]}%;--grid-y:${grid[1]}%;--final-x:${final[0]}%;--final-y:${final[1]}%;--rotate:${r}deg;--scale:${s};--delay:${index * 0.035}s">
            <img src="${src}" alt="${name} logo" />
            <span>${category}</span>
          </div>`;
        }).join("")}
        <div class="category-grid" aria-hidden="true">
          <span style="--label-x:15%;--label-y:9%">Sales / Comms</span>
          <span style="--label-x:15%;--label-y:33%">Workflows / data</span>
          <span style="--label-x:15%;--label-y:56%">Finance / support</span>
        </div>
        <div class="owned-tile" style="--tx:50%;--ty:18%;--ti:0">Workflow</div>
        <div class="owned-tile" style="--tx:74%;--ty:34%;--ti:1">Finance</div>
        <div class="owned-tile" style="--tx:74%;--ty:66%;--ti:2">Customer<br>Success</div>
        <div class="owned-tile" style="--tx:26%;--ty:66%;--ti:3">Support</div>
        <div class="owned-tile" style="--tx:26%;--ty:34%;--ti:4">Sales</div>
        <div class="connector-lines" aria-hidden="true">
          <span class="line line-1"></span>
          <span class="line line-2"></span>
          <span class="line line-3"></span>
          <span class="line line-4"></span>
          <span class="line line-5"></span>
        </div>
        <div class="final-system">
          <div class="final-header">
            <div class="final-icon">De</div>
            <strong>Own your tools.</strong>
          </div>
        </div>
        <div class="process-log">
          <div class="process-dots"><span></span><span></span><span></span></div>
          <span id="process-log-text"></span>
        </div>
      </div>
      <div class="animation-topbar">
        <div class="animation-metrics">
          <div class="mini-metric"><span>Spend</span><strong id="spend-value">$42K/mo</strong></div>
          <div class="mini-metric"><span>Complexity</span><strong id="complexity-value">High</strong></div>
          <div class="mini-metric"><span>Security</span><strong id="security-value">Low</strong></div>
          <div class="mini-metric"><span>Productivity</span><strong id="productivity-value">Low</strong></div>
        </div>
      </div>
    </div>
  `;
}

function renderHome() {
  return pageShell(html`
    <section class="container hero">
      <div>
        <h1>De-clutter. De-stress. <span class="serif-accent">DeSaaS.</span></h1>
        <p class="lead">We help companies replace bloated subscriptions with simple, integrated tools — using only the features they actually need.</p>
        <p class="outcome-line">Own your tools.</p>
        ${ctaButtons()}
        <p class="microcopy">Start with the tools creating the most cost, clutter, and friction.</p>
      </div>
      ${pipelineAnimation()}
    </section>
    ${problemSection()}
    ${questionSection()}
    ${flywheelSection()}
    ${servicesSection()}
    ${calculatorSection(false)}
    ${securitySection()}
    ${comparisonSection()}
    ${insightsPreview()}
    ${finalCta()}
  `);
}

function previewCtas() {
  return html`
    <div class="actions">
      <a class="button primary" href="/estimator/">Find your first DeSaaS opportunity</a>
      <a class="button secondary" href="/audit.html">Start the stack audit</a>
    </div>
  `;
}

function renderNewHome() {
  return pageShell(html`
    <section class="container hero preview-hero">
      <div>
        <span class="eyebrow preview-label">Preview direction</span>
        <h1>Own your tools.</h1>
        <p class="lead">SaaS fees are just the start. The hidden cost is the complexity your team has to navigate every day.</p>
        <p class="outcome-line">Keep what works. Own the process around it.</p>
        ${previewCtas()}
        <p class="microcopy">Start with the tools, connections, and workflows creating the most operational drag.</p>
      </div>
      ${pipelineAnimation()}
    </section>
    ${hiddenCostSection()}
    ${connectionFrictionSection()}
    ${ownedSurfaceSection()}
    ${aiReadySection()}
    ${previewConversionSection()}
  `);
}

function hiddenCostSection() {
  const points = [
    ["Subscription cost", "The visible invoice: tools, seats, renewals, and features nobody uses."],
    ["Navigation cost", "The daily drag: switching dashboards, hunting for context, and remembering where work lives."],
    ["Movement cost", "The quiet tax: exporting, copying, reconciling, and re-entering data across systems."],
  ];
  return html`
    <section class="section">
      <div class="container preview-quote-grid">
        <figure class="preview-quote">
          <blockquote>“We overpay for SaaS twice: once for tools we do not need, and again for the complexity the team has to navigate.”</blockquote>
          <figcaption>Common buyer pain, not a customer testimonial</figcaption>
        </figure>
        <div>
          <span class="eyebrow">The hidden cost</span>
          <h2>Your team is paying for the stack and paying to work around it.</h2>
          <p class="lead">Context switching is friction. Moving data is friction. Every extra system adds decisions, permissions, training, reporting, and brittle handoffs.</p>
          <div class="preview-mini-grid">${points.map(([title, body]) => `<div class="card"><h3>${title}</h3><p>${body}</p></div>`).join("")}</div>
        </div>
      </div>
    </section>
  `;
}

function connectionFrictionSection() {
  const issues = [
    ["Context switching", "Teams spend time remembering which tool owns the latest truth."],
    ["Data movement", "Exports, imports, spreadsheet rollups, and manual cleanup become part of the job."],
    ["Brittle integrations", "Workflows depend on fragile links between platforms that were not designed around your process."],
    ["Duplicated reporting", "Leadership sees competing dashboards instead of one operating view."],
  ];
  return html`
    <section class="section security-band">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Cumbersome connections</span>
            <h2>There is no clean way to optimize a patchwork that struggles to talk to itself.</h2>
          </div>
          <p>The problem is not just how many tools you own. It is how much effort sits between them.</p>
        </div>
        <div class="connection-map" aria-label="Example of cumbersome tool connections">
          <div class="connection-lines" aria-hidden="true">
            <span class="connection-line line-a"></span>
            <span class="connection-line line-b"></span>
            <span class="connection-line line-c"></span>
            <span class="connection-line line-d"></span>
            <span class="connection-line line-e"></span>
            <span class="connection-line line-f"></span>
          </div>
          <div class="connection-node node-crm">CRM</div>
          <div class="connection-node node-chat">Chat</div>
          <div class="connection-node node-docs">Docs</div>
          <div class="connection-node node-bi">BI</div>
          <div class="connection-node node-forms">Forms</div>
          <div class="connection-node node-finance">Finance</div>
          <div class="connection-center">
            <span class="brand-mark">De</span>
            <strong>Owned operating surface</strong>
            <small>workflow, data, access, AI assist</small>
          </div>
        </div>
        <div class="grid four" style="margin-top: 1rem">${issues.map(card).join("")}</div>
      </div>
    </section>
  `;
}

function ownedSurfaceSection() {
  const steps = [
    ["Map what exists", "Find the workflows, features, data, and connections the business actually relies on."],
    ["Keep what works", "Do not replace good tools for sport. Keep essential systems and make their role clear."],
    ["Own the process", "Build the focused operating layer around how the company already works."],
    ["Change it when needed", "Because the surface is yours, it can evolve with the business instead of waiting on a vendor roadmap."],
  ];
  return html`
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Owned operating surface</span>
            <h2>All SaaS is essentially a workaround. What if you owned the process?</h2>
          </div>
          <p>A simple, safe, step-by-step transformation: the functions you need, configured around your business instead of a generic platform.</p>
        </div>
        <div class="process-list">${steps.map(([title, body]) => `<div class="process-item"><div><h3>${title}</h3><p>${body}</p></div></div>`).join("")}</div>
      </div>
    </section>
  `;
}

function aiReadySection() {
  const cards = [
    ["Unified context", "AI can work with cleaner inputs when workflow data is no longer scattered across disconnected destinations."],
    ["Narrow automation", "Start with specific tasks: summarize, route, draft, extract, reconcile, and alert with a human review path."],
    ["Controlled access", "A focused surface can limit what data each workflow needs and make ownership easier to understand."],
  ];
  return html`
    <section class="section">
      <div class="container ai-panel">
        <div>
          <span class="eyebrow">AI-ready operations</span>
          <h2>Your AI transformation starts after the mess is simplified.</h2>
          <p class="lead">Once the system is streamlined, AI can automate a larger portion of the process safely. With an AI-optimized surface, you are in control.</p>
        </div>
        <div class="grid three">${cards.map(card).join("")}</div>
      </div>
    </section>
  `;
}

function previewConversionSection() {
  return html`
    <section class="section final-band preview-final">
      <div class="container">
        <span class="eyebrow">Preview conversion path</span>
        <h2>Find the first workflow worth owning.</h2>
        <p class="lead">Use the estimator to size the opportunity, then start the stack audit so DeSaaS can map the tools, connections, reports, and verification work behind it.</p>
        ${previewCtas()}
      </div>
    </section>
  `;
}

function problemSection() {
  const cards = [
    ["Subscription creep", "Your stack keeps growing, but the value does not always follow."],
    ["Feature bloat", "You pay for entire platforms when your team only needs a few workflows."],
    ["Scattered operations", "Data, approvals, reports, and handoffs are spread across too many systems."],
    ["AI uncertainty", "You have heard about AI, but your team does not have time to make it practical."],
  ];
  return html`
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Too many tools. Too much spend. Too much friction.</h2>
          <p>Your team is juggling subscriptions, dashboards, handoffs, and features nobody uses. You know there has to be a simpler way — but building it yourself can feel risky, slow, or out of reach.</p>
        </div>
        <div class="grid four">${cards.map(card).join("")}</div>
      </div>
    </section>
  `;
}

function questionSection() {
  const questions = [
    "Interested in AI, but your engineering team says it is not ready — or they just do not have time to explore it?",
    "Worried an internal-tools project will turn into a time sink?",
    "Not sure your company is ready to replace a tool your team depends on?",
    "Concerned that custom systems could create security risks, maintenance headaches, or hidden vulnerabilities?",
  ];
  return html`
    <section class="section">
      <div class="container">
        <span class="eyebrow">Buyer questions</span>
        <h2>Sound familiar?</h2>
        <div class="grid four" style="margin-top: 2rem">
          ${questions.map(q => `<div class="card question-card"><p>${q}</p></div>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function flywheelSection() {
  const steps = [
    ["Spend less", "Find SaaS waste, overlap, and tools you can cancel or consolidate."],
    ["Simplify the stack", "Reduce logins, dashboards, handoffs, exports, and duplicated workflows."],
    ["Boost productivity", "Give teams cleaner tools that match how they actually work."],
    ["Build better systems", "Replace bloated subscriptions with focused tools, automations, and AI-enabled workflows."],
    ["Create capacity", "More time, clearer data, and less operational drag make improvement easier."],
  ];
  return html`
    <section class="section">
      <div class="container flywheel">
        <div>
          <span class="eyebrow">Compounding benefits</span>
          <h2>The benefits compound.</h2>
          <p class="lead">First you reduce software waste. Then your workflows get simpler. Then your team moves faster.</p>
        </div>
        <div>
          <div class="flywheel-visual" aria-hidden="true">
            <div class="flywheel-orbit">
              ${steps.map(([title], index) => `<span class="flywheel-node node-${index + 1}"><b>${index + 1}</b><em>${title}</em></span>`).join("")}
            </div>
            <div class="flywheel-center">DeSaaS<br />flywheel</div>
          </div>
          <div class="flywheel-list">${steps.map((s, i) => step(s, i)).join("")}</div>
        </div>
      </div>
    </section>
  `;
}

function servicesSection() {
  const services = [
    ["Audit", "We map your SaaS stack, costs, workflows, renewals, pain points, data flows, and tool overlap."],
    ["Replace", "We identify what to cancel, consolidate, rebuild, automate, renegotiate, or keep."],
    ["Integrate", "We build practical internal tools and AI-enabled workflows that connect the systems you actually need."],
  ];
  return html`
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>We simplify operations by replacing software bloat with focused tools.</h2>
        </div>
        <div class="grid three">${services.map(card).join("")}</div>
      </div>
    </section>
  `;
}

function calculatorSection(fullPage) {
  return html`
    <section class="section ${fullPage ? "" : "security-band"}">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Calculator</span>
            <h2>Find your first DeSaaS opportunity.</h2>
          </div>
          <p>Use the DeSaaS Calculator to see where you could save money, reduce clutter, and create more capacity in Month 1.</p>
        </div>
        <div class="calculator-panel">
          <form class="card" id="calculator-form">
            <div class="form-grid">
              ${field("monthlySpend", "Monthly SaaS spend", 42000)}
              ${field("toolCount", "Number of SaaS tools", 38)}
              ${field("employeeCount", "Number of employees", 120)}
              ${field("expensiveToolMonthlyCost", "Most expensive tool / mo", 8500)}
              ${field("annoyingToolMonthlyCost", "Most annoying tool / mo", 2200)}
              ${field("upcomingRenewals", "Renewals next 90 days", 5)}
              ${field("overlappingTools", "Overlapping tools", 7)}
            </div>
            <div class="actions">
              <button class="button primary" type="submit">Calculate your DeSaaS potential</button>
              ${fullPage ? '<a class="button secondary" href="/book-audit">Get my DeSaaS plan</a>' : '<a class="button secondary" href="/calculator">Open full calculator</a>'}
            </div>
          </form>
          <div class="card results" aria-live="polite">
            <p>Your first DeSaaS opportunity may be worth:</p>
            <div class="metric"><span>Estimated savings</span><strong id="savings-range">$3,734–$9,177/mo</strong></div>
            <div class="metric"><span>Simplicity opportunity score</span><strong id="simplicity-score">92/100</strong></div>
            <div class="metric"><span>Productivity upside</span><strong id="productivity-upside">High</strong></div>
            <p class="disclaimer">These are directional estimates, not guaranteed savings. The real opportunity depends on contracts, utilization, workflows, security needs, and implementation complexity.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function securitySection() {
  return html`
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Security confidence</span>
            <h2>Custom does not have to mean risky.</h2>
          </div>
          <p>Worried that replacing SaaS will create security problems, maintenance headaches, or hidden vulnerabilities?</p>
        </div>
        <div class="grid two">
          <div class="card">
            <p>That is exactly why we start with the workflow, the data, and the risk — before we build anything.</p>
            <p style="margin-top: 1rem">A bloated SaaS stack can create its own exposure: too many tools, too many permissions, too many vendors, and too much data scattered across systems.</p>
          </div>
          <div class="card">
            <h3>Less sprawl. Less exposure. More control.</h3>
            <p>DeSaaS helps you simplify safely, with focused tools designed around clear access, practical controls, maintainable architecture, and only the data each workflow actually needs.</p>
            <div class="actions"><a class="button secondary" href="/insights/is-custom-software-riskier-than-saas">Read: Is custom software actually riskier than SaaS?</a></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function comparisonSection() {
  const rows = [
    ["More subscriptions", "Fewer dependencies"],
    ["More features", "Only what you use"],
    ["More vendor lock-in", "More control"],
    ["Generic workflows", "Tools built around your operations"],
    ["Ongoing licenses", "Focused implementation and handoff"],
  ];
  return html`
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Different by design</span>
            <h2>We are not here to create another dependency.</h2>
          </div>
          <p>We help you build simpler systems your team can own, understand, and operate. Honestly, we would be happiest if we did our job so well that you never needed us again.</p>
        </div>
        <table class="comparison">
          <thead><tr><th>Traditional SaaS</th><th>DeSaaS</th></tr></thead>
          <tbody>${rows.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function insightsPreview() {
  return html`
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="eyebrow">Insights</span>
            <h2>Thinking through the shift?</h2>
          </div>
          <p>A few practical guides on SaaS sprawl, internal tools, AI, security, and where to start.</p>
        </div>
        ${articleGrid()}
      </div>
    </section>
  `;
}

function finalCta() {
  return html`
    <section class="section final-band">
      <div class="container">
        <span class="eyebrow">Start simply</span>
        <h2>Ready to simplify your stack?</h2>
        <p class="lead">Let us find the software you do not need — and design the tools you actually do.</p>
        <div class="actions"><a class="button primary" href="/calculator">Find your first DeSaaS opportunity</a></div>
      </div>
    </section>
  `;
}

function renderHowItWorks() {
  const steps = [
    ["Map the stack", "We gather subscriptions, costs, renewals, users, workflows, data flows, pain points, and vendor dependencies."],
    ["Find the first opportunity", "We identify where cost, clutter, risk, and workflow friction overlap so the first move is practical."],
    ["Choose the right action", "Cancel, consolidate, replace, automate, renegotiate, or keep. The recommendation is tied to business value, not novelty."],
    ["Build and hand off", "When replacement makes sense, we build focused tools and AI-enabled workflows with documentation, access controls, and ownership."],
  ];
  return pageShell(html`
    <section class="container article">
      <span class="eyebrow">How it works</span>
      <h1>A safe, practical way to reduce software sprawl.</h1>
      <p class="lead">DeSaaS starts with the mess you already have, then turns it into a clear sequence of decisions and simple systems.</p>
      <div class="process-list">${steps.map(([title, body]) => `<div class="process-item"><div><h3>${title}</h3><p>${body}</p></div></div>`).join("")}</div>
      ${ctaButtons()}
    </section>
  `);
}

function renderUseCases() {
  const useCases = [
    ["CRM cleanup", "Replace tangled pipeline admin, duplicate fields, and manual reporting with a focused sales operating layer."],
    ["Operations approvals", "Turn email and spreadsheet approvals into clear workflows with status, reminders, and audit trails."],
    ["AI-assisted support triage", "Summarize inbound issues, route them to the right owner, and draft internal next steps."],
    ["Finance renewal cockpit", "Track contracts, renewals, utilization, owners, and renegotiation opportunities in one calm view."],
    ["Reporting consolidation", "Connect the few metrics that matter instead of exporting half the stack every Friday."],
    ["Internal knowledge search", "Give teams a structured way to find policies, playbooks, and historical context without adding another destination."],
  ];
  return pageShell(html`
    <section class="container article">
      <span class="eyebrow">Use cases</span>
      <h1>Concrete places to replace bloat with fit.</h1>
      <p class="lead">The best first DeSaaS projects are narrow, visible, and close to a real workflow.</p>
      <div style="margin-top: 2.5rem" class="grid two">
        ${useCases.map(([title, body]) => `<div class="card use-case"><h3>${title}</h3><p>${body}</p></div>`).join("")}
      </div>
      ${ctaButtons()}
    </section>
  `);
}

function renderInsights() {
  return pageShell(html`
    <section class="container article">
      <span class="eyebrow">Insights</span>
      <h1>Practical notes on simplifying software sprawl.</h1>
      <p class="lead">Guides for teams thinking through SaaS waste, internal tools, AI workflows, and safer ways to start.</p>
      <div style="margin-top: 2.5rem">${articleGrid()}</div>
    </section>
  `);
}

function renderArticle(article) {
  return pageShell(html`
    <article class="container article">
      <span class="eyebrow">${article.kicker}</span>
      <h1>${article.title}</h1>
      <p class="lead">${article.intro}</p>
      <div class="article-body">
        <div class="article-callout">${article.callout}</div>
        ${article.sections.map(([title, body]) => `<h2>${title}</h2><p>${body}</p>`).join("")}
      </div>
      <div class="actions"><a class="button primary" href="/calculator">Find your first DeSaaS opportunity</a><a class="button secondary" href="/insights">Back to insights</a></div>
    </article>
  `);
}

function renderCalculatorPage() {
  return pageShell(html`
    <section class="container article" style="padding-bottom: 0">
      <span class="eyebrow">DeSaaS Calculator</span>
      <h1>Estimate the first opportunity hiding in your stack.</h1>
      <p class="lead">This is a conservative directional model. It is designed to start a better conversation, not promise a magic savings number.</p>
    </section>
    ${calculatorSection(true)}
  `);
}

function renderBookAudit() {
  return pageShell(html`
    <section class="container article">
      <span class="eyebrow">Book audit</span>
      <h1>Let us find the software you do not need.</h1>
      <p class="lead">Share a little context and DeSaaS will help identify the first practical place to simplify.</p>
      <div class="booking-card" style="margin-top: 2.5rem">
        <form class="card">
          <div class="form-grid">
            <div class="field"><label for="name">Name</label><input id="name" name="name" autocomplete="name" /></div>
            <div class="field"><label for="email">Work email</label><input id="email" name="email" type="email" autocomplete="email" /></div>
            <div class="field"><label for="company">Company</label><input id="company" name="company" autocomplete="organization" /></div>
            <div class="field"><label for="spend">Approx. monthly SaaS spend</label><input id="spend" name="spend" placeholder="$42,000" /></div>
          </div>
          <div class="field" style="margin-top: 1rem"><label for="message">What feels messiest right now?</label><textarea id="message" name="message"></textarea></div>
          <div class="actions"><button class="button primary" type="button">Request a SaaS Audit</button></div>
          <p class="disclaimer">Form wiring is ready for your booking or CRM endpoint. Replace this button action with Calendly, SavvyCal, or your preferred intake flow.</p>
        </form>
        <div class="card">
          <h3>What the audit looks for</h3>
          <p style="margin-top: 1rem">Spend concentration, duplicate tools, upcoming renewals, fragile workflows, spreadsheet workarounds, AI candidates, permissions, data movement, and the fastest low-risk replacement opportunity.</p>
          <div class="article-callout">Start with cost, clutter, and friction. Build only where the workflow justifies it.</div>
        </div>
      </div>
    </section>
  `);
}

function renderPrivacy() {
  return pageShell(html`
    <section class="container article">
      <span class="eyebrow">Privacy</span>
      <h1>Privacy</h1>
      <p class="lead">DeSaaS should collect only the information needed to understand your stack, respond to your request, and deliver the work you ask for.</p>
      <div class="article-body"><p>Connect this page to your final legal policy before launch.</p></div>
    </section>
  `);
}

function card([title, body]) {
  return `<div class="card"><h3>${title}</h3><p>${body}</p></div>`;
}

function step([title, body], index) {
  return `<div class="flywheel-step" style="--step-index:${index}"><div class="step-number">${index + 1}</div><div><h3>${title}</h3><p>${body}</p></div></div>`;
}

function field(id, label, value) {
  return `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="number" min="0" value="${value}" /></div>`;
}

function articleGrid() {
  return `<div class="grid three">${Object.entries(articles).map(([href, article]) => `
    <a class="card insight-card" href="${href}">
      <span class="meta">${article.kicker}</span>
      <h3>${article.title}</h3>
      <p>${article.intro}</p>
    </a>
  `).join("")}</div>`;
}

function estimateDeSaaSPotential(input) {
  const wasteRateLow = 0.08;
  const wasteRateHigh = 0.18;
  const overlapFactor = Math.min(input.overlappingTools / Math.max(input.toolCount, 1), 0.35);
  const renewalFactor = Math.min(input.upcomingRenewals * 0.01, 0.05);
  const adjustedLow = wasteRateLow + overlapFactor * 0.12;
  const adjustedHigh = wasteRateHigh + overlapFactor * 0.18 + renewalFactor;
  const monthlySavingsLow = Math.round(input.monthlySpend * adjustedLow);
  const monthlySavingsHigh = Math.round(input.monthlySpend * adjustedHigh);
  const simplicityScore = Math.min(100, Math.round(35 + input.toolCount * 0.9 + input.overlappingTools * 3));
  const productivityUpside = input.toolCount > 25 || input.overlappingTools > 5 ? "High" : input.toolCount > 12 ? "Medium" : "Emerging";
  return { monthlySavingsLow, monthlySavingsHigh, simplicityScore, productivityUpside };
}

function wireCalculator() {
  const form = document.querySelector("#calculator-form");
  if (!form) return;
  const update = () => {
    const data = Object.fromEntries(new FormData(form));
    const input = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, Number(value) || 0]));
    const result = estimateDeSaaSPotential(input);
    document.querySelector("#savings-range").textContent = `$${result.monthlySavingsLow.toLocaleString()}–$${result.monthlySavingsHigh.toLocaleString()}/mo`;
    document.querySelector("#simplicity-score").textContent = `${result.simplicityScore}/100`;
    document.querySelector("#productivity-upside").textContent = result.productivityUpside;
  };
  form.addEventListener("input", update);
  form.addEventListener("submit", event => {
    event.preventDefault();
    update();
  });
  update();
}

function wireAnimation() {
  const card = document.querySelector(".animation-card");
  if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const tiles = [...card.querySelectorAll(".logo-tile")];
  const logText = card.querySelector("#process-log-text");

  const mergeBatch = tiles.filter(t => t.dataset.action === "merge");
  const replaceBatch = tiles.filter(t => t.dataset.action === "replace");
  const removeBatch = tiles.filter(t => t.dataset.action === "remove");
  const keepBatch = tiles.filter(t => t.dataset.action === "keep");

  const reset = () => {
    clearAnimationTimers();
    card.dataset.stage = "0";
    card.dataset.mode = "sprawl";
    tiles.forEach(tile => tile.classList.remove("is-processing", "is-processed"));
    if (logText) logText.textContent = "";
    setSpend(42000);
    setMetric("#complexity-value", "High");
    setMetric("#security-value", "Low");
    setMetric("#productivity-value", "Low");
  };

  const schedule = (fn, delay) => {
    const timer = setTimeout(fn, delay);
    processTimers.push(timer);
  };

  const processBatch = (batch, label, startTime, endTime) => {
    schedule(() => {
      if (logText) logText.textContent = label;
      batch.forEach(tile => {
        tile.classList.remove("is-processed");
        tile.classList.add("is-processing");
      });
    }, startTime);
    schedule(() => {
      batch.forEach(tile => {
        tile.classList.remove("is-processing");
        tile.classList.add("is-processed");
      });
    }, endTime);
  };

  const run = () => {
    reset();

    schedule(() => {
      card.dataset.stage = "1";
      card.dataset.mode = "sort";
    }, 2000);

    schedule(() => {
      card.dataset.stage = "2";
      card.dataset.mode = "process";
    }, 5000);

    processBatch(mergeBatch, "Auditing workflow", 6800, 9400);
    schedule(() => {
      setSpend(37000);
      setMetric("#complexity-value", "Med");
    }, 9700);

    processBatch(replaceBatch, "Migrating data", 11200, 13700);
    schedule(() => {
      setSpend(32000);
      setMetric("#productivity-value", "Med");
    }, 14000);

    processBatch(removeBatch, "Canceling subscriptions", 15400, 17700);
    schedule(() => {
      setSpend(28500);
      setMetric("#security-value", "Med");
    }, 18000);

    processBatch(keepBatch, "Consolidating stack", 19400, 21300);
    schedule(() => {
      setSpend(27500);
    }, 21600);

    schedule(() => {
      card.dataset.stage = "3";
      card.dataset.mode = "owned";
      if (logText) logText.textContent = "";
      setMetric("#complexity-value", "Low");
      setMetric("#security-value", "High");
      setMetric("#productivity-value", "High");
    }, 23000);

    schedule(() => {
      card.dataset.mode = "calm";
    }, 25200);

    schedule(run, 34000);
  };

  run();
}

function clearAnimationTimers() {
  processTimers.forEach(clearTimeout);
  processTimers = [];
  clearInterval(spendTimer);
}

function setSpend(value) {
  clearInterval(spendTimer);
  const el = document.querySelector("#spend-value");
  if (el) el.textContent = value >= 10000 ? `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K/mo` : `$${value.toLocaleString()}/mo`;
}

function setMetric(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = String(value);
}

function animateSpend(target) {
  const el = document.querySelector("#spend-value");
  if (!el) return;
  clearInterval(spendTimer);
  const start = parseSpendValue(el.textContent) || 42000;
  const frames = 36;
  let frame = 0;
  spendTimer = setInterval(() => {
    frame += 1;
    const progress = frame / frames;
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const value = Math.round(start + (target - start) * eased);
    el.textContent = value >= 10000 ? `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K/mo` : `$${value.toLocaleString()}/mo`;
    if (frame >= frames) clearInterval(spendTimer);
  }, 32);
}

function parseSpendValue(value) {
  const normalized = value.replace(/[$,/mo]/g, "").trim();
  if (normalized.toLowerCase().includes("k")) {
    return Number(normalized.toLowerCase().replace("k", "")) * 1000;
  }
  return Number(normalized.replace(/[^0-9.]/g, ""));
}

function wireMenu() {
  const nav = document.querySelector(".nav");
  const button = document.querySelector(".menu-button");
  button?.addEventListener("click", () => {
    const open = nav.dataset.open === "true";
    nav.dataset.open = String(!open);
    button.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  });
}

function render() {
  clearInterval(animationTimer);
  clearInterval(spendTimer);
  clearAnimationTimers();
  const current = routePath();
  if (articles[current]) {
    app.innerHTML = renderArticle(articles[current]);
    const article = articles[current];
    updateMeta(`${article.title} | DeSaaS`, article.intro);
  } else if (current === "/privacy") {
    app.innerHTML = renderPrivacy();
    updateMeta("Privacy Policy | DeSaaS", "DeSaaS collects only the information needed to understand your stack, respond to your request, and deliver the work you ask for.");
  } else {
    app.innerHTML = (routes[current] || renderHome)();
    const meta = pageMeta[current] || pageMeta["/"];
    updateMeta(meta.title, meta.description);
  }
  wireMenu();
  wireCalculator();
  wireAnimation();
}

window.addEventListener("popstate", render);
document.addEventListener("click", navigate);
render();
