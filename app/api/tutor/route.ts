import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { questionPrompt, studentAnswer, correctAnswer, mistakeType } = await req.json();

    // Trong môi trường thật, chúng ta sẽ gọi tới OpenAI API ở đây:
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4-turbo",
    //   messages: [
    //     { role: "system", content: "Bạn là một cô gia sư dịu dàng, đáng yêu dành cho bé lớp 1." },
    //     ...
    //   ],
    // });

    // Mock API Response cho MVP:
    let aiFeedback = "";
    if (studentAnswer === correctAnswer) {
      aiFeedback = "Giỏi quá! Bé trả lời đúng rồi nè. Tiếp tục phát huy nhé! 🌸";
    } else {
      aiFeedback = `Chưa chính xác mất rồi, nhưng không sao đâu! Bé hãy thử nghĩ xem tại sao lại là ${correctAnswer} nhé. Cô gợi ý: hãy nhìn kỹ lại hình ảnh hoặc đọc chậm lại đề bài một xíu nha! 💡`;
    }

    // Giả lập độ trễ mạng
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      feedback: aiFeedback,
    });
  } catch (error) {
    console.error("AI Tutor Error:", error);
    return NextResponse.json(
      { success: false, error: "Cô gia sư đang bận một xíu, bé thử lại sau nhé!" },
      { status: 500 }
    );
  }
}
