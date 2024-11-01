'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, MessageCircle, Send, Smartphone, Globe, Users, ChevronUp, Code, Paintbrush, ShoppingCart, Phone, Mail, ArrowRight } from 'lucide-react'
import Chatbot from './chatbot'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState("hero")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const newProgress = (scrollPosition / totalHeight) * 100
      setProgress(newProgress)
      setShowScrollTop(scrollPosition > 300)

      // Determinar la sección actual
      const sections = ["hero", "estadisticas", "servicios", "proyectos", "proceso", "cta", "ultimos-trabajos", "faq", "contacto"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <header className="container mx-auto p-4 sticky top-0 bg-white bg-opacity-90 z-50">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">xxxxx</h1>
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              <MessageCircle />
            </Button>
          </div>
          <ul className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <li><Link href="#servicios" className="hover:text-blue-600 transition-colors">Servicios</Link></li>
            <li><Link href="#proyectos" className="hover:text-blue-600 transition-colors">Proyectos</Link></li>
            <li><Link href="#proceso" className="hover:text-blue-600 transition-colors">Proceso</Link></li>
            <li><Link href="#contacto" className="hover:text-blue-600 transition-colors">Contacto</Link></li>
          </ul>
        </nav>
      </header>

      <div className="fixed top-0 left-0 w-full h-1 bg-blue-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <main className="container mx-auto p-4">
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="absolute w-full h-full object-cover"
          >
            <source src="/placeholder.mp4" type="video/mp4" />
          </video>
          <div className="relative z-10 text-center text-white bg-black bg-opacity-50 p-8 rounded-lg">
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Impulsa tu presencia digital
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Desarrollo web, community management y tiendas online a tu medida
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="#contacto" className="flex items-center">
                  Solicita una consulta gratuita
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="estadisticas" className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "100+", text: "Proyectos completados" },
              { number: "50+", text: "Clientes satisfechos" },
              { number: "5+", text: "Años de experiencia" },
              { number: "24/7", text: "Soporte al cliente" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section 
          id="servicios" 
          className="py-20"
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 }
          }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Code, title: "Desarrollo Web", description: "Creamos sitios web atractivos y funcionales que impulsan tu negocio en línea." },
              { icon: Paintbrush, title: "Community Management", description: "Gestionamos tus redes sociales para aumentar tu visibilidad y engagement." },
              { icon: ShoppingCart, title: "Tiendas Online", description: "Desarrollamos e-commerce a medida para que puedas vender tus productos en línea." }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <service.icon className="w-12 h-12 mb-4 text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="mb-4">{service.description}</p>
                <Button variant="outline">Leer más</Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section id="proyectos" className="py-20 bg-blue-50 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Proyectos Destacados</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <motion.div 
                key={project}
                className="bg-white rounded-lg overflow-hidden shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={`/placeholder.svg?height=200&width=300&text=Proyecto ${project}`}
                  alt={`Proyecto ${project}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Proyecto {project}</h3>
                  <p className="text-sm text-gray-600">Descripción breve del proyecto y los resultados obtenidos.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="proceso" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Proceso</h2>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-4">
            {['Análisis', 'Diseño', 'Desarrollo', 'Pruebas', 'Lanzamiento'].map((step, index) => (
              <motion.div 
                key={step}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-2">{step}</h3>
                <p className="text-sm text-gray-600 max-w-[200px]">Breve descripción de esta etapa del proceso.</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="cta" className="py-20 bg-blue-600 text-white rounded-lg">
          <div className="text-center">
            
            <h2 className="text-3xl font-bold mb-4">¿Listo para impulsar tu presencia digital?</h2>
            <p className="mb-8">Contáctanos hoy y comencemos a trabajar en tu proyecto</p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="#contacto" className="flex items-center">
                Solicitar presupuesto <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="ultimos-trabajos" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Últimos Trabajos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((post) => (
              <Card key={post}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Título del proyecto {post}</h3>
                  <p className="text-gray-600 mb-4">Breve descripción del proyecto y los resultados obtenidos.</p>
                  <Button variant="outline">Leer más</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="py-20 bg-blue-50 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cuánto tiempo toma desarrollar un sitio web?</AccordionTrigger>
              <AccordionContent>
                El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede estar listo en 2-4 semanas, mientras que proyectos más complejos pueden tomar 2-3 meses o más.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Qué incluye el servicio de community management?</AccordionTrigger>
              <AccordionContent>
                Nuestro servicio de community management incluye la creación de contenido, programación de publicaciones, interacción con seguidores, análisis de métricas y reportes mensuales de rendimiento.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Ofrecen mantenimiento para las tiendas online?</AccordionTrigger>
              <AccordionContent>
                Sí, ofrecemos planes de mantenimiento que incluyen actualizaciones de seguridad, copias de seguridad regulares, y soporte técnico para asegurar que tu tienda online funcione sin problemas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>¿Qué plataformas utilizan para el desarrollo web?</AccordionTrigger>
              <AccordionContent>
                Utilizamos diversas plataformas según las necesidades del proyecto, incluyendo WordPress, Shopify, y desarrollos personalizados con React y Next.js. Elegimos la mejor opción que se adapte a los requerimientos y objetivos de cada cliente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>¿Ofrecen servicios de SEO junto con el desarrollo web?</AccordionTrigger>
              <AccordionContent>
                Sí, ofrecemos servicios de SEO básico con todos nuestros desarrollos web. Esto incluye optimización on-page, metadatos, y estructura de URL amigable para buscadores. También ofrecemos paquetes de SEO más avanzados como un servicio adicional.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section id="contacto" className="py-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Contáctanos</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <Input type="text" placeholder="Nombre" required />
              <Input type="email" placeholder="Email" required />
              <Textarea placeholder="Mensaje" required />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Send className="mr-2" /> Enviar Mensaje
              </Button>
            </form>
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <Phone className="mr-2 text-blue-600" />
                <p>+1 234 567 890</p>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 text-blue-600" />
                <p>info@xxxxx.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 xxxxx. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-blue-400 transition-colors"><Facebook /></Link>
              <Link href="#" className="hover:text-pink-400 transition-colors"><Instagram /></Link>
              <Link href="#" className="hover:text-blue-600 transition-colors"><Linkedin /></Link>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          className="fixed bottom-36 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
          onClick={scrollToTop}
        >
          <ChevronUp size={24} />
        </Button>
      )}

      <Button
        className="fixed bottom-20 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg"
        onClick={() => window.open("https://wa.me/1234567890", "_blank")}
      >
        <Smartphone size={24} />
      </Button>
      <Chatbot currentSection={currentSection} />

    </div>
  )
}