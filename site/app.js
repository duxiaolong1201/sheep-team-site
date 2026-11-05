(() => {
  "use strict";
  const D = window.TEAM;
  const site = D.site || {
    name: {
      zh: "肉羊智能育种团队",
      en: "Intelligent Breeding of Meat Sheep Team",
    },
    mission: {
      zh: "解析绵羊多组学调控与细胞水平功能，为肉羊精准育种提供科学基础。",
      en: "Deciphering multi-omic regulation and cellular function in sheep to advance precision breeding.",
    },
    affiliation: {
      zh: "中国农业科学院北京畜牧兽医研究所",
      en: "Institute of Animal Science, Chinese Academy of Agricultural Sciences",
    },
    email: "zhypan01@163.com",
    brand: { zh: "肉羊智能育种团队", en: "Meat Sheep Breeding Team" },
    tagline: {
      zh: "绵羊多组学与细胞功能",
      en: "Multi-omics & cellular function",
    },
    heroTitle: {
      zh: "肉羊智能\n育种团队",
      en: "Sheep science.\nPrecision breeding.",
    },
    location: { zh: "中国 · 北京", en: "Beijing, China" },
    aboutText: { zh: "", en: "" },
  };
  const joining = D.join || {
    title: {
      zh: "让好问题，\n遇见同行的人。",
      en: "Good questions.\nShared curiosity.",
    },
    subtitle: {
      zh: "招生咨询、学术交流与研究合作",
      en: "Study enquiries, scientific exchange and research collaboration",
    },
    studyTitle: { zh: "研究与学习", en: "Research & learning" },
    studyText: {
      zh: "如果你对动物遗传育种、生物信息学、多组学或单细胞研究感兴趣，欢迎向我们介绍你的研究经历与兴趣。",
      en: "If you are interested in animal genetics, bioinformatics, multi-omics or single-cell research, tell us about your experience and research interests.",
    },
    studyNote: {
      zh: "具体招生与招聘安排以研究所正式通知为准。",
      en: "Admissions and employment opportunities are subject to official institute announcements.",
    },
    collaborationTitle: { zh: "交流与合作", en: "Exchange & collaboration" },
    collaborationText: {
      zh: "欢迎围绕绵羊功能基因组、遗传调控、单细胞图谱与重要性状开展学术交流，讨论数据资源和研究合作。",
      en: "We welcome discussions on sheep functional genomics, genetic regulation, single-cell atlases and key traits, including data resources and research collaboration.",
    },
    bandTitle: {
      zh: "一起探索，向育种实践迈进。",
      en: "Explore together. Advance sheep breeding.",
    },
    bandText: {
      zh: "欢迎关注动物遗传育种、多组学与单细胞研究的同学和同行与我们交流。",
      en: "Connect with us on animal genetics, multi-omics and single-cell research.",
    },
    contactName: { zh: "", en: "" },
  };
  const routes = ["home", "research", "people", "resources", "news", "join"];
  const labels = {
    zh: ["首页", "研究方向", "团队成员", "成果与资源", "团队动态", "加入我们"],
    en: [
      "Home",
      "Research",
      "People",
      "Publications & Resources",
      "News",
      "Join Us",
    ],
  };
  let lang = "en",
    route = "home";
  const t = (value) =>
    value && typeof value === "object"
      ? value[lang] || value.zh || ""
      : value || "";
  const e = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const say = (zh, en) => (lang === "zh" ? zh : en);
  const href = (page) => `#/${lang}/${page}`;
  const external = (url, label, cls = "text-link") =>
    `<a class="${cls}" href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)}<span class="external" aria-hidden="true">↗</span><span class="sr-only">${say("（新窗口）", " (opens in a new tab)")}</span></a>`;
  const internal = (page, label, cls = "text-link") =>
    `<a class="${cls}" href="${href(page)}">${label}</a>`;
  const heading = (title, text = "") =>
    `<div class="page-heading"><h1>${title}</h1>${text ? `<p>${text}</p>` : ""}</div>`;
  const scienceArt = window.SheepScience.art;
  const startScienceMotion = () => window.SheepScience.mount(say);
  const researchItems = () =>
    D.research
      .map(
        (r) =>
          `<article class="research-item" id="${e(r.id)}">${r.illustration === "none" ? "" : scienceArt(r.illustration || r.id)}<h3>${e(t(r.title))}</h3><p>${e(t(r.text))}</p><div class="keywords">${t(
            r.tags,
          )
            .map((tag) => `<span>${e(tag)}</span>`)
            .join(
              "",
            )}</div>${r.resource ? external(r.resource, say("访问资源平台", "Visit resource portal")) : ""}</article>`,
      )
      .join("");
  const leader = D.pi || {
    name: { zh: "潘章源", en: "Zhangyuan Pan" },
    role: {
      zh: "研究员 · 动物遗传育种",
      en: "Researcher in animal genetics and breeding",
    },
    bio: {
      zh: "主要从事家养动物基因组表观调控研究，结合多组学分析与功能研究，探索遗传变异、基因调控与重要性状之间的联系。",
      en: "Studies epigenomic regulation in domestic animals, combining multi-omic analysis and functional research to investigate genetic variation, gene regulation and important traits.",
    },
    photo: null,
    url: "https://ias.caas.cn/publish/bjxmsyyjs2024/rcdw/jczj/gjyxqnjjhdz/903aeaa7df0b41abb8c1e7774f53a35a.htm",
  };
  const pi = () =>
    `<article class="pi"><div class="pi-visual">${leader.photo ? `<img src="${e(leader.photo)}" alt="${e(t(leader.name))}">` : '<span aria-hidden="true">PI</span>'}<span class="pi-role">${say("团队负责人", "Principal investigator")}</span></div><div class="pi-copy"><h3>${e(t(leader.name))}</h3><p class="pi-title">${e(t(leader.role))}</p><p>${e(t(leader.bio))}</p>${leader.url ? external(leader.url, say("查看个人主页", "Profile website")) : ""}</div></article>`;
  const illustration = (p) =>
    p.photo
      ? `<a class="publication-illustration" href="${e(p.photo)}" target="_blank" rel="noopener"><img src="${e(p.photo)}" alt="${e(t(p.title || p.name))}" loading="lazy"><span>${say("查看大图", "View full image")}</span></a>`
      : "";
  const papers = (featured = false) =>
    `<div class="papers">${D.publications
      .filter((p) => !featured || p.featured)
      .map(
        (p) =>
          `<article class="paper"><div class="paper-year">${e(p.year)}</div><div><div class="paper-meta"><span>${e(p.journal)}</span>${p.status === "preprint" ? `<span class="status">${say("预印本", "Preprint")}</span>` : ""}</div><h3>${p.url ? external(p.url, t(p.title), "paper-title") : e(t(p.title))}</h3><p class="authors">${e(p.authors)}</p>${illustration(p)}</div></article>`,
      )
      .join("")}</div>`;
  const resourceItems = (featured = false) =>
    (D.resources || [])
      .filter((r) => !featured || r.featured)
      .map(
        (r) =>
          `<div class="resource-strip">${scienceArt("gtex", "resource-science")}<div><h3>${e(t(r.name))}</h3><p>${e(t(r.text))}</p>${illustration(r)}</div>${r.url ? external(r.url, say("访问资源平台", "Visit resource portal"), "button outline") : ""}</div>`,
      )
      .join("");
  const newsItems = () =>
    `<div class="news-list">${D.news.map((n) => `<article class="news-item"><div class="news-kind">${e(t(n.kind))}</div><div><h3>${e(t(n.title))}</h3>${n.photo ? `<img class="news-cover" src="${e(n.photo)}" alt="${e(t(n.title))}" loading="lazy">` : ""}<p>${e(t(n.text))}</p>${n.body && t(n.body) ? `<details class="news-body"><summary>${say("阅读全文", "Read more")}</summary><p>${e(t(n.body))}</p></details>` : ""}${n.url ? external(n.url, say("访问网站", "Visit website")) : ""}</div>${n.date ? `<time>${e(n.date)}</time>` : ""}</article>`).join("")}</div>`;
  const joinBand = () =>
    `<section class="join-band">${scienceArt("dna", "join-science")}<div class="wrap join-inner"><div><h2>${e(t(joining.bandTitle))}</h2><p>${e(t(joining.bandText))}</p></div>${internal("join", say("加入与合作", "Join & collaborate"), "button light")}</div></section>`;
  function home() {
    return `<section class="hero">${scienceArt("dna", "hero-science")}<div class="wrap hero-inner"><div class="hero-copy"><p class="affiliation">${e(t(D.affiliation))}</p><h1>${e(t(site.heroTitle)).replace(/\n/g, "<br>")}</h1><p class="mission">${e(t(D.mission))}</p><div class="hero-actions">${internal("people", say("认识我们的团队", "Meet the team"), "button")}${internal("research", say("探索研究方向", "Explore our research"))}</div></div><figure class="hero-photo"><img src="assets/sheep.jpg" alt="${say("草地上的羊群，研究对象示意照片", "A flock of sheep in a pasture; illustrative photograph")}" fetchpriority="high" width="1200" height="900"><figcaption>${say("从绵羊出发，理解生命的调控。", "Understanding the biology behind sheep breeding.")}</figcaption></figure></div></section>
    <section class="section wrap about"><div class="section-intro"><h2>${say("我们是谁", "Who we are")}</h2><p>${say("从基因组到细胞，<br>连接发现与育种。", "From genomes to cells,<br>connecting discovery with breeding.")}</p>${internal("people", say("了解团队", "About the team"))}</div><div class="about-body"><p class="lead">${t(site.aboutText) ? e(t(site.aboutText)) : say(`我们是由${e(leader.name.zh)}带领的${e(t(D.name))}，关注绵羊多组学调控与细胞水平功能，致力于为肉羊精准育种提供科学基础。`, `Led by ${e(leader.name.en)}, our team investigates multi-omic regulation and cellular function in sheep, building a scientific foundation for precision breeding.`)}</p>${pi()}</div></section>
    <section class="research-section"><div class="wrap section"><div class="section-top"><div><h2>${say("研究方向", "Our research")}</h2><p>${say("在不同生物学尺度上，理解绵羊的遗传与功能。", "Understanding sheep genetics and function across biological scales.")}</p></div>${internal("research", say("查看研究方向", "Explore research"))}</div><div class="research-grid">${researchItems()}</div></div></section>
    <section class="section wrap"><div class="section-top"><div><h2>${say("成果与资源", "Publications & resources")}</h2><p>${say("让科学发现成为可阅读、可探索、可使用的资源。", "Research to read, explore and build upon.")}</p></div>${internal("resources", say("查看全部", "View all"))}</div>${papers(true)}${resourceItems(true)}</section>
    <section class="section wrap news-section"><div class="section-top"><h2>${say("团队动态", "From the team")}</h2>${internal("news", say("全部动态", "All updates"))}</div>${newsItems()}</section>${joinBand()}`;
  }
  function people() {
    const members = (list, group) =>
      list
        .map(
          (m, index) =>
            `<article class="member">${memberPortrait(m)}<h3>${e(t(m.name))}</h3><p class="pi-title">${e(t(m.role))}</p><p class="member-excerpt">${e(t(m.bio))}</p><button type="button" class="member-more" data-member="${group}:${index}" aria-haspopup="dialog">${say("查看完整介绍", "View full profile")}<span class="sr-only"> — ${e(t(m.name))}</span></button></article>`,
        )
        .join("");
    return `<div class="wrap page">${heading(say("一起提出问题，<br>一起寻找答案。", "Asking questions.<br>Finding answers together."), say("认识" + e(t(D.name)), "Meet the team"))}<section class="people-intro"><h2>${say("团队负责人", "Principal investigator")}</h2>${pi()}</section><section class="member-section"><h2>${say("团队成员", "Team members")}</h2>${D.members.length ? `<div class="member-grid">${members(D.members, "members")}</div>` : `<p>${say("成员介绍正在整理，将陆续更新。欢迎通过邮件了解团队与研究机会。", "Member profiles will be added as they become available. Contact us to learn about the team and research opportunities.")}</p>`}</section>${D.alumni.length ? `<section class="member-section"><h2>${say("毕业成员", "Alumni")}</h2><div class="member-grid">${members(D.alumni, "alumni")}</div></section>` : ""}</div><dialog class="member-dialog" id="member-dialog" aria-labelledby="member-dialog-name"><div class="member-dialog-toolbar"><button type="button" class="member-dialog-close" id="member-dialog-close">${say("关闭", "Close")} <span aria-hidden="true">×</span></button></div><div id="member-dialog-content"></div></dialog>${joinBand()}`;
  }
  function memberPortrait(member) {
    return member.photo
      ? `<img class="member-photo" src="${e(member.photo)}" alt="${e(t(member.name))}" loading="lazy">`
      : `<span class="member-photo member-photo-placeholder" aria-hidden="true">${e(Array.from(t(member.name).trim())[0] || "")}</span>`;
  }
  let closeMemberProfile = () => {};
  function mountMemberProfiles() {
    const dialog = document.getElementById("member-dialog");
    let opener;
    const restore = () => {
      document.documentElement.classList.toggle("profile-open", false);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
      opener = null;
    };
    closeMemberProfile = () => {
      if (dialog.open) dialog.close();
      restore();
    };
    dialog.addEventListener("close", () => {
      if (!dialog.open) restore();
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      dialog.close();
      restore();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        document.getElementById("member-dialog-close").focus();
      }
    });
    document
      .getElementById("member-dialog-close")
      .addEventListener("click", closeMemberProfile);
    document
      .getElementById("main")
      .addEventListener("click", openMemberProfile);
    function openMemberProfile(event) {
      const button = event.target.closest("[data-member]");
      if (!button) return;
      const [group, index] = button.dataset.member.split(":");
      const member = D[group]?.[Number(index)];
      if (!member) return;
      opener = button;
      document.getElementById("member-dialog-content").innerHTML =
        `${memberPortrait(member)}<h2 id="member-dialog-name" tabindex="-1">${e(t(member.name))}</h2><p class="pi-title">${e(t(member.role))}</p><p class="member-full-bio">${e(t(member.bio))}</p>`;
      dialog.showModal();
      document.documentElement.classList.toggle("profile-open", true);
      dialog.scrollTop = 0;
      document
        .getElementById("member-dialog-name")
        .focus({ preventScroll: true });
    }
    // Remove the delegated listener when a route or language change replaces the page.
    const close = closeMemberProfile;
    closeMemberProfile = () => {
      close();
      document
        .getElementById("main")
        .removeEventListener("click", openMemberProfile);
      closeMemberProfile = () => {};
    };
  }
  function resources() {
    return `<div class="wrap page">${heading(say("成果与资源", "Publications & resources"), say("研究论文与开放资源，共同构成我们的科学积累。", "Research publications and open resources from our work."))}<section><h2>${say("资源平台", "Resource platforms")}</h2>${resourceItems()}</section><section class="publication-section"><h2>${say("代表论文", "Selected publications")}</h2>${papers()}</section></div>`;
  }
  function join() {
    return `<div class="wrap page">${heading(e(t(joining.title)).replace(/\n/g, "<br>"), e(t(joining.subtitle)))}<div class="join-grid"><section><h2>${e(t(joining.studyTitle))}</h2><p>${e(t(joining.studyText))}</p><p>${e(t(joining.studyNote))}</p></section><section><h2>${e(t(joining.collaborationTitle))}</h2><p>${e(t(joining.collaborationText))}</p></section></div><section class="contact"><h2>${say("联系我们", "Contact us")}</h2><p>${e(t(joining.contactName) || t(leader.name))}</p><a class="contact-email" href="mailto:${e(D.email)}">${e(D.email)}</a><p>${e(t(D.affiliation))}</p></section></div>`;
  }
  function render() {
    closeMemberProfile();
    const oldRoute = route;
    const bits = location.hash.match(
      /^#\/(zh|en)\/(home|research|people|resources|news|join)$/,
    );
    if (bits) {
      lang = bits[1];
      route = bits[2];
    } else {
      lang = "en";
      try {
        lang =
          localStorage.getItem("sheep-team-language") === "zh" ? "zh" : "en";
      } catch {}
      route = "home";
      history.replaceState(null, "", href(route));
    }
    try {
      localStorage.setItem("sheep-team-language", lang);
    } catch {}
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = `${labels[lang][routes.indexOf(route)]} | ${t(D.name)}`;
    document.querySelector('meta[name="description"]').content = t(D.mission);
    document.getElementById("header").innerHTML =
      `<div class="header-inner"><a class="brand" href="${href("home")}"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span>${e(t(site.brand))}<small>${e(t(site.tagline))}</small></span></a><nav id="navigation" aria-label="${say("主导航", "Main navigation")}">${routes.map((r, i) => `<a href="${href(r)}" ${r === route ? 'aria-current="page"' : ""}>${labels[lang][i]}</a>`).join("")}</nav><div class="header-controls"><div class="language" aria-label="${say("语言选择", "Language selection")}"><button type="button" data-lang="zh" lang="zh-CN" aria-label="中文" aria-pressed="${lang === "zh"}">ZH</button><span aria-hidden="true">/</span><button type="button" data-lang="en" lang="en" aria-label="English" aria-pressed="${lang === "en"}">EN</button></div><button class="menu-toggle" aria-expanded="false" aria-controls="navigation" aria-label="${say("展开导航", "Open navigation")}"><span></span><span></span></button></div></div>`;
    const views = {
      home,
      people,
      resources,
      join,
      research: () =>
        `<div class="wrap page">${heading(say("研究方向", "Research"), e(t(D.mission)))}<div class="research-grid research-full">${researchItems()}</div></div>`,
      news: () =>
        `<div class="wrap page">${heading(say("团队动态", "News"), say("记录研究进展与团队生活。", "Research progress and life in the team."))}${newsItems()}</div>`,
    };
    document.getElementById("main").innerHTML = views[route]();
    if (route === "people") mountMemberProfiles();
    document.getElementById("footer").innerHTML =
      `<div class="wrap footer-inner"><div><strong>${e(t(D.name))}</strong><p>${e(t(D.affiliation))}</p></div><div><a href="mailto:${e(D.email)}">${e(D.email)}</a><p>${e(t(site.location))}</p></div></div><div class="wrap footer-bottom"><button type="button" class="science-toggle" aria-pressed="false">${say("暂停动效", "Pause motion")}</button><span>© ${new Date().getFullYear()} ${e(t(D.name))}</span><a href="assets/credits.txt" target="_blank" rel="noopener">${say("图片来源", "Image credits")}</a></div>`;
    startScienceMotion();
    document.querySelectorAll("[data-lang]").forEach((button) =>
      button.addEventListener("click", () => {
        if (button.dataset.lang === lang) return;
        const y = window.scrollY;
        history.replaceState(null, "", `#/${button.dataset.lang}/${route}`);
        render();
        window.scrollTo(0, y);
        document
          .querySelector(`[data-lang="${lang}"]`)
          .focus({ preventScroll: true });
      }),
    );
    document
      .querySelector(".menu-toggle")
      .addEventListener("click", (event) => {
        const button = event.currentTarget;
        const open = button.getAttribute("aria-expanded") !== "true";
        button.setAttribute("aria-expanded", String(open));
        button.setAttribute(
          "aria-label",
          open
            ? say("关闭导航", "Close navigation")
            : say("展开导航", "Open navigation"),
        );
        document.getElementById("navigation").classList.toggle("is-open", open);
      });
    if (route !== oldRoute) {
      window.scrollTo(0, 0);
      document.getElementById("main").focus({ preventScroll: true });
    }
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const menu = document.querySelector(".menu-toggle");
      if (menu?.getAttribute("aria-expanded") === "true") {
        menu.click();
        menu.focus();
      }
    }
  });
  document.querySelector(".skip-link").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("main").focus();
  });
  window.addEventListener("hashchange", render);
  render();
})();
