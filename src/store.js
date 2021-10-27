import { writable } from "svelte/store";

// State
export const recording = writable(false);

// Database
export const db = writable(null);
export const store = writable(null);
export const storeName = writable('memoStore');