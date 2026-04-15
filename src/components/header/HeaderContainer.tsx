"use client";

import { useState } from "react";
import { Header } from "./Header";

export function HeaderContainer() {
	const [showShareModal, setShowShareModal] = useState(false);

	const handleShareClick = () => {
		console.log("share board");
		setShowShareModal(true);
		// TODO: Open share modal
	};

	return (
		<>
			<Header
				boardName="Test board"
				userCount={2}
				isOnline={true}
				latency={0}
				onShareClick={handleShareClick}
			/>
			{/* Share modal will go here later */}
		</>
	);
}
