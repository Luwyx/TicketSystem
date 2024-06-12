// src/stores.js
import { writable } from 'svelte/store';

export const user = writable(null);
export const users = writable(null);
export const status = writable(null);
export const priority = writable(null);

