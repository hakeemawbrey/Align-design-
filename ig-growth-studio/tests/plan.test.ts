import { describe, expect, it } from "vitest";
import { parseCsv, parsePlanTime, toDirectMediaUrl } from "../src/lib/plan";

describe("toDirectMediaUrl", () => {
  it("turns Drive share links into direct downloads and leaves other https links alone", () => {
    expect(toDirectMediaUrl("https://drive.google.com/file/d/1AbC_d-9/view")).toBe(
      "https://drive.usercontent.google.com/download?id=1AbC_d-9&export=download&confirm=t",
    );
    expect(toDirectMediaUrl("https://drive.google.com/open?id=XYZ")).toContain("id=XYZ");
    expect(toDirectMediaUrl("https://cdn.example.com/a.mp4")).toBe("https://cdn.example.com/a.mp4");
    expect(toDirectMediaUrl("http://insecure.example.com/a.mp4")).toBeNull();
    expect(toDirectMediaUrl("https://drive.google.com/drive/folders/abc")).toBeNull();
  });
});

describe("parseCsv", () => {
  it("handles quoted commas, quotes and multi-line captions", () => {
    const rows = parseCsv('﻿account,caption,time\r\nstar_talk,"Hi, ""you""\nline two",8:30 PM\nx,plain,9 AM\n');
    expect(rows).toEqual([
      { account: "star_talk", caption: 'Hi, "you"\nline two', time: "8:30 PM" },
      { account: "x", caption: "plain", time: "9 AM" },
    ]);
  });
});

describe("parsePlanTime", () => {
  const now = new Date(2026, 10, 3, 19, 48);
  it("reads day-month dates and 12-hour times in local time", () => {
    expect(parsePlanTime("Wed 4 Nov", "8:30 PM", now)).toEqual(new Date(2026, 10, 4, 20, 30));
    expect(parsePlanTime("Thu 5 Nov", "12:15 AM", now)).toEqual(new Date(2026, 10, 5, 0, 15));
    expect(parsePlanTime("Thu 5 Nov", "12:15 PM", now)).toEqual(new Date(2026, 10, 5, 12, 15));
    expect(parsePlanTime("Nov 28", "7:40 AM", now)).toEqual(new Date(2026, 10, 28, 7, 40));
  });
  it("shifts days across month ends and picks the nearest year", () => {
    expect(parsePlanTime("Wed 4 Nov", "8:30 PM", now, -1)).toEqual(new Date(2026, 10, 3, 20, 30));
    expect(parsePlanTime("Sun 1 Nov", "9:00 AM", now, -1)).toEqual(new Date(2026, 9, 31, 9, 0));
    expect(parsePlanTime("Fri 2 Jan", "9:00 AM", new Date(2026, 11, 20))).toEqual(new Date(2027, 0, 2, 9, 0));
  });
  it("rejects nonsense", () => {
    expect(parsePlanTime("someday", "8:30 PM", now)).toBeNull();
    expect(parsePlanTime("Wed 4 Nov", "25:00", now)).toBeNull();
  });
});
