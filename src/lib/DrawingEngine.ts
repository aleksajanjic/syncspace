import { Point, Stroke } from "./types";
import { fabric } from "fabric";

export class DrawingEngine {
	private canvas: fabric.Canvas;
	private currentStroke: any;

	constructor(canvasElement: HTMLCanvasElement) {
		this.canvas = new fabric.Canvas(canvasElement, {
			backgroundColor: "#ffffff",
			renderOnAddRemove: false,
			selection: false,
		});
	}

	drawStroke(stroke: Stroke): void {
		// Convert stroke data to Fabric objects
		// Handle different tools appropriately
	}

	startStroke(stroke: Stroke): void {
		// Initialize new stroke
	}

	updateStroke(points: Point[]): void {
		// Update active stroke with new points
	}

	endStroke(): void {
		// Finalize stroke
	}

	clear(): void {
		// Clear canvas
	}

	undo(): void {
		// Remove last stroke from history
	}

	redo(): void {
		// Restore stroke from history
	}

	exportAsImage(format: "png" | "svg"): string {
		// Export canvas
		return "";
	}
}
