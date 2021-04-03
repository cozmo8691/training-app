import React, { FC, useState } from 'react'
import { Pane, Dialog, majorScale, Heading } from 'evergreen-ui'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/client'
import Logo from '../../components/logo'
import CourseListLearning from '../../components/CourseListLearning'
import LessonList from '../../components/LessonList'
import NewCourseButton from '../../components/newCourseButton'
import User from '../../components/user'
import NewCourseDialog from '../../components/newCourseDialog'
import { connectToDB, course, lesson, screen } from '../../db'
import { UserSession } from '../../types'
import LessonPane from '../../components/lessonPane'
import ScreenPane from '../../components/screenPane'

const Learning: FC<{
  courses?: any[]
  courseId?: string
  lessons?: any[]
  activeLesson?: any
  activeScreen?: any
  activeScreens?: any[]
}> = ({ courses, courseId, lessons, activeScreen, activeLesson, activeScreens }) => {
  const router = useRouter()
  const [session, loading] = useSession()

  if (!session && !loading) {
    return (
      <Dialog
        isShown
        title="Session expired"
        confirmLabel="Ok"
        hasCancel={false}
        hasClose={false}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEscapePress={false}
        onConfirm={() => router.push('/signin')}
      >
        Sign in to continue
      </Dialog>
    )
  }

  const Page = () => {
    if (activeScreen) {
      return <ScreenPane lesson={activeLesson} screen={activeScreen} courseId={courseId} />
    }

    if (activeLesson) {
      return <LessonPane lesson={activeLesson} screens={activeScreens} courseId={courseId} />
    }

    return null
  }

  return (
    <Pane position="relative">
      <Pane width={300} position="absolute" top={0} left={0} background="tint2" height="100vh" borderRight>
        <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
          <Logo />
        </Pane>
        <Pane>
          <Heading size={600} marginTop="default">
            My Courses
          </Heading>
          <CourseListLearning courses={courses} />
        </Pane>
      </Pane>
      <Pane marginLeft={300} width="calc(100vw - 300px)" height="100vh" overflowY="auto" position="relative">
        <User user={session.user} />
        <LessonList lessons={lessons} />

        <Page />
      </Pane>
    </Pane>
  )
}

Learning.defaultProps = {
  courses: [],
}

// show list of courses
// allow user to create a new course

// at the bottom
export async function getServerSideProps(context) {
  const session: { user: UserSession } = await getSession(context)
  // not signed in
  if (!session || !session.user) {
    return { props: {} }
  }

  const props: any = { session }
  const { db } = await connectToDB()
  const courses = await course.getCourses(db)
  props.courses = courses

  console.log('context.params.id', context.params.id)

  if (context.params.id) {
    // all lessons for this course param
    const courseId = context.params.id[0]
    const lessons = await lesson.getLessons(db, courseId)
    props.lessons = lessons
    props.courseId = courseId

    // const activeLesson = lessons.find((c) => c._id === context.params.id[0])
    // const activeScreens = await screen.getScreensByLesson(db, activeLesson._id)
    // props.activeLesson = activeLesson
    // props.activeScreens = activeScreens
    const activeLessonId = context.params.id[1]

    if (activeLessonId) {
      const activeLesson = lessons.find((lesson) => lesson._id === activeLessonId)

      const activeScreen = await screen.getScreensByLesson(db, activeLesson._id)
      props.activeLesson = activeLesson
      props.activeScreens = activeScreen
    }

    const activeScreenId = context.params.id[2]

    if (activeScreenId) {
      props.activeScreen = await screen.getOneScreen(db, activeScreenId)
    }
  }

  return {
    props,
  }
}

export default Learning
