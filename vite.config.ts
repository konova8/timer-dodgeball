import { svelte } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "images/icons/timer.svg",
                "images/logos/*",
                "sounds/alarm.mp3",
            ],
            manifest: {
                name: "Timer Dodgeball",
                short_name: "Dodgeball",
                description:
                    "Tabellone segnapunti e cronometro per partite di dodgeball",
                theme_color: "#1a1a2e",
                background_color: "#1a1a2e",
                display: "standalone",
                orientation: "any",
                start_url: "/",
                icons: [
                    {
                        src: "/images/icons/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,jpg,mp3}"],
            },
        }),
    ],
})
