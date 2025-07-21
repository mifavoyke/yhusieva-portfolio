'use client'

import BackgroundGlow from '../components/BackgroundGlow'
import Avatar from '../components/Avatar'

export default function Home() {
  return (
    <div className="relative w-full min-h-screen text-neutral-200 overflow-hidden">
      <BackgroundGlow />

      {/* HERO */}
      <Avatar />
      <section className="min-h-screen flex flex-col justify-center items-center px-2 text-center -mt-325">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 text-transparent bg-clip-text">
          Welcome to my world
        </h1>
      </section>

      {/* ABOUT */}
      <section className="py-10 px-6 flex flex-col items-center text-center mt-70">
        <h2 className="text-3xl font-semibold mb-8 text-pink-400">About Me</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-neutral-300 mb-5">
          Hi, I'm Yeva — a software engineer with a taste for sleek design, elegant code, and a touch of cyberpunk flair. I love building immersive digital experiences and solving beautiful, messy problems. This portfolio is my playground.
        </p>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto bg-zinc-900/80 p-8 rounded-2xl border border-zinc-800 text-purple-500">
          <h2 className="text-3xl font-semibold mb-8">Contact Me</h2>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300 mb-10 text-left">
            <b>Email: </b><a href="mailto:husievayeva@gmail.com" className="text-neutral-300 hover:text-fuchsia-300 transition">yevahusieva@gmail.com</a>
          </p>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const formData = new FormData(form)
              console.log('Form submitted:', {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
              })
              form.reset()
            }}
          >
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="bg-zinc-800/90 p-3 rounded-lg text-neutral-200 border border-zinc-700 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="bg-zinc-800/90 p-3 rounded-lg text-neutral-200 border border-zinc-700 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your message"
              required
              className="bg-zinc-800/90 p-3 rounded-lg text-neutral-200 border border-zinc-700 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            />
            <button
              type="submit"
              className="relative px-6 py-3 rounded-xl font-medium text-neutral-200 group transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-xl bg-zinc-800 group-hover:bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 group-hover:opacity-100 blur-sm transition duration-300"></span>
              <span className="relative z-10">Send Message</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
