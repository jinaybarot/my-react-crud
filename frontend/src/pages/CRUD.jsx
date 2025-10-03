import { useEffect, useState } from "react";
import axios from "axios";

export default function CRUD() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [forms, setForms] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/form/myforms",
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      const data = res?.data;
      const list = Array.isArray(data) ? data : data?.forms || [];
      setForms(list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (isEdit) {
        const res = await axios.put(
          `http://localhost:5000/api/form/update/${editId}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/form/create",
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(res.data.msg);
      }

      setTitle("");
      setDescription("");
      setIsEdit(false);
      setEditId(null);
      setIsOpen(false);
      fetchForms();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item._id);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/form/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.msg);
      fetchForms();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Form Management</h1>
        <button
          onClick={() => {
            setIsOpen(true);
            setIsEdit(false);
            setTitle("");
            setDescription("");
          }}
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          + Add New Form
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {forms && forms.length > 0 ? (
              forms.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.description || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 animate-slide-in">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEdit ? "Edit Form" : "Add New Form"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-800 text-3xl font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-gray-500 mb-6">
              {isEdit
                ? "Update the record and click 'Update'."
                : "Fill in the details to create a new form."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter form title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                <textarea
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
