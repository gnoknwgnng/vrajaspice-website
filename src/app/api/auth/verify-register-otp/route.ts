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
    const { otp, whatsappNumber } = await request.json();

    if (!otp || !whatsappNumber) {
      return NextResponse.json(
        { error: "OTP and WhatsApp number are required." },
        { status: 400 }
      );
    }

    const authKey = process.env.MSG91_AUTH_KEY;

    if (!authKey) {
      return NextResponse.json(
        { error: "MSG91 Auth Key is not configured." },
        { status: 500 }
      );
    }

    const formattedMobile = formatPhoneNumber(whatsappNumber);

    // Call MSG91 Verify OTP endpoint
    const url = new URL("https://control.msg91.com/api/v5/otp/verify");
    url.searchParams.append("authkey", authKey);
    url.searchParams.append("mobile", formattedMobile);
    url.searchParams.append("otp", otp);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    // MSG91 returns { type: "success", message: "OTP verified successfully" }
    if (response.ok && data.type === "success") {
      return NextResponse.json({ verified: true, message: "OTP verified successfully." });
    } else {
      console.error("MSG91 OTP Verification error response:", data);
      return NextResponse.json(
        { error: data.message || "Invalid OTP code. Please try again." },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error in verify-register-otp API:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
