import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, KeyRound, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "CF API トークンの作り方",
  description:
    "L Harness のダッシュボードからアップデートを実行するための Cloudflare API トークンの作成手順",
};

export default function UpdatesApiTokenPage() {
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
        <span className="text-zinc-300">CF API トークンの作り方</span>
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
        <h1>CF API トークンの作り方</h1>

        <p>
          line-harness の自動アップデートは、Cloudflare API 経由で
          あなたの Worker・Pages・D1 を更新します。そのために、
          必要最小限の権限を持った API トークンを 1 つだけ発行して、
          Worker の Secret に登録します。所要時間は 5 分くらいです。
        </p>

        <h2>
          <KeyRound className="mr-2 inline h-6 w-6 text-zinc-400" />
          なぜ必要か
        </h2>
        <p>
          ダッシュボードから「アップデート」ボタンを押すと、line-harness は
          以下の Cloudflare リソースを操作します:
        </p>
        <ul>
          <li>Worker: 新しいバージョンのコードをデプロイ</li>
          <li>Pages: ダッシュボード UI をビルド & デプロイ</li>
          <li>D1: スキーマ migration を適用</li>
          <li>Account: 既存設定の参照</li>
        </ul>
        <p>
          これらを実行するには、Cloudflare API への認証情報が必要です。
          OAuth ではなくユーザー発行の API トークンを使うことで、
          <strong>権限を最小化</strong>し、いつでも revoke できるようにしています。
        </p>

        <h2>必要な scope (権限)</h2>
        <p>
          以下の 4 つの権限だけを持ったカスタムトークンを作成します。
          無関係なリソース (Zone, DNS, R2 など) には触らないので、
          万が一トークンが漏れても影響範囲は限定されます。
        </p>

        <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-zinc-200">
                  カテゴリ
                </th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-200">
                  権限
                </th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-200">
                  レベル
                </th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-t border-zinc-800">
                <td className="px-4 py-3">Account</td>
                <td className="px-4 py-3">
                  <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[13px] text-emerald-400">
                    Workers Scripts
                  </code>
                </td>
                <td className="px-4 py-3">Edit</td>
              </tr>
              <tr className="border-t border-zinc-800">
                <td className="px-4 py-3">Account</td>
                <td className="px-4 py-3">
                  <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[13px] text-emerald-400">
                    Cloudflare Pages
                  </code>
                </td>
                <td className="px-4 py-3">Edit</td>
              </tr>
              <tr className="border-t border-zinc-800">
                <td className="px-4 py-3">Account</td>
                <td className="px-4 py-3">
                  <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[13px] text-emerald-400">
                    D1
                  </code>
                </td>
                <td className="px-4 py-3">Edit</td>
              </tr>
              <tr className="border-t border-zinc-800">
                <td className="px-4 py-3">Account</td>
                <td className="px-4 py-3">
                  <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[13px] text-emerald-400">
                    Account Settings
                  </code>
                </td>
                <td className="px-4 py-3">Read</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>作成手順</h2>

        <h3>1. API Tokens 画面を開く</h3>
        <p>
          <a
            href="https://dash.cloudflare.com/profile/api-tokens"
            target="_blank"
            rel="noopener noreferrer"
          >
            dash.cloudflare.com/profile/api-tokens
          </a>{" "}
          を開きます (右上のプロフィール → My Profile → API Tokens でも辿れます)。
        </p>
        {/* screenshot: cf-dashboard-profile-menu.png */}

        <h3>2. Create Token をクリック</h3>
        <p>
          画面右上の <strong>「Create Token」</strong> ボタンを押します。
          テンプレート一覧が表示されるので、一番下までスクロールして
          <strong>「Custom token」</strong> の{" "}
          <strong>「Get started」</strong> を押します。
        </p>
        {/* screenshot: cf-create-token-templates.png */}

        <h3>3. 権限を追加する</h3>
        <p>
          「Permissions」セクションで、上の表の 4 つの権限を順番に追加します。
          各行で「Account」「Workers Scripts」「Edit」のように選びます。
        </p>
        {/* screenshot: cf-custom-token-permissions.png */}

        <h3>4. Account Resources を絞る</h3>
        <p>
          「Account Resources」セクションで、対象の Cloudflare アカウントを 1 つ選びます。
          <strong>「Include - All accounts」は使わない</strong>でください。
          複数アカウントを持っている場合、line-harness 用のアカウントだけを選ぶことで
          事故を防げます。
        </p>
        {/* screenshot: cf-account-resources.png */}

        <h3>5. Token name を付ける</h3>
        <p>
          後で見分けやすいように、token の名前を{" "}
          <code>line-harness-update</code> など分かりやすいものに設定します。
        </p>

        <h3>6. Create して、表示されたトークンをコピー</h3>
        <p>
          「Continue to summary」→「Create Token」と進むと、トークン文字列が表示されます。
        </p>
        <div className="not-prose my-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" />
            <div className="text-sm text-amber-100">
              <strong>このトークンは、画面を閉じたら二度と表示されません。</strong>
              必ずクリップボードにコピーしてから次に進んでください。万が一なくしたら、
              新しいトークンを作り直して、古い方を revoke すれば OK です。
            </div>
          </div>
        </div>

        <h2>Worker Secret に保存する</h2>
        <p>
          コピーした token を、line-harness の Worker Secret として登録します。
          サーバーに SSH で入り、以下のコマンドを実行してください。
        </p>

        <pre>
          <code>{`cd ~/.line-harness

# YOUR_TOKEN をさっきコピーしたトークンに置き換える
printf '%s' "YOUR_TOKEN_HERE" | npx wrangler secret put CF_API_TOKEN`}</code>
        </pre>

        <div className="not-prose my-6 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-400" />
            <div className="text-sm text-rose-100">
              <strong>必ず <code>printf</code> を使ってください</strong>。
              <code>echo</code> はデフォルトで末尾に改行を付け足します。
              改行が混ざったトークンを保存すると、Cloudflare API が 404 を返してしまい、
              アップデートが動かなくなります。
            </div>
          </div>
        </div>

        <p>
          設定後、<code>npx wrangler secret list</code> で{" "}
          <code>CF_API_TOKEN</code> が一覧に出れば成功です。
        </p>

        <h2>
          <ShieldCheck className="mr-2 inline h-6 w-6 text-zinc-400" />
          セキュリティについて
        </h2>
        <ul>
          <li>
            Token は Cloudflare 側で暗号化されて保存され、
            ダッシュボードからも値は読み取れません (登録 / 削除 / 上書きのみ可能)
          </li>
          <li>
            Worker のコード内では <code>env.CF_API_TOKEN</code> として参照できますが、
            ログには出さない / レスポンスに含めない設計になっています
          </li>
          <li>
            万が一漏れたと感じたら、Cloudflare ダッシュボードから即時 revoke できます
          </li>
          <li>
            権限が最小化されているので、漏れても影響は line-harness の
            Worker / Pages / D1 に限定されます (Zone や DNS は触れません)
          </li>
        </ul>

        <h2>関連ページ</h2>
        <ul>
          <li>
            <Link href="/updates">アップデートのトップ</Link>
          </li>
          <li>
            <Link href="/updates/manual">手動アップデート</Link>
          </li>
          <li>
            <Link href="/updates/troubleshooting">トラブルシューティング</Link>
          </li>
          <li>
            <Link href="/updates/migration-policy">破壊的変更のポリシー</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
