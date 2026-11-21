"use client";

import { useEffect, useRef, useState } from "react";

/* =====================================================================
   CONFIGURACIÓN
   ===================================================================== */
const WCA_ID = "2024RIVE33";
const TOP_N = 10; // se destacan los rankings del 1 al TOP_N (NR, CR o WR)
const WCA_API = `https://www.worldcubeassociation.org/api/v0/persons/${WCA_ID}`;
const DEFAULT_NAME = "Mauricio Enrique Guzmán Rivera";

/* =====================================================================
   TIPOS Y LÓGICA PURA (sin DOM, fuera del componente)
   ===================================================================== */
// <pure>
interface WcaApiRecord {
  best: number;
  country_rank?: number;
  continent_rank?: number;
  world_rank?: number;
}
interface WcaApi {
  person?: { name?: string; country_iso2?: string };
  competition_count?: number;
  medals?: { total?: number };
  records?: { total?: number };
  personal_records?: Record<string, { single?: WcaApiRecord; average?: WcaApiRecord }>;
}

// Plan B si la API no responde: abre WCA_API en el navegador, copia el JSON
// y pégalo aquí en lugar de null.
const MANUAL_DATA = null as WcaApi | null;

type FaceName = "R" | "L" | "U" | "D" | "F" | "B";
interface MoveDef {
  axis: number;
  layer: number;
  base: number;
}
interface Move {
  face: FaceName;
  turn: 1 | -1 | 2;
}
interface Cubie {
  home: [number, number, number];
  r: number[];
  t: number[];
  el: HTMLElement | null;
}

const S = 56; // tamaño de cada cubito en px (w-14 = 56px)

// axis: 0=x 1=y 2=z · layer: capa · base: sentido horario de esa cara
const MOVES: Record<FaceName, MoveDef> = {
  R: { axis: 0, layer: 1, base: 1 },
  L: { axis: 0, layer: -1, base: -1 },
  U: { axis: 1, layer: -1, base: -1 },
  D: { axis: 1, layer: 1, base: 1 },
  F: { axis: 2, layer: 1, base: 1 },
  B: { axis: 2, layer: -1, base: -1 },
};
const FACE_NAMES = Object.keys(MOVES) as FaceName[];
const TURNS: Move["turn"][] = [1, -1, 2];

function rotMatrix(axis: number, deg: number): number[] {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  if (axis === 0) return [1, 0, 0, 0, c, -s, 0, s, c];
  if (axis === 1) return [c, 0, s, 0, 1, 0, -s, 0, c];
  return [c, -s, 0, s, c, 0, 0, 0, 1];
}

function mul3(A: number[], B: number[]): number[] {
  const out = new Array<number>(9).fill(0);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++) out[i * 3 + j] += A[i * 3 + k] * B[k * 3 + j];
  return out;
}

function mulV(A: number[], v: number[]): number[] {
  return [0, 1, 2].map((i) => A[i * 3] * v[0] + A[i * 3 + 1] * v[1] + A[i * 3 + 2] * v[2]);
}

function createState(): Cubie[] {
  const cubies: Cubie[] = [];
  for (const x of [-1, 0, 1])
    for (const y of [-1, 0, 1])
      for (const z of [-1, 0, 1])
        cubies.push({ home: [x, y, z], r: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [x * S, y * S, z * S], el: null });
  return cubies;
}

const inLayer = (c: Cubie, mv: MoveDef) => Math.round(c.t[mv.axis] / S) === mv.layer;
const moveDeg = (m: Move) => MOVES[m.face].base * m.turn * 90;

function commit(c: Cubie, R: number[]) {
  c.r = mul3(R, c.r).map(Math.round);
  c.t = mulV(R, c.t).map((v) => Math.round(v / S) * S);
}

function applyInstant(state: Cubie[], m: Move) {
  const mv = MOVES[m.face];
  const R = rotMatrix(mv.axis, moveDeg(m));
  state.filter((c) => inLayer(c, mv)).forEach((c) => commit(c, R));
}

const notation = (m: Move) => m.face + (m.turn === 1 ? "" : m.turn === -1 ? "'" : "2");
const invert = (m: Move): Move => ({ face: m.face, turn: m.turn === 2 ? 2 : m.turn === 1 ? -1 : 1 });

function genScramble(n: number): Move[] {
  const out: Move[] = [];
  let prev = "";
  while (out.length < n) {
    const face = FACE_NAMES[Math.floor(Math.random() * FACE_NAMES.length)];
    if (face === prev) continue;
    prev = face;
    out.push({ face, turn: TURNS[Math.floor(Math.random() * TURNS.length)] });
  }
  return out;
}

function isSolved(state: Cubie[]): boolean {
  const identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  return state.every(
    (c) => c.r.every((v, i) => v === identity[i]) && c.t.every((v, i) => v === c.home[i] * S)
  );
}

/* ---------- WCA ---------- */
const EVENTS: Record<string, string> = {
  "333": "3x3x3",
  "222": "2x2x2",
  "444": "4x4x4",
  "555": "5x5x5",
  "666": "6x6x6",
  "777": "7x7x7",
  "333bf": "3x3x3 a ciegas",
  "333fm": "3x3x3 menos movimientos",
  "333oh": "3x3x3 a una mano",
  clock: "Clock",
  minx: "Megaminx",
  pyram: "Pyraminx",
  skewb: "Skewb",
  sq1: "Square-1",
  "444bf": "4x4x4 a ciegas",
  "555bf": "5x5x5 a ciegas",
  "333mbf": "3x3x3 multi-ciego",
};
// Orden explícito: en un objeto JS las claves numéricas ("222", "333"...) se reordenan solas
const EVENT_ORDER = [
  "333", "222", "444", "555", "666", "777",
  "333bf", "333fm", "333oh",
  "clock", "minx", "pyram", "skewb", "sq1",
  "444bf", "555bf", "333mbf",
];
const LEVELS = [
  ["wr", "Mundial"],
  ["cr", "Continental"],
  ["nr", "Nacional"],
] as const;

interface Pr {
  value: string;
  nr?: number;
  cr?: number;
  wr?: number;
}
interface Row {
  id: string;
  name: string;
  single: Pr | null;
  average: Pr | null;
}
interface WcaInfo {
  name: string;
  country: string;
  competitions?: number;
  medals?: number;
  records?: number;
  rows: Row[];
}

const isTop = (rank?: number): rank is number => typeof rank === "number" && rank > 0 && rank <= TOP_N;

function fmtCs(cs: number): string {
  const h = Math.floor(cs / 360000);
  let rest = cs % 360000;
  const m = Math.floor(rest / 6000);
  rest %= 6000;
  const s = String(Math.floor(rest / 100)).padStart(2, "0");
  const c = String(rest % 100).padStart(2, "0");
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${s}.${c}`;
  if (m > 0) return `${m}:${s}.${c}`;
  return `${Number(s)}.${c}`;
}

function fmtMulti(v: number): string {
  const dd = Math.floor(v / 1e7);
  const seconds = Math.floor(v / 100) % 1e5;
  const missed = v % 100;
  const solved = 99 - dd + missed;
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${solved}/${solved + missed} ${mins}:${secs}`;
}

function fmtValue(id: string, kind: "single" | "average", v: number): string {
  if (id === "333fm") return kind === "single" ? String(v) : (v / 100).toFixed(2);
  if (id === "333mbf") return fmtMulti(v);
  return fmtCs(v);
}

function normalize(raw: WcaApi): WcaInfo {
  const prs = raw.personal_records ?? {};
  const rows: Row[] = EVENT_ORDER.filter((id) => prs[id]).map((id) => {
    const mk = (kind: "single" | "average"): Pr | null => {
      const x = prs[id][kind];
      return x
        ? { value: fmtValue(id, kind, x.best), nr: x.country_rank, cr: x.continent_rank, wr: x.world_rank }
        : null;
    };
    return { id, name: EVENTS[id], single: mk("single"), average: mk("average") };
  });

  let country = "El Salvador";
  const iso = raw.person?.country_iso2;
  if (iso) {
    try {
      country = new Intl.DisplayNames(["es"], { type: "region" }).of(iso) ?? iso;
    } catch {
      country = iso;
    }
  }

  return {
    name: raw.person?.name || DEFAULT_NAME,
    country,
    competitions: raw.competition_count,
    medals: raw.medals?.total,
    records: raw.records?.total,
    rows,
  };
}

const rowIsTop = (row: Row) =>
  [row.single, row.average].some((d) => d && (isTop(d.nr) || isTop(d.cr) || isTop(d.wr)));

// Por cada categoría, el nivel más alto en el que estás Top (single y promedio)
function topLines(row: Row): { label: string; rank: number }[] {
  const out: { label: string; rank: number }[] = [];
  for (const [kind, kindLabel] of [
    ["single", "Single"],
    ["average", "Promedio"],
  ] as const) {
    const d = row[kind];
    if (!d) continue;
    for (const [lvl, lvlLabel] of LEVELS) {
      const rank = d[lvl];
      if (isTop(rank)) {
        out.push({ label: `${kindLabel}, ${lvlLabel.toLowerCase()} (${d.value})`, rank });
        break;
      }
    }
  }
  return out;
}
// </pure>

/* =====================================================================
   CUBO: construcción del DOM 3D
   ===================================================================== */
interface FaceDef {
  k: FaceName;
  test: (x: number, y: number, z: number) => boolean;
  color: string;
}
// Un sticker de color solo aparece en la cara exterior del cubo
const FACES: FaceDef[] = [
  { k: "F", test: (x, y, z) => z === 1, color: "#009b48" },
  { k: "B", test: (x, y, z) => z === -1, color: "#0046ad" },
  { k: "R", test: (x) => x === 1, color: "#b71234" },
  { k: "L", test: (x) => x === -1, color: "#ff5800" },
  { k: "U", test: (x, y) => y === -1, color: "#ffffff" },
  { k: "D", test: (x, y) => y === 1, color: "#ffd500" },
];

const FACE_TRANSFORM: Record<string, string> = {
  F: "translateZ(28px)",
  B: "rotateY(180deg) translateZ(28px)",
  R: "rotateY(90deg) translateZ(28px)",
  L: "rotateY(-90deg) translateZ(28px)",
  U: "rotateX(90deg) translateZ(28px)",
  D: "rotateX(-90deg) translateZ(28px)",
};

function buildCubeDom(stage: HTMLElement, state: Cubie[]) {
  state.forEach((c) => {
    const el = document.createElement("div");
    el.className = "absolute left-0 top-0 w-14 h-14 -ml-7 -mt-7 [transform-style:preserve-3d]";
    FACES.forEach((f) => {
      const face = document.createElement("div");
      face.className =
        "absolute inset-0 bg-[#101010] grid place-items-center [backface-visibility:hidden] rounded-[4px] border border-black/30";
      face.style.transform = FACE_TRANSFORM[f.k];
      if (f.test(c.home[0], c.home[1], c.home[2])) {
        const st = document.createElement("div");
        st.className = "w-[86%] h-[86%] rounded-[7px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]";
        st.style.background = f.color;
        face.appendChild(st);
      }
      el.appendChild(face);
    });
    stage.appendChild(el);
    c.el = el;
  });
}

function paint(c: Cubie, R?: number[]) {
  if (!c.el) return;
  const r = R ? mul3(R, c.r) : c.r;
  const t = R ? mulV(R, c.t) : c.t;
  c.el.style.transform = `matrix3d(${r[0]},${r[3]},${r[6]},0,${r[1]},${r[4]},${r[7]},0,${r[2]},${r[5]},${r[8]},0,${t[0]},${t[1]},${t[2]},1)`;
}

/* =====================================================================
   COMPONENTE
   ===================================================================== */
export default function Gustos() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const moveRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLElement>(null);
  const timerRef = useRef<HTMLElement>(null);

  // Estas dos las leen el bucle del cubo y los botones
  const pausedRef = useRef(false);
  const skipRef = useRef(false);

  const [paused, setPaused] = useState(false);
  const [wca, setWca] = useState<WcaInfo | null>(null);
  const [wcaFailed, setWcaFailed] = useState(false);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };
  const skipNow = () => {
    pausedRef.current = false;
    setPaused(false);
    skipRef.current = true;
  };

  /* ---------------- CUBO ----------------
     IMPORTANTE: en desarrollo, React 18 (Strict Mode) ejecuta este efecto
     dos veces: monta, desmonta y vuelve a montar. Por eso la limpieza
     deja todo como estaba (cubitos, listeners, temporizadores) y NO hay
     ninguna condición del tipo "si ya hay cubitos, no hagas nada". */
  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    let alive = true;
    const ac = new AbortController();
    const state = createState();
    buildCubeDom(stage, state);
    state.forEach((c) => paint(c));

    // Solo escribe en el HUD si este efecto sigue vivo
    const say = (el: HTMLElement | null, text: string) => {
      if (alive && el) el.textContent = text;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pausedRef.current = reduceMotion;
    skipRef.current = false;
    setPaused(reduceMotion);

    say(statusRef.current, "Cargando…");
    say(moveRef.current, "—");
    say(countRef.current, "0/0");
    say(timerRef.current, "0.0 s");

    /* vista + arrastre con mouse o dedo */
    let rx = -26;
    let ry = -38;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = true;
    const applyView = () => {
      stage.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    applyView();

    const opts = { signal: ac.signal };
    scene.addEventListener(
      "pointerdown",
      (e) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        scene.setPointerCapture(e.pointerId);
      },
      opts
    );
    scene.addEventListener(
      "pointermove",
      (e) => {
        if (!dragging) return;
        ry += (e.clientX - lastX) * 0.5;
        rx = Math.max(-80, Math.min(80, rx - (e.clientY - lastY) * 0.5));
        lastX = e.clientX;
        lastY = e.clientY;
        applyView();
      },
      opts
    );
    const endDrag = () => {
      dragging = false;
    };
    scene.addEventListener("pointerup", endDrag, opts);
    scene.addEventListener("pointercancel", endDrag, opts);

    // giro lento mientras nadie lo arrastra
    let raf = 0;
    const spin = () => {
      if (!dragging && visible && !pausedRef.current) {
        ry += 0.18;
        applyView();
      }
      raf = requestAnimationFrame(spin);
    };
    if (!reduceMotion) raf = requestAnimationFrame(spin);

    // solo anima cuando el cubo está en pantalla
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    });
    io.observe(scene);

    /* animación de un movimiento */
    const animateMove = (m: Move, ms: number) =>
      new Promise<void>((resolve) => {
        const mv = MOVES[m.face];
        const deg = moveDeg(m);
        const sel = state.filter((c) => inLayer(c, mv));
        let elapsed = 0;
        let last = performance.now();
        const tick = (now: number) => {
          if (!alive) {
            resolve();
            return;
          }
          const dt = now - last;
          last = now;
          if (skipRef.current) elapsed = ms;
          else if (!pausedRef.current && visible) elapsed += dt;
          const p = Math.min(1, elapsed / ms);
          const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
          const R = rotMatrix(mv.axis, deg * e);
          sel.forEach((c) => paint(c, R));
          if (p < 1) {
            requestAnimationFrame(tick);
          } else {
            const Rf = rotMatrix(mv.axis, deg);
            sel.forEach((c) => {
              commit(c, Rf);
              paint(c);
            });
            resolve();
          }
        };
        requestAnimationFrame(tick);
      });

    const instant = (m: Move) => {
      applyInstant(state, m);
      state.forEach((c) => paint(c));
    };

    const sleep = async (ms: number) => {
      let left = ms;
      while (alive && left > 0 && !skipRef.current) {
        await new Promise((r) => setTimeout(r, 50));
        if (!pausedRef.current && visible) left -= 50;
      }
    };

    /* cronómetro de la resolución */
    let solving = false;
    let solveMs = 0;
    const timerId = window.setInterval(() => {
      if (solving && !pausedRef.current && visible) {
        solveMs += 100;
        say(timerRef.current, `${(solveMs / 1000).toFixed(1)} s`);
      }
    }, 100);

    /* ciclo infinito: mezclar, resolver, repetir */
    const run = async () => {
      while (alive) {
        const scramble = genScramble(20);
        const solution = scramble.slice().reverse().map(invert);

        say(statusRef.current, "Mezclando…");
        say(timerRef.current, "0.0 s");
        solveMs = 0;
        for (let i = 0; i < scramble.length; i++) {
          if (!alive) return;
          say(moveRef.current, notation(scramble[i]));
          say(countRef.current, `${i + 1}/${scramble.length}`);
          if (skipRef.current) instant(scramble[i]);
          else await animateMove(scramble[i], 110);
        }
        skipRef.current = false;
        say(moveRef.current, "—");
        await sleep(700);
        if (!alive) return;

        say(statusRef.current, "Resolviendo…");
        solving = true;
        for (let i = 0; i < solution.length; i++) {
          if (!alive) return;
          say(moveRef.current, notation(solution[i]));
          say(countRef.current, `${i + 1}/${solution.length}`);
          if (skipRef.current) instant(solution[i]);
          else await animateMove(solution[i], 320);
        }
        solving = false;
        skipRef.current = false;
        say(statusRef.current, isSolved(state) ? "¡Resuelto! ✔" : "Listo");
        say(moveRef.current, "✔");
        await sleep(2200);
        skipRef.current = false;
      }
    };
    void run();

    return () => {
      alive = false;
      ac.abort();
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearInterval(timerId);
      stage.replaceChildren();
      stage.style.transform = "";
    };
  }, []);

  /* ---------------- DATOS DE LA WCA ---------------- */
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(WCA_API, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = (await res.json()) as WcaApi;
        setWca(normalize(raw));
      } catch {
        if (ctrl.signal.aborted) return;
        if (MANUAL_DATA) setWca(normalize(MANUAL_DATA));
        else setWcaFailed(true);
      }
    })();
    return () => ctrl.abort();
  }, []);

  /* ---------------- valores derivados para el JSX ---------------- */
  const topRows = wca ? wca.rows.filter(rowIsTop) : [];
  const stats: [string, string][] = [];
  if (wca) {
    stats.push([wca.country, "País"]);
    if (wca.competitions !== undefined) stats.push([String(wca.competitions), "Competencias"]);
    stats.push([String(wca.rows.length), "Categorías"]);
    stats.push([String(topRows.length), `En Top ${TOP_N}`]);
    if (wca.medals !== undefined) stats.push([String(wca.medals), "Medallas"]);
    if (wca.records !== undefined) stats.push([String(wca.records), "Récords"]);
  }

  return (
    <section id="gustos" className="py-20 bg-[#121c18]">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-10">
          <p className="text-[#ffb21f] font-bold text-sm mb-1">Mis gustos</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#ece9e2] mb-3">Los cubos Rubik son lo mío</h2>
          <p className="text-[#9fada6] max-w-2xl">
            Compito de forma oficial en la World Cube Association (WCA). Mira cómo el cubo se mezcla y se resuelve
            solo en 3D, y revisa mis resultados oficiales.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
          {/* Cubo 3D con HUD */}
          <div className="p-5 rounded-2xl border border-[#2f403a] bg-gradient-to-b from-[#17221e] to-[#1f2d28] lg:sticky lg:top-24">
            <div
              ref={sceneRef}
              role="img"
              aria-label="Cubo Rubik 3x3 mezclándose y resolviéndose solo"
              className="w-full h-72 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none [perspective:900px] overflow-hidden select-none"
            >
              <div ref={stageRef} className="relative w-0 h-0 [transform-style:preserve-3d]" />
            </div>

            <div className="mt-4 border-t border-[#2f403a] pt-4">
              <div className="flex justify-between items-baseline">
                <span ref={statusRef} className="font-bold text-[#ffb21f]" />
                <span ref={moveRef} className="text-2xl font-black text-[#ece9e2]" />
              </div>
              <div className="flex justify-between text-xs text-[#9fada6] mt-1">
                <span>
                  Movimientos: <b ref={countRef} className="text-[#ece9e2]" />
                </span>
                <span>
                  Tiempo: <b ref={timerRef} className="text-[#ece9e2]" />
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={togglePause}
                  className="px-3 py-1.5 rounded-lg border border-[#2f403a] bg-transparent text-[#ece9e2] font-bold text-xs hover:border-[#ff6a1a]"
                >
                  {paused ? "Reproducir" : "Pausar"}
                </button>
                <button
                  type="button"
                  onClick={skipNow}
                  className="px-3 py-1.5 rounded-lg border border-[#2f403a] bg-transparent text-[#9fada6] font-bold text-xs hover:border-[#ff6a1a]"
                >
                  Saltar
                </button>
              </div>
              <p className="text-[11px] text-[#9fada6] mt-3">Arrastra el cubo para girarlo en 3D.</p>
            </div>
          </div>

          {/* Tarjeta WCA */}
          <div className="p-6 rounded-2xl border border-[#2f403a] bg-[#17221e]">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
              <div>
                <p className="text-xs font-bold text-[#ffb21f] uppercase tracking-wider mb-1">
                  Resultados oficiales WCA
                </p>
                <h3 className="text-2xl md:text-3xl font-black text-[#ece9e2]">{wca?.name ?? DEFAULT_NAME}</h3>
                <p className="text-xs text-[#9fada6] mt-1">
                  WCA ID: <code className="text-[#ece9e2]">{WCA_ID}</code>
                </p>
              </div>
              <a
                href={`https://www.worldcubeassociation.org/persons/${WCA_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-[#2f403a] text-[#ece9e2] text-xs font-bold hover:border-[#ff6a1a] transition"
              >
                Ver perfil WCA ↗
              </a>
            </div>

            {/* Estadísticas */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {stats.map(([value, label]) => (
                  <div key={label} className="p-3 rounded-xl bg-[#1f2d28] border border-[#2f403a]">
                    <b className="block font-extrabold text-2xl text-[#ece9e2]">{value}</b>
                    <span className="text-[#9fada6] text-xs">{label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Categorías Top 10 */}
            {topRows.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-bold text-[#ece9e2] mb-3">Categorías en las que estoy en el Top {TOP_N}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topRows.map((row) => (
                    <div key={row.id} className="p-4 rounded-xl border border-[#ffd500] bg-[rgba(255,213,0,0.13)]">
                      <h5 className="text-xl font-extrabold text-[#ece9e2] mb-2">{row.name}</h5>
                      {topLines(row).map((line) => (
                        <div key={line.label} className="flex justify-between text-sm py-0.5">
                          <em className="not-italic text-[#9fada6]">{line.label}</em>
                          <strong className="font-extrabold text-[#ffd500]">#{line.rank}</strong>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h4 className="text-lg font-bold text-[#ece9e2] mb-3">Todos mis récords personales</h4>
            <div className="overflow-x-auto border border-[#2f403a] rounded-xl">
              <table className="w-full text-xs text-right border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#1f2d28] text-[#9fada6]">
                    <th rowSpan={2} className="p-2 text-left sticky left-0 bg-[#1f2d28]">
                      Categoría
                    </th>
                    <th colSpan={4} className="p-2 border-l border-[#2f403a] text-center">
                      Single
                    </th>
                    <th colSpan={4} className="p-2 border-l border-[#2f403a] text-center">
                      Promedio
                    </th>
                  </tr>
                  <tr className="bg-[#1f2d28]/60 text-[#9fada6] border-t border-[#2f403a]">
                    <th className="p-1.5 border-l border-[#2f403a]">Mejor</th>
                    <th className="p-1.5">NR</th>
                    <th className="p-1.5">CR</th>
                    <th className="p-1.5">WR</th>
                    <th className="p-1.5 border-l border-[#2f403a]">Mejor</th>
                    <th className="p-1.5">NR</th>
                    <th className="p-1.5">CR</th>
                    <th className="p-1.5">WR</th>
                  </tr>
                </thead>
                <tbody>
                  {!wca && (
                    <tr>
                      <td colSpan={9} className="p-6 text-center text-[#9fada6]">
                        {wcaFailed
                          ? "No pude cargar los datos de la WCA. Abre mi perfil con el botón de arriba."
                          : "Cargando datos de la WCA…"}
                      </td>
                    </tr>
                  )}
                  {wca &&
                    wca.rows.map((row) => {
                      const top = rowIsTop(row);
                      return (
                        <tr
                          key={row.id}
                          className="border-b border-[#2f403a]"
                          style={top ? { boxShadow: "inset 4px 0 0 #ffd500" } : undefined}
                        >
                          <td className="p-2 font-bold text-[#ece9e2] text-left sticky left-0 bg-[#17221e]">
                            {row.name}
                            {top && (
                              <span className="ml-2 px-1.5 py-0.5 rounded bg-[#ffd500] text-[#1a1400] text-[10px] font-extrabold">
                                Top {TOP_N}
                              </span>
                            )}
                          </td>
                          {(["single", "average"] as const).map((kind) => {
                            const d = row[kind];
                            return [
                              <td key={`${kind}-v`} className="p-2 text-right text-[#ece9e2]">
                                {d ? d.value : "—"}
                              </td>,
                              ...(["nr", "cr", "wr"] as const).map((lvl) => {
                                const rank = d ? d[lvl] : undefined;
                                return (
                                  <td
                                    key={`${kind}-${lvl}`}
                                    className={`p-2 text-right ${
                                      isTop(rank)
                                        ? "text-[#ffd500] font-extrabold bg-[rgba(255,213,0,0.13)]"
                                        : "text-[#9fada6]"
                                    }`}
                                  >
                                    {rank ?? "—"}
                                  </td>
                                );
                              }),
                            ];
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-[#9fada6] mt-3">
              NR es el ranking nacional, CR el continental y WR el mundial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}