import React, { FC, useState } from 'react'
import { Pane, Dialog, majorScale } from 'evergreen-ui'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/client'
import Logo from '../../components/logo'
import LessonList from '../../components/LessonList'
import NewLessonButton from '../../components/newLessonButton'
import User from '../../components/user'
import LessonPane from '../../components/lessonPane'
import ScreenPane from '../../components/screenPane'
import NewLessonDialog from '../../components/newLessonDialog'
import { connectToDB, lesson, screen } from '../../db'
import { UserSession } from '../../types'

const Course: FC<{
  courseId?: string
  lessons?: any[]
  activeLesson?: any
  activeScreen?: any
  activeScreens?: any[]
}> = ({ courseId, lessons, activeScreen, activeLesson, activeScreens }) => {
  const router = useRouter()
  const [newLessonIsShown, setIsShown] = useState(false)
  const [session, loading] = useSession()
  const [allLessons, setLessons] = useState(lessons || [])

  const handleNewLesson = async (name: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/lesson`, {
      method: 'POST',
      body: JSON.stringify({ name, course: courseId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { data } = await res.json()
    setLessons((state) => [...state, data])
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

  return (
    <Pane position="relative">
      <Pane width={300} position="absolute" top={0} left={0} background="tint2" height="100vh" borderRight>
        <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
          <Logo />
          <NewLessonButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <LessonList lessons={allLessons} courseId={courseId} />
        </Pane>
      </Pane>
      <Pane marginLeft={300} width="calc(100vw - 300px)" height="100vh" overflowY="auto" position="relative">
        <User user={session.user} />
        <Page />
      </Pane>
      <NewLessonDialog close={() => setIsShown(false)} isShown={newLessonIsShown} onNewLesson={handleNewLesson} />
    </Pane>
  )
}

Course.defaultProps = {
  lessons: [],
}

/**
 * Catch all handler. Must handle all different page
 * states.
 * 1. Lessons/courseId - lessons for a course
 * 2. Lessons/courseId/lessonId - lesson selected
 * 3. Lessons/courseId/lessonId/screenId - screen selected - editing screen
 *
 * An unauth user should not be able to access this page.
 *
 * @param context
 */

export async function getServerSideProps(context) {
  const session: { user: UserSession } = await getSession(context)
  // not signed in
  if (!session || !session.user) {
    return { props: {} }
  }

  const props: any = { session, lessons: [] }
  const { db } = await connectToDB()
  console.log('context.params.id:', context.params.id)

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

export default Course
