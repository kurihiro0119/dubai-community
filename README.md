# ドバイ日本人コミュニティ掲示板

ドバイ在住日本人向けの交流掲示板アプリケーションです。

## 機能

- ユーザー登録・ログイン
- 投稿の作成・閲覧
- カテゴリ別投稿（一般、住居・不動産、求人・仕事、グルメ・レストラン、イベント、質問・相談）
- コメント機能
- レスポンシブデザイン

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- NextAuth.js

## セットアップ

1. 依存関係のインストール

```bash
npm install
```

2. 環境変数の設定

`.env` ファイルを作成し、以下を設定：

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

3. データベースのセットアップ

```bash
npx prisma generate
npx prisma db push
```

4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## データベース管理

Prisma Studioでデータベースを確認・編集できます：

```bash
npm run db:studio
```
# dubai-community
