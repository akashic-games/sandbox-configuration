/**
 * akashic-sandbox, akashic-cli-serve の設定表すインターフェース。
 */
export interface SandboxConfiguration {
	/**
	 * @deprecated 非推奨。将来削除する予定。代わりに `autoSendEventName` を利用すること。 autoSendEventName が存在する場合にこの値は無視される。
	 */
	autoSendEvents?: string | null;
	/**
	 * コンテンツ起動時にイベントを自動送信するイベント名。
	 */
	autoSendEventName?: string | null;
	/**
	 * @deprecated 非推奨。将来削除する予定。代わりに `displayOptions.backgroundImage` を利用すること。displayOptions.backgroundImage が存在する場合にこの値は無視される。
	 */
	backgroundImage?: string | null;
	/**
	 * @deprecated 非推奨。将来削除する予定。代わりに `displayOptions.backgroundColor` を利用すること。displayOptions.backgroundColor が存在する場合にこの値は無視される。
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
	 * サーバ側で利用できる外部プラグインを登録。
	 */
	server?: {
		external?: {
			[key: string]: string; // 値は各プラグインの scriptPath
		};
	};
	/**
	 * 各種警告表示設定。
	 * 真の場合は警告を表示する。
	 */
	warn?: {
		/** ES6以降でサポートされるオブジェクトが使われている場合警告を出すかどうか。  */
		es6?: boolean;
		/** Date の警告を出すかどうか。 */
		useDate?: boolean;
		/** Math.random() の警告を出すかどうか。 */
		useMathRandom?: boolean;
		/** Math.sin(), Math.cos() の警告を出すかどうか。 */
		useMathBasicTrig?: boolean;
		/** 範囲外描画されている場合に警告を出すかどうか。 */
		drawOutOfCanvas?: boolean;
		/** 描画先が空の場合に警告を出すかどうか。 */
		drawDestinationEmpty?: boolean;
		/** surface のサイズが小数点の場合に警告を出すかどうか。 */
		createNonIntegerSurface?: boolean;
	};
	/**
	 * 各種表示設定。
	 */
	displayOptions?: {
		/**
		 * ゲーム画面をブラウザサイズに合わせて拡縮するか。
		 */
		fitsToScreen?: boolean | null;
		/**
		 * 画像のローカルパス、もしくは URL を指定することでコンテンツ実行画面の背景に画像を表示する。
		 */
		backgroundImage?: string | null;
		/**
		 * コンテンツ実行画面の背景色。
		 */
		backgroundColor?: string | null;
		/**
		 * グリッドを表示するか。
		 */
		showsGrid?: boolean | null;
		/**
		 * FPS などを表示するか。
		 */
		showsProfiler?: boolean | null;
		/**
		 * ニコ生ゲームのデザインガイドライン画像を表示するか。
		 */
		showsDesignGuideline?: boolean | null;
	};
	/**
	 * serve で新規インスタンス表示時のウィンドウサイズを設定。
	 * 省略時は "auto" となる。
	 * {width: number; height: number}: 指定値でウィンドウを表示。
	 * auto: game.json の width,height の値を元にウィンドウを表示。
	 * inherit: 親ウィンドウのサイズを引き継いでウィンドウを表示。
	 */
	windowSize?: { width?: number | null; height?: number | null } | "auto" | "inherit";
}

type DeprecatedProperties = "autoSendEvents" | "backgroundImage" | "backgroundColor";
/**
 * 正規化した SandboxConfiguration のインターフェース
 */
export interface NormalizedSandboxConfiguration extends Required<Omit<SandboxConfiguration, DeprecatedProperties>> {
	warn: Required<Required<SandboxConfiguration>["warn"]>;
	displayOptions: Required<Required<SandboxConfiguration>["displayOptions"]>;
	windowSize: Required<Required<SandboxConfiguration>["windowSize"]>;
}
