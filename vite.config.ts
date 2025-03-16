import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import * as fs from 'fs';
import 'dotenv/config';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    server: {
        https:
            process.env.SSL == 'true'
                ? {
                      key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY!)),
                      cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CERT!)),
                  }
                : undefined,
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: null,
            includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            manifest: {
                name: '급식', // 앱 이름
                short_name: 'meal', // 앱의 짧은 이름
                id: 'com.inizeno.meal',
                description: '급식 조회', // 앱 설명
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
                ],
            },
            devOptions: {
                enabled: true,
            },
        }),
        react(),
        svgr(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
