export function validateUrl(url: string) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== "www.crutchfield.com") return false;
    if (!urlObj.pathname.startsWith("/g")) return false;
    return true;
  } catch (error) {
    return false;
  }
}
