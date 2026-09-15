import type { BlogPost } from "@/lib/blog";

export const post = {
  slug: "getting-a-software-engineering-job-in-belgium",
  title: "My take on getting a software engineering job in Belgium",
  date: "2026-09-15",
  description:
    "What helped me get my first software engineering job in Belgium and what I look for when hiring developers.",
  Content() {
    return (
      <>
        <p>
          {
            'In June 2024, I started looking for a software engineering job in Belgium. Within a week, I had a "yes" from multiple companies. I had the luxury of choosing, despite having no professional experience.'
          }
        </p>
        <p>
          {
            "But there's a detail that matters: I had already spent years building things."
          }
        </p>
        <p>
          {
            "During my studies, I built more than 15 projects. One already had around 700,000 users when I applied. I continued working on it, and it eventually reached 1.35 million users before I shut it down. My GitHub was active afted I graduated because programming was something I kept doing outside of the classroom."
          }
        </p>
        <p>
          {
            "That's experience too. It gave me something concrete to show employers, even without any employment history. I wasn't starting from the same position as someone who had only completed their degree."
          }
        </p>
        <p>
          {
            "I'm Siebe. I have a bachelor's degree in computer science, spent a year working as an employee and now run my own company. I've also reviewed applications, interviewed candidates and hired a full-time employee."
          }
        </p>
        <p>
          {
            "Most of my experience as an applicant came from getting that first job. My hiring experience comes from a small company. Keep that context in mind, because what catches my attention won't necessarily impress every hiring team."
          }
        </p>
        <p>
          {
            "Still, I think a lot of applicants could improve how they present themselves. That applies to experienced developers too and probably to plenty of jobs outside software."
          }
        </p>
        <p>
          {
            'The market is harder but companies are still hiring. I keep hearing versions of the same complaint: "Nobody is hiring, and every job asks for experience I don\'t have."'
          }
        </p>
        <p>
          {
            "There is a real problem behind that frustration. In June 2024, VDAB recorded 11.7% fewer directly reported vacancies than a year earlier. "
          }
          <a
            href="https://www.vdab.be/sites/default/files/media/files/vacaturebericht_juni_2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source 1: VDAB vacancy report, June 2024"
          >
            [1]
          </a>
        </p>
        <p>
          {
            "My search in 2024 also doesn't tell you how easy yours should be today."
          }
        </p>
        <p>
          {
            "In 2026, VDAB still lists software development as a shortage occupation in Flanders. Le Forem does the same in Wallonia, while noting that employers often want developers who can become productive quickly. A shortage of developers doesn't mean every company is willing or able to train a junior. "
          }
          <a
            href="https://www.vdab.be/sites/default/files/media/files/Knelpuntberoepen2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source 2: VDAB shortage occupations, 2026"
          >
            [2]
          </a>{" "}
          <a
            href="https://www.leforem.be/infos-metiers/metiers/developpeur-developpeuse-de-logiciels.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source 3: Le Forem software developer occupation"
          >
            [3]
          </a>
        </p>
        <p>
          {
            "I also personally know companies that are open to juniors and struggling to find people they want to hire."
          }
        </p>
        <p>
          {
            'So I don\'t buy "nobody is hiring" as the whole explanation. But I don\'t buy "there\'s a shortage, so getting hired must be easy" either.'
          }
        </p>
        <p>
          {
            "The useful question is what you can do to make a company want to talk to you."
          }
        </p>
        <h2>{"Give me a reason to interview you"}</h2>
        <p>
          {
            "Imagine you're hiring one engineer and receive a pile of applications. You have to decide who deserves a closer look."
          }
        </p>
        <p>
          {
            "When I was doing that, I wanted evidence that someone could do the work, learn what they didn't know and contribute to the team. For a junior, I was especially interested in curiosity, the ability to grow and self-thought experience."
          }
        </p>
        <p>
          {
            "Instead, I received a lot of vague applications. Polished sentences, very little actual content."
          }
        </p>
        <p>{"Here's an example from an application to my previous company:"}</p>
        <blockquote>
          <p>
            {
              '"I am particularly interested in Enkryptify because of the opportunity to join a company at such an early and defining stage. The idea of contributing beyond a narrowly defined role, taking ownership, and helping shape how the company grows is very appealing to me."'
            }
          </p>
        </blockquote>
        <p>
          {
            "This tells me nothing about the applicant. What have you built? When have you taken ownership? What about our actual product interests you?"
          }
        </p>
        <p>
          {
            "Replace the company name and you could send it every startup in the world."
          }
        </p>
        <p>
          {
            "It reads like AI-generated filler to me. I have no specific reason to choose this person."
          }
        </p>
        <p>
          {
            "I'm very much in favor of using AI. Use it to research a company, challenge your draft or make your writing clearer. But your application should still contain your own experience and judgment. If all I learn about you is that you can generate a paragraph, you've wasted the opportunity."
          }
        </p>
        <p>
          {
            "Your resume (CV) and cover letter are often your first chance to make that impression. Make it easy to see what you can contribute."
          }
        </p>
        <p>{"Here are a few ways I'd do if I needed to find a job:"}</p>
        <h2>{"1. Show something you've built"}</h2>
        <p>
          {
            "Personal projects are one of my favourite things to see in any application (junior or senior). What did you decide to make when nobody handed you an assignment?"
          }
        </p>
        <p>
          {
            "Link to something I can try, show a short demo or explain an interesting problem you solved. Tell me what you actually did. A list of frameworks doesn't tell me much about your ability to use them."
          }
        </p>
        <p>
          {
            "You don't need 15 projects or a million users. A small tool that solves a real problem can give us plenty to discuss. Why did you build it that way? What broke? What would you change now?"
          }
        </p>
        <p>
          {
            "My own projects gave me things to talk about that a degree alone couldn't. That's the part of my experience I'd encourage you to copy: give the person reading your application evidence of what you can do."
          }
        </p>
        <h2>{"2. Let your interest come through"}</h2>
        <p>
          {
            "I like working with people who care about programming. People who get curious about how something works and want to understand it."
          }
        </p>
        <p>
          {
            "When I applied for jobs, I mentioned programming YouTubers I watched in my free time, including Theo and ThePrimeagen. The recruiter wasn't technical and didn't know them. Still, it gave me a way to talk about an interest that was genuinely part of my life."
          }
        </p>
        <p>
          {
            "That doesn't make watching YouTube a qualification. It's much more interesting if you can explain something you learned, tried or disagreed with."
          }
        </p>
        <p>
          {
            "You might get that from a book, a work problem or a conversation with another developer. You don't need my hobbies and you don't need to be loud or outgoing to talk thoughtfully about your work."
          }
        </p>
        <p>
          {
            "Don't start name-dropping creators because I mentioned them here. Give me something real to ask you about."
          }
        </p>
        <h2>{"3. Consider a short, personal video"}</h2>
        <p>
          {
            "A one or two-minute video would catch my attention more than another generic motivation letter."
          }
        </p>
        <p>
          {
            "I'd use it selectively for companies I particularly wanted to join. Introduce yourself, explain why this specific role interests you and show something relevant you've done."
          }
        </p>
        <p>
          {
            "If you're applying to an automotive software company and you've built a small CarPlay app, talk about it. That's a much more interesting connection than saying you're excited about their innovative environment."
          }
        </p>
        <p>
          {
            "Make a video talking to the camera for that company. Sending the same recording everywhere loses much of the point."
          }
        </p>
        <p>
          {
            "I'd include it as an optional link alongside the information the application asks for. The CV should still make sense on its own and a requested written answer still needs answering. You can't assume someone will open a video."
          }
        </p>
        <h2>{"4. Try the product and notice something"}</h2>
        <p>
          {
            "An applicant who has actually used our product already has something specific to talk about."
          }
        </p>
        <p>
          {"I'd pay attention to a short note like this hypothetical example:"}
        </p>
        <blockquote>
          <p>
            {
              '"P.S. I tried the signup flow of <your product> and wasn\'t sure whether my invitation had gone through. A confirmation message might help. Would love to improve <the product>."'
            }
          </p>
        </blockquote>
        <p>
          {
            "That tells me you spent time understanding what we do. It also gives me a glimpse of how you think about the people using software."
          }
        </p>
        <p>
          {
            "Keep it modest. You don't know every constraint behind the product and the team may already know about the problem. Describe what you observed and why it might matter."
          }
        </p>
        <p>
          {
            "You don't need to spend a weekend redesigning their platform. One useful observation is enough to start a conversation."
          }
        </p>
        <h2>{"5. Be yourself"}</h2>
        <p>
          {
            "Don't invent an interest in cars because the company works in automotive. Don't pretend you spend every evening programming if you don't."
          }
        </p>
        <p>
          {
            "I'm drawn to people who love building things. That's a preference I bring to hiring. But coding after work isn't the only way to show that you take the job seriously. People have different responsibilities and different amounts of free time."
          }
        </p>
        <p>
          {
            "Whatever your situation, you should be able to talk about your work honestly. Explain what you know, what you contributed and what you're still figuring out. If you used AI to build something, be ready to explain the result and the decisions you made."
          }
        </p>
        <p>
          {
            "The point of these examples is to help someone understand you. Copying them mechanically would produce another generic application."
          }
        </p>
        <h2>{"Make the next application more specific"}</h2>
        <p>
          {
            "Before sending an application, read it from the employer's side. What in it would make them want a conversation with you? What can they point to beyond your claim that you're motivated?"
          }
        </p>
        <p>
          {
            "If you could replace the company name and send it unchanged to 50 other employers, I'd give it another pass."
          }
        </p>
        <p>
          {
            "Pick something relevant you've done and explain why it matters for this role. Put the link where someone can find it. Cut the paragraph about being excited to join a dynamic team."
          }
        </p>
        <p>
          {
            "I think this gives you a better chance than sending more applications that say very little. I think some people make themselves much harder to hire than they need to. If you're already doing this and still struggling, DM me. I'll see whether I can help."
          }
        </p>
        <p>
          {
            "And if you hire engineers in Belgium, I'd like to hear where you agree or disagree. Especially if your experience looks different from mine."
          }
        </p>
      </>
    );
  },
} satisfies BlogPost;
