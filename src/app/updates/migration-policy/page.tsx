import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, XCircle, Info } from "lucide-react";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "破壊的変更のポリシー",
  description:
    "L Harness の DB スキーマ変更ポリシー (additive-only) と、破壊的変更を行うときの段階的手順",
  alternates: { canonical: `${SITE_URL}/updates/migration-policy` },
};

export default function UpdatesMigrationPolicyPage() {
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
        <span className="text-zinc-300">破壊的変更のポリシー</span>
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
        <h1>破壊的変更のポリシー</h1>

        <div className="not-prose my-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
            <div className="text-sm text-emerald-100">
              <strong>要約:</strong> line-harness の DB スキーマ変更は
              <strong>additive-only (足すだけ)</strong>。
              破壊的変更が必要な場合は<strong>3 リリースに分けて段階的に</strong>適用します。
              これは、古いバージョンを動かしているユーザーがいる間に DB を壊さないための
              バージョン間互換ルールです。
            </div>
          </div>
        </div>

        <h2>許可される変更 (リリース単位)</h2>
        <p>
          1 つのリリース内で許可されるのは、<strong>既存データを壊さない変更だけ</strong>です。
          具体的には以下のとおりです。
        </p>
        <ul>
          <li>
            <CheckCircle2 className="mb-1 mr-2 inline h-5 w-5 text-emerald-400" />
            <code>CREATE TABLE</code> — 新しいテーブルの作成
          </li>
          <li>
            <CheckCircle2 className="mb-1 mr-2 inline h-5 w-5 text-emerald-400" />
            <code>ALTER TABLE ... ADD COLUMN</code> — 既存テーブルへのカラム追加 (
            <strong>NULL 許容 or DEFAULT 値あり</strong>に限る)
          </li>
          <li>
            <CheckCircle2 className="mb-1 mr-2 inline h-5 w-5 text-emerald-400" />
            <code>CREATE INDEX</code> — インデックス追加
          </li>
          <li>
            <CheckCircle2 className="mb-1 mr-2 inline h-5 w-5 text-emerald-400" />
            <code>INSERT INTO ...</code> — seed データの追加
          </li>
        </ul>

        <h2>同一リリース内で禁止される変更</h2>
        <p>
          以下の変更は、古いバージョンの Worker が動いている可能性があるため、
          <strong>同一リリースで実行することは禁止</strong>されています。
          段階的アプローチ (後述) を使ってください。
        </p>
        <ul>
          <li>
            <XCircle className="mb-1 mr-2 inline h-5 w-5 text-rose-400" />
            <code>DROP TABLE</code> — テーブル削除
          </li>
          <li>
            <XCircle className="mb-1 mr-2 inline h-5 w-5 text-rose-400" />
            <code>DROP COLUMN</code> — カラム削除
          </li>
          <li>
            <XCircle className="mb-1 mr-2 inline h-5 w-5 text-rose-400" />
            <code>ALTER COLUMN TYPE</code> — カラム型変更
          </li>
          <li>
            <XCircle className="mb-1 mr-2 inline h-5 w-5 text-rose-400" />
            <code>RENAME TABLE / RENAME COLUMN</code> — 名前変更
          </li>
          <li>
            <XCircle className="mb-1 mr-2 inline h-5 w-5 text-rose-400" />
            <code>NOT NULL</code> 制約の追加 (DEFAULT なし)
          </li>
          <li>
            <XCircle className="mb-1 mr-2 inline h-5 w-5 text-rose-400" />
            <code>UNIQUE</code> 制約の追加
          </li>
        </ul>

        <h2>破壊的変更を行うときの手順 (3 リリース)</h2>
        <p>
          どうしても DROP / RENAME / 型変更が必要な場合は、
          以下のように<strong>3 リリース挟んで段階的に</strong>移行します。
          例として「<code>users.email</code> カラムを削除する」ケースで説明します。
        </p>

        <h3>リリース N: 新スキーマを additive に追加</h3>
        <ul>
          <li>新しいカラム / テーブルを additive に追加 (旧スキーマはそのまま残す)</li>
          <li>新コードは<strong>新旧両方を読める</strong>ようにする</li>
          <li>書き込みは引き続き旧スキーマ (or 新旧両方)</li>
        </ul>
        <pre>
          <code>{`-- migrations/0042_add_email_address.sql
ALTER TABLE users ADD COLUMN email_address TEXT;`}</code>
        </pre>

        <h3>リリース N+1: 旧スキーマを deprecate</h3>
        <ul>
          <li>新コードは新スキーマのみに書き込む (旧スキーマには書かない)</li>
          <li>読み込みは互換性のため引き続き新旧両方</li>
          <li>既存データのバックフィル migration を実行</li>
        </ul>
        <pre>
          <code>{`-- migrations/0050_backfill_email_address.sql
UPDATE users SET email_address = email WHERE email_address IS NULL;`}</code>
        </pre>

        <h3>リリース N+2: 旧スキーマを drop</h3>
        <ul>
          <li>新コードは新スキーマのみ参照</li>
          <li>旧カラム / テーブルを <code>DROP</code></li>
          <li>
            この時点で N-1 以前を動かしている Worker は壊れるが、
            十分な告知期間を取ったあとなので OK
          </li>
        </ul>
        <pre>
          <code>{`-- migrations/0058_drop_legacy_email.sql
ALTER TABLE users DROP COLUMN email;`}</code>
        </pre>

        <blockquote>
          <strong>なぜ 3 リリース?</strong>{" "}
          ユーザーが古いバージョンの Worker をしばらく動かし続ける可能性があるからです。
          1 リリースで DROP すると、まだ更新していないユーザーの Worker が
          DB エラーで動かなくなります。
        </blockquote>

        <h2>急ぐ場合: major version bump</h2>
        <p>
          段階的な移行が現実的でないほど大規模な変更が必要な場合は、
          <strong>major version をインクリメント</strong>して破壊的変更を入れる選択肢があります。
        </p>
        <ul>
          <li>
            例: <code>v1.x.x</code> → <code>v2.0.0</code>
          </li>
          <li>
            リリースノートで<strong>明示的に「破壊的変更を含む」と告知</strong>
          </li>
          <li>移行ガイドを wiki に用意</li>
          <li>
            ユーザーが手動でアップデート決定 (自動アップデートは major bump で停止)
          </li>
        </ul>
        <p>
          ただし major bump はユーザー体験を悪化させるので、
          できる限り 3 リリース移行を選んでください。
        </p>

        <h2>CI で違反 migration を block</h2>
        <p>
          <code>scripts/check-migrations.ts</code> という CI スクリプトが、
          リリース時に各 migration ファイルを構文チェックします。
          <code>DROP</code> / <code>RENAME</code> /{" "}
          <code>ALTER COLUMN TYPE</code> などの破壊的キーワードが含まれていると、
          <code>release.yml</code> ワークフローで<strong>リリースが block</strong>されます。
        </p>
        <pre>
          <code>{`# 違反例 (CI で reject される)
ALTER TABLE users DROP COLUMN email;
ALTER TABLE users RENAME COLUMN name TO display_name;
ALTER TABLE users ALTER COLUMN age TYPE BIGINT;`}</code>
        </pre>
        <p>
          意図的に破壊的変更を入れたい場合は、
          コミットメッセージに <code>BREAKING CHANGE:</code> を含めて
          PR タイトルにも明記してください。レビュー時に手動で承認します。
        </p>

        <h2>なぜこのルールが必要か</h2>
        <p>
          line-harness は OSS で、ユーザーが各自のサーバーで動かしています。
          中央集権的にバージョンを揃えられないので、
          <strong>古いバージョンの Worker が新しい DB スキーマと共存する期間</strong>{" "}
          が必ず発生します。
        </p>
        <p>
          additive-only ルールにより、新スキーマは古いコードからも安全に
          無視できます (古いコードは新カラムを知らないだけで、エラーにならない)。
          逆に DROP / RENAME を即時適用すると、未更新の Worker が
          「カラムがない」エラーで全停止する事故が起きます。
        </p>
        <p>
          このポリシーは、line-harness が長期メンテナンスされる OSS であるための
          基本契約だと考えてください。
        </p>

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
            <Link href="/updates/api-token">CF API トークンの作り方</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
