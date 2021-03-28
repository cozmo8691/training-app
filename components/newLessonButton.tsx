import React, { FC } from 'react'
import { Icon, PlusIcon, Pane, Tooltip } from 'evergreen-ui'

const NewLessonButton: FC<{ onClick: any; tooltip?: string; size?: number }> = ({ onClick, tooltip, size }) => {
  return (
    <Tooltip content={tooltip}>
      <Pane onClick={onClick}>
        <Icon icon={PlusIcon} size={size} cursor="pointer" />
      </Pane>
    </Tooltip>
  )
}

NewLessonButton.defaultProps = {
  tooltip: 'New Lesson',
  size: 42,
}

export default NewLessonButton
