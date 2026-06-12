import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'
import Home    from './pages/Home'
import Browse  from './pages/Browse'
import Submit  from './pages/Submit'
import About   from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"       element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/about"  element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
