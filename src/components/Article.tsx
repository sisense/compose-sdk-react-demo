import React from 'react';
import Divider from './Divider';

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export default function Article(props: Props) {
  return (
    <div className="w-full bg-white p-4 shadow-xl rounded-lg min-h-[100vh]">
      <article className="prose mt-2 max-w-4xl ml-0 2xl:mx-auto pl-5">
        <header className={'mt-5'}>
          <h1 className="text-5xl font-bold">{props.title}</h1>
          <p className="whitespace my-4">{props.description}</p>
        </header>
        <Divider />
        {props.children}
      </article>
    </div>
  );
}
