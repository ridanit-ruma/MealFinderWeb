import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
    server: {},
    plugins: [
        react(),
        mkcert(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
                'favicon.ico',
                'robots.txt',
                'apple-touch-icon.png',
            ],
            manifest: {
                name: 'My Awesome App', // 앱 이름
                short_name: 'AwesomeApp', // 앱의 짧은 이름
                description: 'This is an awesome app for demonstrating PWA', // 앱 설명
                theme_color: '#000000', // 앱 테마 색상 (브라우저 상단바 색상 등)
                background_color: '#ffffff', // 앱 배경 색상
                display: 'standalone', // 앱이 웹 앱처럼 표시될지, 또는 브라우저 탭처럼 표시될지 설정
                start_url: '/', // 앱 시작 URL
                icons: [
                    {
                        src: 'assets/icon-192.png', // 아이콘 이미지 경로
                        sizes: '192x192', // 아이콘 크기
                        type: 'image/png', // 아이콘 타입
                    },
                    {
                        src: 'assets/icon-512.png', // 더 큰 아이콘
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
