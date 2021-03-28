import React, { FC } from 'react'
import { Icon, PlusIcon, Pane, Tooltip } from 'evergreen-ui'

const NewScreenButton: FC<{ onClick: any; tooltip?: string; size?: number }> = ({ onClick, tooltip, size }) => {
  return (
    <Tooltip content={tooltip}>
      <Pane onClick={onClick}>
        <Icon icon={PlusIcon} size={size} cursor="pointer" />
      </Pane>
    </Tooltip>
  )
}

NewScreenButton.defaultProps = {
  tooltip: 'New Screen',
  size: 42,
}

export default NewScreenButton
