"use client";

import React from "react";
import clsx from "clsx";

interface HeaderProps {
	boardName: string;
	userCount: number;
	isOnline: boolean;
	latency: number;
	onShareClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
	boardName = "Untitled Board",
	userCount = 0,
	isOnline = true,
	latency = 0,
	onShareClick,
}) => {
	const statusText = isOnline
		? `Online • ${userCount} user${userCount !== 1 ? "s" : ""}`
		: "Offline";

	const latencyText = latency > 0 ? `${latency}ms` : "";

	return (
		<header className={"header"}>
			<div className={"header__left"}>
				<div className={"header__logo"}>SyncSpace</div>
				<div className={"header__board"}>{boardName}</div>
			</div>

			<div className={"header__right"}>
				<div className={"header__user-status"}>
					<div
						className={clsx("header__status-dot", {
							"header__status-dot--offline": !isOnline,
							"header__status-dot--connecting":
								isOnline && latency > 200,
						})}
					/>
					<span>{statusText}</span>
					{latencyText && (
						<span className={"header__latency"}>{latencyText}</span>
					)}
				</div>

				<button
					className={"header__share"}
					onClick={onShareClick}
					title="Share this board"
				>
					<span>Share Board</span>
				</button>
			</div>
		</header>
	);
};

export default Header;
