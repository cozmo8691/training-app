import { Pane, majorScale, Menu, FolderCloseIcon, Heading } from 'evergreen-ui'
import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LessonList: FC<{ lessons: any[]; courseId: string }> = ({ lessons, courseId }) => {
  const router = useRouter()
  return (
    <Pane padding={majorScale(2)}>
      <Heading size={600} marginTop="default">
        <Link href={`/course/${courseId}`}>
          <a>Courses</a>
        </Link>
        {` / `}
        Lessons
      </Heading>
      {lessons.length && (
        <Menu>
          {lessons.map((lesson) => (
            <Menu.Item
              key={lesson._id}
              icon={FolderCloseIcon}
              onClick={() => router.push(`/course/${courseId}/${lesson._id}`)}
            >
              {lesson.name}
            </Menu.Item>
          ))}
        </Menu>
      )}
    </Pane>
  )
}

LessonList.defaultProps = {
  lessons: [],
}

export default LessonList
