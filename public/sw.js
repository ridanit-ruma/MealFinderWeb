self.addEventListener('push', (e) => {
    self.console.log('push event', e);
    const data = e.data.json();

    self.registration.showNotification(data.title, {
        body: data.body,
    });
});

self.addEventListener('install', (e) => {
    self.console.log('install event', e);
});
