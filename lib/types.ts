export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
