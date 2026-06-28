import { useState } from 'react';
import { Link } from 'react-router-dom';
// Sahi directory path ke sath data import
import { toolsList, tabs } from '../components/toolsData'; 

const ToolLink = ({ name, to, icon: Icon }: { name: string; to: string; icon: any }) => {
  return (
    <Link 
      to={to} 
      className="group flex items-center gap-3 w-full rounded-lg transition-all duration-150 no-underline
        py-1.5 px-2 md:py-3 md:px-2 
        hover:bg-blue-50/40 dark:hover:bg-blue-950/10"
    >
      {/* Icon Wrapper: Mobile par icon 18px aur laptop par 20px hoga */}
      <span className="flex-shrink-0 text-gray-800 dark:text-gray-300 group-hover:text-[#2b56f5] dark:group-hover:text-blue-400 transition-colors">
        <div className="block md:hidden">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <div className="hidden md:block">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      </span>
      
      {/* Text Size: Mobile par 14px (sm) aur tight spacing, laptop par 15px */}
      <span className="font-normal text-left text-black dark:text-gray-100 group-hover:text-[#2b56f5] dark:group-hover:text-blue-400 group-hover:underline decoration-1 underline-offset-2 transition-colors leading-tight
        text-[14px] md:text-[15px]"
      >
        {name}
      </span>
    </Link>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTools = activeTab === "all" 
    ? toolsList 
    : toolsList.filter(tool => tool.category === activeTab);

  return (
    <div className="bg-white dark:bg-background min-h-screen flex flex-col antialiased">
      <main className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-24 pb-14 flex-grow text-center">
        
        

        {/* SINGLE SEAMLESS BLUE BOX */}
{/* SINGLE SEAMLESS BLACK BOX (Dabba hamesha rahega, tools left par honge) */}
<div className="border-2 border-black bg-blue-50/5 dark:bg-zinc-950/20 rounded-2xl p-6 md:p-8 shadow-sm text-left">
  
  {/* TABS CONTROL ROW (Heading aur Tabs beech mein hi rahenge) */}
  <div className="flex flex-col items-center justify-center gap-6 mb-8 pb-4 border-b border-gray-200/60 dark:border-gray-700/50">
    
    {/* Heading Box */}
    <div className="border-2 border-black bg-gray-50 dark:bg-zinc-900 px-6 py-2 rounded-xl text-center">
      <h2 className="text-[22px] font-bold text-black dark:text-white tracking-tight font-sans">
        Image Tools
      </h2>
    </div>

    {/* Tabs */}
    <div className="flex flex-wrap justify-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-5 py-2 text-[15px] font-medium rounded-full border transition-all duration-200 cursor-pointer
            ${activeTab === tab.id 
              ? "bg-[#25262b] text-white border-[#25262b] dark:bg-white dark:text-black dark:border-white shadow-sm" 
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 dark:bg-transparent dark:text-gray-300 dark:border-gray-700 dark:hover:border-gray-500"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>

  </div>

  {/* Solid 3-Column Grid for Tools (Yahan hum ne tools ko left line ke sath joda hai) */}
  {filteredTools.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-14 gap-y-3 md:gap-y-4 justify-items-start w-full">
      {filteredTools.map((tool) => (
        <ToolLink key={tool.name} {...tool} />
      ))}
    </div>
  ) : (
    <p className="text-gray-500 dark:text-gray-400 py-4 text-center">No tools found.</p>
  )}

</div>
      </main>
    </div>
  );
};

export default Index;