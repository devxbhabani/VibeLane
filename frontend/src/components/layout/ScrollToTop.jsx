import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

function ScrollToTop() {
	const { pathname } = useLocation();
	const lenis = useLenis();

	useEffect(() => {
		// 1. Tell Lenis smooth scroll engine to jump to top immediately
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		}
		// 2. Fallback for native window scroll
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	}, [pathname, lenis]);

	return null;
}

export default ScrollToTop;
