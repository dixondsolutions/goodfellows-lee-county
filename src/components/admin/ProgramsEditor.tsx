import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";
import { useState } from "react";

const iconOptions = [
    { value: "heart-handshake", label: "Heart Handshake" },
    { value: "gift", label: "Gift" },
    { value: "home", label: "Home" },
    { value: "users", label: "Users" },
    { value: "heart", label: "Heart" },
    { value: "helping-hand", label: "Helping Hand" },
    { value: "shield", label: "Shield" },
    { value: "star", label: "Star" },
];

function ProgramsEditorInner() {
    const programs = useQuery(api.queries.getAllPrograms);
    const createProgram = useMutation(api.mutations.createProgram);
    const updateProgram = useMutation(api.mutations.updateProgram);
    const deleteProgram = useMutation(api.mutations.deleteProgram);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState<any>(null);
    const [formData, setFormData] = useState({ title: "", description: "", icon: "heart-handshake", order: 1 });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProgram) {
            await updateProgram({
                id: editingProgram._id,
                title: formData.title,
                description: formData.description,
                icon: formData.icon,
                order: formData.order,
            });
        } else {
            await createProgram({
                title: formData.title,
                description: formData.description,
                icon: formData.icon,
                order: formData.order,
            });
        }
        setIsModalOpen(false);
        setEditingProgram(null);
        setFormData({ title: "", description: "", icon: "heart-handshake", order: 1 });
    };

    const handleEdit = (program: any) => {
        setEditingProgram(program);
        setFormData({
            title: program.title,
            description: program.description,
            icon: program.icon,
            order: program.order
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this program?")) {
            await deleteProgram({ id: id as any });
        }
    };

    if (!programs) {
        return <div className="p-8"><p>Loading...</p></div>;
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
                    <p className="text-gray-600 mt-1">Manage programs displayed on the website</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProgram(null);
                        setFormData({ title: "", description: "", icon: "heart-handshake", order: programs.length + 1 });
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <i data-lucide="plus" className="w-5 h-5"></i>
                    Add Program
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                    <div key={program._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                <i data-lucide={program.icon} className="w-6 h-6 text-white"></i>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => handleEdit(program)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                >
                                    <i data-lucide="pencil" className="w-4 h-4"></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(program._id)}
                                    className="text-gray-400 hover:text-red-600 p-1"
                                >
                                    <i data-lucide="trash-2" className="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>
                        <p className="text-gray-600 text-sm">{program.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${program.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }`}>
                                {program.isActive ? "Active" : "Inactive"}
                            </span>
                            <span className="text-xs text-gray-400">Order: {program.order}</span>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {editingProgram ? "Edit Program" : "Add Program"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label>Icon</label>
                                <select
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                >
                                    {iconOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Display Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    min="1"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary flex-1">
                                    {editingProgram ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withConvexProvider(ProgramsEditorInner);
