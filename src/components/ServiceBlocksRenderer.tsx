"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";

interface Props {
  content: any;
}

export default function ServiceBlocksRenderer({ content }: Props) {
  if (!Array.isArray(content)) return null;

  return (
    <div className="prose prose-lg max-w-none">
      <BlocksRenderer
        content={content}
        blocks={{
          heading: ({ children, level }) =>
            React.createElement(`h${level}`, {}, children),

          paragraph: ({ children }) => <p>{children}</p>,

          list: ({ children, format }) => {
            if (format === "unordered") return <ul>{children}</ul>;
            if (format === "ordered") return <ol>{children}</ol>;
            return <ul>{children}</ul>;
          },

          "list-item": ({ children }) => <li>{children}</li>,
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <u>{children}</u>,
          code: ({ children }) => <code>{children}</code>,
        }}
      />
    </div>
  );
}
