/*
 * Lite rendering, for machines that cannot afford the full sky.
 *
 * Firefox draws blur filters, backdrop-filter and SVG filters far more
 * slowly than Chromium or Safari, and on many Windows laptops it falls back
 * to rendering on the CPU entirely, where every full-screen repaint costs
 * whole frames. Low-core machines struggle the same way in any browser. On
 * those the page keeps every scene and every scroll choreography, but drops
 * what only costs: the ambient drift of the sky and clouds (a full-screen
 * repaint 20 times a second), backdrop blur behind glass, blend modes and
 * the blur in the scroll reveal.
 *
 * The flag is set on <html> by an inline script before first paint, so CSS
 * reads it through the `lite:` variant (globals.css) with no flash, and
 * client code reads it with isLite(). `?lite=1` or `?lite=0` in the URL
 * forces it either way for testing.
 */

export const LITE_SCRIPT = `(function(){try{var n=navigator,m=/[?&]lite=([01])/.exec(location.search),l=m?m[1]==="1":/firefox\\//i.test(n.userAgent)||(n.hardwareConcurrency>0&&n.hardwareConcurrency<=4)||(n.deviceMemory>0&&n.deviceMemory<=4);if(l)document.documentElement.setAttribute("data-lite","")}catch(e){}})()`;

/** true when the page should skip ambient motion and costly effects; client only */
export function isLite(): boolean {
  return (
    typeof document !== "undefined" &&
    document.documentElement.hasAttribute("data-lite")
  );
}
