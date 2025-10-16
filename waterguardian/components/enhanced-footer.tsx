import Link from "next/link"
import { Droplet, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export function EnhancedFooter() {
  return (
    <footer className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            {/* Update the logo in the footer to use the light version for better visibility */}
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="h-6 w-6" />
              <span className="text-xl font-bold water-guardian-logo-light">WaterGuardian Solution</span>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Monitorando e protegendo o recurso mais precioso do nosso planeta. Nossa missão é promover o uso
              consciente da água através de tecnologia e educação.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-primary-foreground hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-primary-foreground hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-primary-foreground hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-primary-foreground hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Fórum
                </Link>
              </li>
              <li>
                <Link href="/dicas" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Dicas
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Suporte
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-90 hover:opacity-100 hover:underline">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-lg">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-90" />
                <span className="text-sm opacity-90">brennooliveira@waterguardiansolution.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-90" />
                <span className="text-sm opacity-90">(61) 9876-5432</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 opacity-90" />
                <span className="text-sm opacity-90">Brasília, DF - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-90">
            © {new Date().getFullYear()} WaterGuardian Solution. Todos os direitos reservados.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 opacity-10">
        <div
          className="animate-wave w-[200%] h-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23ffffff'/%3E%3C/svg%3E\")",
            backgroundSize: "100% 100%",
          }}
        />
      </div>
    </footer>
  )
}
