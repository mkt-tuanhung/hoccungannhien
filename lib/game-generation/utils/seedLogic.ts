/**
 * Khởi tạo chuỗi hạt giống ngẫu nhiên nhưng cố định (Mulberry32)
 * Giúp các scene đồ họa tạo sinh được tái tạo 100% giống hệt nhau
 * nếu truyền cùng một tham số đầu vào.
 */
export function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

/**
 * Hàm băm chuỗi string thành một số integer 32bit để làm Seed.
 * Ví dụ truyền "MATH-G1-L01-G01-Q01" sẽ ra một số nguyên cố định.
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Lấy ra một số ngẫu nhiên từ Min đến Max dựa trên hàm sinh rng
 */
export function randomRange(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/**
 * Lấy một phần tử ngẫu nhiên từ mảng dựa trên rng
 */
export function randomElement<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}
