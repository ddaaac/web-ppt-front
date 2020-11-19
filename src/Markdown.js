import React from 'react';
import ReactMarkdown from "react-markdown";
import {parse} from "./parse"

const Markdown = ({source}) => {
  const {content} = parse(source);

  const blocks = content.split(/(^---$)/m)
    .flatMap(slide => slide.split(/(^```[a-z]*\n[\s\S]*?\n```)/m))
    .map((block, index) => ({
      key: index,
      source: block,
    }));
  return (
    <div>
      {blocks.map((ks) => {
        return <ReactMarkdown
          key={ks.key}
          source={ks.source}
        />
      })}
    </div>
  )
};

export default Markdown;