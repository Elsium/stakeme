import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { montserrat, poppins } from '@/shared/utils/fonts'

import './globals.css'

export const metadata: Metadata = {
    title: 'Stakeme',
    description: 'Stakeme test case'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactNode {
    return (
        <html lang='en'>
            <body className={`${poppins.variable} ${montserrat.variable}`}>{children}</body>
        </html>
    )
}
