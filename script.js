var $ = function (s, r) {
    return (r || document).querySelector(s);
  },
  $$ = function (s, r) {
    return [].slice.call((r || document).querySelectorAll(s));
  };
var SK = [
  ["HTML", "tech"],
  ["PHP", "tech"],
  ["PostgreSQL", "tech"],
  ["PDO", "tech"],
  ["VS Code", "tech"],
  ["pgAdmin", "tech"],
  ["GitHub", "tech"],
  ["Computer Literacy", "tech"],
  ["Communication", "soft"],
  ["Problem Solving", "soft"],
  ["Time Management", "soft"],
  ["Adaptability", "soft"],
  ["Organization", "soft"],
  ["Reliability", "soft"],
];
var PJ = [
  {
    t: "Message Board (IT 110)",
    c: "web",
    m: "PHP · PostgreSQL · PDO",
    d: "A message board that saves posts in a database and uses cookies and sessions.",
    s: "For IT 110, I needed to build a message board that stores posts in a database.",
    k: "Set up the database, connect it to PHP, and handle cookies and sessions.",
    a: "Created the classwall database and messages table in pgAdmin, wrote the PDO connection, and ran the project on PHP’s built-in server in VS Code.",
    r: "A working database connection that the message board is built on.",
  },
  {
    t: "K-Tech Solutions Accounting Cycle",
    c: "acc",
    m: "Group project",
    d: "Completed the full accounting cycle for an IT services business.",
    s: "A group project covering the accounting cycle for K-Tech Solutions IT Services.",
    k: "Complete Activities 4 to 6 as a group.",
    a: "Worked through the full cycle from recording to financial statements.",
    r: "A completed accounting cycle for the business.",
  },
  {
    t: "Statement of Cash Flows",
    c: "acc",
    m: "Maple Tech Repair Services",
    d: "Prepared a statement of cash flows for a repair services business.",
    s: "Maple Tech Repair Services needed its cash flows summarized.",
    k: "Prepare the Statement of Cash Flows.",
    a: "Classified the cash movements and compiled the statement.",
    r: "A completed Statement of Cash Flows.",
  },
  {
    t: "Worksheet & Financial Position",
    c: "acc",
    m: "Individual · K-Tech Solutions",
    d: "Built a 10-column worksheet and a Statement of Financial Position.",
    s: "An individual assignment for K-Tech Solutions.",
    k: "Build the 10-column worksheet and the Statement of Financial Position.",
    a: "Prepared both and traced down balancing errors until they matched.",
    r: "A balanced worksheet and statement.",
  },
];

/* ---------- Skills chips ---------- */
var ch = $("#chips");
SK.forEach(function (s) {
  var e = document.createElement("span");
  e.className = "chip";
  e.dataset.c = s[1];
  e.textContent = s[0];
  ch.appendChild(e);
});

/* ---------- Project cards ---------- */
var pg = $("#pg");
PJ.forEach(function (p, i) {
  var e = document.createElement("div");
  e.className = "card proj rv";
  e.dataset.c = p.c;
  e.innerHTML =
    "<h3></h3><p class='meta'></p><p></p><button class='more' data-i='" +
    i +
    "'>View case study →</button>";
  $("h3", e).textContent = p.t;
  $(".meta", e).textContent = p.m;
  e.children[2].textContent = p.d;
  pg.appendChild(e);
});

/* ---------- Filter tabs ---------- */
$$(".tabs").forEach(function (g) {
  g.addEventListener("click", function (ev) {
    var b = ev.target.closest(".tab");
    if (!b) return;
    $$(".tab", g).forEach(function (x) {
      x.classList.remove("on");
    });
    b.classList.add("on");
    var sel = g.dataset.t == "sk" ? "#chips .chip" : "#pg .proj";
    $$(sel).forEach(function (c) {
      c.classList.toggle(
        "hide",
        b.dataset.f != "all" && c.dataset.c != b.dataset.f,
      );
    });
  });
});

/* ---------- Case study modal ---------- */
pg.addEventListener("click", function (ev) {
  var b = ev.target.closest(".more");
  if (!b) return;
  var p = PJ[b.dataset.i],
    m = $("#mc");
  m.innerHTML =
    "<h3></h3><p class='meta'></p><dl><dt>Situation</dt><dd></dd><dt>Task</dt><dd></dd><dt>Action</dt><dd></dd><dt>Result</dt><dd></dd></dl>";
  $("h3", m).textContent = p.t;
  $(".meta", m).textContent = p.m;
  var d = $$("dd", m);
  [p.s, p.k, p.a, p.r].forEach(function (x, i) {
    d[i].textContent = x;
  });
  $("#md").classList.add("open");
});
PJ.slice(0, 2).forEach(function (p) {
  var e = document.createElement("div");
  e.className = "card rv";
  e.innerHTML =
    "<h3></h3><p class='meta'></p><dl style='margin:0'><dt style='color:var(--a);font-weight:700'>Situation</dt><dd style='margin:0;color:var(--muted)'></dd><dt style='color:var(--a);font-weight:700;margin-top:10px'>Task</dt><dd style='margin:0;color:var(--muted)'></dd><dt style='color:var(--a);font-weight:700;margin-top:10px'>Action</dt><dd style='margin:0;color:var(--muted)'></dd><dt style='color:var(--a);font-weight:700;margin-top:10px'>Result</dt><dd style='margin:0;color:var(--muted)'></dd></dl>";
  $("h3", e).textContent = p.t;
  $(".meta", e).textContent = p.m;
  var d = $$("dd", e);
  [p.s, p.k, p.a, p.r].forEach(function (x, i) {
    d[i].textContent = x;
  });
  $("#cs").appendChild(e);
});
$("#cl").onclick = function () {
  $("#md").classList.remove("open");
};
$("#md").onclick = function (e) {
  if (e.target.id == "md") $("#md").classList.remove("open");
};

/* ---------- Typewriter ---------- */
var W = ["IT Graduate", "Junior Web Developer", "Aspiring Software Engineer"],
  wi = 0,
  ci = 0,
  del = false,
  ty = $("#ty");
(function t() {
  var w = W[wi];
  ty.textContent = w.slice(0, ci);
  if (!del && ci == w.length) {
    del = true;
    return setTimeout(t, 1400);
  }
  if (del && ci == 0) {
    del = false;
    wi = (wi + 1) % W.length;
  }
  ci += del ? -1 : 1;
  setTimeout(t, del ? 40 : 80);
})();

/* ---------- Reveal on scroll + counters ---------- */
var io = new IntersectionObserver(
  function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        $$("[data-n]", e.target).forEach(cnt);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: "0px 0px -6% 0px" },
);
$$(".rv").forEach(function (e) {
  io.observe(e);
});
function cnt(el) {
  var n = +el.dataset.n,
    i = 0;
  var h = setInterval(function () {
    el.textContent = ++i;
    if (i >= n) clearInterval(h);
  }, 260);
}

/* ---------- Mobile menu ---------- */
var menuY = 0;
function setM(o) {
  $("#lk").classList.toggle("open", o);
  $("#mb").textContent = o ? "✕" : "☰";
  $("#mb").setAttribute("aria-expanded", o ? "true" : "false");
  if (o) menuY = document.documentElement.scrollTop;
}
function menuOpen() {
  return $("#lk").classList.contains("open");
}
$("#mb").setAttribute("aria-label", "Menu");
$("#mb").setAttribute("aria-controls", "lk");
$("#mb").setAttribute("aria-expanded", "false");
$("#tg").setAttribute("aria-label", "Toggle theme");
$("#mb").onclick = function () {
  setM(!menuOpen());
};
links = $$("#lk a");
links.forEach(function (a) {
  a.onclick = function () {
    setM(false);
  };
});
document.addEventListener("click", function (e) {
  if (!e.target.closest("nav")) setM(false);
});
addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    setM(false);
    $("#md").classList.remove("open");
  }
});

/* ---------- Scroll: progress, back-to-top, active link ---------- */
var secs = $$("section"),
  links;
addEventListener(
  "scroll",
  function () {
    var h = document.documentElement,
      y = h.scrollTop;
    // close menu only after a real scroll (40px from where it was opened)
    if (menuOpen() && Math.abs(y - menuY) > 40) setM(false);
    $("#bar").style.width = (y / (h.scrollHeight - h.clientHeight)) * 100 + "%";
    $("#up").classList.toggle("show", y > 500);
    var cur = "home";
    secs.forEach(function (s) {
      if (s.offsetTop - 220 <= y) cur = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("href") == "#" + cur);
    });
  },
  { passive: true },
);

/* ---------- Cursor glow + card tilt ---------- */
addEventListener("pointermove", function (e) {
  var g = $("#glow");
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
});
$$(".card,.stat").forEach(function (c) {
  c.addEventListener("pointermove", function (e) {
    if (e.pointerType != "mouse") return;
    var r = c.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform =
      "perspective(700px) rotateY(" +
      x * 6 +
      "deg) rotateX(" +
      -y * 6 +
      "deg) translateY(-3px)";
  });
  c.addEventListener("pointerleave", function () {
    c.style.transform = "";
  });
});
$("#up").onclick = function () {
  scrollTo({ top: 0, behavior: "smooth" });
};

/* ---------- Theme ---------- */
var R = document.documentElement;
function th(t) {
  R.dataset.theme = t;
  $("#tg").textContent = t == "dark" ? "☀" : "☾";
}
th(matchMedia("(prefers-color-scheme:light)").matches ? "light" : "dark");
$("#tg").onclick = function () {
  th(R.dataset.theme == "dark" ? "light" : "dark");
};

/* ---------- Contact form ---------- */
$("#fm").onsubmit = function (e) {
  e.preventDefault();
  var b =
    "From: " + $("#n").value + " (" + $("#e").value + ")\n\n" + $("#m").value;
  location.href =
    "mailto:imnotregie123@gmail.com?subject=" +
    encodeURIComponent("Portfolio message from " + $("#n").value) +
    "&body=" +
    encodeURIComponent(b);
};