import * as path from "path";
import type { SandboxConfiguration } from "../SandboxConfiguration";

/**
 * g.Game#external に渡されるオブジェクトを返す
 */
export function getServeExternalValue(externalScriptPath: any): () => any {
	let gameExternalFactory: () => any = () => undefined;
	try {
		gameExternalFactory = require(path.resolve(externalScriptPath));
	} catch (e) {
		throw new Error(`Failed to evaluating externalScript (${externalScriptPath}): ${e}`);
	}
	if (typeof gameExternalFactory !== "function") {
		throw new Error(`${externalScriptPath}, given as externalScript, does not export a function`);
	}

	return gameExternalFactory;
}

/**
 * 正規化
 */
export function normalize(sandboxConfig: SandboxConfiguration): void {
	const { events, autoSendEvents, autoSendEventName } = sandboxConfig;

	if (!autoSendEventName && events && autoSendEvents && events[autoSendEvents] instanceof Array) {
		// TODO: `autoSendEvents` は非推奨。`autoSendEvents` の削除時にこのパスも削除する。
		// 非推奨の `autoSendEvents` のみの場合、`autoSendEventName` に値を差し替える。
		console.warn("[deprecated] `autoSendEvents` in sandbox.config.js is deprecated. Please use `autoSendEventName`.");
		sandboxConfig.autoSendEventName = autoSendEvents;
	}
}
