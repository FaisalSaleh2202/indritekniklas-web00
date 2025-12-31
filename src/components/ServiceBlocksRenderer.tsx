"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import React from "react";

interface Props {
  content?: BlocksContent | unknown[] | null;
}

function collectText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectText).join(" ");
  if (React.isValidElement<{ children?: React.ReactNode }>(node))
    return collectText(node.props.children);
  return "";
}

function createSlugger() {
  const counts = new Map<string, number>();
  return (text: string) => {
    const base =
      text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-") || "bagian";
    const count = counts.get(base) ?? 0;
    const nextCount = count + 1;
    counts.set(base, nextCount);
    return count === 0 ? base : `${base}-${nextCount}`;
  };
}

export default function ServiceBlocksRenderer({ content }: Props) {
  const blocks = Array.isArray(content) ? (content as BlocksContent) : null;
  if (!blocks?.length) return null;
  const headingSlugger = React.useMemo(() => createSlugger(), []);

  return (
    <div className="prose prose-lg max-w-none">
      <BlocksRenderer
        content={blocks}
        blocks={{
          heading: ({ children, level, ...rest }) => {
            const headingId =
              (rest as { anchorId?: string }).anchorId ||
              headingSlugger(collectText(children));
            const tagName =
              `h${level || 2}` as keyof React.JSX.IntrinsicElements;

            return React.createElement(
              tagName,
              {
                id: headingId,
                className:
                  "text-xl font-semibold text-gray-900 scroll-mt-28",
              },
              children
            );
          },

          paragraph: ({ children }) => (
            <p className="text-justify py-1">{children}</p>
          ),

          list: ({ children, format }) => {
            if (format === "unordered") return <ul>{children}</ul>;
            if (format === "ordered") return <ol>{children}</ol>;
            return <ul>{children}</ul>;
          },

          "list-item": ({ children }) => (
            <li className="text-justify py-1">{children}</li>
          ),
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
