import React, { FC, useState } from 'react'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/client'
import { Breadcrumb, Container, Row, Card, Button } from 'react-bootstrap'

import { connectToDB, course, lesson, screen } from '../../db'
import { UserSession } from '../../types'
import Screen from '../../components/Screen'
import Layout from '../../components/Layout'
import Navigation from '../../components/Navigation'

const Courses: FC<{
  courses?: any[]
  courseId?: string
  lessons?: any[]
  lessonId?: string
  lessonDetails?: any
  currentScreen?: number
  breadcrumb: any[]
}> = ({ courses, courseId, lessons, lessonId, lessonDetails, currentScreen, breadcrumb }) => {
  const [session, loading] = useSession()

  if (lessonDetails) {
    console.log(lessonDetails)
  }

  return (
    <Layout breadcrumb={breadcrumb}>
      {/* <User user={session.user} /> */}
      {courses && (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <Link href={`/course/${course._id}`}>
                <a>{course.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {lessons && (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson._id}>
              <Link href={`/course/${courseId}/${lesson._id}`}>
                <a>{lesson.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {lessonDetails && (
        <>
          <h1>{lessonDetails.name}</h1>
          <Screen lessonDetails={lessonDetails} currentScreen={currentScreen} />
        </>
      )}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session: { user: UserSession } = await getSession(context)
  // not signed in
  if (!session || !session.user) {
    return { props: {} }
  }

  const props: any = { session, lessons: [] }
  const { db } = await connectToDB()
  const [courseId, lessonId, currentScreen = 0] = context.params.id || []
  const breadcrumb = [{ text: 'Home', link: '/' }]
  const courseLink = { text: 'Courses', link: '/course' }

  if (lessonId) {
    // get lesson and screens
    const screens = await screen.getScreensByLesson(db, lessonId)
    const [lessonDetails] = await lesson.getLessonById(db, lessonId)
    const [courseDetails] = await course.getCourseById(db, courseId)
    return {
      props: {
        courseId,
        courseDetails,
        lessonId,
        currentScreen,
        breadcrumb: [
          ...breadcrumb,
          courseLink,
          { text: courseDetails.name, link: `/course/${courseId}` },
          { text: lessonDetails.name },
        ],
        lessonDetails: {
          ...lessonDetails,
          screens,
        },
      },
    }
  }

  if (!courseId) {
    // just get courses
    const courses = await course.getCourses(db)
    return {
      props: {
        courses,
        breadcrumb: [...breadcrumb, { text: 'Courses' }],
      },
    }
  }

  if (courseId) {
    // all lessons for this course
    const lessons = await lesson.getLessons(db, courseId)
    const [courseDetails] = await course.getCourseById(db, courseId)

    return {
      props: {
        courseId,
        lessons,
        breadcrumb: [...breadcrumb, courseLink, { text: courseDetails.name }],
      },
    }
  }
}

export default Courses
