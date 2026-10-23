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
            "I was also pretty early with AI. I was using GPT-3 before ChatGPT launched at the end of 2022, back when it was only useful for the simple, repetitive stuff and I still wrote everything else myself."
          }
        </p>

        <h2>{"Five to ten things at once"}</h2>
        <p>
          {
            "Now I don't write a single line of code anymore, and I don't read everything that gets written either. Coding by hand is over for me and that forced my passion to change along with it."
          }
        </p>
        <p>
          {
            "I used to be able to focus on one thing, one specific feature, and nothing else. With AI it doesn't work like that anymore."
          }
        </p>
        <p>
          {
            "As soon as you've sent a prompt, the AI goes off and works on it, so you start writing the next prompt for another feature, and then another one. Before I knew it I was working on 5 to 10 things at the same time and switching between them all day."
          }
        </p>

        <h2>{"What it cost me"}</h2>
        <p>
          {
            "We all know multitasking doesn't work for deep work, and I still did it for months."
          }
        </p>
        <p>
          {
            "At some point I noticed I had a hard time thinking deeply about a problem, because I'd gotten so used to asking the AI to figure it out for me."
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
            "So something had to change. I need to keep shipping, but I also want to be able to think deeply again, and those are pretty much opposite mindsets."
          }
        </p>
        <p>
          {
            "What I do now is schedule my deep work early in the morning, without any distractions, and only start building with AI after that. That way I get both in the same day, which I need, because I have to ship every single day."
          }
        </p>
      </>
    );
  },
} satisfies BlogPost;
