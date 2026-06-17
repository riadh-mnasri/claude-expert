const MODULES_KEY = "claude-expert-modules-read";
const QUIZ_KEY = "claude-expert-quiz-progress";

export interface QuizProgressEntry {
  score: number;
  total: number;
  date: string;
}

const EMPTY_MODULES: string[] = [];
const EMPTY_QUIZ_PROGRESS: Record<string, QuizProgressEntry> = {};

// Always represents what the server rendered (no localStorage access), so it
// must stay constant regardless of environment — never read live storage here.
export const getModulesReadServerSnapshot = () => EMPTY_MODULES;
export const getQuizProgressServerSnapshot = () => EMPTY_QUIZ_PROGRESS;

// useSyncExternalStore requires getSnapshot to return a referentially stable
// value when the underlying data hasn't changed — otherwise it re-renders in
// a loop. We cache the parsed value and only re-parse when the raw string
// read from localStorage actually changes.
function createCachedReader<T>(key: string, parse: (raw: string) => T, empty: T) {
  let lastRaw: string | null | undefined;
  let lastValue: T = empty;
  return (): T => {
    if (typeof window === "undefined") return empty;
    let raw: string | null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return empty;
    }
    if (raw !== lastRaw) {
      lastRaw = raw;
      try {
        lastValue = raw ? parse(raw) : empty;
      } catch {
        lastValue = empty;
      }
    }
    return lastValue;
  };
}

export const getModulesReadSnapshot = createCachedReader<string[]>(
  MODULES_KEY,
  (raw) => JSON.parse(raw),
  EMPTY_MODULES
);

export const getQuizProgressSnapshot = createCachedReader<Record<string, QuizProgressEntry>>(
  QUIZ_KEY,
  (raw) => JSON.parse(raw),
  EMPTY_QUIZ_PROGRESS
);

export function markModuleRead(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const set = new Set(getModulesReadSnapshot());
    set.add(slug);
    window.localStorage.setItem(MODULES_KEY, JSON.stringify([...set]));
  } catch {
    // localStorage indisponible — pas bloquant
  }
}

export function persistQuizScore(categorySlug: string, entry: QuizProgressEntry) {
  if (typeof window === "undefined") return;
  try {
    const data = { ...getQuizProgressSnapshot(), [categorySlug]: entry };
    window.localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
  } catch {
    // localStorage indisponible — pas bloquant
  }
}

export function readQuizEntry(categorySlug: string): QuizProgressEntry | null {
  return getQuizProgressSnapshot()[categorySlug] ?? null;
}

export function clearAllProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(MODULES_KEY);
  window.localStorage.removeItem(QUIZ_KEY);
}
