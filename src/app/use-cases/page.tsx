import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Repeat2,
  Send,
  Sparkles,
  Users,
  Zap,
  Bell,
  Image as ImageIcon,
  Heart,
  Lock,
  TrendingUp,
  ArrowRight,
  Tag,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { ArticleList } from "@/components/article/article-list";

export const metadata: Metadata = {
  title: "活用事例",
  description:
    "LINE / X / Instagram Harness で実現できることを具体例で紹介。コピペで再現できる実装例つき。",
};

type Product = "line" | "x" | "ig";

interface UseCase {
  title: string;
  summary: string;
  outcome: string;
  steps: string[];
  icon: typeof MessageCircle;
  related?: { label: string; href: string };
}

const productMeta: Record<
  Product,
  {
    name: string;
    href: string;
    icon: typeof MessageCircle;
    accent: string;
    text: string;
    border: string;
    bg: string;
    tagline: string;
  }
> = {
  line: {
    name: "LINE Harness",
    href: "/line",
    icon: MessageCircle,
    accent: "from-green-400 to-emerald-600",
    text: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    tagline: "友だち管理 & ステップ配信",
  },
  x: {
    name: "X Harness",
    href: "/x",
    icon: Repeat2,
    accent: "from-blue-400 to-indigo-600",
    text: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    tagline: "エンゲージメントゲート",
  },
  ig: {
    name: "IG Harness",
    href: "/ig",
    icon: Send,
    accent: "from-pink-400 to-rose-600",
    text: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-500/5",
    tagline: "DM自動化",
  },
};

const cases: Record<Product, UseCase[]> = {
  line: [
    {
      icon: Sparkles,
      title: "申し込み後の自動オンボーディング",
      summary:
        "友だち追加 → ヒアリング → 個別案内まで人が触らずに完結させる。",
      outcome: "対応漏れゼロ。営業担当が手動で送る必要がなくなる。",
      steps: [
        "シナリオを作成して友だち追加トリガーで起動",
        "1日目に自己紹介、3日目にヒアリングフォーム配信",
        "回答内容に応じてタグ自動付与 → 担当者へ通知",
      ],
      related: { label: "シナリオ配信を学ぶ", href: "/line" },
    },
    {
      icon: Tag,
      title: "属性タグで配信を出し分ける",
      summary:
        "顧客の属性・興味・ステータスをタグで管理し、必要な人にだけ届ける。",
      outcome: "ブロック率を大幅に下げつつ、CVRを上げる。",
      steps: [
        "アンケートフォームでタグを自動付与",
        "セグメント配信で対象を絞る",
        "タグ別の開封・CTRをダッシュボードで確認",
      ],
    },
    {
      icon: Bell,
      title: "リマインダー & イベント告知",
      summary:
        "セミナー前日・当日にリマインドを自動送信。離脱を防ぐ。",
      outcome: "出席率を平均20%改善できる。",
      steps: [
        "予約フォームから日時タグを自動付与",
        "シナリオで前日 19:00 / 当日 09:00 に配信",
        "終了後にアンケート送信→次回オファーへ",
      ],
    },
    {
      icon: ImageIcon,
      title: "リッチメニューで導線を固定する",
      summary:
        "友だちが何度開いても迷わないよう、固定メニューから主要アクションへ誘導。",
      outcome: "問い合わせ削減、自己解決率の向上。",
      steps: [
        "リッチメニュー画像を作成（推奨 2500x1686）",
        "ボタン領域に URL / シナリオ起動 / フォームを割当",
        "配信切り替えで A/B テスト",
      ],
    },
  ],
  x: [
    {
      icon: Lock,
      title: "いいね&リポストでコンテンツを解放",
      summary:
        "投稿に「いいね&リポストでDMで送ります」と書き、自動DMで配布。",
      outcome: "1投稿で数百〜数千のリポストとフォロワー獲得。",
      steps: [
        "エンゲージメントゲートを作成（条件: like + repost + follow）",
        "対象ポストの URL とDM本文を登録",
        "verify を回して条件達成者に自動DM",
      ],
      related: { label: "ゲートを設定する", href: "/x" },
    },
    {
      icon: Users,
      title: "プレゼント企画で一気にフォロワー増",
      summary:
        "応募条件にフォロー必須を入れ、参加者にDMで詳細案内。",
      outcome: "通常運用の10倍ペースでフォロワーが伸びる。",
      steps: [
        "プレゼント告知ポストを公開",
        "条件: follow + repost + reply のゲート作成",
        "達成者へDM配信、当選者を絞り込み",
      ],
    },
    {
      icon: Heart,
      title: "リプライで個別フォローアップ",
      summary:
        "特定キーワードのリプ送信者にだけ自動でDMを送る。",
      outcome: "見込み客と1対1の会話を即座にスタート。",
      steps: [
        "リプライ条件のゲートを作成",
        "達成時のDM本文に LINE 誘導や LP の URL を設定",
        "DM送信ログから反応率を計測",
      ],
    },
    {
      icon: TrendingUp,
      title: "LINE への送客で資産化",
      summary:
        "X の瞬間風速を、LINE の継続接点に変換する。",
      outcome: "アルゴリズム変更にも左右されない収益基盤を構築。",
      steps: [
        "ゲート達成DMに LINE 友だち追加URL を設置",
        "LINE Harness 側でステップ配信を起動",
        "クロスチャネルの CV をトラッキング",
      ],
    },
  ],
  ig: [
    {
      icon: MessageCircle,
      title: "コメントトリガーで自動DM",
      summary:
        "リール / 投稿のコメントに特定キーワードがあれば自動でDM配布。",
      outcome: "ManyChat 不要で同じ仕組みを月額0円で運用。",
      steps: [
        "対象投稿とキーワードを登録",
        "DM本文と CTA ボタン（LP / LINE 誘導）を設定",
        "コメントログとDM配信ログを確認",
      ],
      related: { label: "DM自動化の流れ", href: "/ig" },
    },
    {
      icon: Lock,
      title: "ストーリーズ反応で限定公開",
      summary:
        "クイズスタンプの回答者やDM送信者にだけ限定情報を配布。",
      outcome: "エンゲージメント率を維持しながら濃いリード獲得。",
      steps: [
        "ストーリー反応のトリガーを作成",
        "条件達成者へDM自動配信",
        "限定LPに UTM 付きで誘導して計測",
      ],
    },
    {
      icon: Users,
      title: "フォロー必須ゲート",
      summary:
        "リード資料配布の前提条件にフォローを設定し、確実にフォロワーへ転換。",
      outcome: "DMリーチの質を担保しつつ、フォロワーを能動的に増やす。",
      steps: [
        "ゲート条件に follow を追加",
        "未フォローの場合はフォロー導線を案内",
        "フォロー確認後に資料DMを送信",
      ],
    },
    {
      icon: Zap,
      title: "LINE / X とのクロス連携",
      summary:
        "IG → LINE / IG → X の送客でチャネルを横断した運用。",
      outcome: "プラットフォームBANリスクの分散と、複線化された収益。",
      steps: [
        "IG Harness の DM に LINE Harness 友だち追加 URL を設置",
        "LIFF で UUID を引き継いでパーソナライズ配信",
        "横断ファネルをダッシュボードで確認",
      ],
    },
  ],
};

const PRODUCT_ORDER: Product[] = ["line", "x", "ig"];

export default function UseCasesPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-24 pt-10 sm:pt-16">
      {/* Hero */}
      <section className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[11px] font-medium text-zinc-400">
          <Sparkles size={11} className="text-amber-400" />
          活用事例
        </span>
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            「これ、Harness で出来るの？」
          </span>
          <br className="hidden sm:block" />
          に答える事例集
        </h1>
        <p className="max-w-xl text-sm text-zinc-400 sm:text-base">
          LINE・X・Instagram で実際に使われている自動化シナリオ。
          コピペで再現できる手順つき。
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {PRODUCT_ORDER.map((key) => {
            const meta = productMeta[key];
            return (
              <a
                key={key}
                href={`#${key}`}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${meta.border} ${meta.text} hover:bg-white/5`}
              >
                <meta.icon size={12} />
                {meta.name}
              </a>
            );
          })}
        </div>
      </section>

      {/* Stats strip */}
      <section className="grid gap-3 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 sm:grid-cols-3">
        {[
          {
            icon: Clock,
            label: "セットアップ",
            value: "5分〜",
            note: "1コマンドでデプロイ",
          },
          {
            icon: ShieldCheck,
            label: "ランニング",
            value: "0円〜",
            note: "Cloudflare 無料枠で動作",
          },
          {
            icon: Sparkles,
            label: "ライセンス",
            value: "OSS",
            note: "全ソース公開・自由に改変",
          },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800/80">
              <s.icon size={16} className="text-zinc-300" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                {s.label}
              </p>
              <p className="text-sm font-semibold text-zinc-100">
                {s.value}
                <span className="ml-2 text-[11px] font-normal text-zinc-500">
                  {s.note}
                </span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Per-product case sections */}
      {PRODUCT_ORDER.map((key) => {
        const meta = productMeta[key];
        const items = cases[key];
        return (
          <section
            key={key}
            id={key}
            className="flex scroll-mt-24 flex-col gap-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${meta.accent}`}
                >
                  <meta.icon size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{meta.name}</h2>
                  <p className={`text-xs ${meta.text}`}>{meta.tagline}</p>
                </div>
              </div>
              <Link
                href={meta.href}
                className="hidden items-center gap-1 text-xs font-medium text-zinc-400 hover:text-zinc-100 sm:inline-flex"
              >
                詳しく見る
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((c) => (
                <article
                  key={c.title}
                  className={`group flex flex-col gap-4 rounded-2xl border ${meta.border} ${meta.bg} p-5 transition-colors hover:bg-white/[0.04]`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/60">
                      <c.icon size={15} className={meta.text} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-snug text-zinc-100">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                        {c.summary}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 px-3 py-2.5 text-[11px] text-zinc-300">
                    <span className="mr-1.5 font-semibold text-zinc-100">
                      Outcome:
                    </span>
                    {c.outcome}
                  </div>

                  <ol className="flex flex-col gap-1.5 text-xs text-zinc-400">
                    {c.steps.map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          className={`shrink-0 font-mono text-[10px] font-bold ${meta.text}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  {c.related && (
                    <Link
                      href={c.related.href}
                      className="mt-auto inline-flex items-center gap-1 text-[11px] font-medium text-zinc-300 hover:text-white"
                    >
                      {c.related.label}
                      <ArrowRight
                        size={11}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  )}
                </article>
              ))}
            </div>

            <Link
              href={meta.href}
              className="self-start text-xs text-zinc-500 hover:text-zinc-200 sm:hidden"
            >
              {meta.name} の記事一覧へ →
            </Link>
          </section>
        );
      })}

      {/* Community-contributed use cases */}
      <section className="flex flex-col gap-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">コミュニティ投稿の活用事例</h2>
            <p className="mt-1 text-xs text-zinc-500">
              ユーザーが投稿した実装例。新しい記事はここに自動で並びます。
            </p>
          </div>
          <Link
            href="/write"
            className="shrink-0 text-xs font-medium text-zinc-400 hover:text-zinc-100"
          >
            あなたも書く →
          </Link>
        </div>
        <ArticleList category="use-cases" maxItems={9} />
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6 py-10 text-center">
        <h2 className="text-xl font-bold">気になった事例から始める</h2>
        <p className="max-w-md text-sm text-zinc-400">
          全て5分でセットアップできて、Cloudflare 無料枠で動きます。
          まずは1つ動かしてみると感覚が掴めます。
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Link
            href="/getting-started"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-5 py-2.5 text-xs font-bold text-zinc-900 transition-colors hover:bg-white"
          >
            セットアップガイド
            <ArrowRight size={12} />
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-5 py-2.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            掲示板で相談する
          </Link>
        </div>
      </section>
    </div>
  );
}
