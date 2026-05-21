export const roles = {
  admin: 'ADMIN',
  instructor: 'INSTRUCTOR',
  student: 'STUDENT',
}

export const db = {
  users: [
    {
      id: 'user_admin',
      username: 'admin',
      email: 'admin@Brainedev.com',
      passwordHash: '$2a$10$GpLsJeKqZxmHlm7DdPuLTONdzZbJ4crWCMfD4TWWshDaQaVhYbF32',
      role: roles.admin,
      createdAt: new Date().toISOString(),
    },
  ],
  courses: [
    {
      id: 'course_react_foundations',
      title: 'Frontend Foundations with React',
      slug: 'frontend-foundations-react',
      description: 'Build production-ready React interfaces with routing, API calls, and state.',
      thumbnail: '/course-react.jpg',
      price: 15000,
      published: true,
      createdAt: new Date().toISOString(),
    },
  ],
  lessons: [
    {
      id: 'lesson_react_intro',
      courseId: 'course_react_foundations',
      title: 'React SPA Architecture',
      videoUrl: 'https://stream.mux.com/example.m3u8',
      content: 'How the BrianE-Dev frontend is structured with Vite and React Router.',
      position: 1,
    },
  ],
  ebooks: [
    {
      id: 'ebook_api_patterns',
      title: 'API Design Patterns',
      description: 'A practical guide to designing REST APIs for digital products.',
      price: 8000,
      pdfUrl: 'ebooks/api-design-patterns.pdf',
      coverImage: '/ebook-api-patterns.jpg',
    },
  ],
  purchases: [],
  lessonProgress: [],
}
