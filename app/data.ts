type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'My Serverless Summarizer',
    description:
      'Advanced text summarizer built on a serverless architecture.',
    link: 'https://raunakg98.github.io/s3-summarizer/',
    video:
      '/summarizer.mp4',
    id: 'project1',
  },
  {
    name: 'Credit Card Fraud Detection',
    description:
      'Advanced text summarizer built on a serverless architecture.',
    link: '/project/fraud-detection/',
    video:
      '/summarizer.mp4',
    id: 'project2',
  }
  // {
  //   name: 'Motion Primitives',
  //   description: 'UI kit to make beautiful, animated interfaces.',
  //   link: 'https://motion-primitives.com/',
  //   video:
  //     'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
  //   id: 'project2',
  // },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Lucky Dog Animal Rescue',
    title: 'Data Scientist',
    start: '2024',
    end: 'Present',
    link: 'test',
    id: 'work1',
  },
  {
    company: 'Civis Analytics',
    title: 'Data Analytics Intern',
    start: '2023',
    end: '2023',
    link: 'test',
    id: 'work2',
  },
  {
    company: 'Genpact',
    title: 'Data Scientist',
    start: '2021',
    end: '2022',
    link: 'test',
    id: 'work3',
  },
  {
    company: 'Solar Industries India Ltd.',
    title: 'Backend Engineer',
    start: '2020',
    end: '2021',
    link: 'test',
    id: 'work4',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How I Built a $0 Text‑Summarizer That Saves My Sanity',
    description: 'An AI powered no-cost app that chews through raw text so I don’t have to',
    link: 'https://medium.com/@raunakghawghawe07/how-i-built-a-0-text-summarizer-that-saves-my-sanity-331cd4e96081',
    uid: 'blog-1',
  },
  // {
  //   title: 'Why I left my job to start my own company',
  //   description:
  //     'A deep dive into my decision to leave my job and start my own company',
  //   link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
  //   uid: 'blog-2',
  // },
  // {
  //   title: 'What I learned from my first year of freelancing',
  //   description:
  //     'A look back at my first year of freelancing and what I learned',
  //   link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
  //   uid: 'blog-3',
  // },
  // {
  //   title: 'How to Export Metadata from MDX for Next.js SEO',
  //   description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
  //   link: '/blog/example-mdx-metadata',
  //   uid: 'blog-4',
  // },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/raunakg98',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/raunak.ghawghawe',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/raunak-gh/',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/i_ronik',
  },
]

export const EMAIL = 'raunakghawghawe07@email.com'
