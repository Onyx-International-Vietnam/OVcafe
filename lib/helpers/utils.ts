export const formatNumber = (n: number) =>
    new Intl.NumberFormat().format(n);
  
  /** Merge class names safely (like clsx/tw-merge lite). */
  export const cn = (...cls: Array<string | undefined | null | false>) =>
    cls.filter(Boolean).join(" ");
  
  /** Small helpers (optional) */
  export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  export const clamp = (n: number, min: number, max: number) =>
    Math.min(max, Math.max(min, n));
  