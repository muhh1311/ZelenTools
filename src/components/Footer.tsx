import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // 🌌 Same Ultra-Transparent Theme
    <footer className="border-t border-blue-500/10 bg-[#0b1329]/10 backdrop-blur-lg text-slate-300 py-6 mt-12 w-full">
      
      {/* 🛠️ Yahan max-w-[1100px] mx-auto hata kar w-full kiya hai takay 123apps jaisa side par jaye */}
      <div className="w-full px-6 flex flex-col sm:flex-row justify-between items-center text-[13px] gap-4">
        
        <p className="text-slate-400">
          {/* 🛠️ text-green-500 ko text-black kar diya aur Terms link bhi neeche naye design jaisa hai */}
          © 2026 <span className="font-bold text-black">ZelenTools</span>. All rights reserved.
        </p>

        <nav className="flex gap-x-5 text-slate-400">
          <Link to="/about" className="hover:text-blue-400 hover:underline transition-colors no-underline">About</Link>
          <Link to="/privacy-policy" className="hover:text-blue-400 hover:underline transition-colors no-underline">Privacy</Link>
          <Link to="/terms" className="hover:text-blue-400 hover:underline transition-colors no-underline">Terms</Link>
          <Link to="/contact" className="hover:text-blue-400 hover:underline transition-colors no-underline">Contact</Link>
        </nav>
        
      </div>
    </footer>
  );
}