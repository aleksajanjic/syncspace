export interface Tool {
	tool: "pen" | "eraser" | "rectangle" | "circle" | "line" | "arrow";
}

export interface Point {
	x: number;
	y: number;
	pressure?: number;
}

export interface Stroke {
	id: string;
	boardId: string;
	userId: string;
	userName: string;
	userColor: string;
	tool: Tool;
	color?: string;
	strokeWidth: number;
	points: Point[];
	createdAt: Date;
	version: number;
}

export interface User {
	id: string;
	name: string;
	color: string;
	cursor?: { x: number; y: number };
	isOnline: boolean;
}

export interface Board {
	id: string;
	name?: string;
	createdAt: Date;
	updatedAt: Date;
	strokes: Stroke[];
	activeUsers: User[];
}

export interface DrawingState {
	isDrawing: boolean;
	currentStroke: Stroke | null;
	tool: Tool;
	selectedColor: string;
	strokeWidth: number;
	zoom: number;
	panX: number;
	panY: number;
}

export interface PerformanceMetrics {
	fps: number;
	latency: number;
	strokeCount: number;
	activeUserCount: number;
	bundleSize: number;
}
