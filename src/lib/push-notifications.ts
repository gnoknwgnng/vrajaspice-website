import { supabase } from '@/lib/supabase';
import webpush from 'web-push';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:admin@vrajaspice.in';

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

/**
 * Save an admin push subscription to the database.
 */
export async function saveAdminPushSubscription(subscription: {
  endpoint: string;
  p256dh: string;
  auth: string;
}) {
  const { error } = await supabase
    .from('admin_push_subscriptions')
    .upsert(
      {
        endpoint: subscription.endpoint,
        p256dh: subscription.p256dh,
        auth: subscription.auth,
      },
      { onConflict: 'endpoint' }
    );

  if (error) {
    console.error('Error saving admin push subscription:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Send a push notification to all subscribed admin browser endpoints.
 */
export async function sendAdminOrderPushNotification(orderId: string) {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.log('[Push Notification] VAPID keys not configured. Skipping push.');
    return;
  }

  // 1. Fetch order details
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('order_number, total_amount, payment_method')
    .eq('id', orderId)
    .single();

  if (orderError || !order) {
    console.error('[Push Notification] Error fetching order:', orderError);
    return;
  }

  // 2. Fetch all admin push subscriptions
  const { data: subscriptions, error: subError } = await supabase
    .from('admin_push_subscriptions')
    .select('endpoint, p256dh, auth');

  if (subError || !subscriptions || subscriptions.length === 0) {
    console.log('[Push Notification] No admin push subscriptions found.');
    return;
  }

  const payload = JSON.stringify({
    title: 'New Order Received! 🛍️',
    body: `Order #${order.order_number} for ₹${order.total_amount} (${order.payment_method.toUpperCase()}) was placed.`,
    url: '/admin/orders',
  });

  console.log(`[Push Notification] Broadcasting new order push for #${order.order_number} to ${subscriptions.length} admin device(s)...`);

  // 3. Send notifications to all active subscribers
  const sendPromises = subscriptions.map(async (sub) => {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        },
        payload
      );
    } catch (err: any) {
      // If subscription has expired or is invalid (HTTP 410 or 404), remove it from the DB
      if (err.statusCode === 410 || err.statusCode === 404) {
        console.log(`[Push Notification] Subscription expired (status ${err.statusCode}). Deleting...`);
        await supabase
          .from('admin_push_subscriptions')
          .delete()
          .eq('endpoint', sub.endpoint);
      } else {
        console.error('[Push Notification] Error sending notification to endpoint:', err);
      }
    }
  });

  await Promise.allSettled(sendPromises);
}
