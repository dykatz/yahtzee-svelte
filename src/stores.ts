import { writable } from 'svelte/store';

export const ready = writable(false);
export const dice = writable(new Map());
