# BỔ SUNG HỆ THỐNG ĐỒ HOẠ AI + PROCEDURAL GENERATION CHO GAME MODE HỌC TOÁN LỚP 1

## 1. Mục tiêu bổ sung

Tài liệu này bổ sung cho hệ thống học Toán lớp 1 dạng game tương tác.

Mục tiêu chính:

- Không dùng đồ hoạ tĩnh nhàm chán.
- Các màn game được tạo sinh động bằng code.
- AI có thể tự tạo bối cảnh, chi tiết, vật thể, nhân vật, hiệu ứng.
- Mỗi lần bé học, thế giới có thể thay đổi nhẹ để tạo cảm giác mới.
- Có nhân vật chuyển động.
- Có cỏ cây, hoa lá, mây, suối, núi, lâu đài, cửa hàng, bếp, vũ trụ, phòng bí mật...
- Có tương tác qua lại giữa bé và thế giới game.
- Dùng Procedural Generation để tự động tạo thế giới.
- Dùng Terrain Generation để tự động tạo địa hình.
- Dùng L-System để tự động tạo cây cỏ, dây leo, hoa lá.
- Dùng AI Generative để tạo nội dung/biến thể đồ hoạ, câu chuyện, nhiệm vụ, skin, background.
- Tối ưu để chạy web app trên Vercel, không quá nặng.

---

## 2. Triết lý thiết kế đồ hoạ

Hệ thống không nên thiết kế từng màn chơi bằng tay 100%.

Thay vào đó, mỗi game mode có một bộ quy tắc tạo cảnh:

```text
Seed + Level + Chủ đề + Môn học + Kỹ năng + Tiến độ của bé
= Tự tạo ra màn chơi khác nhau
```

Ví dụ cùng một câu hỏi:

```text
3 + 2 = ?
```

Có thể xuất hiện dưới nhiều hình thức:

- Trong khu rừng: 3 quả táo + 2 quả táo.
- Trong vũ trụ: 3 ngôi sao + 2 ngôi sao.
- Trong cửa hàng: 3 viên kẹo + 2 viên kẹo.
- Trong bếp: 3 quả dâu + 2 quả chuối.
- Trong lâu đài: 3 viên ngọc + 2 viên ngọc.

Như vậy bé học cùng một kỹ năng nhưng không bị cảm giác lặp lại.

---

## 3. Kiến trúc đồ hoạ đề xuất

## 3.1. Các lớp trong game scene

Mỗi màn game nên chia thành nhiều lớp:

```text
GameScene
  ├── Background Layer
  ├── Terrain Layer
  ├── Decoration Layer
  ├── Interactive Object Layer
  ├── Character Layer
  ├── Question UI Layer
  ├── Feedback Animation Layer
  └── Reward Layer
```

### Background Layer

Chứa:

- Bầu trời.
- Mây.
- Núi xa.
- Mặt trời/mặt trăng.
- Sao.
- Gradient nền.

### Terrain Layer

Chứa:

- Đồi.
- Cỏ.
- Đất.
- Đường đi.
- Sông suối.
- Cầu.
- Nền sân khấu.
- Sàn nhà.

### Decoration Layer

Chứa:

- Cây.
- Hoa.
- Bụi cỏ.
- Đá.
- Nhà.
- Lâu đài.
- Biển chỉ đường.
- Đèn.
- Rương kho báu.

### Interactive Object Layer

Chứa các vật bé có thể chạm/kéo/thả:

- Thẻ số.
- Bong bóng.
- Viên ngọc.
- Quả táo.
- Đồng xu.
- Chìa khoá.
- Nguyên liệu nấu ăn.
- Đồ vật cần đếm.
- Cửa/cổng/rương.
- Vật phẩm nhiệm vụ.

### Character Layer

Chứa:

- Cô gia sư AI.
- Bé/avatar.
- Thú cưng.
- NPC.
- Boss dễ thương.
- Khách hàng trong cửa hàng.
- Nhân vật phụ.

### Question UI Layer

Chứa:

- Câu hỏi.
- Đáp án.
- Nút hint.
- Nút nghe lại.
- Thanh tiến độ.
- XP.
- Sao.
- Đồng hồ nếu có.

### Feedback Animation Layer

Chứa:

- Confetti.
- Sao bay.
- Ánh sáng.
- Hiệu ứng đúng/sai.
- Shake nhẹ.
- Glow.
- Sparkle.

### Reward Layer

Chứa:

- Rương quà.
- Vật phẩm mở khoá.
- Coin.
- Huy hiệu.
- Trang phục.
- Skin thú cưng.

---

## 4. Công nghệ đề xuất

## 4.1. Công nghệ frontend

```text
Next.js
TypeScript
Tailwind CSS
Framer Motion
SVG
Canvas 2D
React Spring hoặc Framer Motion
Lottie React
Zustand
```

## 4.2. Khi nào dùng SVG?

Dùng SVG cho:

- Cây.
- Hoa.
- Lá.
- Đồi.
- Đường đi.
- Icon.
- Thẻ số.
- Nhân vật đơn giản.
- Vật thể kéo thả.

Ưu điểm:

- Nhẹ.
- Scale không vỡ.
- Dễ đổi màu bằng code.
- Dễ animate.

## 4.3. Khi nào dùng Canvas?

Dùng Canvas cho:

- Terrain lớn.
- Particles.
- Sao bay.
- Bong bóng.
- Tuyết/rain/sparkle.
- Mini game có nhiều vật thể.
- Bản đồ procedural lớn.

## 4.4. Khi nào dùng Lottie?

Dùng Lottie cho:

- Nhân vật cô AI vỗ tay.
- Thú cưng nhảy.
- Rương mở.
- Boss biến hình.
- Hiệu ứng level up.
- Huy hiệu nhận thưởng.

## 4.5. Khi nào dùng AI Generative?

Dùng AI generative cho:

- Tạo nhiệm vụ mới.
- Tạo câu chuyện ngắn.
- Tạo mô tả bối cảnh.
- Tạo skin concept.
- Tạo prompt hình ảnh.
- Tạo biến thể background.
- Tạo tên vùng đất.
- Tạo lời thoại NPC.

Không nên gọi AI để tạo ảnh mỗi lần bé chơi vì tốn chi phí và chậm.

Nên dùng AI theo cách:

```text
AI tạo blueprint / prompt / cấu hình scene
Code render scene bằng SVG/Canvas
```

---

## 5. Procedural Generation là gì trong app này?

Procedural Generation là cách dùng thuật toán để tự động tạo nội dung.

Trong app này, nó dùng để tạo:

- Bản đồ.
- Địa hình.
- Cây.
- Hoa.
- Đường đi.
- Vị trí vật thể.
- Nhiệm vụ.
- Câu hỏi.
- Skin.
- Biến thể cảnh.
- Vị trí rương kho báu.
- Cấp độ boss.
- Cửa hàng.
- Phòng bí mật.

Ví dụ:

```json
{
  "seed": "child_001_level_05_day_03",
  "theme": "forest",
  "difficulty": 2,
  "skill": "addition_within_10"
}
```

Từ seed này, app tự tạo một màn chơi cố định cho ngày đó.

Nếu dùng cùng seed, màn chơi sẽ giống nhau.

Nếu đổi seed, màn chơi sẽ khác.

---

## 6. Seed system

## 6.1. Mục đích

Seed giúp app tạo thế giới ngẫu nhiên nhưng vẫn kiểm soát được.

Ví dụ:

```text
seed = child_id + level_id + game_mode + date
```

Khi đó:

- Cùng một ngày: bé thấy cùng một màn chơi.
- Ngày khác: màn chơi đổi mới.
- Phụ huynh mở lại báo cáo: vẫn tái tạo được màn chơi đã học.
- Không cần lưu toàn bộ layout, chỉ lưu seed và config.

## 6.2. Cấu trúc seed

```ts
type GameSeed = {
  childId: string;
  levelId: number;
  gameModeId: string;
  date: string;
  attemptNo: number;
};
```

## 6.3. Hàm tạo random có seed

```ts
function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }

  return function () {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h += h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}
```

---

## 7. Terrain Generation – tự động tạo địa hình

## 7.1. Mục tiêu

Tự tạo địa hình cho các game mode như:

- Math Kingdom Builder
- Math Adventure Map
- Space Rescue Math
- Puzzle Room Math
- Pet Evolution Math

## 7.2. Dạng địa hình

### Forest terrain

Dùng cho:

- Rừng đếm số.
- Thế giới thú cưng.
- Câu hỏi đếm cây/hoa/quả.

Có:

- Đồi mềm.
- Cỏ.
- Cây.
- Hoa.
- Bụi rậm.
- Đá nhỏ.
- Suối.

### Kingdom terrain

Dùng cho:

- Xây vương quốc.
- Lâu đài.
- Công trình.

Có:

- Đường đá.
- Khu đất xây nhà.
- Cầu.
- Sông.
- Vườn.
- Nền lâu đài.

### Space terrain

Dùng cho:

- Giải cứu vũ trụ.

Có:

- Hành tinh.
- Sao.
- Thiên thạch.
- Đường bay.
- Cổng không gian.

### Indoor terrain

Dùng cho:

- Cửa hàng.
- Phòng bếp.
- Puzzle Room.

Có:

- Sàn nhà.
- Tường.
- Kệ.
- Bàn.
- Cửa.
- Đồ vật tương tác.

## 7.3. Thuật toán tạo đồi 2D

Sử dụng các điểm random mượt để tạo đường cong địa hình.

```ts
type TerrainPoint = {
  x: number;
  y: number;
};

function generateHills(width: number, height: number, rand: () => number): TerrainPoint[] {
  const points: TerrainPoint[] = [];
  const segments = 8;

  for (let i = 0; i <= segments; i++) {
    const x = (width / segments) * i;
    const y = height * 0.65 + rand() * height * 0.12;
    points.push({ x, y });
  }

  return points;
}
```

Render bằng SVG path:

```ts
function createSmoothPath(points: TerrainPoint[], width: number, height: number) {
  let path = `M 0 ${height} L ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    path += ` Q ${prev.x} ${prev.y}, ${midX} ${midY}`;
  }

  const last = points[points.length - 1];
  path += ` T ${last.x} ${last.y}`;
  path += ` L ${width} ${height} Z`;

  return path;
}
```

## 7.4. Tạo nhiều layer parallax

```text
Layer 1: núi xa, di chuyển rất chậm
Layer 2: đồi xa
Layer 3: cây xa
Layer 4: nền chơi chính
Layer 5: cỏ/hoa gần camera
```

Khi bé chạm hoặc nhân vật di chuyển, các layer lệch nhẹ tạo cảm giác chiều sâu.

---

## 8. L-System – tự động tạo cây cỏ hoa lá

## 8.1. Mục tiêu

L-System dùng để tạo:

- Cây.
- Nhánh cây.
- Dây leo.
- Cỏ.
- Bụi cây.
- Hoa.
- Rong biển.
- Tia phép thuật.

Không cần vẽ tay từng cây.

## 8.2. Nguyên lý đơn giản

Một cây được tạo từ chuỗi ký tự.

Ví dụ:

```text
Axiom: F
Rule: F -> FF+[+F-F-F]-[-F+F+F]
```

Trong đó:

```text
F = vẽ một đoạn thân/cành
+ = xoay phải
- = xoay trái
[ = lưu vị trí hiện tại
] = quay lại vị trí đã lưu
```

## 8.3. Code tạo chuỗi L-System

```ts
function generateLSystem(axiom: string, rules: Record<string, string>, iterations: number) {
  let current = axiom;

  for (let i = 0; i < iterations; i++) {
    let next = "";

    for (const char of current) {
      next += rules[char] || char;
    }

    current = next;
  }

  return current;
}
```

## 8.4. Render cây bằng Canvas

```ts
type TurtleState = {
  x: number;
  y: number;
  angle: number;
};

function drawLSystemTree(
  ctx: CanvasRenderingContext2D,
  commands: string,
  startX: number,
  startY: number,
  length: number,
  angleStep: number
) {
  const stack: TurtleState[] = [];
  let state: TurtleState = {
    x: startX,
    y: startY,
    angle: -90
  };

  for (const cmd of commands) {
    if (cmd === "F") {
      const rad = (Math.PI / 180) * state.angle;
      const newX = state.x + Math.cos(rad) * length;
      const newY = state.y + Math.sin(rad) * length;

      ctx.beginPath();
      ctx.moveTo(state.x, state.y);
      ctx.lineTo(newX, newY);
      ctx.stroke();

      state.x = newX;
      state.y = newY;
    }

    if (cmd === "+") state.angle += angleStep;
    if (cmd === "-") state.angle -= angleStep;
    if (cmd === "[") stack.push({ ...state });
    if (cmd === "]") {
      const previous = stack.pop();
      if (previous) state = previous;
    }
  }
}
```

## 8.5. Biến thể cây theo level

```json
{
  "level_1_5": {
    "tree_complexity": 1,
    "flower_density": "low",
    "leaf_size": "large"
  },
  "level_6_15": {
    "tree_complexity": 2,
    "flower_density": "medium",
    "leaf_size": "medium"
  },
  "level_16_30": {
    "tree_complexity": 3,
    "flower_density": "high",
    "leaf_size": "varied"
  }
}
```

Cấp càng cao, thế giới càng sinh động.

---

## 9. Tự động tạo chi tiết thế giới

## 9.1. Decoration Generator

Dùng để đặt:

- Cây.
- Hoa.
- Đá.
- Bụi cỏ.
- Cọc biển.
- Bướm.
- Nấm.
- Rương nhỏ.
- Đèn.
- Sao.

## 9.2. Quy tắc đặt vật thể

Không đặt lung tung. Cần có luật:

```text
- Không che câu hỏi.
- Không che đáp án.
- Không đè lên nhân vật chính.
- Không đặt quá nhiều gây rối.
- Vật quan trọng phải rõ hơn vật trang trí.
- Vật tương tác phải có viền sáng nhẹ.
```

## 9.3. Code gợi ý

```ts
type Decoration = {
  id: string;
  type: "tree" | "flower" | "rock" | "bush" | "butterfly" | "mushroom";
  x: number;
  y: number;
  scale: number;
  rotation: number;
  interactive: boolean;
};

function generateDecorations(rand: () => number, count: number, width: number, height: number): Decoration[] {
  const types: Decoration["type"][] = ["tree", "flower", "rock", "bush", "butterfly", "mushroom"];

  return Array.from({ length: count }).map((_, index) => {
    const type = types[Math.floor(rand() * types.length)];

    return {
      id: `decoration_${index}`,
      type,
      x: rand() * width,
      y: height * 0.55 + rand() * height * 0.35,
      scale: 0.6 + rand() * 0.9,
      rotation: -8 + rand() * 16,
      interactive: rand() > 0.85
    };
  });
}
```

## 9.4. Tương tác với đồ trang trí

Một số đồ trang trí có thể tương tác nhẹ:

- Chạm hoa: hoa rung và phát sáng.
- Chạm bướm: bướm bay.
- Chạm cây: rơi lá.
- Chạm đá: hiện con bọ nhỏ.
- Chạm suối: gợn sóng.
- Chạm mây: mây đổi hình.

Điều này làm màn game có cảm giác sống động.

---

## 10. AI Generative Graphics – AI tạo đồ hoạ như thế nào?

## 10.1. Không nên để AI tạo ảnh liên tục

Lý do:

- Tốn chi phí.
- Chậm.
- Khó đồng bộ style.
- Khó kiểm soát an toàn.
- Dễ tạo ảnh không nhất quán.

## 10.2. Nên dùng AI theo 4 lớp

### Lớp 1: AI tạo scene blueprint

AI tạo cấu hình cảnh.

Ví dụ:

```json
{
  "theme": "magical_forest",
  "mood": "happy",
  "main_colors": ["pastel_green", "soft_yellow", "sky_blue"],
  "terrain": "rolling_hills",
  "decorations": ["flowers", "mushrooms", "small_trees"],
  "characters": ["female_ai_tutor", "pet_cat"],
  "interactive_objects": ["number_cards", "apples", "treasure_chest"]
}
```

### Lớp 2: Code render từ blueprint

Code dùng SVG/Canvas để vẽ cảnh từ blueprint.

### Lớp 3: AI tạo lời thoại và nhiệm vụ

AI tạo lời thoại:

```text
Mimi ơi, khu rừng hôm nay cần con giúp đếm những quả táo ma thuật.
Mỗi câu đúng sẽ làm cây cầu cầu vồng sáng lên đó!
```

### Lớp 4: AI tạo prompt asset khi cần

Khi cần tạo asset mới, AI tạo prompt cho designer hoặc image model.

Ví dụ:

```text
Cute 2D pastel magical forest educational game asset, small happy apple tree, rounded shapes, soft shadows, transparent background, child-friendly, no text.
```

---

## 11. Hệ thống Scene Blueprint

## 11.1. Cấu trúc scene blueprint

```ts
type SceneBlueprint = {
  id: string;
  seed: string;
  theme: SceneTheme;
  mood: "happy" | "calm" | "exciting" | "magical";
  timeOfDay: "morning" | "afternoon" | "sunset" | "night";
  terrain: TerrainConfig;
  decorations: DecorationConfig[];
  characters: CharacterConfig[];
  interactiveObjects: InteractiveObjectConfig[];
  uiStyle: UIStyleConfig;
  animationProfile: AnimationProfile;
  audioProfile: AudioProfile;
};
```

## 11.2. Theme

```ts
type SceneTheme =
  | "magical_forest"
  | "math_kingdom"
  | "pet_room"
  | "magic_shop"
  | "space_galaxy"
  | "cooking_lab"
  | "detective_room"
  | "puzzle_room"
  | "music_stage"
  | "underwater_world";
```

## 11.3. Terrain config

```ts
type TerrainConfig = {
  type: "hills" | "flat_room" | "space_orbits" | "castle_ground" | "kitchen_floor";
  complexity: 1 | 2 | 3 | 4 | 5;
  parallax: boolean;
  water?: boolean;
  path?: boolean;
  bridge?: boolean;
};
```

## 11.4. Decoration config

```ts
type DecorationConfig = {
  type: string;
  density: "low" | "medium" | "high";
  interactiveRatio: number;
  animated: boolean;
};
```

## 11.5. Interactive object config

```ts
type InteractiveObjectConfig = {
  id: string;
  objectType: "number_card" | "apple" | "coin" | "gem" | "key" | "bubble" | "ingredient";
  role: "answer" | "decoy" | "reward" | "story_object";
  positionRule: "grid" | "random_safe_area" | "path_node" | "orbit" | "shelf";
  draggable: boolean;
  tappable: boolean;
};
```

---

## 12. Nhân vật chuyển động

## 12.1. Nhân vật cần có

- Cô gia sư AI.
- Avatar của bé.
- Thú cưng.
- NPC.
- Boss.
- Khách hàng.
- Nhân vật phụ trong truyện.

## 12.2. Trạng thái nhân vật

Mỗi nhân vật có state:

```ts
type CharacterState =
  | "idle"
  | "talking"
  | "thinking"
  | "happy"
  | "encouraging"
  | "celebrating"
  | "confused"
  | "sleepy"
  | "walking"
  | "jumping";
```

## 12.3. Animation tối thiểu

### Idle animation

- Nhân vật nhún nhẹ.
- Mắt chớp.
- Tóc/váy chuyển động nhẹ.
- Thú cưng vẫy đuôi.

### Talking animation

- Miệng chuyển động.
- Tay chỉ vào câu hỏi.
- Bong bóng thoại hiện lên.

### Correct animation

- Nhân vật vỗ tay.
- Mắt sáng.
- Nhảy nhẹ.
- Sao bay quanh.

### Wrong animation

Không làm nhân vật buồn quá.

Nên dùng:

- Nhân vật suy nghĩ.
- Tay chống cằm.
- Bong bóng “mình thử lại nhé”.

### Level up animation

- Nhân vật xoay nhẹ.
- Ánh sáng từ dưới lên.
- Confetti.
- Thú cưng chạy vòng quanh.

## 12.4. Code state machine

```ts
type CharacterAnimationState = {
  characterId: string;
  currentState: CharacterState;
  emotion: "neutral" | "happy" | "proud" | "thinking" | "supportive";
  loop: boolean;
};

function setCharacterState(characterId: string, state: CharacterState) {
  // update animation state
}
```

---

## 13. Object Interaction System

## 13.1. Các loại tương tác

```text
tap
drag
drop
swipe
hold
hover
shake
connect
sort
trace
```

## 13.2. Ví dụ tương tác trong toán

### Tap

Chọn đáp án đúng.

```text
Bé chạm vào số 7.
```

### Drag and Drop

Kéo 5 quả táo vào giỏ.

```text
Bé kéo đúng số đồ vật vào target.
```

### Sort

Sắp xếp số tăng dần.

```text
Bé kéo 3, 5, 8 vào đúng thứ tự.
```

### Connect

Nối phép tính với kết quả.

```text
3 + 2 nối với 5.
```

### Trace

Tập viết số.

```text
Bé dùng tay viết số 8 theo đường chấm.
```

### Shake

Lắc nhẹ rương hoặc cây để rơi đồ vật.

```text
Chạm nhiều lần vào cây để rơi đúng số quả cần đếm.
```

## 13.3. Object schema

```ts
type GameObject = {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  draggable: boolean;
  tappable: boolean;
  correctTargetId?: string;
  value?: number | string;
  role: "question" | "answer" | "decoy" | "reward" | "decoration";
  animationState: "idle" | "hover" | "dragging" | "correct" | "wrong";
};
```

---

## 14. Tự động tạo màn chơi theo từng game mode

## 14.1. Math Kingdom Builder

### Tạo cảnh

- Terrain: đồi + đường đá + khu đất xây.
- Decoration: cây, hoa, đá, suối.
- Interactive objects: gạch, gỗ, pha lê.
- Character: cô AI + thú cưng + thợ xây nhỏ.

### Procedural rules

```json
{
  "terrain": "rolling_hills",
  "building_slots": 3,
  "material_types": ["brick", "wood", "crystal"],
  "decoration_density": "medium",
  "unlock_next_building_after": 5
}
```

### Tương tác

- Mỗi câu đúng nhận vật liệu.
- Bé kéo vật liệu vào công trình.
- Công trình tăng progress.
- Khi đủ progress, công trình hoàn thiện.

---

## 14.2. Pet Evolution Math

### Tạo cảnh

- Terrain: phòng thú cưng.
- Decoration: giường, thảm, đồ chơi, cây nhỏ, cửa sổ.
- Interactive objects: thức ăn, đồ chơi, bát ăn.
- Character: thú cưng chính.

### Procedural rules

```json
{
  "room_theme": "pastel_pet_room",
  "pet_stage": "baby",
  "toy_count": 3,
  "food_items": ["fish_cookie", "apple", "milk"],
  "interactive_ratio": 0.4
}
```

### Tương tác

- Câu đúng nhận đồ ăn.
- Kéo đồ ăn cho thú cưng.
- Thú cưng tăng care point.
- Đủ điểm thì tiến hoá.

---

## 14.3. Math Adventure Map

### Tạo cảnh

- Terrain: bản đồ lớn.
- Decoration: rừng, núi, sông, cầu, lâu đài.
- Interactive objects: node level, rương, NPC.
- Character: avatar bé đi trên bản đồ.

### Procedural rules

```json
{
  "map_type": "node_path",
  "node_count": 10,
  "side_quest_ratio": 0.25,
  "hidden_chest_ratio": 0.15,
  "biomes": ["forest", "river", "castle"]
}
```

### Tương tác

- Bé chạm node để vào bài.
- Hoàn thành node thì mở đường.
- Rương ẩn hiện khi bé đạt 3 sao.

---

## 14.4. Magic Shop Math

### Tạo cảnh

- Terrain: cửa hàng.
- Decoration: kệ hàng, quầy, đèn, biển hiệu.
- Interactive objects: hàng hoá, đồng xu, túi quà.
- Character: khách hàng, cô AI.

### Procedural rules

```json
{
  "shop_theme": "magic_candy_shop",
  "shelf_count": 3,
  "customer_count": 1,
  "item_categories": ["candy", "gem", "toy", "potion"],
  "price_range": [1, 20]
}
```

### Tương tác

- Khách yêu cầu mua đồ.
- Bé kéo đúng số lượng hàng.
- Bé chọn/kéo tiền đúng.
- Giao hàng để hoàn thành.

---

## 14.5. Detective Math Mystery

### Tạo cảnh

- Terrain: phòng thám tử.
- Decoration: bảng manh mối, kính lúp, phong bì.
- Interactive objects: clue card, suspect card, lock.
- Character: thám tử nhí, NPC.

### Procedural rules

```json
{
  "mystery_type": "missing_cookie",
  "clue_count": 5,
  "suspect_count": 3,
  "math_clue_ratio": 1.0,
  "final_deduction_required": true
}
```

### Tương tác

- Giải câu toán để mở manh mối.
- Kéo manh mối lên bảng.
- Chọn nghi phạm đúng theo dữ kiện.

---

## 14.6. Rhythm Math Dance

### Tạo cảnh

- Terrain: sân khấu.
- Decoration: đèn, loa, sao, sàn nhảy.
- Interactive objects: bong bóng đáp án theo nhịp.
- Character: bé, thú cưng, cô AI.

### Procedural rules

```json
{
  "beat_speed": "slow",
  "answer_bubble_count": 4,
  "combo_enabled": true,
  "max_combo_bonus": 5,
  "wrong_slows_music": true
}
```

### Tương tác

- Bong bóng đáp án bay lên theo nhịp.
- Bé chọn đáp án đúng.
- Combo tăng nếu đúng liên tiếp.
- Sai thì nhạc chậm lại để bé dễ làm hơn.

---

## 14.7. Math Cooking Lab

### Tạo cảnh

- Terrain: bếp.
- Decoration: bàn bếp, nồi, kệ nguyên liệu.
- Interactive objects: dâu, chuối, sữa, bánh, kẹo.
- Character: đầu bếp AI, thú cưng khách hàng.

### Procedural rules

```json
{
  "recipe_type": "rainbow_cake",
  "ingredient_count": 3,
  "calculation_type": "addition_or_subtraction",
  "drag_to_pot": true,
  "decorate_after_success": true
}
```

### Tương tác

- Bé kéo đúng số nguyên liệu vào nồi.
- Bấm nấu.
- Nếu đúng, món ăn hiện ra.
- Bé trang trí món ăn bằng phần thưởng.

---

## 14.8. Space Rescue Math

### Tạo cảnh

- Terrain: không gian.
- Decoration: hành tinh, sao, thiên thạch.
- Interactive objects: pin năng lượng, cổng sao, hành tinh.
- Character: phi hành gia nhí, robot AI.

### Procedural rules

```json
{
  "galaxy_seed": "child_day_level",
  "planet_count": 5,
  "orbit_paths": true,
  "energy_required": 10,
  "asteroid_decoys": true
}
```

### Tương tác

- Bé giải toán để nạp năng lượng.
- Kéo pin vào tàu.
- Chọn hành tinh tiếp theo.
- Mở cổng sao khi đủ năng lượng.

---

## 14.9. Puzzle Room Math

### Tạo cảnh

- Terrain: phòng bí mật.
- Decoration: cửa, tranh, đồng hồ, kệ sách.
- Interactive objects: hộp khóa, chìa khóa, mã số.
- Character: cô AI hướng dẫn.

### Procedural rules

```json
{
  "room_type": "cozy_mystery_room",
  "puzzle_count": 5,
  "lock_type": "number_code",
  "object_highlight": true,
  "escape_after_all_puzzles": true
}
```

### Tương tác

- Bé chạm đồ vật phát sáng.
- Giải toán để lấy mã.
- Nhập mã mở khóa.
- Kéo chìa khóa vào cửa.

---

## 14.10. AI Co-op Boss Battle

### Tạo cảnh

- Terrain: đấu trường dễ thương.
- Decoration: cờ, sao, bục, rương.
- Interactive objects: thẻ kỹ năng, câu hỏi, tim boss.
- Character: bé, cô AI, boss.

### Procedural rules

```json
{
  "boss_type": "lazy_dragon",
  "boss_hp": 100,
  "skills": ["counting", "addition", "subtraction"],
  "ai_support_enabled": true,
  "recent_mistake_questions_ratio": 0.5
}
```

### Tương tác

- Bé chọn kỹ năng.
- Trả lời câu hỏi.
- Cô AI hỗ trợ hint.
- Mỗi câu đúng gây damage.
- Sửa lỗi sai cũng gây damage nhỏ.

---

## 15. Hệ thống biến đổi cảnh để tránh nhàm chán

## 15.1. Daily visual variation

Mỗi ngày đổi nhẹ:

- Màu trời.
- Vị trí mây.
- Loại hoa.
- Đồ trang trí.
- NPC.
- Câu thoại.
- Vật phẩm thưởng.

## 15.2. Seasonal theme

Có thể đổi theo mùa:

- Xuân: hoa, bướm, trời sáng.
- Hè: biển, kem, mặt trời.
- Thu: lá vàng, bí ngô dễ thương.
- Đông: tuyết, khăn len, lò sưởi.
- Sinh nhật bé: bóng bay, bánh kem.
- Tết: hoa đào, lì xì, đèn lồng.

## 15.3. Mood-based theme

Nếu bé làm tốt:

- Cảnh sáng hơn.
- Nhiều hoa hơn.
- Nhạc vui hơn.

Nếu bé sai nhiều:

- Cảnh bình tĩnh hơn.
- Màu dịu hơn.
- Nhạc chậm hơn.
- AI nói nhẹ nhàng hơn.

## 15.4. Progress-based world evolution

Thế giới tiến hoá theo tiến bộ:

```text
Tuần 1: khu vườn nhỏ
Tuần 2: có nhà thú cưng
Tuần 3: có cầu
Tuần 4: mở lâu đài
Tháng 2: mở bản đồ vùng mới
```

---

## 16. AI tạo nhiệm vụ và thế giới

## 16.1. Prompt tạo scene blueprint

```text
Bạn là game designer cho app học Toán lớp 1.

Hãy tạo scene blueprint cho một màn chơi toán.

Thông tin:
- Tên bé: {{child_name}}
- Level: {{level}}
- Kỹ năng: {{skill}}
- Game mode: {{game_mode}}
- Sở thích của bé: {{interests}}
- Lỗi sai gần đây: {{recent_mistakes}}
- Tâm trạng học tập: {{learning_mood}}

Yêu cầu:
- Scene phải vui, an toàn, không đáng sợ.
- Có nhân vật cô gia sư AI.
- Có thú cưng đồng hành.
- Có đồ vật tương tác phục vụ câu hỏi.
- Có cỏ cây hoa lá hoặc chi tiết nền sinh động nếu phù hợp.
- Không được quá rối.
- Ưu tiên màu pastel.
- Trả về JSON blueprint, không trả về văn bản dài.
```

## 16.2. Output mong muốn

```json
{
  "theme": "magical_forest",
  "mood": "happy",
  "timeOfDay": "morning",
  "terrain": {
    "type": "hills",
    "complexity": 2,
    "parallax": true,
    "water": true,
    "path": true
  },
  "decorations": [
    {
      "type": "flower",
      "density": "medium",
      "interactiveRatio": 0.2,
      "animated": true
    },
    {
      "type": "tree",
      "density": "low",
      "interactiveRatio": 0.1,
      "animated": true
    }
  ],
  "characters": [
    {
      "type": "ai_tutor",
      "state": "encouraging",
      "position": "left"
    },
    {
      "type": "pet",
      "state": "idle",
      "position": "bottom_right"
    }
  ],
  "interactiveObjects": [
    {
      "objectType": "apple",
      "role": "question_object",
      "count": 7,
      "draggable": false,
      "tappable": true
    },
    {
      "objectType": "number_card",
      "role": "answer",
      "values": [5, 6, 7, 8],
      "draggable": false,
      "tappable": true
    }
  ]
}
```

---

## 17. Render pipeline

## 17.1. Quy trình render

```text
1. Load question spec
2. Load child profile
3. Tạo seed
4. Generate scene blueprint
5. Generate terrain
6. Generate decorations
7. Generate interactive objects
8. Render characters
9. Render question UI
10. Listen user interaction
11. Check answer
12. Trigger animation/sound
13. Save attempt
14. Update world progress
```

## 17.2. Pseudocode

```ts
async function renderGameQuestion({
  childId,
  levelId,
  gameModeId,
  questionSpec
}) {
  const childProfile = await getChildProfile(childId);
  const seed = createGameSeed(childId, levelId, gameModeId);
  const rand = seededRandom(seed);

  const blueprint = await createSceneBlueprint({
    childProfile,
    levelId,
    gameModeId,
    questionSpec,
    seed
  });

  const terrain = generateTerrain(blueprint.terrain, rand);
  const decorations = generateDecorationsFromBlueprint(blueprint.decorations, rand);
  const objects = generateInteractiveObjects(questionSpec, blueprint, rand);
  const characters = generateCharacters(blueprint.characters, rand);

  return {
    blueprint,
    terrain,
    decorations,
    objects,
    characters
  };
}
```

---

## 18. Tối ưu hiệu năng trên Vercel/Web

## 18.1. Không nên làm quá nặng

Vì app chạy web, không nên tạo game 3D nặng.

Ưu tiên:

- 2D SVG.
- Canvas nhẹ.
- Lottie ngắn.
- Sprite sheet nhỏ.
- Procedural bằng code.
- Cache scene blueprint.

## 18.2. Giới hạn đề xuất

```text
Mỗi scene:
- Dưới 80 decorative objects.
- Dưới 20 interactive objects.
- Dưới 5 nhân vật động.
- Dưới 3 Lottie chạy cùng lúc.
- Dưới 200 particles cùng lúc.
```

## 18.3. Lazy loading

Chỉ load asset khi cần:

```text
- Game mode nào mở thì load asset mode đó.
- Animation reward load sau khi trả lời đúng.
- Background layer load trước, detail load sau.
```

## 18.4. Cache

Cache:

- Scene blueprint.
- Generated terrain.
- Seed result.
- AI dialogue.
- Generated story.
- Asset prompt.

---

## 19. Database bổ sung

## 19.1. procedural_scenes

```sql
create table procedural_scenes (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null,
  level_id int not null,
  game_mode_id text not null,
  question_id text,
  seed text not null,
  blueprint jsonb not null,
  created_at timestamp with time zone default now()
);
```

## 19.2. world_progress

```sql
create table world_progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null,
  world_id text not null,
  unlocked_areas jsonb default '[]'::jsonb,
  unlocked_decorations jsonb default '[]'::jsonb,
  buildings jsonb default '{}'::jsonb,
  pet_state jsonb default '{}'::jsonb,
  inventory jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default now()
);
```

## 19.3. generated_assets

```sql
create table generated_assets (
  id uuid primary key default gen_random_uuid(),
  asset_type text not null,
  theme text not null,
  prompt text not null,
  asset_url text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);
```

---

## 20. JSON config cho game mode

```json
{
  "game_mode_id": "math_kingdom_builder",
  "graphics_generation": {
    "method": "procedural_code_plus_ai_blueprint",
    "terrain_generation": true,
    "l_system_details": true,
    "ai_generated_scene_blueprint": true,
    "ai_generated_dialogue": true,
    "ai_generated_asset_prompts": true
  },
  "world": {
    "theme_pool": [
      "magical_forest",
      "math_kingdom",
      "rainbow_valley"
    ],
    "daily_variation": true,
    "seasonal_variation": true,
    "progress_based_evolution": true
  },
  "characters": {
    "ai_tutor": {
      "animated": true,
      "states": [
        "idle",
        "talking",
        "thinking",
        "happy",
        "celebrating"
      ]
    },
    "pet": {
      "animated": true,
      "evolves": true,
      "interactive": true
    }
  },
  "decorations": {
    "terrain": "rolling_hills",
    "trees": "l_system",
    "flowers": "procedural_scatter",
    "grass": "procedural_scatter",
    "clouds": "procedural_svg",
    "water": "animated_svg_or_canvas"
  },
  "performance": {
    "max_decorations": 80,
    "max_particles": 200,
    "max_lottie_animations": 3
  }
}
```

---

## 21. Prompt tổng cho Antigravity

```text
Hãy bổ sung hệ thống đồ hoạ procedural generation cho app học Toán lớp 1.

Yêu cầu chính:
1. Các màn game không dùng background tĩnh hoàn toàn.
2. Mỗi màn game được tạo bằng code dựa trên seed, level, game mode, skill và child profile.
3. Dùng Procedural Generation để tạo cảnh, vị trí vật thể, đồ trang trí, nhiệm vụ phụ.
4. Dùng Terrain Generation để tạo đồi, đường đi, sông, nền, hành tinh, phòng, sân khấu tuỳ game mode.
5. Dùng L-System để tạo cây, nhánh cây, dây leo, bụi cỏ, hoa lá.
6. Dùng AI Generative để tạo scene blueprint, lời thoại, nhiệm vụ, prompt asset, biến thể bối cảnh.
7. Code render bằng SVG/Canvas/Framer Motion/Lottie.
8. Có nhân vật cô gia sư AI chuyển động.
9. Có thú cưng chuyển động và tương tác.
10. Có cỏ cây, hoa lá, mây, suối, núi, rương, vật thể động.
11. Có tương tác phụ: chạm hoa hoa rung, chạm cây lá rơi, chạm bướm bướm bay, chạm suối tạo gợn sóng.
12. Đồ hoạ phải vui nhộn, dễ thương, màu pastel, phù hợp trẻ lớp 1.
13. Không tạo hiệu ứng đáng sợ khi bé sai.
14. Tối ưu hiệu năng để chạy tốt trên web/Vercel.
15. Tất cả scene phải lưu seed và blueprint để tái tạo lại được.
16. Dữ liệu gắn với child_id, parent_uid, level_id, game_mode_id.
17. Thiết kế module có thể tái sử dụng cho Tiếng Anh và Tiếng Việt sau này.

Hãy tạo:
- folder structure
- TypeScript types
- scene generator
- terrain generator
- L-system tree generator
- decoration generator
- character animation state machine
- interaction system
- render pipeline
- sample components
- sample JSON scene blueprint
- Supabase tables
- caching strategy
- performance limits
```

---

## 22. Folder structure đề xuất

```text
/lib/game-generation
  /seed
    createGameSeed.ts
    seededRandom.ts
  /scene
    createSceneBlueprint.ts
    sceneTypes.ts
  /terrain
    generateHills.ts
    generateSpaceOrbits.ts
    generateIndoorRoom.ts
    renderTerrainSvg.ts
  /l-system
    generateLSystem.ts
    drawLSystemTree.ts
    treePresets.ts
  /decorations
    generateDecorations.ts
    decorationRules.ts
    renderDecoration.tsx
  /characters
    characterStates.ts
    characterAnimationMachine.ts
    renderAITutor.tsx
    renderPet.tsx
  /objects
    generateInteractiveObjects.ts
    objectTypes.ts
    checkObjectInteraction.ts
  /particles
    confetti.ts
    stars.ts
    leaves.ts
    waterRipples.ts
  /audio
    playGameSound.ts
    soundMap.ts

/components/game-scene
  GameScene.tsx
  BackgroundLayer.tsx
  TerrainLayer.tsx
  DecorationLayer.tsx
  InteractiveObjectLayer.tsx
  CharacterLayer.tsx
  QuestionUILayer.tsx
  FeedbackLayer.tsx
  RewardLayer.tsx

/components/game-modes
  MathKingdomBuilder.tsx
  PetEvolutionMath.tsx
  MathAdventureMap.tsx
  MagicShopMath.tsx
  DetectiveMathMystery.tsx
  RhythmMathDance.tsx
  MathCookingLab.tsx
  SpaceRescueMath.tsx
  PuzzleRoomMath.tsx
  AICoopBossBattle.tsx
```

---

## 23. Kết luận

Phần đồ hoạ của app không nên chỉ là hình minh hoạ tĩnh.

Hệ thống nên trở thành một **thế giới học tập tự sinh**, trong đó:

- AI tạo ý tưởng cảnh.
- Code tạo địa hình.
- L-System tạo cây cỏ hoa lá.
- Procedural Generation tạo vật thể, nhiệm vụ, chi tiết.
- Nhân vật có animation.
- Bé có thể tương tác với thế giới.
- Mỗi ngày học là một trải nghiệm mới.
- Mỗi level mở thêm thế giới mới.
- Mỗi lỗi sai trở thành nhiệm vụ để sửa.
- Mỗi tiến bộ của bé làm thế giới đẹp hơn.

Mục tiêu cuối cùng:

```text
Con không cảm thấy đang làm bài tập.
Con cảm thấy mình đang sống trong một thế giới học tập vui nhộn,
nơi mỗi câu Toán đúng làm thế giới trở nên đẹp hơn.
```
