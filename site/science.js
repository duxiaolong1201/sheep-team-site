window.SheepScience = (() => {
  "use strict";
  let motionPaused = false;
  let dispose = () => {};
  try {
    motionPaused = localStorage.getItem("sheep-motion") === "paused";
  } catch {}
  const scienceArt = (type, placement = "") => {
    let art = "";
    if (type === "dna")
      art =
        '<g class="helix-bonds"></g><path class="helix-strand helix-a"/><path class="helix-strand helix-b"/>';
    if (type === "regulation")
      art = `<path class="science-track" d="M18 105H302 M18 113H302"/>${Array.from({ length: 27 }, (_, i) => `<path class="sequence-tick" d="M${24 + i * 10} 105v8"/>`).join("")}<rect class="binding-site" x="130" y="100" width="60" height="18" rx="7"/><g class="motif-letters">${["A", "C", "G", "T", "G", "A"].map((v, i) => `<text x="${134 + i * 10}" y="96" fill="${["#418b89", "#809eb4", "#b69863", "#628eab"][i % 4]}">${v}</text>`).join("")}</g><g class="binding-protein"><path d="M131 53C112 48 114 25 133 25C141 9 160 17 163 26C181 14 199 30 190 44C207 61 181 77 168 65C153 81 128 73 131 53Z"/><path class="protein-fold" d="M135 39Q153 26 171 43T183 55M140 57Q151 44 162 57"/></g><ellipse class="binding-halo" cx="160" cy="108" rx="41" ry="17"/>`;
    if (type === "gtex")
      art = `${[0, 1, 2, 3].map((n) => `<path class="signal-arc" style="--delay:${-n * 2}s" d="M32 ${35 + n * 27}C115 ${35 + n * 27} 167 86 280 86"/><circle class="tissue-node" cx="32" cy="${35 + n * 27}" r="${6 + n}"/>`).join("")}<circle class="signal-core" cx="280" cy="86" r="12"/><path class="science-track" d="M18 148H302"/>${Array.from({ length: 24 }, (_, i) => `<rect class="expression-bar" style="--delay:${-i * 0.7}s" x="${28 + i * 11}" y="${147 - 10 - (Math.sin(i * 1.7) + 1) * 11}" width="4" height="${10 + (Math.sin(i * 1.7) + 1) * 11}" rx="2"/>`).join("")}`;
    if (type === "singlecell")
      art = [0, 1, 2]
        .map(
          (n) =>
            `<g class="cell-cloud" style="--delay:${-n * 4}s;--cell-color:${["#548f9d", "#85aca7", "#b49a70"][n]}">${Array.from(
              { length: 24 },
              (_, i) => {
                const a = i * 2.399,
                  r = 6 + Math.sqrt(i) * 7;
                return `<circle cx="${78 + n * 78 + Math.cos(a) * r}" cy="${85 + Math.sin(n * 2) * 22 + Math.sin(a) * r * 0.75}" r="${2 + (i % 3) * 0.5}"/>`;
              },
            ).join("")}</g>`,
        )
        .join("");
    if (type === "traits")
      art = `<path class="science-track" d="M18 145H302"/>${Array.from(
        { length: 47 },
        (_, i) => {
          const h =
            10 +
            Math.abs(Math.sin(i * 2.3)) * 23 +
            65 * Math.exp(-Math.pow((i - 29) / 4, 2));
          return `<circle class="locus-dot" style="--delay:${-i * 0.3}s" cx="${22 + i * 6}" cy="${140 - h}" r="${i > 25 && i < 33 ? 3 : 2}" fill="${i > 25 && i < 33 ? "#b69863" : i % 2 ? "#729eb0" : "#38868b"}"/>`;
        },
      ).join(
        "",
      )}<path class="locus-guide" d="M196 40V147"/><circle class="locus-ring" cx="196" cy="49" r="13"/>`;
    return `<div class="science-visual science-${type} ${placement}" aria-hidden="true"><svg viewBox="0 0 320 180" fill="none" focusable="false">${art}</svg></div>`;
  };
  function mount(say) {
    dispose();
    if (typeof requestAnimationFrame === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visuals = [...document.querySelectorAll(".science-visual")];
    const helices = visuals.filter((v) => v.classList.contains("science-dna"));
    const visible = new Set();
    let frameId = 0,
      last = 0,
      phase = 0.5,
      observer;
    const bonds = new Map();
    for (const v of helices) {
      const group = v.querySelector(".helix-bonds");
      group.innerHTML = Array.from(
        { length: 26 },
        () => '<path stroke-width="1.25"/>',
      ).join("");
      bonds.set(v, [...group.children]);
    }
    function draw(v) {
      const points = [[], []];
      for (let i = 0; i <= 100; i++) {
        const x = 12 + i * 2.96,
          a = (i / 100) * Math.PI * 3.6 + phase;
        const y = 90 + Math.sin(a) * 45,
          z = Math.cos(a);
        points[0].push(`${x.toFixed(2)},${y.toFixed(2)}`);
        points[1].push(`${x.toFixed(2)},${(180 - y).toFixed(2)}`);
        if (i % 4 === 0) {
          const bond = bonds.get(v)[i / 4];
          bond.setAttribute("d", `M${x} ${y}V${180 - y}`);
          bond.setAttribute("stroke", z > 0 ? "#91b5b5" : "#b2c7d0");
          bond.setAttribute("opacity", String(0.35 + Math.abs(z) * 0.35));
        }
      }
      v.querySelector(".helix-a").setAttribute("d", "M" + points[0].join("L"));
      v.querySelector(".helix-b").setAttribute("d", "M" + points[1].join("L"));
    }
    helices.forEach(draw);
    const enabled = () =>
      !motionPaused &&
      !reduced.matches &&
      !document.hidden &&
      helices.some((v) => visible.has(v));
    function frame(now) {
      frameId = 0;
      if (!enabled()) {
        last = 0;
        return;
      }
      if (!last) last = now;
      if (now - last >= 32) {
        phase += Math.min(now - last, 80) * 0.00022;
        last = now;
        helices.forEach((v) => {
          if (visible.has(v)) draw(v);
        });
      }
      frameId = requestAnimationFrame(frame);
    }
    function sync() {
      document.documentElement.classList.toggle(
        "science-hidden",
        document.hidden,
      );
      if (enabled()) {
        if (!frameId) frameId = requestAnimationFrame(frame);
      } else {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = 0;
        last = 0;
      }
    }
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          entry.isIntersecting
            ? visible.add(entry.target)
            : visible.delete(entry.target);
          entry.target.classList.toggle(
            "motion-outside",
            !entry.isIntersecting,
          );
        }
        sync();
      });
      visuals.forEach((v) => {
        v.classList.add("motion-outside");
        observer.observe(v);
      });
    } else visuals.forEach((v) => visible.add(v));
    document.querySelectorAll(".science-toggle").forEach((button) => {
      const update = () => {
        button.setAttribute("aria-pressed", String(motionPaused));
        button.textContent = motionPaused
          ? say("开启动效", "Enable motion")
          : say("暂停动效", "Pause motion");
        document.documentElement.classList.toggle(
          "science-paused",
          motionPaused,
        );
        sync();
      };
      update();
      button.onclick = () => {
        motionPaused = !motionPaused;
        try {
          localStorage.setItem(
            "sheep-motion",
            motionPaused ? "paused" : "playing",
          );
        } catch {}
        update();
      };
    });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    dispose = () => {
      if (frameId) cancelAnimationFrame(frameId);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }
  return { art: scienceArt, mount };
})();
