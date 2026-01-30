/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later

Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * Simple string hash function for consistent color assignment
 * @param str - The string to hash
 * @returns A positive integer hash value
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Extracts the first word from a card name
 * @param cardName - The full card name
 * @returns The first word in lowercase, or empty string if none
 */
function getFirstWord(cardName: string): string {
  const trimmed = cardName.trim();
  if (!trimmed) return '';

  const firstWord = trimmed.split(/\s+/)[0];
  return firstWord ? firstWord.toLowerCase() : '';
}

/**
 * Converts HSL to hex color
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex color string
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Gets a consistent, unique, muted color based on the first word of the card name
 * @param cardName - The card name
 * @returns A hex color string (e.g., '#e8d4f0') or empty string if no first word
 */
export function getColorFromFirstWord(cardName: string): string {
  const firstWord = getFirstWord(cardName);

  if (!firstWord) {
    return ''; // No color for empty card names
  }

  const hash = hashString(firstWord);

  // Generate a unique hue (0-360) based on hash
  // Use full range for maximum color variety
  const hue = hash % 360;

  // Use low saturation and high lightness for muted/pastel colors
  // Saturation: 35-45% (muted, not too vibrant)
  // Lightness: 85-92% (very light, pastel-like)
  const saturation = 35 + (hash % 10); // 35-44%
  const lightness = 85 + (hash % 8);   // 85-92%

  return hslToHex(hue, saturation, lightness);
}
