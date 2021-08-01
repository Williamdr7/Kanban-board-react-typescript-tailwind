import React from 'react'
import { useEffect } from 'react'
import { TaskCard } from './components/TaskCard/TaskCard'
import data from './data/data.json'
import colums from './data/columns.json'
import { useState } from 'react'
import { Column } from './components/Column/Column'

export default function App() {
  const [tasks, setTasks] = useState<any>({
    icebox: [],
    backlog: [],
    started: [],
    rejected: [],
    finished: [],
    delivered: [],
  })

  const columnsPosition: any = {
    icebox: { start: 0, end: 300 },
    backlog: { start: 300, end: 600 },
    started: { start: 600, end: 900 },
    rejected: { start: 900, end: 1200 },
    finished: { start: 1220, end: 1500 },
    delivered: { start: 1500, end: 2000 },
  }

  function setTaskStatus(
    positionX: number,
    taskId: number,
    currentStatus: any
  ) {
    const task = tasks[currentStatus].find((ts: any) => ts.id === taskId)
    const oldColumn = tasks[currentStatus].filter((el: any) => el.id !== taskId)

    const newStatus: any = Object.keys(columnsPosition)
      .map((column) => {
        if (
          positionX > columnsPosition[column].start &&
          positionX < columnsPosition[column].end
        ) {
          return column
        }
        return null
      })
      .filter((v) => !!v)[0]

    const newColumn = (tasks[newStatus] = [
      ...tasks[newStatus].filter((oldTasks: any) => oldTasks.id !== task.id),
      { ...task, status: newStatus },
    ])

    setTasks((stTasks: any) => ({
      ...stTasks,
      [currentStatus]: oldColumn,
      [newStatus]: newColumn,
    }))
  }

  useEffect(() => {
    data.map((task: any) => {
      setTasks((stTasks: any) => ({
        ...stTasks,
        [task.status]: [...tasks[task.status], task],
      }))
    })
  }, [])

  return (
    <div className="h-auto w-auto mx-auto flex">
      {colums.map((column) => (
        <Column>
          <h4 className="mb-5">{column.title}</h4>
          <div className="w-72 bg-gray-100 h-screen p-2">
            {tasks[column.type].map((task: any) => (
              <TaskCard
                status={task.status}
                setTaskStatus={setTaskStatus}
                id={task.id}
                tag={task.tag}
                initiative={task.initiative}
                description={task.description}
                sprint={task.sprint}
              />
            ))}
          </div>
        </Column>
      ))}
    </div>
  )
}
