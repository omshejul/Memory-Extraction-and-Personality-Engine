import { Conversation } from "@/lib/types";

/**
 * Sample conversation 1: Career-Focused Professional (Arjun)
 * Themes: Work stress, ambition, work-life balance, productivity
 */
const arjunConversation: Conversation = {
  id: "arjun-professional",
  name: "Arjun - Software Engineer",
  description: "Career-focused professional dealing with work stress and ambition",
  messages: [
    {
      role: "user",
      content: "I've been feeling so overwhelmed lately with all these project deadlines piling up at work.",
    },
    {
      role: "ai",
      content: "That sounds really stressful. Tell me more about what's been going on with your workload.",
    },
    {
      role: "user",
      content: "Well, I'm a software engineer at a mid-size tech startup, and we're launching a new product next month. I'm leading the backend development.",
    },
    {
      role: "ai",
      content: "Leading a major launch is a big responsibility. How are you managing your time?",
    },
    {
      role: "user",
      content: "Honestly, not great. I've been working until 9 PM most nights this week. I haven't had time for my usual morning runs or even to meal prep.",
    },
    {
      role: "ai",
      content: "It sounds like your self-care routines are taking a hit. How long have you been skipping your runs?",
    },
    {
      role: "user",
      content: "About two weeks now. I used to run every morning at 6 AM before work. It really helped me start the day with a clear mind.",
    },
    {
      role: "ai",
      content: "Morning runs seem important to you. What made you start that habit?",
    },
    {
      role: "user",
      content: "I started last year when I realized I was getting burned out. Running helps me think through problems and reduces my anxiety about deadlines.",
    },
    {
      role: "ai",
      content: "So running serves as both physical exercise and mental clarity for you. Have you noticed your anxiety increasing without it?",
    },
    {
      role: "user",
      content: "Definitely. I feel more on edge, and I'm getting frustrated with my team more easily. I snapped at my junior dev yesterday over something minor.",
    },
    {
      role: "ai",
      content: "That must have been difficult. How did you handle it afterward?",
    },
    {
      role: "user",
      content: "I apologized to him. I hate when I let stress make me act like that. I pride myself on being a supportive team lead.",
    },
    {
      role: "ai",
      content: "It's good that you recognized it and apologized. What does being a supportive leader mean to you?",
    },
    {
      role: "user",
      content: "It means being patient, giving constructive feedback, and making sure my team feels valued. My mentor when I was a junior dev was like that, and it made such a difference.",
    },
    {
      role: "ai",
      content: "Sounds like your mentor had a lasting impact on your values. What are your goals for your career?",
    },
    {
      role: "user",
      content: "I want to become a senior engineer within the next two years. Maybe even a tech lead eventually. But I don't want to sacrifice my health and personal life to get there.",
    },
    {
      role: "ai",
      content: "That's an important balance. What does your personal life look like outside of work?",
    },
    {
      role: "user",
      content: "Pretty minimal right now, honestly. I live alone in a small apartment downtown. I usually cook on Sundays - I love trying new recipes. And I have a few close friends from college I see occasionally.",
    },
    {
      role: "ai",
      content: "Cooking seems to be another creative outlet for you. What kind of recipes do you enjoy?",
    },
    {
      role: "user",
      content: "I'm really into trying different cuisines. Thai food, Italian pasta dishes, Indian curries. I like the precision of following recipes and then experimenting once I know the basics.",
    },
    {
      role: "ai",
      content: "That methodical approach sounds similar to how you might approach coding.",
    },
    {
      role: "user",
      content: "Ha, yeah! I never thought about it that way, but you're right. I like systems and understanding how things work before I innovate.",
    },
    {
      role: "ai",
      content: "Do you make time for cooking during busy work periods?",
    },
    {
      role: "user",
      content: "Not really. I've been ordering takeout way too much lately. It's expensive and not as satisfying. Plus, I waste my Sunday meal prep.",
    },
    {
      role: "ai",
      content: "It sounds like several of your important routines have been disrupted. What would help you get back on track?",
    },
    {
      role: "user",
      content: "I think I need to set better boundaries with work. I can't keep sacrificing everything for one project. My manager keeps praising my dedication, but I'm burning out.",
    },
    {
      role: "ai",
      content: "Setting boundaries can be challenging, especially when you're getting positive feedback. What's holding you back?",
    },
    {
      role: "user",
      content: "I guess I'm worried about disappointing people or seeming less committed. I grew up with parents who really valued hard work and achievement.",
    },
    {
      role: "ai",
      content: "Those values clearly shaped you. How do you think they'd view the idea of sustainable success versus burnout?",
    },
    {
      role: "user",
      content: "That's a good question. My dad actually had a heart attack a few years ago from work stress. He's okay now, but it scared me. I don't want to end up like that.",
    },
    {
      role: "ai",
      content: "That experience must have really impacted your perspective on work-life balance.",
    },
  ],
};

/**
 * Sample conversation 2: Creative Hobbyist (Priya)
 * Themes: Art, creativity, self-doubt, social anxiety, finding community
 */
const priyaConversation: Conversation = {
  id: "priya-creative",
  name: "Priya - Digital Artist",
  description: "Creative hobbyist dealing with self-doubt and artistic growth",
  messages: [
    {
      role: "user",
      content: "I finally finished that digital painting I've been working on for weeks, but now I'm too scared to post it online.",
    },
    {
      role: "ai",
      content: "Congratulations on finishing it! What's making you hesitant to share it?",
    },
    {
      role: "user",
      content: "I don't know, I guess I'm worried people won't like it or that it's not good enough. I've been doing digital art for three years now, and I still feel like an amateur.",
    },
    {
      role: "ai",
      content: "Three years is a significant amount of time. What kind of digital art do you create?",
    },
    {
      role: "user",
      content: "Mostly character illustrations and fantasy landscapes. I love creating these otherworldly scenes with dramatic lighting. I use Procreate on my iPad.",
    },
    {
      role: "ai",
      content: "What draws you to fantasy themes?",
    },
    {
      role: "user",
      content: "I've always loved escaping into fantasy worlds. I grew up reading tons of fantasy novels - Tolkien, Sanderson, Le Guin. Art feels like my way of creating those worlds myself.",
    },
    {
      role: "ai",
      content: "That's beautiful. So art is both a creative outlet and a form of escapism for you?",
    },
    {
      role: "user",
      content: "Yeah, exactly. When I'm drawing, especially late at night when everything's quiet, I feel completely absorbed. All my anxieties just fade away.",
    },
    {
      role: "ai",
      content: "You mentioned anxieties. What kinds of things make you anxious?",
    },
    {
      role: "user",
      content: "Social situations mostly. I work as a graphic designer at a small marketing agency, and I dread team meetings. I'm fine one-on-one, but groups make me really uncomfortable.",
    },
    {
      role: "ai",
      content: "Do you enjoy the graphic design work itself?",
    },
    {
      role: "user",
      content: "It pays the bills, but it's not very creative. Mostly making social media graphics and simple logos. I dream of doing art full-time, but that feels impossible.",
    },
    {
      role: "ai",
      content: "What would doing art full-time look like for you?",
    },
    {
      role: "user",
      content: "Maybe freelance illustration, concept art for games, or even selling prints. I follow so many artists on Instagram who make it work, and I'm so envious.",
    },
    {
      role: "ai",
      content: "You mentioned Instagram. Is that where you're thinking of posting your finished piece?",
    },
    {
      role: "user",
      content: "Yeah, I have an art account but I've only posted a few times. I see other artists getting thousands of likes and building communities, and I just... freeze up.",
    },
    {
      role: "ai",
      content: "What happens when you freeze up?",
    },
    {
      role: "user",
      content: "I start comparing myself to everyone else. Their art looks so polished and professional. Mine feels clunky. Then I convince myself no one will care about what I make.",
    },
    {
      role: "ai",
      content: "That self-doubt sounds really painful. Have you always struggled with comparing yourself to others?",
    },
    {
      role: "user",
      content: "Pretty much. I was never the 'talented' kid growing up. My older sister was a straight-A student and star athlete. I was just... there. Average at everything.",
    },
    {
      role: "ai",
      content: "How did that affect you?",
    },
    {
      role: "user",
      content: "I think it made me feel invisible. Art became this private thing where I didn't have to compete or be judged. But now I want to share it, and all those old feelings come back.",
    },
    {
      role: "ai",
      content: "Sharing your art would make you visible in a new way. That's vulnerable.",
    },
    {
      role: "user",
      content: "Exactly. But I also feel lonely in my art journey. I don't have any creative friends who understand this world. My roommate thinks art is just a hobby, not something serious.",
    },
    {
      role: "ai",
      content: "Finding community sounds important to you. Have you looked for other artists to connect with?",
    },
    {
      role: "user",
      content: "There are some Discord servers for artists, but again, social anxiety. I lurk but never really participate. It's exhausting.",
    },
    {
      role: "ai",
      content: "What would it take for you to feel comfortable participating?",
    },
    {
      role: "user",
      content: "I don't know. Maybe if I felt like my art was good enough to earn respect? Or if I could find just one or two people to connect with instead of a whole community.",
    },
    {
      role: "ai",
      content: "Small connections might feel more manageable than large groups.",
    },
    {
      role: "user",
      content: "Yeah. Actually, I do have this one online friend I met through a fantasy art challenge last year. We message sometimes about our projects. That feels safe.",
    },
    {
      role: "ai",
      content: "What makes that friendship feel safe?",
    },
    {
      role: "user",
      content: "We're at similar skill levels, and she's really encouraging without being fake about it. She gives honest feedback and shares her struggles too. It's refreshing.",
    },
    {
      role: "ai",
      content: "That sounds like a valuable connection. Does she post her art publicly?",
    },
    {
      role: "user",
      content: "Yeah, she does. And seeing her be brave about it makes me want to try too. I just need to get over this fear of judgment.",
    },
  ],
};

/**
 * Sample conversation 3: University Student (Rohan)
 * Themes: Academic pressure, social life, future uncertainty, identity
 */
const rohanConversation: Conversation = {
  id: "rohan-student",
  name: "Rohan - University Student",
  description: "University student navigating academic pressure and future uncertainty",
  messages: [
    {
      role: "user",
      content: "I have three midterms next week and I'm completely stressed out. I don't know how I'm going to study for all of them.",
    },
    {
      role: "ai",
      content: "Three midterms in one week sounds overwhelming. What subjects are they for?",
    },
    {
      role: "user",
      content: "Organic chemistry, calculus, and psychology. I'm a pre-med student at Delhi University, second year. The chemistry one is what really scares me.",
    },
    {
      role: "ai",
      content: "Why does organic chemistry scare you more than the others?",
    },
    {
      role: "user",
      content: "I barely passed the first midterm. The professor is super tough, and I feel like everyone else in the class gets it except me. I need at least a B+ to keep my GPA up for med school applications.",
    },
    {
      role: "ai",
      content: "That pressure to maintain your GPA sounds intense. How long have you wanted to go to med school?",
    },
    {
      role: "user",
      content: "Since high school, I guess? My mom's a nurse and she always talked about how rewarding healthcare is. I like the idea of helping people, and I'm good at science.",
    },
    {
      role: "ai",
      content: "You said 'I guess' - does that mean you're uncertain about it?",
    },
    {
      role: "user",
      content: "I mean, I think so? Sometimes I wonder if I'm doing this because I want to or because it's what's expected. My parents are so proud that I'm pre-med.",
    },
    {
      role: "ai",
      content: "What would you do if expectations weren't a factor?",
    },
    {
      role: "user",
      content: "Honestly, I'm not sure. I really enjoy my psychology classes actually. Learning about how people think and behave is fascinating. Way more interesting than memorizing chemical reactions.",
    },
    {
      role: "ai",
      content: "What specifically interests you about psychology?",
    },
    {
      role: "user",
      content: "I love understanding human behavior and what motivates people. We just covered cognitive behavioral therapy in class and I found it so cool how thoughts influence actions.",
    },
    {
      role: "ai",
      content: "Have you considered psychology as a career path?",
    },
    {
      role: "user",
      content: "Sometimes, but I'm worried about disappointing my parents. They've sacrificed a lot to help me with tuition. And psychiatry could combine both interests, right?",
    },
    {
      role: "ai",
      content: "That's true, psychiatry does combine medicine and mental health. How are you managing your stress right now?",
    },
    {
      role: "user",
      content: "Not well. I've been staying up until 2 AM studying, then I'm exhausted in class. I'm drinking way too much coffee - probably four cups a day at this point.",
    },
    {
      role: "ai",
      content: "That sleep schedule sounds unsustainable. What's your typical routine like?",
    },
    {
      role: "user",
      content: "I wake up around 8 for my 9 AM class, go to classes until 3, then either study at the library or hang out with my roommates. At night I try to study more but I end up procrastinating on TikTok.",
    },
    {
      role: "ai",
      content: "You mentioned roommates. What's your living situation?",
    },
    {
      role: "user",
      content: "I live in an apartment with three other people. They're cool, but they're way more social than me. They go to parties every weekend and I usually stay in.",
    },
    {
      role: "ai",
      content: "Do you enjoy staying in or do you feel like you're missing out?",
    },
    {
      role: "user",
      content: "Both? I'm pretty introverted and parties drain me. But sometimes I feel lonely, like I'm not having the 'real college experience' everyone talks about.",
    },
    {
      role: "ai",
      content: "What would a fulfilling college experience look like for you?",
    },
    {
      role: "user",
      content: "Maybe having a close group of friends I can really connect with? I have my study group for chemistry and we get along well. We grab bubble tea after class sometimes.",
    },
    {
      role: "ai",
      content: "Bubble tea study sessions sound nice. What do you like about that group?",
    },
    {
      role: "user",
      content: "They're smart but not competitive in a toxic way. We actually help each other instead of being cutthroat about grades. And we can joke around and talk about non-school stuff too.",
    },
    {
      role: "ai",
      content: "Having supportive friends in a competitive environment seems valuable to you.",
    },
    {
      role: "user",
      content: "Yeah, definitely. Pre-med culture can be really intense. Everyone's stressed about GPA and MCAT scores and extracurriculars. It's exhausting.",
    },
    {
      role: "ai",
      content: "What helps you decompress from all that pressure?",
    },
    {
      role: "user",
      content: "Honestly, gaming. I play League of Legends with my friends from high school online. It's nice to just zone out and have fun for a few hours.",
    },
    {
      role: "ai",
      content: "Do you feel guilty about taking time to game?",
    },
    {
      role: "user",
      content: "Yes, always. Like I should be studying instead. But if I don't take breaks I just burn out and can't focus anyway.",
    },
    {
      role: "ai",
      content: "It sounds like you're learning about your own limits and needs.",
    },
    {
      role: "user",
      content: "I guess so. I just wish I had more clarity about what I really want. Everyone else seems so sure about their path, and I'm just... confused and stressed.",
    },
  ],
};

/**
 * All sample conversations
 */
export const SAMPLE_CONVERSATIONS: Conversation[] = [
  arjunConversation,
  priyaConversation,
  rohanConversation,
];

/**
 * Get a conversation by ID
 * @param id - Conversation ID
 * @returns Conversation or undefined
 */
export function getConversationById(id: string): Conversation | undefined {
  return SAMPLE_CONVERSATIONS.find((conv) => conv.id === id);
}

/**
 * Get conversation by index (for UI selection)
 * @param index - Array index
 * @returns Conversation or undefined
 */
export function getConversationByIndex(index: number): Conversation | undefined {
  return SAMPLE_CONVERSATIONS[index];
}
