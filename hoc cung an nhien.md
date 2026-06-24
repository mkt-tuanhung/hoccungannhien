# DỰ ÁN: HỆ THỐNG GIA SƯ AI CÁ NHÂN HOÁ CHO CON GÁI

## 1. Tổng quan dự án

Dự án xây dựng một hệ thống học tập cá nhân hoá cho con gái, tập trung vào 3 môn chính:

1. Tiếng Anh
2. Toán
3. Tiếng Việt

Hệ thống hoạt động như một **cô gia sư AI kèm 1-1**, vừa là người dạy, vừa là trợ lý học tập, vừa là người bạn đồng hành giúp con yêu thích việc học.

App cần có giao diện vui nhộn, animation mượt mà, âm thanh khen thưởng, hình ảnh đáng yêu, hệ thống điểm số, thi đua, phần thưởng, thú cưng ảo và dashboard giám sát thực tế cho phụ huynh.

Ứng dụng sẽ được code bằng **Antigravity**, triển khai trên **Vercel** để tiết kiệm chi phí, sử dụng hệ thống đăng nhập và lưu dữ liệu cá nhân theo từng **UID**.

---

## 2. Mục tiêu chính

### 2.1. Mục tiêu cho con

App giúp con:

- Học tiếng Anh tốt hơn.
- Học Toán chắc hơn.
- Học tiếng Việt tốt hơn.
- Có thói quen học mỗi ngày.
- Biết lỗi sai của mình và sửa dần.
- Tự tin đọc, nói, viết, làm bài.
- Học vui như chơi game.
- Có cảm giác được cô giáo AI quan tâm riêng.
- Có động lực thi đua, tích điểm, lên cấp.
- Không sợ sai, không bị áp lực.

### 2.2. Mục tiêu cho phụ huynh

App giúp bố mẹ:

- Biết hôm nay con học gì.
- Biết con học bao nhiêu phút.
- Biết con làm đúng/sai bao nhiêu.
- Biết con yếu phần nào.
- Biết con có tập trung hay không.
- Biết con đã hoàn thành nhiệm vụ chưa.
- Xem tiến bộ theo ngày, tuần, tháng.
- Giao nhiệm vụ học cho con.
- Xem báo cáo tự động.
- Điều chỉnh chương trình học.
- Kiểm soát thời gian học và nội dung.

### 2.3. Mục tiêu kỹ thuật

- Chạy web app trên Vercel.
- Có đăng nhập.
- Mỗi người dùng có UID riêng.
- Mỗi UID có thể có một hoặc nhiều hồ sơ học sinh.
- Lưu profile, chương trình học, tiến độ, điểm số, lịch sử học, phần thưởng, cài đặt AI lên server.
- Giao diện responsive, chạy tốt trên máy tính, iPad và điện thoại.
- Có thể phát triển thành PWA để cài như app trên màn hình chính.
- Dùng Next.js + TypeScript + Supabase + Vercel.

---

## 3. Vai trò người dùng

### 3.1. Parent / Admin

Là phụ huynh.

Quyền:

- Đăng ký, đăng nhập.
- Tạo hồ sơ cho con.
- Thiết lập tuổi, lớp, trình độ.
- Chọn chương trình học.
- Xem dashboard học tập.
- Giao bài.
- Xem báo cáo.
- Cài thời gian học.
- Cài phong cách giao tiếp của AI.
- Cài mức độ khó.
- Xem lịch sử sai.
- Xem điểm mạnh/yếu.
- Quản lý phần thưởng.
- Quản lý dữ liệu cá nhân.

### 3.2. Child / Student

Là con gái.

Quyền:

- Vào khu học riêng.
- Chọn môn học.
- Làm nhiệm vụ hằng ngày.
- Nói chuyện với cô gia sư AI.
- Làm bài tập.
- Nhận điểm.
- Nhận sao.
- Mở khóa nhân vật.
- Nuôi thú cưng.
- Xem thành tích.
- Tham gia thử thách.
- Ôn lại lỗi sai.

### 3.3. AI Tutor

Là cô gia sư AI.

Nhiệm vụ:

- Hướng dẫn bài học.
- Gợi ý khi con bí.
- Không đưa đáp án ngay.
- Giải thích theo nhiều cách.
- Khen ngợi đúng lúc.
- Động viên khi con sai.
- Nhắc con tập trung.
- Tạo bài tập cá nhân hoá.
- Phân tích lỗi sai.
- Đề xuất bài học tiếp theo.
- Báo cáo cho phụ huynh.

---

## 4. Luồng đăng nhập và cá nhân hoá

### 4.1. Đăng ký tài khoản phụ huynh

Thông tin tài khoản:

- Email
- Mật khẩu
- Tên phụ huynh
- Số điện thoại, optional
- Ngôn ngữ giao diện
- Múi giờ
- Vai trò: parent

Sau khi đăng ký, hệ thống tạo:

- `user.uid`
- `parent_profile`
- `default_settings`
- `subscription_status`

### 4.2. Tạo hồ sơ học sinh

Thông tin profile học sinh:

- Tên bé
- Biệt danh
- Ngày sinh
- Tuổi
- Giới tính, optional
- Lớp hiện tại
- Trường học, optional
- Thành phố/quốc gia, optional
- Ngôn ngữ chính: tiếng Việt
- Ngôn ngữ đang học: tiếng Anh
- Môn học: English, Math, Vietnamese
- Sở thích: công chúa, mèo, thỏ, unicorn, khủng long, vũ trụ, nấu ăn, búp bê, hoạt hình...
- Tính cách: nhút nhát, năng động, thích được khen, dễ nản, thích thi đua...
- Thời lượng học mỗi ngày
- Khung giờ học phù hợp
- Mục tiêu học tập
- Cấp độ ban đầu từng môn

### 4.3. Bài test đầu vào

Sau khi tạo profile, app cho con làm bài kiểm tra ngắn.

#### Test tiếng Anh

- Nghe từ và chọn hình.
- Chọn nghĩa từ.
- Đọc chữ cái/từ đơn.
- Sắp xếp câu đơn giản.
- Nghe câu và chọn đáp án.
- Nói lại từ/câu ngắn nếu bật voice.

#### Test Toán

- Nhận diện số.
- Cộng/trừ cơ bản.
- So sánh lớn bé.
- Bài toán hình ảnh.
- Bài toán có lời văn.
- Tư duy logic đơn giản.

#### Test tiếng Việt

- Nhận diện chữ cái/vần.
- Đọc từ.
- Ghép tiếng.
- Điền dấu.
- Hiểu câu.
- Tập viết câu ngắn.

### 4.4. Kết quả test đầu vào

Sau bài test, hệ thống tạo:

- Level từng môn.
- Danh sách kỹ năng đã vững.
- Danh sách kỹ năng yếu.
- Độ tập trung trung bình.
- Thời gian phản hồi.
- Tỷ lệ cần gợi ý.
- Lộ trình học 7 ngày đầu.
- Lộ trình học tháng đầu.

Ví dụ:

```text
Tiếng Anh: Level A0+
Mạnh: nhận diện màu sắc, số đếm 1-10
Yếu: nghe câu ngắn, phát âm từ mới

Toán: Level lớp 1 cơ bản
Mạnh: đếm số, so sánh số
Yếu: bài toán có lời văn

Tiếng Việt: Level đọc cơ bản
Mạnh: nhận diện chữ cái
Yếu: đọc hiểu câu dài, dấu hỏi/ngã
```

---

## 5. Cấu trúc môn học

## 5.1. Môn tiếng Anh

### Module chính

#### 1. Alphabet & Phonics

- Chữ cái A-Z.
- Âm đầu.
- Âm cuối.
- Ghép âm.
- Phân biệt âm dễ nhầm.
- Nghe âm chọn chữ.
- Đọc chữ cái.
- Mini game bắt chữ.

#### 2. Vocabulary

Từ vựng theo chủ đề:

- Gia đình
- Trường học
- Màu sắc
- Con vật
- Đồ ăn
- Đồ chơi
- Quần áo
- Cơ thể
- Cảm xúc
- Số đếm
- Thời tiết
- Nhà cửa
- Đồ vật hằng ngày
- Nghề nghiệp
- Giao thông
- Động từ thường gặp

Mỗi từ gồm:

- Hình ảnh minh hoạ.
- Âm thanh phát âm.
- Nghĩa tiếng Việt.
- Ví dụ tiếng Anh.
- Game ghi nhớ.
- Bài nghe.
- Bài nói.
- Flashcard.
- Ôn tập ngắt quãng.

#### 3. Listening

- Nghe từ chọn tranh.
- Nghe câu chọn đáp án.
- Nghe đoạn hội thoại ngắn.
- Nghe và kéo thả thứ tự.
- Nghe chỉ dẫn.
- Nghe truyện ngắn.

#### 4. Speaking

- Nói lại từ.
- Nói lại câu.
- Trả lời câu hỏi đơn giản.
- Đóng vai hội thoại với cô gia sư AI.
- Chấm phát âm tương đối.
- Gợi ý sửa âm sai.
- Lưu lịch sử phát âm.

#### 5. Reading

- Đọc từ.
- Đọc câu.
- Đọc truyện tranh ngắn.
- Đọc và chọn hình.
- Đọc và trả lời câu hỏi.
- Đọc theo cô AI.
- Đọc to để app kiểm tra.

#### 6. Writing

- Kéo thả chữ thành từ.
- Sắp xếp từ thành câu.
- Điền từ còn thiếu.
- Viết câu đơn giản.
- Dịch câu đơn giản.
- Viết đoạn ngắn theo tranh.

#### 7. Grammar

Ngữ pháp nhẹ nhàng:

- I am / You are
- This is / That is
- I like / I don’t like
- Have / has
- Can / can’t
- There is / There are
- Số ít / số nhiều
- Mạo từ a/an
- What / Where / Who / How many

#### 8. English Conversation

Các tình huống:

- Chào hỏi.
- Giới thiệu bản thân.
- Hỏi tên.
- Hỏi tuổi.
- Hỏi màu sắc.
- Hỏi sở thích.
- Mua đồ.
- Ở trường.
- Ở nhà.
- Đi chơi.
- Nói cảm xúc.

---

## 5.2. Môn Toán

### Module chính

#### 1. Số học

- Nhận diện số.
- Đếm số.
- So sánh số.
- Sắp xếp số.
- Số chẵn/lẻ.
- Hàng đơn vị/chục/trăm.

#### 2. Phép tính

- Cộng.
- Trừ.
- Nhân.
- Chia.
- Tính nhẩm.
- Tính theo cột.
- Bài tập tốc độ.
- Bài tập chính xác.

#### 3. Toán có lời văn

AI đọc đề bài như một câu chuyện.

Ví dụ:

```text
Mimi có 5 quả táo. Mẹ cho thêm 3 quả. Mimi có tất cả bao nhiêu quả táo?
```

Hệ thống dạy con:

- Tìm dữ kiện.
- Tìm câu hỏi.
- Chọn phép tính.
- Viết lời giải.
- Viết đáp số.

#### 4. Hình học

- Nhận biết hình tròn, vuông, tam giác, chữ nhật.
- Đếm cạnh.
- Đếm góc.
- Ghép hình.
- Tìm hình giống nhau.
- Tìm quy luật hình.

#### 5. Tư duy logic

- Tìm quy luật.
- Sắp xếp thứ tự.
- Tìm điểm khác biệt.
- Sudoku đơn giản.
- Mê cung toán học.
- Bài toán cân bằng.
- Bài toán suy luận.

#### 6. Đo lường

- Dài/ngắn.
- Nặng/nhẹ.
- Cao/thấp.
- Đồng hồ.
- Tiền.
- Lịch ngày tháng.
- Đơn vị đo cơ bản.

#### 7. Toán game hoá

- Cứu công chúa bằng phép tính.
- Mở kho báu bằng đáp án đúng.
- Đánh boss bằng chuỗi bài đúng.
- Xây nhà bằng điểm toán.
- Nuôi thú cưng bằng nhiệm vụ toán.

---

## 5.3. Môn tiếng Việt

### Module chính

#### 1. Chữ cái và âm vần

- Bảng chữ cái.
- Nguyên âm.
- Phụ âm.
- Ghép vần.
- Đọc tiếng.
- Phân biệt âm dễ nhầm.
- Điền âm/vần còn thiếu.

#### 2. Dấu thanh

- Dấu sắc.
- Dấu huyền.
- Dấu hỏi.
- Dấu ngã.
- Dấu nặng.
- Phân biệt hỏi/ngã.
- Nghe từ và chọn dấu đúng.
- Điền dấu vào câu.

#### 3. Đọc

- Đọc từ.
- Đọc câu.
- Đọc đoạn ngắn.
- Đọc truyện tranh.
- Đọc hiểu.
- Trả lời câu hỏi sau khi đọc.
- Đọc to và AI phản hồi.

#### 4. Chính tả

- Nghe viết từ.
- Nghe viết câu.
- Điền từ đúng.
- Sửa lỗi sai.
- Phân biệt s/x, ch/tr, d/gi/r, l/n.
- Viết lại câu đúng chính tả.

#### 5. Tập làm văn

- Viết câu theo tranh.
- Viết 3 câu về bản thân.
- Kể lại một việc.
- Miêu tả đồ vật.
- Miêu tả con vật.
- Viết đoạn văn ngắn.
- AI gợi ý nhưng không viết thay hoàn toàn.

#### 6. Từ vựng tiếng Việt

- Từ chỉ người.
- Từ chỉ vật.
- Từ chỉ hoạt động.
- Từ chỉ đặc điểm.
- Từ đồng nghĩa.
- Từ trái nghĩa.
- Câu hỏi ai/cái gì/làm gì/thế nào.

---

## 6. AI gia sư 1-1

### 6.1. Tính cách AI

AI là một cô gia sư ảo:

- Dịu dàng.
- Vui vẻ.
- Kiên nhẫn.
- Nói chuyện dễ hiểu.
- Biết khen đúng lúc.
- Không mắng.
- Không làm con sợ.
- Không đưa đáp án ngay.
- Luôn hỏi gợi mở.
- Biết biến bài học thành trò chơi.
- Có thể gọi con bằng biệt danh.

Ví dụ khi con làm đúng:

```text
Giỏi quá Mimi ơi! Con làm đúng rồi đó.
Bây giờ mình thử câu khó hơn một chút nhé.
Cô tin là con làm được!
```

Ví dụ khi con sai:

```text
Không sao đâu con, sai là cách để não mình mạnh hơn.
Mình thử nhìn lại đề nhé: đề hỏi tất cả, vậy mình nên cộng hay trừ nhỉ?
```

### 6.2. Nguyên tắc dạy của AI

AI không được:

- Chê con kém.
- So sánh con với bạn khác.
- Đưa đáp án ngay lập tức.
- Nói quá dài.
- Dùng thuật ngữ khó.
- Gây áp lực quá mức.
- Khuyến khích học quá lâu.

AI phải:

- Giải thích ngắn.
- Cho ví dụ gần gũi.
- Hỏi lại để con tự nghĩ.
- Gợi ý từng bước.
- Khen nỗ lực.
- Nhắc nghỉ khi học quá lâu.
- Ghi nhận lỗi sai để ôn lại.

### 6.3. Cơ chế gợi ý thông minh

Mỗi câu hỏi có 3 mức gợi ý.

#### Hint 1: Gợi ý nhẹ

```text
Con thử nhìn vào số lớn hơn trước nhé.
```

#### Hint 2: Gợi ý rõ hơn

```text
Đề có chữ “thêm”, thường mình sẽ dùng phép cộng.
```

#### Hint 3: Hướng dẫn từng bước

```text
Mình lấy 5 quả táo ban đầu cộng thêm 3 quả táo mẹ cho. Vậy phép tính là 5 + 3.
```

Sau Hint 3, app vẫn để con tự nhập đáp án.

### 6.4. AI phân tích lỗi sai

Mỗi lần con làm sai, hệ thống lưu:

- Môn học.
- Kỹ năng.
- Câu hỏi.
- Đáp án đúng.
- Đáp án con chọn.
- Thời gian suy nghĩ.
- Số lần dùng gợi ý.
- Loại lỗi.
- Mức độ nghiêm trọng.

Loại lỗi:

- Không hiểu đề.
- Nhầm phép tính.
- Nhầm từ vựng.
- Nhầm phát âm.
- Nhầm dấu tiếng Việt.
- Tính vội.
- Mất tập trung.
- Cần học lại kiến thức nền.

AI dùng dữ liệu này để tạo bài ôn riêng.

---

## 7. Gamification – hệ thống gây nghiện học tập lành mạnh

### 7.1. XP

Con nhận XP khi:

- Hoàn thành bài học.
- Làm đúng.
- Sửa được lỗi sai.
- Học đều mỗi ngày.
- Không bỏ cuộc.
- Đọc to rõ ràng.
- Giải thích được cách làm.
- Hoàn thành bài khó.

Không nên chỉ thưởng nhiều cho tốc độ, vì con có thể làm ẩu.

### 7.2. Sao thưởng

Mỗi nhiệm vụ có tối đa 3 sao:

- 1 sao: hoàn thành.
- 2 sao: đúng từ 70%.
- 3 sao: đúng từ 90% trở lên hoặc sửa hết lỗi sai.

### 7.3. Streak học tập

Streak tính theo ngày học đều.

Quy tắc:

- Học đủ nhiệm vụ chính trong ngày mới tính streak.
- Có vé cứu streak nếu con bận hoặc ốm.
- Không làm con áp lực nếu mất streak.
- Khi mất streak, AI động viên bắt đầu lại.

### 7.4. Level

Level theo từng môn:

- English Level 1, 2, 3...
- Math Level 1, 2, 3...
- Vietnamese Level 1, 2, 3...

Mỗi level có bản đồ kỹ năng.

### 7.5. Huy hiệu

Huy hiệu gợi ý:

- Bé chăm chỉ.
- Siêu sao Toán học.
- Công chúa từ vựng.
- Nhà đọc sách nhí.
- Chiến binh chính tả.
- Cao thủ sửa lỗi.
- Bé không bỏ cuộc.
- 7 ngày học đều.
- 30 ngày tiến bộ.
- Phát âm rõ ràng.
- Đọc truyện xuất sắc.

### 7.6. Bảng thi đua

Vì app cá nhân cho con, không cần bảng xếp hạng công khai.

Nên có:

- Thi đua với chính mình hôm qua.
- Thi đua với mục tiêu tuần.
- Thi đua với nhân vật AI.
- Boss challenge cuối tuần.
- Cuộc đua sao với thú cưng ảo.

Ví dụ:

```text
Hôm qua con đạt 80 XP.
Hôm nay chỉ cần 90 XP là con phá kỷ lục của chính mình!
```

### 7.7. Thú cưng học tập

Con có một thú cưng ảo.

Thú cưng có thể là:

- Mèo.
- Thỏ.
- Gấu.
- Unicorn.
- Chim cánh cụt.
- Rồng con.

Thú cưng lớn lên khi con học.

Con có thể:

- Cho ăn bằng sao.
- Mua quần áo bằng coin học tập.
- Trang trí phòng.
- Mở khóa đồ chơi.
- Mở khóa biểu cảm.
- Mở khóa animation.

### 7.8. Bản đồ phiêu lưu

App có bản đồ học tập:

- Vương quốc Tiếng Anh.
- Thành phố Toán học.
- Khu rừng Tiếng Việt.
- Đảo Đọc sách.
- Lâu đài Thử thách.
- Hang Boss cuối tuần.
- Kho báu phần thưởng.

Mỗi bài học là một chặng đường.

### 7.9. Âm thanh và hình ảnh khen ngợi

Khi con làm đúng:

- Hiệu ứng sao bay.
- Confetti.
- Nhân vật nhảy vui.
- Âm thanh “ting”.
- Giọng AI khen.
- Sticker hiện lên.

Câu khen:

```text
Tuyệt vời quá!
Con giỏi thật đó!
Cô tự hào về con!
Não của con đang mạnh hơn rồi!
Con vừa vượt qua thử thách khó đấy!
```

Khi con sai:

- Không có âm thanh buồn nặng.
- Không hiện dấu X quá lớn.
- Dùng hiệu ứng nhẹ nhàng.
- AI nói: “Mình thử lại nhé!”

---

## 8. Animation và giao diện

### 8.1. Phong cách hình ảnh

Style đề xuất:

- 2D cartoon hiện đại.
- Màu pastel tươi sáng.
- Bo góc nhiều.
- Nhân vật đáng yêu.
- Nền có chiều sâu nhẹ.
- Icon to, dễ bấm.
- Font tròn, dễ đọc.
- Không quá rối.

### 8.2. Animation cần có

- Màn hình loading có nhân vật chạy.
- Chuyển bài học mượt.
- Sao bay khi đúng.
- Nhân vật vỗ tay.
- Thú cưng nhảy.
- Thanh XP tăng dần.
- Mở rương kho báu.
- Boss bị đánh bại.
- Bản đồ mở khóa vùng mới.
- Avatar cô gia sư nói chuyện.
- Micro nhấp nháy khi con nói.
- Flashcard lật mượt.

### 8.3. Công nghệ animation

Đề xuất:

- Framer Motion cho UI animation.
- Lottie cho nhân vật/hiệu ứng phức tạp.
- CSS animation cho hiệu ứng nhẹ.
- Canvas hoặc SVG cho mini-game đơn giản.
- Audio ngắn định dạng mp3/ogg.

### 8.4. Màn hình chính cho con

Gồm:

- Avatar con.
- Thú cưng.
- XP hôm nay.
- Streak.
- Nhiệm vụ hôm nay.
- 3 môn học.
- Nút “Học cùng cô”.
- Nút “Thử thách hôm nay”.
- Nút “Kho phần thưởng”.

Ví dụ layout:

```text
Xin chào Mimi 🌸
Hôm nay mình cùng học 20 phút nhé!

[Tiếng Anh] [Toán] [Tiếng Việt]

Nhiệm vụ hôm nay:
1. Học 5 từ tiếng Anh
2. Làm 10 câu toán
3. Đọc 1 truyện tiếng Việt

Phần thưởng hôm nay: mở khóa váy mới cho mèo Mimi
```

---

## 9. Hệ thống bài học

### 9.1. Cấu trúc một bài học

Mỗi bài học gồm:

1. Mở đầu vui.
2. Giải thích ngắn.
3. Ví dụ mẫu.
4. Con làm thử.
5. Mini game.
6. Câu hỏi kiểm tra.
7. Kết quả.
8. Khen thưởng.
9. Gợi ý ôn tập.

### 9.2. Các loại câu hỏi

- Multiple Choice: chọn đáp án đúng.
- Drag and Drop: kéo thả chữ/từ/số/hình.
- Matching: nối từ với hình, phép tính với kết quả.
- Fill in Blank: điền từ/số/dấu còn thiếu.
- Speaking: con nói vào micro.
- Reading Aloud: con đọc câu/truyện.
- Writing: con gõ câu trả lời.
- Image Quiz: nhìn hình trả lời.
- Story Quiz: đọc/nghe truyện rồi trả lời.
- Timed Challenge: thử thách có thời gian.
- Boss Battle: chuỗi câu hỏi cuối tuần.

---

## 10. Cá nhân hoá thông minh

### 10.1. Adaptive Learning Engine

Hệ thống tự điều chỉnh bài học dựa trên:

- Tỷ lệ đúng.
- Thời gian trả lời.
- Số lần dùng gợi ý.
- Lỗi lặp lại.
- Mức độ tự tin.
- Số ngày học liên tục.
- Môn con thích.
- Môn con né tránh.
- Khung giờ học tốt nhất.
- Dạng bài con hay sai.

### 10.2. Quy tắc tăng/giảm độ khó

Tăng độ khó khi:

- Đúng trên 85%.
- Ít dùng gợi ý.
- Thời gian trả lời ổn.
- Làm đúng nhiều ngày liên tục.

Giảm độ khó khi:

- Sai liên tục.
- Dùng gợi ý nhiều.
- Thời gian quá lâu.
- Bỏ dở bài nhiều.
- Có dấu hiệu nản.

### 10.3. Spaced Repetition

Từ vựng, công thức, lỗi sai được ôn lại theo chu kỳ:

- Sau 1 ngày.
- Sau 3 ngày.
- Sau 7 ngày.
- Sau 14 ngày.
- Sau 30 ngày.

Nếu con sai lại, chu kỳ rút ngắn.

### 10.4. Mastery Score

Mỗi kỹ năng có điểm thành thạo từ 0 đến 100.

Ví dụ:

```text
English / Colors: 92/100
English / Animals: 65/100
Math / Addition under 20: 88/100
Vietnamese / dấu hỏi-ngã: 54/100
```

Quy tắc:

- 0-40: cần học lại.
- 41-70: đang luyện.
- 71-89: khá vững.
- 90-100: thành thạo.

### 10.5. Lộ trình học cá nhân

Mỗi ngày AI tạo plan:

```text
Hôm nay Mimi học 20 phút:

1. Khởi động: 3 câu toán dễ
2. Tiếng Anh: 5 từ về con vật
3. Toán: cộng trong phạm vi 20
4. Tiếng Việt: luyện dấu hỏi/ngã
5. Mini game: cứu mèo bằng đáp án đúng
6. Ôn lỗi sai hôm qua
```

---

## 11. Dashboard cho phụ huynh

### 11.1. Tổng quan hôm nay

Hiển thị:

- Con đã học chưa.
- Học bao nhiêu phút.
- Hoàn thành bao nhiêu nhiệm vụ.
- Đúng bao nhiêu câu.
- Sai bao nhiêu câu.
- Cần gợi ý bao nhiêu lần.
- Môn học tốt nhất hôm nay.
- Môn cần hỗ trợ.
- Tâm trạng học tập.

### 11.2. Báo cáo theo tuần

Gồm:

- Tổng thời gian học.
- Số bài hoàn thành.
- Số kỹ năng tăng level.
- Top lỗi sai.
- Kỹ năng tiến bộ nhất.
- Kỹ năng yếu nhất.
- Đề xuất tuần sau.

### 11.3. Báo cáo theo tháng

Gồm:

- Biểu đồ tiến bộ từng môn.
- Mastery map.
- Số ngày học.
- Tỷ lệ duy trì.
- Bảng kỹ năng đã thành thạo.
- Bảng kỹ năng cần học lại.
- Nhận xét tự động của AI.

Ví dụ nhận xét:

```text
Tuần này Mimi học đều 5/7 ngày. Con tiến bộ rõ ở phép cộng trong phạm vi 20 và nhớ thêm 18 từ tiếng Anh mới. Con còn nhầm dấu hỏi/ngã trong tiếng Việt, hệ thống đề xuất tuần sau dành 10 phút mỗi ngày để luyện chính tả bằng game nghe - chọn dấu.
```

### 11.4. Giám sát thực tế

Hệ thống không chỉ ghi nhận con mở app, mà ghi nhận học thật:

- Thời gian active trên bài.
- Số lần thoát tab.
- Số câu trả lời.
- Thời gian suy nghĩ từng câu.
- Có bấm đại quá nhanh không.
- Có dùng hint quá nhiều không.
- Có làm lại lỗi sai không.
- Có đọc/nói thật qua micro không.
- Có hoàn thành bài hay bỏ giữa chừng không.

### 11.5. Cảnh báo cho bố mẹ

Các cảnh báo:

- Con bỏ học 2 ngày.
- Con sai liên tục cùng một kỹ năng.
- Con làm bài quá nhanh bất thường.
- Con dùng gợi ý quá nhiều.
- Con học quá lâu cần nghỉ.
- Con có dấu hiệu nản.
- Con chỉ chọn môn dễ, né môn khó.
- Con giảm tiến bộ so với tuần trước.

### 11.6. Giao bài cho con

Bố mẹ có thể giao:

- Học 10 từ tiếng Anh.
- Làm 20 câu toán.
- Đọc 1 truyện.
- Ôn lỗi sai.
- Làm bài kiểm tra cuối tuần.
- Luyện phát âm 5 phút.
- Viết đoạn văn ngắn.

Có deadline, phần thưởng và ghi chú.

---

## 12. Hệ thống kiểm tra, chấm điểm và thi đua

### 12.1. Loại bài kiểm tra

- Quiz nhanh 5 câu.
- Bài luyện tập 10 câu.
- Bài kiểm tra 15 phút.
- Boss cuối tuần.
- Bài tổng kết tháng.
- Bài kiểm tra đầu vào.
- Bài kiểm tra lại sau khi ôn.

### 12.2. Cách chấm điểm

Điểm không chỉ dựa trên đúng/sai.

Công thức gợi ý:

```text
Score = accuracy_score + effort_score + improvement_score - hint_penalty
```

Trong đó:

- Accuracy score: điểm đúng.
- Effort score: điểm nỗ lực.
- Improvement score: điểm tiến bộ so với lần trước.
- Hint penalty: trừ nhẹ nếu dùng quá nhiều gợi ý.

### 12.3. Xếp loại

- 95-100: Xuất sắc.
- 85-94: Rất tốt.
- 70-84: Tốt.
- 50-69: Cần luyện thêm.
- Dưới 50: Học lại cùng cô AI.

### 12.4. Thi đua theo tuần

Mỗi tuần có challenge:

- Tuần siêu trí nhớ tiếng Anh.
- Tuần cao thủ phép cộng.
- Tuần đọc truyện hay.
- Tuần không bỏ cuộc.
- Tuần sửa lỗi sai.

### 12.5. Boss Battle

Cuối tuần con đánh boss.

Boss có máu.

Mỗi câu đúng làm boss mất máu.

Câu khó làm boss mất nhiều máu hơn.

Nếu con sai, AI gợi ý, không làm con thua ngay.

Khi thắng:

- Nhận huy hiệu.
- Nhận rương.
- Mở đồ cho thú cưng.
- Nhận video khen thưởng ngắn.

---

## 13. Âm thanh, giọng nói, hình ảnh

### 13.1. Text-to-Speech

AI đọc:

- Câu hỏi.
- Từ vựng.
- Câu tiếng Anh.
- Truyện.
- Lời khen.
- Hướng dẫn.

Có thể chọn giọng:

- Cô giáo vui vẻ.
- Cô giáo dịu dàng.
- Bạn thỏ nhỏ.
- Bạn mèo con.

### 13.2. Speech Recognition

Dùng cho:

- Đọc tiếng Anh.
- Đọc tiếng Việt.
- Trả lời hội thoại.
- Luyện phát âm.
- Đọc truyện.

Hệ thống lưu:

- Con đã đọc chưa.
- Đọc rõ hay không.
- Từ nào khó.
- Có cần đọc lại không.

### 13.3. Âm thanh nền

Có thể có:

- Nhạc nền nhẹ ở màn hình chính.
- Âm thanh đúng.
- Âm thanh hoàn thành bài.
- Âm thanh mở khóa.
- Âm thanh boss battle.
- Có nút tắt âm.

### 13.4. Hình ảnh khen thưởng

Các hiệu ứng:

- Sticker “Great!”
- Sticker “Con giỏi quá!”
- Sticker “Super Star!”
- Confetti.
- Sao bay.
- Trái tim.
- Thú cưng ôm con.
- Cô giáo vỗ tay.

---

## 14. Tính năng học qua truyện

### 14.1. Truyện tiếng Anh

Truyện ngắn theo level:

- 5 câu.
- 10 câu.
- 15 câu.
- Có hình minh hoạ.
- Có audio.
- Có từ mới.
- Có câu hỏi đọc hiểu.

### 14.2. Truyện tiếng Việt

- Truyện đạo đức.
- Truyện gia đình.
- Truyện động vật.
- Truyện trường lớp.
- Truyện cổ tích rút gọn.
- Truyện tự tạo theo sở thích của con.

### 14.3. AI tạo truyện cá nhân hoá

Ví dụ con thích mèo và công chúa, AI tạo truyện:

```text
Hôm nay công chúa Mimi và mèo Bông đi vào khu rừng Toán học...
```

Trong truyện lồng:

- Từ vựng tiếng Anh.
- Bài toán nhỏ.
- Câu hỏi tiếng Việt.
- Bài học đạo đức.

---

## 15. Trợ lý học tập cho con

### 15.1. Nhắc lịch học

AI nhắc:

```text
Mimi ơi, đến giờ học 15 phút rồi nè. Hôm nay mình chỉ cần hoàn thành 3 nhiệm vụ nhỏ thôi!
```

### 15.2. Chế độ học nhanh

Khi con bận:

- 5 phút từ vựng.
- 5 câu toán.
- 1 đoạn đọc ngắn.
- Ôn 3 lỗi sai.

### 15.3. Chế độ học sâu

Khi có nhiều thời gian:

- Bài học mới.
- Bài luyện tập.
- Mini game.
- Kiểm tra.
- Đọc truyện.

### 15.4. Chế độ ôn lỗi sai

AI nói:

```text
Hôm qua con hơi nhầm phần này. Hôm nay mình cùng sửa nhé. Sửa được lỗi sai là con sẽ nhận huy hiệu Cao thủ sửa lỗi!
```

### 15.5. Chế độ trước kỳ thi

Phụ huynh nhập lịch kiểm tra.

AI tạo plan:

- Ôn kiến thức trọng tâm.
- Làm đề mẫu.
- Luyện lỗi sai.
- Kiểm tra thử.
- Báo cáo phần cần học lại.

---

## 16. Tính năng dành cho phụ huynh

### 16.1. Parent AI Assistant

Bố mẹ có thể hỏi:

```text
Tuần này con yếu môn gì?
Con nên học gì hôm nay?
Tại sao con hay sai bài toán có lời văn?
Tạo cho con kế hoạch học 7 ngày.
Con có tiến bộ không?
```

AI trả lời dựa trên dữ liệu thật.

### 16.2. Báo cáo tự động

Hệ thống tạo báo cáo:

- Hằng ngày.
- Hằng tuần.
- Hằng tháng.

Có thể gửi qua:

- Email.
- Dashboard.
- Thông báo trong app.

### 16.3. Cài đặt phong cách dạy

Bố mẹ chọn:

- Dịu dàng.
- Năng lượng cao.
- Hài hước.
- Nghiêm túc vừa phải.
- Kèm sát.
- Cho con tự lập hơn.

### 16.4. Cài đặt giới hạn

- Giới hạn thời gian học/ngày.
- Giới hạn số lần làm boss.
- Tắt bảng thi đua nếu con áp lực.
- Tắt âm thanh.
- Tắt voice.
- Chỉ học trong khung giờ cho phép.

---

## 17. An toàn cho trẻ em

### 17.1. Không chat tự do nguy hiểm

AI chỉ nói chuyện trong phạm vi học tập, động viên, kỹ năng sống phù hợp.

Không được:

- Hỏi thông tin nhạy cảm.
- Gợi ý gặp người lạ.
- Tạo nội dung người lớn.
- Tạo nội dung bạo lực.
- Tạo nội dung làm trẻ sợ.
- Khuyến khích học quá sức.
- Thu thập thông tin không cần thiết.

### 17.2. Quyền riêng tư

- Dữ liệu con gắn với UID phụ huynh.
- Không công khai thông tin con.
- Không leaderboard công khai.
- Không chia sẻ giọng nói ra ngoài nếu không cần.
- Có quyền xoá dữ liệu.
- Có quyền xuất báo cáo.

### 17.3. Micro/camera

MVP nên dùng micro cho đọc/nói.

Không nên bật camera liên tục.

Nếu sau này dùng camera kiểm tra tập trung, phải có:

- Đồng ý của phụ huynh.
- Hiển thị rõ khi camera bật.
- Không lưu video nếu không cần.
- Chỉ dùng để phân tích trạng thái học.
- Có nút tắt.

---

## 18. Kiến trúc kỹ thuật

### 18.1. Stack đề xuất

Frontend + Backend:

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Lottie React
- Zustand hoặc Redux Toolkit
- React Hook Form
- Zod validation

Hosting:

- Vercel

Database:

- Supabase Postgres

Authentication:

- Supabase Auth

Storage:

- Supabase Storage cho avatar, audio, hình ảnh bài học, file báo cáo.

AI:

- OpenAI API hoặc model AI khác.
- API route riêng để bảo vệ key.
- Prompt theo vai trò AI Tutor.

ORM:

- Prisma hoặc Supabase Client.
- Nếu muốn đơn giản và nhanh: Supabase Client.
- Nếu muốn schema chặt chẽ: Prisma.

Charts:

- Recharts.

PWA:

- next-pwa hoặc cấu hình PWA thủ công.

### 18.2. Kiến trúc tổng quan

```text
User Browser
   |
   | Next.js App
   |
Vercel Hosting
   |
   | API Routes / Server Actions
   |
Supabase Auth ---- Supabase Postgres ---- Supabase Storage
   |
AI Provider API
```

### 18.3. Cấu trúc thư mục đề xuất

```text
/app
  /(auth)
    /login
    /register
  /(parent)
    /dashboard
    /child-profiles
    /reports
    /assignments
    /settings
  /(child)
    /home
    /learn
    /lesson/[id]
    /quiz/[id]
    /rewards
    /pet
    /map
  /api
    /ai/tutor
    /ai/generate-lesson
    /ai/analyze-progress
    /speech/evaluate
    /reports/generate

/components
  /ui
  /layout
  /child
  /parent
  /lesson
  /quiz
  /animation
  /reward
  /charts

/lib
  /supabase
  /ai
  /auth
  /scoring
  /adaptive
  /gamification
  /speech
  /utils

/types
  user.ts
  child.ts
  lesson.ts
  quiz.ts
  progress.ts
  reward.ts

/database
  schema.sql
  seed.ts
```

---

## 19. Database schema đề xuất

### 19.1. users

```sql
users {
  id uuid primary key
  email text
  full_name text
  role text
  created_at timestamp
  updated_at timestamp
}
```

### 19.2. child_profiles

```sql
child_profiles {
  id uuid primary key
  parent_uid uuid references users(id)
  name text
  nickname text
  birth_date date
  age int
  grade text
  avatar_url text
  interests jsonb
  personality jsonb
  daily_goal_minutes int
  preferred_study_time text
  created_at timestamp
  updated_at timestamp
}
```

### 19.3. child_subject_levels

```sql
child_subject_levels {
  id uuid primary key
  child_id uuid references child_profiles(id)
  subject text
  level int
  mastery_score int
  last_assessed_at timestamp
}
```

### 19.4. skills

```sql
skills {
  id uuid primary key
  subject text
  grade text
  code text
  name text
  description text
  prerequisite_skill_ids jsonb
  difficulty int
}
```

### 19.5. child_skill_mastery

```sql
child_skill_mastery {
  id uuid primary key
  child_id uuid
  skill_id uuid
  mastery_score int
  attempts_count int
  correct_count int
  wrong_count int
  hint_count int
  last_practiced_at timestamp
  next_review_at timestamp
}
```

### 19.6. lessons

```sql
lessons {
  id uuid primary key
  subject text
  skill_id uuid
  title text
  description text
  level int
  content jsonb
  estimated_minutes int
  is_active boolean
}
```

### 19.7. questions

```sql
questions {
  id uuid primary key
  lesson_id uuid
  skill_id uuid
  type text
  prompt text
  options jsonb
  correct_answer jsonb
  explanation text
  hint_1 text
  hint_2 text
  hint_3 text
  difficulty int
  media jsonb
}
```

### 19.8. study_sessions

```sql
study_sessions {
  id uuid primary key
  child_id uuid
  subject text
  started_at timestamp
  ended_at timestamp
  duration_seconds int
  active_seconds int
  completed boolean
  xp_earned int
  stars_earned int
}
```

### 19.9. question_attempts

```sql
question_attempts {
  id uuid primary key
  session_id uuid
  child_id uuid
  question_id uuid
  selected_answer jsonb
  is_correct boolean
  response_time_ms int
  hints_used int
  mistake_type text
  ai_feedback text
  created_at timestamp
}
```

### 19.10. rewards

```sql
rewards {
  id uuid primary key
  name text
  type text
  image_url text
  animation_url text
  cost_coins int
  unlock_condition jsonb
}
```

### 19.11. child_rewards

```sql
child_rewards {
  id uuid primary key
  child_id uuid
  reward_id uuid
  unlocked_at timestamp
  equipped boolean
}
```

### 19.12. daily_plans

```sql
daily_plans {
  id uuid primary key
  child_id uuid
  plan_date date
  tasks jsonb
  completed_tasks jsonb
  ai_note text
  created_at timestamp
}
```

### 19.13. parent_assignments

```sql
parent_assignments {
  id uuid primary key
  parent_uid uuid
  child_id uuid
  title text
  subject text
  task_type text
  due_date date
  reward_xp int
  status text
  created_at timestamp
}
```

### 19.14. ai_tutor_memory

```sql
ai_tutor_memory {
  id uuid primary key
  child_id uuid
  memory_type text
  content jsonb
  importance int
  created_at timestamp
  updated_at timestamp
}
```

Ví dụ memory:

```json
{
  "likes": ["mèo", "công chúa", "màu hồng"],
  "struggles": ["dấu hỏi/ngã", "toán có lời văn"],
  "motivation_style": "thích được khen nhẹ nhàng",
  "learning_pattern": "học tốt nhất buổi tối 20 phút"
}
```

---

## 20. Row Level Security

Mỗi bảng dữ liệu cần đảm bảo:

- Phụ huynh chỉ xem được `child_profiles` thuộc `parent_uid` của mình.
- Con chỉ xem được dữ liệu học của chính mình.
- Không UID nào đọc được dữ liệu UID khác.
- API AI chỉ xử lý dữ liệu của `child_id` đã xác thực.

Ví dụ logic:

```text
auth.uid() = parent_uid
```

Hoặc với bảng con:

```text
child_profiles.parent_uid = auth.uid()
```

---

## 21. API cần xây

### 21.1. Auth

```text
POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/me
```

### 21.2. Child Profile

```text
POST /api/child-profiles
GET /api/child-profiles
GET /api/child-profiles/:id
PATCH /api/child-profiles/:id
DELETE /api/child-profiles/:id
```

### 21.3. Placement Test

```text
POST /api/placement/start
POST /api/placement/submit
GET /api/placement/result/:childId
```

### 21.4. Lessons

```text
GET /api/lessons/today?childId=
GET /api/lessons/:id
POST /api/lessons/:id/start
POST /api/lessons/:id/complete
```

### 21.5. Quiz

```text
GET /api/quiz/next?childId=&subject=
POST /api/quiz/attempt
POST /api/quiz/finish
```

### 21.6. AI Tutor

```text
POST /api/ai/tutor-message
POST /api/ai/explain-question
POST /api/ai/generate-daily-plan
POST /api/ai/analyze-mistakes
POST /api/ai/create-story
POST /api/ai/parent-report
```

### 21.7. Progress

```text
GET /api/progress/overview?childId=
GET /api/progress/skills?childId=
GET /api/progress/weekly?childId=
GET /api/progress/monthly?childId=
```

### 21.8. Rewards

```text
GET /api/rewards
GET /api/rewards/child?childId=
POST /api/rewards/unlock
POST /api/rewards/equip
```

---

## 22. AI prompt hệ thống

### 22.1. System prompt cho cô gia sư AI

```text
Bạn là một cô gia sư AI dịu dàng, thông minh, vui vẻ, chuyên kèm 1-1 cho trẻ em học tiếng Anh, Toán và tiếng Việt.

Bạn phải nói ngắn gọn, dễ hiểu, phù hợp với độ tuổi và lớp học của bé.

Bạn không được đưa đáp án ngay. Hãy gợi ý từng bước để bé tự suy nghĩ.

Khi bé làm đúng, hãy khen cụ thể vào nỗ lực.
Khi bé làm sai, hãy động viên, không chê bai, không so sánh.

Bạn cần cá nhân hoá theo:
- tên bé
- tuổi
- lớp
- sở thích
- môn học đang học
- kỹ năng đang luyện
- lỗi sai gần đây
- mức độ tự tin
- phong cách học

Bạn có thể dùng hình ảnh tưởng tượng, câu chuyện, trò chơi, nhân vật đáng yêu để giải thích.

Không hỏi thông tin cá nhân nhạy cảm.
Không nói nội dung người lớn, bạo lực, đáng sợ.
Không khuyến khích bé học quá lâu.
Nếu bé mệt, hãy khuyên nghỉ ngắn.

Luôn giữ vai trò là cô gia sư học tập.
```

### 22.2. Prompt giải thích câu sai

```text
Bé vừa trả lời sai câu hỏi sau:

Môn: {{subject}}
Kỹ năng: {{skill}}
Câu hỏi: {{question}}
Đáp án của bé: {{child_answer}}
Đáp án đúng: {{correct_answer}}
Số gợi ý đã dùng: {{hints_used}}
Thời gian trả lời: {{response_time}}

Hãy:
1. Động viên bé.
2. Không chê bai.
3. Giải thích vì sao đáp án của bé chưa đúng.
4. Gợi ý cách nghĩ đúng.
5. Cho một ví dụ tương tự dễ hơn.
6. Kết thúc bằng lời động viên ngắn.

Giọng văn: vui vẻ, dịu dàng, như cô giáo kèm riêng.
Độ dài: dưới 120 từ.
```

### 22.3. Prompt tạo bài học cá nhân hoá

```text
Tạo một bài học ngắn cho bé.

Thông tin bé:
- Tên: {{child_name}}
- Tuổi: {{age}}
- Lớp: {{grade}}
- Sở thích: {{interests}}
- Môn: {{subject}}
- Kỹ năng cần học: {{skill}}
- Mức độ hiện tại: {{level}}
- Lỗi sai gần đây: {{recent_mistakes}}

Yêu cầu:
- Bài học vui, dễ hiểu.
- Có ví dụ bằng hình ảnh/câu chuyện.
- Có 5 câu luyện tập.
- Mỗi câu có đáp án đúng, giải thích, 3 hint.
- Có lời khen sau khi hoàn thành.
- Có mini game nhỏ liên quan đến sở thích của bé.
```

### 22.4. Prompt tạo báo cáo phụ huynh

```text
Dựa trên dữ liệu học tập của bé, hãy tạo báo cáo cho phụ huynh.

Dữ liệu:
{{progress_data}}

Báo cáo gồm:
1. Tóm tắt học tập.
2. Môn tiến bộ nhất.
3. Môn cần chú ý.
4. 3 lỗi sai lặp lại.
5. Nguyên nhân có thể.
6. Đề xuất kế hoạch 7 ngày tới.
7. Lời khuyên cho bố mẹ khi kèm con.

Giọng văn: rõ ràng, thực tế, không phóng đại.
```

---

## 23. Thuật toán chấm điểm

### 23.1. Tính điểm câu hỏi

```ts
function calculateQuestionScore({
  isCorrect,
  responseTimeMs,
  hintsUsed,
  difficulty
}) {
  let score = 0;

  if (isCorrect) score += 10;
  score += difficulty * 2;

  if (hintsUsed === 0) score += 3;
  if (hintsUsed === 1) score += 1;
  if (hintsUsed >= 2) score -= 1;

  if (responseTimeMs < 5000 && isCorrect) score += 1;

  return Math.max(score, 0);
}
```

### 23.2. Cập nhật mastery

```ts
function updateMastery(currentMastery, attempt) {
  let delta = 0;

  if (attempt.isCorrect && attempt.hintsUsed === 0) delta += 5;
  if (attempt.isCorrect && attempt.hintsUsed > 0) delta += 2;
  if (!attempt.isCorrect) delta -= 3;

  if (attempt.responseTimeMs > 30000) delta -= 1;

  return Math.min(100, Math.max(0, currentMastery + delta));
}
```

### 23.3. Chọn bài tiếp theo

```ts
function chooseNextSkill(skills) {
  return skills
    .filter(skill => skill.mastery_score < 90)
    .sort((a, b) => {
      return a.mastery_score - b.mastery_score;
    })[0];
}
```

---

## 24. MVP nên làm trước

### Giai đoạn 1: MVP cá nhân dùng được

Mục tiêu: có app chạy thật, con học được, bố mẹ xem được.

Tính năng:

1. Đăng ký/đăng nhập.
2. Tạo profile cho con.
3. Dashboard cho con.
4. Dashboard cho bố mẹ.
5. 3 môn học: Anh, Toán, Việt.
6. Mỗi môn có 20-50 bài mẫu.
7. Quiz tương tác.
8. Chấm điểm.
9. Lưu tiến độ theo UID.
10. XP, sao, streak.
11. Thú cưng đơn giản.
12. AI giải thích khi sai.
13. Báo cáo ngày/tuần.
14. Giao bài thủ công.
15. Responsive mobile/tablet.

### Giai đoạn 2: AI cá nhân hoá mạnh

Thêm:

1. Test đầu vào.
2. Adaptive learning.
3. Tạo daily plan tự động.
4. AI tạo bài học.
5. AI phân tích lỗi sai.
6. Ôn tập ngắt quãng.
7. Parent AI Assistant.
8. Tạo truyện cá nhân hoá.
9. Mastery map.
10. Boss battle cuối tuần.

### Giai đoạn 3: Voice + Animation nâng cao

Thêm:

1. Text-to-speech.
2. Speech recognition.
3. Luyện đọc tiếng Anh.
4. Luyện đọc tiếng Việt.
5. Chấm phát âm tương đối.
6. Lottie animation.
7. Bản đồ phiêu lưu.
8. Nhân vật cô giáo AI có animation.
9. Kho phần thưởng nâng cao.
10. PWA cài lên điện thoại.

### Giai đoạn 4: Hoàn thiện như sản phẩm thật

Thêm:

1. Báo cáo PDF.
2. Email báo cáo.
3. Import chương trình học.
4. Tạo đề kiểm tra.
5. In worksheet.
6. Multi-child profiles.
7. Hệ thống nhiệm vụ theo tuần.
8. Phân tích thói quen học.
9. Chế độ trước kỳ thi.
10. Backup dữ liệu.

---

## 25. Giao diện màn hình cần có

### 25.1. Auth

- Login
- Register
- Forgot password

### 25.2. Parent

- Parent Dashboard
- Child Profiles
- Create/Edit Child Profile
- Progress Overview
- Subject Progress
- Skill Mastery
- Reports
- Assignments
- Rewards Control
- AI Parent Assistant
- Settings

### 25.3. Child

- Child Home
- Subject Select
- Daily Quest
- Lesson Screen
- Quiz Screen
- AI Tutor Chat
- Pet Room
- Reward Shop
- Adventure Map
- Boss Battle
- Reading Mode
- Speaking Mode
- Achievement Page

---

## 26. UI chi tiết cho màn học

Màn học gồm:

```text
[Thanh tiến độ bài học]

Cô Mimi:
“Hôm nay mình học 5 từ về con vật nhé!”

[Hình minh hoạ lớn]

[Audio phát âm]

[Câu hỏi]

[Đáp án A] [Đáp án B] [Đáp án C]

[Nút gợi ý]
[Nút nghe lại]
[Nút hỏi cô]
```

Khi đúng:

```text
Confetti + sao bay
“Đúng rồi! Con nhớ rất nhanh đó!”
+10 XP
```

Khi sai:

```text
“Mình thử lại nhé. Con nhìn hình con mèo này, tiếng Anh là cat.”
Hiển thị Hint 1
```

---

## 27. Nội dung seed ban đầu

### 27.1. English seed

Chủ đề đầu tiên:

- Colors
- Numbers
- Animals
- Family
- School objects
- Food
- Body parts
- Feelings
- Daily actions
- Simple sentences

### 27.2. Math seed

Chủ đề đầu tiên:

- Numbers 1-10
- Numbers 1-20
- Addition within 10
- Subtraction within 10
- Compare numbers
- Shapes
- Patterns
- Word problems

### 27.3. Vietnamese seed

Chủ đề đầu tiên:

- Bảng chữ cái
- Nguyên âm
- Phụ âm
- Dấu thanh
- Ghép vần
- Đọc từ đơn
- Đọc câu ngắn
- Chính tả đơn giản
- Đọc hiểu tranh

---

## 28. Tối ưu chi phí

Để tiết kiệm:

1. Chạy Next.js trên Vercel.
2. Dùng Supabase cho Auth + Database + Storage.
3. Không gọi AI cho mọi câu hỏi đơn giản.
4. Câu hỏi cơ bản lưu sẵn trong database.
5. AI chỉ dùng khi:
   - giải thích lỗi sai,
   - tạo bài cá nhân hoá,
   - tạo báo cáo,
   - chat gia sư,
   - tạo truyện.
6. Cache kết quả AI.
7. Tạo daily plan 1 lần/ngày.
8. Dùng audio có sẵn cho từ vựng phổ biến.
9. Dùng TTS chỉ khi cần.
10. Giới hạn số lượt AI mỗi ngày trong settings.

---

## 29. Chống lạm dụng và bảo vệ chất lượng học

App không nên để con cày vô hạn.

Cần có:

- Nhắc nghỉ sau 25 phút.
- Không thưởng quá nhiều cho làm nhanh.
- Không để leaderboard gây áp lực.
- Ưu tiên sửa lỗi sai.
- Ưu tiên hiểu bài.
- Có thông báo “hôm nay học đủ rồi”.
- Phụ huynh có thể giới hạn thời gian.

Thông điệp:

```text
Học giỏi không phải học thật lâu.
Học giỏi là học đều, hiểu bài và không bỏ cuộc.
```

---

## 30. Prompt tổng cho Antigravity

Dùng prompt này để bắt đầu code:

```text
You are a senior full-stack engineer and product architect.

Build a personalized AI learning web app for a child to learn English, Math, and Vietnamese. The app should act like a 1-on-1 AI tutor, with gamification, smooth animations, scoring, progress tracking, parent dashboard, and personalized learning paths.

Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Vercel deployment
- OpenAI API through secure server-side API routes
- Recharts for analytics
- Zod for validation

Core requirements:
1. Authentication with parent account.
2. Each parent user has UID.
3. Each UID can create one or more child profiles.
4. Store child profile, settings, subject levels, lessons, quiz attempts, progress, rewards, daily plans, and AI tutor memory in database.
5. Use Row Level Security so each user only accesses their own data.
6. Build child dashboard with cartoon UI, XP, stars, streak, pet, daily quests, and subject cards.
7. Build parent dashboard with learning time, accuracy, weak skills, reports, assignments, and AI recommendations.
8. Build lesson and quiz system for English, Math, and Vietnamese.
9. Build adaptive learning engine that selects next skills based on mastery score, attempts, wrong answers, hints used, and response time.
10. Build gamification system: XP, stars, levels, badges, streaks, pet rewards, boss battle.
11. Build AI tutor API that explains mistakes, gives hints, creates daily plans, creates personalized stories, and generates parent reports.
12. AI tutor must be gentle, encouraging, child-safe, and must not give the answer immediately.
13. Build responsive design for desktop, tablet, and mobile.
14. Add animation with Framer Motion and Lottie-ready components.
15. Seed the database with sample lessons and questions for English, Math, and Vietnamese.
16. Prepare the app for Vercel deployment.

Please generate:
- project structure
- database schema
- Supabase RLS policies
- TypeScript types
- core pages
- reusable components
- API routes
- adaptive scoring logic
- gamification logic
- sample seed data
- clean UI with child-friendly design
```

---

## 31. Prompt tạo UI style cho Antigravity

```text
Design the UI as a joyful, modern, child-friendly learning app.

Visual style:
- cute 2D cartoon
- pastel colors
- rounded cards
- large buttons
- smooth motion
- friendly AI tutor avatar
- pet companion
- magical learning map
- soft shadows
- playful icons
- readable typography

The app should feel like a mix of a learning game and a private tutor.

Main child home screen:
- greeting with child nickname
- AI tutor avatar
- pet companion
- daily XP
- streak
- daily quests
- three subject cards: English, Math, Vietnamese
- reward chest
- adventure map button

Parent dashboard:
- clean and professional
- weekly progress chart
- subject mastery
- weak skills
- learning time
- AI recommendation
- assignment creation
```

---

## 32. Prompt tạo database cho Antigravity

```text
Create Supabase PostgreSQL schema for a personalized child learning app.

Tables:
- users
- child_profiles
- child_subject_levels
- skills
- child_skill_mastery
- lessons
- questions
- study_sessions
- question_attempts
- rewards
- child_rewards
- daily_plans
- parent_assignments
- ai_tutor_memory
- reports

Requirements:
- all child data must be linked to parent UID
- enable Row Level Security
- create policies so parent can only access their own child data
- use UUID primary keys
- use created_at and updated_at
- use JSONB for flexible lesson content and AI memory
- include seed data for English, Math, Vietnamese
```

---

## 33. Prompt tạo AI Tutor cho Antigravity

```text
Create an AI Tutor module for a child learning app.

The AI tutor is a gentle female tutor who teaches English, Math, and Vietnamese to a child.

Functions:
1. explainMistake()
2. generateHint()
3. generateDailyPlan()
4. generatePersonalizedLesson()
5. generatePersonalizedStory()
6. generateParentReport()
7. chatWithChild()

Rules:
- never shame the child
- never compare the child with others
- never give the final answer immediately
- give step-by-step hints
- keep explanations short and age-appropriate
- praise effort and improvement
- personalize using child profile, interests, recent mistakes, skill mastery
- stay within learning topics
- avoid unsafe content
```

---

## 34. Tiêu chuẩn hoàn thành MVP

MVP được coi là đạt khi:

1. Phụ huynh đăng ký được.
2. Phụ huynh tạo profile cho con được.
3. Con vào dashboard học được.
4. Có 3 môn Anh, Toán, Việt.
5. Có ít nhất 20 bài học mẫu.
6. Có quiz tương tác.
7. Có chấm đúng/sai.
8. Có lưu điểm và lịch sử học.
9. Có XP, sao, streak.
10. Có dashboard phụ huynh.
11. Có AI giải thích lỗi sai.
12. Có daily plan cơ bản.
13. Dữ liệu lưu theo UID.
14. Deploy được lên Vercel.
15. Giao diện đẹp, vui, dùng được trên iPad/điện thoại.

---

## 35. Tầm nhìn dài hạn

App này không chỉ là app học bài, mà là **hồ sơ phát triển học tập cá nhân của con**.

Theo thời gian, hệ thống sẽ hiểu:

- Con học tốt nhất lúc nào.
- Con thích dạng bài nào.
- Con dễ sai lỗi nào.
- Con cần được động viên kiểu gì.
- Con tiến bộ ra sao.
- Con có năng khiếu ở đâu.
- Con cần bố mẹ hỗ trợ phần nào.

Mục tiêu cuối cùng:

```text
Mỗi ngày con mở app lên và cảm thấy:
“Học vui quá, mình muốn học tiếp!”
```

Nhưng đồng thời bố mẹ vẫn kiểm soát được:

```text
Con học thật, tiến bộ thật, dữ liệu rõ ràng, không học ảo, không cày điểm vô nghĩa.
```
