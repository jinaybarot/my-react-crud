import { useState, useEffect } from "react";
import axios from "axios";

export default function Setting() {
  const [logo, setLogo] = useState(null);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [existingLogoUrl, setExistingLogoUrl] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/settings");
        const setting = res.data?.setting;
        if (setting) {
          if (typeof setting.searchEnabled === "boolean") {
            setSearchEnabled(setting.searchEnabled);
          }
          if (setting.logoUrl) {
            setExistingLogoUrl(`http://localhost:5000/uploads/${setting.logoUrl}`);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("searchEnabled", searchEnabled ? "1" : "0");

    try {
      const res = await axios.post("http://localhost:5000/api/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(res.data);
      alert("Settings saved!");
      // dispatch a custom event so Layout can refresh settings without page reload
      window.dispatchEvent(new Event("settings-updated"));
    } catch (err) {
      console.error(err);
      alert("Error saving settings");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="ui-card p-6">
        <h2 className="text-2xl font-bold mb-2 text-slate-800">Settings</h2>
        <p className="text-sm text-slate-500 mb-6">Manage your application appearance and features.</p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Company Logo */}
        <div className="flex items-center justify-between">
          <label className="w-1/3 ui-label mb-0">
            Company Logo
          </label>
          <input
            type="file"
            className="w-2/3 ui-input"
            onChange={(e) => {
              const file = e.target.files[0];
              setLogo(file || null);
              if (file) {
                setLogoPreview(URL.createObjectURL(file));
              } else {
                setLogoPreview("");
              }
            }}
          />
        </div>

        { (logoPreview || existingLogoUrl) && (
          <div className="flex items-start justify-between">
            <div className="w-1/3"></div>
            <div className="w-3/3">
              <img
                src={logoPreview || existingLogoUrl}
                alt="Current logo preview"
                className="w-48 h-32 object-contain border rounded-lg shadow-sm"
              />
            </div>
          </div>
        ) }

        {/* Searchbar */}
        <div className="flex items-center justify-between">
          <label className="w-1/3 ui-label mb-0">Search</label>
          <div className="w-3/3 flex">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={searchEnabled}
                onChange={() => setSearchEnabled(!searchEnabled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="ui-btn-primary"
          >
            Save
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
