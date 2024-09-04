# Reacによるフロントエンド開発

## 概要
Reactを用いたフロントエンド（プロトタイプレベル）です。
`v0.dev` という生成AIのサービスを活用して作っています。


## プロジェクト構築手順

プロジェクトの初期化
```
npm create vite@latest frontend -- --template react-ts
cd frontend
```

依存関係のインストール
```
npm install
npm install react-markdown @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
```

Tailwind CSSの設定
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

tailwind.config.jsを以下の内容で置き換えます。
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

src/index.cssを以下の内容で置き換えます。
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## テスト実行

```bash
npm run dev

# ブラウザで http://localhost:5173 を開く
```

