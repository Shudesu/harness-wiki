import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div
      className="
        prose prose-invert
        prose-lg
        max-w-none

        prose-headings:font-bold
        prose-headings:tracking-tight
        prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4 prose-h1:border-b prose-h1:border-zinc-800 prose-h1:pb-3
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-zinc-800 prose-h2:pb-2
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2

        prose-p:leading-relaxed prose-p:my-4 prose-p:text-zinc-300

        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-zinc-100

        prose-code:rounded-md prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-emerald-400 prose-code:before:content-none prose-code:after:content-none

        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl prose-pre:p-5 prose-pre:my-6 prose-pre:overflow-x-auto

        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:my-6 prose-blockquote:text-zinc-300 prose-blockquote:not-italic

        prose-table:my-6
        prose-th:bg-zinc-800/50 prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:font-semibold prose-th:text-zinc-200
        prose-td:px-4 prose-td:py-2.5 prose-td:border-t prose-td:border-zinc-800

        prose-li:my-1 prose-li:text-zinc-300
        prose-ul:my-4
        prose-ol:my-4

        prose-img:rounded-xl prose-img:my-6 prose-img:border prose-img:border-zinc-800

        prose-hr:border-zinc-800 prose-hr:my-10
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
