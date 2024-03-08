import Navbar from '@/components/navbar'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import Footer from '@/components/footer'
import { Poppins, Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
 
const roboto = Poppins({
  weight: ["400", "500", "700", "900"],
  subsets: ['latin'],
})


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={roboto.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Navbar />
            {children}
            {/* <Footer /> */}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}