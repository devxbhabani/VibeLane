import React from "react";

import { useState, useEffect } from "react";
import { Braces, Code, Code2 } from "lucide-react";

function Manifesto() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Triggers shortly after mount/reload
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<div className="mx-8">
				<div
					className={`w-full h-1.25 bg-[#EDE4DD] mt-10 mb-4 origin-left transition-transform duration-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
						isLoaded ? "scale-x-100" : "scale-x-0"
					}`}
				/>
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-2">
						<h1 className="text-7xl	 font-extrabold">
							Wear your attitude.
						</h1>
						<h1 className="text-7xl text-zinc-500 font-extrabold">
							Or let it wear you.
						</h1>
					</div>
					<div>
						<h1 className="text-[150px] font-extrabold">©26</h1>
					</div>
				</div>
				<div className="mt-29 max-w-[50%]">
					<p className="font-semibold">
						Created by{" "}
						<Code size={16} className="font-medium inline-block" />{" "}
						<a
							className="hover:underline font-medium"
							href="github.com/devxbhabani"
						>
							{/* <Braces size={16} className="inline-block" /> */}
							devxbhabani
						</a>{" "}
						with passion and a little rebellion, our collection celebrates
						individuality, creativity, and the art of self-expression.
						Thoughtfully crafted. Boldly worn. Unapologetically you.
					</p>
				</div>
			</div>
		</>
	);
}

export default Manifesto;
