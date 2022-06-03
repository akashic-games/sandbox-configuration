import * as path from "path";
import type { SandboxConfiguration } from "../SandboxConfiguration";

/**
 * g.Game#external に渡されるオブジェクトを返す
 * 戻り値の関数は任意の処理を行う可能性があるため、明示的に指定された場合にのみ呼び出すようにすべきである
 */
export function getServerExternalValue(sandboxConfig: SandboxConfiguration): () => { [name: string]: any } {
	const externalValue: { [name: string]: any } = {};
	const server = sandboxConfig?.server;

	if (server?.external) {
		for (const pluginName of Object.keys(server.external)) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const pluginValue = require(path.resolve(server.external[pluginName]));
				externalValue[pluginName] = pluginValue();
			} catch (e) {
				throw new Error(`Failed to evaluating externalScript (${pluginName})`);
			}

			for (const key of Object.keys(externalValue[pluginName])) {
				if (typeof externalValue[pluginName][key] !== "function") {
					throw new Error(`${pluginName}.${key}, given as externalScript, does not export a function`);
				}
			}
		}
	}
	return () => externalValue;
}

/**
 * 正規化
 */
export function normalize(sandboxConfig: SandboxConfiguration): SandboxConfiguration {
	const config = JSON.parse(JSON.stringify(sandboxConfig));
	const { events, autoSendEvents, autoSendEventName } = sandboxConfig;

	if (!autoSendEventName && events && autoSendEvents && events[autoSendEvents] instanceof Array) {
		// TODO: `autoSendEvents` は非推奨。`autoSendEvents` の削除時にこのパスも削除する。
		// 非推奨の `autoSendEvents` のみの場合、`autoSendEventName` に値を差し替える。
		console.warn("[deprecated] `autoSendEvents` in sandbox.config.js is deprecated. Please use `autoSendEventName`.");
		config.autoSendEventName = autoSendEvents;
	}

	return config;
}
