export const siteUrl = "https://www.ukooafricahomes.co.ke";
export const siteName = "Ukoo Africa Homes";
export const defaultDescription =
  "Affordable plots and homes in Juja, Thika and the Thika Superhighway corridor, with genuine title deeds and flexible payment plans.";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
