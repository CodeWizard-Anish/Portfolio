import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

const Button = ({ children, className = "" }) => (
  <button
    className={`px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition transform ${className}`}
  >
    {children}
  </button>
);

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  // 🔥 Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  // 🔥 Fetch projects
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔥 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/contact", formData)
      .then(() => {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        // hide success after 3 sec
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen font-sans">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">Anish.dev</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
        >
          Hi, I'm Anish 👋
        </motion.h1>

        <p className="text-lg text-slate-300 mb-6">
          MERN Stack Developer building modern, scalable web apps
        </p>

        <div className="flex justify-center gap-4">
          <Button>View Projects</Button>
          <Button>Contact Me</Button>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg"
            >
              <div className="mb-3 text-sm text-purple-300 font-semibold">
                🚀 Live Project
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {project.title}
              </h3>

              <p className="text-slate-300 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs bg-purple-500/20 px-2 py-1 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a href={project.link} target="_blank" rel="noreferrer">
                <Button>View Project</Button>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Contact Me
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <Button className="w-full">Send Message</Button>

          {success && (
            <p className="text-green-400 text-center">
              Message sent successfully 🚀
            </p>
          )}
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-400">
        © 2026 Anish. Built with MERN Stack.
      </footer>
    </div>
  );
}