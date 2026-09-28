/* ==================================================================
   COURS DISPONIBLES — et celui qui est actif.

   Changer de langue remonte toute l'app (clé React) : le cours actif
   est donc lu au moment du rendu ou de l'appel, jamais figé au
   chargement d'un module.
   ================================================================== */

import { PT } from "./pt.js";

export const COURSES = { pt: PT };
export const COURSE_ORDER = ["pt"];

let current = PT;

export function setCourse(id) {
  current = COURSES[id] || PT;
  return current;
}

export function course() { return current; }
