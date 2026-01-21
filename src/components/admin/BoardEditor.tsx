import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";
import { useState } from "react";

function BoardEditorInner() {
    const boardMembers = useQuery(api.queries.getAllBoardMembers);
    const createMember = useMutation(api.mutations.createBoardMember);
    const updateMember = useMutation(api.mutations.updateBoardMember);
    const deleteMember = useMutation(api.mutations.deleteBoardMember);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [formData, setFormData] = useState({ name: "", role: "", order: 1 });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingMember) {
            await updateMember({
                id: editingMember._id,
                name: formData.name,
                role: formData.role,
                order: formData.order,
            });
        } else {
            await createMember({
                name: formData.name,
                role: formData.role,
                order: formData.order,
            });
        }
        setIsModalOpen(false);
        setEditingMember(null);
        setFormData({ name: "", role: "", order: 1 });
    };

    const handleEdit = (member: any) => {
        setEditingMember(member);
        setFormData({ name: member.name, role: member.role, order: member.order });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this board member?")) {
            await deleteMember({ id: id as any });
        }
    };

    if (!boardMembers) {
        return <div className="p-8"><p>Loading...</p></div>;
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Board Members</h1>
                    <p className="text-gray-600 mt-1">Manage the board of directors</p>
                </div>
                <button
                    onClick={() => {
                        setEditingMember(null);
                        setFormData({ name: "", role: "", order: boardMembers.length + 1 });
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <i data-lucide="plus" className="w-5 h-5"></i>
                    Add Member
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {boardMembers.map((member) => (
                            <tr key={member._id}>
                                <td className="px-6 py-4">{member.order}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                                            {member.name.split(" ").map((n: string) => n[0]).join("")}
                                        </div>
                                        <span className="font-medium text-gray-900">{member.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{member.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                        }`}>
                                        {member.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="text-gray-400 hover:text-gray-600 p-1"
                                    >
                                        <i data-lucide="pencil" className="w-4 h-4"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id)}
                                        className="text-gray-400 hover:text-red-600 p-1 ml-2"
                                    >
                                        <i data-lucide="trash-2" className="w-4 h-4"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {editingMember ? "Edit Board Member" : "Add Board Member"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Role *</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="e.g., President, Treasurer"
                                    required
                                />
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
                                    {editingMember ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

}

export default withConvexProvider(BoardEditorInner);
