import { C as __exportAll, t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { r as validateSiteSettings, t as defaults } from "./site-settings-IxYy8Dz6.js";
//#region components/site-settings-provider.tsx
var site_settings_provider_exports = /* @__PURE__ */ __exportAll({
	ManagedAnchor: () => ManagedAnchor,
	ManagedLogo: () => ManagedLogo,
	SiteSettingsProvider: () => SiteSettingsProvider,
	resolveSiteLink: () => resolveSiteLink,
	useSiteSettings: () => useSiteSettings
});
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Context = (0, import_react.createContext)({
	settings: defaults,
	ready: false
});
function SiteSettingsProvider({ children, initialSettings = null }) {
	const [settings, setSettings] = (0, import_react.useState)(initialSettings ?? defaults);
	const [ready, setReady] = (0, import_react.useState)(initialSettings !== null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const refresh = async () => {
			try {
				const r = await fetch("/api/public-content?key=site.settings", { cache: "no-store" });
				if (!r.ok) return;
				const d = await r.json();
				if (active && (d.content === null || validateSiteSettings(d.content).length === 0)) {
					setSettings(d.content ?? defaults);
					setReady(true);
				}
			} catch {}
		};
		if (!initialSettings) refresh();
		const timer = setInterval(refresh, 3e4);
		window.addEventListener("focus", refresh);
		return () => {
			active = false;
			clearInterval(timer);
			window.removeEventListener("focus", refresh);
		};
	}, [initialSettings]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
		value: {
			settings,
			ready
		},
		children
	});
}
function useSiteSettings() {
	return (0, import_react.useContext)(Context);
}
function resolveSiteLink(href, s) {
	const direct = {
		"https://wa.me/8801990995417": `https://wa.me/${String(s.whatsapp).replace(/\D/g, "")}`,
		"mailto:abrarfardin@thesyncwave.com": `mailto:${s.supportEmail}`,
		[String(defaults.youtube)]: String(s.youtube),
		[String(defaults.facebook)]: String(s.facebook),
		[String(defaults.linkedin)]: String(s.linkedin),
		[String(defaults.x)]: String(s.x)
	};
	return s.links[href] ?? direct[href] ?? href;
}
function ManagedAnchor({ href, children, ...props }) {
	const { settings } = useSiteSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		...props,
		href: href ? resolveSiteLink(href, settings) : href,
		children: children === "abrarfardin@thesyncwave.com" ? String(settings.supportEmail) : children
	});
}
function ManagedLogo(props) {
	const { settings } = useSiteSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		...props,
		src: String(settings.logo),
		alt: props.alt ?? "SYNC WAVE Academy"
	});
}
//#endregion
export { site_settings_provider_exports as a, resolveSiteLink as i, ManagedLogo as n, useSiteSettings as o, SiteSettingsProvider as r, ManagedAnchor as t };
