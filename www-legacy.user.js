// ==UserScript==
// @version	1.0
// @namespace	https://fennet.rentals/
// @name	CurseForge www-legacy switcher
// @description	"Legacy website" / "Go to the new website" will take you to the currently open project, not the homepage
// @author	unilock
// @license	MIT
// @downloadURL	https://github.com/unilock/userscripts/raw/main/www-legacy.user.js
// @updateURL	https://github.com/unilock/userscripts/raw/main/www-legacy.user.js
// @homepageURL	https://github.com/unilock/userscripts/
// @supportURL	https://github.com/unilock/userscripts/issues/
// @source	https://github.com/unilock/userscripts/
// @match	https://www.curseforge.com/*
// @match	https://legacy.curseforge.com/*
// @run-at	document-end
// @grant	none
// ==/UserScript==

function main() {
	// "Legacy website"
	const legacyButton = document.querySelector('.info-missing-link.h-full.items-center.flex > .top-nav__nav-link')
	if (legacyButton) {
		legacyButton.setAttribute('href', 'https://www.curseforge.com' + document.location.pathname)
		legacyButton.innerHTML = legacyButton.innerHTML.replace('Go to the new website', 'New website')
	}

	// "Go to the new website"
	const newButton = document.querySelector('.link-btn-icon.btn-primary.link-btn')
	if (newButton) {
		newButton.setAttribute('href', 'https://legacy.curseforge.com' + document.location.pathname)
		newButton.children[1].innerHTML = 'Legacy website'
	}
}

// setTimeout is lazy, but it works...
setTimeout(() => main(), 250)

let lastURL = document.URL
new MutationObserver((mutations) => {
	let url = document.URL
	if (url != lastURL) {
		lastURL = url
		setTimeout(() => main(), 250)
	}
}).observe(document, {subtree: true, childList: true})
