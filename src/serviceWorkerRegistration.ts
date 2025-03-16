export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

export async function subscribeUser() {
    const registration = await navigator.serviceWorker.ready;
    
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: `${import.meta.env.VITE_PUBLIC_KEY}` // 위에서 생성한 VAPID 공개 키
    });

    console.log("푸시 구독 정보:", JSON.stringify(subscription));
    
    // 백엔드에 구독 정보 전송
    await fetch(`${import.meta.env.VITE_NEST_API}/push/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription)
    });
}
