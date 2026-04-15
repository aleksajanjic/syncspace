"use client";

import React from "react";
import { ActiveUsersSidebar } from "@/components/activeUsers";

interface MainWindowProps {}

export const MainWindow: React.FC<MainWindowProps> = () => {
	return (
		<div className="main-content">
			<div>Main Window</div>
			<ActiveUsersSidebar />
		</div>
	);
};
