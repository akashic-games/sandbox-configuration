/**
 * akashic-sandbox, akashic-cli-serve の設定表すインターフェース。
 */
export interface SandboxConfiguration {
	/**
	 * @deprecated 非推奨。将来削除する予定。
	 * autoSendEventName の使用が正となる。autoSendEventName が存在する場合にこの値は無視される。
	 */
	autoSendEvents?: string | null;
	/**
	 * コンテンツ起動時にイベントを自動送信するイベント名。
	 */
	autoSendEventName?: string | null;
	/**
	 * 画像のローカルパス、もしくは URL を指定することでコンテンツ実行画面の背景に画像を表示する。
	 */
	backgroundImage?: string | null;
	/**
	 * コンテンツ実行画面の背景色。
	 */
	backgroundColor?: string | null;
	/**
	 * ページ読み込み時にデベロッパーメニューを表示するか否か。
	 * 省略された場合、偽。
	 */
	showMenu?: boolean;
	/**
	 * コンテンツで扱う playlog イベント。
	 */
	events?: { [name: string]: any };
	/**
	 * コンテンツの起動時に渡される引数。
	 */
	arguments?: { [name: string]: any };
	/**
	 * 外部アセットの値。
	 * serve で外部アセットを利用する場合は `--allow-external` オプションを利用。
	 */
	externalAssets?: (string | RegExp)[] | null;
	/**
	 * 将来の拡張に備えたバージョン識別子。
	 * 現状この値は "1" もしくは省略されなければなりません。
	 */
	formatVersion?: "1";
	/**
	 * クライアント側で利用できる外部プラグインを登録。
	 */
	client?: {
		external?: {
			[key: string]: string; // 値は各プラグインの scriptPath
		};
	};
	/**
	 * サーバ側で利用できる外部プラグインを登録
	 */
	server?: {
		external?: {
			[key: string]: string; // 値は各プラグインの scriptPath
		};
	};
	/**
	 * 各種警告表示設定
	 * 真の場合は警告を表示する
	 */
	warn?: {
		/** ES6以降でサポートされるオブジェクトが使われている場合警告を出すかどうか  */
		es6?: boolean;
		/** Date の警告を出すかどうか */
		useDate?: boolean;
		/** Math.random() の警告を出すかどうか */
		useMathRandom?: boolean;
		/** 範囲外描画されている場合に警告を出すかどうか */
		drawOutOfCanvas?: boolean;
		/** 描画先が空の場合に警告を出すかどうか */
		drawDestinationEmpty?: boolean;
	};
}

/**
 * 正規化した SandboxConfiguration のインターフェース
 */
export interface NormalizedSandboxConfiguration extends Required<Omit<SandboxConfiguration, "autoSendEvents">> {}
