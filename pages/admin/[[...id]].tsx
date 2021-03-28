import React, { FC, useState } from 'react'
import { Pane, Dialog, majorScale } from 'evergreen-ui'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/client'
import Logo from '../../components/logo'
import LessonList from '../../components/lessonList'
import NewFolderButton from '../../components/newFolderButton'
import User from '../../components/user'
import LessonPane from '../../components/lessonPane'
import ScreenPane from '../../components/screenPane'
import NewLessonDialog from '../../components/newLessonDialog'
import { connectToDB, lesson, screen } from '../../db'
import { UserSession } from '../../types'

const Profile: FC<{ lessons?: any[]; activeLesson?: any; activeScreen?: any; activeScreens?: any[] }> = ({
  lessons,
  activeScreen,
  activeLesson,
  activeScreens,
}) => {
  const router = useRouter()
  const [newLessonIsShown, setIsShown] = useState(false)
  const [session, loading] = useSession()

  const [allLessons, setLessons] = useState(lessons || [])

  const handleNewLesson = async (name: string) => {
    console.log('handleNewLesson')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/lesson`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(res)

    const { data } = await res.json()
    console.log('data', data)
    // update local state
    setLessons((state) => [...state, data])
  }

  const Page = () => {
    if (activeScreen) {
      return <ScreenPane lesson={activeLesson} screen={activeScreen} />
    }

    if (activeLesson) {
      return <LessonPane lesson={activeLesson} screens={activeScreens} />
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

          <NewFolderButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <LessonList lessons={allLessons} />
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

Profile.defaultProps = {
  lessons: [],
}

/**
 * Catch all handler. Must handle all different page
 * states.
 * 1. Folders - none selected
 * 2. Folders => Folder selected
 * 3. Folders => Folder selected => Document selected
 *
 * An unauth user should not be able to access this page.
 *
 * @param context
 */

// at the bottom
export async function getServerSideProps(context) {
  const session: { user: UserSession } = await getSession(context)
  // not signed in
  if (!session || !session.user) {
    return { props: {} }
  }

  const props: any = { session }
  const { db } = await connectToDB()
  const lessons = await lesson.getLessons(db, session.user.id)
  props.lessons = lessons

  if (context.params.id) {
    const activeLesson = lessons.find((c) => c._id === context.params.id[0])
    const activeScreens = await screen.getScreensByLesson(db, activeLesson._id)
    props.activeLesson = activeLesson
    props.activeScreens = activeScreens

    const activeScreenId = context.params.id[1]

    if (activeScreenId) {
      props.activeScreen = await screen.getOneScreen(db, activeScreenId)
    }
  }

  return {
    props,
  }
}

export default Profile
