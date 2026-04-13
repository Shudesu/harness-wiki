import { ArticleList } from "@/components/article/article-list";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Harness Wiki
        </h1>
        <p className="max-w-lg text-lg text-zinc-400">
          LINE, X, Instagram — 全自動化の知識をここに。
          <br />
          コミュニティで共有するナレッジベース。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">人気の記事</h2>
        <ArticleList maxItems={6} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">最新の投稿</h2>
        <ArticleList maxItems={9} />
      </section>
    </div>
  );
}
