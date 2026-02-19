/**
 * PachaPacha — Tailwind Config · Monochrome Minimal
 * tailwind.config.js
 *
 * Palette: black / white / 9 grays only.
 * All earth/water/sage color references in HTML continue
 * to work — they now resolve to gray equivalents.
 * This keeps the HTML untouched while the visual becomes monochrome.
 */

tailwind.config = {
    theme: {
        extend: {

            /* ─── Fonts ─────────────────────────────────────── */
            fontFamily: {
                'sans':    ['DM Sans', 'Noto Sans JP', 'sans-serif'],
                'display': ['DM Sans', 'Noto Sans JP', 'sans-serif'],
                'jp':      ['Noto Sans JP', 'sans-serif'],
            },

            /* ─── Monochrome Palette ─────────────────────────
               All three brand palettes (earth / water / sage)
               now map to the same gray scale.
               50  = near white (#fafafa)
               100 = very light (#f4f4f4)
               200 = light border (#e8e8e8)
               300 = mid-light (#d0d0d0)
               400 = mid (#aaaaaa)
               500 = mid-dark (#777777)
               600 = dark (#555555)
               700 = darker (#333333)
               800 = near-black (#222222)
               900 = deep (#181818)
               950 = black (#111111)
            ─────────────────────────────────────────────────── */
            colors: {
                /* Earth — maps to gray */
                'earth': {
                    50:  '#fafafa',
                    100: '#f4f4f4',
                    200: '#e8e8e8',
                    300: '#d0d0d0',
                    400: '#aaaaaa',
                    500: '#777777',
                    600: '#555555',
                    700: '#333333',
                    800: '#222222',
                    900: '#181818',
                    950: '#111111',
                },
                /* Water — maps to same gray scale */
                'water': {
                    50:  '#fafafa',
                    100: '#f4f4f4',
                    200: '#e8e8e8',
                    300: '#d0d0d0',
                    400: '#aaaaaa',
                    500: '#777777',
                    600: '#555555',
                    700: '#333333',
                    800: '#222222',
                    900: '#181818',
                    950: '#111111',
                },
                /* Sage — maps to same gray scale */
                'sage': {
                    50:  '#fafafa',
                    100: '#f4f4f4',
                    200: '#e8e8e8',
                    300: '#d0d0d0',
                    400: '#aaaaaa',
                    500: '#777777',
                    600: '#555555',
                    700: '#333333',
                    800: '#222222',
                    900: '#181818',
                    950: '#111111',
                },
            },

            /* ─── Animations ────────────────────────────────── */
            animation: {
                'ripple': 'ripple 3s ease-out infinite',
                'float':  'float 6s ease-in-out infinite',
                'wave':   'wave 8s ease-in-out infinite',
                'bridge': 'bridge 2s ease-out forwards',
            },

            keyframes: {
                ripple: {
                    '0%':   { transform: 'scale(1)',   opacity: '0.3' },
                    '100%': { transform: 'scale(2.5)', opacity: '0'   },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%':      { transform: 'translateY(-12px)' },
                },
                wave: {
                    '0%, 100%': { transform: 'translateX(0) translateY(0)' },
                    '25%':      { transform: 'translateX(8px) translateY(-4px)' },
                    '50%':      { transform: 'translateX(0) translateY(-8px)' },
                    '75%':      { transform: 'translateX(-8px) translateY(-4px)' },
                },
                bridge: {
                    '0%':   { transform: 'scaleX(0)', opacity: '0' },
                    '100%': { transform: 'scaleX(1)', opacity: '1' },
                },
            },
        }
    }
};