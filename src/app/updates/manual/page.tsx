import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, GitBranch, Terminal } from "lucide-react";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "手動アップデート (改造済みユーザー向け)",
  description:
    "L Harness を改造 (fork) して使っている人向けの手動アップデート手順",
  alternates: { canonical: `${SITE_URL}/updates/manual` },
};

export default function UpdatesManualPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          Home
        </Link>
        <span>/</span>
        <Link href="/updates" className="hover:text-zinc-300">
          アップデート
        </Link>
        <span>/</span>
        <span className="text-zinc-300">手動アップデート</span>
      </nav>

      <Link
        href="/updates"
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" /> アップデートトップに戻る
      </Link>

      <article
        className="
          prose prose-invert prose-lg max-w-none
          prose-headings:tracking-tight
          prose-h1:text-3xl prose-h1:mt-2 prose-h1:mb-4 prose-h1:border-b prose-h1:border-zinc-800 prose-h1:pb-4
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-zinc-800 prose-h2:pb-3
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-[1.8] prose-p:my-5 prose-p:text-zinc-300
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-zinc-100 prose-strong:font-semibold
          prose-code:rounded-md prose-code:bg-zinc-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] prose-code:text-emerald-400 prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl prose-pre:p-5 prose-pre:my-6
          prose-li:my-1.5 prose-li:text-zinc-300 prose-li:leading-relaxed
          prose-ul:my-5 prose-ol:my-5
        "
      >
        <h1>手動アップデート (改造済みユーザー向け)</h1>

        <p>
          このページは、L Harness のコードを<strong>自分で書き換えている人</strong>
          (いわゆる fork ユーザー) 向けです。改造していない場合は、
          <Link href="/updates">アップデートのトップページ</Link>
          に書かれている自動アップデート手順を使ってください。
        </p>

        <div className="not-prose my-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" />
            <div className="text-sm text-amber-100">
              <strong>注意:</strong> 改造済み環境では、自動アップデートが
              安全のため無効化されます。改造箇所を上書きしてしまうのを防ぐためです。
            </div>
          </div>
        </div>

        <h2>
          <GitBranch className="mr-2 inline h-6 w-6 text-zinc-400" />
          「改造している」とは
        </h2>
        <p>
          自分のサーバーにインストールした <code>~/.line-harness/</code>{" "}
          配下のソースコードを書き換えて、独自の機能を入れている状態を指します。例:
        </p>
        <ul>
          <li>独自の Webhook ハンドラーを足した</li>
          <li>UI のテキストやスタイルを書き換えた</li>
          <li>独自プラグインを <code>src/</code> 直下に追加した</li>
          <li>migration ファイルを編集した</li>
        </ul>
        <p>
          アップデート時に、line-harness のリリースに含まれる
          ファイル群とユーザー環境のファイルを SHA-256 ハッシュで照合します。
          1 つでも差分があれば「fork detected」と判定し、自動アップデートを停止します。
        </p>

        <h2>なぜ自動アップデートが無効化されるか</h2>
        <p>
          自動アップデートはファイルを丸ごと上書きします。改造済みのファイルを
          上書きすると、あなたが入れた独自機能が消えてしまいます。
          これを防ぐため、ハッシュが一致しないファイルがあれば
          ユーザーの判断に委ねる設計になっています。
        </p>
        <p>
          代わりに、自分で <code>git pull</code> してコンフリクトを
          解決してからデプロイする「手動アップデート」を実行してください。
        </p>

        <h2>
          <Terminal className="mr-2 inline h-6 w-6 text-zinc-400" />
          手動アップデート手順
        </h2>
        <p>サーバーに SSH で入り、以下のコマンドを順番に実行します。</p>

        <pre>
          <code>{`# 1. line-harness のインストールディレクトリに移動
cd ~/.line-harness

# 2. 最新版を git で取得
git pull origin main

# 3. 依存をインストールしてビルド
pnpm install
pnpm build

# 4. Cloudflare Worker にデプロイ
npx wrangler deploy

# 5. /health で動作確認
curl https://YOUR-WORKER.workers.dev/health`}</code>
        </pre>

        <p>
          通常はこれだけで完了します。所要時間は 2〜5 分程度。
          ビルドエラーや wrangler デプロイエラーが出たら、
          <Link href="/updates/troubleshooting">トラブルシューティング</Link>
          を確認してください。
        </p>

        <h2>コンフリクトが出たら</h2>
        <p>
          <code>git pull</code> で merge conflict が発生した場合は、
          以下の流れで解決します。
        </p>
        <ol>
          <li>
            <code>git status</code> でコンフリクト中のファイルを確認
          </li>
          <li>
            各ファイルを開いて <code>{`<<<<<<< HEAD`}</code> から{" "}
            <code>{`>>>>>>>`}</code> までを手動マージ
          </li>
          <li>
            <code>git add &lt;file&gt;</code> でステージ
          </li>
          <li>
            <code>git commit</code> で merge コミットを作る
          </li>
          <li>
            <code>pnpm build</code> が通ることを確認
          </li>
          <li>
            可能ならローカルで <code>pnpm test</code> を実行
          </li>
          <li>
            問題なければ <code>npx wrangler deploy</code> で本番反映
          </li>
        </ol>

        <p>
          コンフリクト解決に自信がない場合は、本番デプロイの前に
          一度ステージング (別の Worker / 別の D1) で検証することを強く推奨します。
        </p>

        <h2>CLI から一括実行する場合</h2>
        <p>
          <code>create-line-harness</code> CLI でも手動アップデートを補助できます。
        </p>
        <pre>
          <code>{`npx create-line-harness update`}</code>
        </pre>
        <p>
          このコマンドは、改造済み環境を検出すると{" "}
          <strong>「fork detected」と表示してユーザー確認を求めます</strong>。
          差分の概要を表示したうえで、続行するかどうかを y/N で聞かれます。
          続行を選ぶと、git pull + pnpm build + wrangler deploy
          までを自動で実行します。
        </p>

        <p>
          ただし、コンフリクト解決には対応しません。コンフリクトが発生する
          可能性がある場合は、上の「手順」を手動で実行する方が安全です。
        </p>

        <h2>関連ページ</h2>
        <ul>
          <li>
            <Link href="/updates">アップデートのトップ</Link>
          </li>
          <li>
            <Link href="/updates/troubleshooting">トラブルシューティング</Link>
          </li>
          <li>
            <Link href="/updates/api-token">CF API トークンの作り方</Link>
          </li>
          <li>
            <Link href="/updates/migration-policy">破壊的変更のポリシー</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
