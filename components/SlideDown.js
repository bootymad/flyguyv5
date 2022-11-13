import { useRef, useEffect } from "react";

export default function SlideDown({ title, setter, isOpen, children }) {
	const content = useRef();
	useEffect(() => {
		console.log("open changed");
		isOpen
			? content.current.classList.add("is_open")
			: content.current.classList.remove("is_open");
	}, [isOpen]);

	return (
		<div className="slide_down">
			<div className="slide_down-heading_bar" onClick={setter}>
				<h2 style={{ textDecoration: isOpen ? "underline" : "none" }}>
					{title}
				</h2>
			</div>
			<div ref={content} className="slide_down-content-box">
				{children}
			</div>
		</div>
	);
}
