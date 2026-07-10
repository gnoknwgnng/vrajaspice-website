import { NextResponse } from 'next/server';
import { saveAdminPushSubscription } from '@/lib/push-notifications';

export async function POST(req: Request) {
  try {
    const { subscription } = await req.json();

    if (!subscription || !subscription.endpoint || !subscription.keys || !subscription.keys.p256dh || !subscription.keys.auth) {
      return NextResponse.json({ success: false, error: 'Invalid subscription object' }, { status: 400 });
    }

    const formattedSub = {
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    };

    const result = await saveAdminPushSubscription(formattedSub);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Subscription saved successfully' });
  } catch (err: any) {
    console.error('Error in push subscribe route:', err);
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 });
  }
}
