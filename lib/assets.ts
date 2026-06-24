// Trả về URL đầy đủ cho asset — R2 khi deploy, /public/ khi local dev
const R2 = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

export function assetUrl(path: string): string {
  // path phải bắt đầu bằng / vd: /images/ai_tutor.png
  return R2 ? `${R2}${path}` : path;
}

// Shortcuts hay dùng
export const img = {
  aiTutor:      assetUrl('/images/ai_tutor.png'),
  childAvatar:  assetUrl('/images/child_avatar.png'),
  englishIcon:  assetUrl('/images/english_icon.png'),
  mathIcon:     assetUrl('/images/math_icon.png'),
  vietnameseIcon: assetUrl('/images/vietnamese_icon.png'),
  cutePetCat:   assetUrl('/images/cute_pet_cat.png'),
  homeChild:    assetUrl('/images/home_child.png'),
  homeParent:   assetUrl('/images/home_parent.png'),
  island: (n: number) => assetUrl(`/islands/island_${n}.png`),
  scene: (name: string) => assetUrl(`/scenes/${name}.png`),
};
