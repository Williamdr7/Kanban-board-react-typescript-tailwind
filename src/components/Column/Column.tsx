import React from 'react'

interface Children {
  children: JSX.Element | JSX.Element[] | string | string[]
}

export function Column({ children }: Children) {
  return <div className="h-full w-72 py-2 mx-2">{children}</div>
}
