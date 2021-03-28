import React, { FC, useState } from 'react'
import { Pane, Heading, majorScale, DocumentIcon, Button } from 'evergreen-ui'
import Link from 'next/link'
import { getRandomGradientCss } from '../utils/gradients'
import NewFolderButton from './newFolderButton'
import NewDocDialog from './newDocumentDialog'

const LessonPane: FC<{ lesson: any; screens: any[] }> = ({ lesson, screens }) => {
  const { bg, image } = getRandomGradientCss()
  const [isShown, setIsShown] = useState(false)
  const [allScreens, setScreens] = useState(screens || [])

  const handleNewScreen = async (name: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/screen/`, {
      method: 'POST',
      body: JSON.stringify({ name, lesson: lesson._id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { data } = await res.json()
    setScreens((state) => [...state, data])
  }

  return (
    <Pane>
      <Pane width="100%" height="200px" backgroundColor={bg} backgroundImage={image} />
      <Pane padding={majorScale(4)}>
        <Pane display="flex" justifyContent="content" alignItems="center" marginBottom={majorScale(4)}>
          <NewFolderButton tooltip="New Document" size={30} onClick={() => setIsShown(true)} />
          <Heading size={900} marginLeft={majorScale(2)}>
            {lesson.name}
          </Heading>
        </Pane>

        <Pane display="flex" alignItems="center" flexWrap="wrap">
          {allScreens.map((screen) => (
            <Pane key={screen._id} width="33%">
              <Link href={`/profile/${lesson._id}/${screen._id}`}>
                <a>
                  <Button intent="none" appearance="minimal" iconBefore={DocumentIcon} height={48} color="tint1">
                    {screen.name}
                  </Button>
                </a>
              </Link>
            </Pane>
          ))}
        </Pane>
      </Pane>

      <NewDocDialog isShown={isShown} onNewDoc={handleNewScreen} close={() => setIsShown(false)} />
    </Pane>
  )
}

LessonPane.defaultProps = {
  screens: [],
}

export default LessonPane
