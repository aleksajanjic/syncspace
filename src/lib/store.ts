import { create } from "zustand";
import { Board, DrawingState, PerformanceMetrics, Stroke, User } from "./types";

interface DrawingStore {
	// State
	board: Board | null;
	strokes: Stroke[];
	activeUsers: User[];
	currentUser: User;
	drawingState: DrawingState;
	performanceMetrics: PerformanceMetrics;

	// Actions
	setBoard: (board: Board) => void;
	addStroke: (stroke: Stroke) => void;
	updateStroke: (id: string, stroke: Stroke) => void;
	removeStroke: (id: string) => void;
	setActiveUsers: (users: User[]) => void;
	setDrawingState: (state: Partial<DrawingState>) => void;
	setMetrics: (metrics: Partial<PerformanceMetrics>) => void;

	// Computed
	getStrokesForBoard: (boardId: string) => Stroke[];
	getActiveUserCount: () => number;
}

const anonymousUser: User = {
	id: "anonymous",
	name: "Anonymous",
	color: "#000000",
	isOnline: false,
};

const initialDrawingState: DrawingState = {
	isDrawing: false,
	currentStroke: null,
	tool: { tool: "pen" },
	selectedColor: "#000000",
	strokeWidth: 2,
	zoom: 1,
	panX: 0,
	panY: 0,
};

const initialPerformanceMetrics: PerformanceMetrics = {
	fps: 0,
	latency: 0,
	strokeCount: 0,
	activeUserCount: 0,
	bundleSize: 0,
};

export const useDrawingStore = create<DrawingStore>((set, get) => ({
	// State
	board: null,
	strokes: [],
	activeUsers: [],
	currentUser: anonymousUser,
	drawingState: initialDrawingState,
	performanceMetrics: initialPerformanceMetrics,

	// Actions
	setBoard: (board) =>
		set((state) => ({
			board,
			strokes: board.strokes ?? [],
			activeUsers: board.activeUsers ?? [],
			performanceMetrics: {
				...state.performanceMetrics,
				strokeCount: board.strokes?.length ?? 0,
				activeUserCount: board.activeUsers?.length ?? 0,
			},
		})),

	addStroke: (stroke) =>
		set((state) => {
			const strokes = [...state.strokes, stroke];
			const board = state.board
				? {
						...state.board,
						strokes,
				  }
				: state.board;

			return {
				strokes,
				board,
				performanceMetrics: {
					...state.performanceMetrics,
					strokeCount: strokes.length,
				},
			};
		}),

	updateStroke: (id, updatedStroke) =>
		set((state) => {
			const strokes = state.strokes.map((stroke) =>
				stroke.id === id ? updatedStroke : stroke,
			);

			const board = state.board
				? {
						...state.board,
						strokes,
				  }
				: state.board;

			return { strokes, board };
		}),

	removeStroke: (id) =>
		set((state) => {
			const strokes = state.strokes.filter((stroke) => stroke.id !== id);

			const board = state.board
				? {
						...state.board,
						strokes,
				  }
				: state.board;

			return {
				strokes,
				board,
				performanceMetrics: {
					...state.performanceMetrics,
					strokeCount: strokes.length,
				},
			};
		}),

	setActiveUsers: (users) =>
		set((state) => {
			const board = state.board
				? {
						...state.board,
						activeUsers: users,
				  }
				: state.board;

			return {
				activeUsers: users,
				board,
				performanceMetrics: {
					...state.performanceMetrics,
					activeUserCount: users.length,
				},
			};
		}),

	setDrawingState: (partialState) =>
		set((state) => ({
			drawingState: {
				...state.drawingState,
				...partialState,
			},
		})),

	setMetrics: (partialMetrics) =>
		set((state) => ({
			performanceMetrics: {
				...state.performanceMetrics,
				...partialMetrics,
			},
		})),

	// Computed
	getStrokesForBoard: (boardId) =>
		get().strokes.filter((stroke) => stroke.boardId === boardId),

	getActiveUserCount: () => get().activeUsers.length,
}));
