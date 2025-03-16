self.addEventListener('push', (event) => {
    const data = event.data.json();

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon.png',
    });
})

export async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js");
            console.log("Service Worker 등록 완료:", registration);
        } catch (error) {
            console.error("Service Worker 등록 실패:", error);
        }
    }
}

export async function subscribeUser() {
    const registration = await navigator.serviceWorker.ready;
    
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.PUBLIC_KEY // 위에서 생성한 VAPID 공개 키
    });

    console.log("푸시 구독 정보:", JSON.stringify(subscription));
    
    // 백엔드에 구독 정보 전송
    await fetch("http://localhost:3000/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription)
    });
}
