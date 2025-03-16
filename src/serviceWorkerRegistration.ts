export function register() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then((registration) => {
                console.log('SW registered: ', registration);
                registration.update();
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    }
}
