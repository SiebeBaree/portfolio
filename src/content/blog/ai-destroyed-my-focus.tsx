import type { BlogPost } from "@/lib/blog";

export const post = {
  slug: "ai-destroyed-my-focus",
  title: "AI destroyed my focus",
  date: "2026-10-26",
  description:
    "I used to get so locked in while coding that I'd forget to eat. AI changed that. This is what it cost me and how I fixed it.",
  Content() {
    return (
      <>
        <p>
          {
            "I used to get so locked in while coding that I'd forget to eat. That doesn't really happen to me anymore and it's AI that changed it."
          }
        </p>

        <h2>{"Hooked from the start"}</h2>
        <p>
          {
            "Back in school I was already coding in my free time, which in start-up years feels like a lifetime ago. I was honestly addicted to it."
          }
        </p>
        <p>
          {
            "Before all of this, my days looked very different. I'd wake up at 4:20 in the morning and get a couple of hours of programming in before heading to the gym at 7. If I didn't have to be anywhere after that, I'd sit back down at 9 and keep going until 6 in the evening. Deep focus. No music, no phone, no nothing. I just worked, the whole day."
          }
        </p>

        <h2>{"Juggling agents"}</h2>
        <p>
          {
            "Now I don't write a single line of code anymore and I don't read everything that gets written either. Coding by hand is over for me and that forced my passion to change along with it (more on that later)."
          }
        </p>
        <p>
          {
            "I used to be able to focus on one thing, one specific feature, and nothing else. With AI it doesn't work like that anymore."
          }
        </p>
        <p>
          {
            "As soon as you've sent a prompt, the AI goes off and works on it, so you start writing the next prompt for another feature, and then another one. Before I knew it I was constantly jumping between features."
          }
        </p>
        <p>
          {
            "How many agents I have running really depends on the day. When I'm doing social media or sitting in back-to-back meetings, it can be zero. On a real coding day I usually have 2 to 4 going at all times, with short spikes up to 7, and sometimes as many as 10."
          }
        </p>
        <p>
          {
            "I don't have a fixed system for it yet, mostly because I'm not working on one big thing right now. That will come later and I expect it to make me a lot faster. For now I'm still tweaking my flow, because I don't want to end up shipping vibe-coded slop (even if some of it still slips through)."
          }
        </p>

        <h2>{"What it cost me"}</h2>
        <p>
          {
            "We all know multitasking doesn't work for deep work and I still did it for months."
          }
        </p>
        <p>
          {
            "To be fair, AI wasn't the only thing to blame. When I moved to Ghent I started experimenting a lot more with AI, but my sleep schedule also went out the window and that's when everything started falling apart. Once I got the rest back on track though, AI was the one thing still keeping me from focusing hard."
          }
        </p>
        <p>
          {
            "At some point I noticed I had a hard time thinking deeply about a problem, because I'd gotten so used to asking the AI to figure it out for me."
          }
        </p>
        <p>
          {
            "The best example is the sync feature in Enkryptify. I wanted to build it so we could easily add more integrations later, which takes a lot of thinking upfront. This was back when AI wasn't nearly as good as it is now, but I kept grabbing for it anyway."
          }
        </p>
        <p>
          {
            "I couldn't keep my focus during the hard thinking, so I pretty much let the AI make the decision for me. It was the wrong one and the architecture was really bad. Most of the issues we had in early Enkryptify came from that one feature."
          }
        </p>
        <p>
          {
            "And after a couple of hours of task switching, I found it really hard to do any deep work for the rest of the day."
          }
        </p>

        <h2>{"How I fixed it"}</h2>
        <p>
          {
            "So something had to change. I need to keep shipping, but I also want to be able to think deeply again and those are pretty much opposite mindsets."
          }
        </p>
        <p>
          {
            "What I do now is schedule my deep work early in the morning, without any distractions and only start building with AI after that. That way I get both in the same day, which I need, because I have to ship every single day."
          }
        </p>
        <p>
          {
            "I try to never let the AI start before I clearly know how I'm going to solve the problem myself. If it isn't clear in my head, my prompt will be vague and the output will be shit. That's exactly what happened with the sync feature."
          }
        </p>

        <h2>{"What I got in return"}</h2>
        <p>
          {
            "So what happened to my passion? Coding by hand was extremely fun and it's strange to think that in just a couple of years I went from writing 99.5% of my code myself (okay, with a lot of copy-pasting from Stack Overflow) to writing none of it."
          }
        </p>
        <p>
          {
            "But AI also gave us something we didn't have before. I now take my skills a lot further, into things I never found valuable enough to learn, like motion design and three.js. I also solve problems that used to not be worth my time, because most small issues are now just one or two prompts away from done."
          }
        </p>
        <p>
          {
            "And it's really satisfying. AI can build multiple features a day now, so I get that feeling of finishing something many times a day."
          }
        </p>
        <p>
          {
            "I think it makes us better, more well-rounded developers. A good backend developer can now build a decent frontend. There's just so much more you can do."
          }
        </p>
        <p>
          {
            "Coding has changed and AI is now a fundamental part of it. I believe we as developers will have to accept that, whether we like it or not."
          }
        </p>
        <p>
          {
            "It's not all good though, especially if you're just starting out. If you don't know the basics yet, AI can easily keep you from actually learning them, but that's probably a topic for another blog post."
          }
        </p>

        <h2>{"Was it worth it?"}</h2>
        <p>
          {
            'Honestly, I don\'t know. The speed at which I ship now is crazy. People used to talk about the "10x engineer" before AI and now it feels like every developer can be one.'
          }
        </p>
        <p>
          {
            "If I hadn't lost my focus, Enkryptify would probably have been a better product in the end. But without AI, it wouldn't have had nearly as many features."
          }
        </p>
      </>
    );
  },
} satisfies BlogPost;
