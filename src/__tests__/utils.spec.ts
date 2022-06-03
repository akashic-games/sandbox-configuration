import type { SandboxConfiguration } from "../SandboxConfiguration";
import * as utils from "../utils";

describe("utils", () => {
	const conf1: SandboxConfiguration = {
		autoSendEvents: "autoSendEvents1",
		autoSendEventName: "autoSendEventName1",
		backgroundImage: "",
		backgroundColor: "red",
		showMenu: false,
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
		});

		it("server.external does not exist", () => {
			const conf: SandboxConfiguration = {
				server: {
					external: {}
				}
			};
			const obj = utils.getServerExternalFactory(conf);
			console.log(obj());
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
		it("autoSendEvents and autoSendEventName exist", () => {
			const conf = utils.normalize(conf1);
			expect(conf.autoSendEventName).toBe("autoSendEventName1");
			expect(conf.autoSendEvents).toBe("autoSendEvents1");
		});

		it("When only autoSendEventName, nothing changes", () => {
			const conf = utils.normalize(conf2);
			expect(conf.autoSendEventName).toBe("autoSendEventName2");
			expect(conf.autoSendEvents).toBeUndefined();
		});

		it("For autoSendEvents only, autoSendEventName is the value of autoSendEvents", () => {
			const conf = utils.normalize(conf3);
			expect(conf.autoSendEventName).toBe("autoSendEvents3");
			expect(conf.autoSendEvents).toBe("autoSendEvents3");
			expect(conf3.autoSendEventName).toBeUndefined();
		});
	});
});
