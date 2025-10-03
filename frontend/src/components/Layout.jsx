import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard";
import CRUD from "../pages/CRUD";
import Setting from "../pages/Setting";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [settings, setSettings] = useState({ searchEnabled: false, logoUrl: "" });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/settings");
        const setting = res.data?.setting;
        if (setting) {
          setSettings({
            searchEnabled: !!setting.searchEnabled,
            logoUrl: setting.logoUrl ? `http://localhost:5000/uploads/${setting.logoUrl}` : ""
          });
        } else {
          setSettings({ searchEnabled: false, logoUrl: "" });
        }
      } catch (e) {
        // ignore silently
      }
    };

    // initial load
    loadSettings();

    // listen for settings updates dispatched from settings page
    const handleSettingsUpdated = () => loadSettings();
    window.addEventListener("settings-updated", handleSettingsUpdated);

    return () => {
      window.removeEventListener("settings-updated", handleSettingsUpdated);
    };
  }, []);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleItemClick = (itemKey) => {
    setActiveItem(itemKey);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <Dashboard />;
      case "crud":
        return <CRUD />;
      case "setting":
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">

      {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          activeItem={activeItem}
          onItemClick={handleItemClick}
          logoUrl={settings.logoUrl}
        />

      <div className="flex flex-col flex-1">

        {/* Header */}
      <Header onMenuClick={handleMenuClick} showSearch={settings.searchEnabled} />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

