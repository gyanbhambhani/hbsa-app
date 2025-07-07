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
    id: 'sustainability',
    label: 'Sustainability',
    description: 'Advance environmental stewardship and sustainable business practices within the Haas community.',
    questions: [
      {
        id: 'growth',
        label: "How can HBSA's sustainability committee support your personal and professional growth in the field of sustainability and responsible business practices?",
        required: true,
        wordLimit: 250,
        type: 'textarea'
      },
      {
        id: 'projects',
        label: "Are there any particular sustainability-related projects or initiatives you'd like to work on within the context of our club or in your future career?",
        required: true,
        wordLimit: 250,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'mba-alumni-relations',
    label: 'MBA and Alumni Relations',
    description: 'Foster connections between current students and Haas alumni network.',
    questions: [
      {
        id: 'leadership-impact',
        label: "From these three terms — leadership, impact, intentionality — which one resonates with you most and why? Tell us about any previous experience(s) that helped shape your perspective on the word you selected.",
        required: true,
        wordLimit: 300,
        type: 'textarea'
      },
      {
        id: 'admired-alumnus',
        label: "Please tell us about an undergraduate alumnus from Haas you respect and admire. What qualities or achievements make them stand out to you?",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Develop and execute marketing strategies for HBSA events and initiatives.',
    questions: [
      {
        id: 'workload-management',
        label: "How do you prioritize and manage your workload when faced with multiple deadlines?",
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'initiative-idea',
        label: "Please describe one initiative or idea that you would like to implement for marketing committee this semester.",
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'portfolio',
        label: "Please link your marketing portfolio below and ensure that anyone has access to it.",
        required: true,
        type: 'url'
      }
    ]
  },
  {
    id: 'strategic-initiatives',
    label: 'Strategic Initiatives',
    description: 'Drive long-term strategic projects and organizational development.',
    questions: [
      {
        id: 'strategic-project',
        label: "Please describe one strategic initiative project you would want to carry out throughout the semester and the steps you would take to accomplish your goals.",
        required: true,
        wordLimit: 250,
        type: 'textarea'
      },
      {
        id: 'qualifications',
        label: "What skills or experiences do you believe make you the most qualified for this role?",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'student-affairs',
    label: 'Student Affairs',
    description: 'Enhance student experience and foster community engagement.',
    questions: [
      {
        id: 'interest-contribution',
        label: "Why are you interested in joining the Student Affairs Committee and what do you hope to contribute?",
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'event-ideas',
        label: "Share your ideas for organizing events or initiatives to bring together students from different backgrounds.",
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'subcommittees',
        label: "Which sub-committee(s) do you want to be considered for?",
        required: true,
        type: 'multiselect',
        options: ['Student Development', 'Student Life']
      }
    ]
  },
  {
    id: 'integration',
    label: 'Integration',
    description: 'Promote unity and collaboration across different Haas programs.',
    questions: [
      {
        id: 'improvement-area',
        label: "What do you believe is an area of improvement and/or need that should be addressed for uniting Haas students?",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'cross-program-initiative',
        label: "Suggest an initiative that can better facilitate cross-program connections.",
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'community-meaning',
        label: "What does being a part of a community mean to you?",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'transfer-development',
    label: 'Transfer Development',
    description: 'Support transfer students and improve the transfer experience.',
    questions: [
      {
        id: 'is-transfer',
        label: "Are you a transfer student?",
        required: true,
        type: 'select',
        options: ['Yes', 'No']
      },
      {
        id: 'transfer-school',
        label: "What is the school you transferred from?",
        required: true,
        type: 'text'
      },
      {
        id: 'transfer-improvements',
        label: "What is something that could be improved in the transfer process?",
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'role-support',
        label: "How would this role support your growth and how would you support others?",
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'transfer-subcommittees',
        label: "Which sub-committee(s) do you want to be considered for?",
        required: true,
        type: 'multiselect',
        options: ['Outreach Committee', 'Integration Committee']
      }
    ]
  },
  {
    id: 'professional-development',
    label: 'Professional Development',
    description: 'Facilitate career growth and professional skill development.',
    questions: [
      {
        id: 'qualifications-pd',
        label: "What skills or experiences make you qualified for this role?",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'new-ideas',
        label: "What ideas do you have for new events/initiatives?",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'industry-trends',
        label: "How do you stay updated on industry trends and opportunities?",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'entrepreneurship',
    label: 'Entrepreneurship',
    description: 'Support entrepreneurial initiatives and startup culture.',
    questions: [
      {
        id: 'pitching-experience',
        label: "Describe a successful experience (or hypothetical approach) pitching for funding or support.",
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'fund-management',
        label: "Describe how you've managed investor/sponsor funds (or how you would).",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'digital-portal',
        label: "Design a digital resource portal for the HBSA site. What features would you prioritize and how would you maintain it?",
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'personality-word',
        label: "Your personality",
        required: true,
        type: 'text'
      },
      {
        id: 'skill-word',
        label: "Your greatest skill",
        required: true,
        type: 'text'
      },
      {
        id: 'favorite-word',
        label: "Your favorite word of all time",
        required: true,
        type: 'text'
      },
      {
        id: 'pitch-decks',
        label: "(Optional) Link previous pitch decks or relevant materials",
        required: false,
        type: 'url'
      }
    ]
  }
] 