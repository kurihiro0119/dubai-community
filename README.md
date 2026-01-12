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

## Vercelへのデプロイ

### 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定してください：

1. **Settings** → **Environment Variables** に移動
2. 以下の変数を追加：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | 本番環境のURL（Vercelが自動生成したURL） |
| `NEXTAUTH_SECRET` | ランダムな文字列 | セッション暗号化用のシークレット（下記コマンドで生成可能） |
| `DATABASE_URL` | Vercel Postgres等の接続文字列 | 本番環境用のデータベースURL |

**NEXTAUTH_SECRETの生成方法：**
```bash
openssl rand -base64 32
```

**注意：**
- `NEXTAUTH_URL`は、Vercelが自動生成するURL（例：`https://dubai-community.vercel.app`）を使用してください
- カスタムドメインを使用する場合は、そのドメインを設定してください
- 環境変数は**Production**、**Preview**、**Development**の各環境で設定できます

### データベースの設定

本番環境ではSQLiteではなく、Vercel Postgresやその他のPostgreSQLデータベースを使用することを推奨します。

1. Vercelダッシュボードで **Storage** → **Create Database** → **Postgres** を選択
2. 作成後、接続文字列を`DATABASE_URL`として設定
3. Prismaマイグレーションを実行：
   ```bash
   npx prisma migrate deploy
   ```
