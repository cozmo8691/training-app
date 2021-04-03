import { Pane, majorScale, Menu, FolderCloseIcon } from 'evergreen-ui'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

const CourseList: FC<{ courses: any[] }> = ({ courses }) => {
  const router = useRouter()
  return (
    <Pane padding={majorScale(2)}>
      <Menu>
        {courses.map((course) => (
          <Menu.Item key={course._id} icon={FolderCloseIcon} onClick={() => router.push(`/learning/${course._id}`)}>
            {course.name}
          </Menu.Item>
        ))}
      </Menu>
    </Pane>
  )
}

CourseList.defaultProps = {
  courses: [],
}

export default CourseList
