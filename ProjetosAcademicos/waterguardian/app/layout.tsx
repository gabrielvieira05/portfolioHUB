import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WaterGuardian Solution",
  description: "Monitorando e protegendo o recurso mais precioso do nosso planeta",
    generator: 'Water'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const revealElements = document.querySelectorAll('.reveal');
              
              function reveal() {
                for (let i = 0; i < revealElements.length; i++) {
                  const windowHeight = window.innerHeight;
                  const elementTop = revealElements[i].getBoundingClientRect().top;
                  const elementVisible = 150;
                  
                  if (elementTop < windowHeight - elementVisible) {
                    revealElements[i].classList.add('active');
                  }
                }
              }
              
              window.addEventListener('scroll', reveal);
              reveal();
            });
          `,
          }}
        />
      </body>
    </html>
  )
}
