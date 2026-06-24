# TÀI LIỆU YÊU CẦU SẢN PHẨM (PRD v4.0) - CHUYÊN BIỆT
## PHÂN HỆ ĐỒ HỌA AI & PROCEDURAL GENERATION (TRÒ CHƠI CHỦ ĐỀ TỰ SINH)
### DỰ ÁN HỆ THỐNG GIA SƯ CÁ NHÂN HÓA - "HỌC CÙNG AN NHIÊN"

---

## CHƯƠNG I: TẦM NHÌN, MỤC TIÊU & TRIẾT LÝ THIẾT KẾ ĐỒ HỌA

### 1.1. Bối cảnh và Tầm nhìn Đồ họa Tự sinh
Phân hệ Đồ họa AI và Sinh nội dung tự động (Procedural Generation) giải quyết triệt để điểm hạn chế của các trò chơi giáo dục truyền thống - nơi đồ họa tĩnh bị lặp đi lặp lại khiến trẻ em (đặc biệt là độ tuổi 6 tuổi như bé An Nhiên) nhanh chóng cảm thấy nhàm chán [155, 186]. 

Tầm nhìn của hệ thống là biến mỗi phiên học toán, tiếng Anh, hay tiếng Việt thành một trải nghiệm thị giác tươi mới [155, 185, 186]. Màn chơi được sinh tự động thông qua thuật toán, trong đó cỏ cây, hoa lá, đồi núi, sông suối, mây trời và thậm chí cả các nhân vật chuyển động, bối cảnh đều tự tái cấu trúc dựa trên **Seed** và **Sở thích** của bé [155, 156, 160].

### 1.2. Mục tiêu Kỹ thuật & Trải nghiệm Người dùng
* **Không dùng đồ họa tĩnh 100%:** Tránh việc tải trước các tệp hình ảnh PNG/JPG có dung lượng lớn gây quá tải đường truyền [155, 182]. Thế giới game được vẽ trực tiếp bằng code thông qua cấu trúc SVG và Canvas 2D [155, 159, 160].
* **Thế giới tự động biến đổi:** Mỗi lần bé đăng nhập học tập, màu sắc bầu trời, độ mượt của địa hình đồi núi, hình dáng các nhánh cây và vị trí các rương kho báu sẽ biến đổi nhẹ [155, 162, 180].
* **Tăng tính tương tác sinh động:** Mọi đồ vật trang trí (đám mây, bụi cỏ, bông hoa, bướm bay) đều phản hồi vật lý khi trẻ chạm vào (rung nhẹ, phát sáng, tạo gợn sóng) [168].
* **Tối ưu hóa tài nguyên:** Thiết lập bộ render pipeline cực nhẹ chạy trực tiếp tại Edge (Client-side) thông qua Next.js và Tailwind CSS, dễ dàng deploy trên nền tảng Vercel [155, 159, 182].

### 1.3. Triết lý Thiết kế: Công thức Kiến tạo Cảnh (Scene Formula)
Hệ thống đồ họa không xây dựng thủ công các level. Tất cả các cảnh game được tạo dựng theo nguyên tắc:
$$\text{Cảnh Game (Scene)} = f(\text{Seed}, \text{Level}, \text{Chủ đề}, \text{Môn học}, \text{Tiến trình})$$ [156]

Cùng một câu hỏi toán học số đơn giản (Ví dụ: $3 + 2 = ?$) sẽ tự động khoác lên mình các lớp đồ họa phù hợp theo bối cảnh [156]:
* **Trong Khu rừng Phép thuật:** Bé đếm $3 \text{ quả táo} + 2 \text{ quả táo}$ rơi trên thảm cỏ [156, 170].
* **Trong Dải Ngân hà:** Bé đếm $3 \text{ hành tinh} + 2 \text{ phi thuyền}$ bay trên nền trời sao [156, 170].
* **Trong Cửa hàng Kẹo:** Bé đếm $3 \text{ cây kẹo mút} + 2 \text{ chiếc bánh quy}$ trên kệ gỗ [156, 170].
* **Trong Căn bếp nhỏ:** Bé đếm $3 \text{ quả dâu tây} + 2 \text{ lát chuối}$ trong nồi súp [156, 170].
* **Trong Lâu đài Hoàng gia:** Bé đếm $3 \text{ viên ngọc hồng} + 2 \text{ chiếc vương miện}$ lấp lánh [156, 170].

---

## CHƯƠNG II: KIẾN TRÚC ĐỒ HỌA ĐA LỚP (MULTI-LAYERED GAME SCENE)

Mỗi màn game được chia thành **8 lớp cấu trúc (Layers)** xếp chồng lên nhau theo thứ tự chỉ số trục $Z$ (`z-index`) từ xa đến gần để tạo cảm giác chiều sâu không gian 2.5D (Parallax Effect) [157, 165]:

```
[Mắt người xem]
       │
       ▼  (z-index: 800) [Layer 8: Reward Layer] - Rương báu, sao bay lấp lánh
       ▼  (z-index: 700) [Layer 7: Feedback Animation Layer] - Confetti, pháo hoa nổ
       ▼  (z-index: 600) [Layer 6: Question UI Layer] - Thanh tiến độ, câu hỏi, nút hint
       ▼  (z-index: 500) [Layer 5: Character Layer] - Cô AI, thú cưng Lottie, boss rồng
       ▼  (z-index: 400) [Layer 4: Interactive Object Layer] - Bong bóng, thẻ kéo thả, quả táo
       ▼  (z-index: 300) [Layer 3: Decoration Layer] - Cây L-System, bụi hoa, biển chỉ đường
       ▼  (z-index: 200) [Layer 2: Terrain Layer] - Đồi núi SVG Parallax, sông nước, đường đi
       ▼  (z-index: 100) [Layer 1: Background Layer] - Bầu trời, mây trôi tự do, dải ngân hà
``` [157, 158, 159]

### 2.1. Chi tiết Nhiệm vụ và Tương tác của từng Lớp (Layers)

1. **Background Layer (z-index: 100):**
   * *Nội dung:* Vẽ màu nền Gradient chuyển sắc mượt mà (ví dụ: bình minh hồng, đêm xanh tím) [157].
   * *Thành phần sinh động:* Các đám mây trôi lơ lửng, mặt trăng nhấp nháy, các ngôi sao lấp lánh vẽ bằng SVG hoặc Canvas hạt mịn [157].
2. **Terrain Layer (z-index: 200):**
   * *Nội dung:* Các dải đồi nhấp nhô mượt mà, bãi cỏ xanh, sàn nhà lát gạch, sông suối chuyển động nhẹ [157].
   * *Hiệu ứng Parallax:* Khi màn chơi di chuyển, lớp đồi gần di chuyển nhanh hơn lớp đồi xa để tạo ảo ảnh thị giác 3D [165].
3. **Decoration Layer (z-index: 300):**
   * *Nội dung:* Cây cối tự sinh (L-System), hoa lá, nấm rơm lấp lánh, biển hiệu, đá cuội nhẵn bóng [158, 166].
   * *Tương tác phụ:* Chạm vào hoa thì hoa rung rinh nở rộng, chạm vào đá thì con bọ nhỏ bò ra [168].
4. **Interactive Object Layer (z-index: 400):**
   * *Nội dung:* Chứa các vật thể chính phục vụ bài học (quả táo để đếm, bong bóng để bấm vỡ, các thẻ số có bóng đổ nổi) [158].
   * *Trạng thái:* Phải có viền phát sáng (Glow border) nhẹ để báo hiệu bé có thể tương tác cầm kéo thả được [167].
5. **Character Layer (z-index: 500):**
   * *Nội dung:* Nhân vật cô giáo AI, avatar của bé, chú mèo cưng ảo đang vẫy đuôi, bạn Boss dễ thương chặn đường [158].
   * *Kiến nghệ:* Nhập tệp Lottie JSON để có chuyển động mượt mà (nháy mắt, nhún chân, giơ tay chào) [160, 171].
6. **Question UI Layer (z-index: 600):**
   * *Nội dung:* Khung câu hỏi bo tròn pastel, thanh tiến độ học tập (Progress bar), nút **"Cô ơi gợi ý!"** hình bóng đèn [159].
   * *Thiết kế:* Cố định ở góc trên màn hình, không bị che khuất bởi bất kỳ vật thể trang trí nào [167].
7. **Feedback Animation Layer (z-index: 700):**
   * *Nội dung:* Confetti đa sắc bay khi trả lời đúng, vòng tròn gợn sóng màu xanh khi đúng, rung nhẹ màn hình khi sai [159].
8. **Reward Layer (z-index: 800):**
   * *Nội dung:* Rương kho báu vàng lấp lánh tự động bật nắp, các ngôi sao vàng phóng to bay thẳng vào góc tài khoản của bé [159, 206].

---

## CHƯƠNG III: CÔNG NGHỆ & QUY CHUẨN RENDER ĐỒ HỌA TRÊN WEB

Để ứng dụng đạt tốc độ phản hồi nhanh tức thì trên các thiết bị iPad và Điện thoại thông minh cũ của gia đình [155, 188], Kỹ sư lập trình AI cần áp dụng các công nghệ kết xuất (render) phân cấp rõ ràng sau [159]:

### 3.1. Ma trận Phân bổ Công nghệ Kết xuất Đồ họa

| Công nghệ | Thành phần áp dụng | Lý do sử dụng & Quy chuẩn kỹ thuật |
| :--- | :--- | :--- |
| **SVG (Scalable Vector Graphics)** | Đồi núi, thân cây, cánh hoa, vương miện, thẻ số kéo thả, mây [160] | Cực kỳ nhẹ (chỉ vài dòng code XML), không bao giờ bị vỡ nét trên iPad Retina, dễ dàng đổi màu sắc (`stroke`, `fill`) thông qua trạng thái CSS [160]. |
| **HTML5 Canvas 2D** | Hệ thống bong bóng bay, tuyết/sao rơi, hiệu ứng hạt sao bay lấp lánh [160] | Tối ưu hóa hiệu năng khi hiển thị hơn 100 vật thể chuyển động liên tục, không gây hiện tượng giật lag (garbage collection) của DOM [160, 182]. |
| **Lottie Animations (JSON)** | Các trạng thái chuyển động của cô giáo AI, thú cưng, rương báu mở nắp [160] | Chuyển động vector mượt mà chuẩn 60fps từ After Effects xuất ra JSON, nhẹ hơn 95% so với việc sử dụng video MP4 hoặc tệp ảnh động GIF [160]. |
| **CSS3 & Framer Motion** | Các hiệu ứng chuyển trạng thái trang, lật thẻ từ vựng 3D, mở pop-up [159, 206] | Tận dụng tối đa tăng tốc phần cứng GPU của thiết bị để xử lý hiệu ứng lật, trượt mượt mà [206]. |

### 3.2. Giới hạn Phần cứng & Tải lượng (Performance Guardrails)
Để ứng dụng không bị crash trên trình duyệt Web mobile, Agent tự động lập trình bắt buộc phải tuân thủ các điều kiện biên sau [182]:
* **Số lượng Decorative Objects (Đồ trang trí):** Tối đa **80 vật thể** trên một màn chơi [182].
* **Số lượng Interactive Objects (Vật thể tương tác):** Tối đa **20 vật thể** có gắn bộ lắng nghe sự kiện (`EventListener`) [182].
* **Nhân vật chuyển động động:** Tối đa **5 nhân vật** xuất hiện đồng thời [182].
* **Hiệu ứng Lottie chạy đồng thời:** Tối đa **3 tệp Lottie** render cùng lúc [182].
* **Hệ thống hạt Canvas (Particles):** Giới hạn tối đa **200 hạt** hoạt động đồng thời, tự hủy sau 1.5 giây [182].

---

## CHƯƠNG IV: HỆ THỐNG SEED & THUẬT TOÁN TẠO CẢNH NGẪU NHIÊN

Hệ thống sử dụng cơ chế sinh số ngẫu nhiên có thiết lập **Seed** đầu vào nhằm bảo đảm:
1. Trẻ chơi lại một màn chơi trong ngày sẽ gặp đúng bố cục cảnh cũ (đảm bảo tính nhất quán học tập) [162, 163].
2. Phụ huynh mở lại lịch sử học tập của con vẫn tái hiện nguyên vẹn bối cảnh bé đã làm sai để hỗ trợ giảng giải [163].
3. Tiết kiệm bộ lưu trữ của Database: không cần lưu trữ layout tọa độ của 100 vật thể, chỉ cần lưu chuỗi seed dài 32 ký tự [163].

### 4.1. Cấu trúc Chuỗi Seed chuẩn hệ thống (GameSeed Type)
Chuỗi seed được tự động sinh theo công thức:
`seed = child_id + "_" + subject_code + "_" + level_id + "_" + game_mode + "_" + current_date` [162]

```typescript
type GameSeed = {
  childId: string;       // ID hồ sơ bé An Nhiên
  subject: "math" | "english" | "vietnamese";
  levelId: number;       // Từ 1 đến 30
  gameMode: string;      // Ví dụ: "tap_choice", "drag_drop"
  dateStr: string;       // Định dạng YYYY-MM-DD
};
``` [162]

### 4.2. Thuật toán sinh số ngẫu nhiên Mulberry32 (Seeded Random Helper)
Kỹ sư AI bắt buộc phải cài đặt trình sinh số ngẫu nhiên có Seed dưới đây để thay thế hoàn toàn cho hàm `Math.random()` nguyên bản của Javascript (vốn không hỗ trợ Seed):

```typescript
// Trình sinh số ngẫu nhiên Mulberry32 nhận chuỗi seed đầu vào
export function createSeededRandom(seedStr: string) {
  // Băm chuỗi seed ký tự thành một số nguyên 32-bit
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  
  let seed = ((h ^ (h >>> 16)) >>> 0);

  // Trả về hàm sinh số ngẫu nhiên trong khoảng [0, 1)
  return function() {
    seed |= 0; 
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
``` [163]

---

## CHƯƠNG V: THUẬT TOÁN SINH ĐỊA HÌNH VÀ CỎ CÂY TỰ ĐỘNG

### 5.1. Thuật toán vẽ Đường cong Địa hình Đồi núi (Terrain Generator - SVG Path)
Để tự động tạo ra những đường cong đồi cỏ mềm mại lặp lại lơ lửng ở chân trời, hệ thống sử dụng thuật toán nối điểm ngẫu nhiên qua đường cong Bezier Cubic, xuất ra một chuỗi thuộc tính `d` của thẻ `<path>` trong SVG [165]:

```typescript
type TerrainPoint = {
  x: number;
  y: number;
};

// Tạo mảng điểm đồi núi nhấp nhô mượt mà
export function generateHillPoints(
  width: number, 
  baseHeight: number, 
  amplitude: number, 
  segments: number, 
  randomFn: () => number
): TerrainPoint[] {
  const points: TerrainPoint[] = [];
  const segmentWidth = width / segments;
  
  for (let i = 0; i <= segments; i++) {
    const x = i * segmentWidth;
    // Sử dụng hàm sin kết hợp random có hệ số để tạo nhấp nhô tự nhiên
    const y = baseHeight + Math.sin(i * 0.5) * amplitude * 0.3 + (randomFn() - 0.5) * amplitude;
    points.push({ x, y });
  }
  return points;
}

// Chuyển mảng điểm thành mã vẽ SVG Path mượt mà
export function createSmoothPath(points: TerrainPoint[], width: number, height: number): string {
  if (points.length === 0) return "";
  
  let d = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    
    // Tìm điểm điều khiển (Control Points) để tạo đường cong Bezier mượt
    const cpX1 = p0.x + (p1.x - p0.x) / 2;
    const cpY1 = p0.y;
    const cpX2 = pnt.x;
    const cpY2 = p1.y;
    
    // Ghi chú: Sử dụng đường cong Cubic Bezier (C) để vẽ nối
    d += ` C ${cpX1} ${cp_y1_placeholder_logic}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }
  
  // Đóng kín khung SVG xuống đáy để tạo mảng tô màu
  d += ` L ${width} ${height} L 0 ${height} Z`;
  return d;
}
``` [165]

### 5.2. Thuật toán trồng Cây phép thuật (L-System & Turtle Graphics Canvas)
Cây cối ở cảnh nền trò chơi của bé An Nhiên không phải là các file ảnh tải sẵn giống nhau, mà được vẽ thời gian thực bằng hệ thống ngữ pháp fractal **L-System** (Lindenmayer System) [166]. Mỗi lần bé tải game, một cái cây với hình thù tán lá độc nhất vô nhị sẽ tự lớn lên đầy màu sắc [155, 166]:

* **Cấu hình hệ thống L-System:**
  * **Axiom (Chuỗi gốc):** `X` [166]
  * **Bộ quy tắc biến đổi (Rules):** `X -> F-[[X]+X]+F[+FX]-X` , `F -> FF` [166]
  * **Góc quay (Angle):** $25^{\circ}$
  * **Ký tự biên dịch:**
    * `F`: Vẽ một đoạn thẳng hướng về phía trước (Thân/Cành cây) [166].
    * `-`: Xoay rùa vẽ sang trái một góc $25^{\circ}$ [166].
    * `+`: Xoay rùa vẽ sang phải một góc $25^{\circ}$ [166].
    * `[`: Đẩy trạng thái tọa độ và góc quay hiện tại vào ngăn xếp (Stack) [166].
    * `]`: Lấy trạng thái tọa độ từ ngăn xếp ra để quay lại nhánh vẽ cũ [166].

```typescript
// Bộ sinh chuỗi ký tự L-System qua số vòng lặp (iterations)
export function generateLSystemString(axiom: string, rules: Record<string, string>, iterations: number): string {
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

// Trình biên dịch vẽ cây từ chuỗi ký tự lên HTML5 Canvas 2D
export function drawMagicTree(
  ctx: CanvasRenderingContext2D, 
  axiomString: string, 
  startX: number, 
  startY: number, 
  branchLength: number,
  themeColor: string
) {
  const stack: { x: number; y: number; angle: number }[] = [];
  let x = startX;
  let y = startY;
  let angle = -Math.PI / 2; // Hướng thẳng đứng lên trời
  
  ctx.strokeStyle = themeColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  for (const char of axiomString) {
    if (char === "F") {
      const nextX = x + Math.cos(angle) * branchLength;
      const nextY = y + Math.sin(angle) * branchLength;
      
      ctx.moveTo(x, y);
      ctx.lineTo(nextX, nextY);
      
      x = nextX;
      y = nextY;
    } else if (char === "+") {
      angle += (25 * Math.PI) / 180; // Xoay phải 25 độ
    } else if (char === "-") {
      angle -= (25 * Math.PI) / 180; // Xoay trái 25 độ
    } else if (char === "[") {
      stack.push({ x, y, angle }); // Lưu trạng thái nhánh vẽ
    } else if (char === "]") {
      const state = stack.pop(); // Quay lại nhánh gốc cũ
      if (state) {
        x = state.x;
        y = state.y;
        angle = state.angle;
      }
    }
  }
  ctx.stroke();
}
``` [166, 167]

---

## CHƯƠNG VI: ĐẶC TẢ CHI TIẾT 10 THẾ GIỚI GAME TỰ SINH (PROCEDURAL GAME THEMES)

Hệ thống đồ họa phải hoán đổi và cấu trúc lại toàn bộ Theme bối cảnh dựa trên sở thích cá nhân hóa của con [160, 174]. Dưới đây là đặc tả kỹ thuật chi tiết của 10 thế giới chủ đề Pastel [170]:

```
[10 Thế giới Game]
  ├── 1. Magical Forest (Khu rừng thần tiên hoang dã) [170]
  ├── 2. Math Kingdom (Vương quốc lâu đài bay 2.5D) [170]
  ├── 3. Pet Room (Phòng ngủ nuôi thú cưng) [170]
  ├── 4. Magic Shop (Cửa hàng pha lê phép thuật) [170]
  ├── 5. Space Galaxy (Vũ trụ ngân hà rực rỡ) [170]
  ├── 6. Cooking Lab (Căn bếp đầu bếp nhỏ) [170]
  ├── 7. Detective Room (Văn phòng thám tử nhí Manh mối) [170]
  ├── 8. Puzzle Room (Mật thất khóa số rương vàng) [170]
  ├── 9. Music Stage (Sân khấu khiêu vũ vũ đạo nhịp điệu) [170]
  └── 10. Underwater World (Đại dương san hô và sứa lấp lánh) [170]
```

### 1. Magical Forest (Khu rừng Phép thuật) [170]
* **Bối cảnh đồi (Terrain):** Đường cong đồi cỏ xanh ngọc nhạt nhấp nhô, có các khóm nấm màu cam pastel tự sinh [164].
* **Cây cối (Foliage):** Cây L-System tán rộng, lá màu hồng phấn [166, 167].
* **Vật thể tương tác (Interactive):** Các quả táo đỏ, củ cà rốt cam rực rỡ treo trên cành [158, 164].
* **Tương tác động:** Chạm vào bụi cỏ rậm rạp làm rơi ra các hạt đom đóm phát sáng bay lơ lửng [168].

### 2. Math Kingdom (Vương quốc Lâu đài bay) [170]
* **Bối cảnh đồi (Terrain):** Các mảng đất đá lơ lửng giữa không trung có thác nước đổ xuống mây [164].
* **Chi tiết trang trí (Decoration):** Lâu đài hoàng gia với các chóp tháp tròn màu vàng nhạt và vương miện lấp lánh [158, 164].
* **Vật thể tương tác (Interactive):** Các viên gạch đá màu xám, bó gỗ, ngọc bích để kéo thả xây dựng [173].
* **Tương tác động:** Chạm vào cổng lâu đài làm cổng mở ra, phát ra luồng hào quang vàng rực rỡ [168, 175].

### 3. Pet Room (Phòng Thú cưng ảo) [170]
* **Bối cảnh đồi (Terrain):** Sàn gỗ màu vàng ấm mộc mạc, có thảm trải sàn hình đám mây hồng bo tròn góc [164, 174].
* **Chi tiết trang trí (Decoration):** Giường ngủ nệm bông xốp của pet, kệ treo đồ chơi thỏ bông, khung cửa sổ nhìn ra vườn hoa [174].
* **Vật thể tương tác (Interactive):** Các hộp sữa, bát đựng thức ăn, đĩa cá, quả bóng len màu pastel [174].
* **Tương tác động:** Chạm vào pet làm pet vẫy đuôi, kêu tiếng sột soạt đáng yêu và chớp mắt tròn [171, 174].

### 4. Magic Shop (Cửa hàng Pha lê Phép thuật) [170]
* **Bối cảnh đồi (Terrain):** Quầy bar gỗ bóng loáng, kệ trưng bày thủy tinh chia ngăn [165, 175].
* **Chi tiết trang trí (Decoration):** Các lọ thuốc ma thuật sủi bong bóng, đèn lồng dầu cổ điển phát sáng ấm áp [158, 175].
* **Vật thể tương tác (Interactive):** Các viên pha lê đa sắc, túi vải đựng tiền xu cổ, thẻ giá tiền [175].
* **Tương tác động:** Chạm vào các lọ thuốc ma thuật làm lọ đổi màu nước sủi bong bóng [168].

### 5. Space Galaxy (Vũ trụ Ngân hà) [170]
* **Bối cảnh đồi (Terrain):** Nền không gian sâu màu tím than chuyển sắc xanh đen rực rỡ, điểm xuyết bụi khí tinh vân [157].
* **Chi tiết trang trí (Decoration):** Các tiểu hành tinh quay quanh trục, các dải vành đai thiên thạch lơ lửng [164, 178].
* **Vật thể tương tác (Interactive):** Các viên pin năng lượng phát sáng xanh, tàu vũ trụ mini, phi hành gia [178].
* **Tương tác động:** Chạm vào ngôi sao băng làm ngôi sao băng xẹt nhanh qua màn hình tỏa bụi ánh sáng [168].

### 6. Cooking Lab (Căn bếp Đầu bếp Nhỏ) [170]
* **Bối cảnh đồi (Terrain):** Mặt bàn bếp đá hoa cương màu kem nhạt, phía sau là tường gạch pastel hồng [165, 177].
* **Chi tiết trang trí (Decoration):** Kệ gia vị, lò nướng đang đỏ lửa ấm, rổ đựng trái cây [177].
* **Vật thể tương tác (Interactive):** Quả dâu tây, lát chuối, chiếc thìa khuấy súp, tô bột [177].
* **Tương tác động:** Chạm vào nồi nước dùng làm nước sủi bọt khí bong bóng bay lên lơ lửng [168, 177].

### 7. Detective Room (Văn phòng Thám tử Nhí) [170]
* **Bối cảnh đồi (Terrain):** Sàn nhà lát thảm len sọc caro cổ điển, bàn thám tử gỗ sồi nâu trầm [165, 176].
* **Chi tiết trang trí (Decoration):** Bảng ghim manh mối treo tường kết nối bằng các sợi chỉ đỏ, kính lúp cổ [176].
* **Vật thể tương tác (Interactive):** Thư mật, dấu vân tay vàng lấp lánh, chìa khóa đồng mở rương [176].
* **Tương tác động:** Chạm vào phong bì thư mật làm lá thư tự động trượt ra hé lộ mật mã toán [168, 176].

### 8. Puzzle Room (Mật thất Khóa số) [170]
* **Bối cảnh đồi (Terrain):** Tường gạch lâu đài cổ kính mờ ảo ghim ngọn đuốc phát sáng ấm [165, 178].
* **Chi tiết trang trí (Decoration):** Các bức tranh sơn dầu cổ, đồng hồ quả lắc kêu tích tắc, giá sách khổng lồ [178].
* **Vật thể tương tác (Interactive):** Khóa mật mã bánh răng xoay, các mảnh ghép tranh, rương sắt khóa xích [178, 179].
* **Tương tác động:** Chạm vào bức tranh làm bức tranh nghiêng nhẹ, để lộ ngăn tủ mật giấu chìa khóa [168, 179].

### 9. Music Stage (Sân khấu Nhịp điệu) [170]
* **Bối cảnh đồi (Terrain):** Sàn nhảy Disco lát gạch đèn Neon phát sáng đổi màu liên tục theo nhịp [176].
* **Chi tiết trang trí (Decoration):** Đàn loa sub lớn rung màng loa, hệ thống đèn chiếu spotlight xoay vòng [176].
* **Vật thể tương tác (Interactive):** Các bong bóng nhạc chứa nốt khóa Sol, micro thu âm phát sáng [176, 177].
* **Tương tác động:** Bé chạm đúng bong bóng nốt nhạc làm phát ra âm thanh phím đàn Piano vui tai [177].

### 10. Underwater World (Thế giới Đại dương) [170]
* **Bối cảnh đồi (Terrain):** Nền biển sâu xanh ngọc bích có dòng chảy hải lưu lơ lửng, cát trắng mịn ở đáy [157].
* **Chi tiết trang trí (Decoration):** Rạn san hô đa sắc, những khóm rong biển xanh rì tự sinh đung đưa [166].
* **Vật thể tương tác (Interactive):** Chú sứa phát sáng, vỏ sò chứa ngọc trai, bong bóng nước [158].
* **Tương tác động:** Chạm vào sứa làm chú sứa co giãn cơ thể bơi nhanh lên phía trên [168].

---

## CHƯƠNG VII: MÁY TRẠNG THÁI NHÂN VẬT & TƯƠNG TÁC VẬT LÝ

Để các nhân vật cô giáo AI và thú cưng biểu đạt cảm xúc chân thực theo thời gian thực tương tác của con, hệ thống cài đặt máy trạng thái hoạt họa chặt chẽ [170, 171]:

### 7.1. Máy trạng thái hoạt họa Nhân vật (Character State Machine)

```typescript
type CharacterState =
  | "idle"         // Trạng thái đứng chờ: nhún vai nhẹ, mắt nhấp nháy mượt [171]
  | "talking"      // Đang giảng bài: miệng chuyển động, tay chỉ vào bảng câu hỏi [171]
  | "thinking"     // Chờ bé trả lời: chống cằm suy tư, có bong bóng dấu hỏi [171, 172]
  | "happy"        // Khích lệ nhẹ: vẫy tay cười tươi [171]
  | "encouraging"  // Bé sai: cô AI cúi nhẹ người, tay giơ ký hiệu cố lên [171]
  | "celebrating"  // Bé đúng: nhảy cẫng lên, vỗ tay nồng nhiệt, sao bay lấp lánh [171]
  | "confused"     // Khi bé chuyển tab đột ngột: nhân vật ngơ ngác gãi đầu [171, 211]
  | "sleepy"       // Chế độ treo máy quá 5 phút: nhân vật ngáp dài và ngủ gật [171]
  | "walking"      // Di chuyển giữa các vùng đất trên bản đồ [171]
  | "jumping";     // Chuyển động nhảy vượt chướng ngại vật [171]
``` [171]

### 7.2. Đặc tả cơ học 10 Dạng Tương tác Vật lý (Interaction Mechanics)
Hệ thống sử dụng các thư viện hỗ trợ tương tác cảm ứng đa điểm trên thiết bị cầm tay để tối ưu hóa trải nghiệm vuốt chạm của bé [157]:

1. **Tap (Chạm):** Bé gõ nhẹ vào bong bóng để làm nổ bung hạt [172].
2. **Drag & Drop (Kéo và Thả):** Bé kéo củ cà rốt vào giỏ của bạn thỏ. Vật thể đang kéo phải có drop shadow (đổ bóng) dưới nền để tạo hiệu ứng nổi 2.5D, Dropzone (hộp nhận) phải rung lắc co giãn khi vật thể đi qua để báo hiệu [158, 172].
3. **Swipe (Vuốt):** Vuốt để lật trang sách truyện ma thuật mượt mà [172].
4. **Hold (Nhấn giữ):** Nhấn giữ vòi nước để bơm nước vào bình cho đến khi vạch nước dâng đầy đúng số vạch yêu cầu [172].
5. **Hover (Rê chuột/Ngón tay):** Khi lướt ngón tay qua bông hoa dại, hoa phát sáng nhẹ và bung nở nhụy [172].
6. **Shake (Lắc thiết bị/Vật thể):** Chạm lắc cây táo nhiều lần để các quả táo chín rơi xuống thảm cỏ cho bé đếm [173].
7. **Connect (Vẽ đường nối):** Vẽ đường cầu vồng nối phép tính $4+1$ bên trái với đám mây số $5$ bên phải [173].
8. **Sort (Sắp xếp):** Kéo thả xếp thứ tự các thẻ số từ nhỏ đến lớn bò lên các nấc thang mây [173].
9. **Trace (Tập viết):** Bé di ngón tay theo các chấm sáng để tập tô chữ số hoặc chữ cái tiếng Việt, tỏa ra hiệu ứng "bụi tiên" (sparkles) dọc đường vẽ [173].
10. **Combo (Tương tác liên hoàn nhịp điệu):** Chạm vỡ liên tục 3 bong bóng đáp án đúng theo nhịp nhạc để tạo chuỗi Combo nhân đôi XP vàng [177].

---

## CHƯƠNG VIII: QUY TRÌNH RENDER PIPELINE & CƠ SỞ DỮ LIỆU BỔ SUNG

### 8.1. Sơ đồ Quy trình Khởi tạo và Vẽ màn chơi (Render Pipeline)

```
[Khởi động Level]
       │
       ▼ (Bước 1): Tải tệp Câu hỏi tĩnh từ DB (Mã câu, các biến, logic đáp án) [181]
       │
       ▼ (Bước 2): Truy xuất Hồ sơ Bé (Sở thích: unicorn, mèo con; Cấp độ) [181, 191]
       │
       ▼ (Bước 3): Tạo chuỗi GameSeed: childId + subject + lvl + mode + date [181]
       │
       ▼ (Bước 4): Sinh số ngẫu nhiên Mulberry32 từ chuỗi Seed vừa tạo [181]
       │
       ▼ (Bước 5): Tạo khung Cảnh nền (Scene Blueprint) bao gồm mã màu chủ đề [181]
       │
       ▼ (Bước 6): Sinh địa hình Đồi núi SVG Parallax mượt mà [181]
       │
       ▼ (Bước 7): Sinh cỏ cây hoa lá tự sinh bằng công thức L-System [181]
       │
       ▼ (Bước 8): Bố trí vị trí vật thể trang trí ngẫu nhiên không đè lên UI chính [181]
       │
       ▼ (Bước 9): Khởi tạo lớp Nhân vật Lottie (AI tutor, Pet) đứng đúng vị trí [182]
       │
       ▼ (Bước 10): Đặt các Vật thể tương tác, kích hoạt viền phát sáng Glow [182]
       │
       ▼ (Bước 11): Chờ bé tương tác (Chạm/Kéo thả) => Ghi nhận kết quả, nổ sao [182]
       │
       ▼ (Bước 12): Cập nhật world_progress lên Supabase Database [182]
``` [181, 182]

### 8.2. SQL Schema Khởi tạo các bảng Đồ họa Bổ sung (Supabase Postgres)
Kỹ sư AI cần thực thi các lệnh tạo bảng này trên cơ sở dữ liệu để quản lý trạng thái tự sinh của thế giới [190]:

```sql
-- 1. Bảng lưu vết Cảnh nền tự sinh của từng ngày
CREATE TABLE procedural_scenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
    level_id INT NOT NULL,
    game_mode VARCHAR(100) NOT NULL,
    seed_string VARCHAR(255) NOT NULL,
    theme_selected VARCHAR(100) NOT NULL, -- 'magical_forest', 'space_galaxy'...
    scene_config JSONB NOT NULL, -- Lưu tọa độ cây, đá, bụi hoa tự sinh
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(child_id, level_id, game_mode, seed_string)
);

-- 2. Bảng theo dõi Sự tiến hóa của thế giới học tập của bé (World Progress)
CREATE TABLE world_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
    world_id VARCHAR(100) NOT NULL, -- 'math_town', 'english_kingdom', 'vietnamese_forest'
    unlocked_areas JSONB DEFAULT '[]'::jsonb, -- Các khu vực địa hình bé đã mở khóa
    unlocked_decorations JSONB DEFAULT '[]'::jsonb, -- Các đồ trang trí bé đã mua bằng coin
    buildings_level JSONB DEFAULT '{}'::jsonb, -- Cấp độ các công trình xây dựng của bé
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(child_id, world_id)
);

-- 3. Bảng lưu trữ bộ nhớ đệm Asset đồ họa đã được tạo ra từ AI
CREATE TABLE generated_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_key VARCHAR(255) NOT NULL UNIQUE, -- 'cat_princess_hat', 'unicorn_candy_skin'
    image_url TEXT NOT NULL, -- Đường dẫn tệp lưu trữ trên Supabase Storage
    prompt_used TEXT NOT NULL, -- Prompt dùng để sinh ảnh
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
``` [183, 184]

---
*Tài liệu PRD này được phê chuẩn là tiêu chuẩn tối cao để xây dựng toàn bộ hệ sinh thái đồ họa tự sinh, mang lại không gian học tập diệu kỳ đầy hứng khởi cho con gái mỗi ngày!* [155, 185]