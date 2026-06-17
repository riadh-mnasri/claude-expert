import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-secondary/40 prose-code:before:content-none prose-code:after:content-none prose-table:text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
