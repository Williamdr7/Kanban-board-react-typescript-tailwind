import React from 'react'
import './TaskCard.scss'

interface CardProps {
  id: number
  tag: Tag
  initiative: Initiative
  sprint: String
  description: String
  setTaskStatus: Function
  status: String
}

interface Tag {
  readonly theme: String
  readonly type: String
}

interface Initiative {
  readonly title: String
  readonly initials: String
}

export const TaskCard = ({
  id,
  tag,
  initiative,
  sprint,
  description,
  setTaskStatus,
  status,
}: CardProps) => {
  return (
    <div
      id={`box${id}`}
      draggable="true"
      onDragEnd={(ev) => {
        setTaskStatus(ev.nativeEvent.pageX, id, status)
      }}
      className="p-2 mt-2 bg-white mx-auto bg-gradient-to-r from-sky-400 to-sky-500 shadow w-64 h-45 cursor-move"
    >
      <p className="font-bold text-gray-500 text-sm">{initiative.initials}</p>
      <p className="font-semibold text-sm mt-3 ">{description}</p>
      <p className="font-semibold text-gray-400 text-sm italic mt-4">
        {sprint}
      </p>
      <p className="text-sm mt-1">{initiative.title}</p>
      <div className={`mt-3 w-5 h-5 bg-${tag.theme}-600 flex items-center`}>
        <div className={`w-3 h-3 mx-auto rounded-full bg-white`} />
      </div>
    </div>
  )
}
