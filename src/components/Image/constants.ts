export enum DeviceSize {
	W_440 = 440,
	W_640 = 640,
	W_768 = 768,
	W_1024 = 1024,
	W_1280 = 1280,
	W_1536 = 1536,
	W_1792 = 1792,
	W_1920 = 1920,
}

export enum ImageSize {
	W_440 = 440,
	W_640 = 640,
	W_768 = 768,
	W_1024 = 1024,
	W_1280 = 1280,
}

export const deviceSizes = new Set([440, 640, 768, 1024, 1280, 1536, 1792, 1920])
export const strapiSizes = new Set([ImageSize.W_440, ImageSize.W_640, ImageSize.W_768, ImageSize.W_1024, ImageSize.W_1280])
