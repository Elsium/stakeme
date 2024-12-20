import { Montserrat, Poppins } from 'next/font/google'

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['500', '700'],
    variable: '--font-poppins'
})

export const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['500', '700'],
    variable: '--font-montserrat'
})
