# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

```bash
pnpm install
```

2. Start the app

```bash
pnpm expo start
```

## iOSシミュレーターでの起動（Xcode 27以降）

Xcode 27 では Simulator.app が廃止され Device Hub.app に置き換わったため、`pnpm expo start` 実行中に `i` を押してもシミュレーターが起動しません（`osascript -e 'id of app "Simulator"'` が失敗する）。以下の手順で手動起動してください。

1. シミュレーターを起動し、Device Hub を開く

```bash
xcrun simctl list devices available   # 利用可能なデバイスを確認
xcrun simctl boot "iPhone 17 Pro"
open -b com.apple.dt.Devices
```

2. Expo Go が未インストールの場合はインストールする（初回のみ）

```bash
xcrun simctl install booted ~/.expo/ios-simulator-app-cache/Expo-Go-54.0.6.tar.app
```

3. 開発サーバーを起動する

```bash
pnpm expo start
```

4. 別ターミナルからシミュレーターの Expo Go でアプリを開く

```bash
xcrun simctl openurl booted exp://127.0.0.1:8081
```

シミュレーターを終了するときは `xcrun simctl shutdown booted` を実行します。




