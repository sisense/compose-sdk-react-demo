import React from 'react'

type Props = {
    title: string;
    children: React.ReactNode;
}

export default function Section(props: Props) {
  return (
    <section>
      <h2 className="text-3xl font-optimistic font-bold">{props.title}</h2>
      {props.children}
    </section>
  )
}
