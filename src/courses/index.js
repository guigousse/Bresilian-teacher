import { PT } from "./pt.js";
import { AR } from "./ar.js";

/* Les cours disponibles, dans l'ordre du menu principal. */
export const COURSES = { pt: PT, ar: AR };
export const COURSE_ORDER = ["pt", "ar"];

let current = PT;
export function setCourse(id) { current = COURSES[id] || PT; return current; }
export function course() { return current; }
