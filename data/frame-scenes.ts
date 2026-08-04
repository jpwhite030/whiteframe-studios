/**
 * Scenes for The Living Frame — the hero's signature visual.
 *
 * Every scene is the same structure: a set of rectangles placed on a 0–100
 * grid inside the frame. The animation reads each rectangle twice — once as a
 * rough wireframe box that drifts in off-position, once as a finished piece of
 * interface — which is what lets one mechanism tell the studio's story
 * (rough idea → aligned structure → working product) for any project.
 */

export type ElementKind =
  | "panel" // plain surface
  | "row" // list row with a label and a level bar
  | "chart" // small column chart
  | "list" // stacked hairlines
  | "map" // ruled plan with markers
  | "stat" // headline figure block
  | "pill" // filled accent block
  | "dot"; // marker

export type FrameElement = {
  id: string;
  /** Final placement, in percentages of the frame's inner area. */
  x: number;
  y: number;
  w: number;
  h: number;
  kind: ElementKind;
  /** Where the rough wireframe box sits before it aligns, in percentage points. */
  drift: [number, number];
  /** Parallax group: 0 sits back, 2 sits forward. */
  layer: 0 | 1 | 2;
  /** Kept on small screens, where the interface is simplified. */
  essential?: boolean;
  /** Carries the product's accent colour. */
  accent?: boolean;
  /** Micro-label rendered in the finished state. */
  label?: string;
  /** Column heights for `chart`, 0–100. */
  bars?: readonly number[];
};

export type FrameScene = {
  id: string;
  index: string;
  name: string;
  category: string;
  /** One colour per product, used on a couple of elements at most. */
  accent: string;
  /** Fine technical annotation shown against the frame. */
  spec: string;
  /** Draws connectors between elements during the wireframe stages. */
  diagram?: boolean;
  elements: readonly FrameElement[];
};

export const frameScenes: readonly FrameScene[] = [
  {
    id: "pubcam",
    index: "01",
    name: "PubCam",
    category: "Consumer nightlife application",
    accent: "#ff7a45",
    spec: "iOS · live venue feed",
    elements: [
      { id: "screen", x: 5, y: 6, w: 33, h: 88, kind: "panel", drift: [-7, 4], layer: 0, essential: true },
      { id: "screen-title", x: 9, y: 12, w: 25, h: 7, kind: "stat", drift: [-5, -6], layer: 1, essential: true, label: "Tonight" },
      { id: "venue-1", x: 9, y: 24, w: 25, h: 10, kind: "row", drift: [-9, 3], layer: 1, essential: true, accent: true, label: "Busy" },
      { id: "venue-2", x: 9, y: 37, w: 25, h: 10, kind: "row", drift: [6, 5], layer: 1, essential: true, label: "Steady" },
      { id: "venue-3", x: 9, y: 50, w: 25, h: 10, kind: "row", drift: [-4, 7], layer: 1, label: "Quiet" },
      { id: "nearby", x: 9, y: 63, w: 25, h: 15, kind: "list", drift: [-6, 6], layer: 1, label: "Nearby" },
      { id: "cta", x: 9, y: 81, w: 25, h: 8, kind: "pill", drift: [0, 8], layer: 2, essential: true, accent: true, label: "Check in" },
      { id: "map", x: 43, y: 6, w: 52, h: 46, kind: "map", drift: [8, -5], layer: 0, essential: true, label: "Surry Hills" },
      { id: "pin-a", x: 56, y: 20, w: 3, h: 4, kind: "dot", drift: [4, -8], layer: 2, accent: true },
      { id: "pin-b", x: 76, y: 32, w: 3, h: 4, kind: "dot", drift: [-6, 6], layer: 2 },
      { id: "event-1", x: 43, y: 58, w: 25, h: 31, kind: "list", drift: [-5, 9], layer: 1, essential: true, label: "Events" },
      { id: "event-2", x: 70, y: 58, w: 25, h: 31, kind: "list", drift: [9, 6], layer: 1, label: "Rewards" },
    ],
  },
  {
    id: "meridian",
    index: "02",
    name: "Meridian AI",
    category: "Venue analytics dashboard",
    accent: "#7189ff",
    spec: "Computer vision · occupancy",
    diagram: true,
    elements: [
      { id: "rail", x: 4, y: 6, w: 7, h: 88, kind: "panel", drift: [-6, 0], layer: 0 },
      { id: "kpi-1", x: 15, y: 6, w: 25, h: 17, kind: "stat", drift: [-4, -7], layer: 1, essential: true, label: "Occupancy" },
      { id: "kpi-2", x: 42, y: 6, w: 25, h: 17, kind: "stat", drift: [0, -9], layer: 1, essential: true, label: "Dwell" },
      { id: "kpi-3", x: 69, y: 6, w: 26, h: 17, kind: "stat", drift: [6, -6], layer: 1, accent: true, label: "Queue" },
      {
        id: "chart",
        x: 15, y: 27, w: 52, h: 42,
        kind: "chart",
        drift: [-7, 5],
        layer: 1,
        essential: true,
        accent: true,
        label: "6pm — 3am",
        bars: [24, 33, 29, 45, 58, 71, 88, 74, 52, 37, 30, 22],
      },
      { id: "feed", x: 69, y: 27, w: 26, h: 42, kind: "list", drift: [8, 4], layer: 1, essential: true, label: "Zones" },
      { id: "table", x: 15, y: 73, w: 80, h: 17, kind: "list", drift: [0, 9], layer: 2, essential: true, label: "Sessions" },
    ],
  },
  {
    id: "tally",
    index: "03",
    name: "Tally",
    category: "Mobile tax application",
    accent: "#5ee0a8",
    spec: "Receipt capture · deductions",
    elements: [
      { id: "phone", x: 6, y: 6, w: 31, h: 88, kind: "panel", drift: [-8, 5], layer: 0, essential: true },
      { id: "receipt", x: 10, y: 12, w: 23, h: 28, kind: "list", drift: [-5, -7], layer: 1, essential: true, label: "Receipt" },
      { id: "total", x: 10, y: 44, w: 23, h: 9, kind: "pill", drift: [-7, 4], layer: 2, essential: true, accent: true, label: "Deductible" },
      { id: "recent", x: 10, y: 57, w: 23, h: 20, kind: "list", drift: [-4, 8], layer: 1, label: "Recent" },
      { id: "scan", x: 10, y: 80, w: 23, h: 8, kind: "row", drift: [0, 9], layer: 2, label: "Scan" },
      { id: "cat-1", x: 42, y: 6, w: 53, h: 13, kind: "row", drift: [7, -6], layer: 1, essential: true, label: "Tools" },
      { id: "cat-2", x: 42, y: 22, w: 53, h: 13, kind: "row", drift: [9, 3], layer: 1, essential: true, label: "Travel" },
      { id: "cat-3", x: 42, y: 38, w: 53, h: 13, kind: "row", drift: [5, 7], layer: 1, label: "Home office" },
      { id: "summary", x: 42, y: 56, w: 53, h: 34, kind: "stat", drift: [4, 10], layer: 2, essential: true, accent: true, label: "Estimated return" },
    ],
  },
];
