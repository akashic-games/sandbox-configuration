<p align="center">
<img src="https://raw.githubusercontent.com/akashic-games/sandbox-configuration/main/img/akashic.png" />
</p>

# sandbox-configuration
sandbox.config.js の型定義を提供します。
**ゲーム開発者(Akashic Engineの利用者)がこのモジュールを直接利用する必要はありません**。

## 各プロパティの説明
* autoSendEventName: コンテンツ起動時にイベントを自動送信するイベント名
* showMenu: ページ読み込み時にデベロッパーメニューを表示するか否か。省略時は偽
* events: コンテンツで扱う playlog イベント
* arguments: コンテンツの起動時に渡される引数
* externalAssets: 外部アセットの値
* formatVersion: 将来の拡張に備えたバージョン識別子。現状 "1" 固定
* client.external: クライアント側で利用できる外部プラグインを登録
* server.external: サーバ側で利用できる外部プラグインを登録
* warn: 各種警告表示設定。真の場合は警告を表示
  * es6: ES6以降でサポートされるオブジェクトが使われている場合警告を出すかどうか
  * useDate: Date の警告を出すかどうか
  * useMathRandom: Math.random() の警告を出すかどうか
  * drawOutOfCanvas: 範囲外描画されている場合に警告を出すかどうか
  * drawDestinationEmpty: 描画先が空の場合に警告を出すかどうか
* displayOptions: 各種表示設定
  * fitsToScreen: ゲーム画面をブラウザサイズに合わせて拡縮するか
  * backgroundImage: 画像のローカルパス、もしくは URL を指定することでコンテンツ実行画面の背景に画像を表示
  * backgroundColor: コンテンツ実行画面の背景色
  * showsGrid: グリッドを表示するか
  * showsProfiler: FPS などを表示するか。
  * showsDesignGuideline: ニコ生ゲームのデザインガイドライン画像を表示するか

詳細は [SandboxConfiguration.ts の定義とコメント][SandboxConfiguration-link]を参照してください。

## インストール

Node.jsが必要です。次のコマンドでインストールできます。

```
npm install @akashic/sandbox-configuration
```

## ビルド方法

TypeScriptで書かれています。インストール後にビルドしてください。

```sh
npm install
npm run build
```

## 利用方法

### 型として参照する場合

任意の TypeScript ファイル内でモジュールのルートを `import` してください。

```javascript
import {...} from "@akashic/sandbox-configuration";
```

### g.Game#external に渡されるオブジェクトを取得する

`@akashic/sandbox-configuration/lib/utils` を `require()` してください。

```javascript
const utils = require("@akashic/sandbox-configuration/lib/utils");

...

const externalFacotory = utils.getServerExternalFactory(sandboxConfig);
```

### sandbox.config.js を正規化処理をする場合
```javascript
const utils = require("@akashic/sandbox-configuration/lib/utils");

...
const config = utils.normalize(sandboxConfig);
```

正規化した場合のデフォルト値は下記のようになります。
* warn の値が設定していなければ、warn の各プロパティのデフォルト値は真が設定されます。
* 非推奨の autoSendEvents があり、 autoSendEventName がない場合、autoSendEventName に値を差し替えます。

## テスト方法

```
npm test
```


## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/sandbox-configuration/blob/main/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。

[SandboxConfiguration-link]: https://github.com/akashic-games/sandbox-configuration/blob/main/src/SandboxConfiguration.ts
