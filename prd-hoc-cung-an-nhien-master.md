# BẢN YÊU CẦU SẢN PHẨM MASTER PRD (v3.0 - FULL TRIPLE-SUBJECT)
## DỰ ÁN: HỆ THỐNG GIA SƯ AI CÁ NHÂN HOÁ - "HỌC CÙNG AN NHIÊN"
### DÀNH CHO AUTO-PROGRAMMING AGENT (CURSOR / DEVIN / ANTIGRAVITY)

---

## CHƯƠNG I: KIẾN TRÚC TỔNG THỂ & THIẾT KẾ HỆ THỐNG

### 1.1. Bối cảnh và Tầm nhìn Sản phẩm
Hệ thống **"Học Cùng An Nhiên"** được định vị là một **Hồ sơ Phát triển Học thuật Cá nhân Hoá 1-1** [233], đóng vai trò vừa là một cô giáo gia sư ảo, vừa là một người bạn đồng hành dịu dàng hỗ trợ bé An Nhiên (6 tuổi) tự tin học tập [155, 186].
Hệ thống hợp nhất ba môn học nền tảng cho học sinh chuẩn bị bước vào lớp 1: **Tiếng Anh, Toán, và Tiếng Việt** [186], thiết kế theo phong cách Game hóa (Gamification) lành mạnh [186, 202].

### 1.2. Tech Stack Quy chuẩn cho Code Agent
* **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn UI [188, 221].
* **State Management:** Zustand (quản lý trạng thái màn chơi, session học tập, và thú cưng ảo) [159, 221].
* **Animation & VFX:** Framer Motion (chuyển động UI, lật thẻ, sao bay), Lottie React (hoạt hình nhân vật biểu cảm), HTML5 Canvas & SVG Parallax (hiệu ứng bối cảnh sinh động) [159, 160, 206, 221].
* **Backend & Auth:** Supabase (Auth & Client-side SDK) [188, 221].
* **Database:** PostgreSQL (Supabase) tích hợp Row Level Security (RLS) bảo mật tuyệt đối [221, 223].
* **AI & Voice Engine:** OpenAI API (GPT-4o cho sinh nội dung cá nhân hóa, Whisper API / Web Speech API cho nhận diện phát âm, và Azure Speech / OpenAI TTS cho giọng đọc dịu dàng của cô giáo AI) [214, 215, 221].
* **Deployment:** Vercel (Hỗ trợ Progressive Web App - PWA) [188, 221, 226].

---

## CHƯƠNG II: THIẾT KẾ CƠ SỞ DỮ LIỆU CHUẨN HOÀ (SQL DDL)

Dưới đây là mã SQL khởi tạo cơ sở dữ liệu hoàn chỉnh trên Supabase PostgreSQL, tối ưu hóa các chỉ mục (indexes) để truy xuất thời gian thực mượt mà.

```sql
-- Kích hoạt extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. BẢNG PHỤ HUYNH (PARENT PROFILES) - LIÊN KẾT AUTH.USERS
-- =========================================================================
CREATE TABLE parent_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    parent_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    interface_lang VARCHAR(10) DEFAULT 'vi',
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 2. BẢNG HỒ SƠ HỌC SINH (CHILD PROFILES)
-- =========================================================================
CREATE TABLE child_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES parent_profiles(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL,
    nickname VARCHAR(100),
    birth_date DATE,
    age INT,
    gender VARCHAR(20),
    hobbies TEXT[] DEFAULT '{}'::TEXT[], -- Ví dụ: {'princess', 'cat', 'unicorn'}
    personality VARCHAR(100) DEFAULT 'sensitive', -- Ví dụ: sensitive, active
    daily_minutes_limit INT DEFAULT 25, -- Giới hạn giờ học hằng ngày
    ai_voice_style VARCHAR(50) DEFAULT 'gentle', -- Giọng điệu AI: dịu dàng, năng lượng
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 3. BẢNG THEO DÕI LEVEL TỪNG MÔN (CHILD SUBJECT LEVELS)
-- =========================================================================
CREATE TABLE child_subject_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE NOT NULL,
    subject VARCHAR(50) NOT NULL, -- 'english', 'math', 'vietnamese'
    current_level INT DEFAULT 1,
    current_xp INT DEFAULT 0,
    streak_count INT DEFAULT 0,
    last_active_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(child_id, subject)
);

-- =========================================================================
-- 4. BẢNG TIẾN ĐỘ THÀNH THẠO KỸ NĂNG (CHILD SKILL MASTERY)
-- =========================================================================
CREATE TABLE child_skill_mastery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE NOT NULL,
    subject VARCHAR(50) NOT NULL,
    skill_id VARCHAR(150) NOT NULL, -- Ví dụ: 'phonics_ae', 'compare_numbers_10'
    mastery_score INT DEFAULT 0, -- Thang điểm từ 0 đến 100
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(child_id, skill_id)
);

-- =========================================================================
-- 5. BẢNG QUẢN LÝ PHIÊN HỌC THỰC TẾ (STUDY SESSIONS)
-- =========================================================================
CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE NOT NULL,
    subject VARCHAR(50) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    active_duration_seconds INT DEFAULT 0, -- Thời gian học thực tế tương tác
    tab_out_count INT DEFAULT 0, -- Giám sát độ tập trung (số lần chuyển tab)
    total_questions INT DEFAULT 0,
    correct_answers INT DEFAULT 0,
    star_earned INT DEFAULT 0, -- Số sao nhận được (1 - 3 sao)
    xp_gained INT DEFAULT 0,
    coins_gained INT DEFAULT 0
);

-- =========================================================================
-- 6. NHẬT KÝ CHI TIẾT TỪNG CÂU HỎI (QUESTION ATTEMPTS & ERROR LOGS)
-- =========================================================================
CREATE TABLE question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES study_sessions(id) ON DELETE CASCADE NOT NULL,
    question_code VARCHAR(150) NOT NULL, -- Ví dụ: ENG-G1-L01-G01-Q01
    is_correct BOOLEAN NOT NULL,
    hints_used INT DEFAULT 0, -- Số lần sử dụng gợi ý (0-3)
    response_time_seconds INT DEFAULT 0,
    error_type VARCHAR(100), -- Ví dụ: pronunciation_error, counting_error, wrong_spelling
    student_answer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 7. QUẢN LÝ THÚ CƯNG ẢO VÀ PHẦN THƯỞNG (CHILD REWARDS)
-- =========================================================================
CREATE TABLE child_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE NOT NULL,
    coins_balance INT DEFAULT 0,
    pet_type VARCHAR(50) DEFAULT 'cat', -- mèo, thỏ, unicorn, rồng con
    pet_name VARCHAR(100) DEFAULT 'Mèo Bông',
    pet_level INT DEFAULT 1,
    care_points INT DEFAULT 100, -- Chỉ số chăm sóc pet
    purchased_items JSONB DEFAULT '[]'::jsonb, -- Các vật phẩm nơ, mũ trang trí pet
    equipped_items JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(child_id)
);

-- =========================================================================
-- 8. TỰ SINH CẢNH TRÒ CHƠI PROCEDURAL (PROCEDURAL SCENES & MAP)
-- =========================================================================
CREATE TABLE procedural_scenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE NOT NULL,
    level_id INT NOT NULL,
    game_mode VARCHAR(100) NOT NULL,
    seed VARCHAR(255) NOT NULL,
    scene_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(child_id, level_id, game_mode)
);

-- =========================================================================
-- 9. CHỈ MỤC INDEXES ĐỂ TỐI ƯU HOÁ TRUY VẤN
-- =========================================================================
CREATE INDEX idx_child_profiles_parent ON child_profiles(parent_id);
CREATE INDEX idx_child_subject_levels_child ON child_subject_levels(child_id);
CREATE INDEX idx_child_skill_mastery_child ON child_skill_mastery(child_id);
CREATE INDEX idx_study_sessions_child ON study_sessions(child_id);
CREATE INDEX idx_question_attempts_session ON question_attempts(session_id);
```

### 2.2. Thiết lập Chính sách Row Level Security (RLS) bảo mật tuyệt đối
```sql
-- Bật tính năng RLS trên tất cả các bảng nhạy cảm
ALTER TABLE parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_subject_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_skill_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_rewards ENABLE ROW LEVEL SECURITY;

-- 1. Chính sách cho parent_profiles: Chỉ cho phép tài khoản đăng nhập truy cập chính họ
CREATE POLICY parent_profile_self_access ON parent_profiles
    FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 2. Chính sách cho child_profiles: Chỉ phụ huynh sở hữu mới có quyền truy cập hồ sơ của con
CREATE POLICY parent_child_profiles_access ON child_profiles
    FOR ALL USING (
        auth.uid() = parent_id
    ) WITH CHECK (
        auth.uid() = parent_id
    );

-- 3. Chính sách cho study_sessions: Cho phép đọc/ghi nếu thuộc về hồ sơ con của phụ huynh hiện tại
CREATE POLICY parent_study_sessions_access ON study_sessions
    FOR ALL USING (
        child_id IN (SELECT id FROM child_profiles WHERE parent_id = auth.uid())
    ) WITH CHECK (
        child_id IN (SELECT id FROM child_profiles WHERE parent_id = auth.uid())
    );
```

---

## CHƯƠNG III: PHÂN HỆ TIẾNG ANH (ENGLISH MODULE)

Phân hệ Tiếng Anh hướng tới việc xây dựng phản xạ giao tiếp tự nhiên và nhận biết mặt chữ cho bé An Nhiên thông qua Phonics, hình ảnh sinh động và tương tác giọng nói với Cô gia sư AI [193, 194, 215].

### 3.1. Lộ trình 30 Level Tiếng Anh chuẩn Sư phạm mầm non

Lộ trình được thiết kế cuốn chiếu từ đơn giản đến phức tạp, đan xen giữa từ vựng trực quan, nghe-nói tương tác, và cấu trúc ngữ pháp tự nhiên [193, 194, 195].

| Level | Tên Học Phần | Kỹ năng & Mục tiêu Sư phạm | Từ vựng / Ngữ pháp trọng tâm |
| :--- | :--- | :--- | :--- |
| **01** | Letters A - E & Phonics | Nhận biết mặt chữ cái, âm phách đầu từ A - E [193] | Apple, Ball, Cat, Dog, Egg [193] |
| **02** | Letters F - J & Phonics | Nhận diện âm đầu F - J [193] | Fish, Goat, Hat, Iguana, Jelly [193] |
| **03** | Letters K - O & Phonics | Nhận diện âm đầu K - O [193] | Kite, Lion, Monkey, Nest, Orange [193] |
| **04** | Letters P - T & Phonics | Nhận diện âm đầu P - T [193] | Pig, Queen, Rabbit, Sun, Tiger [193] |
| **05** | Letters U - Z & Phonics | Nhận diện âm đầu U - Z [193] | Umbrella, Violin, Watch, X-ray, Yo-yo, Zebra [193] |
| **06** | Magic Colors | Gọi tên màu sắc ngọt ngào, ghép màu với đồ vật [193] | Red, Blue, Green, Yellow, Pink [193] |
| **07** | Numbers 1 - 10 | Đếm số lượng tiếng Anh trực quan [193] | One to Ten, "How many...?" [193, 195] |
| **08** | Lovely Animals | Làm quen vật nuôi gia đình & thế giới động vật [193] | Dog, Cat, Bunny, Bird, Fish, Lion, Monkey [193] |
| **09** | My Sweet Family | Nhận biết và gọi tên thành viên gia đình [193] | Mommy, Daddy, Brother, Sister, Baby [193] |
| **10** | School Fun Objects | Nhận diện học cụ trong ba lô học sinh [193] | Pen, Pencil, Book, Ruler, Bag, Eraser [193] |
| **11** | Delicious Food | Gọi tên món ăn, trái cây, bánh kẹo bé yêu thích [193] | Milk, Cake, Apple, Banana, Candy, Cookie [193, 194] |
| **12** | Interactive Toys | Nhận biết đồ chơi và cách chia sẻ đồ chơi [193] | Doll, Car, Ball, Teddy Bear, Balloon, Train [193] |
| **13** | My Body Parts | Nhận diện các bộ phận trên cơ thể bé [193] | Eyes, Nose, Mouth, Ears, Hands, Feet [193] |
| **14** | Weather & Nature | Nhận biết thời tiết thông qua hiệu ứng chuyển động [193] | Sunny, Rainy, Windy, Snowy, Cloud, Rainbow [193] |
| **15** | Sweet Feelings | Gọi tên cảm xúc cá nhân đơn giản [193] | Happy, Sad, Angry, Tired, Sleepy, Excited [193] |
| **16** | Simple Grammar: "I like..." | Diễn đạt sở thích cá nhân bằng câu đơn [195] | "I like candy", "I don't like apples" [195] |
| **17** | Simple Grammar: "I have..." | Diễn đạt sở hữu đồ chơi, vật nuôi [195] | "I have a blue balloon", "I have a kitty" [195] |
| **18** | Action Verbs (Daily Actions) | Nhận biết và diễn tả hành động hằng ngày [193] | Run, Jump, Sleep, Eat, Drink, Sing, Dance [193] |
| **19** | Position Prepositions | Trực quan hóa giới từ không gian trong nhà [193] | In, On, Under, Next to [193] |
| **20** | Simple Grammar: "This/That" | Phân biệt khoảng cách gần/xa trực quan [195] | "This is my teddy", "That is a star" [195] |
| **21** | Ability: "Can & Can't" | Diễn đạt khả năng của bé và động vật [195] | "I can run", "A bird can fly, but cannot swim" [195] |
| **22** | Clothes we wear | Đọc tên trang phục theo chủ đề công chúa/vũ trụ [193] | Dress, Shirt, Shoes, Hat, Socks, Coat [193] |
| **23** | Wh-Questions: "What?" | Hỏi và trả lời đồ vật, màu sắc, con vật [195] | "What is this?", "What color is the bunny?" [195] |
| **24** | Wh-Questions: "Where?" | Tìm kiếm đồ vật bị giấu trong phòng [195] | "Where is my book?", "Where is the cat?" [195] |
| **25** | Wh-Questions: "Who?" | Nhận biết nhân vật cổ tích và thành viên [195] | "Who is she?", "She is a beautiful princess" [195] |
| **26** | Phonics Short Stories I | Đọc to các truyện phách vần ngắn 3 câu [194] | "A cat in a hat. The cat is fat. The cat sat." [194] |
| **27** | Phonics Short Stories II | Đọc to truyện phách vần nâng cao [194] | "A pig has a wig. The pig did a jig in the mud." [194] |
| **28** | Daily Conversations I | Đóng vai chào hỏi và giới thiệu tên, tuổi [195] | "Hello, I am An Nhien. I am 6 years old." [195] |
| **29** | Daily Conversations II | Đóng vai hỏi cảm xúc, thời tiết, hoạt động [195] | "How are you today?", "How is the weather?" [195] |
| **30** | English Master Challenge | Trò chuyện tự do 5 lượt cùng cô gia sư AI [195, 197] | Hội thoại tổng hợp, nhận rương kho báu lớn [197, 214] |

### 3.2. Đặc tả các mẫu Game Tương tác cho Tiếng Anh

#### Game ENG-G1: `trace_letter` (Tập viết chữ cái ma thuật) [173, 206]
* **Hành vi vật lý:** Bé chạm và giữ ngón tay, vuốt vẽ theo các nét đứt hướng dẫn để tạo thành chữ cái [173].
* **Đồ họa & Animation:** Chữ viết được bao phủ bởi hiệu ứng "bụi tiên" (sparkle particles) tỏa ra khi ngón tay lướt qua [206]. Khi bé viết xong một nét đúng, nét đó đổi thành màu vàng kim lấp lánh [206].
* **Audio:** Giọng đọc của cô AI phát âm chữ cái và phách âm tương ứng (Ví dụ: *"Letter A says /æ/! Good job, An Nhiên!"*).
* **Logic chấm điểm:** Vẽ đúng tối thiểu 80% đường định vị (Bounding Box Trace Line). Không cho phép lệch quá 15px so với nét vẽ định vị.

#### Game ENG-G2: `card_flip` (Lật thẻ từ vựng & Ghi nhớ) [206]
* **Hành vi vật lý:** Tap vào các thẻ bài úp để lật mượt bằng hiệu ứng xoay 3D (React 3D Card Flip) [206].
* **Quy tắc chơi:** Ghép cặp từ vựng tiếng Anh với hình vẽ minh họa màu sắc tương ứng [194, 207].
* **Animation:** Khi ghép đúng, hai thẻ phát sáng rực rỡ và tự động bay về góc phần thưởng [159]. Khi ghép sai, hai thẻ tự lật úp lại kèm hiệu ứng rung lắc nhẹ.

#### Game ENG-G3: `voice_match` (Phát âm chuẩn xác) [194, 215]
* **Hành vi vật lý:** Chạm giữ nút Micro (hiển thị hiệu ứng sóng âm nhấp nháy chuyển động bằng CSS) [206, 215], bé đọc to từ vựng hoặc câu tiếng Anh hiển thị trên màn hình [194].
* **Cơ chế kỹ thuật:** Sử dụng Web Speech API trên Client hoặc gửi file ghi âm nén .webm/ogg về Whisper API để chuyển chữ viết [215, 221]. Xây dựng thuật toán so khớp khoảng cách Levenshtein giữa chuỗi bé phát âm và chuỗi chuẩn, cấu hình ngưỡng chấp nhận (confidence threshold) đạt từ 0.7 (70%) trở lên để khuyến khích trẻ em (có tính đến phát âm ngọng hoặc giọng mềm của trẻ 6 tuổi) [191, 215].

---

## CHƯƠNG IV: PHÂN HỆ TIẾNG VIỆT (VIETNAMESE MODULE)

Phân hệ Tiếng Việt được thiết kế tỉ mỉ để giúp bé An Nhiên nhận diện bảng chữ cái chuẩn quốc gia, làm chủ 5 thanh điệu tiếng Việt cốt lõi và phát triển tư duy đọc viết tự tin [198, 199].

### 4.1. Lộ trình 30 Level Tiếng Việt chuẩn Chương trình Giáo dục Phổ thông mới

Sắp xếp khoa học để bé học âm vần đơn giản trước, làm quen thanh điệu trực quan, ghép phụ âm ghép và luyện đọc trơn trôi chảy [198, 199].

| Level | Tên Học Phần | Kỹ năng & Mục tiêu Sư phạm | Nội dung chi tiết |
| :--- | :--- | :--- | :--- |
| **01** | Bảng chữ cái nguyên âm | Nhận biết 12 nguyên âm đơn tiếng Việt [198] | a, ă, â, e, ê, i, o, ô, ơ, u, ư, y [198] |
| **02** | Phụ âm đơn nhóm I | Nhận diện nét viết và phát âm phụ âm đơn [198] | b, c, d, đ, g, h [198] |
| **03** | Phụ âm đơn nhóm II | Nhận diện nét viết phụ âm đơn [198] | k, l, m, n, p, q [198] |
| **04** | Phụ âm đơn nhóm III | Nhận diện nét viết phụ âm đơn [198] | r, s, t, v, x [198] |
| **05** | Ghép vần cơ bản không dấu | Học ghép phụ âm đơn với nguyên âm đơn [198] | ba, ca, co, lê, đi, đu, cá cá (chưa dấu) |
| **06** | Thanh điệu: Dấu Sắc & Huyền | Làm quen cao độ thanh điệu qua hình ảnh dốc [198] | cá, cà, bé, bè, lá, là [198] |
| **07** | Thanh điệu: Dấu Hỏi & Nặng | Nhận diện và luyện đọc thanh điệu hỏi, nặng [198] | bả, bạ, cỏ, cọ, giỏ, gọ [198] |
| **08** | Thanh điệu: Dấu Ngã | Luyện âm ngã chuẩn xác, phân biệt hỏi/ngã [198] | kẽ, vẽ, vấp ngã, sữa, vẽ tranh [198] |
| **09** | Phân biệt chính tả c / k / q | Quy tắc chính tả cơ bản đứng trước e, ê, i [198] | ca, cá - kem, kệ, kẻ, ki, kì [198] |
| **10** | Phân biệt chính tả g / gh | Quy tắc viết âm kép g ghép với e, ê, i [198] | gà, gỗ - ghế, ghi, ghé tai [198] |
| **11** | Phụ âm ghép: ch & tr | Phân biệt phát âm ch và tr trực quan [198] | chó con, tre xanh, chổi, trà [198] |
| **12** | Phụ âm ghép: kh & ph | Đọc ghép tiếng chứa phụ âm kh, ph [198] | khỉ con, phở, quả khế, phố xá [198] |
| **13** | Phụ âm ghép: nh & th | Nhận diện và đọc trơn từ chứa nh, th [198] | nhà gỗ, thỏ bông, nho chín, thước [198] |
| **14** | Phụ âm ghép: ng & ngh | Quy tắc chính tả ng đơn và ngh kép [198] | cá ngừ, ngô - nghe nhạc, nghé con [198] |
| **15** | Ghép vần chứa âm cuối nhóm I | Ghép vần có cấu trúc âm cuối đơn giản [198] | -an, -at, -am, -ap (bàn học, bát ăn, quả cam) |
| **16** | Ghép vần chứa âm cuối nhóm II | Ghép vần nâng cao [198] | -en, -et, -on, -ot (vườn sen, quả bồ kết, con bọ) |
| **17** | Phân biệt chính tả l / n | Sửa ngọng âm đầu l và n bằng giọng đọc mẫu [198] | hoa lan, nải chuối, quả lê, cái nấm [198] |
| **18** | Phân biệt chính tả s / x | Phân biệt từ vựng chứa âm s và x [198] | ngôi sao, chiếc xe, hoa sen, quả xoài [198] |
| **19** | Phân biệt chính tả r / d / gi | Nhận diện cách phát âm vùng miền chuẩn [198] | cá rô, quả dâu, giỏ tre, rùa con [198] |
| **20** | Từ vựng: Chỉ Người & Vật | Nhận biết từ loại xung quanh bé An Nhiên [199] | bố mẹ, bàn ghế, con mèo, công chúa [191, 199] |
| **21** | Từ vựng: Chỉ Hoạt động | Tìm hiểu các động từ vui chơi hằng ngày [199] | chạy bộ, vẽ tranh, ca hát, quét nhà [199] |
| **22** | Từ vựng: Chỉ Đặc điểm | Gọi tên màu sắc, hình dáng, tính chất vật [199] | xinh đẹp, nhỏ bé, tròn xoe, ngọt ngào [199] |
| **23** | Đọc hiểu câu đơn ngắn | Trả lời câu hỏi có/không sau khi đọc [198] | "Bé có chú thỏ bông màu trắng." -> Thỏ màu gì? |
| **24** | Đọc hiểu đoạn văn ngắn | Kết nối ý nghĩa giữa 3 câu liên tiếp [198] | Câu chuyện mèo con bắt bướm trong vườn hoa [198] |
| **25** | Nghe viết chính tả từ đơn | Luyện gõ từ vựng tiếng Việt đơn giản [198] | quả táo, mèo con, bông hoa, kẹo mút [198] |
| **26** | Tập làm văn: Tự giới thiệu | Hoàn thành câu giới thiệu bản thân 3 câu [199] | "Con tên là An Nhiên. Con thích mèo. Con 6 tuổi." |
| **27** | Tập làm văn: Tả đồ vật bé yêu | Viết câu ngắn tả thỏ bông, lâu đài của bé [199] | "Chú thỏ bông rất mềm. Tai thỏ dài. Con yêu thỏ." |
| **28** | Tập làm văn: Tả con vật đáng yêu | Viết câu ngắn tả bé mèo béo hoặc cún con [199] | "Mèo béo nằm sưởi nắng. Lông mèo màu vàng ấm." |
| **29** | Truyện cổ tích Việt Nam ngắn | Lắng nghe và đọc theo truyện Thánh Gióng/Tấm Cám [198, 216] | Đọc diễn cảm, nhận biết bài học đạo đức [216, 217] |
| **30** | Trạng nguyên Tiếng Việt nhí | Đọc to trơn tru đoạn văn 50 từ không ngắc ngứ [198] | Thử thách tổng hợp, nhận huy hiệu vinh danh [214] |

### 4.2. Đặc tả các mẫu Game Tương tác cho Tiếng Việt

#### Game VIE-G1: `tone_drag` (Thả dấu thanh ma thuật) [198]
* **Hành vi vật lý:** Trên màn hình hiển thị một từ vựng bị khuyết dấu thanh (Ví dụ: `mè` hoặc `mê` cần chuyển thành `mèo`, `mẹ`) [198]. Bên dưới là 5 đám mây pastel mang hình ảnh các dấu thanh: Sắc (´), Huyền (`), Hỏi (ˀ), Ngã (~), Nặng (.) [198]. Bé kéo đám mây dấu thả chính xác vào nguyên âm của từ [198].
* **Animation & VFX:** Đám mây lướt đi mượt mà có hiệu ứng gió thổi mờ [206]. Khi thả đúng vị trí, chữ khuyết tự động ghép dấu, phồng to lên, nổ tung bong bóng hình ngôi sao lấp lánh [205, 206]. Khi sai, dấu thanh trượt nhẹ rơi về vị trí cũ [205].

#### Game VIE-G2: `spell_connect` (Nối vần tạo tiếng) [198]
* **Hành vi vật lý:** Hiển thị phụ âm đầu bên trái (Ví dụ: `b`) và các nguyên âm/vần bên phải (Ví dụ: `a`, `ê`, `u`). Bé thực hiện thao tác vuốt nối (draw connection line) giữa phụ âm và vần để ghép thành từ có nghĩa thực tế [198].
* **VFX & Audio:** Đường vẽ nối có màu dải cầu vồng đa sắc [204]. Khi kết nối thành công, cô giáo AI đọc đánh vần rõ ràng: *"Bờ - a - ba - ba!"* [198, 214].

#### Game VIE-G3: `read_aloud` (Đọc to diễn cảm) [198, 215]
* **Hành vi vật lý:** Chữ viết hiển thị lớn kèm hình ảnh nhân vật chuyển động động [205]. Bé bấm biểu tượng Microphone [215], đọc to toàn bộ câu tiếng Việt hiển thị trên màn hình [198, 215].
* **Logic chấm điểm:** Hệ thống tự động so khớp thời gian thực, bôi đậm màu xanh lá cây cho các từ bé phát âm đúng và bôi đỏ mờ cho các từ bé phát âm sai hoặc bị ngắc ngứ quá 3 giây để con dễ dàng nhận diện lỗi sai và tập đọc lại [198].

---

## CHƯƠNG V: MA TRẬN 10 GAME THEMES THẦM MỸ 2D PASTEL CHO AN NHIÊN

Để trò chơi luôn hấp dẫn, 10 chủ đề bối cảnh dưới đây sẽ được tự động tạo ngẫu nhiên dựa trên tham số `theme` được cấu hình từ Database, phản ánh chân thực sở thích cá nhân của bé An Nhiên [160, 170]:

```
+---------------------------------------------------------------------------------+
|                                 GAME CANVAS (2D)                                |
|  [Header Bar: Lvl 5]                   [Streak: 🔥 7]           [Score: ⭐⭐⭐] |
|                                                                                 |
|                     * * *  SPACE GALAXY / MAGIC FOREST  * * *                   |
|                                                                                 |
|            (..)       (..)                        /\_/\   Meow!                 |
|           ( oo )     ( oo )                      ( o.o )                        |
|            \__/       \__/                        > ^ <                         |
|         [Object 1] [Object 2]                  [Pet Avatar]                     |
|                                                                                 |
|  [Question UI: "Có bao nhiêu chú mèo con lấp lánh trong dải ngân hà?"]          |
|                                                                                 |
|    +--------------+    +--------------+    +--------------+    +--------------+ |
|    |    Thẻ  5    |    |    Thẻ  6    |    |    Thẻ  7    |    |    Thẻ  8    | |
|    +--------------+    +--------------+    +--------------+    +--------------+ |
+---------------------------------------------------------------------------------+
```

1. **Theme Công chúa hồng (Princess Castle):** Nền tháp lâu đài đá hồng phấn, đám mây hình vương miện [4, 160]. Đồ vật đếm: viên ngọc, chiếc nơ, giày thủy tinh [4, 160].
2. **Theme Rồng con (Dragon Caves):** Nền hang động thạch anh tím lấp lánh, nhũ đá nhỏ rực rỡ [4, 160]. Đồ vật đếm: trứng rồng, viên rubi, đuốc lửa màu xanh ngọc.
3. **Theme Thỏ bông (Rabbit Garden):** Nền vườn cỏ ba lá, ngôi nhà hình nấm của thỏ [6, 160]. Đồ vật đếm: củ cà rốt, dâu tây đỏ, bông hoa cúc trắng [6, 160].
4. **Theme Kỳ lân mây (Unicorn Rainbow):** Nền cầu vồng dốc mượt, dải mây xốp pastel [28, 160]. Đồ vật đếm: ngôi sao ngũ sắc, mây hồng, sừng kỳ lân tỏa sáng.
5. **Theme Vũ trụ (Space Galaxy):** Nền ngân hà tím thẫm mờ ảo, bụi sao chuyển động chậm [8, 160]. Đồ vật đếm: tên lửa mini, hành tinh xanh, đĩa bay UFO [8, 160].
6. **Theme Kẹo ngọt (Candy Land):** Nền đồi kem tươi và dòng sông sô-cô-la chảy mượt [6, 160]. Đồ vật đếm: kẹo mút xoắn ốc, bánh quy gấu, bánh donut dâu [6, 160].
7. **Theme Đại dương (Underwater World):** Nền rạn san hô xanh ngọc, bọt khí nổi lơ lửng, rong biển uốn lượn. Đồ vật đếm: sao biển, vỏ sò óng ánh, chú cá hề.
8. **Theme Phòng bếp (Cooking Lab):** Nền kệ bếp gỗ sồi ấm áp, nồi soup đang sôi nhẹ tỏa khói [177]. Đồ vật đếm: quả trứng, hũ gia vị, lát bánh mì gối [177].
9. **Theme Cửa hàng (Magic Shop):** Nền tủ kính gỗ cổ kính chứa các bình thuốc phép thuật [175]. Đồ vật đếm: cuộn giấy da cổ, đồng xu đồng, lọ nước phép màu xanh [175].
10. **Theme Khu rừng thần thoại (Magical Forest):** Nền các thân cây cổ thụ uốn cong bằng thuật toán L-System, nấm phát sáng [155, 166]. Đồ vật đếm: quả sồi, chiếc lá phong, chú đom đóm.

---

## CHƯƠNG VI: THIẾT KẾ THUẬT TOÁN SINH THẾ GIỚI TỰ ĐỘNG (PROCEDURAL GENERATION)

Hệ thống bắt buộc phải sử dụng các thuật toán hình học và sinh ngẫu nhiên có kiểm soát (deterministic random) để vẽ giao diện trực tiếp bằng code, tránh tải tài nguyên hình ảnh cồng kềnh, giảm thời gian load trang trên iPad xuống dưới 1.5 giây [155, 182].

### 6.1. Thuật toán sinh ngẫu nhiên có Seed (Mulberry32 Engine)
Để bảo đảm tính tái tạo thế giới học tập của bé hằng ngày [163], Kỹ sư lập trình AI cần triển khai hàm sinh số ngẫu nhiên dựa trên mã Seed cố định (Ví dụ: `seed = child_id + date + level_id`) [162].

```typescript
// Mulberry32 generator trong TypeScript
export function createSeededRandom(seedStr: string): () => number {
  let h = 0x82f253db ^ seedStr.split('').reduce((acc, char) => (acc ^ char.charCodeAt(0)) + ((acc << 5) + (acc >> 2)), 0);
  return function() {
    let t = h += 0x6d2b79f5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}
```

### 6.2. Thuật toán vẽ Địa hình đồi núi SVG Parallax mượt mà
Sử dụng các điểm nội suy hình sin để tạo các đường cong đồi núi tự nhiên trên các phần tử SVG, xếp lớp chồng lên nhau tạo chiều sâu không gian (Parallax Effect) [165].

```typescript
interface HillPoint {
  x: number;
  y: number;
}

export function generateHillPath(width: number, height: number, segments: number, amplitude: number, randFn: () => number): string {
  const points: HillPoint[] = [];
  const step = width / segments;
  
  for (let i = 0; i <= segments; i++) {
    const x = i * step;
    // Sử dụng hàm Sin kết hợp nhiễu ngẫu nhiên để tạo đồi nhấp nhô tự nhiên
    const y = height - (amplitude + Math.sin(i * 0.8) * (amplitude / 2) + randFn() * 20);
    points.push({ x, y });
  }
  
  // Chuyển đổi mảng điểm thành thẻ SVG Cubic Bezier Curve mượt mà
  let path = `M 0 ${height} L 0 ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const xc = (curr.x + next.x) / 2;
    const yc = (curr.y + next.y) / 2;
    path += ` Q ${curr.x} ${curr.y}, ${xc} ${yc}`;
  }
  path += ` L ${width} ${points[points.length - 1].y} L ${width} ${height} Z`;
  return path;
}
```

### 6.3. Thuật toán L-System (Lindenmayer System) vẽ Cây cỏ Ma thuật
Vẽ cấu trúc cây cối, cành hoa trực tiếp lên thẻ HTML5 Canvas bằng trình thông dịch rùa (Turtle Graphics Script) [166, 167].

```typescript
export function compileLSystem(iterations: number, randFn: () => number): string {
  // Quy tắc L-System cho cây cổ thụ của bé An Nhiên
  const axiom = "X";
  const rules: Record<string, string> = {
    "X": "F-[[X]+X]+F[+FX]-X",
    "F": "FF"
  };
  
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

export function renderTreeOnCanvas(
  ctx: CanvasRenderingContext2D, 
  instructions: string, 
  startX: number, 
  startY: number, 
  initLength: number, 
  angleStep: number
) {
  const stack: { x: number; y: number; angle: number; length: number }[] = [];
  let x = startX;
  let y = startY;
  let angle = -Math.PI / 2; // Hướng thẳng đứng lên trên
  let length = initLength;

  ctx.strokeStyle = "#8D6E63"; // Thân cây nâu nhạt pastel
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, y);

  for (const char of instructions) {
    if (char === "F") {
      const nextX = x + Math.cos(angle) * length;
      const nextY = y + Math.sin(angle) * length;
      ctx.lineTo(nextX, nextY);
      x = nextX;
      y = nextY;
    } else if (char === "+") {
      angle += angleStep;
    } else if (char === "-") {
      angle -= angleStep;
    } else if (char === "[") {
      stack.push({ x, y, angle, length });
    } else if (char === "]") {
      const state = stack.pop();
      if (state) {
        x = state.x;
        y = state.y;
        angle = state.angle;
        length = state.length;
        ctx.moveTo(x, y);
      }
    }
  }
  ctx.stroke();
}
```

---

## CHƯƠNG VII: PROMPT CHO CÔ GIÁO GIA SƯ AI & THUẬT TOÁN ĐÁNH GIÁ CÁ NHÂN HOÁ

### 7.1. Master System Prompt cho Cô giáo Gia sư AI "Cô An Nhiên" [155, 168]
```
[SYSTEM PROMPT]
ROLE: Bạn là Cô giáo Gia sư ảo chuyên biệt, dạy kèm liên môn Toán, Tiếng Anh và Tiếng Việt lớp 1 cho bé An Nhiên (6 tuổi) [155, 186].
BIỆT DANH TRẺ: "An Nhiên", "con yêu" hoặc "bé yêu" [191, 199].
GIAO DIỆN TƯƠNG TÁC: Bạn hiển thị dưới dạng bong bóng thoại kế bên avatar một chú mèo béo xốp dễ thương [173, 176].

PRINCIPLES (Nguyên tắc sư phạm bất di bất dịch) [3, 200]:
1. TUYỆT ĐỐI KHÔNG trực tiếp đưa ra đáp án cuối cùng. Sử dụng gợi ý (Hint) phân bậc để kích thích tư duy của trẻ [3, 169, 200].
2. TUYỆT ĐỐI KHÔNG dùng từ ngữ mang tính tiêu cực hạ thấp sự tự tin của trẻ (Cấm viết: "Con sai rồi", "Không đúng", "Yếu quá"). Hãy thay bằng các câu trung tính động viên: "Ồ, gần chính xác rồi con ơi!", "An Nhiên thử suy nghĩ lại một chút xem nào!" [169, 200].
3. KHÔNG sử dụng thuật ngữ sư phạm hàn lâm, trừu tượng (Cấm viết: "phép tính giao hoán", "âm vị học", "L-System", "database", "procedural config") [169, 200].
4. Gọi con bằng vị thế ngang hàng thân thiện, dịu dàng, khích lệ nỗ lực tự thân hơn là tốc độ làm bài [world_logic, 168, 202].

FORMAT: Câu trả lời luôn ngắn gọn, từ 1 đến tối đa 3 câu ngắn. Trẻ em 6 tuổi không đọc được các đoạn hội thoại dài dòng [169, 199].
```

### 7.2. Đặc tả Thuật toán chấm điểm Nỗ lực & Tiến bộ (Adaptive Scoring Engine) [213]
Hệ thống tính điểm của dự án không chỉ dựa vào tính chính xác của đáp án mà còn vinh danh nỗ lực vượt khó tự sửa sai của bé An Nhiên [202, 213].

Công thức tính Điểm Tổng hợp cho từng câu hỏi ($S_{total}$) [213]:
$$S_{total} = (S_{acc} 	imes 0.4) + (S_{effort} 	imes 0.3) + (S_{improve} 	imes 0.3) - P_{hint}$$

Trong đó [213]:
1. **$S_{acc}$ (Accuracy Score):** Đạt 100 điểm nếu trả lời đúng ngay lần đầu. Đạt 50 điểm nếu trả lời đúng ở lần thứ hai. Đạt 0 điểm nếu trả lời sai quá 3 lần.
2. **$S_{effort}$ (Effort Score):** Điểm nỗ lực tự thân. Đạt 100 điểm nếu bé làm sai lần đầu, nhưng tự suy nghĩ và sửa lại đáp án đúng ở lần tiếp theo mà không bấm bỏ qua bài học [202].
3. **$S_{improve}$ (Improvement Score):** Điểm tiến bộ so với mức trung bình của kỹ năng đó trong lịch sử học tập. Đạt 100 điểm nếu thời gian suy nghĩ hợp lý (không bấm bừa quá nhanh < 2 giây và không treo máy quá lâu > 120 giây) [211].
4. **$P_{hint}$ (Hint Penalty):** Điểm trừ hỗ trợ nhẹ. Bấm Hint 1 không trừ điểm. Bấm Hint 2 trừ 5 điểm. Bấm Hint 3 trừ 10 điểm [213].

---

## CHƯƠNG VIII: TIÊU CHUẨN HOÀN THÀNH MVP & KẾ HOẠCH TRIỂN KHAI

Hệ thống được quy chuẩn hóa thành 3 giai đoạn triển khai cuốn chiếu chi tiết [225, 226]:

### Giai đoạn 1: Khung xương cốt lõi (Tuần 1 - 2) [225]
* Thiết lập toàn bộ Database Postgres trên Supabase theo SQL DDL Chương II, kích hoạt bảo mật RLS [188, 221, 223].
* Xây dựng giao diện Responsive (Mobile/Tablet/Desktop) cho màn hình Child Home, Adventure Map và Parent Dashboard [188, 225].
* Triển khai tĩnh (static data JSON) cho 30 level Toán, 30 level Tiếng Anh, và 30 level Tiếng Việt [225, 228, 229].

### Giai đoạn 2: Trí tuệ Nhân tạo & Cá nhân hoá (Tuần 3 - 4) [225, 226]
* Tích hợp OpenAI GPT-4o API cho các tính năng: giải thích lỗi sai khi làm bài, viết báo cáo tự động cho phụ huynh hằng tuần, và tự động tạo truyện cổ tích toán học/ngoại ngữ lồng ghép theo sở thích công chúa, thỏ bông của bé An Nhiên [185, 186, 216, 218].
* Triển khai thuật toán Ôn tập ngắt quãng (Spaced Repetition) để tự động hiển thị lại các câu hỏi thuộc kỹ năng yếu của trẻ sau 1 ngày, 3 ngày, và 7 ngày [201, 209].

### Giai đoạn 3: Trải nghiệm Nghe - Nói & Động họa nâng cao (Tuần 5 - 6) [226]
* Tích hợp Web Speech API (nhận diện giọng đọc tiếng Việt & tiếng Anh của bé qua micro) và sinh giọng đọc TTS cho cô giáo AI giảng bài [214, 215, 226].
* Triển khai PWA (Progressive Web App) để phụ huynh cài đặt trực tiếp phím tắt mở app nhanh ra màn hình chính của iPad [188, 226].
* Tối ưu hóa hiệu năng render Canvas và SVG để đạt điểm số tối thiểu 90% trên Google Lighthouse Performance [182].

---
*Tài liệu master này là hướng dẫn kiến trúc tối thượng, giúp mọi hệ thống lập trình tự động (AI Coding Agent) có thể tự tay tạo sinh hoàn chỉnh mã nguồn dự án Học Cùng An Nhiên chất lượng cao.* [155, 187]
