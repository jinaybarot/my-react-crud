import axios from "axios";
import { useState } from "react";

export default function MapPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
        const res = await axios.post("http://localhost:5000/api/maps/add", { country }, 
            {headers: { Authorization: `Bearer ${token}` }
        });
        alert(res.data.msg);
    } catch (error) {
        alert(error.response?.data?.msg || "Error adding country");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="ui-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Country</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              + Add Country
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 animate-slide-in">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Add New Form
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-800 text-3xl font-bold"
                >
                  &times;
                </button>
              </div>

              <p className="text-gray-500 mb-6">Add your country here.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Enter country name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                    Save
                    </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
