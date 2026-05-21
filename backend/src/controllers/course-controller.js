import { db } from '../models/data-store.js'
import { createId } from '../utils/ids.js'

export function listCourses(_req, res) {
  res.json({ courses: db.courses.filter((course) => course.published) })
}

export function getCourse(req, res) {
  const course = db.courses.find((item) => item.slug === req.params.slug || item.id === req.params.slug)

  if (!course) {
    return res.status(404).json({ message: 'Course not found' })
  }

  const lessons = db.lessons
    .filter((lesson) => lesson.courseId === course.id)
    .sort((a, b) => a.position - b.position)

  res.json({ course, lessons })
}

export function createCourse(req, res) {
  const { title, slug, description, thumbnail, price = 0, published = false } = req.body

  if (!title || !slug || !description) {
    return res.status(400).json({ message: 'title, slug, and description are required' })
  }

  const course = {
    id: createId('course'),
    title,
    slug,
    description,
    thumbnail: thumbnail ?? '',
    price,
    published,
    createdAt: new Date().toISOString(),
  }

  db.courses.push(course)
  res.status(201).json({ course })
}

export function createLesson(req, res) {
  const course = db.courses.find((item) => item.id === req.params.courseId)

  if (!course) {
    return res.status(404).json({ message: 'Course not found' })
  }

  const { title, videoUrl, content, position } = req.body

  if (!title) {
    return res.status(400).json({ message: 'title is required' })
  }

  const lesson = {
    id: createId('lesson'),
    courseId: course.id,
    title,
    videoUrl: videoUrl ?? '',
    content: content ?? '',
    position: position ?? db.lessons.filter((item) => item.courseId === course.id).length + 1,
  }

  db.lessons.push(lesson)
  res.status(201).json({ lesson })
}
