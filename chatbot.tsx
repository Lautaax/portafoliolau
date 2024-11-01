'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X } from 'lucide-react'

const chatbotResponses = {
  "hola": "¡Hola! Bienvenido a xxxxx. ¿En qué puedo ayudarte hoy?",
  "servicios": "Ofrecemos servicios de desarrollo web, community management y creación de tiendas online. ¿Sobre cuál te gustaría saber más?",
  "desarrollo web": "Nuestro servicio de desarrollo web incluye diseño personalizado, desarrollo frontend y backend, optimización para móviles y SEO básico. ¿Tienes algún proyecto en mente?",
  "community management": "Nuestro servicio de community management abarca la gestión de redes sociales, creación de contenido, programación de publicaciones y análisis de métricas. ¿Te interesa aumentar tu presencia en redes sociales?",
  "tiendas online": "Creamos tiendas online a medida utilizando plataformas como Shopify o WooCommerce. Incluimos diseño personalizado, integración de pagos y optimización para conversiones. ¿Estás pensando en vender en línea?",
  "precios": "Nuestros precios varían según las necesidades específicas de cada proyecto. ¿Te gustaría solicitar un presupuesto personalizado?",
  "contacto": "Puedes contactarnos llamando al +1 234 567 890 o enviando un email a info@xxxxx.com. También puedes usar el formulario de contacto en nuestra página web. ¿Prefieres que te contactemos nosotros?",
  "default": "Lo siento, no tengo información específica sobre eso. ¿Puedo ayudarte con algo más sobre nuestros servicios de desarrollo web, community management o tiendas online?",
  "proceso": "Nuestro proceso de trabajo incluye las siguientes etapas: Análisis, Diseño, Desarrollo, Pruebas y Lanzamiento. ¿Te gustaría saber más sobre alguna etapa en particular?",
  "análisis": "En la etapa de análisis, nos reunimos contigo para entender tus necesidades y objetivos. Realizamos una investigación de mercado y definimos los requisitos del proyecto.",
  "diseño": "Durante la etapa de diseño, creamos wireframes y maquetas visuales de tu proyecto. Trabajamos en la experiencia de usuario (UX) y la interfaz de usuario (UI).",
  "desarrollo": "En la fase de desarrollo, nuestro equipo de programadores trabaja en la implementación del diseño y la funcionalidad de tu proyecto.",
  "pruebas": "Realizamos pruebas exhaustivas para asegurar que todo funcione correctamente y que el proyecto cumpla con los estándares de calidad.",
  "lanzamiento": "Una vez que todo está listo y aprobado, procedemos al lanzamiento de tu proyecto. Te proporcionamos soporte durante y después del lanzamiento.",
  "portafolio": "Puedes ver algunos de nuestros proyectos destacados en la sección 'Proyectos' de nuestra página web. ¿Hay algún tipo de proyecto en particular que te interese ver?",
}

export default function Chatbot({ currentSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual de xxxxx. ¿En qué puedo ayudarte?", isBot: true }
  ])
  const [input, setInput] = useState("")

  useEffect(() => {
    let welcomeMessage = "¡Hola! Soy el asistente virtual de xxxxx. ¿En qué puedo ayudarte?"
    if (currentSection === "servicios") {
      welcomeMessage = "¡Hola! Veo que estás interesado en nuestros servicios. ¿Quieres saber más sobre desarrollo web, community management o tiendas online?"
    } else if (currentSection === "proyectos") {
      welcomeMessage = "¡Hola! ¿Te gustaría conocer más detalles sobre alguno de nuestros proyectos destacados?"
    } else if (currentSection === "contacto") {
      welcomeMessage = "¡Hola! Si necesitas ayuda para contactarnos, estoy aquí para asistirte."
    }
    setMessages([{ text: welcomeMessage, isBot: true }])
  }, [currentSection])

  const handleSend = () => {
    if (input.trim() === "") return

    setMessages(prev => [...prev, { text: input, isBot: false }])
    
    const lowercaseInput = input.toLowerCase()
    let botResponse = chatbotResponses.default
    
    // Análisis de lenguaje natural básico
    const keywords = Object.keys(chatbotResponses)
    const matchedKeywords = keywords.filter(keyword => lowercaseInput.includes(keyword))
    
    if (matchedKeywords.length > 0) {
      // Si hay múltiples coincidencias, elegir la más larga
      const bestMatch = matchedKeywords.reduce((a, b) => a.length > b.length ? a : b)
      botResponse = chatbotResponses[bestMatch]
    } else if (lowercaseInput.includes("gracias") || lowercaseInput.includes("adios")) {
      botResponse = "¡Gracias por tu interés! Si tienes más preguntas, no dudes en consultarme. ¡Que tengas un buen día!"
    } else if (lowercaseInput.includes("humano") || lowercaseInput.includes("persona")) {
      botResponse = "Entiendo que prefieras hablar con un humano. Puedes contactarnos directamente llamando al +1 234 567 890 o enviando un email a info@xxxxx.com."
    }
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }])
    }, 500)
    
    setInput("")
  }

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={24} />
      </Button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Chat con xxxxx</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-80 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.isBot ? "text-left" : "text-right"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.isBot
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex space-x-2"
            >
              <Input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <Button
              className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => {
                setMessages(prev => [...prev, { 
                  text: "Gracias por tu interés. Un agente humano se pondrá en contacto contigo pronto. Por favor, proporciona tu correo electrónico o número de teléfono para que podamos contactarte.", 
                  isBot: true 
                }])
              }}
            >
              Hablar con un agente humano
            </Button>
          </div>
        </div>
      )}
    </>
  )
}