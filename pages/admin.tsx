import React, { FC, useState } from 'react'
import { Pane, Dialog, majorScale } from 'evergreen-ui'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/client'
import Logo from '../components/logo'
import CourseList from '../components/CourseList'
import NewCourseButton from '../components/newCourseButton'
import User from '../components/user'
import NewCourseDialog from '../components/newCourseDialog'
import { connectToDB, course } from '../db'
import { UserSession } from '../types'

const Admin: FC<{ courses?: any[] }> = ({ courses }) => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [newCourseIsShown, setIsShown] = useState(false)
  const [allCourses, setCourses] = useState(courses || [])

  const handleNewCourse = async (name: string) => {
    console.log('handleNewCourse')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/course`, {
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
    setCourses((state) => [...state, data])
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
          <NewCourseButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <CourseList courses={allCourses} />
        </Pane>
      </Pane>
      <Pane marginLeft={300} width="calc(100vw - 300px)" height="100vh" overflowY="auto" position="relative">
        <User user={session.user} />
      </Pane>
      <NewCourseDialog close={() => setIsShown(false)} isShown={newCourseIsShown} onNewCourse={handleNewCourse} />
    </Pane>
  )
}

Admin.defaultProps = {
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
  const courses = await course.getCourses(db, session.user.id)
  props.courses = courses

  return {
    props,
  }
}

export default Admin
