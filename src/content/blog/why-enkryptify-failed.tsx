import type { BlogPost } from "@/lib/blog";
import { CONTACT_EMAIL } from "@/lib/site";

export const post = {
  slug: "why-enkryptify-failed",
  title: "Why Enkryptify failed",
  date: "2026-10-14",
  description:
    "What went wrong in a year of building Enkryptify and what I'd do differently next time.",
  Content() {
    return (
      <>
        <h2>{"How it started"}</h2>
        <p>
          {
            'A month ago I posted that Enkryptify is shutting down, and I got a lot of the same question: "Why?"'
          }
        </p>
        <p>
          {
            'Loïc and I started Enkryptify in August 2025. I already had a working-ish product before that, but we officially founded "Enkryptify BV" in late August.'
          }
        </p>
        <p>
          {
            "In the beginning the responsibilities were clear: I build the product, Loïc arranges pilots to test it. Within about a month Loïc had landed 13 pilots. He was really on a roll! But we made them free pilots "
          }
          <strong>{"(first mistake)"}</strong>
          {
            ". Nobody had paid anything, so nobody had a real reason to show up."
          }
        </p>
        <p>
          {
            "The product wasn't ready yet, so they had to wait 1 to 3 weeks before they could start "
          }
          <strong>{"(second mistake)"}</strong>
          {". By the time we were ready, the momentum on their side was gone."}
        </p>
        <p>
          {
            "Then came onboarding, and all of a sudden we didn't hear back from most of them. But 4 replied! We onboarded 2 of them in the first week. They were enthusiastic, so we went to their offices to show the working product and explain how everything worked. We didn't really do an onboarding, it was more of an extended demo "
          }
          <strong>{"(third mistake)"}</strong>
          {
            ". They saw what it could do, but they never got it running in their own setup."
          }
        </p>
        <p>
          {
            "Around that time we really thought we were finally growing. So we raised VC money and hired our first full-time employee "
          }
          <strong>{"(fourth mistake)"}</strong>
          {
            ". We scaled the company before we had proof that anyone needed what we built."
          }
        </p>

        <h2>{"Searching for traction"}</h2>
        <p>
          {
            "To get started, our pilots had to upload their secrets, connect their services and install the CLI. But they never really started using it, so they couldn't get any value out of it."
          }
        </p>
        <p>
          {
            "Our product in the beginning was very basic and focused on solving just one problem. A problem these pilots didn't really have."
          }
        </p>
        <p>
          {
            "We kept trying to get more companies onboarded, but it went slowly. By November 2025 we had 4 companies onboarded and none of them used Enkryptify daily. We still barely had any feedback."
          }
        </p>
        <p>
          {
            "So in December 2025 we focused on a new, emerging problem: supply chain attacks. Exactly the same result."
          }
        </p>
        <p>{"But then..."}</p>
        <p>
          {
            "In January 2026, one of our pilots decided to continue and paid for Enkryptify! We were so happy. We kept testing the market, looking for new customers who would pay to solve their secrets problem."
          }
        </p>
        <p>
          {"During the first half of 2026 we tried a lot of different things:"}
        </p>
        <ul>
          <li>{"Selling outside of Belgium"}</li>
          <li>{"Focusing on MSPs"}</li>
          <li>{"Secrets management for AI agents"}</li>
        </ul>
        <p>
          {
            "None of them showed any traction. We could have tried a million different things, but we couldn't get any of it to work. After a year without traction, that started to weigh on our motivation."
          }
        </p>

        <h2>{"Selling a developer tool to developers"}</h2>
        <p>
          {
            "Apart from the product and the problems we picked, there was a second big issue: go-to-market."
          }
        </p>
        <p>
          {
            "Enkryptify is a developer tool, so the people we sold to were developers and CTOs. And as many developers know: we do not like salespeople. We want someone who understands our stack, can answer the hard questions and doesn't sound like a pitch."
          }
        </p>
        <p>
          {
            "Loïc had never sold SaaS before, let alone to technical people. That's a tough place to start, because selling to developers is a skill on its own. I joined almost all of the sales calls in the beginning and some important ones near the end, to be the technical person in the room. Even that didn't really work."
          }
        </p>
        <p>
          {
            "The honest conclusion: neither of us was the right person for this kind of sale. And we barely did any marketing, so nobody was finding us on their own."
          }
        </p>

        <h2>{"July and August 2026"}</h2>
        <p>
          {
            "In July 2026 we decided to throw everything overboard and start from scratch. The product was good enough for our goal of getting new customers, so the full focus went to go-to-market."
          }
        </p>
        <p>
          {
            "That month we also had the hardest conversation of the whole journey. Since November 2025 I had raised concerns many times about how we worked together and how go-to-market was going. But I never attached a consequence to them. This time I did: if things hadn't changed by the end of August, I would step out."
          }
        </p>
        <p>
          {
            "We also brought in an expert in the field to look at everything with fresh eyes. He came to the same conclusion: something fundamental had to change."
          }
        </p>
        <p>
          {
            "In August we sat down again. A month had passed, the goals we set in July weren't reached and there was still no sign of traction."
          }
        </p>
        <p>{"So we decided to stop. We shut down Enkryptify."}</p>

        <h2>{"What I'd do differently"}</h2>
        <p>{"Looking back, these are the lessons I'm taking with me."}</p>
        <ol>
          <li>
            <strong>{"Build with early believers, not for them."}</strong>
            {
              " I built the first version mostly on my own and then went looking for people to use it. Next time I'd first find a handful of companies that really have the problem, and build it together with them. Show them rough versions every week, let them shape what gets built, and only call it a product once they actually use it. That would have told us months earlier that our pilots didn't really have the problem we were solving."
            }
          </li>
          <li>
            <strong>{"Ask pilots for commitment."}</strong>
            {
              " A free pilot costs nothing, including nothing to walk away from. Even a small fee, or clear agreements on what success looks like, makes people show up."
            }
          </li>
          <li>
            <strong>{"Don't make pilots wait."}</strong>
            {
              " If people sign up and then wait weeks, the moment is gone. Building together with early believers fixes this too: they're part of it from the start."
            }
          </li>
          <li>
            <strong>{"Onboard, don't demo."}</strong>
            {
              " Stay with a customer until it runs in their own setup and they've gotten value from it at least once."
            }
          </li>
          <li>
            <strong>{"Don't scale before traction."}</strong>
            {
              " Raising money and hiring felt like progress, but it added pressure before we knew anyone really needed the product."
            }
          </li>
          <li>
            <strong>
              {
                "Know what sale your product needs, and who on the team can make it."
              }
            </strong>
            {
              " A developer tool needs someone who speaks developer and is comfortable selling. If the founders can't cover that, it's the first gap to fill, and developer-focused marketing has to start on day one."
            }
          </li>
          <li>
            <strong>{"Set a much higher pace."}</strong>
            {
              " With AI, building and selling can both move about 10x faster than a few years ago, so there's no room for waiting around anymore. The new baseline is matching what the very best developers and salespeople could do before AI."
            }
          </li>
          <li>
            <strong>
              {"Pick the team like everything depends on it, because it does."}
            </strong>
            {
              " The people around the table decide whether a company makes it. Next time I'll spend far more of my energy on finding one or two co-founders who are relentless and truly among the best at what they do."
            }
          </li>
          <li>
            <strong>{'Define what "co-founder" means on day one.'}</strong>
            {
              " Who owns which decisions, who sets direction, what ownership looks like in practice. We never made that explicit, and it caught up with us."
            }
          </li>
        </ol>

        <h2>{"Thank you"}</h2>
        <p>
          {
            "Enkryptify didn't make it, but I learned more in this year than in any year before it."
          }
        </p>
        <p>
          {
            "Thank you to our pilots, to our paying customer for believing in us, to our investors for backing us and to the expert for the honest advice. And Loïc, thanks for jumping into this with me. We gave it a real shot together."
          }
        </p>

        <h2>{"What's next"}</h2>
        <p>
          {
            "Enkryptify is over, but I'm not done building. I'm looking for a co-founder to start my next venture with: someone exceptional, who really masters their craft and wants to move fast. You should be based in San Francisco or Belgium, or be willing to move to one of them."
          }
        </p>
        <p>
          {"Think that's you? Send me an email at "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {"."}
        </p>
      </>
    );
  },
} satisfies BlogPost;
