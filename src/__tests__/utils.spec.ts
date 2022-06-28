import type { SandboxConfiguration } from "../SandboxConfiguration";
import * as utils from "../utils";

describe("utils", () => {
	const conf1: SandboxConfiguration = {
		autoSendEvents: "autoSendEvents1",
		autoSendEventName: "autoSendEventName1",
		backgroundImage: "./path",
		backgroundColor: "red",
		showMenu: true,
		events: {
			autoSendEvents1: [],
			autoSendEventName1: []
		},
		arguments: {},
		externalAssets: [],
		client: {
			external: {
				testPlugin: "./testPlugin.js"
			}
		}
	};
	const conf2: SandboxConfiguration = {
		autoSendEventName: "autoSendEventName2",
		events: {
			autoSendEventName2: []
		},
		server: {
			external: {
				fooPlugin: "./fooPlugin.js"
			}
		}
	};
	const conf3: SandboxConfiguration = {
		autoSendEvents: "autoSendEvents3",
		events: {
			autoSendEvents3: []
		}
	};

	describe("getServerExternalValue", () => {
		it("server.external exist", () => {
			const conf: SandboxConfiguration = {
				server: {
					external: {
						testPlugin: "src/__tests__/fixtures/testPlugin.js"
					}
				}
			};
			const obj = utils.getServerExternalFactory(conf);
			expect(obj().testPlugin.test()).toBeTruthy();
			expect(obj().testPlugin.hoge()).toBe("hoge");
			expect(obj().testPlugin.foo).toBe("foo");
			expect(obj().testPlugin.inc()).toBe(1);

			const plugin = obj();
			expect(plugin.testPlugin.count).toBe(0);
			expect(plugin.testPlugin.inc()).toBe(1);
			expect(plugin.testPlugin.inc()).toBe(2); // inc() 2 回目の呼び出しで testPlugin.count が使い回されていること。
		});

		it("server.external does not exist", () => {
			const conf: SandboxConfiguration = {
				server: {
					external: {}
				}
			};
			const obj = utils.getServerExternalFactory(conf);
			expect(Object.keys(obj).length).toBe(0);
		});

		it("plugin file does not exist", () => {
			const conf: SandboxConfiguration = {
				server: {
					external: {
						noFilePlugin: "src/__tests__/fixtures/noFilePlugin.js"
					}
				}
			};
			expect(() => {
				const obj = utils.getServerExternalFactory(conf);
				obj();
			}).toThrow(/^Failed to evaluating externalScript \(noFilePlugin\).*/);
		});

		it("plugin file does not function", () => {
			const conf: SandboxConfiguration = {
				server: {
					external: {
						failPlugin: "src/__tests__/fixtures/failPlugin.js"
					}
				}
			};
			expect(() => {
				const obj = utils.getServerExternalFactory(conf);
				obj();
			}).toThrow(/^Failed to evaluating externalScript \(failPlugin\).*/);
		});
	});

	describe("normalize()", () => {
		it("default value", () => {
			const conf = utils.normalize({});
			expect(conf.autoSendEventName).toBeNull();
			expect(conf.hasOwnProperty("autoSendEvents")).toBeFalsy();
			expect(conf.backgroundImage).toBeNull();
			expect(conf.backgroundColor).toBeNull();
			expect(conf.showMenu).toBeFalsy();
			expect(conf.events).toEqual({});
			expect(conf.arguments).toEqual({});
			expect(conf.externalAssets).toEqual([]);
			expect(conf.formatVersion).toBe("1");
			expect(conf.server.external).toEqual({});
			expect(conf.client.external).toEqual({});
		});

		it("autoSendEvents and autoSendEventName exist", () => {
			const conf = utils.normalize(conf1);
			expect(conf.autoSendEventName).toBe("autoSendEventName1");
			expect(conf.backgroundImage).toBe("./path");
			expect(conf.backgroundColor).toBe("red");
			expect(conf.showMenu).toBeTruthy();
			expect(conf.events).toEqual({ autoSendEvents1: [], autoSendEventName1: [] });
			expect(conf.arguments).toEqual({});
			expect(conf.externalAssets).toEqual([]);
			expect(conf.formatVersion).toBe("1");
			expect(conf.server.external).toEqual({});
			expect(conf.client.external).toEqual({ testPlugin: "./testPlugin.js" });
		});

		it("When only autoSendEventName, nothing changes", () => {
			const conf = utils.normalize(conf2);
			expect(conf.autoSendEventName).toBe("autoSendEventName2");
			expect(conf.events).toEqual({ autoSendEventName2: [] });
			expect(conf.server.external).toEqual({ fooPlugin: "./fooPlugin.js" });
		});

		it("For autoSendEvents only, autoSendEventName is the value of autoSendEvents", () => {
			const conf = utils.normalize(conf3);
			expect(conf.autoSendEventName).toBe("autoSendEvents3");
			expect(conf.events).toEqual({ autoSendEvents3: [] });
		});
	});
});
