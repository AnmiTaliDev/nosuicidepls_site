/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  dispatchEvent(event: CustomEvent): boolean;
  addEventListener(
    type: 'countryChanged',
    listener: (event: CustomEvent<{ country: string }>) => void
  ): void;
}
