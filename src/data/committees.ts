export interface Question {
  id: string
  label: string
  required: boolean
  wordLimit?: number
  type: 'text' | 'textarea' | 'url' | 'select' | 'multiselect'
  options?: string[]
}

export interface Committee {
  id: string
  label: string
  description: string
  questions: Question[]
}

export const committees: Committee[] = [
  {
    id: 'strategic-initiatives',
    label: 'Strategic Initiatives',
    description: 'The Strategic Initiatives Committee serves as the intermediary between student voices and actionable change, working directly with Haas Administration and the HBSA Executive Board to carry out complex, pivotal engagements. Given the critical nature of our work, we prioritize confidentiality and commitment above all else, and we welcome those who are eager to serve our community in unique and meaningful ways.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the Strategic Initiatives team? Please limit your response to 20 words.',
        required: true,
        wordLimit: 20,
        type: 'textarea'
      },
      {
        id: 'commitment',
        label: 'One of our core values is commitment - please tell us your class schedule, organizations, and other relevant activities you have for planned for the coming semester.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'proposal',
        label: '(Optional) Strategic Initiatives Associates may have the opportunity to lead their own initiatives - please use this space to share any proposals you may have.',
        required: false,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'tech',
    label: 'Tech',
    description: 'The Tech Committee is the engine behind HBSA’s digital presence, turning ideas into reality and chaos into clean systems. We make sure everything runs smoothly behind the scenes—whether that’s streamlining events, enhancing communication, or leveling up how members connect with HBSA. This year, we’re all about bold upgrades, creative problem-solving, and building tools that actually make people’s lives easier. If it clicks, scrolls, or sends—we’ve got it covered.',
    questions: [
      {
        id: 'excitement',
        label: 'What excites you most about working on the tech team, and what unique perspective or skillset would you bring to HBSA?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'improvement',
        label: 'If you could improve one part of HBSA’s digital experience (website, communications, systems, etc.), what would it be and how would you approach it?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'dream-project',
        label: 'What’s one tool, project, or idea you’ve always wanted to build? (It doesn’t have to be fully realistic—dream big!)',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'soac',
    label: 'Student Organizations Advisory Council (SOAC)',
    description: 'The Student Organizations Advisory Council (SOAC) advocates for the Haas student body by supporting, connecting, and empowering Haas-sponsored organizations (HSOs). As the liaison between student orgs and administration, we work to improve transparency, streamline communication, and expand access to resources. Our goal is to strengthen the student experience by actively listening to org needs and launching new initiatives, like the HSO Fellowship Program, that promote collaboration and community. Through our efforts, we strive to help each org thrive and contribute meaningfully to the broader Haas community.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the SOAC committee, and what do you hope to gain from the experience?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'communication',
        label: 'Describe a time you managed communication or logistics across multiple people or groups. How did you ensure things stayed organized?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'unique-perspective',
        label: 'What unique perspectives or skills do you bring that would help strengthen SOAC’s mission of supporting student orgs?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'improve-collab',
        label: 'If you could improve one thing about HSO collaboration at Haas, what would it be and why?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'student-affairs',
    label: 'Student Affairs',
    description: 'Student Affairs is all about making HBSA more connected, supportive, and student-driven. We run flagship events like Haas Formal and the Haas Mentorship Program, and we also give students the chance to pitch and plan their own events. Whether it’s a career panel, study night, or social hangout, we’re here to help students build community while supporting each other academically and professionally.',
    questions: [
      {
        id: 'failure',
        label: 'Describe a time when something you organized didn’t go as planned. What did you learn from it?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'improve-experience',
        label: 'What’s a student experience at Berkeley or in HBSA that you think could be improved? What would you do differently?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'midterm-event',
        label: 'We want to plan a midterm week event with a $150 budget. Propose an idea that’s realistic, engaging, and genuinely valuable for students- something they’d actually be excited to attend and benefit from during a busy week.',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    description: 'The Sustainability Committee is dedicated to promoting environmental action and awareness at Haas. We lead impactful initiatives like Earth Week, Zero Waste Audits, and Thrift Cycle events, while amplifying student voices through our Sustainability Sunday spotlight series. Through cross-campus collaborations and new projects, we aim to make eco-conscious choices more visible, accessible, and empowering. Our mission is to cultivate a community that leads with environmental responsibility and creates a lasting impact. Join us in building a more sustainable Haas!',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the HBSA Sustainability Committee, and what does sustainability mean to you personally?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'perspective',
        label: 'What unique perspectives or experiences would you bring to the committee?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'professional-development',
    label: 'Professional Development',
    description: 'The Professional Development Committee empowers members to grow their skills, build meaningful connections, and navigate career opportunities with confidence. We host workshops, coffee chats, panels, and speaker events that bring students face-to-face with industry leaders and alumni. From resume reviews to networking nights, our goal is to create high-impact experiences that help members sharpen their professional toolkit and unlock new possibilities.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the Professional Development Committee, and how do you see yourself contributing to its mission?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event-experience',
        label: 'Tell us about a time you organized or supported a professional event (e.g., workshop, panel, networking session). What role did you play, and what was the outcome?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'skills',
        label: 'What hard skills in outreach (e.g., Apollo, Mailmerge) can you contribute to this role?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'transfer-development',
    label: 'Transfer Development',
    description: 'The Transfer Development Committee empowers both current and prospective transfer students by fostering community and building connections across the Haas ecosystem to strengthen the transfer experience.  The committee consists of two teams: Outreach and Integration. Outreach works closely with the Haas Undergraduate Office to lead initiatives designed for community colleges, such as Envision Haas, case competitions, and application workshops. Integration builds community within Haas by organizing a mix of social and professional events to support transfer students in their transition.  Transfer Development is dedicated to ensuring every transfer student feels supported and enabled at the Haas School of Business!',
    questions: [
      {
        id: 'community',
        label: 'What does the transfer community mean to you, and how do you see yourself contributing to the transfer community at Haas?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'leadership',
        label: 'Describe a time you led or contributed to a student organization or team effort at your Community College or High School. What role did you play, and what was the outcome?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'inspiration',
        label: 'What inspired your decision to attend community college, and how has that experience influenced your personal or academic journey?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'The Marketing Committee manages all of HBSA’s social media channels, maintaining our presence across YouTube, TikTok, LinkedIn, and Instagram to strengthen engagement within the Haas community. From career resources and academic advice to event promotions and student spotlights, we produce high-quality content that supports professional development and fosters community. Our goal is to keep the Haas community informed, connected, and inspired through the diverse content we create!',
    questions: [
      {
        id: 'workload',
        label: 'How do you prioritize and manage your workload when faced with multiple deadlines? (200 words max)',
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'Please describe one initiative or idea that you would like to implement for marketing committee this semester. (200 words max)',
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'portfolio',
        label: 'Please link your marketing portfolio below and ensure that anyone has access to it.',
        required: true,
        type: 'url'
      }
    ]
  },
  {
    id: 'public-service',
    label: 'Public Service',
    description: 'The HBSA Public Service Committee connects students with local organizations, alumni in social impact, and opportunities to launch their own service projects. We aim to build partnerships, expand volunteer opportunities, and engage in purposeful fundraising to support impactful initiatives. By combining business skills with community service, we help students create meaningful change and strengthen Haas’s presence as a force for good in the Bay Area and beyond.',
    questions: [
      {
        id: 'impact',
        label: 'What does public service or community impact mean to you, and why is it important for business students?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'Tell me about a time when you took initiative on a project or event. What did you do, and what was the outcome?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'ideas',
        label: 'Since this committee is new and growing, what ideas or events would you like to help create or lead?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'fundraising',
        label: 'Describe a time you raised money or asked for support for a cause. What did you learn from that experience?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'corporate-relations',
    label: 'Corporate Relations',
    description: 'The Corporate Relations Committee creates impactful, experiential opportunities that connect students with professionals across industries. We plan and host events like office visits, Mock Superday, case competitions, and more to help students explore career paths, build confidence, and gain real-world insight. Our goal is to foster meaningful industry connections and empower students to navigate their futures with clarity and experience.',
    questions: [
      {
        id: 'interest',
        label: 'Why do you want to join the Corporate Relations Committee?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'strength',
        label: 'What’s one unique strength you would bring to the Corporate Relations Committee?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event',
        label: 'If you had to lead your own event this semester, what would it be and why?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    description: 'The Finance Committee of the HBSA plays a crucial role in maintaining the organization\'s financial stability. This team will work together to meticulously manage financial statements, develop detailed budgets, and process reimbursements. Their responsible financial oversight enables HBSA to fund and support a variety of initiatives and events that enrich the community. The committee’s efforts ensure transparency and accountability, fostering trust within the association. By joining the Finance Committee, members will gain valuable, fast-paced financial accounting experience while actively contributing to the empowerment and success of HBSA as a whole!',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in the Finance Committee and HBSA and what do you hope to gain from this role as an associate? (150 words)',
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'unique',
        label: 'What is something about you that you share in common with very few people? (75 words)',
        required: true,
        wordLimit: 75,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'entrepreneurship',
    label: 'Entrepreneurship',
    description: 'The Entrepreneurship Committee\'s goal is to spread entrepreneurship to the entirety of UC Berkeley and provide students with an entrepreneurial mindset that will create positive change in the world. This is done through a multitude of events such as competitions, workshops, and speaker panels. Associates work to source speakers/mentors/judges, build connections within the UC Berkeley community (colleges, student organizations, SkyDeck, etc.), and plan and execute events. The Shark Tank Pitch Competition and Innovation Challenge are events that we normally have, but we hope to host many more!',
    questions: [
      {
        id: 'motivation',
        label: 'What are your motivations for joining the Entrepreneurship Committee?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'spirit',
        label: 'Tell me about a time where your entrepreneurial spirit shined and how it affected others.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event',
        label: 'What event would you want our committee to host? Please provide details on how you would plan the event and the details of it.',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'dei',
    label: 'DEI',
    description: 'The HBSA DEI Committee champions equity, inclusion, and belonging at Haas. We spearhead impactful initiatives like the State of Belonging Survey to elevate student voices and drive meaningful change. Our annual flagship event, the Haas Multicultural Festival, brings the entire community together in a vibrant celebration of global cultures, heritage, and unity. Through intentional programming and advocacy, we strive to build a Haas where every student feels seen, valued, and empowered.',
    questions: [
      {
        id: 'bias',
        label: 'Reflect on a time when you recognized an implicit bias—either in yourself or others. How did you respond, and what did you learn from the experience?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'belonging',
        label: 'What does ‘belonging’ mean to you in the context of the Haas community, and how would you help foster it through concrete programming or initiatives?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'festival',
        label: 'Imagine you\'re leading the Multicultural Festival. How would you ensure it meaningfully celebrates culture without reducing it to performance or tokenism?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'mba-alumni-relations',
    label: 'MBA & Alumni Relations',
    description: 'The MBA & Alumni Relations Committee connects Haas undergraduates with MBA students and alumni through mentorship, networking, and professional development. We host engaging events with Alumni to foster lasting connections. Through Mini-MBA Week, career chats, and deferred MBA support, we help students of all backgrounds, transfers, re-entry, or continuing, gain access to a powerful, purpose-driven network that supports their journey during and beyond Haas.',
    questions: [
      {
        id: 'above-beyond',
        label: 'Can you describe a situation where you went above and beyond your designated responsibilities?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'feedback',
        label: 'Tell me about a time you received negative feedback or constructive criticism. What steps did you take after receiving this feedback?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'description',
        label: 'How do you think people who have previously worked with you (managers, class projects, customers) would describe you?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'projects',
        label: 'Tell me more about some of the projects you implemented through your club involvement. How were you able to secure sufficient buy-in from key stakeholders?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'integration',
    label: 'Integration',
    description: 'The HBSA Integration Committee is dedicated to building a welcoming, collaborative community that unites Haas students. Our mission is to foster connections among students from MET, GMP, Spieker, LSBE, athletics, and the broader Haas population, creating an environment where everyone feels supported. A key focus of our work is the Cross-Program Partners, pairing students from different programs to encourage peer connection, alongside social events and mixers that strengthen community bonds. Another one of our efforts is expanding access to professional opportunities through industry networking events, alumni panels, and workshops that help students engage with leaders across sectors. Through these initiatives, we aim to help students build lifelong networks that extend far beyond their time at Haas.',
    questions: [
      {
        id: 'cross-program',
        label: 'What is one idea you have to strengthen cross-program connections and build community at Haas?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event',
        label: 'If you could design a creative Integration event or initiative, what would it look like?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'sponsorships',
    label: 'Sponsorships',
    description: 'The Sponsorships Committee aims to grow Berkeley Haas\'s presence with private companies and foundations worldwide. As an associate, you will help identify and cultivate partners through targeted outreach, strengthen our national and international footprint, and steward ongoing relationships. You\'ll work with senior contacts at leading organizations to build long-term, value-aligned partnerships that support Haas undergraduates. We look forward to your application.',
    questions: [
      {
        id: 'philanthropy-scenario',
        label: 'Philanthropy scenario (stakeholder management) A foundation has approved funding, but the disbursement is delayed due to back end issues. How will you keep the foundation\'s stakeholders satisfied until the funds arrive? Please include your communication cadence, the key updates you will provide, the internal steps you will drive with legal and finance, any interim recognition ideas, and a simple contingency plan.',
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'target-sponsors',
        label: 'Target sponsors and rationale List three to five companies you would pursue as Haas sponsors and explain why each is a strong fit. Please address alignment with Haas programs and students, mutual value for recruiting, brand, or CSR, likelihood of budget, and potential for multi-year growth.',
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'multinational-messaging',
        label: 'Multinational messaging What makes outreach to a multinational convincing? Then draft a short pitch email we could send to a regional or global head of campus, ESG, or brand. Please include a clear value proposition, one quantifiable student-impact metric, a regional or local tie-in, and a specific next step.',
        required: true,
        wordLimit: 140,
        type: 'textarea'
      },
      {
        id: 'motivation-contribution',
        label: 'Motivation and contribution Why do you want to join Sponsorships, and what will you uniquely add? Share one concrete example from outreach, CRM tracking, negotiation, writing, or project management that shows how you will lift our pipeline and partner experience.',
        required: true,
        wordLimit: 120,
        type: 'textarea'
      }
    ]
  }
]; 