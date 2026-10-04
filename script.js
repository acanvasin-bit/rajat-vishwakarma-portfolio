const content = window.PORTFOLIO_CONTENT;

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function applyProfile(profile) {
  document.title = `${profile.name} — Documentary filmmaker`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", profile.tagline);
  document.querySelectorAll(".wordmark").forEach((mark) => {
    mark.firstChild.nodeValue = profile.initials;
    mark.setAttribute("aria-label", `${profile.name} home`);
  });
  document.querySelectorAll("[data-profile-name]").forEach((element) => { element.textContent = profile.name; });
  document.querySelectorAll("[data-profile-initials]").forEach((element) => { element.textContent = `${profile.initials}—`; });
  document.querySelectorAll("[data-profile-tagline]").forEach((element) => { element.textContent = profile.tagline; });
  document.querySelectorAll("[data-profile-about]").forEach((element) => { element.textContent = profile.about; });
  document.querySelectorAll("[data-profile-location]").forEach((element) => { element.textContent = profile.location; });
  document.querySelectorAll("[data-profile-footer-name]").forEach((element) => { element.textContent = profile.name.toUpperCase(); });
  document.querySelectorAll("[data-profile-email]").forEach((element) => { element.textContent = profile.email; });
  document.querySelectorAll("[data-profile-email-link]").forEach((element) => { element.href = `mailto:${profile.email}`; });
  document.querySelectorAll("[data-profile-instagram]").forEach((element) => { element.href = profile.instagram; });
}

function renderProjects(projects) {
  const grid = document.querySelector('[data-render="projects"]');
  if (!grid) return;

  grid.innerHTML = projects.map((project, index) => {
    const classes = ["project", project.featured && "project-large", project.wide && "project-wide"].filter(Boolean).join(" ");
    const poster = project.poster
      ? `<div class="project-image instagram-art ${escapeHTML(project.poster)}"><span class="ig-label">${escapeHTML(project.posterLabel || "INSTAGRAM")}</span><span class="project-number">${String(index + 1).padStart(2, "0")}</span><span class="ig-title">${project.posterTitle.split("|").map(escapeHTML).join("<br>").replace(/\.$/, "<span>.</span>")}</span><span class="play">↗</span></div>`
      : `<div class="project-image"><img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.alt || project.title)}" loading="lazy" decoding="async"><span class="play">▶</span><span class="project-number">${String(index + 1).padStart(2, "0")}</span>${project.tag ? `<span class="project-tag">${escapeHTML(project.tag)}</span>` : ""}</div>`;
    return `<a class="${classes}" href="${escapeHTML(project.url)}" target="_blank" rel="noreferrer" aria-label="${escapeHTML(project.title)} — ${escapeHTML(project.category)}">${poster}<div class="project-info"><div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.category)}</p></div><span class="project-arrow">↗</span></div></a>`;
  }).join("");
}

function renderFrames(frames) {
  const grid = document.querySelector('[data-render="frames"]');
  if (!grid) return;

  grid.innerHTML = frames.map((frame, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `<a class="frame-card frame-${["one", "two", "three", "four", "five", "six", "seven"][index] || "extra"}" href="${escapeHTML(frame.image)}" target="_blank" rel="noreferrer" aria-label="Open full image: ${escapeHTML(frame.caption)}"><img src="${escapeHTML(frame.image)}" alt="${escapeHTML(frame.alt)}" loading="lazy" decoding="async"><span class="frame-caption"><span>${number}</span> ${escapeHTML(frame.caption)}</span></a>`;
  }).join("");
}

function renderClients(clients) {
  const grid = document.querySelector('[data-render="clients"]');
  if (!grid) return;

  grid.innerHTML = clients.map((client, index) => {
    const layout = client.layout ? ` client-${escapeHTML(client.layout)}` : "";
    const links = client.links.map((link) => `<a href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">${escapeHTML(link.label)} <span>↗</span></a>`).join("");
    return `<article class="client-card${layout}"><div class="client-top"><span class="client-index">${String(index + 1).padStart(2, "0")} / CLIENT</span><span class="client-symbol">${escapeHTML(client.initials)}<span>—</span></span></div><p class="eyebrow">${escapeHTML(client.role)}</p><h3>${escapeHTML(client.name)}</h3><p class="client-description">${escapeHTML(client.description)}</p><div class="client-links">${links}</div></article>`;
  }).join("");
}

applyProfile(content.profile);
renderProjects(content.projects);
renderFrames(content.frames);
renderClients(content.clients);

const revealTargets = document.querySelectorAll(".project, .about-copy, .service-list > div, .client-card");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add("will-reveal");
    observer.observe(target);
  });
}
