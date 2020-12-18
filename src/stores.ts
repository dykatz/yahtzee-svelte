import { writable } from 'svelte/store';

export const ready = writable(false);
export const dice = writable(new Map());
export const usedSlots = writable(0);
export const totalScore = writable(0);
