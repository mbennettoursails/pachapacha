/**
 * PachaPacha - Tailwind CSS Configuration
 * パチャパチャ - Tailwind CSS設定
 * 
 * This file configures the Tailwind CSS CDN with custom:
 * - Font families (DM Sans, Playfair Display, Noto Sans JP)
 * - Color palette (Earth, Water, Sage)
 * - Custom animations (ripple, float, wave, bridge)
 */

tailwind.config = {
    theme: {
        extend: {
            // Font Families
            fontFamily: {
                'sans': ['DM Sans', 'Noto Sans JP', 'sans-serif'],
                'display': ['Playfair Display', 'serif'],
                'jp': ['Noto Sans JP', 'sans-serif'],
            },
            
            // Custom Color Palette
            colors: {
                // Earth Tones - Warm browns inspired by Pachamama
                'earth': {
                    50: '#faf6f1',
                    100: '#f0e6d8',
                    200: '#e0ccb0',
                    300: '#cba87a',
                    400: '#b8864f',
                    500: '#a67038',
                    600: '#8b5a2f',
                    700: '#6f4527',
                    800: '#5c3a24',
                    900: '#4d3221',
                    950: '#2a1a10',
                },
                // Water Tones - Cool teals for digital transformation
                'water': {
                    50: '#f0fafb',
                    100: '#d9f2f4',
                    200: '#b8e5ea',
                    300: '#87d2db',
                    400: '#4fb6c4',
                    500: '#3499a9',
                    600: '#2d7b8e',
                    700: '#2a6474',
                    800: '#295361',
                    900: '#264652',
                    950: '#142d37',
                },
                // Sage Tones - Natural greens for growth
                'sage': {
                    50: '#f4f7f4',
                    100: '#e3ebe3',
                    200: '#c8d7c8',
                    300: '#a1b9a1',
                    400: '#759575',
                    500: '#587858',
                    600: '#445f44',
                    700: '#384d38',
                    800: '#2f3f2f',
                    900: '#283428',
                    950: '#131c13',
                },
            },
            
            // Custom Animations
            animation: {
                'ripple': 'ripple 3s ease-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'wave': 'wave 8s ease-in-out infinite',
                'bridge': 'bridge 2s ease-out forwards',
            },
            
            // Keyframes for Animations
            keyframes: {
                ripple: {
                    '0%': { transform: 'scale(1)', opacity: '0.4' },
                    '100%': { transform: 'scale(2.5)', opacity: '0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                wave: {
                    '0%, 100%': { transform: 'translateX(0) translateY(0)' },
                    '25%': { transform: 'translateX(10px) translateY(-5px)' },
                    '50%': { transform: 'translateX(0) translateY(-10px)' },
                    '75%': { transform: 'translateX(-10px) translateY(-5px)' },
                },
                bridge: {
                    '0%': { transform: 'scaleX(0)', opacity: '0' },
                    '100%': { transform: 'scaleX(1)', opacity: '1' },
                },
            }
        }
    }
};