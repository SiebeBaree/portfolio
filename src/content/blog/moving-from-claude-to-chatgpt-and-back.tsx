import type { BlogPost } from "@/lib/blog";

export const post = {
  slug: "moving-from-claude-to-chatgpt-and-back",
  title: "My thoughts after moving from Claude to ChatGPT and back",
  date: "2026-10-06",
  description:
    "Why I left Claude for ChatGPT, why I came back and why I'm pretty sure I'm staying this time.",
  Content() {
    return (
      <>
        <p>
          {
            'Every time I pressed "send" in ChatGPT, it felt like pulling the lever on a slot machine. Sometimes I hit the jackpot. Sometimes I lost an hour. So I switched back to Claude.'
          }
        </p>
        <p>
          {
            "This is how I left, why I left and why I'm pretty sure I'm staying this time."
          }
        </p>

        <h2>{"Two years of not thinking about it"}</h2>
        <p>
          {
            "I started using Claude for coding in August 2024, back when Sonnet 3.5 was the best model Anthropic had. And no, I wasn't vibe coding. I still wrote somewhere between 50 and 80% of the code myself. Claude was just the model I used for tab completion and writing simple functions."
          }
        </p>
        <p>
          {
            "I first started using Claude in Cursor and from February 2026 (when Opus 4.6 came out) in Claude Code. I canceled my Cursor subscription around the same time. When a tool works, you stop thinking about it."
          }
        </p>

        <h2>{"Giving ChatGPT a fair shot (twice)"}</h2>
        <p>
          {
            "In the summer of 2026, the developer community suddenly fell back in love with ChatGPT. Everyone was talking about GPT-5.5, so I bought a $100 subscription to see what the fuss was about."
          }
        </p>
        <p>
          {
            "I didn't like it. Not one bit. My prompts are often a little vague, because I know what I want but I don't always spell it out. Claude usually figures out what I mean. GPT-5.5 didn't. It did what I said, not what I meant."
          }
        </p>
        <p>
          {
            "When GPT-5.6 Sol came out I tried again. Better, but it still didn't click. I didn't like how it wrote code and I didn't like how it talked to me. So I kept using Claude for almost everything."
          }
        </p>
        <p>
          {
            "I could afford to hop between subscriptions like this because I was building my own company, Enkryptify. I used the models to build the product and to write marketing content, so testing them was part of the job."
          }
        </p>

        <h2>{"Opus 5"}</h2>
        <p>
          {
            "Then Opus 5 came out, and it was bad. To put it lightly. It frustrated me so much that at some point I just stopped building. Me, someone who builds for fun, closed the laptop because I was done fighting the model."
          }
        </p>
        <p>
          {
            "I was on the $200 Max plan, so I did have access to Fable 5.1. But Fable could only use 50% of my weekly limits and even on the biggest plan I burned through that crazy fast. Great model, too expensive to actually use."
          }
        </p>
        <p>
          {
            "At the end of August we decided to shut down Enkryptify. That also meant something very practical: from now on, every AI subscription would come out of my own pocket."
          }
        </p>

        <h2>{"When it's your own money"}</h2>
        <p>
          {
            "I still love building, so going without wasn't an option. My Claude subscription ran out on September 8th and I had to choose:"
          }
        </p>
        <ul>
          <li>{"ChatGPT Pro 5x: $100"}</li>
          <li>{"Claude Max 5x: $100"}</li>
        </ul>
        <p>
          {
            "Same price, so on paper an easy comparison. In practice it wasn't even close, just not in the direction you'd expect after two years. I was hitting my limits on Claude Max 20x all the time, so 5x would have run out in days. And the model I'd be spending those limits on was Opus 5, which I didn't want to use anyway."
          }
        </p>
        <p>{"So I switched to ChatGPT."}</p>

        <h2>{"The slot machine"}</h2>
        <p>
          {
            "At first I loved it. OpenAI had just released GPT-6 Astra and it was good. It finally handled my vague prompts. It was okay at design, okay at coding and while I still ran out of usage, I got a lot closer to the end of the week before it happened."
          }
        </p>
        <p>
          {
            "But the longer I used it, the more one thing bugged me: I never knew what I was going to get. Some answers were smarter than anything Fable 5.1 ever gave me. Others were dumber than Opus 5 and Opus 5 is the reason I left Claude in the first place."
          }
        </p>
        <p>
          {
            "That unpredictability wears you down. You can't get into a rhythm with a tool when you don't know if it's going to help you or cost you an hour. Astra was probably the best model out there at that moment. I just didn't enjoy working with it."
          }
        </p>

        <h2>{"Opus 5.5"}</h2>
        <p>
          {
            "Then Opus 5.5 came out and my timeline filled up with what people were building with it. I was blown away. I was still paying for ChatGPT, so I grabbed the $20 Claude plan just to try it. You can't do much on $20, but you can do enough to know."
          }
        </p>
        <p>{"And I knew. It's the best model I've ever used."}</p>
        <p>
          {
            "So I flipped everything around. ChatGPT is down to $20 and I'm back on Claude Max 5x. I'm in love!"
          }
        </p>

        <h2>{"So, which one is better?"}</h2>
        <p>{"Honestly, it depends on what you're doing."}</p>
        <p>{"For everything that isn't code, I actually prefer ChatGPT."}</p>
        <p>
          {
            "But for coding and anything creative, Claude wins by miles and it always has. Part of that is the output. Part of it is how they talk to you. Talking to ChatGPT feels like talking to a very smart system that takes everything literally. Talking to Claude feels like talking to a person who gets what you mean."
          }
        </p>
        <p>
          {
            "The month with Astra also taught me something about myself: consistency matters more to me than peak intelligence. I'd rather have a model that's great 9 out of 10 times than one that's brilliant half the time and lost the other half."
          }
        </p>
        <p>
          {
            "So for now I'm back on #TeamClaude. And this time I think I'll stay for a while. Months, maybe years. Ask me again when the next model drops."
          }
        </p>
      </>
    );
  },
} satisfies BlogPost;
