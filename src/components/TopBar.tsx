import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    // 🌌 90% Transparent Blue (bg-[#0b1329]/10) + Strong Blur (backdrop-blur-lg)
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0b1329]/10 backdrop-blur-lg border-b border-blue-500/10 shadow-sm">
      
      {/* 🛠️ Yahan humne max-w-[1100px] aur mx-auto hata kar w-full kar diya hai taake logo bilkul side par chala jaye */}
      <div className="h-14 flex items-center px-6 w-full justify-between">
        
        <Link to="/" className="relative flex items-center group py-1 no-underline">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/5 rounded-tl-[18px] rounded-br-[18px] -rotate-12 group-hover:rotate-0 transition-transform duration-300 ease-in-out"></div>
          
          <span className="relative z-10 text-xl font-extrabold text-black tracking-tight pl-2">
            ZelenTools
          </span>
        </Link>

      </div>
    </header>
  );
};

export default TopBar;