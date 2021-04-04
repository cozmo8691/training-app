import React, { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getSession, useSession, signIn, signOut } from 'next-auth/client'
import { Container, Modal, Row, Card, Button } from 'react-bootstrap'

import { connectToDB, admin, course, lesson, screen } from '../../db'
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
  isAdmin?: boolean
}> = ({ courses, courseId, lessons, lessonId, lessonDetails, currentScreen, breadcrumb, isAdmin }) => {
  const router = useRouter()
  const [session, loading] = useSession()

  if (loading) return null

  if (!session && !loading) {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Your session has expired</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={() => signIn()}>
            Sign in to continue
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    )
  }

  console.log(session)
  console.log(isAdmin)

  return (
    <Layout breadcrumb={breadcrumb} session={session} isAdmin={isAdmin}>
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

  const { db } = await connectToDB()
  console.log(session.user.id)
  const adminRecord = await admin.getAdmin(db, session.user.id)
  const isAdmin = adminRecord.length > 0

  const props: any = { session, isAdmin, lessons: [], breadcrumb: [] }
  const [courseId, lessonId, currentScreen = 0] = context.params.id || []
  const breadcrumb = [{ text: 'Home', link: '/' }]
  const courseLink = { text: 'Courses', link: '/course' }

  if (lessonId) {
    // get lesson and screensafd
    const screens = await screen.getScreensByLesson(db, lessonId)
    const [lessonDetails] = await lesson.getLessonById(db, lessonId)
    const [courseDetails] = await course.getCourseById(db, courseId)
    return {
      props: {
        ...props,
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
        ...props,
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
        ...props,
        courseId,
        lessons,
        breadcrumb: [...breadcrumb, courseLink, { text: courseDetails.name }],
      },
    }
  }
}

export default Courses
