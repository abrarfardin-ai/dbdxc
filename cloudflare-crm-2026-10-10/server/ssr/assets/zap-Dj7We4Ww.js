import { w as __toESM, y as require_react } from "../index.js";
import { r as createLucideIcon } from "./check-vFg82jRQ.js";
//#region lib/use-live-catalog.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var initial = {
	products: null,
	updatedAt: null,
	error: false,
	environment: "unknown"
};
var snapshot = initial;
var listeners = /* @__PURE__ */ new Set();
var timer;
var pending = null;
function refreshCatalog() {
	if (pending) return pending;
	pending = (async () => {
		try {
			const response = await fetch("/api/catalog", {
				cache: "no-store",
				signal: AbortSignal.timeout(16e3)
			});
			if (!response.ok) throw new Error("Catalog unavailable");
			const data = await response.json();
			if (!Array.isArray(data.products) || !data.products.every((p) => p !== null && typeof p.slug === "string" && Number.isFinite(p.price) && p.price >= 0 && Number.isSafeInteger(p.customers) && p.customers >= 0)) throw new Error("Invalid counts");
			snapshot = {
				products: data.products,
				updatedAt: data.checkedAt || (/* @__PURE__ */ new Date()).toISOString(),
				error: false,
				environment: data.environment || "unknown"
			};
		} catch {
			snapshot = {
				...snapshot,
				products: null,
				error: true
			};
		} finally {
			pending = null;
			listeners.forEach((listener) => listener());
		}
	})();
	return pending;
}
function onVisible() {
	if (document.visibilityState === "visible") refreshCatalog();
}
function subscribe(listener) {
	listeners.add(listener);
	if (listeners.size === 1) {
		refreshCatalog();
		timer = setInterval(onVisible, 15e3);
		window.addEventListener("focus", onVisible);
		document.addEventListener("visibilitychange", onVisible);
		window.addEventListener("sw-catalog-changed", onVisible);
	}
	return () => {
		listeners.delete(listener);
		if (!listeners.size) {
			clearInterval(timer);
			window.removeEventListener("focus", onVisible);
			document.removeEventListener("visibilitychange", onVisible);
			window.removeEventListener("sw-catalog-changed", onVisible);
		}
	};
}
function useLiveCatalog() {
	return (0, import_react.useSyncExternalStore)(subscribe, () => snapshot, () => initial);
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/zap.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Zap = createLucideIcon("Zap", [["path", {
	d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	key: "1xq2db"
}]]);
//#endregion
export { refreshCatalog as n, useLiveCatalog as r, Zap as t };
