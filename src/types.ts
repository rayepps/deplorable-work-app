
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never

export type Job = {
  id: string
  title: string
  description: string
  location: string
  link: string
  createdAt: string
  company: {
    name: string
  }
  thumbnail: {
    id: string
    url: string
  }
}

export type Worker = {
  id: string
  name: string
  desiredRole: string
  description: string
  createdAt: string
  thumbnail: {
    id: string
    url: string
  }
}