import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { otp, maskId } = await request.json();

    if (!otp || !maskId) {
      return NextResponse.json(
        { error: "OTP and maskId are required." },
        { status: 400 }
      );
    }

    const clientId = process.env.AUTHYO_CLIENT_ID || "4310bea735f641f988873c8c61163823";
    const clientSecret = process.env.AUTHYO_CLIENT_SECRET || "495b3bebaf154dae849b4b1a076443f9";

    // Call Authyo Verify OTP Endpoint (GET request with query parameters)
    const url = new URL("https://authyo.io/api/v1/authyoapi/verifyotp");
    url.searchParams.append("maskId", maskId);
    url.searchParams.append("otp", otp);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "clientId": clientId,
        "clientSecret": clientSecret,
      },
    });

    const data = await response.json();

    if (response.ok && data.success === true) {
      return NextResponse.json({ verified: true, message: "OTP verified successfully." });
    } else {
      console.error("Authyo OTP Verification error response:", data);
      return NextResponse.json(
        { error: data.message || data.error || "Invalid OTP code. Please try again." },
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
