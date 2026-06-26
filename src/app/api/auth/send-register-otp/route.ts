import { NextResponse } from "next/server";

function formatPhoneNumber(num: string): string {
  const clean = num.replace(/\D/g, "");
  if (clean.length === 10) {
    return "91" + clean;
  }
  return clean;
}

export async function POST(request: Request) {
  try {
    const { whatsappNumber } = await request.json();

    if (!whatsappNumber) {
      return NextResponse.json(
        { error: "WhatsApp number is required." },
        { status: 400 }
      );
    }

    const authKey = process.env.MSG91_AUTH_KEY;
    const templateId = process.env.MSG91_TEMPLATE_ID;

    if (!authKey) {
      return NextResponse.json(
        { error: "MSG91 Auth Key is not configured." },
        { status: 500 }
      );
    }

    const formattedMobile = formatPhoneNumber(whatsappNumber);

    // Call MSG91 Send OTP endpoint
    const url = new URL("https://control.msg91.com/api/v5/otp");
    url.searchParams.append("authkey", authKey);
    url.searchParams.append("mobile", formattedMobile);
    
    if (templateId && templateId !== "your_msg91_otp_template_id_here") {
      url.searchParams.append("template_id", templateId);
    }
    
    // Explicitly request delivery via WhatsApp channel
    url.searchParams.append("channel", "whatsapp");
    url.searchParams.append("realTimeResponse", "1");

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok && data.type === "success") {
      return NextResponse.json({ success: true, message: "OTP sent successfully via WhatsApp." });
    } else {
      console.error("MSG91 API error response:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send OTP from MSG91." },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error in send-register-otp API:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
