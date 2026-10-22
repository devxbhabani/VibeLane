import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RouteTransitionLoader() {
	const location = useLocation();
	const [active, setActive] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		// Trigger smooth micro-progress bar across route changes
		setActive(true);
		setProgress(20);

		const t1 = setTimeout(() => setProgress(65), 80);
		const t2 = setTimeout(() => setProgress(100), 220);
		const t3 = setTimeout(() => {
			setActive(false);
			setProgress(0);
		}, 480);

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};
	}, [location.pathname]);

	if (!active && progress === 0) return null;

	return (
		<div className="fixed top-0 left-0 right-0 z-[9998] pointer-events-none h-[2px] bg-transparent">
			<div
				className="h-full bg-[#EDE4DD] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(237,228,221,0.6)]"
				style={{
					width: `${progress}%`,
					opacity: progress === 100 ? 0 : 1,
					transitionProperty: "width, opacity",
				}}
			/>
		</div>
	);
}
