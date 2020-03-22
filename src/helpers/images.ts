export function pixelRatio(max?: number): number {
    const pixelRatio: number = window.devicePixelRatio;

    if (max !== undefined && pixelRatio > max) {
        return max;
    }

    return pixelRatio || 1;
}