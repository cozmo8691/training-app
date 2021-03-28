import { Pane, majorScale, Menu, FolderCloseIcon } from 'evergreen-ui'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

const LessonList: FC<{ lessons: any[] }> = ({ lessons }) => {
  const router = useRouter()
  return (
    <Pane padding={majorScale(2)}>
      <Menu>
        {lessons.map((lesson) => (
          <Menu.Item key={lesson._id} icon={FolderCloseIcon} onClick={() => router.push(`/profile/${lesson._id}`)}>
            {lesson.name}
          </Menu.Item>
        ))}
      </Menu>
    </Pane>
  )
}

LessonList.defaultProps = {
  lessons: [],
}

export default LessonList
