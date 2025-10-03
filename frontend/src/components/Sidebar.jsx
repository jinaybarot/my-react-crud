// Simple SVG icons as components
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const BarChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996-.608 2.296-.07 2.572 1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// export default function Sidebar({ isOpen, onClose, activeItem, onItemClick }) {
//   const menuItems = [
//     { icon: HomeIcon, label: "Dashboard", key: "dashboard" },
//     { icon: BarChartIcon, label: "CRUD", key: "crud" },
//   ];

//   return (
//     <>
//       {/* Sidebar */}
//       <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-0 left-0 z-30 w-64 h-screen bg-white/90 backdrop-blur-md border-r border-slate-200/50 transition-transform duration-300 ease-in-out overflow-y-auto`}>
//         <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">A</span>
//         </div>
//         <h1 className="text-xl font-bold text-slate-800">AppName</h1>
//         <div className="flex flex-col">
//           <div className="p-6">
//             <nav className="space-y-2">
//               {menuItems.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => onItemClick(item.key)}
//                   className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
//                     activeItem === item.key 
//                       ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
//                       : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
//                   }`}
//                 >
//                   <item.icon />
//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile Sidebar Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
//           onClick={onClose}
//         ></div>
//       )}
//     </>
//   );
// }

export default function Sidebar({ isOpen, onClose, activeItem, onItemClick, logoUrl = "" }) {
  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", key: "dashboard" },
    { icon: BarChartIcon, label: "CRUD", key: "crud" },
    { icon: SettingIcon, label: "Setting", key: "setting" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-0 left-0 z-30 w-64 h-screen bg-white/90 backdrop-blur-md border-r border-slate-200/50 transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col`}>

        {/* Logo / Header */}
        <div className="flex items-center space-x-3 m-4">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-8 h-8 object-contain rounded" />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 toPurple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          )}
          <h1 className="text-xl font-bold text-slate-800">AppName</h1>
        </div>

        {/* Divider (optional) */}
        <div className="border-b border-slate-200/50"></div>

        {/* Menu items */}
        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onItemClick(item.key)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeItem === item.key
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <item.icon />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}





