<p align="center">
<img src="https://raw.githubusercontent.com/akashic-games/sandbox-configuration/main/img/akashic.png" />
</p>

# sandbox-configuration
sandbox.config.js の型定義を提供します。
**ゲーム開発者(Akashic Engineの利用者)がこのモジュールを直接利用する必要はありません**。

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

## テスト方法

```
npm test
```


## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/sandbox-configuration/blob/main/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
