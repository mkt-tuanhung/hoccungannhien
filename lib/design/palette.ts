// Soft 3D pastel design system — bảng màu chủ đạo cho toàn bộ game modes.
// Mỗi scheme gồm: face (mặt nút), lip (viền dưới tạo độ sâu 3D), text, soft (nền nhạt).

export interface ColorScheme {
  face: string;
  lip: string;
  text: string;
  soft: string;
}

export const PALETTE: Record<string, ColorScheme> = {
  mint: { face: "#6FD08C", lip: "#4FB571", text: "#1E5631", soft: "#E4F8EA" },
  pink: { face: "#FF9CC2", lip: "#EA6F9E", text: "#7A2E50", soft: "#FFE7F1" },
  sky: { face: "#7CC9F0", lip: "#4FA8DC", text: "#16465F", soft: "#E2F4FD" },
  sun: { face: "#FFCF5C", lip: "#F0B131", text: "#7A560F", soft: "#FFF5DA" },
  lav: { face: "#B49BEC", lip: "#9576E2", text: "#3B2A66", soft: "#EFE9FE" },
  coral: { face: "#FF9E80", lip: "#F0734D", text: "#7A3219", soft: "#FFE9E1" },
};

// Thứ tự màu gán cho 4 nút đáp án (xen kẽ vui mắt)
export const ANSWER_SCHEMES = ["mint", "pink", "sky", "sun", "lav", "coral"];

// Màu confetti khi trả lời đúng
export const CONFETTI_COLORS = ["#FF9CC2", "#6FD08C", "#7CC9F0", "#FFCF5C", "#B49BEC", "#FF9E80"];

// Nền cảnh — gradient ấm áp dịu mắt
export const SCENE_BG = "linear-gradient(180deg, #FFF6FB 0%, #FBEFFB 45%, #EFEAFE 100%)";
