import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'
import Impact from '@/components/sections/Impact'
import Experience from '@/components/sections/Experience'
import TechStack from '@/components/sections/TechStack'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="bg-bg min-h-screen">
      <Nav />
      <Hero />
      <Impact />
      <Experience />
      <TechStack />
      <Contact />
    </main>
  )
}
