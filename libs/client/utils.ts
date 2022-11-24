import { useEffect, useState } from "react";

export function cls(...classname: string[]) {
  return classname.join(" ");
}

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
