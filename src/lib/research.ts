export const SITE_URL = "https://harness-wiki.pages.dev";
export const ORGANIZATION_ID = "https://aiagent-inc.com/#organization";
export const PERSON_ID = "https://the-harness.com/noda-shuichi/#person";
export const HARNESS_BRAND_ID = "https://the-harness.com/harness/#brand";
export const L_HARNESS_CLOUD_ID = "https://lharness.cloud/#service";
export const PRODUCT_ENTITY_IDS = {
  "L Harness": "https://the-harness.com/harness/#l-harness",
  "IG Harness": "https://the-harness.com/harness/#ig-harness",
  "X Harness": "https://the-harness.com/harness/#x-harness",
} as const;
export const PRODUCT_URLS = {
  "L Harness": "https://the-harness.com/line-harness/",
  "IG Harness": "https://the-harness.com/ig-harness/",
  "X Harness": "https://the-harness.com/x-harness/",
} as const;
export const PRODUCT_REPOSITORIES = {
  "L Harness": "https://github.com/Shudesu/line-harness-oss",
  "IG Harness": "https://github.com/Shudesu/ig-harness-oss",
  "X Harness": "https://github.com/Shudesu/x-harness-oss",
} as const;
export const PRODUCT_ALIASES = {
  "L Harness": ["https://l-harness.jp/", "https://l-harness.com/"],
  "IG Harness": ["https://igharness.jp/"],
  "X Harness": ["https://xharness.jp/"],
} as const;

export type ResearchCollection = {
  product: "L Harness" | "IG Harness" | "X Harness";
  description: string;
  hubUrl: string;
  catalogUrl: string;
  fullTextUrl: string;
  articles: ReadonlyArray<{ title: string; url: string }>;
};

export const researchCollections: ReadonlyArray<ResearchCollection> = [
  {
    product: "L Harness",
    description: "LINE運用基盤の配信、Webhook、D1、権限、更新機構を固定Gitコミットから検証する一次技術資料。",
    hubUrl: "https://line-harness.jp/research/",
    catalogUrl: "https://line-harness.jp/research/catalog.json",
    fullTextUrl: "https://line-harness.jp/llms-full.txt",
    articles: [
      { title: "L Harnessの一斉配信は二重送信をどう抑えるか――冪等性・再試行・重複排除のコード読解", url: "https://line-harness.jp/articles/broadcast-idempotency-dedup-internals/" },
      { title: "ステップ配信の状態機械――待機時間・分岐・停止をコード上で追跡する", url: "https://line-harness.jp/articles/step-delivery-state-machine/" },
      { title: "LINE Webhookの信頼境界――署名検証・Secret必須化・イベント保存の順序", url: "https://line-harness.jp/articles/webhook-verification-and-secret-boundary/" },
      { title: "L Harness D1 migration進化地図――スキーマを完成形ではなく変更履歴として読む", url: "https://line-harness.jp/articles/d1-migration-evolution-map/" },
      { title: "管理APIの三重境界――認証・ロール判定・レート制限の適用順序", url: "https://line-harness.jp/articles/admin-auth-role-rate-limit/" },
      { title: "流入リンクをopen redirectにしない――安全な遷移先とURL tokenの検証", url: "https://line-harness.jp/articles/safe-redirect-and-url-token/" },
      { title: "予約とGoogle Calendarの整合性――二重予約をどの時点で再検査するか", url: "https://line-harness.jp/articles/booking-calendar-consistency/" },
      { title: "セルフホスト更新の安全設計――preflight・snapshot・apply・verify・rollback", url: "https://line-harness.jp/articles/update-engine-preflight-rollback/" },
      { title: "AIへCRM操作を渡す境界――MCPの読取・作成・送信toolを分類する", url: "https://line-harness.jp/articles/mcp-write-operation-boundary/" },
      { title: "複数LINE公式アカウントのデータ境界――account scope漏れを検査する", url: "https://line-harness.jp/articles/multi-account-data-scope/" },
    ],
  },
  {
    product: "IG Harness",
    description: "InstagramのWebhook、token、DM、計測、複数アカウント境界を固定Gitコミットから検証する一次技術資料。",
    hubUrl: "https://ig-harness.jp/research/",
    catalogUrl: "https://ig-harness.jp/research/catalog.json",
    fullTextUrl: "https://ig-harness.jp/llms-full.txt",
    articles: [
      { title: "Instagram Webhook署名はraw bodyで検証する――JSON再生成との境界", url: "https://ig-harness.jp/articles/webhook-signature-byte-boundary/" },
      { title: "Instagram tokenの寿命を監視する――期限・更新・実API probeを分離する", url: "https://ig-harness.jp/articles/token-lifecycle-health-probe/" },
      { title: "Instagram engagement gateの状態遷移――コメントからDMまでの分母を固定する", url: "https://ig-harness.jp/articles/engagement-gate-state-transitions/" },
      { title: "DM follow-up dripの時間設計――初回反応・遅延・停止条件を検証する", url: "https://ig-harness.jp/articles/followup-drip-scheduling/" },
      { title: "コメント条件一致の意味論――完全一致・任意コメント・対象投稿を分ける", url: "https://ig-harness.jp/articles/comment-rule-match-semantics/" },
      { title: "Instagram DMからリンククリックまで――tracked link帰属の検証鎖", url: "https://ig-harness.jp/articles/tracked-link-attribution-chain/" },
      { title: "IGからL Harnessへ同一人物をつなぐ――UUID cross-linkの境界", url: "https://ig-harness.jp/articles/line-cross-link-identity/" },
      { title: "Instagramメディア公開の二段階処理――R2保存・Range配信・publish状態", url: "https://ig-harness.jp/articles/media-publish-r2-range/" },
      { title: "Instagram複数アカウント対応のindex設計――account scopeと検索コスト", url: "https://ig-harness.jp/articles/multi-account-index-design/" },
      { title: "IG Harness管理操作の権限境界――role guardとrate limitを別々に試験する", url: "https://ig-harness.jp/articles/role-and-rate-limit-boundary/" },
    ],
  },
  {
    product: "X Harness",
    description: "X API、予約投稿、engagement、OAuth、MCPの実装境界を固定Gitコミットから検証する一次技術資料。",
    hubUrl: "https://x-harness.jp/research/",
    catalogUrl: "https://x-harness.jp/research/catalog.json",
    fullTextUrl: "https://x-harness.jp/llms-full.txt",
    articles: [
      { title: "X API使用量を台帳化する――endpoint・機能・account別コスト観測", url: "https://x-harness.jp/articles/api-usage-cost-ledger/" },
      { title: "予約投稿の冪等性――同一時刻・再試行・quote postを検証する", url: "https://x-harness.jp/articles/scheduled-post-idempotency/" },
      { title: "X reply pollingの重複処理を減らす――cursor・cache・再取得範囲", url: "https://x-harness.jp/articles/polling-reply-cache/" },
      { title: "X engagement gateのverify境界――reply・like・repost・follow条件", url: "https://x-harness.jp/articles/engagement-gate-verification/" },
      { title: "フォロワー状態をsnapshotで読む――現在値・変化・cacheの違い", url: "https://x-harness.jp/articles/follower-snapshot-cache/" },
      { title: "X投稿権限をstaff roleで分ける――閲覧・下書き・承認・公開", url: "https://x-harness.jp/articles/staff-role-publishing-authority/" },
      { title: "情報源からX Articleまで――source候補・draft・承認・公開の来歴", url: "https://x-harness.jp/articles/growth-source-article-pipeline/" },
      { title: "X広告・外部イベントのverify API――eventを成果へ変換する境界", url: "https://x-harness.jp/articles/xaa-event-verification/" },
      { title: "X account OAuth境界――OAuth 1.0a secret・複数account・失効", url: "https://x-harness.jp/articles/oauth-account-secret-boundary/" },
      { title: "X APIとCookie収集を混同しない――MCP scrape toolの実行境界", url: "https://x-harness.jp/articles/mcp-scrape-api-boundary/" },
    ],
  },
];

export const researchArticles = researchCollections.flatMap((collection) =>
  collection.articles.map((article) => ({ ...article, product: collection.product }))
);
