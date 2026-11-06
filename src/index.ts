function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function chars(text: string, rails: number): string[] {
  strictText(text);
  integer(rails, 2, 256);
  const a = Array.from(text);
  for (const c of a) {
    const cp = c.codePointAt(0)!;
    if (cp >= 0xd800 && cp <= 0xdfff) throw new RangeError('Unpaired surrogate');
  }
  return a;
}
function rail(i: number, r: number): number {
  const k = i % (2 * r - 2);
  return k < r ? k : 2 * r - 2 - k;
}
export function encodeRailFence(text: string, rails: number): string {
  const a = chars(text, rails),
    rows = Array.from({ length: rails }, () => [] as string[]);
  for (let i = 0; i < a.length; i++) rows[rail(i, rails)]!.push(a[i]!);
  return rows.map((r) => r.join('')).join('');
}
export function decodeRailFence(text: string, rails: number): string {
  const a = chars(text, rails),
    counts = Array<number>(rails).fill(0);
  for (let i = 0; i < a.length; i++) {
    const r = rail(i, rails);
    counts[r] = counts[r]! + 1;
  }
  const offsets: number[] = [];
  let total = 0;
  for (const n of counts) {
    offsets.push(total);
    total += n;
  }
  const out: string[] = [];
  for (let i = 0; i < a.length; i++) {
    const r = rail(i, rails),
      p = offsets[r]!;
    out.push(a[p]!);
    offsets[r] = p + 1;
  }
  return out.join('');
}
