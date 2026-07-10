// Service Worker to handle push notifications for Vrajaspice Admin Panel
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data = {};
  try {
    data = event.data.json();
  } catch {
    data = { title: '🎉 New Order placed!', body: event.data.text() };
  }

  const title = data.title || '🎉 New Order Received!';
  const options = {
    body: data.body || 'A customer has just placed a new order.',
    icon: '/logo.png',
    badge: '/logo.png',
    tag: 'admin-new-order',
    renotify: true,
    data: { url: data.url || '/admin/orders' },
    actions: [
      { action: 'view', title: 'View Orders' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/admin/orders';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing tab if open
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      // Open new tab if none open
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
