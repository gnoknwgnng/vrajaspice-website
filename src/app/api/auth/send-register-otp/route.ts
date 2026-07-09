import { NextResponse } from "next/server";

function formatPhoneNumber(num: string): string {
  const clean = num.replace(/\D/g, "");
  if (clean.length === 10) {
    return "+91" + clean;
  }
  if (!num.startsWith("+") && clean.startsWith("91")) {
    return "+" + clean;
  }
  return num.startsWith("+") ? num : "+" + num;
}

export async function POST(request: Request) {
  try {
    const { whatsappNumber } = await request.json();

    if (!whatsappNumber) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    const clientId = process.env.AUTHYO_CLIENT_ID || "4310bea735f641f988873c8c61163823";
    const clientSecret = process.env.AUTHYO_CLIENT_SECRET || "495b3bebaf154dae849b4b1a076443f9";

    const formattedMobile = formatPhoneNumber(whatsappNumber);

    // Call Authyo Send OTP Endpoint
    const response = await fetch("https://app.authyo.io/api/v1/auth/sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "clientId": clientId,
        "clientSecret": clientSecret,
      },
      body: JSON.stringify({
        to: formattedMobile,
        authway: "SMS",
        otplength: 6,
        expiry: 600,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success === true) {
      // Find the maskId from results
      const resultObj = data.data?.results?.[0];
      if (resultObj && resultObj.success === true) {
        return NextResponse.json({
          success: true,
          maskId: resultObj.maskId,
          message: "OTP sent successfully via SMS.",
        });
      } else {
        return NextResponse.json(
          { error: resultObj?.message || "Authyo service failed to dispatch SMS." },
          { status: 400 }
        );
      }
    } else {
      console.error("Authyo API error response:", data);
      return NextResponse.json(
        { error: data.message || data.error || "Failed to send OTP from Authyo." },
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
