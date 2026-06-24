# 300 CÂU HỎI TOÁN LỚP 1 DẠNG TRÒ CHƠI – 30 LEVEL

Tài liệu này thiết kế **300 mẫu câu hỏi Toán lớp 1 dạng game tương tác**, chia thành **30 level**. Mỗi level có **5 game**, mỗi game có **2 mẫu câu hỏi**, tổng cộng **30 × 5 × 2 = 300**.

Mỗi câu hỏi có đủ: cách chơi, tương tác, đồ hoạ, animation, âm thanh, gợi ý, logic đáp án, scoring và ghi chú để AI/Antigravity có thể code thành app.

---
## 1. Cấu trúc dữ liệu chuẩn

```json
{
  "question_id": "MATH-G1-L01-G01-Q01",
  "level": 1,
  "game_name": "Chọn đáp án thần tốc",
  "game_type": "tap_choice",
  "question_template": "Có {{count}} {{object}} trên màn hình. Bé hãy chọn số đúng.",
  "variables": {"count": "0-10", "object": ["quả táo", "con mèo"]},
  "answer_logic": "correct_answer = count",
  "interaction": "tap_answer",
  "ui_graphics": "mô tả đồ hoạ",
  "animation": "mô tả animation",
  "sound": "mô tả âm thanh",
  "hints": ["gợi ý 1", "gợi ý 2", "gợi ý 3"]
}
```

---
## 2. Danh sách 30 level

- **Level 01:** Nhận biết số 0-10 — *Nhận diện, đọc và chọn số đúng*
- **Level 02:** Đếm đồ vật 1-10 — *Đếm số lượng đồ vật/con vật*
- **Level 03:** So sánh số trong phạm vi 10 — *Lớn hơn, bé hơn, bằng nhau*
- **Level 04:** Thứ tự số từ 1-20 — *Số liền trước, liền sau, dãy số*
- **Level 05:** Cộng trong phạm vi 5 — *Cộng bằng hình ảnh trực quan*
- **Level 06:** Trừ trong phạm vi 5 — *Bớt đi bằng hình ảnh trực quan*
- **Level 07:** Cộng trong phạm vi 10 — *Cộng số nhỏ, thêm vào*
- **Level 08:** Trừ trong phạm vi 10 — *Trừ số nhỏ, lấy đi*
- **Level 09:** Cộng trừ hỗn hợp phạm vi 10 — *Phân biệt cộng và trừ*
- **Level 10:** Toán có lời văn phạm vi 10 — *Hiểu đề toán đơn giản*
- **Level 11:** Nhận biết số 11-20 — *Đọc, viết, cấu tạo số 11-20*
- **Level 12:** So sánh số 11-20 — *So sánh hai số trong phạm vi 20*
- **Level 13:** Cộng trong phạm vi 20 không nhớ — *Cộng số trong phạm vi 20*
- **Level 14:** Trừ trong phạm vi 20 không mượn — *Trừ số trong phạm vi 20*
- **Level 15:** Tìm số còn thiếu — *Tư duy ngược phép cộng/trừ*
- **Level 16:** Chục và đơn vị — *Phân tích cấu tạo số hai chữ số*
- **Level 17:** Nhận biết số đến 100 — *Đọc, viết, số liền trước/sau*
- **Level 18:** So sánh số đến 100 — *So sánh hàng chục, hàng đơn vị*
- **Level 19:** Cộng các chục tròn — *Cộng 10, 20, 30...*
- **Level 20:** Trừ các chục tròn — *Trừ 10, 20, 30...*
- **Level 21:** Cộng số hai chữ số với một chữ số — *Cộng không nhớ*
- **Level 22:** Trừ số hai chữ số với một chữ số — *Trừ không mượn*
- **Level 23:** Cộng trừ hai chữ số không nhớ/mượn — *Cộng/trừ trong phạm vi 100*
- **Level 24:** Toán có lời văn đến 20 — *Giải bài toán thực tế*
- **Level 25:** Đo độ dài đơn giản — *So sánh và tính độ dài cm*
- **Level 26:** Thời gian đơn giản — *Nhận biết giờ đúng*
- **Level 27:** Hình học cơ bản — *Nhận biết hình và đặc điểm*
- **Level 28:** Quy luật dãy số và hình — *Tìm quy luật đơn giản*
- **Level 29:** Toán thực tế: tiền và đồ vật — *Tính tiền đơn giản*
- **Level 30:** Tổng hợp thử thách lớp 1 — *Ôn tập tổng hợp*

---
## 3. Quy tắc chung cho AI gia sư

- AI đọc câu hỏi ngắn gọn, rõ ràng, vui vẻ.
- Khi bé sai, không chê, không tạo cảm giác thua cuộc.
- Hint 1 chỉ gợi ý nhẹ, không lộ đáp án.
- Hint 2 giải thích hướng làm.
- Hint 3 hướng dẫn từng bước nhưng vẫn để bé tự chọn/nhập đáp án.
- Mỗi câu đúng có khen thưởng bằng âm thanh, sao, XP, coin hoặc mở khoá vật phẩm.
- Không khuyến khích bé cày quá lâu; sau 20-25 phút nên nhắc nghỉ.

---

## Level 01: Nhận biết số 0-10

**Kỹ năng:** Nhận diện, đọc và chọn số đúng

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L01-G01-Q01 | Có {{count}} {{object}} trên màn hình. Bé hãy chọn số đúng. | Có 6 con mèo. Chọn số 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị {{count}} {{object}} để bé đếm rồi chọn số. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L01-G01-Q02 | Cô AI đọc số {{number}}. Bé hãy chạm vào thẻ số {{number}}. | Cô đọc số 8. Chọn thẻ 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Phát âm số và hiện 4 thẻ số. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L01-G02-Q01 | Có {{count}} {{object}} trên màn hình. Bé hãy chọn số đúng. | Có 6 con mèo. Chọn số 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị {{count}} {{object}} để bé đếm rồi chọn số. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L01-G02-Q02 | Cô AI đọc số {{number}}. Bé hãy chạm vào thẻ số {{number}}. | Cô đọc số 8. Chọn thẻ 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Phát âm số và hiện 4 thẻ số. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L01-G03-Q01 | Có {{count}} {{object}} trên màn hình. Bé hãy chọn số đúng. | Có 6 con mèo. Chọn số 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị {{count}} {{object}} để bé đếm rồi chọn số. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L01-G03-Q02 | Cô AI đọc số {{number}}. Bé hãy chạm vào thẻ số {{number}}. | Cô đọc số 8. Chọn thẻ 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Phát âm số và hiện 4 thẻ số. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L01-G04-Q01 | Có {{count}} {{object}} trên màn hình. Bé hãy chọn số đúng. | Có 6 con mèo. Chọn số 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị {{count}} {{object}} để bé đếm rồi chọn số. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L01-G04-Q02 | Cô AI đọc số {{number}}. Bé hãy chạm vào thẻ số {{number}}. | Cô đọc số 8. Chọn thẻ 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Phát âm số và hiện 4 thẻ số. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L01-G05-Q01 | Có {{count}} {{object}} trên màn hình. Bé hãy chọn số đúng. | Có 6 con mèo. Chọn số 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị {{count}} {{object}} để bé đếm rồi chọn số. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L01-G05-Q02 | Cô AI đọc số {{number}}. Bé hãy chạm vào thẻ số {{number}}. | Cô đọc số 8. Chọn thẻ 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Phát âm số và hiện 4 thẻ số. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number |

## Level 02: Đếm đồ vật 1-10

**Kỹ năng:** Đếm số lượng đồ vật/con vật

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L02-G01-Q01 | Đếm xem trong giỏ có bao nhiêu {{object}}. | Trong giỏ có 7 viên kẹo. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Hiện một chiếc giỏ chứa {{count}} đồ vật. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L02-G01-Q02 | Cho thú cưng ăn đúng {{count}} {{object}}. | Kéo 4 quả táo vào bát. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đúng số lượng đồ vật vào bát của thú cưng. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count_items_dragged == count |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L02-G02-Q01 | Đếm xem trong giỏ có bao nhiêu {{object}}. | Trong giỏ có 7 viên kẹo. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Hiện một chiếc giỏ chứa {{count}} đồ vật. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L02-G02-Q02 | Cho thú cưng ăn đúng {{count}} {{object}}. | Kéo 4 quả táo vào bát. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đúng số lượng đồ vật vào bát của thú cưng. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count_items_dragged == count |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L02-G03-Q01 | Đếm xem trong giỏ có bao nhiêu {{object}}. | Trong giỏ có 7 viên kẹo. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Hiện một chiếc giỏ chứa {{count}} đồ vật. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L02-G03-Q02 | Cho thú cưng ăn đúng {{count}} {{object}}. | Kéo 4 quả táo vào bát. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đúng số lượng đồ vật vào bát của thú cưng. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count_items_dragged == count |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L02-G04-Q01 | Đếm xem trong giỏ có bao nhiêu {{object}}. | Trong giỏ có 7 viên kẹo. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Hiện một chiếc giỏ chứa {{count}} đồ vật. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L02-G04-Q02 | Cho thú cưng ăn đúng {{count}} {{object}}. | Kéo 4 quả táo vào bát. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đúng số lượng đồ vật vào bát của thú cưng. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count_items_dragged == count |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L02-G05-Q01 | Đếm xem trong giỏ có bao nhiêu {{object}}. | Trong giỏ có 7 viên kẹo. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Hiện một chiếc giỏ chứa {{count}} đồ vật. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count |
| MATH-G1-L02-G05-Q02 | Cho thú cưng ăn đúng {{count}} {{object}}. | Kéo 4 quả táo vào bát. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đúng số lượng đồ vật vào bát của thú cưng. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = count_items_dragged == count |

## Level 03: So sánh số trong phạm vi 10

**Kỹ năng:** Lớn hơn, bé hơn, bằng nhau

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L03-G01-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 7 và 3. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai toa tàu, bé chọn toa có số lớn hơn. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L03-G01-Q02 | Kéo dấu đúng vào giữa: {{a}} __ {{b}} | 4 __ 9. Đáp án <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào ô trống. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L03-G02-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 7 và 3. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai toa tàu, bé chọn toa có số lớn hơn. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L03-G02-Q02 | Kéo dấu đúng vào giữa: {{a}} __ {{b}} | 4 __ 9. Đáp án <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào ô trống. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L03-G03-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 7 và 3. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai toa tàu, bé chọn toa có số lớn hơn. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L03-G03-Q02 | Kéo dấu đúng vào giữa: {{a}} __ {{b}} | 4 __ 9. Đáp án <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào ô trống. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L03-G04-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 7 và 3. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai toa tàu, bé chọn toa có số lớn hơn. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L03-G04-Q02 | Kéo dấu đúng vào giữa: {{a}} __ {{b}} | 4 __ 9. Đáp án <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào ô trống. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L03-G05-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 7 và 3. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai toa tàu, bé chọn toa có số lớn hơn. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L03-G05-Q02 | Kéo dấu đúng vào giữa: {{a}} __ {{b}} | 4 __ 9. Đáp án <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào ô trống. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

## Level 04: Thứ tự số từ 1-20

**Kỹ năng:** Số liền trước, liền sau, dãy số

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L04-G01-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_1}}, __, {{a_plus_3}}. | 5, 6, __, 8. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Dãy số hiện trên con đường, bé chọn viên đá số còn thiếu. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + 2 |
| MATH-G1-L04-G01-Q02 | Sắp xếp các số {{numbers}} theo thứ tự tăng dần. | 12, 5, 9 → 5, 9, 12. | 5, 9, 12 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo các thẻ số lên cầu thang từ thấp đến cao. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sorted(numbers) |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L04-G02-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_1}}, __, {{a_plus_3}}. | 5, 6, __, 8. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Dãy số hiện trên con đường, bé chọn viên đá số còn thiếu. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + 2 |
| MATH-G1-L04-G02-Q02 | Sắp xếp các số {{numbers}} theo thứ tự tăng dần. | 12, 5, 9 → 5, 9, 12. | 5, 9, 12 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo các thẻ số lên cầu thang từ thấp đến cao. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sorted(numbers) |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L04-G03-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_1}}, __, {{a_plus_3}}. | 5, 6, __, 8. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Dãy số hiện trên con đường, bé chọn viên đá số còn thiếu. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + 2 |
| MATH-G1-L04-G03-Q02 | Sắp xếp các số {{numbers}} theo thứ tự tăng dần. | 12, 5, 9 → 5, 9, 12. | 5, 9, 12 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo các thẻ số lên cầu thang từ thấp đến cao. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sorted(numbers) |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L04-G04-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_1}}, __, {{a_plus_3}}. | 5, 6, __, 8. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Dãy số hiện trên con đường, bé chọn viên đá số còn thiếu. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + 2 |
| MATH-G1-L04-G04-Q02 | Sắp xếp các số {{numbers}} theo thứ tự tăng dần. | 12, 5, 9 → 5, 9, 12. | 5, 9, 12 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo các thẻ số lên cầu thang từ thấp đến cao. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sorted(numbers) |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L04-G05-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_1}}, __, {{a_plus_3}}. | 5, 6, __, 8. Đáp án 7. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Dãy số hiện trên con đường, bé chọn viên đá số còn thiếu. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + 2 |
| MATH-G1-L04-G05-Q02 | Sắp xếp các số {{numbers}} theo thứ tự tăng dần. | 12, 5, 9 → 5, 9, 12. | 5, 9, 12 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo các thẻ số lên cầu thang từ thấp đến cao. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sorted(numbers) |

## Level 05: Cộng trong phạm vi 5

**Kỹ năng:** Cộng bằng hình ảnh trực quan

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L05-G01-Q01 | {{a}} + {{b}} = ? | 2 + 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật bên trái và {{b}} đồ vật bên phải để bé gộp lại. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L05-G01-Q02 | Bé có {{a}} {{object}}, cô tặng thêm {{b}}. Bé có tất cả bao nhiêu? | Có 1 kẹo, thêm 4 kẹo → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhận thêm đồ vật, bé kéo gộp vào giỏ. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L05-G02-Q01 | {{a}} + {{b}} = ? | 2 + 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật bên trái và {{b}} đồ vật bên phải để bé gộp lại. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L05-G02-Q02 | Bé có {{a}} {{object}}, cô tặng thêm {{b}}. Bé có tất cả bao nhiêu? | Có 1 kẹo, thêm 4 kẹo → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhận thêm đồ vật, bé kéo gộp vào giỏ. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L05-G03-Q01 | {{a}} + {{b}} = ? | 2 + 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật bên trái và {{b}} đồ vật bên phải để bé gộp lại. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L05-G03-Q02 | Bé có {{a}} {{object}}, cô tặng thêm {{b}}. Bé có tất cả bao nhiêu? | Có 1 kẹo, thêm 4 kẹo → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhận thêm đồ vật, bé kéo gộp vào giỏ. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L05-G04-Q01 | {{a}} + {{b}} = ? | 2 + 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật bên trái và {{b}} đồ vật bên phải để bé gộp lại. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L05-G04-Q02 | Bé có {{a}} {{object}}, cô tặng thêm {{b}}. Bé có tất cả bao nhiêu? | Có 1 kẹo, thêm 4 kẹo → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhận thêm đồ vật, bé kéo gộp vào giỏ. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L05-G05-Q01 | {{a}} + {{b}} = ? | 2 + 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật bên trái và {{b}} đồ vật bên phải để bé gộp lại. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L05-G05-Q02 | Bé có {{a}} {{object}}, cô tặng thêm {{b}}. Bé có tất cả bao nhiêu? | Có 1 kẹo, thêm 4 kẹo → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhận thêm đồ vật, bé kéo gộp vào giỏ. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

## Level 06: Trừ trong phạm vi 5

**Kỹ năng:** Bớt đi bằng hình ảnh trực quan

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L06-G01-Q01 | {{a}} - {{b}} = ? | 5 - 2 = 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé chạm để lấy đi {{b}} đồ vật. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L06-G01-Q02 | Có {{a}} {{object}}. Bay/mất đi {{b}}. Còn lại bao nhiêu? | Có 4 con thỏ, 1 con đi mất → còn 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất bằng animation nhẹ, bé đếm phần còn lại. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L06-G02-Q01 | {{a}} - {{b}} = ? | 5 - 2 = 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé chạm để lấy đi {{b}} đồ vật. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L06-G02-Q02 | Có {{a}} {{object}}. Bay/mất đi {{b}}. Còn lại bao nhiêu? | Có 4 con thỏ, 1 con đi mất → còn 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất bằng animation nhẹ, bé đếm phần còn lại. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L06-G03-Q01 | {{a}} - {{b}} = ? | 5 - 2 = 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé chạm để lấy đi {{b}} đồ vật. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L06-G03-Q02 | Có {{a}} {{object}}. Bay/mất đi {{b}}. Còn lại bao nhiêu? | Có 4 con thỏ, 1 con đi mất → còn 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất bằng animation nhẹ, bé đếm phần còn lại. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L06-G04-Q01 | {{a}} - {{b}} = ? | 5 - 2 = 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé chạm để lấy đi {{b}} đồ vật. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L06-G04-Q02 | Có {{a}} {{object}}. Bay/mất đi {{b}}. Còn lại bao nhiêu? | Có 4 con thỏ, 1 con đi mất → còn 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất bằng animation nhẹ, bé đếm phần còn lại. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L06-G05-Q01 | {{a}} - {{b}} = ? | 5 - 2 = 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé chạm để lấy đi {{b}} đồ vật. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L06-G05-Q02 | Có {{a}} {{object}}. Bay/mất đi {{b}}. Còn lại bao nhiêu? | Có 4 con thỏ, 1 con đi mất → còn 3. | 3 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất bằng animation nhẹ, bé đếm phần còn lại. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

## Level 07: Cộng trong phạm vi 10

**Kỹ năng:** Cộng số nhỏ, thêm vào

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L07-G01-Q01 | {{a}} + {{b}} = ? | 6 + 3 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Dùng khung 10 ô, bé thấy số lượng được gộp. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L07-G01-Q02 | Mở rương cần {{a}} viên ngọc và thêm {{b}} viên ngọc. Tổng là bao nhiêu? | 4 + 5 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo ngọc vào rương, rương mở nếu đủ tổng. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L07-G02-Q01 | {{a}} + {{b}} = ? | 6 + 3 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Dùng khung 10 ô, bé thấy số lượng được gộp. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L07-G02-Q02 | Mở rương cần {{a}} viên ngọc và thêm {{b}} viên ngọc. Tổng là bao nhiêu? | 4 + 5 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo ngọc vào rương, rương mở nếu đủ tổng. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L07-G03-Q01 | {{a}} + {{b}} = ? | 6 + 3 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Dùng khung 10 ô, bé thấy số lượng được gộp. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L07-G03-Q02 | Mở rương cần {{a}} viên ngọc và thêm {{b}} viên ngọc. Tổng là bao nhiêu? | 4 + 5 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo ngọc vào rương, rương mở nếu đủ tổng. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L07-G04-Q01 | {{a}} + {{b}} = ? | 6 + 3 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Dùng khung 10 ô, bé thấy số lượng được gộp. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L07-G04-Q02 | Mở rương cần {{a}} viên ngọc và thêm {{b}} viên ngọc. Tổng là bao nhiêu? | 4 + 5 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo ngọc vào rương, rương mở nếu đủ tổng. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L07-G05-Q01 | {{a}} + {{b}} = ? | 6 + 3 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Dùng khung 10 ô, bé thấy số lượng được gộp. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L07-G05-Q02 | Mở rương cần {{a}} viên ngọc và thêm {{b}} viên ngọc. Tổng là bao nhiêu? | 4 + 5 = 9. | 9 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo ngọc vào rương, rương mở nếu đủ tổng. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

## Level 08: Trừ trong phạm vi 10

**Kỹ năng:** Trừ số nhỏ, lấy đi

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L08-G01-Q01 | {{a}} - {{b}} = ? | 8 - 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé bỏ đi {{b}} món. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L08-G01-Q02 | Có {{a}} bong bóng, {{b}} bong bóng bay đi. Còn mấy bong bóng? | 10 - 4 = 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bong bóng bay lên khỏi màn hình, bé đếm phần còn lại. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L08-G02-Q01 | {{a}} - {{b}} = ? | 8 - 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé bỏ đi {{b}} món. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L08-G02-Q02 | Có {{a}} bong bóng, {{b}} bong bóng bay đi. Còn mấy bong bóng? | 10 - 4 = 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bong bóng bay lên khỏi màn hình, bé đếm phần còn lại. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L08-G03-Q01 | {{a}} - {{b}} = ? | 8 - 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé bỏ đi {{b}} món. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L08-G03-Q02 | Có {{a}} bong bóng, {{b}} bong bóng bay đi. Còn mấy bong bóng? | 10 - 4 = 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bong bóng bay lên khỏi màn hình, bé đếm phần còn lại. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L08-G04-Q01 | {{a}} - {{b}} = ? | 8 - 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé bỏ đi {{b}} món. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L08-G04-Q02 | Có {{a}} bong bóng, {{b}} bong bóng bay đi. Còn mấy bong bóng? | 10 - 4 = 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bong bóng bay lên khỏi màn hình, bé đếm phần còn lại. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L08-G05-Q01 | {{a}} - {{b}} = ? | 8 - 3 = 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Hiện {{a}} đồ vật, bé bỏ đi {{b}} món. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L08-G05-Q02 | Có {{a}} bong bóng, {{b}} bong bóng bay đi. Còn mấy bong bóng? | 10 - 4 = 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bong bóng bay lên khỏi màn hình, bé đếm phần còn lại. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

## Level 09: Cộng trừ hỗn hợp phạm vi 10

**Kỹ năng:** Phân biệt cộng và trừ

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L09-G01-Q01 | Chọn phép tính đúng cho câu chuyện: Có {{a}} {{object}}, thêm {{b}}. Hỏi tất cả? | Có 3, thêm 2 → chọn +, đáp án 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - trước khi tính. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '+'; correct_answer = a+b |
| MATH-G1-L09-G01-Q02 | Chọn phép tính đúng: Có {{a}} {{object}}, bớt đi {{b}}. Hỏi còn lại? | Có 9, bớt 3 → chọn -, đáp án 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - rồi chọn đáp án. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '-'; correct_answer = a-b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L09-G02-Q01 | Chọn phép tính đúng cho câu chuyện: Có {{a}} {{object}}, thêm {{b}}. Hỏi tất cả? | Có 3, thêm 2 → chọn +, đáp án 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - trước khi tính. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '+'; correct_answer = a+b |
| MATH-G1-L09-G02-Q02 | Chọn phép tính đúng: Có {{a}} {{object}}, bớt đi {{b}}. Hỏi còn lại? | Có 9, bớt 3 → chọn -, đáp án 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - rồi chọn đáp án. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '-'; correct_answer = a-b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L09-G03-Q01 | Chọn phép tính đúng cho câu chuyện: Có {{a}} {{object}}, thêm {{b}}. Hỏi tất cả? | Có 3, thêm 2 → chọn +, đáp án 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - trước khi tính. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '+'; correct_answer = a+b |
| MATH-G1-L09-G03-Q02 | Chọn phép tính đúng: Có {{a}} {{object}}, bớt đi {{b}}. Hỏi còn lại? | Có 9, bớt 3 → chọn -, đáp án 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - rồi chọn đáp án. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '-'; correct_answer = a-b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L09-G04-Q01 | Chọn phép tính đúng cho câu chuyện: Có {{a}} {{object}}, thêm {{b}}. Hỏi tất cả? | Có 3, thêm 2 → chọn +, đáp án 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - trước khi tính. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '+'; correct_answer = a+b |
| MATH-G1-L09-G04-Q02 | Chọn phép tính đúng: Có {{a}} {{object}}, bớt đi {{b}}. Hỏi còn lại? | Có 9, bớt 3 → chọn -, đáp án 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - rồi chọn đáp án. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '-'; correct_answer = a-b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L09-G05-Q01 | Chọn phép tính đúng cho câu chuyện: Có {{a}} {{object}}, thêm {{b}}. Hỏi tất cả? | Có 3, thêm 2 → chọn +, đáp án 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - trước khi tính. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '+'; correct_answer = a+b |
| MATH-G1-L09-G05-Q02 | Chọn phép tính đúng: Có {{a}} {{object}}, bớt đi {{b}}. Hỏi còn lại? | Có 9, bớt 3 → chọn -, đáp án 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn dấu + hoặc - rồi chọn đáp án. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_operation = '-'; correct_answer = a-b |

## Level 10: Toán có lời văn phạm vi 10

**Kỹ năng:** Hiểu đề toán đơn giản

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L10-G01-Q01 | {{name}} có {{a}} {{object}}. Mẹ cho thêm {{b}}. Hỏi {{name}} có tất cả bao nhiêu? | Mimi có 4 táo, thêm 2 → 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình nhân vật và đồ vật minh hoạ. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + b |
| MATH-G1-L10-G01-Q02 | {{name}} có {{a}} {{object}}. {{name}} cho bạn {{b}}. Hỏi còn lại bao nhiêu? | Na có 8 kẹo, cho 3 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đồ vật tặng bạn, rồi đếm số còn lại. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L10-G02-Q01 | {{name}} có {{a}} {{object}}. Mẹ cho thêm {{b}}. Hỏi {{name}} có tất cả bao nhiêu? | Mimi có 4 táo, thêm 2 → 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình nhân vật và đồ vật minh hoạ. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + b |
| MATH-G1-L10-G02-Q02 | {{name}} có {{a}} {{object}}. {{name}} cho bạn {{b}}. Hỏi còn lại bao nhiêu? | Na có 8 kẹo, cho 3 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đồ vật tặng bạn, rồi đếm số còn lại. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L10-G03-Q01 | {{name}} có {{a}} {{object}}. Mẹ cho thêm {{b}}. Hỏi {{name}} có tất cả bao nhiêu? | Mimi có 4 táo, thêm 2 → 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình nhân vật và đồ vật minh hoạ. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + b |
| MATH-G1-L10-G03-Q02 | {{name}} có {{a}} {{object}}. {{name}} cho bạn {{b}}. Hỏi còn lại bao nhiêu? | Na có 8 kẹo, cho 3 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đồ vật tặng bạn, rồi đếm số còn lại. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L10-G04-Q01 | {{name}} có {{a}} {{object}}. Mẹ cho thêm {{b}}. Hỏi {{name}} có tất cả bao nhiêu? | Mimi có 4 táo, thêm 2 → 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình nhân vật và đồ vật minh hoạ. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + b |
| MATH-G1-L10-G04-Q02 | {{name}} có {{a}} {{object}}. {{name}} cho bạn {{b}}. Hỏi còn lại bao nhiêu? | Na có 8 kẹo, cho 3 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đồ vật tặng bạn, rồi đếm số còn lại. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L10-G05-Q01 | {{name}} có {{a}} {{object}}. Mẹ cho thêm {{b}}. Hỏi {{name}} có tất cả bao nhiêu? | Mimi có 4 táo, thêm 2 → 6. | 6 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình nhân vật và đồ vật minh hoạ. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a + b |
| MATH-G1-L10-G05-Q02 | {{name}} có {{a}} {{object}}. {{name}} cho bạn {{b}}. Hỏi còn lại bao nhiêu? | Na có 8 kẹo, cho 3 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo đồ vật tặng bạn, rồi đếm số còn lại. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - b |

## Level 11: Nhận biết số 11-20

**Kỹ năng:** Đọc, viết, cấu tạo số 11-20

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L11-G01-Q01 | Số {{number}} gồm 1 chục và mấy đơn vị? | 17 gồm 1 chục và 7 đơn vị. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó que tính 1 chục và các que rời. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 10 |
| MATH-G1-L11-G01-Q02 | Viết số gồm 1 chục và {{ones}} đơn vị. | 1 chục và 5 đơn vị → 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo 1 bó chục và {{ones}} que đơn vị. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = 10 + ones |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L11-G02-Q01 | Số {{number}} gồm 1 chục và mấy đơn vị? | 17 gồm 1 chục và 7 đơn vị. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó que tính 1 chục và các que rời. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 10 |
| MATH-G1-L11-G02-Q02 | Viết số gồm 1 chục và {{ones}} đơn vị. | 1 chục và 5 đơn vị → 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo 1 bó chục và {{ones}} que đơn vị. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = 10 + ones |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L11-G03-Q01 | Số {{number}} gồm 1 chục và mấy đơn vị? | 17 gồm 1 chục và 7 đơn vị. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó que tính 1 chục và các que rời. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 10 |
| MATH-G1-L11-G03-Q02 | Viết số gồm 1 chục và {{ones}} đơn vị. | 1 chục và 5 đơn vị → 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo 1 bó chục và {{ones}} que đơn vị. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = 10 + ones |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L11-G04-Q01 | Số {{number}} gồm 1 chục và mấy đơn vị? | 17 gồm 1 chục và 7 đơn vị. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó que tính 1 chục và các que rời. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 10 |
| MATH-G1-L11-G04-Q02 | Viết số gồm 1 chục và {{ones}} đơn vị. | 1 chục và 5 đơn vị → 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo 1 bó chục và {{ones}} que đơn vị. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = 10 + ones |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L11-G05-Q01 | Số {{number}} gồm 1 chục và mấy đơn vị? | 17 gồm 1 chục và 7 đơn vị. | 7 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó que tính 1 chục và các que rời. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 10 |
| MATH-G1-L11-G05-Q02 | Viết số gồm 1 chục và {{ones}} đơn vị. | 1 chục và 5 đơn vị → 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo 1 bó chục và {{ones}} que đơn vị. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = 10 + ones |

## Level 12: So sánh số 11-20

**Kỹ năng:** So sánh hai số trong phạm vi 20

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L12-G01-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 18 và 12 → 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Hai số đứng trên bục, bé chọn số đứng cao hơn. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L12-G01-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 13 __ 19 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào giữa hai số. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L12-G02-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 18 và 12 → 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Hai số đứng trên bục, bé chọn số đứng cao hơn. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L12-G02-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 13 __ 19 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào giữa hai số. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L12-G03-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 18 và 12 → 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Hai số đứng trên bục, bé chọn số đứng cao hơn. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L12-G03-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 13 __ 19 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào giữa hai số. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L12-G04-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 18 và 12 → 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Hai số đứng trên bục, bé chọn số đứng cao hơn. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L12-G04-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 13 __ 19 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào giữa hai số. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L12-G05-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 18 và 12 → 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Hai số đứng trên bục, bé chọn số đứng cao hơn. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L12-G05-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 13 __ 19 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo dấu >, < hoặc = vào giữa hai số. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

## Level 13: Cộng trong phạm vi 20 không nhớ

**Kỹ năng:** Cộng số trong phạm vi 20

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L13-G01-Q01 | {{a}} + {{b}} = ? | 14 + 3 = 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính: chục giữ nguyên, cộng đơn vị. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L13-G01-Q02 | Rương có {{a}} viên ngọc, thêm {{b}} viên. Tổng là bao nhiêu? | 12 + 6 = 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Ngọc được gộp vào rương, bé chọn tổng. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L13-G02-Q01 | {{a}} + {{b}} = ? | 14 + 3 = 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính: chục giữ nguyên, cộng đơn vị. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L13-G02-Q02 | Rương có {{a}} viên ngọc, thêm {{b}} viên. Tổng là bao nhiêu? | 12 + 6 = 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Ngọc được gộp vào rương, bé chọn tổng. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L13-G03-Q01 | {{a}} + {{b}} = ? | 14 + 3 = 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính: chục giữ nguyên, cộng đơn vị. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L13-G03-Q02 | Rương có {{a}} viên ngọc, thêm {{b}} viên. Tổng là bao nhiêu? | 12 + 6 = 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Ngọc được gộp vào rương, bé chọn tổng. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L13-G04-Q01 | {{a}} + {{b}} = ? | 14 + 3 = 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính: chục giữ nguyên, cộng đơn vị. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L13-G04-Q02 | Rương có {{a}} viên ngọc, thêm {{b}} viên. Tổng là bao nhiêu? | 12 + 6 = 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Ngọc được gộp vào rương, bé chọn tổng. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L13-G05-Q01 | {{a}} + {{b}} = ? | 14 + 3 = 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính: chục giữ nguyên, cộng đơn vị. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |
| MATH-G1-L13-G05-Q02 | Rương có {{a}} viên ngọc, thêm {{b}} viên. Tổng là bao nhiêu? | 12 + 6 = 18. | 18 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Ngọc được gộp vào rương, bé chọn tổng. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a + b |

## Level 14: Trừ trong phạm vi 20 không mượn

**Kỹ năng:** Trừ số trong phạm vi 20

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L14-G01-Q01 | {{a}} - {{b}} = ? | 18 - 3 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính, lấy bớt ở hàng đơn vị. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L14-G01-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn lại bao nhiêu? | 19 - 4 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất theo nhóm, bé đếm còn lại. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L14-G02-Q01 | {{a}} - {{b}} = ? | 18 - 3 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính, lấy bớt ở hàng đơn vị. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L14-G02-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn lại bao nhiêu? | 19 - 4 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất theo nhóm, bé đếm còn lại. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L14-G03-Q01 | {{a}} - {{b}} = ? | 18 - 3 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính, lấy bớt ở hàng đơn vị. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L14-G03-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn lại bao nhiêu? | 19 - 4 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất theo nhóm, bé đếm còn lại. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L14-G04-Q01 | {{a}} - {{b}} = ? | 18 - 3 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính, lấy bớt ở hàng đơn vị. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L14-G04-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn lại bao nhiêu? | 19 - 4 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất theo nhóm, bé đếm còn lại. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L14-G05-Q01 | {{a}} - {{b}} = ? | 18 - 3 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Dùng que tính, lấy bớt ở hàng đơn vị. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |
| MATH-G1-L14-G05-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn lại bao nhiêu? | 19 - 4 = 15. | 15 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật biến mất theo nhóm, bé đếm còn lại. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a - b |

## Level 15: Tìm số còn thiếu

**Kỹ năng:** Tư duy ngược phép cộng/trừ

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L15-G01-Q01 | __ + {{b}} = {{sum}}. Số còn thiếu là gì? | __ + 3 = 8 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo số còn thiếu vào ô trống để cân bằng phép tính. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sum - b |
| MATH-G1-L15-G01-Q02 | {{a}} - __ = {{result}}. Số còn thiếu là gì? | 10 - __ = 6 → 4. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn số bị bớt đi để phép tính đúng. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - result |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L15-G02-Q01 | __ + {{b}} = {{sum}}. Số còn thiếu là gì? | __ + 3 = 8 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo số còn thiếu vào ô trống để cân bằng phép tính. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sum - b |
| MATH-G1-L15-G02-Q02 | {{a}} - __ = {{result}}. Số còn thiếu là gì? | 10 - __ = 6 → 4. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn số bị bớt đi để phép tính đúng. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - result |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L15-G03-Q01 | __ + {{b}} = {{sum}}. Số còn thiếu là gì? | __ + 3 = 8 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo số còn thiếu vào ô trống để cân bằng phép tính. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sum - b |
| MATH-G1-L15-G03-Q02 | {{a}} - __ = {{result}}. Số còn thiếu là gì? | 10 - __ = 6 → 4. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn số bị bớt đi để phép tính đúng. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - result |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L15-G04-Q01 | __ + {{b}} = {{sum}}. Số còn thiếu là gì? | __ + 3 = 8 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo số còn thiếu vào ô trống để cân bằng phép tính. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sum - b |
| MATH-G1-L15-G04-Q02 | {{a}} - __ = {{result}}. Số còn thiếu là gì? | 10 - __ = 6 → 4. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn số bị bớt đi để phép tính đúng. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - result |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L15-G05-Q01 | __ + {{b}} = {{sum}}. Số còn thiếu là gì? | __ + 3 = 8 → 5. | 5 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo số còn thiếu vào ô trống để cân bằng phép tính. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = sum - b |
| MATH-G1-L15-G05-Q02 | {{a}} - __ = {{result}}. Số còn thiếu là gì? | 10 - __ = 6 → 4. | 4 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé chọn số bị bớt đi để phép tính đúng. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a - result |

## Level 16: Chục và đơn vị

**Kỹ năng:** Phân tích cấu tạo số hai chữ số

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L16-G01-Q01 | Số {{number}} gồm mấy chục và mấy đơn vị? | 52 → 5 chục và 2 đơn vị. | 5 chục, 2 đơn vị | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị bó que chục và que đơn vị; bé chọn cặp đúng. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = floor(number/10) chục và number%10 đơn vị |
| MATH-G1-L16-G01-Q02 | Ghép {{tens}} chục và {{ones}} đơn vị thành số nào? | 8 chục và 5 đơn vị → 85. | 85 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bó chục và đơn vị vào bảng để tạo số. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = tens*10 + ones |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L16-G02-Q01 | Số {{number}} gồm mấy chục và mấy đơn vị? | 52 → 5 chục và 2 đơn vị. | 5 chục, 2 đơn vị | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị bó que chục và que đơn vị; bé chọn cặp đúng. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = floor(number/10) chục và number%10 đơn vị |
| MATH-G1-L16-G02-Q02 | Ghép {{tens}} chục và {{ones}} đơn vị thành số nào? | 8 chục và 5 đơn vị → 85. | 85 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bó chục và đơn vị vào bảng để tạo số. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = tens*10 + ones |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L16-G03-Q01 | Số {{number}} gồm mấy chục và mấy đơn vị? | 52 → 5 chục và 2 đơn vị. | 5 chục, 2 đơn vị | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị bó que chục và que đơn vị; bé chọn cặp đúng. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = floor(number/10) chục và number%10 đơn vị |
| MATH-G1-L16-G03-Q02 | Ghép {{tens}} chục và {{ones}} đơn vị thành số nào? | 8 chục và 5 đơn vị → 85. | 85 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bó chục và đơn vị vào bảng để tạo số. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = tens*10 + ones |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L16-G04-Q01 | Số {{number}} gồm mấy chục và mấy đơn vị? | 52 → 5 chục và 2 đơn vị. | 5 chục, 2 đơn vị | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị bó que chục và que đơn vị; bé chọn cặp đúng. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = floor(number/10) chục và number%10 đơn vị |
| MATH-G1-L16-G04-Q02 | Ghép {{tens}} chục và {{ones}} đơn vị thành số nào? | 8 chục và 5 đơn vị → 85. | 85 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bó chục và đơn vị vào bảng để tạo số. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = tens*10 + ones |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L16-G05-Q01 | Số {{number}} gồm mấy chục và mấy đơn vị? | 52 → 5 chục và 2 đơn vị. | 5 chục, 2 đơn vị | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Hiển thị bó que chục và que đơn vị; bé chọn cặp đúng. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = floor(number/10) chục và number%10 đơn vị |
| MATH-G1-L16-G05-Q02 | Ghép {{tens}} chục và {{ones}} đơn vị thành số nào? | 8 chục và 5 đơn vị → 85. | 85 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bó chục và đơn vị vào bảng để tạo số. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = tens*10 + ones |

## Level 17: Nhận biết số đến 100

**Kỹ năng:** Đọc, viết, số liền trước/sau

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L17-G01-Q01 | Số liền sau của {{number}} là số nào? | Sau 88 là 89. | 89 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhảy sang bậc số tiếp theo. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number + 1 |
| MATH-G1-L17-G01-Q02 | Số liền trước của {{number}} là số nào? | Trước 91 là 90. | 90 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật lùi lại một bậc trên đường số. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 1 |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L17-G02-Q01 | Số liền sau của {{number}} là số nào? | Sau 88 là 89. | 89 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhảy sang bậc số tiếp theo. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number + 1 |
| MATH-G1-L17-G02-Q02 | Số liền trước của {{number}} là số nào? | Trước 91 là 90. | 90 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật lùi lại một bậc trên đường số. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 1 |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L17-G03-Q01 | Số liền sau của {{number}} là số nào? | Sau 88 là 89. | 89 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhảy sang bậc số tiếp theo. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number + 1 |
| MATH-G1-L17-G03-Q02 | Số liền trước của {{number}} là số nào? | Trước 91 là 90. | 90 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật lùi lại một bậc trên đường số. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 1 |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L17-G04-Q01 | Số liền sau của {{number}} là số nào? | Sau 88 là 89. | 89 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhảy sang bậc số tiếp theo. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number + 1 |
| MATH-G1-L17-G04-Q02 | Số liền trước của {{number}} là số nào? | Trước 91 là 90. | 90 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật lùi lại một bậc trên đường số. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 1 |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L17-G05-Q01 | Số liền sau của {{number}} là số nào? | Sau 88 là 89. | 89 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật nhảy sang bậc số tiếp theo. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number + 1 |
| MATH-G1-L17-G05-Q02 | Số liền trước của {{number}} là số nào? | Trước 91 là 90. | 90 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật lùi lại một bậc trên đường số. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = number - 1 |

## Level 18: So sánh số đến 100

**Kỹ năng:** So sánh hàng chục, hàng đơn vị

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L18-G01-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 86 và 68 → 86. | 86 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai ngọn núi, số lớn hơn ở núi cao hơn. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L18-G01-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 35 __ 53 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé so sánh hàng chục trước rồi kéo dấu. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L18-G02-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 86 và 68 → 86. | 86 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai ngọn núi, số lớn hơn ở núi cao hơn. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L18-G02-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 35 __ 53 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé so sánh hàng chục trước rồi kéo dấu. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L18-G03-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 86 và 68 → 86. | 86 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai ngọn núi, số lớn hơn ở núi cao hơn. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L18-G03-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 35 __ 53 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé so sánh hàng chục trước rồi kéo dấu. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L18-G04-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 86 và 68 → 86. | 86 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai ngọn núi, số lớn hơn ở núi cao hơn. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L18-G04-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 35 __ 53 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé so sánh hàng chục trước rồi kéo dấu. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L18-G05-Q01 | Số nào lớn hơn: {{a}} hay {{b}}? | 86 và 68 → 86. | 86 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Hai số nằm trên hai ngọn núi, số lớn hơn ở núi cao hơn. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = max(a,b) |
| MATH-G1-L18-G05-Q02 | Kéo dấu đúng: {{a}} __ {{b}} | 35 __ 53 → <. | < | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé so sánh hàng chục trước rồi kéo dấu. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy nhìn hàng chục trước, nếu bằng nhau thì nhìn hàng đơn vị.<br>3. Số đứng sau khi đếm thường là số lớn hơn. | correct_answer = compare(a,b) |

## Level 19: Cộng các chục tròn

**Kỹ năng:** Cộng 10, 20, 30...

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L19-G01-Q01 | {{a}} + {{b}} = ? | 30 + 20 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó chục để bé cộng theo chục. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L19-G01-Q02 | Có {{a}} viên gạch, thêm {{b}} viên gạch. Có tất cả bao nhiêu? | 40 + 40 = 80. | 80 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Gạch xếp theo bó 10, bé gộp các bó. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L19-G02-Q01 | {{a}} + {{b}} = ? | 30 + 20 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó chục để bé cộng theo chục. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L19-G02-Q02 | Có {{a}} viên gạch, thêm {{b}} viên gạch. Có tất cả bao nhiêu? | 40 + 40 = 80. | 80 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Gạch xếp theo bó 10, bé gộp các bó. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L19-G03-Q01 | {{a}} + {{b}} = ? | 30 + 20 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó chục để bé cộng theo chục. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L19-G03-Q02 | Có {{a}} viên gạch, thêm {{b}} viên gạch. Có tất cả bao nhiêu? | 40 + 40 = 80. | 80 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Gạch xếp theo bó 10, bé gộp các bó. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L19-G04-Q01 | {{a}} + {{b}} = ? | 30 + 20 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó chục để bé cộng theo chục. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L19-G04-Q02 | Có {{a}} viên gạch, thêm {{b}} viên gạch. Có tất cả bao nhiêu? | 40 + 40 = 80. | 80 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Gạch xếp theo bó 10, bé gộp các bó. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L19-G05-Q01 | {{a}} + {{b}} = ? | 30 + 20 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Dùng bó chục để bé cộng theo chục. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L19-G05-Q02 | Có {{a}} viên gạch, thêm {{b}} viên gạch. Có tất cả bao nhiêu? | 40 + 40 = 80. | 80 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Gạch xếp theo bó 10, bé gộp các bó. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

## Level 20: Trừ các chục tròn

**Kỹ năng:** Trừ 10, 20, 30...

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L20-G01-Q01 | {{a}} - {{b}} = ? | 80 - 30 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé bỏ bớt các bó chục khỏi kệ. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L20-G01-Q02 | Có {{a}} viên gạch, dùng đi {{b}} viên. Còn bao nhiêu? | 100 - 50 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Gạch biến mất theo bó 10. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L20-G02-Q01 | {{a}} - {{b}} = ? | 80 - 30 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé bỏ bớt các bó chục khỏi kệ. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L20-G02-Q02 | Có {{a}} viên gạch, dùng đi {{b}} viên. Còn bao nhiêu? | 100 - 50 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Gạch biến mất theo bó 10. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L20-G03-Q01 | {{a}} - {{b}} = ? | 80 - 30 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé bỏ bớt các bó chục khỏi kệ. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L20-G03-Q02 | Có {{a}} viên gạch, dùng đi {{b}} viên. Còn bao nhiêu? | 100 - 50 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Gạch biến mất theo bó 10. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L20-G04-Q01 | {{a}} - {{b}} = ? | 80 - 30 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé bỏ bớt các bó chục khỏi kệ. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L20-G04-Q02 | Có {{a}} viên gạch, dùng đi {{b}} viên. Còn bao nhiêu? | 100 - 50 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Gạch biến mất theo bó 10. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L20-G05-Q01 | {{a}} - {{b}} = ? | 80 - 30 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé bỏ bớt các bó chục khỏi kệ. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L20-G05-Q02 | Có {{a}} viên gạch, dùng đi {{b}} viên. Còn bao nhiêu? | 100 - 50 = 50. | 50 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Gạch biến mất theo bó 10. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

## Level 21: Cộng số hai chữ số với một chữ số

**Kỹ năng:** Cộng không nhớ

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L21-G01-Q01 | {{a}} + {{b}} = ? | 34 + 2 = 36. | 36 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé cộng hàng đơn vị, giữ nguyên hàng chục. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L21-G01-Q02 | Tàu có {{a}} hành khách, thêm {{b}} bạn lên tàu. Có tất cả bao nhiêu? | 62 + 4 = 66. | 66 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Hành khách mới bước lên tàu, bé tính tổng. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L21-G02-Q01 | {{a}} + {{b}} = ? | 34 + 2 = 36. | 36 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé cộng hàng đơn vị, giữ nguyên hàng chục. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L21-G02-Q02 | Tàu có {{a}} hành khách, thêm {{b}} bạn lên tàu. Có tất cả bao nhiêu? | 62 + 4 = 66. | 66 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Hành khách mới bước lên tàu, bé tính tổng. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L21-G03-Q01 | {{a}} + {{b}} = ? | 34 + 2 = 36. | 36 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé cộng hàng đơn vị, giữ nguyên hàng chục. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L21-G03-Q02 | Tàu có {{a}} hành khách, thêm {{b}} bạn lên tàu. Có tất cả bao nhiêu? | 62 + 4 = 66. | 66 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Hành khách mới bước lên tàu, bé tính tổng. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L21-G04-Q01 | {{a}} + {{b}} = ? | 34 + 2 = 36. | 36 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé cộng hàng đơn vị, giữ nguyên hàng chục. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L21-G04-Q02 | Tàu có {{a}} hành khách, thêm {{b}} bạn lên tàu. Có tất cả bao nhiêu? | 62 + 4 = 66. | 66 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Hành khách mới bước lên tàu, bé tính tổng. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L21-G05-Q01 | {{a}} + {{b}} = ? | 34 + 2 = 36. | 36 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé cộng hàng đơn vị, giữ nguyên hàng chục. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L21-G05-Q02 | Tàu có {{a}} hành khách, thêm {{b}} bạn lên tàu. Có tất cả bao nhiêu? | 62 + 4 = 66. | 66 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Hành khách mới bước lên tàu, bé tính tổng. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |

## Level 22: Trừ số hai chữ số với một chữ số

**Kỹ năng:** Trừ không mượn

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L22-G01-Q01 | {{a}} - {{b}} = ? | 56 - 2 = 54. | 54 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé trừ hàng đơn vị, giữ nguyên hàng chục. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L22-G01-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn bao nhiêu? | 79 - 8 = 71. | 71 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé chạm để lấy đi {{b}} đồ vật khỏi nhóm. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L22-G02-Q01 | {{a}} - {{b}} = ? | 56 - 2 = 54. | 54 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé trừ hàng đơn vị, giữ nguyên hàng chục. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L22-G02-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn bao nhiêu? | 79 - 8 = 71. | 71 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé chạm để lấy đi {{b}} đồ vật khỏi nhóm. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L22-G03-Q01 | {{a}} - {{b}} = ? | 56 - 2 = 54. | 54 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé trừ hàng đơn vị, giữ nguyên hàng chục. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L22-G03-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn bao nhiêu? | 79 - 8 = 71. | 71 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé chạm để lấy đi {{b}} đồ vật khỏi nhóm. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L22-G04-Q01 | {{a}} - {{b}} = ? | 56 - 2 = 54. | 54 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Bé trừ hàng đơn vị, giữ nguyên hàng chục. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L22-G04-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn bao nhiêu? | 79 - 8 = 71. | 71 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé chạm để lấy đi {{b}} đồ vật khỏi nhóm. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L22-G05-Q01 | {{a}} - {{b}} = ? | 56 - 2 = 54. | 54 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé trừ hàng đơn vị, giữ nguyên hàng chục. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |
| MATH-G1-L22-G05-Q02 | Có {{a}} {{object}}, lấy đi {{b}}. Còn bao nhiêu? | 79 - 8 = 71. | 71 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé chạm để lấy đi {{b}} đồ vật khỏi nhóm. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có bớt đi/cho đi/lấy đi/còn lại, con thường dùng phép trừ.<br>3. Con đếm số ban đầu, bỏ bớt số đã mất, rồi đếm phần còn lại. | correct_answer = a-b |

## Level 23: Cộng trừ hai chữ số không nhớ/mượn

**Kỹ năng:** Cộng/trừ trong phạm vi 100

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L23-G01-Q01 | {{a}} + {{b}} = ? | 23 + 14 = 37. | 37 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Cộng chục với chục, đơn vị với đơn vị. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L23-G01-Q02 | {{a}} - {{b}} = ? | 76 - 21 = 55. | 55 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Trừ chục với chục, đơn vị với đơn vị. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a-b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L23-G02-Q01 | {{a}} + {{b}} = ? | 23 + 14 = 37. | 37 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Cộng chục với chục, đơn vị với đơn vị. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L23-G02-Q02 | {{a}} - {{b}} = ? | 76 - 21 = 55. | 55 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Trừ chục với chục, đơn vị với đơn vị. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a-b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L23-G03-Q01 | {{a}} + {{b}} = ? | 23 + 14 = 37. | 37 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Cộng chục với chục, đơn vị với đơn vị. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L23-G03-Q02 | {{a}} - {{b}} = ? | 76 - 21 = 55. | 55 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Trừ chục với chục, đơn vị với đơn vị. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a-b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L23-G04-Q01 | {{a}} + {{b}} = ? | 23 + 14 = 37. | 37 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Cộng chục với chục, đơn vị với đơn vị. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L23-G04-Q02 | {{a}} - {{b}} = ? | 76 - 21 = 55. | 55 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Trừ chục với chục, đơn vị với đơn vị. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a-b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L23-G05-Q01 | {{a}} + {{b}} = ? | 23 + 14 = 37. | 37 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Cộng chục với chục, đơn vị với đơn vị. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a+b |
| MATH-G1-L23-G05-Q02 | {{a}} - {{b}} = ? | 76 - 21 = 55. | 55 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Trừ chục với chục, đơn vị với đơn vị. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Nếu đề có thêm/gộp/tất cả, con thường dùng phép cộng.<br>3. Con có thể đếm nhóm thứ nhất, rồi đếm tiếp nhóm thứ hai. | correct_answer = a-b |

## Level 24: Toán có lời văn đến 20

**Kỹ năng:** Giải bài toán thực tế

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L24-G01-Q01 | {{name}} có {{a}} {{object}}, mua thêm {{b}}. Hỏi có tất cả bao nhiêu? | Có 12 nhãn vở, mua thêm 5 → 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện mua thêm đồ vật, bé chọn phép tính và đáp án. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L24-G01-Q02 | Có {{a}} {{object}}, đã dùng {{b}}. Hỏi còn lại bao nhiêu? | Có 18 bánh, dùng 4 → 14. | 14 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật được dùng/bớt đi, bé tính phần còn lại. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L24-G02-Q01 | {{name}} có {{a}} {{object}}, mua thêm {{b}}. Hỏi có tất cả bao nhiêu? | Có 12 nhãn vở, mua thêm 5 → 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện mua thêm đồ vật, bé chọn phép tính và đáp án. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L24-G02-Q02 | Có {{a}} {{object}}, đã dùng {{b}}. Hỏi còn lại bao nhiêu? | Có 18 bánh, dùng 4 → 14. | 14 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật được dùng/bớt đi, bé tính phần còn lại. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L24-G03-Q01 | {{name}} có {{a}} {{object}}, mua thêm {{b}}. Hỏi có tất cả bao nhiêu? | Có 12 nhãn vở, mua thêm 5 → 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện mua thêm đồ vật, bé chọn phép tính và đáp án. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L24-G03-Q02 | Có {{a}} {{object}}, đã dùng {{b}}. Hỏi còn lại bao nhiêu? | Có 18 bánh, dùng 4 → 14. | 14 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật được dùng/bớt đi, bé tính phần còn lại. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L24-G04-Q01 | {{name}} có {{a}} {{object}}, mua thêm {{b}}. Hỏi có tất cả bao nhiêu? | Có 12 nhãn vở, mua thêm 5 → 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện mua thêm đồ vật, bé chọn phép tính và đáp án. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L24-G04-Q02 | Có {{a}} {{object}}, đã dùng {{b}}. Hỏi còn lại bao nhiêu? | Có 18 bánh, dùng 4 → 14. | 14 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật được dùng/bớt đi, bé tính phần còn lại. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L24-G05-Q01 | {{name}} có {{a}} {{object}}, mua thêm {{b}}. Hỏi có tất cả bao nhiêu? | Có 12 nhãn vở, mua thêm 5 → 17. | 17 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện mua thêm đồ vật, bé chọn phép tính và đáp án. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L24-G05-Q02 | Có {{a}} {{object}}, đã dùng {{b}}. Hỏi còn lại bao nhiêu? | Có 18 bánh, dùng 4 → 14. | 14 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Đồ vật được dùng/bớt đi, bé tính phần còn lại. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

## Level 25: Đo độ dài đơn giản

**Kỹ năng:** So sánh và tính độ dài cm

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L25-G01-Q01 | Vật A dài {{a}} cm, vật B dài {{b}} cm. Vật nào dài hơn? | 12 cm và 10 cm → vật A dài hơn. | Vật A | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Hai vật đặt cạnh thước kẻ, bé chọn vật dài hơn. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = A if a>b else B if b>a else 'bằng nhau' |
| MATH-G1-L25-G01-Q02 | Sợi dây dài {{a}} cm, cắt đi {{b}} cm. Còn bao nhiêu cm? | 14 cm - 4 cm = 10 cm. | 10 cm | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo kéo cắt đoạn dây, chiều dài còn lại hiện trên thước. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L25-G02-Q01 | Vật A dài {{a}} cm, vật B dài {{b}} cm. Vật nào dài hơn? | 12 cm và 10 cm → vật A dài hơn. | Vật A | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Hai vật đặt cạnh thước kẻ, bé chọn vật dài hơn. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = A if a>b else B if b>a else 'bằng nhau' |
| MATH-G1-L25-G02-Q02 | Sợi dây dài {{a}} cm, cắt đi {{b}} cm. Còn bao nhiêu cm? | 14 cm - 4 cm = 10 cm. | 10 cm | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo kéo cắt đoạn dây, chiều dài còn lại hiện trên thước. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L25-G03-Q01 | Vật A dài {{a}} cm, vật B dài {{b}} cm. Vật nào dài hơn? | 12 cm và 10 cm → vật A dài hơn. | Vật A | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Hai vật đặt cạnh thước kẻ, bé chọn vật dài hơn. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = A if a>b else B if b>a else 'bằng nhau' |
| MATH-G1-L25-G03-Q02 | Sợi dây dài {{a}} cm, cắt đi {{b}} cm. Còn bao nhiêu cm? | 14 cm - 4 cm = 10 cm. | 10 cm | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo kéo cắt đoạn dây, chiều dài còn lại hiện trên thước. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L25-G04-Q01 | Vật A dài {{a}} cm, vật B dài {{b}} cm. Vật nào dài hơn? | 12 cm và 10 cm → vật A dài hơn. | Vật A | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Hai vật đặt cạnh thước kẻ, bé chọn vật dài hơn. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = A if a>b else B if b>a else 'bằng nhau' |
| MATH-G1-L25-G04-Q02 | Sợi dây dài {{a}} cm, cắt đi {{b}} cm. Còn bao nhiêu cm? | 14 cm - 4 cm = 10 cm. | 10 cm | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo kéo cắt đoạn dây, chiều dài còn lại hiện trên thước. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L25-G05-Q01 | Vật A dài {{a}} cm, vật B dài {{b}} cm. Vật nào dài hơn? | 12 cm và 10 cm → vật A dài hơn. | Vật A | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Hai vật đặt cạnh thước kẻ, bé chọn vật dài hơn. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = A if a>b else B if b>a else 'bằng nhau' |
| MATH-G1-L25-G05-Q02 | Sợi dây dài {{a}} cm, cắt đi {{b}} cm. Còn bao nhiêu cm? | 14 cm - 4 cm = 10 cm. | 10 cm | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo kéo cắt đoạn dây, chiều dài còn lại hiện trên thước. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

## Level 26: Thời gian đơn giản

**Kỹ năng:** Nhận biết giờ đúng

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L26-G01-Q01 | Kim giờ chỉ số {{hour}}, kim phút chỉ số 12. Đồng hồ chỉ mấy giờ? | Kim giờ chỉ 7, kim phút chỉ 12 → 7 giờ. | 7 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề vũ trụ; dùng quyển sách hoặc vật thể dễ thương để minh hoạ phép toán. Đồng hồ kim lớn, bé chọn giờ đúng. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + ' giờ' |
| MATH-G1-L26-G01-Q02 | Bây giờ là {{hour}} giờ. Sau {{add}} giờ là mấy giờ? | 8 giờ, sau 2 giờ → 10 giờ. | 10 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật đi theo vòng đồng hồ thêm số giờ. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + add, wrap 12 if needed |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L26-G02-Q01 | Kim giờ chỉ số {{hour}}, kim phút chỉ số 12. Đồng hồ chỉ mấy giờ? | Kim giờ chỉ 7, kim phút chỉ 12 → 7 giờ. | 7 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Đồng hồ kim lớn, bé chọn giờ đúng. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + ' giờ' |
| MATH-G1-L26-G02-Q02 | Bây giờ là {{hour}} giờ. Sau {{add}} giờ là mấy giờ? | 8 giờ, sau 2 giờ → 10 giờ. | 10 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật đi theo vòng đồng hồ thêm số giờ. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + add, wrap 12 if needed |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L26-G03-Q01 | Kim giờ chỉ số {{hour}}, kim phút chỉ số 12. Đồng hồ chỉ mấy giờ? | Kim giờ chỉ 7, kim phút chỉ 12 → 7 giờ. | 7 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Đồng hồ kim lớn, bé chọn giờ đúng. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + ' giờ' |
| MATH-G1-L26-G03-Q02 | Bây giờ là {{hour}} giờ. Sau {{add}} giờ là mấy giờ? | 8 giờ, sau 2 giờ → 10 giờ. | 10 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật đi theo vòng đồng hồ thêm số giờ. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + add, wrap 12 if needed |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L26-G04-Q01 | Kim giờ chỉ số {{hour}}, kim phút chỉ số 12. Đồng hồ chỉ mấy giờ? | Kim giờ chỉ 7, kim phút chỉ 12 → 7 giờ. | 7 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Đồng hồ kim lớn, bé chọn giờ đúng. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + ' giờ' |
| MATH-G1-L26-G04-Q02 | Bây giờ là {{hour}} giờ. Sau {{add}} giờ là mấy giờ? | 8 giờ, sau 2 giờ → 10 giờ. | 10 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật đi theo vòng đồng hồ thêm số giờ. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + add, wrap 12 if needed |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L26-G05-Q01 | Kim giờ chỉ số {{hour}}, kim phút chỉ số 12. Đồng hồ chỉ mấy giờ? | Kim giờ chỉ 7, kim phút chỉ 12 → 7 giờ. | 7 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Đồng hồ kim lớn, bé chọn giờ đúng. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + ' giờ' |
| MATH-G1-L26-G05-Q02 | Bây giờ là {{hour}} giờ. Sau {{add}} giờ là mấy giờ? | 8 giờ, sau 2 giờ → 10 giờ. | 10 giờ | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Nhân vật đi theo vòng đồng hồ thêm số giờ. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = hour + add, wrap 12 if needed |

## Level 27: Hình học cơ bản

**Kỹ năng:** Nhận biết hình và đặc điểm

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L27-G01-Q01 | Hình nào có {{sides}} cạnh? | 3 cạnh → hình tam giác. | Hình tam giác | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề lâu đài; dùng viên ngọc hoặc vật thể dễ thương để minh hoạ phép toán. Hiện nhiều hình, bé chọn hình đúng theo số cạnh. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = shape_by_sides |
| MATH-G1-L27-G01-Q02 | Kéo đồ vật giống {{shape}} vào đúng ô. | Bánh xe → hình tròn. | Hình tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bánh xe/quyển sách/biển báo vào ô hình tương ứng. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = object matches shape |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L27-G02-Q01 | Hình nào có {{sides}} cạnh? | 3 cạnh → hình tam giác. | Hình tam giác | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Hiện nhiều hình, bé chọn hình đúng theo số cạnh. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = shape_by_sides |
| MATH-G1-L27-G02-Q02 | Kéo đồ vật giống {{shape}} vào đúng ô. | Bánh xe → hình tròn. | Hình tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bánh xe/quyển sách/biển báo vào ô hình tương ứng. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = object matches shape |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L27-G03-Q01 | Hình nào có {{sides}} cạnh? | 3 cạnh → hình tam giác. | Hình tam giác | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Hiện nhiều hình, bé chọn hình đúng theo số cạnh. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = shape_by_sides |
| MATH-G1-L27-G03-Q02 | Kéo đồ vật giống {{shape}} vào đúng ô. | Bánh xe → hình tròn. | Hình tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bánh xe/quyển sách/biển báo vào ô hình tương ứng. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = object matches shape |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L27-G04-Q01 | Hình nào có {{sides}} cạnh? | 3 cạnh → hình tam giác. | Hình tam giác | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Hiện nhiều hình, bé chọn hình đúng theo số cạnh. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = shape_by_sides |
| MATH-G1-L27-G04-Q02 | Kéo đồ vật giống {{shape}} vào đúng ô. | Bánh xe → hình tròn. | Hình tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bánh xe/quyển sách/biển báo vào ô hình tương ứng. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = object matches shape |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L27-G05-Q01 | Hình nào có {{sides}} cạnh? | 3 cạnh → hình tam giác. | Hình tam giác | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Hiện nhiều hình, bé chọn hình đúng theo số cạnh. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = shape_by_sides |
| MATH-G1-L27-G05-Q02 | Kéo đồ vật giống {{shape}} vào đúng ô. | Bánh xe → hình tròn. | Hình tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo bánh xe/quyển sách/biển báo vào ô hình tương ứng. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đếm cạnh hoặc nhìn hình dạng quen thuộc.<br>3. Hình tròn không có góc, tam giác có 3 cạnh, vuông/chữ nhật có 4 cạnh. | correct_answer = object matches shape |

## Level 28: Quy luật dãy số và hình

**Kỹ năng:** Tìm quy luật đơn giản

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L28-G01-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_step}}, {{a_plus_2step}}, __. | 2, 4, 6, __ → 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề mèo con; dùng quả táo hoặc vật thể dễ thương để minh hoạ phép toán. Các số nằm trên đoàn tàu, toa cuối bị trống. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = a + 3*step |
| MATH-G1-L28-G01-Q02 | Quy luật: {{pattern}}. Hình tiếp theo là gì? | tròn, vuông, tròn, vuông, __ → tròn. | Tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Chuỗi hình/màu lặp lại, bé chọn hình tiếp theo. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = next_item_in_pattern |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L28-G02-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_step}}, {{a_plus_2step}}, __. | 2, 4, 6, __ → 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Các số nằm trên đoàn tàu, toa cuối bị trống. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = a + 3*step |
| MATH-G1-L28-G02-Q02 | Quy luật: {{pattern}}. Hình tiếp theo là gì? | tròn, vuông, tròn, vuông, __ → tròn. | Tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Chuỗi hình/màu lặp lại, bé chọn hình tiếp theo. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = next_item_in_pattern |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L28-G03-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_step}}, {{a_plus_2step}}, __. | 2, 4, 6, __ → 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Các số nằm trên đoàn tàu, toa cuối bị trống. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = a + 3*step |
| MATH-G1-L28-G03-Q02 | Quy luật: {{pattern}}. Hình tiếp theo là gì? | tròn, vuông, tròn, vuông, __ → tròn. | Tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Chuỗi hình/màu lặp lại, bé chọn hình tiếp theo. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = next_item_in_pattern |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L28-G04-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_step}}, {{a_plus_2step}}, __. | 2, 4, 6, __ → 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Các số nằm trên đoàn tàu, toa cuối bị trống. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = a + 3*step |
| MATH-G1-L28-G04-Q02 | Quy luật: {{pattern}}. Hình tiếp theo là gì? | tròn, vuông, tròn, vuông, __ → tròn. | Tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Chuỗi hình/màu lặp lại, bé chọn hình tiếp theo. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = next_item_in_pattern |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L28-G05-Q01 | Điền số còn thiếu: {{a}}, {{a_plus_step}}, {{a_plus_2step}}, __. | 2, 4, 6, __ → 8. | 8 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Các số nằm trên đoàn tàu, toa cuối bị trống. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = a + 3*step |
| MATH-G1-L28-G05-Q02 | Quy luật: {{pattern}}. Hình tiếp theo là gì? | tròn, vuông, tròn, vuông, __ → tròn. | Tròn | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Chuỗi hình/màu lặp lại, bé chọn hình tiếp theo. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy xem mỗi bước tăng, giảm hoặc lặp lại như thế nào.<br>3. Thử đọc lại dãy từ đầu và đoán phần tiếp theo. | correct_answer = next_item_in_pattern |

## Level 29: Toán thực tế: tiền và đồ vật

**Kỹ năng:** Tính tiền đơn giản

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L29-G01-Q01 | Bé có {{a}} nghìn đồng, mẹ cho thêm {{b}} nghìn đồng. Bé có bao nhiêu nghìn đồng? | 5 nghìn + 2 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề thỏ bông; dùng ngôi sao hoặc vật thể dễ thương để minh hoạ phép toán. Tiền xu/tiền giấy minh hoạ dạng đơn giản, bé gộp lại. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L29-G01-Q02 | Bé có {{a}} nghìn đồng, mua đồ hết {{b}} nghìn đồng. Còn bao nhiêu nghìn đồng? | 10 nghìn - 3 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo tiền sang cửa hàng, phần còn lại nằm trong ví. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L29-G02-Q01 | Bé có {{a}} nghìn đồng, mẹ cho thêm {{b}} nghìn đồng. Bé có bao nhiêu nghìn đồng? | 5 nghìn + 2 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Tiền xu/tiền giấy minh hoạ dạng đơn giản, bé gộp lại. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L29-G02-Q02 | Bé có {{a}} nghìn đồng, mua đồ hết {{b}} nghìn đồng. Còn bao nhiêu nghìn đồng? | 10 nghìn - 3 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo tiền sang cửa hàng, phần còn lại nằm trong ví. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L29-G03-Q01 | Bé có {{a}} nghìn đồng, mẹ cho thêm {{b}} nghìn đồng. Bé có bao nhiêu nghìn đồng? | 5 nghìn + 2 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Tiền xu/tiền giấy minh hoạ dạng đơn giản, bé gộp lại. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L29-G03-Q02 | Bé có {{a}} nghìn đồng, mua đồ hết {{b}} nghìn đồng. Còn bao nhiêu nghìn đồng? | 10 nghìn - 3 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo tiền sang cửa hàng, phần còn lại nằm trong ví. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L29-G04-Q01 | Bé có {{a}} nghìn đồng, mẹ cho thêm {{b}} nghìn đồng. Bé có bao nhiêu nghìn đồng? | 5 nghìn + 2 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Tiền xu/tiền giấy minh hoạ dạng đơn giản, bé gộp lại. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L29-G04-Q02 | Bé có {{a}} nghìn đồng, mua đồ hết {{b}} nghìn đồng. Còn bao nhiêu nghìn đồng? | 10 nghìn - 3 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo tiền sang cửa hàng, phần còn lại nằm trong ví. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L29-G05-Q01 | Bé có {{a}} nghìn đồng, mẹ cho thêm {{b}} nghìn đồng. Bé có bao nhiêu nghìn đồng? | 5 nghìn + 2 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Tiền xu/tiền giấy minh hoạ dạng đơn giản, bé gộp lại. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a+b |
| MATH-G1-L29-G05-Q02 | Bé có {{a}} nghìn đồng, mua đồ hết {{b}} nghìn đồng. Còn bao nhiêu nghìn đồng? | 10 nghìn - 3 nghìn = 7 nghìn. | 7 nghìn đồng | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Bé kéo tiền sang cửa hàng, phần còn lại nằm trong ví. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = a-b |

## Level 30: Tổng hợp thử thách lớp 1

**Kỹ năng:** Ôn tập tổng hợp

**Tổng mẫu câu hỏi:** 10

### Game 1: Chọn đáp án thần tốc

- **Loại game:** `tap_choice`
- **Tương tác:** `tap_answer`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L30-G01-Q01 | Thử thách tổng hợp: {{a}} {{op}} {{b}} = ? | 30 + 40 = 70. | 70 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề unicorn; dùng bông hoa hoặc vật thể dễ thương để minh hoạ phép toán. Boss mini đưa phép tính ngẫu nhiên theo kiến thức lớp 1. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = calculate(a,op,b) |
| MATH-G1-L30-G01-Q02 | Đọc câu chuyện ngắn và chọn phép tính đúng: {{story}} | Lan có 16 hoa, tặng 6 → 16 - 6 = 10. | 10 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_answer. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình minh hoạ, bé chọn phép tính rồi đáp án. | Đáp án đúng phóng to, sao bay; sai rung nhẹ. / Ting vui khi đúng; pop nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = derived_from_story |

### Game 2: Kéo thả vào hộp đúng

- **Loại game:** `drag_drop`
- **Tương tác:** `drag_item_to_target`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L30-G02-Q01 | Thử thách tổng hợp: {{a}} {{op}} {{b}} = ? | 30 + 40 = 70. | 70 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề công chúa; dùng viên kẹo hoặc vật thể dễ thương để minh hoạ phép toán. Boss mini đưa phép tính ngẫu nhiên theo kiến thức lớp 1. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = calculate(a,op,b) |
| MATH-G1-L30-G02-Q02 | Đọc câu chuyện ngắn và chọn phép tính đúng: {{story}} | Lan có 16 hoa, tặng 6 → 16 - 6 = 10. | 10 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: drag_item_to_target. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình minh hoạ, bé chọn phép tính rồi đáp án. | Vật kéo có bóng đổ; thả đúng thì hộp sáng và mở nắp. / Âm kéo thả nhẹ, âm mở rương khi đúng. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = derived_from_story |

### Game 3: Giải cứu thú cưng

- **Loại game:** `rescue_pet`
- **Tương tác:** `solve_to_rescue`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L30-G03-Q01 | Thử thách tổng hợp: {{a}} {{op}} {{b}} = ? | 30 + 40 = 70. | 70 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề rồng con; dùng con mèo hoặc vật thể dễ thương để minh hoạ phép toán. Boss mini đưa phép tính ngẫu nhiên theo kiến thức lớp 1. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = calculate(a,op,b) |
| MATH-G1-L30-G03-Q02 | Đọc câu chuyện ngắn và chọn phép tính đúng: {{story}} | Lan có 16 hoa, tặng 6 → 16 - 6 = 10. | 10 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: solve_to_rescue. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình minh hoạ, bé chọn phép tính rồi đáp án. | Ổ khóa bật mở, thú cưng nhảy mừng; sai thì ổ khóa lắc nhẹ. / Âm mở khóa, tiếng thú cưng vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = derived_from_story |

### Game 4: Bong bóng toán học

- **Loại game:** `bubble_pop`
- **Tương tác:** `tap_correct_bubble`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L30-G04-Q01 | Thử thách tổng hợp: {{a}} {{op}} {{b}} = ? | 30 + 40 = 70. | 70 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề ngôi sao; dùng con thỏ hoặc vật thể dễ thương để minh hoạ phép toán. Boss mini đưa phép tính ngẫu nhiên theo kiến thức lớp 1. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = calculate(a,op,b) |
| MATH-G1-L30-G04-Q02 | Đọc câu chuyện ngắn và chọn phép tính đúng: {{story}} | Lan có 16 hoa, tặng 6 → 16 - 6 = 10. | 10 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: tap_correct_bubble. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình minh hoạ, bé chọn phép tính rồi đáp án. | Bong bóng đúng nổ thành sao; sai bay chậm để thử lại. / Pop vui khi đúng, âm gợi ý nhẹ khi sai. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = derived_from_story |

### Game 5: Boss cuối màn mini

- **Loại game:** `mini_boss`
- **Tương tác:** `answer_chain`

| Mã câu | Mẫu câu hỏi | Ví dụ | Đáp án ví dụ | Cách chơi & tương tác | Đồ hoạ | Animation / Âm thanh | Hint | Logic đáp án |
|---|---|---|---|---|---|---|---|---|
| MATH-G1-L30-G05-Q01 | Thử thách tổng hợp: {{a}} {{op}} {{b}} = ? | 30 + 40 = 70. | 70 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề kẹo ngọt; dùng quả bóng hoặc vật thể dễ thương để minh hoạ phép toán. Boss mini đưa phép tính ngẫu nhiên theo kiến thức lớp 1. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = calculate(a,op,b) |
| MATH-G1-L30-G05-Q02 | Đọc câu chuyện ngắn và chọn phép tính đúng: {{story}} | Lan có 16 hoa, tặng 6 → 16 - 6 = 10. | 10 | Bé nghe cô AI đọc câu hỏi, quan sát đồ hoạ, sau đó thực hiện thao tác: answer_chain. | Nền hoạt hình 2D pastel chủ đề khu rừng; dùng chiếc bút hoặc vật thể dễ thương để minh hoạ phép toán. Câu chuyện có hình minh hoạ, bé chọn phép tính rồi đáp án. | Mỗi câu đúng làm boss mất 1 tim; thắng thì boss tặng rương. / Nhạc thử thách nhẹ, âm thắng cuộc vui. | 1. Con hãy quan sát hình trước, đừng bấm vội nhé.<br>2. Con hãy đọc lại yêu cầu và tìm số quan trọng trong câu hỏi.<br>3. Con có thể dùng đồ vật trên màn hình để đếm từng bước. | correct_answer = derived_from_story |

---
## 4. Prompt cho Antigravity để code game engine

```text
Bạn là senior full-stack engineer. Hãy xây dựng game-based math question engine cho app học Toán lớp 1.

Input là JSON gồm 300 question specs. Mỗi spec có question_template, variables, answer_logic, game_type, interaction, ui_graphics, animation, sound, hints, reward_rule, scoring_rule.

Yêu cầu:
1. Render câu hỏi từ question_template và variables.
2. Tự random biến hợp lệ theo từng câu.
3. Tính đáp án bằng answer_logic, không hard-code.
4. Tạo component tương ứng game_type: tap_choice, drag_drop, rescue_pet, bubble_pop, mini_boss.
5. Ghi lại attempt: selected_answer, is_correct, response_time_ms, hints_used, score, xp, stars.
6. Khi bé sai: hiện hint theo thứ tự, không hiện đáp án ngay, cho thử lại.
7. Khi bé đúng: phát âm thanh khen, chạy animation, cộng XP, sao, coin.
8. Giao diện dễ thương, bo góc, màu pastel, phù hợp trẻ lớp 1.
9. Code bằng Next.js, TypeScript, Tailwind, Framer Motion.
10. Dữ liệu gắn với child_id và parent_uid.
```
