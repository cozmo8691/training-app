import React, { FC } from 'react'
import { Icon, PlusIcon, Pane, Tooltip } from 'evergreen-ui'

const NewCourseButton: FC<{ onClick: any; tooltip?: string; size?: number }> = ({ onClick, tooltip, size }) => {
  return (
    <Tooltip content={tooltip}>
      <Pane onClick={onClick}>
        <Icon icon={PlusIcon} size={size} cursor="pointer" />
      </Pane>
    </Tooltip>
  )
}

NewCourseButton.defaultProps = {
  tooltip: 'New Course',
  size: 42,
}

export default NewCourseButton
