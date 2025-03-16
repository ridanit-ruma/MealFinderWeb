import { apiClient } from '@/services/api.client';

export function isNotificationEnabled() {
    return window.Notification && Notification.permission === 'granted';
}

export async function subscribe() {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: `${import.meta.env.VITE_PUBLIC_KEY}`, // 위에서 생성한 VAPID 공개 키
    });

    const res = await apiClient.post('/push/subscribe', subscription);

    if (res.data.id) localStorage.setItem('subscriptionId', res.data.id);
}

export async function unsubscribe() {
    const registration = await navigator.serviceWorker.ready;

    const id = localStorage.getItem('subscriptionId');
    if (!id) return;

    localStorage.removeItem('subscriptionId');

    await apiClient.post(`/push/unsubscribe`, {
        id: parseInt(id),
    });

    const sub = await registration.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
}
