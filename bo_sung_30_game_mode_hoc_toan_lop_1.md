# BỔ SUNG 30 GAME MODE MỚI CHO APP HỌC TOÁN LỚP 1

Tài liệu này bổ sung thêm **30 game mode** cho hệ thống học Toán lớp 1 cá nhân hoá. Trong đó có:

- **20 game mode đồ hoạ tạo sinh**: dùng Procedural Generation, Terrain Generation, L-System, AI blueprint, nhân vật chuyển động, thế giới tự biến đổi.

- **10 game mode thường**: giao diện nhẹ, dễ code, dùng để ôn tập nhanh, kiểm tra, sửa lỗi, giao bài, không cần đồ hoạ tạo sinh.

Mục tiêu là giúp con không nhàm chán, có nhiều kiểu trải nghiệm học khác nhau, nhưng vẫn bảo đảm học thật, chấm điểm thật và lưu tiến độ theo UID/child_id.

---

## 1. Nguyên tắc thiết kế chung

- Game phải vui nhưng không làm mất trọng tâm học Toán.
- Không thưởng quá nhiều chỉ vì làm nhanh; ưu tiên thưởng cho hiểu bài, sửa lỗi và học đều.
- Khi bé sai, không dùng hiệu ứng buồn/nặng; dùng AI tutor gợi ý từng bước.
- Game mode tạo sinh phải có seed để tái tạo lại cảnh cũ khi cần báo cáo.
- Game mode thường dùng cho ôn nhanh, kiểm tra, sửa lỗi, nên nhẹ và rõ ràng.

---

## 2. So sánh 2 nhóm game mode

| Nhóm | Mục tiêu | Công nghệ | Khi dùng |
|---|---|---|---|
| Đồ hoạ tạo sinh | Gây hứng thú dài hạn, tạo thế giới sống động | Procedural, Terrain, L-System, AI Blueprint, Canvas/SVG | Daily quest, adventure, reward, long-term retention |
| Chế độ thường | Ôn nhanh, kiểm tra, sửa lỗi, giao bài | UI component cơ bản, thẻ, quiz, drag-drop | Mini test, review, homework, low-cost mode |

---

## 3. Schema chung cho game mode tạo sinh

```json
{
  "game_mode_id": "gen_living_math_garden",
  "graphics_type": "generative",
  "generation_methods": ["procedural_generation", "terrain_generation", "l_system", "ai_scene_blueprint"],
  "requires_seed": true,
  "supports_daily_variation": true,
  "supports_world_progress": true,
  "characters": ["ai_tutor", "pet", "npc"],
  "interactions": ["tap", "drag_drop", "sort", "connect", "trace"],
  "save_progress_by": ["parent_uid", "child_id", "level_id", "game_mode_id"]
}
```

---

## 4. 20 game mode đồ hoạ tạo sinh

### 1. Living Math Garden - Khu Vườn Toán Học Sống Động

**Mã mode:** `gen_living_math_garden`

**Ý tưởng:** Mỗi kỹ năng toán là một khu vườn. Bé trả lời đúng để gieo hạt, tưới cây, làm hoa nở và mở thêm sinh vật nhỏ như bướm, ong, thỏ.

**Vòng lặp gây cuốn:** Giải câu hỏi -> nhận hạt/nước/nắng -> cây lớn lên -> mở cây/hoa mới -> khu vườn đẹp hơn theo tiến bộ thật.

**Đồ hoạ tạo sinh:** Terrain đồi mềm + thảm cỏ procedural; L-System tạo cây, cành, dây leo; scatter generator tạo hoa/cỏ/bướm; AI tạo blueprint khu vườn theo sở thích của bé.

**Tương tác:**

- Kéo giọt nước vào cây sau khi trả lời đúng
- Chạm hoa để hoa rung và phát sáng
- Đếm số bông hoa/quả trên cây
- Kéo thẻ số vào biển tên cây

**Dạng toán phù hợp:**

- Đếm số lượng
- Cộng/trừ bằng quả trên cây
- So sánh nhiều/ít
- Dãy số tăng dần

**Phần thưởng:** Cây tiến hoá, mở giống hoa hiếm, mở bướm mới, tăng chỉ số khu vườn.

**Ghi chú code:** Dùng SVG cho cây/hoa; Canvas particles cho phấn hoa; seed = childId + level + date để mỗi ngày vườn đổi nhẹ.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Living Math Garden - Khu Vườn Toán Học Sống Động" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 2. Infinite Island Archipelago - Quần Đảo Toán Học Tự Sinh

**Mã mode:** `gen_infinite_island_archipelago`

**Ý tưởng:** Bé đi thuyền qua các đảo. Mỗi đảo là một nhóm kỹ năng toán. Đảo được tạo bằng procedural terrain, có bãi cát, cây dừa, hang nhỏ, cầu gỗ.

**Vòng lặp gây cuốn:** Chọn đảo -> làm thử thách -> nhận la bàn -> mở đảo kế tiếp -> bản đồ quần đảo mở rộng.

**Đồ hoạ tạo sinh:** Terrain generator tạo đường bờ biển bằng noise; scatter cây dừa/đá/vỏ sò; AI đặt tên đảo và nhiệm vụ theo kỹ năng.

**Tương tác:**

- Kéo thuyền đến đảo
- Chạm vỏ sò chứa đáp án
- Ghép cầu bằng các mảnh số
- Mở rương bản đồ sau khi hoàn thành

**Dạng toán phù hợp:**

- Số liền trước/liền sau
- Cộng/trừ phạm vi 20
- So sánh số
- Tìm số còn thiếu

**Phần thưởng:** Mở đảo mới, skin thuyền, bản đồ kho báu, huy hiệu thuyền trưởng.

**Ghi chú code:** Map là node graph procedural; mỗi node có biome, difficulty và skill; lưu unlocked_islands trong world_progress.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Infinite Island Archipelago - Quần Đảo Toán Học Tự Sinh" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 3. Cloud City Numbers - Thành Phố Mây Số Học

**Mã mode:** `gen_cloud_city_numbers`

**Ý tưởng:** Các toà nhà nằm trên mây. Bé giải toán để xây cầu mây, thang cầu vồng và đưa nhân vật qua các tầng.

**Vòng lặp gây cuốn:** Câu đúng -> nhận mảnh cầu mây -> nối các tầng -> mở toà nhà mới -> mở nhiệm vụ trên cao.

**Đồ hoạ tạo sinh:** Procedural sky với mây SVG, parallax; toà nhà tạo từ block module; cầu mây tạo bằng path mềm; AI chọn màu trời theo mood học tập.

**Tương tác:**

- Kéo mảnh cầu vào đúng vị trí
- Chạm bong bóng số đúng
- Sắp xếp số trên các tầng mây
- Đưa thú cưng qua cầu khi tính đúng

**Dạng toán phù hợp:**

- Thứ tự số
- So sánh
- Cộng trừ nhẹ
- Đọc số đến 100

**Phần thưởng:** Mở tầng mới, nhà mây, cầu vồng, cánh bay cho thú cưng.

**Ghi chú code:** Dùng Framer Motion cho mây bay; SVG path cho cầu; random layout nhưng bảo đảm safe-area không che UI.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Cloud City Numbers - Thành Phố Mây Số Học" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 4. Crystal Cave Explorer - Hang Pha Lê Toán Học

**Mã mode:** `gen_crystal_cave_explorer`

**Ý tưởng:** Bé khám phá hang pha lê. Mỗi viên pha lê chứa số hoặc phép tính. Câu đúng làm hang sáng lên và mở lối mới.

**Vòng lặp gây cuốn:** Soi đèn -> chọn pha lê đúng -> thu năng lượng -> mở cửa đá -> đi sâu hơn vào hang.

**Đồ hoạ tạo sinh:** Cave terrain bằng polygon/noise; stalactite/stalagmite procedural; tinh thể SVG với màu random pastel; ánh sáng radial gradient.

**Tương tác:**

- Chạm pha lê đáp án
- Kéo đèn soi vào manh mối
- Ghép viên pha lê theo thứ tự số
- Mở cửa bằng mã số

**Dạng toán phù hợp:**

- Tìm số còn thiếu
- Quy luật số
- So sánh
- Cộng/trừ trong phạm vi 20

**Phần thưởng:** Pha lê hiếm, đèn mới, phòng hang mới, huy hiệu nhà thám hiểm.

**Ghi chú code:** Canvas glow particles; crystal positions generated by seed; tránh màu tối gây sợ, luôn pastel và an toàn.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Crystal Cave Explorer - Hang Pha Lê Toán Học" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 5. Ocean Reef Math - Rạn San Hô Toán Học

**Mã mode:** `gen_ocean_reef_math`

**Ý tưởng:** Bé lặn biển cùng robot cá. Câu đúng giúp dọn rác biển, cứu sao biển, trồng san hô và làm rạn san hô đẹp hơn.

**Vòng lặp gây cuốn:** Giải câu hỏi -> nhận bọt khí -> cứu sinh vật biển -> san hô phát triển -> mở vùng biển mới.

**Đồ hoạ tạo sinh:** Terrain đáy biển procedural; L-System biến thể tạo san hô/rong biển; particle bubbles; cá di chuyển theo boids đơn giản.

**Tương tác:**

- Chạm cá mang đáp án đúng
- Kéo rác vào thùng sau câu đúng
- Đếm sao biển/sò/ngọc trai
- Nối phép tính với viên ngọc

**Dạng toán phù hợp:**

- Đếm số lượng
- Cộng/trừ đồ vật
- So sánh nhiều ít
- Dãy số

**Phần thưởng:** Mở cá mới, san hô hiếm, vỏ sò trang trí, huy hiệu bảo vệ đại dương.

**Ghi chú code:** Dùng Canvas cho bubbles/fish; SVG cho san hô; giới hạn số fish để tối ưu web.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Ocean Reef Math - Rạn San Hô Toán Học" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 6. Dinosaur Valley Math - Thung Lũng Khủng Long Nhí

**Mã mode:** `gen_dinosaur_valley_math`

**Ý tưởng:** Bé chăm sóc khủng long con bằng cách giải toán. Địa hình thung lũng, núi lửa hiền lành, cây cổ đại được tạo tự động.

**Vòng lặp gây cuốn:** Giải bài -> kiếm lá/cá/đá năng lượng -> cho khủng long ăn -> khủng long lớn lên -> mở thung lũng mới.

**Đồ hoạ tạo sinh:** Rolling terrain + volcano background; L-System cây cổ đại; procedural dinosaur footprints làm đường đi; AI tạo tên khủng long.

**Tương tác:**

- Kéo thức ăn đúng số lượng
- Đếm dấu chân khủng long
- Chọn quả trứng có đáp án đúng
- Sắp xếp đá số để mở cổng

**Dạng toán phù hợp:**

- Đếm
- Cộng trừ
- Số liền trước/sau
- So sánh kích thước/số lượng

**Phần thưởng:** Mở loài khủng long mới, ổ trứng, hang ngủ, sticker khủng long.

**Ghi chú code:** Character rig 2D đơn giản: idle, eat, happy, sleep; không làm khủng long dữ hoặc đáng sợ.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Dinosaur Valley Math - Thung Lũng Khủng Long Nhí" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 7. Fairy Forest Quest - Rừng Tiên Nhiệm Màu

**Mã mode:** `gen_fairy_forest_quest`

**Ý tưởng:** Cô tiên toán học dẫn bé đi qua khu rừng, giải câu đố để làm đèn lồng sáng, mở nấm thần kỳ, cứu bạn bướm.

**Vòng lặp gây cuốn:** Câu đúng -> nhận bụi tiên -> thắp sáng đèn -> mở lối -> gặp NPC mới.

**Đồ hoạ tạo sinh:** L-System tạo cây/dây leo/nấm; firefly particles; đèn lồng procedural; AI tạo lời thoại nhiệm vụ nhỏ.

**Tương tác:**

- Chạm đom đóm đáp án
- Kéo số vào đèn lồng
- Đếm nấm phát sáng
- Mở cổng dây leo bằng phép tính

**Dạng toán phù hợp:**

- Đếm
- Cộng/trừ phạm vi 10-20
- Tìm số còn thiếu
- Quy luật hình

**Phần thưởng:** Đèn lồng, cánh tiên, nấm trang trí, mở đường rừng mới.

**Ghi chú code:** Biến thể ngày/đêm; nếu bé sai nhiều, chuyển mood calm và giảm particle để dễ tập trung.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Fairy Forest Quest - Rừng Tiên Nhiệm Màu" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 8. Toy Factory Automata - Nhà Máy Đồ Chơi Tự Động

**Mã mode:** `gen_toy_factory_automata`

**Ý tưởng:** Bé vận hành nhà máy đồ chơi. Máy móc vui nhộn tạo gấu bông, xe, bóng. Toán dùng để bật băng chuyền và đóng gói đúng số lượng.

**Vòng lặp gây cuốn:** Tính đúng -> máy chạy -> đồ chơi được lắp ráp -> đóng hộp -> giao hàng.

**Đồ hoạ tạo sinh:** Băng chuyền procedural, gears SVG, robot tay gắp, đồ chơi random; animation máy chạy bằng CSS/Framer Motion.

**Tương tác:**

- Kéo đồ chơi vào hộp đúng số lượng
- Chọn công tắc có đáp án đúng
- Sắp xếp hộp theo số
- Nối lệnh máy với kết quả

**Dạng toán phù hợp:**

- Đếm đồ vật
- Cộng/trừ
- Sắp xếp số
- So sánh số lượng

**Phần thưởng:** Mở máy mới, đồ chơi mới, nâng cấp nhà máy, robot phụ tá.

**Ghi chú code:** Great for repeatable lesson loops; no AI image needed, only code-generated parts and moving components.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Toy Factory Automata - Nhà Máy Đồ Chơi Tự Động" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 9. Train Route Builder - Đường Tàu Số Học

**Mã mode:** `gen_train_route_builder`

**Ý tưởng:** Bé xây đường tàu qua các ga số. Mỗi phép tính đúng đặt được một đoạn ray, mở ga mới hoặc cứu hành khách thú cưng.

**Vòng lặp gây cuốn:** Giải toán -> nhận đoạn ray -> đặt ray -> tàu chạy -> mở ga tiếp theo.

**Đồ hoạ tạo sinh:** Terrain map procedural; track path generated from Bezier curves; ga/tunnel/bridge scatter theo seed; tàu nhỏ animated.

**Tương tác:**

- Kéo đoạn ray vào vị trí
- Chọn ga có kết quả đúng
- Sắp xếp toa tàu theo thứ tự số
- Đếm hành khách lên/xuống tàu

**Dạng toán phù hợp:**

- Thứ tự số
- Cộng/trừ hành khách
- So sánh số
- Dãy số

**Phần thưởng:** Skin tàu, ga mới, vé vàng, huy hiệu trưởng tàu.

**Ghi chú code:** Pathfinding đơn giản; train follows SVG path; mỗi node có question skill.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Train Route Builder - Đường Tàu Số Học" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 10. Dragon Farm Math - Nông Trại Rồng Con

**Mã mode:** `gen_dragon_farm_math`

**Ý tưởng:** Bé chăm rồng con ở nông trại. Rồng giúp tưới cây, thu hoạch, sưởi trứng. Toán quyết định số lượng hành động.

**Vòng lặp gây cuốn:** Làm đúng -> nhận năng lượng rồng -> tưới cây/ấp trứng -> thu hoạch -> mở chuồng mới.

**Đồ hoạ tạo sinh:** Farm terrain procedural; luống cây random; L-System cây ăn quả; rồng con rig 2D chuyển động.

**Tương tác:**

- Đếm trứng rồng
- Kéo nước vào đúng số luống
- Chọn số quả cần thu hoạch
- Ghép phép tính để mở chuồng

**Dạng toán phù hợp:**

- Đếm
- Cộng/trừ
- So sánh
- Bài toán có lời văn

**Phần thưởng:** Rồng tiến hoá, cây mới, chuồng mới, mũ nông trại.

**Ghi chú code:** Rồng phải dễ thương, không bắn lửa đáng sợ; lửa là ánh sáng ấm dùng để ấp trứng.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Dragon Farm Math - Nông Trại Rồng Con" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 11. Weather Wizard Math - Phù Thuỷ Thời Tiết

**Mã mode:** `gen_weather_wizard_math`

**Ý tưởng:** Bé điều khiển thời tiết bằng Toán: gom mây, tạo cầu vồng, gọi nắng, tưới mưa cho cây.

**Vòng lặp gây cuốn:** Giải đúng -> nhận biểu tượng thời tiết -> thay đổi cảnh -> cây/cầu vồng/mây phát triển.

**Đồ hoạ tạo sinh:** Sky generator với mây, mưa, nắng, cầu vồng; particle mưa/snow/sparkle; terrain thay đổi theo weather state.

**Tương tác:**

- Kéo mây vào vị trí
- Chạm giọt mưa đáp án đúng
- Đếm tia nắng
- Ghép màu cầu vồng theo dãy số

**Dạng toán phù hợp:**

- Đếm
- Quy luật
- Cộng/trừ
- So sánh

**Phần thưởng:** Mở thời tiết mới, áo choàng phù thuỷ, cầu vồng hiếm, hiệu ứng nền.

**Ghi chú code:** Weather state phản ánh learning mood; sai nhiều -> trời dịu, nhạc chậm; đúng nhiều -> nắng và cầu vồng.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Weather Wizard Math - Phù Thuỷ Thời Tiết" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 12. Undersea Treasure Map - Bản Đồ Kho Báu Dưới Biển

**Mã mode:** `gen_treasure_map_undersea`

**Ý tưởng:** Bé dùng bản đồ kho báu dưới biển, giải toán để đọc toạ độ, mở hòm vàng và cứu bạn rùa.

**Vòng lặp gây cuốn:** Giải toán -> nhận mảnh bản đồ -> xác định vị trí -> mở kho báu.

**Đồ hoạ tạo sinh:** Procedural map parchment + underwater scene; coral L-System; path dotted line generated by seed; chest locations randomized.

**Tương tác:**

- Chạm điểm trên bản đồ
- Kéo mảnh bản đồ vào đúng vị trí
- Đếm ngọc trai trong hòm
- Chọn toạ độ đơn giản bằng hàng/cột

**Dạng toán phù hợp:**

- Đếm
- So sánh
- Cộng/trừ tiền/ngọc
- Vị trí hàng/cột đơn giản

**Phần thưởng:** Kho báu, mảnh bản đồ, la bàn, pet rùa.

**Ghi chú code:** Phù hợp làm weekly quest; bản đồ lưu seed để tái tạo tiến trình.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Undersea Treasure Map - Bản Đồ Kho Báu Dưới Biển" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 13. Robot City Constructor - Thành Phố Robot Toán Học

**Mã mode:** `gen_robot_city_constructor`

**Ý tưởng:** Bé cùng robot xây thành phố bằng các khối số. Mỗi phép tính đúng cung cấp pin, bánh răng hoặc block xây dựng.

**Vòng lặp gây cuốn:** Tính đúng -> nhận block -> robot lắp ráp -> công trình hoạt động -> mở khu robot mới.

**Đồ hoạ tạo sinh:** City tiles generated from modules; robot parts procedural; gear animation; neon pastel but không quá chói.

**Tương tác:**

- Kéo block số vào công trình
- Chọn pin có đáp án đúng
- Sắp xếp robot theo số thứ tự
- Nối dây điện đúng kết quả

**Dạng toán phù hợp:**

- Cộng/trừ
- Chục và đơn vị
- So sánh số đến 100
- Tìm số còn thiếu

**Phần thưởng:** Robot mới, toà nhà mới, pin năng lượng, huy hiệu kỹ sư.

**Ghi chú code:** Tile-based procedural city; có thể dùng CSS grid/SVG; progress unlock theo mastery.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Robot City Constructor - Thành Phố Robot Toán Học" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 14. Candy Biome World - Thế Giới Kẹo Tự Sinh

**Mã mode:** `gen_candy_biome_world`

**Ý tưởng:** Địa hình làm bằng kẹo: sông chocolate, cây kẹo mút, đồi bánh quy. Bé giải toán để thu kẹo và mở vùng mới.

**Vòng lặp gây cuốn:** Câu đúng -> thu kẹo -> đổi vật phẩm -> mở biome mới -> nhận nhiệm vụ ngọt ngào.

**Đồ hoạ tạo sinh:** Candy terrain procedural; cây kẹo bằng SVG; sprinkle particles; AI thay đổi màu/kẹo theo sở thích bé.

**Tương tác:**

- Đếm kẹo
- Kéo kẹo vào lọ
- Chọn lọ có số đúng
- Sắp xếp kẹo theo quy luật màu/số

**Dạng toán phù hợp:**

- Đếm
- Cộng/trừ
- Quy luật
- So sánh

**Phần thưởng:** Kẹo hiếm, lọ kẹo, skin xe kẹo, mở candy biome.

**Ghi chú code:** Cần hạn chế âm thanh/quá nhiều hiệu ứng để tránh rối mắt; đồ hoạ vui nhưng câu hỏi phải rõ.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Candy Biome World - Thế Giới Kẹo Tự Sinh" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 15. Time Portal Math - Cổng Thời Gian Toán Học

**Mã mode:** `gen_time_portal_math`

**Ý tưởng:** Bé mở cổng thời gian đến nhiều bối cảnh: khủng long, lâu đài, tương lai, đại dương. Mỗi cổng là một kỹ năng toán.

**Vòng lặp gây cuốn:** Giải câu hỏi -> nạp năng lượng cổng -> chọn thời điểm -> khám phá nhiệm vụ ngắn.

**Đồ hoạ tạo sinh:** Portal animated bằng SVG/Canvas; scene blueprint thay đổi biome theo cổng; AI tạo nhiệm vụ lịch sử/fantasy phù hợp trẻ em.

**Tương tác:**

- Xoay vòng cổng chọn đáp án
- Kéo tinh thể vào cổng
- Chọn năm/giờ đơn giản
- Sắp xếp sự kiện bằng số thứ tự

**Dạng toán phù hợp:**

- Thời gian giờ đúng
- Dãy số
- Cộng/trừ
- So sánh

**Phần thưởng:** Mở cổng mới, tinh thể thời gian, trang phục phiêu lưu.

**Ghi chú code:** Dùng mode này làm hub đổi theme nhanh, tránh nhàm chán giữa các level.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Time Portal Math - Cổng Thời Gian Toán Học" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 16. Mini Zoo Ecosystem - Vườn Thú Tự Sinh

**Mã mode:** `gen_mini_zoo_ecosystem`

**Ý tưởng:** Bé xây vườn thú nhỏ. Mỗi loài vật có chuồng, thức ăn, đồ chơi. Bé dùng toán để chăm sóc từng loài.

**Vòng lặp gây cuốn:** Giải toán -> nhận thức ăn/vật liệu -> chăm thú -> mở loài mới -> cân bằng vườn thú.

**Đồ hoạ tạo sinh:** Tile-based zoo map; cây/cỏ procedural; animals with idle animation; AI tạo nhiệm vụ theo loài vật bé thích.

**Tương tác:**

- Đếm con vật trong chuồng
- Kéo thức ăn đúng số lượng
- So sánh chuồng nào nhiều thú hơn
- Tính số thức ăn còn lại

**Dạng toán phù hợp:**

- Đếm
- Cộng/trừ
- So sánh
- Bài toán thực tế

**Phần thưởng:** Mở loài vật, chuồng mới, cây trang trí, vé tham quan.

**Ghi chú code:** Dữ liệu animal_state lưu theo child_id; không để thú buồn vì bé sai, chỉ dùng trạng thái chờ/cổ vũ.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Mini Zoo Ecosystem - Vườn Thú Tự Sinh" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 17. Storybook Pop-up World - Sách Bật Nổi Toán Học

**Mã mode:** `gen_storybook_popup_world`

**Ý tưởng:** Mỗi bài học là một trang sách bật nổi. Khi bé giải toán, cảnh trong sách dựng lên: cây mọc, nhà hiện ra, nhân vật bước ra.

**Vòng lặp gây cuốn:** Mở trang sách -> giải câu hỏi -> pop-up scene xuất hiện -> hoàn thành chương truyện.

**Đồ hoạ tạo sinh:** Scene generated as layered SVG paper cutout; fold/unfold animation; AI tạo micro-story cá nhân hoá.

**Tương tác:**

- Lật trang
- Chạm nhân vật để nghe nhiệm vụ
- Kéo số vào khoảng trống trong truyện
- Đếm vật thể bật nổi

**Dạng toán phù hợp:**

- Bài toán có lời văn
- Đếm
- Cộng/trừ
- Quy luật

**Phần thưởng:** Mở chương mới, sticker sách, bìa truyện cá nhân, nhân vật đồng hành.

**Ghi chú code:** Rất phù hợp tích hợp cả Tiếng Việt sau này; dùng same engine cho reading comprehension.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Storybook Pop-up World - Sách Bật Nổi Toán Học" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 18. Maze of Numbers - Mê Cung Số Tự Tạo

**Mã mode:** `gen_number_maze`

**Ý tưởng:** Bé đi trong mê cung số, tìm đường bằng cách chọn ô có đáp án đúng hoặc dãy số hợp lệ.

**Vòng lặp gây cuốn:** Câu hỏi -> chọn đường đúng -> mở đoạn mê cung -> tới rương cuối.

**Đồ hoạ tạo sinh:** Maze grid generated by algorithm; theme có thể là vườn, lâu đài, kẹo, vũ trụ; decorations scatter theo safe cells.

**Tương tác:**

- Chạm ô đường đi
- Kéo nhân vật qua ô số
- Chọn cửa có đáp án đúng
- Thu chìa khóa trên đường

**Dạng toán phù hợp:**

- Dãy số
- So sánh
- Tính nhẩm
- Tìm số còn thiếu

**Phần thưởng:** Chìa khóa, bản đồ nhỏ, huy hiệu giải mê cung, mở maze skin.

**Ghi chú code:** Dùng maze generation như DFS/backtracking; đường đúng phải rõ với trẻ lớp 1, không tạo mê cung quá khó.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Maze of Numbers - Mê Cung Số Tự Tạo" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 19. Festival Parade Math - Lễ Hội Diễu Hành Toán Học

**Mã mode:** `gen_festival_parade_math`

**Ý tưởng:** Bé chuẩn bị lễ hội. Cần xếp xe diễu hành, bóng bay, đèn lồng theo số lượng và quy luật.

**Vòng lặp gây cuốn:** Giải toán -> thêm xe/đèn/bóng -> đoàn diễu hành dài hơn -> mở tiết mục mới.

**Đồ hoạ tạo sinh:** Parade road procedural; confetti particles; NPC crowd; floats generated from modules; seasonal theme theo ngày lễ.

**Tương tác:**

- Sắp xếp xe theo số
- Đếm bóng bay
- Ghép cặp phép tính-kết quả
- Chọn màu tiếp theo theo quy luật

**Dạng toán phù hợp:**

- Thứ tự số
- Quy luật
- Cộng/trừ
- So sánh

**Phần thưởng:** Xe diễu hành, nhạc lễ hội, cờ, huy hiệu nhà tổ chức.

**Ghi chú code:** Có thể dùng cho daily celebration khi bé đạt streak; vui nhưng cần giữ câu hỏi nổi bật.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Festival Parade Math - Lễ Hội Diễu Hành Toán Học" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

### 20. Dream Room Builder - Phòng Mơ Ước Cá Nhân Hoá

**Mã mode:** `gen_dream_room_builder`

**Ý tưởng:** Bé tự xây phòng học/phòng chơi của mình. Càng học tốt, bé càng mở đồ nội thất, thú bông, tranh, cây nhỏ.

**Vòng lặp gây cuốn:** Học -> kiếm coin -> mở vật phẩm -> đặt vào phòng -> phòng thay đổi theo sở thích và tiến bộ.

**Đồ hoạ tạo sinh:** Room layout generated by grid; AI blueprint cá nhân hoá theo sở thích; đồ nội thất procedural/module; nhân vật/pet tương tác trong phòng.

**Tương tác:**

- Kéo đồ nội thất vào phòng
- Chạm đồ vật để chơi animation
- Đếm số đồ vật trong phòng
- Mở hộp quà bằng phép tính

**Dạng toán phù hợp:**

- Đếm
- Cộng/trừ vật phẩm
- So sánh số đồ
- Bài toán thực tế

**Phần thưởng:** Đồ trang trí, màu tường, bàn học, giường pet, poster kỹ năng.

**Ghi chú code:** Cực tốt để giữ retention; lưu room_layout jsonb theo child_id; có giới hạn đồ vật để không lag.

**Prompt cho AI scene blueprint:**

```text
Tạo scene blueprint cho game mode "Dream Room Builder - Phòng Mơ Ước Cá Nhân Hoá" dành cho học sinh lớp 1. Đồ hoạ 2D pastel, sinh động, có cô gia sư AI, thú cưng, vật thể tương tác phục vụ câu hỏi Toán. Dùng procedural generation để biến đổi cảnh theo seed, level, kỹ năng và sở thích của bé. Cảnh phải vui, an toàn, không đáng sợ, không rối mắt.
```

---

## 5. 10 game mode thường - không cần đồ hoạ tạo sinh

### 1. Flashcard Sprint - Thẻ Nhanh 3 Phút

**Mã mode:** `std_flashcard_sprint`

**Ý tưởng:** Bé trả lời nhanh các thẻ phép tính/đếm số trong thời gian ngắn, phù hợp ôn tập hằng ngày.

**Giao diện:** Nền đơn giản, thẻ lớn, 4 đáp án, thanh tiến độ nhỏ.

**Tương tác:**

- Tap đáp án
- Nghe lại câu hỏi
- Bấm hint

**Dạng toán phù hợp:**

- Tính nhẩm
- Số liền trước/sau
- So sánh nhanh

**Phần thưởng:** XP nhỏ, streak ngày, sticker nhanh.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 2. Quiz Ladder - Leo Thang Câu Hỏi

**Mã mode:** `std_quiz_ladder`

**Ý tưởng:** Mỗi câu đúng bé leo lên một bậc thang. Dùng layout đơn giản, không cần sinh cảnh.

**Giao diện:** Cầu thang 10 bậc, nhân vật icon nhỏ, câu hỏi ở trung tâm.

**Tương tác:**

- Tap chọn đáp án
- Kéo số vào ô
- Bấm kiểm tra

**Dạng toán phù hợp:**

- Tổng hợp theo level
- Cộng/trừ
- So sánh

**Phần thưởng:** Lên tầng, nhận sao cuối thang.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 3. Matching Cards - Lật Thẻ Ghép Cặp

**Mã mode:** `std_matching_cards`

**Ý tưởng:** Bé lật thẻ để ghép phép tính với kết quả hoặc số với nhóm đồ vật.

**Giao diện:** Lưới thẻ 2x3 hoặc 3x4, hoạt ảnh lật thẻ đơn giản.

**Tương tác:**

- Tap để lật thẻ
- Ghép đúng cặp
- Reset nếu sai

**Dạng toán phù hợp:**

- Phép tính-kết quả
- Số-hình ảnh
- Dấu so sánh

**Phần thưởng:** Combo ghép cặp, sao trí nhớ.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 4. Drag Worksheet - Phiếu Kéo Thả Tương Tác

**Mã mode:** `std_drag_worksheet`

**Ý tưởng:** Dạng worksheet số hoá: kéo đáp án vào chỗ trống. Nhẹ, dễ code, dùng cho nhiều bài.

**Giao diện:** Phiếu bài tập sạch, ô trống lớn, thẻ đáp án phía dưới.

**Tương tác:**

- Drag thẻ số
- Drop vào ô trống
- Bấm kiểm tra

**Dạng toán phù hợp:**

- Tìm số còn thiếu
- Điền dấu
- Điền kết quả

**Phần thưởng:** Điểm hoàn thành, sticker phiếu tốt.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 5. Audio Math - Nghe Và Chọn Đáp Án

**Mã mode:** `std_audio_math`

**Ý tưởng:** AI đọc câu hỏi, bé nghe rồi chọn đáp án. Rất tốt cho trẻ cần luyện nghe hiểu đề.

**Giao diện:** Nút loa lớn, 4 thẻ đáp án, icon cô giáo.

**Tương tác:**

- Nghe câu hỏi
- Tap đáp án
- Nghe lại tối đa 2 lần

**Dạng toán phù hợp:**

- Bài toán có lời văn
- Đếm
- Cộng/trừ đơn giản

**Phần thưởng:** Huy hiệu nghe giỏi, XP nghe hiểu.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 6. Error Clinic - Phòng Khám Lỗi Sai

**Mã mode:** `std_error_clinic`

**Ý tưởng:** Tập trung sửa các lỗi bé hay sai. Không cần đồ hoạ phức tạp, chỉ cần rõ ràng và AI giải thích tốt.

**Giao diện:** Danh sách lỗi sai, thẻ câu hỏi, bảng giải thích từng bước.

**Tương tác:**

- Chọn lỗi cần sửa
- Làm lại câu tương tự
- Bấm con hiểu rồi

**Dạng toán phù hợp:**

- Tất cả kỹ năng đã sai
- Ôn tập cá nhân hoá

**Phần thưởng:** Huy hiệu cao thủ sửa lỗi, tăng mastery mạnh hơn câu thường.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 7. Mini Exam - Kiểm Tra 10 Câu

**Mã mode:** `std_mini_exam`

**Ý tưởng:** Bài kiểm tra ngắn để đánh giá level. Giao diện nghiêm túc vừa phải, không gây áp lực.

**Giao diện:** 10 câu, thanh tiến độ, không quá nhiều hiệu ứng.

**Tương tác:**

- Chọn/nhập đáp án
- Chuyển câu
- Xem kết quả cuối

**Dạng toán phù hợp:**

- Tổng hợp level
- Đánh giá đầu vào/cuối tuần

**Phần thưởng:** Báo cáo điểm, đề xuất ôn tập, không dùng hình phạt.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 8. Parent Assignment - Nhiệm Vụ Bố Mẹ Giao

**Mã mode:** `std_parent_assignment`

**Ý tưởng:** Phụ huynh giao bài cụ thể, app biến thành checklist học tập đơn giản.

**Giao diện:** Checklist nhiệm vụ, deadline, phần thưởng phụ huynh chọn.

**Tương tác:**

- Bấm bắt đầu
- Hoàn thành từng nhiệm vụ
- Nhận lời nhắn bố mẹ

**Dạng toán phù hợp:**

- Theo bài phụ huynh chọn
- Ôn tập cá nhân

**Phần thưởng:** Phần thưởng tùy chỉnh, sao gia đình.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 9. Number Trace - Tập Viết Số

**Mã mode:** `std_number_trace`

**Ý tưởng:** Bé tập viết số bằng tay/chuột theo đường chấm. Hợp cho lớp 1, không cần tạo sinh.

**Giao diện:** Số lớn, đường chấm, mũi tên hướng dẫn nét.

**Tương tác:**

- Trace theo đường chấm
- Nhận feedback độ chính xác
- Viết lại nếu cần

**Dạng toán phù hợp:**

- Nhận diện số
- Viết số
- Số đến 100

**Phần thưởng:** Sticker viết đẹp, sao cẩn thận.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

### 10. Sticker Board Challenge - Bảng Sticker Thành Tích

**Mã mode:** `std_sticker_board`

**Ý tưởng:** Mỗi câu đúng giúp bé dán một sticker lên bảng. Mode nhẹ dùng cuối buổi học.

**Giao diện:** Bảng sticker, câu hỏi đơn giản, kho sticker nhỏ.

**Tương tác:**

- Trả lời câu hỏi
- Chọn sticker
- Dán vào bảng

**Dạng toán phù hợp:**

- Ôn tập nhẹ
- Câu dễ cuối buổi
- Tạo cảm giác hoàn thành

**Phần thưởng:** Bảng sticker cá nhân, ảnh chụp thành tích cuối ngày.

**Ghi chú code:** Có thể dùng component UI nhẹ, không cần scene blueprint, không cần terrain generation. Phù hợp chạy nhanh trên mobile và dùng khi cần ôn tập/kiểm tra.

---

## 6. Cách phân bổ 30 mode vào hệ thống

| Giai đoạn | Nên dùng game mode | Mục tiêu |
|---|---|---|
| MVP đầu tiên | Flashcard Sprint, Quiz Ladder, Drag Worksheet, Pet Evolution, Math Garden | Có sản phẩm chạy nhanh, bé học được ngay |
| Bản hấp dẫn hơn | Adventure/Map, Kingdom/Builder, Magic Shop, Cooking, Zoo, Train | Tạo retention dài hạn |
| Bản cao cấp | Island, Cloud City, Ocean Reef, Time Portal, Storybook, Boss Battle | Tạo trải nghiệm như game học tập hoàn chỉnh |
| Kiểm tra & giám sát | Mini Exam, Error Clinic, Parent Assignment, Audio Math | Đánh giá thật và báo cáo phụ huynh |

---

## 7. Prompt tổng cho Antigravity

```text
Hãy bổ sung 30 game mode mới cho app học Toán lớp 1.

Nhóm A: 20 game mode đồ hoạ tạo sinh.
- Dùng procedural generation, terrain generation, L-system, AI scene blueprint.
- Có nhân vật cô gia sư AI, thú cưng, NPC, vật thể tương tác.
- Mỗi mode có scene generator riêng nhưng dùng chung question engine.
- Cảnh phải tự biến đổi theo seed, child profile, level, skill, date.
- Dữ liệu phải lưu theo parent_uid, child_id, level_id, game_mode_id.

Nhóm B: 10 game mode thường.
- Không cần đồ hoạ tạo sinh.
- Giao diện nhẹ, dễ code, dùng cho ôn tập, kiểm tra, sửa lỗi, giao bài.

Yêu cầu kỹ thuật:
- Next.js App Router, TypeScript, Tailwind CSS, Framer Motion.
- SVG/Canvas cho scene tạo sinh.
- Lottie optional cho nhân vật/hiệu ứng.
- Supabase lưu progress, world state, attempts, rewards.
- Game engine nhận question_template, variables, answer_logic, game_mode_id.
- AI tutor không đưa đáp án ngay, gợi ý từng bước.
- Không tạo áp lực khi bé sai.
- Ưu tiên thưởng cho sửa lỗi, hiểu bài, học đều.
```

---

## 8. Kết luận

Với 30 game mode bổ sung này, app có thể có cả hai lớp trải nghiệm: **lớp game thế giới sống động** để bé yêu thích học mỗi ngày, và **lớp ôn tập/kiểm tra nhẹ** để phụ huynh đo được tiến bộ thật.
