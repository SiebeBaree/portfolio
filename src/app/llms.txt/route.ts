import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/*
 * Plain text profile for AI crawlers, mirroring the Person schema in the root
 * layout. The blog section is generated from the post registry.
 */
const PROFILE = `# Siebe Barée

> Siebe is a technical founder based in Belgium, looking for someone to start a new company with. He previously founded Enkryptify and built Coinz. This is his personal website at ${SITE_URL}.

## Co-founder search

Siebe's strengths are product and engineering. He would like to meet potential co-founders with experience in sales, marketing or running a business, who share his commitment to building a company. The plan is to get to know each other first and decide what to build together. He is currently building Notchlet.

## Featured work

- [Enkryptify](${SITE_URL}/work/enkryptify): a secrets management company Siebe founded in 2024, now closed. The team raised $260K in funding and had paying customers. The product helped software teams manage API keys and credentials across environments.
- [Coinz](${SITE_URL}/work/coinz): a Discord economy game Siebe built and ran from 2022 to 2025. It reached 1.35M users and 16K daily active users at its peak. Players could trade stocks, run businesses, hire other players and play more than 15 minigames. Coinz closed in early 2025.

## Other products

- [Notchlet](${SITE_URL}/work/notchlet): an open source Mac app Siebe is building that shows Claude Code, Codex, Cursor and OpenCode limits in the notch. Site: https://notchlet.com
- [bMail](${SITE_URL}/work/bmail): Siebe's open source Mac mail app for Gmail, Outlook and his own domains in one inbox. The b stands for Baree. Code: https://github.com/SiebeBaree/bMail
- [PitchPoppy](${SITE_URL}/work/pitchpoppy): enter your website and get a completely new one for free, as inspiration. Site: https://pitchpoppy.lol
- [plan.baree.be](${SITE_URL}/work/plan-baree-be): uploads Siebe's HTML plans to the cloud so he can read them on any laptop or his phone and build from anywhere.
- [files.baree.be](${SITE_URL}/work/files-baree-be): an open source file host that lets Siebe's coding agents share screenshots and recordings and attach them to GitHub pull requests.
- [Imprint](${SITE_URL}/work/imprint): a four hour build that generates Instagram campaigns for brands with physical products.
- [Umber](${SITE_URL}/work/umber): an open source desktop app for AI images and video using your own API keys. Site: https://umber.s4.nu
- [anyfmt](${SITE_URL}/work/anyfmt): an image converter that runs in the browser, so files never leave your device. Site: https://anyfmt.xyz

## Earlier work

- [EEVEE Mobility](${SITE_URL}/work/eevee-mobility): engineering work on an electric fleet management platform, started in 2024.
- [AquaSolutions](${SITE_URL}/work/aquasolutions): a Discord bot company and the beginning of Coinz.
- [BotHosted](${SITE_URL}/work/bothosted): a small hosting business started in 2019.
- [MaxerG](${SITE_URL}/work/maxerg): a Minecraft server and community started in 2016.
- [Bookmarks](${SITE_URL}/work/bookmarks): handmade bookmarks sold at school in 2013.

## Meet Siebe

Siebe will be in San Francisco from November 3 to December 3 to meet potential co-founders. He is open to calls before the trip. He lives in Belgium and enjoys the gym and karting.

- Email: siebe@baree.be
- [GitHub](https://github.com/SiebeBaree)
- [LinkedIn](https://www.linkedin.com/in/siebe-baree)
- [X](https://x.com/BareeSiebe)
`;

export function GET() {
  const posts = BLOG_POSTS.map(
    (post) =>
      `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`,
  ).join("\n");
  return new Response(`${PROFILE}\n## Blog\n\n${posts}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
