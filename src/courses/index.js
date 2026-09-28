import { PT } from "./pt.js";
import { ES } from "./es.js";

/* Les cours disponibles, dans l'ordre du menu principal. */
export const COURSES = { pt: PT, es: ES };
export const COURSE_ORDER = ["pt", "es"];

let current = PT;
export function setCourse(id) { current = COURSES[id] || PT; return current; }
export function course() { return current; }
