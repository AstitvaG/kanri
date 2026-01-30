<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
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
along with this program.  If not, see <https://www.gnu.org/licenses/>. -->

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ComboboxRoot v-model="selectedFont" class="relative">
    <ComboboxAnchor
      class="bg-elevation-1 border-elevation-1 hover:bg-elevation-2 data-[placeholder]:text-primary-light inline-flex h-[35px] min-w-[240px] cursor-pointer items-center justify-between gap-[5px] rounded px-[15px]"
    >
      <ComboboxTrigger
        class="flex w-full flex-row items-center justify-between"
      >
        <span :style="{ fontFamily: currentFont?.value }">{{ currentFont?.name ?? "System Default" }}</span>

        <PhCaretDown class="text-primary-light size-3" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent :class="dropdownClass">
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty
          class="text-elevation-3 py-2 text-center text-xs font-medium"
        />

        <ComboboxGroup>
          <ComboboxItem
            v-for="font in fonts"
            :key="font.name"
            class="text-primary-light data-[disabled]:text-elevation-3 data-[highlighted]:bg-primary-dark data-[highlighted]:text-primary-light bg-elevation-2-hover relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] pl-[25px] pr-[35px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
            :value="font.name"
          >
            <ComboboxItemIndicator
              class="absolute left-0 inline-flex w-[25px] items-center justify-center"
            >
              <PhCheck class="text-primary-light size-4" />
            </ComboboxItemIndicator>
            <span :style="{ fontFamily: font.value }">{{ font.name }}</span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { PhCaretDown, PhCheck } from "@phosphor-icons/vue";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from "radix-vue";

const settings = useSettingsStore();
const selectedFont = ref(settings.selectedFont);

// Curated list of commonly available system fonts across platforms
const fonts = [
  { name: "System Default", value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Helvetica", value: "Helvetica, Arial, sans-serif" },
  { name: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Courier New", value: "'Courier New', Courier, monospace" },
  { name: "Verdana", value: "Verdana, sans-serif" },
  { name: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { name: "Comic Sans MS", value: "'Comic Sans MS', cursive" },
  { name: "Impact", value: "Impact, fantasy" },
  { name: "Palatino", value: "Palatino, 'Palatino Linotype', serif" },
  { name: "Garamond", value: "Garamond, serif" },
  { name: "Bookman", value: "Bookman, serif" },
  { name: "Tahoma", value: "Tahoma, sans-serif" },
  { name: "Monaco", value: "Monaco, monospace" },
  { name: "Consolas", value: "Consolas, monospace" },
  { name: "Lucida Console", value: "'Lucida Console', monospace" },
  { name: "SF Pro (macOS)", value: "-apple-system, BlinkMacSystemFont, 'SF Pro', sans-serif" },
  { name: "Segoe UI (Windows)", value: "'Segoe UI', Tahoma, sans-serif" },
  { name: "Ubuntu (Linux)", value: "Ubuntu, sans-serif" },
];

const currentFont = computed(() => {
  return fonts.find((f) => f.name === selectedFont.value);
});

const dropdownClass = computed(() => {
  let classes =
    "bg-elevation-1 absolute z-10 mt-2 w-full min-w-[160px] overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]";

  if (settings.animationsEnabled) {
    classes +=
      " data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade";
  }

  return classes;
});

watch(selectedFont, (newFont) => {
  if (newFont) {
    settings.setSelectedFont(newFont);
  }
});
</script>
