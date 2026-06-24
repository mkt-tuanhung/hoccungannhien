# TÀI LIỆU YÊU CẦU SẢN PHẨM CHUYÊN BIỆT (SPECIALIZED PRD)
## PHÂN HỆ GAME MODES & ĐỒ HỌA TẠO SỰ KIỆN - HỆ THỐNG "HỌC CÙNG AN NHIÊN"

---

## CHƯƠNG I: KIẾN TRÚC TỔNG QUAN GAME ENGINE

Tài liệu này đặc tả kỹ thuật chi tiết cho **40 Game Modes** (gồm 30 Game Modes chính thức và 10 Game Modes bổ sung đồ họa tạo sinh) thuộc hệ thống học tập cá nhân hóa "Học Cùng An Nhiên" [155, 235]. Tài liệu được thiết kế tối ưu hóa cấu trúc dữ liệu để nạp trực tiếp vào các **AI Code Agent** (Cursor, Devin, Antigravity) để lập trình tự động [154, 155].

### 1.1. Triết lý Thiết kế Đồ họa & Sư phạm
* **Học qua Trải nghiệm (Immersive Learning):** Tránh các bảng câu hỏi tĩnh nhàm chán [204]. Biến mỗi bài học toán thành một tương tác vật lý trực quan, giúp trẻ 6 tuổi hiểu bản chất số học thông qua việc thay đổi trạng thái của thế giới game [155, 156, 204].
* **Độ nhất quán của Seed (Reproducibility):** Mọi cảnh game tạo sinh (Procedural) bắt buộc phải sử dụng hệ thống Seed ngẫu nhiên có kiểm soát [156, 211]:
  $$\text{Seed} = \text{child\_id} + \text{level\_id} + \text{game\_mode} + \text{date}$$
  Điều này đảm bảo cùng một ngày bé An Nhiên sẽ trải nghiệm một bối cảnh nhất định, và phụ huynh hoặc hệ thống AI có thể tái tạo hoàn chỉnh cảnh chơi đó từ báo cáo lịch sử để phân tích lỗi sai [211, 212].
* **Tải lượng Nhận thức Dịu nhẹ (Low Cognitive Load):** Nếu bé trả lời sai liên tiếp, hệ thống tự động kích hoạt **Mood-based Theme Shift** [229]. Đồ họa sẽ chuyển sang tông màu tĩnh lặng, giảm bớt các hiệu ứng chuyển động lấp lánh (Particles), âm nhạc nền chậm lại và cô AI chuyển sang giọng đọc cực kỳ kiên nhẫn để con không bị căng thẳng [169, 176, 229].

### 1.2. Render Pipeline & Phân tầng Graphics Layer (SVG & Canvas)
Mỗi Game Mode hoạt động trên một cấu trúc phân lớp đồ họa nghiêm ngặt thông qua React & HTML5 Canvas để tối ưu hiệu năng trên thiết bị di động/iPad [157, 194, 208, 231]:

```
+-------------------------------------------------------------+
| LAYER 8: REWARD LAYER (Rương báu, Sao, Coin bay)           | z-index: 800 [208]
+-------------------------------------------------------------+
| LAYER 7: FEEDBACK LAYER (Confetti, Particles Canvas)       | z-index: 700 [208]
+-------------------------------------------------------------+
| LAYER 6: QUESTION UI LAYER (Thanh tiến trình, Câu hỏi)       | z-index: 600 [208]
+-------------------------------------------------------------+
| LAYER 5: CHARACTER LAYER (Cô AI, Thú cưng Lottie JSON)      | z-index: 500 [208]
+-------------------------------------------------------------+
| LAYER 4: INTERACTIVE LAYER (Vật thể Kéo thả SVG)            | z-index: 400 [208]
+-------------------------------------------------------------+
| LAYER 3: DECORATION LAYER (Cỏ cây L-System, Hoa lá Canvas) | z-index: 300 [207]
+-------------------------------------------------------------+
| LAYER 2: TERRAIN LAYER (Đồi núi Parallax nhấp nhô SVG)      | z-index: 200 [206]
+-------------------------------------------------------------+
| LAYER 1: BACKGROUND LAYER (Bầu trời Gradient, Mây trôi)     | z-index: 100 [206]
+-------------------------------------------------------------+
```

* **SVG (Scalable Vector Graphics):** Sử dụng cho Layer 2, Layer 4 và Layer 6 [209]. Cho phép kéo dãn mượt mà không vỡ hạt trên iPad Retina, dễ dàng gán mã màu sắc động dựa trên Theme sở thích của bé An Nhiên (Hồng công chúa, xanh kỳ lân...) [160, 209].
* **Canvas 2D:** Sử dụng cho các chuyển động mật độ cao ở Layer 3 và Layer 7 (bụi tiên lấp lánh, hiệu ứng bong bóng nổ, lá rơi) để tránh quá tải DOM [7, 207, 231].

---

## CHƯƠNG II: 20 GAME MODES ĐỒ HỌA TẠO SINH TRỰC QUAN (PROCEDURAL)

Mỗi Game Mode dưới đây được thiết lập cấu trúc mã hóa chuẩn để Code Agent dễ dàng sinh mã React component [155, 174, 230].

### 2.1. Nhóm Thế giới Thiên nhiên & Sinh cảnh (Nature & Biomes)

#### 1. `gen_living_math_garden` (Khu Vườn Toán Học Sống Động) [2, 155]
* **Ý tưởng cốt lõi:** Mỗi phép toán cộng/trừ đúng sẽ trực tiếp tưới nước giúp một mầm cây non lớn lên thành một bông hoa rực rỡ lấp lánh [156, 234].
* **Tương tác Vật lý:** Bé chạm và giữ chiếc bình tưới nước (Drag_Item), kéo lướt qua bông hoa khuyết số (Drop_Target) [5, 260].
* **Thuật toán Tạo sinh:** Cánh hoa và cành cây được sinh tự động bằng giải thuật **L-System (Lindenmayer System)** vẽ lên Canvas [234]:
  * Axiom: `X`
  * Rules: `X -> F-[[X]+X]+F[+FX]-X`, `F -> FF`
  * Góc quay ngẫu nhiên dựa trên Seed: `20 + seededRandom() * 10` độ [211, 215].
* **Dạng toán áp dụng:** Cộng/trừ phạm vi 10 và 20 [2, 155].
* **Phần thưởng:** Cây tiến hóa nở hoa hồng pastel rực rỡ, bướm Lottie bay tới đậu trên hoa [158, 220].
* **Ghi chú Code:** Giới hạn tối đa 5 cây hoa trên màn hình Canvas để bảo đảm hiệu năng di động [231].

#### 2. `gen_infinite_island_archipelago` (Quần Đảo Toán Học Tự Sinh) [160]
* **Ý tưởng cốt lõi:** Bé lái một chiếc thuyền nhỏ băng qua các hòn đảo ngẫu nhiên được vẽ tự sinh trên bản đồ nước biển mờ ảo [160].
* **Tương tác Vật lý:** Chạm giữ và kéo (Swipe/Drag) mũi thuyền vẽ đường hải trình nối các hòn đảo theo thứ tự số tăng dần [160].
* **Thuật toán Tạo sinh:**
  * Bản đồ đảo được biểu diễn dưới dạng **Node Graph Procedural** sinh từ một mảng điểm [161].
  * Đường viền bờ cát của mỗi hòn đảo sử dụng thuật toán **Perlin Noise** hoặc **Midpoint Displacement** 1D khép kín để tạo các mỏm đá nhấp nhô tự nhiên [160].
* **Dạng toán áp dụng:** Thứ tự số, so sánh số phạm vi 20 và 100 [2, 160].
* **Phần thưởng:** Rương ngọc trai tự động nổi lên mặt nước biển kèm tiếng ting vui vẻ, mở khóa cánh buồm hồng pastel mới [6, 161].
* **Ghi chú Code:** Lưu trữ tọa độ hòn đảo đã mở khóa trong bảng `world_progress` của Supabase để bé tiếp tục màn chơi cũ [161, 192].

#### 3. `gen_cloud_city_numbers` (Thành Phố Mây Số Học) [161]
* **Ý tưởng cốt lõi:** Bé xây dựng các bậc cầu thang mây lơ lửng để đưa chú thỏ béo bông xốp leo lên lâu đài trên không trung [161].
* **Tương tác Vật lý:** Bé kéo các khối mây mang thẻ số (Drag) đặt vào khoảng trống bị khuyết của cầu thang (Drop Zone) [5, 162].
* **Thuật toán Tạo sinh:** 
  * Tạo chuyển động mây trôi Parallax (3 lớp tốc độ khác nhau: 0.1x, 0.3x, 0.7x) bằng Framer Motion [162, 163].
  * Sử dụng phương trình sóng lượng giác dạng hình Sin để tạo hiệu ứng bập bềnh cho các khối mây:
    $$y_{\text{cloud}} = y_{\text{base}} + \sin(\text{time} \times \text{frequency} + \text{phase}) \times \text{amplitude}$$
* **Dạng toán áp dụng:** Dãy số cách đều, số liền trước/sau [2, 162].
* **Phần thưởng:** Chú thỏ nhún nhảy vẫy tai mừng rỡ (Lottie JSON), cầu vồng phép thuật sáng bừng [162, 220].
* **Ghi chú Code:** Giới hạn tối đa 6 khối mây tương tác đồng thời trên màn hình để tránh làm rối mắt trẻ [216, 231].

#### 4. `gen_crystal_cave_explorer` (Hang Pha Lê Toán Học) [163]
* **Ý tưởng cốt lõi:** Khám phá hang động bí ẩn chứa các thạch nhũ và tinh thể pha lê phát sáng, mỗi tinh thể đại diện cho một con số [163].
* **Tương tác Vật lý:** Bé chạm vào chiếc đèn pin ma thuật để quét luồng sáng (Hold & Hover) tìm ra viên pha lê chứa kết quả phép tính đúng [164, 221].
* **Thuật toán Tạo sinh:** 
  * Sử dụng **Radial Gradient** trong Canvas để mô phỏng quầng sáng tròn di chuyển theo ngón tay bé (Clipping Mask) [164].
  * Pha lê được vẽ bằng các đa giác 2D (Polygons) với số đỉnh ngẫu nhiên (từ 5-8 đỉnh) có phản chiếu ánh sáng lấp lánh [164].
* **Dạng toán áp dụng:** Phép trừ không mượn, tìm số còn thiếu trong phép toán [2, 164].
* **Phần thưởng:** Pha lê phát ra âm thanh nốt nhạc trong trẻo (mp3) và vỡ ra thành những hạt bụi sao lấp lánh [7, 164].
* **Ghi chú Code:** Đảm bảo độ tương phản màu sắc cao tại vùng được đèn pin soi để trẻ 6 tuổi dễ dàng đọc chữ số [164, 174].

#### 5. `gen_ocean_reef_math` (Rạn San Hô Toán Học) [165]
* **Ý tưởng cốt lõi:** Bé lặn xuống đáy đại dương, giúp robot cá dọn sạch rác thải nhựa và phục hồi rạn san hô lấp lánh [165].
* **Tương tác Vật lý:** Chạm trực tiếp vào các bong bóng khí đáp án nổi lên hoặc kéo rác thải nhựa vào giỏ phân loại [165, 166].
* **Thuật toán Tạo sinh:** 
  * Rong biển và san hô mềm được gieo mầm ngẫu nhiên theo L-System di chuyển uốn lượn dưới tác động của dòng nước (Sóng Sin thời gian thực) [165, 177].
  * Các chú cá cảnh bơi lượn tự sinh bằng giải thuật mô phỏng đàn bầy **Boids Algorithm** đơn giản (3 quy tắc: Cohesion, Separation, Alignment) [165, 166].
* **Dạng toán áp dụng:** Đếm số lượng sinh vật biển, so sánh nhiều/ít [2, 166].
* **Phần thưởng:** Đại dương xanh sạch, san hô đổi màu rực rỡ, chú rùa biển bơi ra chào bé [165, 177].
* **Ghi chú Code:** Giới hạn số lượng cá bơi tối đa 15 con để tránh nghẽn luồng xử lý của CPU [166].

#### 6. `gen_dinosaur_valley_math` (Thung Lũng Khủng Long Nhí) [166]
* **Ý tưởng cốt lõi:** Bé ấp và nuôi dưỡng các chú khủng long nhí siêu đáng yêu bằng cách giải toán để lấy thức ăn [167].
* **Tương tác Vật lý:** Bé đếm số dấu chân (Dinosaur Footprints) lún trên bùn đất hoặc kéo thức ăn vào miệng chú khủng long [167].
* **Thuật toán Tạo sinh:** 
  * Đường đi của thung lũng được vẽ bằng các đường cong **Cubic Bezier Curve** uốn lượn [172].
  * Phông nền núi lửa phun ra những đám mây khói trái tim màu hồng nhạt bằng hệ thống hạt (Particle System) Canvas [167, 175].
* **Dạng toán áp dụng:** Phép cộng trừ phạm vi 10, phân tích kích thước to/nhỏ [2, 168].
* **Phần thưởng:** Trứng khủng long nứt vỏ, khủng long con kêu ré lên vui sướng và tiến hóa lớn thêm 10% kích thước [167, 168].
* **Ghi chú Code:** Khủng long bắt buộc phải có thiết kế hoạt hình, tuyệt đối không vẽ khủng long hung dữ gây sợ hãi cho trẻ [168, 174].

#### 7. `gen_fairy_forest_quest` (Rừng Tiên Nhiệm Màu) [168]
* **Ý tưởng cốt lõi:** Bé đồng hành cùng cô tiên nhỏ thắp sáng những chiếc đèn lồng nấm thần kỳ dẫn lối xuyên qua rừng rậm mờ sương [168].
* **Vòng lặp gây cuốn:** Giải toán đúng -> nhận bụi tiên bay -> thắp sáng đèn lồng -> nấm phát triển -> sương mù tản ra mở lối đi mới [169].
* **Đồ hoạ tạo sinh:** Trình tạo đom đóm lơ lửng bằng hạt Canvas sáng nhấp nháy phát sương; L-System vẽ các rễ cây cổ thụ bò mềm ôm lấy màn hình [169].
* **Tương tác:** Chạm vào đèn lồng có số đúng hoặc vuốt màn hình để gom bụi tiên rơi rớt [169].
* **Dạng toán phù hợp:** Phép cộng trừ phạm vi 20 không nhớ, tìm số còn thiếu [169].
* **Phần thưởng:** Thú cưng thỏ con xuất hiện vẫy tai chào, sao lấp lánh tỏa sáng [12, 169].

#### 8. `gen_dragon_farm_math` (Nông Trại Rồng Con) [173]
* **Ý tưởng:** Bé xây dựng một nông trại nuôi dưỡng rồng con hiền lành [173]. Rồng sưởi ấm trứng bằng hơi thở phát sáng ấm áp và thu hoạch hoa quả ma thuật [173, 174].
* **Đồ hoạ tạo sinh:** Địa hình luống đất trồng trọt tự sinh theo dạng ô lưới (Tile grid) [174]; cây trái mọc tự động theo thuật toán Fractal L-System [174].
* **Tương tác:** Đếm số lượng trứng rồng lấp lánh trong ổ rơm [174]; kéo các xô nước tưới vào đúng số ô đất yêu cầu [174].
* **Dạng toán:** Phép toán cộng/trừ cơ bản; So sánh số lượng vật phẩm thu hoạch được [174].
* **Phần thưởng:** Quả chín trĩu cành ngọt ngào rụng xuống giỏ của bé, rồng con nhảy múa vui vẻ [174].

#### 9. `gen_weather_wizard_math` (Phù Thuỷ Thời Tiết) [175]
* **Ý tưởng:** Bé biến hóa thành một nhà thông thái, sử dụng năng lượng toán học điều khiển gió, mây, mưa, nắng để hồi sinh vương quốc đất cằn [175].
* **Đồ hoạ tạo sinh:** Bầu trời tạo sinh đa dạng; hạt mưa rơi mượt mà bằng Canvas 2D; hiệu ứng cầu vồng rực rỡ lấp lánh từ điểm tọa độ SVG [175].
* **Tương tác:** Kéo các đám mây sấm sét tích tụ đặt cạnh nhau để tạo phép cộng; chạm vào tia nắng rực rỡ phát ra đáp án [175].
* **Dạng toán:** Đo lường nhiệt độ, cộng trừ số tròn chục lặp lại [2, 176].
* **Phần thưởng:** Cây héo đâm chồi nảy lộc, cầu vồng đa sắc hiện ra rực rỡ, cô AI gửi lời khen ngọt ngào [175, 176].

#### 10. `gen_treasure_map_undersea` (Bản Đồ Kho Báu Dưới Biển) [176]
* **Ý tưởng:** Trải nghiệm cảm giác trở thành hải tặc nhí thám hiểm vùng biển sâu rực rỡ tìm kiếm kho báu ngọc trai bị lãng quên [176].
* **Đồ hoạ tạo sinh:** Bản đồ da cổ kính tự sinh các đường chấm tọa độ đứt quãng dựa theo Seed màn chơi [177]; rạn san hô mọc ngẫu nhiên [177].
* **Tương tác:** Chọn tọa độ lưới trục $X, Y$ đơn giản (Ví dụ: hàng 2 cột 3); kéo chìa khóa vàng bật mở rương kho báu lấp lánh ngọc [177].
* **Dạng toán:** Xác định vị trí tương đối, định hướng trái/phải, đếm ngọc trai [2, 177].
* **Phần thưởng:** Rương vàng mở nắp tỏa ánh hào quang sáng chói, bé nhận 50 xu vàng và một chú pet rùa nhỏ [177].

---

### 2.2. Nhóm Đô thị, Công nghệ & Đồ chơi (Urban, Tech & Toys)

#### 11. `gen_toy_factory_automata` (Nhà Máy Đồ Chơi Tự Động) [170]
* **Ý tưởng:** Bé trở thành quản đốc vận hành các băng chuyền robot để lắp ráp gấu bông và xe đồ chơi [170].
* **Đồ hoạ tạo sinh:** Băng chuyền chuyển động liên tục bằng CSS Keyframes [170]; các bánh răng (Gears) lồng khớp xoay tròn đồng bộ bằng thuật toán tính toán vận tốc góc [170]:
  $$\omega_2 = -\omega_1 \times \left(\frac{R_1}{R_2}\right)$$
* **Tương tác:** Kéo thả gấu bông vào các hộp carton dán nhãn số lượng yêu cầu [171].
* **Dạng toán:** Phân loại đồ vật, đếm số lượng, cân bằng số lượng hai bên [2, 171].
* **Phần thưởng:** Robot bắn pháo hoa giấy chúc mừng bé, hộp quà thắt nơ hồng xinh xắn bật ra [171].

#### 12. `gen_robot_city_constructor` (Thành Phố Robot Toán Học) [178]
* **Ý tưởng:** Bé đồng hành cùng các chú robot thông minh xây dựng những tòa nhà chọc trời phát ánh đèn Neon dịu nhẹ [178].
* **Đồ hoạ tạo sinh:** Khối thành phố sinh theo dạng gạch đa sắc (Tiles block); hệ thống dây điện phát sáng kết nối các trạm biến áp [178, 179].
* **Tương tác:** Sắp xếp các chú robot có chiều cao tăng dần; kéo viên pin năng lượng vào lõi nguồn trung tâm [179].
* **Dạng toán:** Đo độ dài bằng cm, so sánh số đến 100, cấu tạo số chục/đơn vị [2, 179].
* **Phần thưởng:** Thành phố bật đèn sáng lung linh huyền ảo, robot bay lượn trên không trung [178, 179].

#### 13. `gen_candy_biome_world` (Thế Giới Kẹo Tự Sinh) [179]
* **Ý tưởng:** Thế giới ngọt ngào với đồi bánh quy sô-cô-la gợn sóng, dòng sông kem dâu và những cây kẹo mút khổng lồ [180].
* **Đồ hoạ tạo sinh:** Cây kẹo mút vẽ bằng SVG lấp lánh; hiệu ứng hạt đường rắc màu sắc pastel tỏa ra khi bé tương tác [180].
* **Tương tác:** Kéo các viên kẹo dẻo màu sắc rực rỡ vào những chiếc lọ thủy tinh ghi nhãn số đúng [180].
* **Dạng toán:** Đếm lượng kẹo, gộp nhóm kẹo mút, tìm quy luật màu sắc xen kẽ [2, 180].
* **Phần thưởng:** Dòng sông chocolate gợn sóng vui vẻ, bé thu hoạch được kẹo gấu rực rỡ dán vào bảng sticker [180, 181].

#### 14. `gen_storybook_popup_world` (Sách Bật Nổi Toán Học) [184]
* **Ý tưởng:** Mỗi level toán được thiết kế như một trang sách cổ tích 3D bật nổi [184]. Khi bé giải đúng, trang sách lật và các mô hình 2.5D tự động mở dựng đứng lên [184, 185].
* **Đồ hoạ tạo sinh:** Mô phỏng nếp lật giấy bằng thuật toán ma trận biến đổi 3D CSS; bối cảnh trang sách vẽ bằng nhiều lớp giấy cắt xếp chồng (Layered Papercut Style) [185].
* **Tương tác:** Nhấn nút loa nghe cô AI kể một câu chuyện siêu ngắn cá nhân hóa [185]; kéo đáp án điền vào chỗ trống trong đoạn hội thoại [185].
* **Dạng toán:** Toán đố có lời văn thực tế lồng ghép sở thích bé [2, 185].
* **Phần thưởng:** Trang sách tỏa ánh bụi vàng lấp lánh, nhân vật trong truyện cử động nhảy múa [185].

#### 15. `gen_number_maze` (Mê Cung Số Tự Tạo) [186]
* **Ý tưởng:** Bé dẫn lối cho bạn mèo bông tìm đường thoát khỏi mê cung đá lấp lánh bằng cách dẫm lên các ô số đúng [183, 186].
* **Đồ hoạ tạo sinh:** Mê cung ngẫu nhiên được kiến tạo bằng thuật toán **DFS (Depth-First Search) Backtracking** bảo đảm luôn có duy nhất một đường thoát khả thi [186, 187].
* **Tương tác:** Chạm vào các ô số liền kề để vẽ đường cho mèo di chuyển mượt mà [186].
* **Dạng toán:** Dãy số tăng dần cách đều, tìm đường số chẵn/lẻ [2, 187].
* **Phần thưởng:** Mèo béo nhảy mừng rỡ bám lên màn hình dẫm dấu chân thỏ bông, mở rương nhận huy hiệu mê cung [183, 187].

#### 16. `gen_festival_parade_math` (Lễ Hội Diễu Hành Toán Học) [187]
* **Ý tưởng:** Bé làm tổng đạo diễn thiết kế đoàn xe diễu hành lễ hội rực rỡ đi qua quảng trường lâu đài [187].
* **Đồ hoạ tạo sinh:** Đoàn người diễu hành và các xe hoa được lắp ghép ngẫu nhiên từ thư viện module hình ảnh màu sắc pastel bắt mắt [188].
* **Tương tác:** Sắp xếp thứ tự các toa xe hoa theo chữ số; chạm nổ các quả bóng bay mang đáp án sai [188].
* **Dạng toán:** Thứ tự số, so sánh phép toán, nhận diện hình dạng bóng bay [2, 188].
* **Phần thưởng:** Pháo hoa giấy confetti nổ rực rỡ ngập tràn màn hình kèm tiếng nhạc kèn vui nhộn [188].

#### 17. `gen_dream_room_builder` (Phòng Mơ Ước Cá Nhân Hoá) [189]
* **Ý tưởng:** Bé tự do mua sắm và trang trí căn phòng học tập ma thuật của mình bằng xu vàng tích lũy [189].
* **Đồ hoạ tạo sinh:** Hệ thống bố trí nội thất theo lưới tọa độ isometric 2.5D; vật trang trí tự động căn chỉnh khoảng cách an toàn [189, 190].
* **Tương tác:** Kéo thả thảm trải sàn, giường ngủ kỳ lân hay gấu bông dễ thương đặt vào vị trí yêu thích [189, 190].
* **Dạng toán:** Thống kê số lượng vật phẩm trong phòng, bài toán thực tế chi tiêu mua sắm coin [2, 190].
* **Phần thưởng:** Chú mèo béo Lottie nhảy lên giường nằm ngủ say sưa, căn phòng đổi màu rực rỡ [176, 190].

#### 18. `gen_time_portal_math` (Cổng Thời Gian Toán Học) [181]
* **Ý tưởng:** Bé kích hoạt chiếc đồng hồ cổ tích khổng lồ để triệu hồi cổng không gian du hành xuyên thời gian [181, 182].
* **Đồ hoạ tạo sinh:** Vòng quay cổng ma thuật animated xoáy mượt mà bằng Canvas 2D; phong cảnh nền thay đổi biến ảo từ khủng long sang vũ trụ [182].
* **Tương tác:** Quay kim đồng hồ lớn đến đúng vị trí giờ yêu cầu để tích tụ năng lượng [182].
* **Dạng toán:** Nhận biết giờ đúng trên đồng hồ kim, phân biệt ngày/đêm [2, 182].
* **Phần thưởng:** Cổng không gian bừng sáng lộng lẫy, đưa bé đến vùng đất mới dán sticker cổ đại [182].

#### 19. `gen_mini_zoo_ecosystem` (Vườn Thú Tự Sinh) [183]
* **Ý tưởng:** Bé trở thành quản lý sở thú nhỏ, thiết lập môi trường sống và chăm sóc cho các loài thú cưng dễ thương [183].
* **Đồ hoạ tạo sinh:** Bản đồ phân luống động; rào chắn và cây xanh tự động mọc quanh vị trí đặt chuồng thú [183].
* **Tương tác:** Kéo đúng số lượng củ cà rốt cho thỏ bông ăn; đếm xem chuồng sư tử hay chuồng thỏ có số thú nhiều hơn [183].
* **Dạng toán:** So sánh số lượng vật phẩm, đếm đồ vật rời rạc phạm vi 10 [2, 183].
* **Phần thưởng:** Thú cưng vui vẻ phát ra tiếng kêu dễ thương, mở khóa thêm bạn gấu koala hiếm [183, 184].

#### 20. `gen_candy_symphony` (Dàn Nhạc Bánh Kẹo) [155, 180]
* **Ý tưởng:** Biến các viên kẹo ngọt thành các phím đàn piano ma thuật, bé gõ kẹo đúng nhịp toán học để tạo nên giai điệu vui tươi [180].
* **Đồ hoạ tạo sinh:** Bàn nhạc kẹo mút phát sáng; các nốt nhạc bay lên theo đường cong lượn sóng Canvas [175, 180].
* **Tương tác:** Chạm đúng viên kẹo đáp án trùng khớp với nhịp phách của cô giáo AI [180].
* **Dạng toán:** Quy luật dãy số, đếm nhịp phách, nhận diện hình khối bánh kẹo [2, 180].
* **Phần thưởng:** Bản nhạc sôi động vang lên mượt mà, thú cưng lắc lư nhảy múa đồng bộ [176, 180].

---

## CHƯƠNG III: 10 GAME MODES BỔ SUNG ĐỒ HỌA TẠO SINH CAO CẤP (SUPPLEMENTARY)

Nhóm 10 Game Modes này được đặc tả dựa trên phân hệ đồ họa tự sinh cao cấp từ tài liệu PDF bổ sung đồ họa ma thuật [204].

### 1. `Math Kingdom Builder` (Xây Dựng Vương Quốc Toán Học) [212, 222]
* **Ý tưởng cốt lõi:** Bé xây dựng một lâu đài hoàng gia tráng lệ giữa một thung lũng xanh mướt ngập tràn cỏ hoa bằng cách giải đúng các câu đố phép tính [204, 222].
* **Đồ hoạ tạo sinh:** 
  * Đường đi bằng gạch đá, cầu gỗ bắc qua sông và thềm móng lâu đài tự động vẽ bằng SVG từ Seed [213, 222].
  * Cỏ cây, bụi hoa lấp lánh xung quanh mọc tự sinh bằng thuật toán Fractal L-System [215, 222].
* **Tương tác:** Bé giải toán để nhận gạch/gỗ ma thuật [223]. Nhấp giữ vật liệu kéo thả trực tiếp vào tòa tháp đang xây để tăng tiến trình hoàn thiện công trình [223].
* **Dạng toán:** Phép cộng trừ tròn chục phạm vi 100 [2, 213].
* **Phần thưởng:** Lâu đài mọc cao thêm, quốc kỳ tung bay trước gió, thợ xây tí hon nhảy lò cò vỗ tay reo hò [220, 223].
* **Ghi chú Code:** Trạng thái vương quốc lưu trữ dưới dạng JSONB trong bảng `world_progress` của Supabase (`buildings_state`) [192, 232].

### 2. `Pet Evolution Math` (Tiến Hóa Thú Cưng) [212, 223]
* **Ý tưởng cốt lõi:** Nuôi dưỡng một bạn pet dễ thương (Mèo béo, Thỏ nhí hoặc Kỳ lân) từ trạng thái quả trứng phép thuật đến lúc trưởng thành thông qua học toán [160, 223].
* **Đồ hoạ tạo sinh:** 
  * Giao diện phòng pet ấm áp tự sinh các đồ vật chơi, thảm nằm và rèm cửa phù hợp với Theme sở thích của con [160, 223].
  * Các biểu cảm gương mặt thú cưng biến chuyển mượt mà (chớp mắt, ngáp ngủ, vẫy tai) bằng tệp chuyển động Lottie [220, 223].
* **Tương tác:** Bé giải đúng câu đố toán để nhận sữa, kẹo sao hoặc bánh bông lan; kéo đồ ăn đặt vào bát của thú cưng [10, 223].
* **Dạng toán:** Đếm đồ vật, phân chia thức ăn bằng nhau, cộng trừ đơn vị lẻ phạm vi 20 [2, 223].
* **Phần thưởng:** Thú cưng nhảy vòng quanh, tỏa ánh sáng vàng ma thuật bọc quanh người và biến hình tiến hóa sang cấp độ tiếp theo cực đẹp [221, 223].
* **Ghi chú Code:** Toàn bộ lịch sử chăm sóc và chỉ số thân thiện (`care_points`) lưu đồng bộ theo `child_id` [184, 223].

### 3. `Math Adventure Map` (Bản Đồ Phiêu Lưu Kỳ Thú) [212, 223]
* **Ý tưởng cốt lõi:** Bản đồ thế giới cuộn dọc mở ra một hành trình thám hiểm vĩ đại đi qua các vùng đất thần tiên [173, 223, 224].
* **Đồ hoạ tạo sinh:** 
  * Đường mòn dẫn lối uốn lượn uốn quanh đồi núi Parallax, sông ngòi và các cây cầu gỗ tự sinh hoàn toàn [214, 224].
  * Các chặng bài học (Nodes) được kết nối mạch lạc dưới dạng biểu đồ đồ thị tự động rải đá sỏi phát sáng [173, 224].
* **Tương tác:** Bé chạm vào nốt tròn level phát sáng để mở khóa bài học; vuốt nhẹ bản đồ để di chuyển góc nhìn camera [224].
* **Dạng toán:** Tổng hợp toàn bộ kiến thức toán lớp 1 theo lộ trình sư phạm [2, 224].
* **Phần thưởng:** Avatar tí hon của bé tự động nhảy lò cò dọc theo đường sỏi mòn ga kế tiếp, rương báu bí mật hiện ra lấp lánh [173, 224].
* **Ghi chú Code:** Tối ưu hóa bộ nhớ đệm (Cache) bản đồ bằng cách lưu trữ tọa độ node sinh sẵn để tránh re-render liên tục gây giật lag [231, 232].

### 4. `Magic Shop Math` (Cửa Hàng Phép Thuật) [219, 224]
* **Ý tưởng cốt lõi:** Bé làm trợ lý cho cô phù thủy nhỏ vận hành một tiệm tạp hóa bán dược liệu ma thuật, bột phát sáng và chổi bay [224].
* **Đồ hoạ tạo sinh:** Kệ gỗ trưng bày hàng hóa tự động sắp xếp các loại bình thủy tinh đựng nước phép có hình thù độc lạ, khói pastel bay lên [214, 224].
* **Tương tác:** Quan sát yêu cầu số lượng của khách hàng (Lottie NPC) [224]. Bé kéo đúng số bình nước phép đặt vào giỏ hàng hoặc gộp các đồng xu vàng ma thuật thanh toán tiền [224].
* **Dạng toán:** Đếm số, toán mua bán tiền xu mệnh giá lẻ 1k, 2k, 5k, 10k [2, 224].
* **Phần thưởng:** Khách hàng Lottie cười híp mắt nhận đồ và vẫy tay chào, rương tiền lẻ kêu leng keng vui tai [224].

### 5. `Detective Math Mystery` (Thám Tử Nhí Tìm Manh Mối) [219, 225]
* **Ý tưởng cốt lõi:** Hóa thân thành thám tử Sherlock Holmes nhí đi tìm dấu chân mèo và giải mã mật thư để khám phá ra phòng kho báu bị khóa kín [225].
* **Đồ hoạ tạo sinh:** Phòng thám tử mờ sương cổ kính, bảng ghim manh mối tự động vẽ các đường nối chỉ đỏ liên kết các thẻ ảnh chứng cứ [225].
* **Tương tác:** Bé dùng kính lúp ảo rà soát khắp phòng (Hover/Swipe) [225]. Khi phát hiện ra phép toán, bé giải đúng để ghim tấm thẻ manh mối lên bảng ghim dây đỏ [225].
* **Dạng toán:** Tư duy logic, quy luật số, so sánh kích cỡ bóng đổ vật thể [2, 225].
* **Phần thưởng:** Mật thư tự động giải mã, mở khóa cánh cửa bí ẩn dẫn sang căn phòng kho báu ngập tràn kim cương [225].

### 6. `RhythmMath Dance` (Vũ Điệu Nhịp Phách Toán Học) [219, 225]
* **Ý tưởng cốt lõi:** Trò chơi kết hợp nhịp điệu âm nhạc vui nhộn, giúp bé rèn luyện phản xạ tính nhẩm nhanh nhạy dưới ánh đèn sân khấu [225].
* **Đồ hoạ tạo sinh:** Sân khấu vũ hội sáng bừng đèn rọi đa sắc; loa nhạc rung rinh nhịp nhàng theo tần số sóng âm (Audio visualizer SVG path) [225].
* **Tương tác:** Các bong bóng chứa kết quả phép toán trôi nổi lên theo nhịp phách nhạc [226]. Bé nhanh tay chạm vỡ bong bóng đáp án đúng trước khi nó bay biến mất khỏi màn hình [226].
* **Dạng toán:** Phép tính nhẩm cộng trừ nhanh phạm vi 10 [2, 226].
* **Phần thưởng:** Tạo chuỗi chính xác liên tiếp (Combo), kích hoạt hiệu ứng cầu vồng nhảy múa, nhân vật reo hò [226].
* **Ghi chú Code:** Nếu bé trả lời sai 2 lần liên tiếp, nhịp phách nhạc tự động giảm tốc 30% để trẻ dễ dàng điều chỉnh phản xạ tư duy [226].

### 7. `Math Cooking Lab` (Bếp Thực Thần Ma Thuật) [219, 226]
* **Ý tưởng cốt lõi:** Bé đóng vai đầu bếp nhí, cân đong đo đếm nguyên liệu ma thuật như dâu tây tuyết, sữa kỳ lân để chế biến ra chiếc bánh gatô rực rỡ [160, 226].
* **Đồ hoạ tạo sinh:** Bàn bếp ấm cúng tự động trưng bày các kệ lọ đựng gia vị ma thuật đầy sắc màu pastel, lò nướng bốc khói hình ngôi sao [214, 226].
* **Tương tác:** Bé kéo và thả chính xác số quả dâu tây tuyết hay lát bánh quy sô-cô-la đặt vào lòng chiếc nồi nấu ma thuật đang sôi sùng sục [226].
* **Dạng toán:** Phép cộng gộp nhiều đối tượng đơn lẻ, đọc đong thể tích [2, 226].
* **Phần thưởng:** Chiếc bánh ngọt ma thuật thơm ngon hiện ra tỏa hào quang cầu vồng lấp lánh, bé tự do dán sticker kẹo ngọt lên bánh để trang trí [226].

### 8. `Space Rescue Math` (Giải Cứu Phi Hành Gia Vũ Trụ) [219, 227]
* **Ý tưởng cốt lõi:** Bé lái phi thuyền không gian bay qua dải ngân hà rộng lớn, nạp pin năng lượng để mở khóa cổng sao giải cứu chú phi hành gia mèo bị lạc [160, 227].
* **Đồ hoạ tạo sinh:** Nền không gian sâu thẳm mờ ảo với dải tinh vân màu xanh tím pastel tự sinh ngẫu nhiên, các thiên thạch bay lơ lửng [213, 227].
* **Tương tác:** Giải đúng câu đố toán để nạp đầy pin năng lượng; nhấn giữ kéo pin ma thuật đặt vào lò phản lực của tàu không gian [227].
* **Dạng toán:** Đếm chục tròn, so sánh cấu tạo số hàng chục và đơn vị lẻ [2, 227].
* **Phần thưởng:** Tàu không gian kích tốc vượt qua lỗ đen vũ trụ phát sáng lộng lẫy, mở khóa cổng sao cứu được bạn mèo béo [176, 227].

### 9. `Puzzle Room Math` (Phòng Mật Mã Thử Thách) [219, 227]
* **Ý tưởng cốt lõi:** Bé bị lạc vào một phòng thí nghiệm bỏ hoang chứa rương mật mã khóa, bé phải tìm các manh mối toán học để mở khóa cánh cửa thoát hiểm [227].
* **Đồ hoạ tạo sinh:** Căn phòng được dựng tự động bằng các đa giác SVG phẳng; các đồ vật lấp lánh nhẹ nhấp nháy thu hút sự chú ý của bé An Nhiên [214, 228].
* **Tương tác:** Chạm vào bức tranh treo tường, đồng hồ quả lắc hay ngăn kéo tủ sách để phát hiện ra phép toán ẩn giấu; xoay các vòng xoay số để nhập mật mã đúng [228].
* **Dạng toán:** Phép tính ẩn số, tìm quy luật lặp hình học [2, 228].
* **Phần thưởng:** Ổ khóa sắt rỉ sét bật mở tung kèm hiệu ứng ánh sáng rực rỡ, cánh cửa gỗ hé mở đưa bé ra ngoài an toàn [6, 228].

### 10. `AI Co-op Boss Battle` (Liên Minh Đánh Boss Đáng Yêu) [219, 228]
* **Ý tưởng cốt lõi:** Trận đấu boss mini liên hoàn cuối tuần đầy kịch tính [228]. Bé sát cánh cùng cô giáo gia sư AI vượt qua chú rồng đất khổng lồ ham ăn đang chặn đường [155, 228].
* **Đồ hoạ tạo sinh:** Đấu trường rực rỡ cờ hoa diễu hành; boss rồng đất khổng lồ có thanh máu và tim đập phập phồng (Lottie JSON) [228].
* **Tương tác:** Mỗi lần bé giải đúng một câu toán trong chuỗi câu hỏi thử thách liên tục, bé sẽ ném một quả bóng màu sắc ma thuật làm boss rồng đất bị mất 1 tim [8, 228].
* **Dạng toán:** Tổng hợp toán học lớp 1 nâng cao phản xạ [2, 228].
* **Phần thưởng:** Boss rồng đất bị khuất phục ngã lăn ra cười hớn hở, rụng rương kho báu vàng lấp lánh tự động bung nắp chúc mừng bé [8, 228].

---

## CHƯƠNG IV: 10 GAME MODES TIÊU CHUẨN ÔN LUYỆN NHẸ NHÀNG (STANDARD)

Nhóm 10 Game Modes này được đặc tả theo chuẩn giao diện thành phần (UI Components) cơ bản của Next.js và Tailwind CSS, không áp dụng công nghệ đồ họa tạo sinh phức tạp [157]. Thiết kế này tối ưu hóa tuyệt đối tốc độ tải trang, chạy siêu mượt trên các thiết bị di động cấu hình yếu và chuyên trị cho các phân hệ ôn tập nhanh, làm bài tập về nhà hoặc kiểm tra lỗi sai [157, 191].

### 1. `std_flashcard_sprint` (Thẻ Nhanh 3 Phút) [191]
* **Mục tiêu:** Rèn luyện phản xạ tính toán nhanh hằng ngày thông qua việc lật các thẻ số ma thuật [191].
* **Giao diện:** Nền tối giản màu trắng mờ (Glassmorphism), hiển thị một thẻ bài lớn bo góc tròn ở trung tâm màn hình, bên dưới là 4 thẻ đáp án số sắc nét [191].
* **Tương tác:** Chạm trực tiếp vào nút đáp án đúng (Tap Choice) [4, 191]. Thẻ bài chính lật ngược mượt mà góc 180 độ sang câu hỏi tiếp theo bằng hiệu ứng CSS lật mặt sau [255].
* **Dạng toán:** Phép tính nhẩm cộng/trừ cơ bản phạm vi 10, tìm số liền trước/sau [2, 191].
* **Phần thưởng:** Cộng 5 XP cho mỗi câu đúng, hiển thị thanh tiến độ lấp lánh [191].

### 2. `std_quiz_ladder` (Leo Thang Câu Hỏi) [192]
* **Mục tiêu:** Thử thách leo núi leo bậc thang, nâng cao động lực vượt qua giới hạn bản thân của bé [192].
* **Giao diện:** Bên trái màn hình hiển thị một nấc thang gỗ có 10 bậc dán nhãn từ 1 đến 10 [192]. Ở chân cầu thang là biểu tượng avatar chú mèo béo Lottie của bé [192]. Ở đỉnh thang là ngôi sao vàng khổng lồ lấp lánh phát sáng [192].
* **Tương tác:** Trả lời câu hỏi toán học lớn ở trung tâm [192]. Mỗi câu đúng đưa avatar chú mèo bông nhảy lò cò leo lên thêm một nấc cầu thang [192].
* **Dạng toán:** Toán tổng hợp theo từng chương học phần [2, 192].
* **Phần thưởng:** Khi leo lên nấc 10 (hoàn thành chuỗi 10 câu đúng), bé giành được Ngôi sao vàng lớn cùng 30 xu vàng rực rỡ [192].

### 3. `std_matching_cards` (Lật Thẻ Ghép Cặp) [193]
* **Mục tiêu:** Rèn luyện trí nhớ không gian ngắn hạn và khả năng liên kết toán học trực quan [193].
* **Giao diện:** Lưới 6 thẻ bài hoặc 12 thẻ bài úp sấp, thiết kế phẳng pastel xinh xắn xếp gọn gàng [193].
* **Tương tác:** Bé chạm vào hai thẻ bất kỳ để lật ngửa chúng lên [193]. Nếu hai thẻ tương thích nhau (Ví dụ: một thẻ ghi phép toán `3 + 2` và một thẻ vẽ hình `5 quả táo`), chúng sẽ sáng bừng sao vàng biến mất khỏi lưới [193]. Nếu không khớp, chúng sẽ tự động úp sấp lại sau 1 giây [193].
* **Dạng toán:** Ghép đôi phép tính và đáp án số, ghép số và nhóm đồ vật đếm [2, 193].
* **Phần thưởng:** Nhận sao vàng kỷ niệm ghi nhớ siêu phàm [193].

### 4. `std_drag_worksheet` (Phiếu Bài Tập Kéo Thả) [194]
* **Mục tiêu:** Số hóa các phiếu bài tập trên giấy truyền thống thành giao diện kéo thả tương tác mượt mà [194].
* **Giao diện:** Thiết kế sạch sẽ mô phỏng trang vở kẻ ô ly của bé [194]. Trên vở có in các phép toán còn khuyết ô trống dạng nét đứt khúc, bên dưới là khay đựng các hạt gỗ khắc chữ số [194].
* **Tương tác:** Bé nhấp giữ hạt gỗ chữ số kéo thả trực tiếp thả vào ô trống khuyết điểm của phép toán [194].
* **Dạng toán:** Điền số khuyết, chọn dấu phép tính so sánh `>`, `<`, `=` thích hợp [2, 194].
* **Phần thưởng:** Đóng dấu sticker "Đạt điểm 10 đỏ chói" dễ thương lên trang giấy kèm lời khen ngọt ngào [194, 254].

### 5. `std_audio_math` (Nghe Hiểu Số Học) [195]
* **Mục tiêu:** Giúp trẻ 6 tuổi chưa thông thạo mặt chữ vẫn có thể tự lập học tập thông qua phát triển thính giác [195].
* **Giao diện:** Biểu tượng loa phát âm lớn màu cam rực rỡ ở trung tâm màn hình nhấp nháy vòng sóng âm, xung quanh là 4 phương án lựa chọn số [195].
* **Tương tác:** Bé nhấn nút loa nghe cô AI đọc chậm rãi câu chuyện toán đố bằng giọng dịu dàng ấm áp [195]. Bé suy nghĩ đếm và chọn đáp án số tương thích bên dưới [195].
* **Dạng toán:** Toán đố kể chuyện đời sống thực tế phạm vi 10 [2, 195].
* **Phần thưởng:** Huy hiệu "Đôi tai vàng thông thái", lời khen trực tiếp từ cô AI [195].

### 6. `std_error_clinic` (Phòng Khám Lỗi Sai) [196]
* **Mục tiêu:** Thuật toán cá nhân hóa thông minh gom toàn bộ lịch sử các câu bé làm sai để ôn luyện lại triệt để [196].
* **Giao diện:** Thiết kế giao diện như một phòng khám đa khoa ma thuật cho thú cưng bị ốm [196]. Mỗi một vết sai của con được ví như một bạn mèo bông bị trầy xước cần dán băng cá nhân [196].
* **Tương tác:** Bé làm lại đúng câu hỏi tương tự câu đã làm sai để bôi thuốc và dán băng cá nhân cho mèo bông [196].
* **Dạng toán:** Ôn tập toàn diện các lỗi sai đã lưu trong bảng `question_logs` của cơ sở dữ liệu [196, 250].
* **Phần thưởng:** Chữa trị khỏi bệnh cho mèo béo, chú mèo nhảy nhót vẫy tai mừng rỡ, bé nhận điểm thành thạo kỹ năng vượt trội [196, 220].

### 7. `std_mini_exam` (Kiểm Tra Đánh Giá Đầu Ra) [197]
* **Mục tiêu:** Đánh giá định kỳ năng lực tư duy toán học chuẩn sư phạm của bé sau mỗi tuần học [197].
* **Giao diện:** Thanh tiến trình 10 câu hỏi chạy ngang phía trên màn hình [197]. Giao diện sạch sẽ, loại bỏ bớt các chi tiết hoạt hình rườm rà gây phân tâm để trẻ tập trung cao độ làm bài [197, 198].
* **Tương tác:** Thao tác chọn đáp án trắc nghiệm hoặc nhập số liên tiếp, không có giới hạn thời gian gây áp lực [197].
* **Dạng toán:** Kiểm tra tổng hợp kiến thức tổng quát của level hiện tại [2, 197].
* **Phần thưởng:** Báo cáo điểm số trực quan xuất sắc cho bố mẹ kèm đề xuất kỹ năng cần cải thiện [198, 259].

### 8. `std_parent_assignment` (Nhiệm Vụ Bố Mẹ Giao) [198]
* **Mục tiêu:** Tăng cường sự kết nối tương tác học tập tích cực giữa phụ huynh và con cái [198].
* **Giao diện:** Bảng Checklist nhiệm vụ hằng ngày treo trên tường gỗ mộc mạc xinh xắn, dán sticker các việc bố mẹ giao [199].
* **Tương tác:** Bé nhấn nút "Bắt đầu làm" kế bên mỗi dòng nhiệm vụ để thực hiện học [199].
* **Dạng toán:** Bài học tùy chọn do phụ huynh trực tiếp chỉ định trên Dashboard của mình [2, 199].
* **Phần thưởng:** Phần quà thực tế do chính phụ huynh tự thiết lập thưởng ngoài đời (Ví dụ: "Đi chơi công viên", "Ăn một cây kem dâu") [199, 238].

### 9. `std_number_trace` (Tập Viết Số Ma Thuật) [199]
* **Mục tiêu:** Rèn luyện kỹ năng cơ học cơ bản của ngón tay trẻ 6 tuổi, chuẩn bị tốt kỹ năng viết chữ số lên lớp 1 [200].
* **Giao diện:** Hiển thị một chữ số lớn chiếm trọn màn hình, được vẽ đứt khúc kèm theo các mũi tên động hướng dẫn thứ tự các nét vẽ tay [200].
* **Tương tác:** Bé đặt ngón tay lên màn hình và kéo (Swipe) miết dọc theo đường nét đứt khúc ma thuật [200]. Nét vẽ của bé tỏa ra hiệu ứng "bụi tiên lấp lánh" Canvas rực rỡ [200].
* **Dạng toán:** Nhận diện chữ số và tập viết chữ số từ 0 đến 9 [2, 200].
* **Phần thưởng:** Chữ số bừng sáng rực rỡ chuyển động nhún nhảy, dán sticker viết đẹp [200].

### 10. `std_sticker_board` (Bảng Sticker Thành Tích) [201]
* **Mục tiêu:** Nuôi dưỡng cảm xúc thành công ấm áp và khép lại buổi học hằng ngày đầy niềm vui thích của con [201].
* **Giao diện:** Bảng gỗ phong cách dã ngoại ngoài trời lộng gió rực nắng, mở khóa kho sticker hoạt hình lấp lánh xinh tươi [201].
* **Tương tác:** Trả lời 3 câu hỏi toán học siêu nhẹ cuối ngày để nhận sticker búp bê, thỏ bông hay kỳ lân; bé tự ý chạm kéo sticker dán vào bất kỳ vị trí nào trên bảng gỗ của mình [201].
* **Dạng toán:** Ôn tập nhẹ nhàng, trò đố vui đếm hoa lá [2, 201].
* **Phần thưởng:** Lưu ảnh chụp tấm bảng sticker cá nhân lưu niệm gửi thẳng về điện thoại cho bố mẹ khen ngợi con [201].

---

## CHƯƠNG V: MA TRẬN PHÂN BỔ & TƯƠNG THÍCH MÔN HỌC

Để tối đa hóa hiệu năng và chất lượng sư phạm, Kỹ sư Lập trình AI cần cài đặt ma trận tương thích phân bổ 40 Game Modes vào 3 môn học Toán, Tiếng Anh và Tiếng Việt theo cấu trúc phân kỳ phát triển sau [202, 235]:

### 5.1. Phân kỳ Triển khai Cuốn chiếu (Implementation Phases) [202, 274]
* **Giai đoạn 1: MVP Tĩnh Nền tảng (Tuần 1-2):** Triển khai hệ thống Database Supabase hoàn chỉnh [270]. Lập trình 10 Game Modes thường (`std_*`) để có ngay app kiểm thử, con học được và bố mẹ giám sát được tiến trình thực tế [202, 274].
* **Giai đoạn 2: Phiêu lưu & Đồ họa Tạo sinh Cơ bản (Tuần 3-4):** Tích hợp bản đồ phiêu lưu `Math Adventure Map` [223] và cài đặt 10 Game Modes tạo sinh cơ bản của thiên nhiên (`gen_living_math_garden`, `gen_infinite_island_archipelago`, `gen_cloud_city_numbers`...) [202, 275].
* **Giai đoạn 3: Hoàn thiện Game hóa Cao cấp & Trí tuệ Nhân tạo (Tuần 5-6):** Hoàn thiện 10 Game Modes đồ họa tạo sinh bổ sung cao cấp (`Math Kingdom Builder`, `AI Co-op Boss Battle`...) [202, 275]. Tích hợp AI sinh cốt truyện cổ tích toán học cá nhân hóa thời gian thực [185, 275].

### 5.2. Bảng Ma trận Áp dụng Game Modes cho Triple-Subject (Toán - Anh - Việt) [202, 235]

| Mã Game Mode | Toán học Lớp 1 (Phù hợp) [2] | Tiếng Anh Phonics & Từ Vựng [242] | Tiếng Việt Âm Vần & Dấu Thanh [247] |
| :--- | :--- | :--- | :--- |
| `gen_living_math_garden` | Đếm hạt quả, Cộng/trừ gộp [159] | Ghép từ vựng chủ đề Hoa Quả [242] | Nhận diện chữ cái gieo mầm [247] |
| `gen_infinite_island_archipelago` | So sánh số lượng, Thứ tự dãy số [160] | Tìm từ vựng thuộc nhóm Biển cả [242] | Đọc trơn từ ghép ghép đảo [247] |
| `gen_cloud_city_numbers` | Điền số khuyết bậc thang [162] | Tìm từ đồng nghĩa/trái nghĩa m Clouds [244] | Đánh vần chữ cái bay m Clouds [247] |
| `gen_crystal_cave_explorer` | Phép toán ẩn số pha lê [164] | Soi đèn tìm từ vựng trong tối [243] | Ghép phụ âm đơn khuất [247] |
| `gen_ocean_reef_math` | Đếm cá biển, so sánh nhiều/ít [166] | Học từ vựng Con vật dưới nước [242] | Phân biệt phụ âm ghép ch/tr [247] |
| `gen_dinosaur_valley_math` | Cộng trừ phạm vi 20 không nhớ [168] | Tìm từ vựng tiếng Anh Dinosaur [242] | Đọc hiểu câu chuyện thung lũng [247] |
| `gen_fairy_forest_quest` | Phép toán logic tìm quy luật [169] | Học từ vựng Trái cây, Màu sắc [242] | Đánh vần tiếng đơn giản [247] |
| `gen_toy_factory_automata` | Đếm đồ vật, phân loại đồ chơi [171] | Từ vựng đồ chơi: ball, teddy bear [242] | Điền chữ cái khuyết tên đồ vật [247] |
| `gen_train_route_builder` | Thứ tự dãy số, cộng toa tàu [173] | Sắp xếp từ thành câu đơn giản [244] | Nối từ vựng tạo câu có nghĩa [247] |
| `gen_dragon_farm_math` | Đếm trứng rồng, cộng trừ phạm vi 10 | Từ vựng nông trại: dragon, egg [242] | Đọc hiểu văn bản mô tả rồng [247] |
| `gen_weather_wizard_math` | So sánh kích cỡ, đo lường nhiệt độ [176] | Từ vựng thời tiết: sunny, rainy [242] | Điền dấu thanh Sắc/Huyền/Hỏi [247] |
| `gen_treasure_map_undersea` | Trục tọa độ ngang dọc đơn giản [177] | Đọc hiểu chỉ dẫn hướng đi bản đồ [243] | Phân biệt âm dễ nhầm s/x, l/n [247] |
| `gen_robot_city_constructor` | Chục và đơn vị lẻ, so sánh đến 100 [179] | Từ vựng robot, bộ phận cơ thể [242] | Ghép nguyên âm tạo tiếng [247] |
| `gen_candy_biome_world` | Quy luật chuỗi hạt kẹo màu [180] | Từ vựng đồ ngọt: candy, cake [242] | Đọc trơn từ vựng bánh kẹo [247] |
| `gen_time_portal_math` | Đọc giờ đúng trên mặt đồng hồ kim [182] | Từ vựng thời gian: morning, night [242] | Đọc hiểu câu lịch trình ngày con [247] |
| `gen_mini_zoo_ecosystem` | Cộng trừ thực tế số lượng thú [184] | Học từ vựng Thế giới động vật [242] | Đọc hiểu mẩu truyện kể vật cưng [247] |
| `gen_storybook_popup_world` | Toán đố kể chuyện lồng bối cảnh [185] | Đọc truyện tiếng Anh ngắn 5 câu [243] | Đọc trọn vẹn truyện cổ tích Việt [247] |
| `gen_number_maze` | Sắp xếp dãy số tăng dần, số chẵn lẻ [187] | Vẽ đường theo nhóm từ vựng [243] | Đi theo bảng chữ cái A-Ă-Â [247] |
| `gen_festival_parade_math` | Nhận diện hình khối bóng bay, xe hoa [188] | Nghe âm chọn từ vựng lễ hội [243] | Chính tả điền vần khuyết d/gi/r [247] |
| `gen_dream_room_builder` | Đếm phân loại đồ đạc, phép toán coin [190] | Học từ vựng đồ dùng gia đình [242] | Viết 3 câu tự miêu tả phòng ngủ [248] |
| `Math Kingdom Builder` | Cộng trừ số tròn chục đến 100 [222] | Xây dựng từ vựng chủ đề Castle [242] | Đọc hiểu bài văn tả hoàng cung [247] |
| `Pet Evolution Math` | Bài toán cân đối thực phẩm thỏ dâu [223] | Trò chuyện tiếng Anh tự do với Pet [243] | Đặt câu tả hoạt động thú cưng [248] |
| `Math Adventure Map` | Lộ trình level bài học toán [224] | Lộ trình chinh phục Alphabet Anh [242] | Lộ trình 30 level âm vần Việt [247] |
| `Magic Shop Math` | Bài toán cộng trừ tiền giấy lẻ Việt [224] | Đóng vai mua sắm tiếng Anh [244] | Đóng vai chào hỏi lễ phép mua đồ [247] |
| `Detective Math Mystery` | So sánh chiều dài thước cm, tư duy ẩn số | Tìm kiếm từ khóa ẩn mật mã [243] | Sửa lỗi sai chính tả trong hồ sơ [247] |
| `RhythmMath Dance` | Tính nhẩm thần tốc, phản xạ phép tính [226] | Nghe nhạc chọn từ vựng đúng âm [243] | Gõ từ vựng tiếng Việt theo nhịp điệu |
| `Math Cooking Lab` | Bài toán đong đếm gộp số lượng [226] | Từ vựng nấu ăn: strawberry, sugar [242] | Đọc trơn sách công thức nấu ăn [247] |
| `Space Rescue Math` | So sánh số phạm vi 100 không nhớ [227] | Từ vựng vũ trụ: space, rocket, star [242] | Chính tả nghe viết câu ngắn [247] |
| `Puzzle Room Math` | Tìm quy luật lặp hình học, ẩn số phép cộng | Giải đố từ vựng khuyết ký tự [244] | Nối các nét chữ tạo âm vần đúng [247] |
| `AI Co-op Boss Battle` | Thử thách chuỗi phép toán tổng kết level [228] | Chuỗi câu hỏi ngữ pháp đập Boss [244] | Đọc to đoạn văn chính tả diệt Boss [247] |
| `std_flashcard_sprint` | Tính nhẩm tốc độ, điền số khuyết [191] | Luyện phát âm từ vựng qua Flashcard [243] | Đọc trơn nhanh các từ ghép tiếng Việt |
| `std_quiz_ladder` | Nấc thang phép tính, kiểm tra nhanh [192] | Leo thang kiểm tra từ vựng mới [243] | Đánh vần từ khó leo thang ngữ pháp |
| `std_matching_cards` | Ghép phép tính và số lượng đồ [193] | Ghép từ vựng tiếng Anh và nghĩa Việt [243] | Ghép đôi từ chỉ vật và hình ảnh thật |
| `std_drag_worksheet` | Điền dấu so sánh, hoàn thiện phép tính [194] | Kéo thả chữ tạo từ vựng hoàn chỉnh [244] | Kéo thả dấu thanh Sắc/Huyền vào từ |
| `std_audio_math` | Nghe toán đố và chọn đáp án đúng [195] | Nghe từ vựng tiếng Anh chọn tranh đúng [243] | Nghe cô AI đọc từ chọn chữ cái đầu [247] |
| `std_error_clinic` | Sửa chữa các phép toán làm sai [196] | Luyện tập lại các từ vựng phát âm ngọng | Sửa lỗi viết sai chính tả d/gi, s/x [247] |
| `std_mini_exam` | Kiểm tra năng lực toán định kỳ level [197] | Mini test đánh giá từ vựng & nghe nói | Kiểm tra khả năng đọc hiểu & viết câu [247] |
| `std_parent_assignment` | Làm bài toán thực tế do bố mẹ chọn [198] | Luyện nói tiếng Anh theo chủ đề bố giao | Đọc to câu chuyện tiếng Việt mẹ gửi [247] |
| `std_number_trace` | Tập viết nét chữ số từ 0 đến 9 [199] | Tập viết nét chữ cái tiếng Anh A-Z | Tập viết nét chữ cái tiếng Việt a-ă-â |
| `std_sticker_board` | Đếm hoa lá nhận dán sticker [201] | Ôn tập từ vựng dán nhãn sticker tranh | Đọc vần thơ tiếng Việt nhận sticker [247] |

---

## CHƯƠNG VI: RÀNG BUỘC KỸ THUẬT & KIỂM SOÁT HIỆU NĂNG

### 6.1. Giới hạn Phần cứng & Quản lý Tài nguyên (Mobile & Tablet First) [231]
Vì đối tượng sử dụng chính là bé An Nhiên dùng trên máy tính bảng iPad hoặc điện thoại di động thông minh [237], hệ thống game bắt buộc phải tuân thủ nghiêm ngặt các chỉ số hiệu năng trên nền tảng Web App (Vercel) [231, 237]:
* **Tần số Quét khung hình (FPS):** Duy trì tối thiểu **55 - 60 FPS** trong suốt tiến trình chơi game. Nếu FPS sụt giảm xuống dưới 40 FPS, hệ thống tự động tắt quầng sáng (glow) và giảm số lượng particle Canvas xuống còn tối đa 50 [231].
* **Quản lý Hạt (Particles System Limits):** Hệ thống Canvas tạo hạt (Bụi tiên, bọt khí, tuyết rơi) tuyệt đối không vượt quá **200 hạt cùng lúc** [231]. Mỗi hạt bắt buộc phải có thời gian sống (TTL - Time to Live) ngắn từ 1 - 2 giây để giải phóng bộ nhớ đệm lập tức sau khi hiển thị hiệu ứng [208, 231].
* **Giới hạn Lottie JSON Chạy Đồng thời:** Không bao giờ chạy quá **3 hoạt ảnh Lottie đồng thời** trên cùng một màn hình thiết bị [231]. Các hoạt ảnh Lottie của thú cưng hoặc cô AI khi không tương tác bắt buộc phải đặt ở trạng thái dừng (`paused`) hoặc chỉ chạy vòng lặp nhún nhẩy cực nhẹ (`idle`) [220, 231].

### 6.2. Thuật toán Sinh số ngẫu nhiên có Seed (Seeded Pseudo-Random)
AI Code Agent cần cài đặt thuật toán sinh số ngẫu nhiên giả lập có Seed (Ví dụ: Mulberry32) bằng TypeScript để bảo đảm tính nhất quán của màn chơi tự sinh [211]:

```typescript
export function createMulberry32(seedStr: string) {
  // Băm chuỗi seed ký tự thành số nguyên 32-bit
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  let a = h >>> 0;
  
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

### 6.3. Cấu trúc Schema Supabase lưu bối cảnh thế giới tự sinh (Database Schema Addition)
Cung cấp sẵn câu lệnh tạo bảng mở rộng bối cảnh thế giới và tiến trình trang trí cho Code Agent lập trình trực tiếp lên Supabase [190, 191, 232]:

```sql
-- Bảng lưu trữ trạng thái bối cảnh màn chơi tự sinh theo Seed
CREATE TABLE procedural_scenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
    level_id INT NOT NULL,
    game_mode VARCHAR(100) NOT NULL, -- 'gen_living_math_garden', 'gen_cloud_city_numbers'...
    generated_seed VARCHAR(255) NOT NULL, -- 'child_001_level_05_day_03'
    scene_config JSONB NOT NULL, -- Lưu trữ tọa độ mây, cây, vị trí rương ma thuật
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(child_id, level_id, game_mode)
);

-- Bảng theo dõi tiến trình xây dựng thế giới game hóa của con
CREATE TABLE world_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
    world_id VARCHAR(100) NOT NULL, -- 'math_kingdom', 'fairy_forest'
    unlocked_areas JSONB DEFAULT '[]'::jsonb, -- Danh sách vùng đất đã mở khóa
    unlocked_decorations JSONB DEFAULT '[]'::jsonb, -- Danh sách đồ trang trí đã mở khóa
    buildings_state JSONB DEFAULT '{}'::jsonb, -- Cấu trúc tọa độ các tòa lâu đài đã xây dựng
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(child_id, world_id)
);
```

---

## CHƯƠNG VII: TIÊU CHÍ HOÀN THÀNH (DEFINITION OF DONE) CHO AGENT LẬP TRÌNH

Một Game Component được coi là hoàn thiện và sẵn sàng đưa lên môi trường Vercel khi đáp ứng đầy đủ 5 tiêu chí kiểm thử sau [194, 281]:
1. **Chạy mượt mà Responsive:** Tương thích hiển thị hoàn hảo từ màn hình máy tính bàn, iPad học tập đến điện thoại thông minh (Viewport: 1024x768 của iPad và 390x844 của iPhone) [157, 237, 281].
2. **Không rò rỉ bộ nhớ (No Memory Leaks):** Mọi sự kiện listener của Canvas và animation Framer Motion phải được giải phóng bộ nhớ (`clean-up`) hoàn toàn khi React component unmount [208, 231].
3. **Mã nguồn TypeScript không lỗi (Strict TS Compliant):** Tuyệt đối không sử dụng kiểu dữ liệu `any` bừa bãi. Mọi dữ liệu bối cảnh hay thông số chuyển động phải được định nghĩa bằng các interfaces/types chặt chẽ [208, 270].
4. ** Grounding bảo mật Supabase RLS:** Kiểm tra các câu lệnh RLS đảm bảo thông tin tiến độ trang trí thế giới `world_progress` của con được bảo vệ nghiêm ngặt khỏi các tài khoản xâm nhập trái phép bên ngoài [192, 272].
5. **Gắn giọng đọc và TTS thành công:** Toàn bộ kịch bản câu đố trong game phải kết nối giọng đọc tiếng Việt/tiếng Anh ngọt ngào mượt mà từ hệ thống Text-to-Speech được nạp sẵn [183, 263, 275].

---
*Tài liệu PRD chuyên biệt này được phê chuẩn làm tiêu chuẩn kỹ thuật thiết kế đồ họa tạo sinh tối tân cho hệ thống game học tập cá nhân hóa của con gái An Nhiên.* [155, 204, 235]
