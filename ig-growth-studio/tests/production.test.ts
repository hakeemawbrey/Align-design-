import { describe, expect, it } from "vitest";
import { buildBatch, problemWith } from "../src/lib/production";

const idea = (o: Partial<Parameters<typeof problemWith>[0]> = {}) => ({
  docId: "d1",
  account: "star_talk.md",
  format: "rollcall",
  sign: null,
  hook: "The signs at a wedding",
  ending: "callback",
  ...o,
});

describe("production batches", () => {
  it("makes farm items with fresh ids, music and the farm's account names", () => {
    const { items, skipped } = buildBatch(
      [idea(), idea({ docId: "d2", account: "star_advice.md", format: "advice-solo", sign: "Leo", hook: "Leo, rest is allowed." })],
      ["i3t0004", "v3t001"],
      11539,
    );
    expect(skipped).toEqual([]);
    expect(items[0]).toMatchObject({ docId: "d1", id: "i3t0005", account: "star_talk", format: "rollcall", topic: "The signs at a wedding", ending: "callback" });
    expect(items[0]).not.toHaveProperty("sign");
    expect(items[0].music.seed).toBe(11552);
    expect(items[1]).toMatchObject({ id: "i3a0001", account: "star_advice", format: "advice-solo", sign: "leo" });
    expect(items[1].music.key).not.toBe(items[0].music.key);
  });

  it("skips ideas the farm can't make, and says why", () => {
    const { items, skipped } = buildBatch(
      [idea({ docId: "z", account: "zodiac.advice444" }), idea({ docId: "f", format: "advice-solo" }), idea({ docId: "s", format: "solo", sign: null })],
      [],
      0,
    );
    expect(items).toEqual([]);
    expect(skipped.map((s) => s.docId)).toEqual(["z", "f", "s"]);
    expect(skipped[2].reason).toMatch(/needs a sign/);
  });
});
