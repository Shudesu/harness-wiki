import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, AlertCircle, ExternalLink } from "lucide-react";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "アップデートのトラブルシューティング",
  description:
    "L Harness のアップデートが失敗したときの対処、rollback、よくあるエラー",
  alternates: { canonical: `${SITE_URL}/updates/troubleshooting` },
};

export default function UpdatesTroubleshootingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          Home
        </Link>
        <span>/</span>
        <Link href="/updates" className="hover:text-zinc-300">
          アップデート
        </Link>
        <span>/</span>
        <span className="text-zinc-300">トラブルシューティング</span>
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
          prose-blockquote:border-l-2 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:my-6 prose-blockquote:text-zinc-300 prose-blockquote:not-italic
        "
      >
        <h1>アップデートのトラブルシューティング</h1>

        <p>
          アップデートで困ったときの対処をまとめました。多くの場合、自動 rollback
          機能で前のバージョンに自動で戻るので、サービスが完全に停止することは
          ほぼありません。落ち着いて以下を順番に確認してください。
        </p>

        <h2>1. 「アップデートボタンが押せない / バナーが出ない」</h2>
        <p>管理画面の上部に「v0.X.X にアップデート」バナーが表示されない場合の原因と対処です。</p>

        <h3>原因 A: manifest 取得に失敗している</h3>
        <p>
          ダッシュボードは GitHub の{" "}
          <code>line-harness-oss</code> リポジトリから最新リリースの manifest を
          取得します。GitHub API の rate limit に当たっているか、ネットワーク
          経路に問題がある可能性があります。
        </p>
        <ul>
          <li>
            ブラウザの DevTools (F12) で Network タブを開き、
            <code>/api/updates/check</code> のレスポンスを確認
          </li>
          <li>5〜10 分待って再読み込み (rate limit リセット)</li>
          <li>
            それでも出ない場合は{" "}
            <code>https://github.com/Shudesu/line-harness-oss/releases</code>{" "}
            にアクセスできるか確認
          </li>
        </ul>

        <h3>原因 B: ログインしていない / 権限不足</h3>
        <p>
          アップデートはアカウント Owner ロールのみが実行できます。
          Staff ロールでログインしている場合はバナーが表示されません。
          Owner アカウントでログインし直してください。
        </p>

        <h3>原因 C: すでに最新版</h3>
        <p>
          現在のバージョンが GitHub の最新リリースと一致している場合は、
          バナーは表示されません。<code>/settings</code> でバージョンを確認できます。
        </p>

        <h2>2. 「fork detected と表示される」</h2>
        <p>
          ハッシュ検証で改造が検出された状態です。自動アップデートは
          安全のため停止されます。手動アップデート手順に従ってください。
        </p>
        <p>
          詳細:{" "}
          <Link href="/updates/manual">
            手動アップデート (改造済みユーザー向け)
          </Link>
        </p>

        <h2>3. 「進捗バーが途中で止まっている」</h2>
        <p>
          アップデート中の進捗は SSE (Server-Sent Events) で配信されます。
          ネットワークの問題で SSE 接続が切れると、画面上の進捗バーは止まったように
          見えますが、サーバー側ではアップデートが進行している可能性があります。
        </p>
        <ul>
          <li>まずページをリロードしてください</li>
          <li>
            リロード後、<code>/updates</code> の履歴ページに最新の状態が表示されます
            (running / completed / failed)
          </li>
          <li>5 分以上 running のままなら、アップデートが詰まっている可能性が高いです</li>
        </ul>

        <h2>4. 「アップデートが失敗した」</h2>
        <p>
          アップデートのどこかのステップ (build / migration / deploy / health check)
          で失敗した場合、line-harness は<strong>自動的に rollback</strong> を実行します。
        </p>

        <h3>自動 rollback の挙動</h3>
        <ul>
          <li>Worker は前のバージョンに即座にロールバック</li>
          <li>D1 migration は additive-only ポリシーのため、原則として rollback 不要</li>
          <li>
            R2 のアセットも前バージョン用が残っているため、影響を最小化
          </li>
          <li>失敗の詳細は <code>/updates</code> ページのエラー欄に表示</li>
        </ul>

        <h3>原因の調べ方</h3>
        <ol>
          <li>
            <code>/updates</code> ページで該当アップデートのログをクリック
          </li>
          <li>
            失敗したステップ (build / migrate / deploy / health) と
            エラーメッセージを確認
          </li>
          <li>
            自分で原因がわからない場合は、ログを丸ごとコピーして
            GitHub Issue に貼って報告してください
          </li>
        </ol>

        <h3>GitHub Issue 報告先</h3>
        <p>
          <a
            href="https://github.com/Shudesu/line-harness-oss/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
          >
            github.com/Shudesu/line-harness-oss/issues
            <ExternalLink className="h-3 w-3" />
          </a>
        </p>

        <h2>5. 「migration が失敗した」</h2>
        <p>
          D1 のスキーマ変更 (migration) が失敗した場合、Worker は古いバージョンの
          ままになります。サービス自体は止まらないので慌てる必要はありません。
        </p>

        <h3>確認手順</h3>
        <ol>
          <li>
            Cloudflare Dashboard → D1 → 該当 DB の「Console」タブを開く
          </li>
          <li>
            <code>SELECT name FROM sqlite_master WHERE type=&apos;table&apos;;</code>{" "}
            で現在のテーブル状態を確認
          </li>
          <li>
            <code>migrations</code> テーブルがあれば、適用済みの migration 一覧を確認
          </li>
        </ol>

        <h3>最終手段: 手動 SQL</h3>
        <p>
          migration が壊れて自動再実行できない場合、Cloudflare Dashboard
          の D1 Console から手動で SQL を実行できます。
        </p>
        <blockquote>
          <strong>警告:</strong> 手動 SQL はバックアップを取ってから実行してください。
          失敗すると元に戻せません。GitHub Issue で相談するのを強く推奨します。
        </blockquote>

        <h2>6. 「Worker 更新後に /health が失敗する」</h2>
        <p>
          新しい Worker にデプロイした直後、<code>/health</code> エンドポイントが
          応答しないと、line-harness は自動で前のバージョンに戻します
          (health check timeout は通常 30 秒)。
        </p>

        <h3>原因の例</h3>
        <ul>
          <li>環境変数 (Secret) の設定漏れ</li>
          <li>D1 binding の設定ミス</li>
          <li>新しいコードに含まれる構文エラー / 起動失敗</li>
          <li>R2 / KV など外部リソースの権限不足</li>
        </ul>

        <h3>調査手順</h3>
        <ol>
          <li>
            <code>npx wrangler tail</code> で Worker のリアルタイムログを見る
          </li>
          <li>
            Cloudflare Dashboard → Workers → 該当 Worker → Logs を確認
          </li>
          <li>
            足りない Secret があれば <code>wrangler secret put</code> で追加
            (<Link href="/updates/api-token">CF API トークンの作り方</Link>{" "}
            と同じ要領)
          </li>
        </ol>

        <div className="not-prose my-8 rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
            <div className="text-sm text-blue-100">
              <strong>困ったときは</strong>: line-harness は OSS です。
              ログとエラーメッセージを添えて{" "}
              <a
                href="https://github.com/Shudesu/line-harness-oss/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline"
              >
                GitHub Issue
              </a>{" "}
              で報告してもらえれば、メンテナや他のユーザーから返答が来ます。
            </div>
          </div>
        </div>

        <h2>関連ページ</h2>
        <ul>
          <li>
            <Link href="/updates">アップデートのトップ</Link>
          </li>
          <li>
            <Link href="/updates/manual">手動アップデート</Link>
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
