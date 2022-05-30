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

	describe("getServeExternalValue()", () => {
		it("Argument file exist", () => {
			const obj = utils.getServeExternalValue("src/__tests__/fixtures/testPlugin.js");
			expect(obj().test()).toBeTruthy();
		});

		it("Argument file does not exist", () => {
			expect(() => {
				utils.getServeExternalValue("nofile.js");
			}).toThrow(/^Failed to evaluating externalScript \(nofile.js\).*/);
		});

		it("Argument file does not exist", () => {
			expect(() => {
				utils.getServeExternalValue("src/__tests__/fixtures/failPlugin.js");
			}).toThrow(/^src\/__tests__\/fixtures\/failPlugin.js, given as externalScript.*/);
		});
	});

	describe("normalize()", () => {
		it("autoSendEvents and autoSendEventName exist", () => {
			utils.normalize(conf1);
			expect(conf1.autoSendEventName).toBe("autoSendEventName1");
			expect(conf1.autoSendEvents).toBe("autoSendEvents1");
		});

		it("When only autoSendEventName, nothing changes", () => {
			utils.normalize(conf2);
			expect(conf2.autoSendEventName).toBe("autoSendEventName2");
			expect(conf2.autoSendEvents).toBeUndefined();
		});

		it("For autoSendEvents only, autoSendEventName is the value of autoSendEvents", () => {
			utils.normalize(conf3);
			expect(conf3.autoSendEventName).toBe("autoSendEvents3");
			expect(conf3.autoSendEvents).toBe("autoSendEvents3");
		});
	});
});
