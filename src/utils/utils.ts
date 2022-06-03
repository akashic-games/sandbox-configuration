import * as path from "path";
import type { SandboxConfiguration } from "../SandboxConfiguration";

/**
 * g.Game#external に渡されるオブジェクトを生成する関数を返す
 * 戻り値の関数は任意の処理を行う可能性があるため、明示的に指定された場合にのみ呼び出すようにすべきである
 */
export function getServerExternalFactory(sandboxConfig: SandboxConfiguration): () => { [name: string]: any } {
	const externalFactory: { [name: string]: any } = {};
	const server = sandboxConfig?.server;

	if (!server?.external) return () => externalFactory;

	return () => {
		for (const pluginName of Object.keys(server.external!)) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const pluginValue = require(path.resolve(server.external![pluginName])); // require() は結果をキャッシュするので複数回実行しても同じ値を使っている
				externalFactory[pluginName] = pluginValue();
			} catch (e) {
				throw new Error(`Failed to evaluating externalScript (${pluginName})`);
			}
		}
		return externalFactory;
	};
}

/**
 * 正規化
 */
export function normalize(sandboxConfig: SandboxConfiguration): SandboxConfiguration {
	const config = {
		...sandboxConfig,
		server: {
			external: { ...(sandboxConfig.server?.external ?? {}) }
		},
		client: {
			external: { ...(sandboxConfig.client?.external ?? {}) }
		}
	};
	const { events, autoSendEvents, autoSendEventName } = sandboxConfig;

	if (!autoSendEventName && events && autoSendEvents && events[autoSendEvents] instanceof Array) {
		// TODO: `autoSendEvents` は非推奨。`autoSendEvents` の削除時にこのパスも削除する。
		// 非推奨の `autoSendEvents` のみの場合、`autoSendEventName` に値を差し替える。
		console.warn("[deprecated] `autoSendEvents` in sandbox.config.js is deprecated. Please use `autoSendEventName`.");
		config.autoSendEventName = autoSendEvents;
	}

	return config;
}
