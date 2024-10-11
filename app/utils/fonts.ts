import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';

export const lexend: NextFontWithVariable = localFont({
    src: '../fonts/Lexend-VariableFont_wght.ttf',
    variable: '--font-lexend',
    weight: '300 500',
});

export const familjenGrotesk: NextFontWithVariable = localFont({
    src: '../fonts/FamiljenGrotesk-VariableFont_wght.ttf',
    variable: '--font-familjenGrotesk',
    weight: '400 600',
});
