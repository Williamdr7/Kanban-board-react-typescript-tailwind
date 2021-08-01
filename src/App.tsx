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
    icebox: { start: 0, end: 450 },
    backlog: { start: 450, end: 750 },
    started: { start: 750, end: 1050 },
    rejected: { start: 1050, end: 1350 },
    finished: { start: 1350, end: 1700 },
    delivered: { start: 1700, end: 2050 },
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
      ...tasks[newStatus],
      { ...task, status: newStatus },
    ])

    setTasks((stTasks: any) => ({
      ...stTasks,
      [currentStatus]: oldColumn,
      [newStatus]: newColumn,
    }))

    console.log('newColumn' + newStatus, newColumn)
    console.log('oldColumn, ', oldColumn)
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
          <div className="bg-gray-100 h-screen p-2">
            {data
              .filter((card) => card.status === column.type)
              .map((task) => (
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
