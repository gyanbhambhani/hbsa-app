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
    description: 'The Strategic Initiatives Committee serves as the intermediary between student ' +
      'voices and actionable change, working directly with Haas Administration and the HBSA ' +
      'Executive Board to carry out complex, pivotal engagements. Given the critical nature of ' +
      'our work, we prioritize confidentiality and commitment above all else, and we welcome ' +
      'those who are eager to serve our community in unique and meaningful ways.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the Strategic Initiatives team? Please limit ' +
          'your response to 50 words.',
        required: true,
        wordLimit: 50,
        type: 'textarea'
      },
      {
        id: 'commitment',
        label: 'One of our core values is commitment - please tell us your class schedule, ' +
          'organizations, and other relevant activities you have planned for the coming semester.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'proposal',
        label: 'SI Associates may have the opportunity to lead their own initiatives - please ' +
          'use this space to share any proposals you may have.',
        required: false,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'tech',
    label: 'Tech',
    description: 'The Tech Committee is the engine behind HBSA\'s digital presence, turning ideas ' +
      'into reality and chaos into clean systems. We make sure everything runs smoothly behind ' +
      'the scenes - whether that\'s streamlining events, enhancing communication, or leveling up ' +
      'how members connect with HBSA. This year, we\'re all about bold upgrades, creative ' +
      'problem-solving, and building tools that actually make people\'s lives easier. If it ' +
      'clicks, scrolls, or sends - we\'ve got it covered.',
    questions: [
      {
        id: 'excitement',
        label: 'What excites you most about working on the tech team, and what unique ' +
          'perspective or skillset would you bring to HBSA?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'improvement',
        label: 'If you could improve one part of HBSA\'s digital experience (website, ' +
          'communications, systems, etc.), what would it be and how would you approach it?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'dream-project',
        label: 'What\'s one tool, project, or idea you\'ve always wanted to build? (It doesn\'t ' +
          'have to be fully realistic - dream big!)',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'transfer-development',
    label: 'Transfer Development',
    description: 'The Transfer Development Committee empowers both current and prospective ' +
      'transfer students by fostering community and building connections across the Haas ' +
      'ecosystem to strengthen the transfer experience. The committee consists of two teams: ' +
      'Outreach and Integration. Outreach works closely with the Haas Undergraduate Office to ' +
      'lead initiatives designed for community colleges, such as Envision Haas, case ' +
      'competitions, and application workshops. Integration builds community within Haas by ' +
      'organizing a mix of social and professional events to support transfer students in their ' +
      'transition. Transfer Development is dedicated to ensuring every transfer student feels ' +
      'supported and enabled at the Haas School of Business!',
    questions: [
      {
        id: 'community',
        label: 'What does the transfer community mean to you, and why did you choose Community ' +
          'College? (350 Words)',
        required: true,
        wordLimit: 350,
        type: 'textarea'
      },
      {
        id: 'mentorship',
        label: 'Describe a past experience in Community College where you supported, mentored, ' +
          'or built community for others. (250 Words)',
        required: true,
        wordLimit: 250,
        type: 'textarea'
      },
      {
        id: 'initiatives',
        label: 'What new ideas or initiatives would you like to bring to Transfer Development? ' +
          'This can be for Outreach or Integration (250 Words)',
        required: true,
        wordLimit: 250,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'The Marketing Committee manages all of HBSA\'s social media channels, ' +
      'maintaining our presence across YouTube, TikTok, LinkedIn, and Instagram to strengthen ' +
      'engagement within the Haas community. From career resources and academic advice to event ' +
      'promotions and student spotlights, we produce high-quality content that supports ' +
      'professional development and fosters community. Our goal is to keep the Haas community ' +
      'informed, connected, and inspired through the diverse content we create!',
    questions: [
      {
        id: 'workload',
        label: 'How do you prioritize and manage your workload when faced with multiple ' +
          'deadlines? (200 words max)',
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'Please describe one initiative or idea that you would like to implement for ' +
          'marketing committee this semester. (200 words max)',
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'portfolio',
        label: 'Please link your marketing portfolio below and ensure that anyone has access ' +
          'to it.',
        required: true,
        type: 'url'
      }
    ]
  },
  {
    id: 'dei',
    label: 'DEI',
    description: 'The HBSA DEI Committee champions equity, inclusion, and belonging at Haas. We ' +
      'spearhead impactful initiatives like the Humans of Haas series to elevate student voices ' +
      'and drive meaningful change. Our annual flagship event, the Haas Multicultural Festival, ' +
      'brings the entire community together in a vibrant celebration of global cultures, ' +
      'heritage, and unity. Through intentional programming and advocacy, we strive to build a ' +
      'Haas where every student feels seen, valued, and empowered.',
    questions: [
      {
        id: 'meaning',
        label: 'What does diversity, equity, and inclusion mean to you, and why do you want to ' +
          'be part of the HBSA DEI Committee?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'inclusive-space',
        label: 'Tell us about a time you helped create a more inclusive, supportive, or ' +
          'welcoming space.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'contribution',
        label: 'How do you hope to contribute to the HBSA community through the DEI Committee, ' +
          'and what do you hope to grow or learn from this experience?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'entrepreneurship',
    label: 'Entrepreneurship',
    description: 'The Entrepreneurship Committee aims to spread entrepreneurship to the entirety ' +
      'of UC Berkeley and provide students with an entrepreneurial mindset that will create ' +
      'positive change in the world. This is done through a multitude of events such as ' +
      'competitions, workshops, and speaker panels. Associates work to source speakers/mentors/' +
      'judges, build connections within the UC Berkeley community (colleges, student ' +
      'organizations, SkyDeck, etc.), and plan and execute events. This spring, we hope to host ' +
      'our signature HBSA Shark Tank Pitch Competition, potentially integrated with a hackathon ' +
      'to foster hands-on innovation and collaboration.',
    questions: [
      {
        id: 'event',
        label: 'Provide a detailed description of an event you would like to host.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'spirit',
        label: 'In what ways have you used entrepreneurship to improve the lives of others ' +
          'around you?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'impact',
        label: 'How do you plan to apply your skills, interests, and experiences to create ' +
          'impact within the HBSA community?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    description: 'The Sustainability Committee is dedicated to promoting environmental action ' +
      'and awareness at Haas. We lead impactful initiatives like Earth Week, Zero Waste Audits, ' +
      'and Thrift Cycle events, while amplifying student voices through our Sustainability ' +
      'Sunday spotlight series. We aim to make eco-conscious choices more visible, accessible, ' +
      'and empowering. Our mission is to cultivate a community that leads with environmental ' +
      'responsibility and creates a lasting impact. Join us in building a more sustainable Haas!',
    questions: [
      {
        id: 'interest',
        label: 'Why do you want to be part of the Sustainability Committee specifically & what ' +
          'does sustainability mean to you?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'embody',
        label: 'How do you embody sustainability in your life?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'change',
        label: 'If you could instantly change one thing about campus to make it more ' +
          'sustainable, what would it be?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'corporate-relations',
    label: 'Corporate Relations',
    description: 'Corporate Relations builds and maintains partnerships between HBSA and leading ' +
      'companies to create meaningful professional opportunities for the community. Our team ' +
      'works closely with corporate partners to bring speaker events, office visits, case ' +
      'competitions, and experiential opportunities to campus. Our goal is to strengthen ' +
      'HBSA\'s industry presence while ensuring students gain direct access to mentors, ' +
      'resources, and real-world career insights.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the Corporate Relations committee, and what ' +
          'do you hope to gain from the experience?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'skills',
        label: 'What skills or experiences would you bring to Corporate Relations, and how do ' +
          'you see yourself contributing to the team?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event',
        label: 'Propose a Corporate Relations-led event you would like to help execute this ' +
          'semester. Briefly describe the company, format, and goal of the event.',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'integration',
    label: 'Integration',
    description: 'The HBSA Integration Committee is dedicated to creating community across ' +
      'Haas\'s specialized programs, including GMP, MET, LSBE, and student-athletes. Our goal ' +
      'is to bridge programs that often operate in silos by fostering connection, ' +
      'collaboration, and shared identity within Haas. Through targeted cross-program events ' +
      'like Haas Olympics, we work to ensure every student feels integrated, supported, and ' +
      'part of one unified Haas community.',
    questions: [
      {
        id: 'turnout',
        label: 'One challenge we face is low turnout at integration events. How would you ' +
          'increase participation among students in specialized programs (GMP, MET, LSBE, ' +
          'student-athletes)? Be specific about outreach, incentives, and event design.',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'sponsorships',
    label: 'Sponsorships',
    description: 'The Sponsorships Committee builds and maintains HBSA\'s relationships with ' +
      'corporate partners and donors. We work directly with firms across consulting, finance, ' +
      'accounting, and technology to secure funding and resources that support professional ' +
      'development events, recruiting opportunities, and community initiatives. Our goal is to ' +
      'create long-term partnerships that deliver real value to both students and sponsors, ' +
      'while expanding access to career opportunities for underrepresented students at Haas.',
    questions: [
      {
        id: 'secure-sponsorship',
        label: 'Walk me through how you would secure a $2-5k sponsorship from a company that ' +
          'has never worked with HBSA before.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'persuasion',
        label: 'Tell me about a time you had to get someone to say yes when they initially ' +
          'were not interested.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'value',
        label: 'If a sponsor paid HBSA $3,000, how would you make sure they felt it was ' +
          'worth it?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'motivation',
        label: 'This role involves outreach where many emails do not get replies. How do you ' +
          'stay effective and motivated in those situations?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'student-affairs',
    label: 'Student Affairs',
    description: 'The Student Affairs Committee focuses on shaping the student experience at ' +
      'Haas through community driven programming and student focused initiatives. Student Life ' +
      'centers on social experiences and campus traditions that bring students together. This ' +
      'subcommittee plans large scale and casual events throughout the year, including ' +
      'community building socials and stress relief programming during peak academic periods. ' +
      'Student Development focuses on growth beyond the classroom. This subcommittee leads ' +
      'initiatives like the Haas Mentorship Program, Pre Haas panels, and skills based ' +
      'workshops that support personal and professional development.',
    questions: [
      {
        id: 'why',
        label: 'Why Student Affairs specifically?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'subcommittee',
        label: 'Which subcommittee (Student Life or Student Development) would you prefer?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event',
        label: 'Propose an event for the subcommittee you are applying to using a $100 budget. ' +
          'Describe the idea, the goal of the event, and how you would spend the budget.',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'public-service',
    label: 'Public Service',
    description: 'The HBSA Public Service Committee connects students with local organizations, ' +
      'alumni working in social impact, and opportunities to launch their own service-driven ' +
      'initiatives. We build partnerships, expand hands-on engagement opportunities, and create ' +
      'pathways for students to apply business skills to real community challenges. We empower ' +
      'students to create meaningful change while strengthening Haas\'s role as a force for ' +
      'impact in the Bay Area and beyond.',
    questions: [
      {
        id: 'meaning',
        label: 'What does public service or community impact mean to you, and why is it ' +
          'important for students?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'Tell me about a time when you took initiative on a project or event. What did ' +
          'you do, and what was the outcome?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'ideas',
        label: 'Since this committee is new and growing, what ideas or events would you like ' +
          'to help create or lead?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'soac',
    label: 'Student Organizations Advisory Council (SOAC)',
    description: 'The Student Organizations Committee serves as the liaison between the Haas ' +
      'Undergraduate Office, the 16 Haas Student Organizations (HSOs) and the greater student ' +
      'body. We focus on strengthening communication, alignment, and support across the Haas ' +
      'community. This year, we are continuing to build and expand the HSO Fellowship Program, ' +
      'an initiative launched in the fall, while planning additional initiatives and leading ' +
      'the recruitment cycle of HSOs for the upcoming academic year.',
    questions: [
      {
        id: 'organization',
        label: 'SOAC associates are responsible for following up with student organization ' +
          'leaders and meeting internal deadlines. Describe a time you had multiple ' +
          'responsibilities at once. How did you stay organized, and what was the outcome?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'Tell me about a time you took initiative in a team, club, or work setting ' +
          'without being asked. What did you do, and why?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'learning',
        label: 'SOAC work involves learning new systems, policies, and processes quickly. ' +
          'Describe a time you had to learn something unfamiliar in a short period of time. ' +
          'How did you approach it?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'fellowship',
        label: 'The HSO Fellowship Program is a new initiative designed to increase leadership ' +
          'opportunities and engagement across Haas Sponsored Organizations. It involves ' +
          'tracking student participation in HSO-hosted events and recognizing students who ' +
          'meet participation benchmarks as HSO Fellows at the end of the semester. Because ' +
          'this is a new initiative, processes are still evolving. How would you approach ' +
          'supporting the execution of this program while ensuring accuracy, organization, ' +
          'and consistent communication?',
        required: true,
        type: 'textarea'
      }
    ]
  }
];
