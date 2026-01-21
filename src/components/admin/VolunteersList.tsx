import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";
import { useState } from "react";
import type { Id } from "../../../convex/_generated/dataModel";

function VolunteersListInner() {
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);

    const volunteers = useQuery(api.queries.getVolunteers, {
        status: selectedStatus || undefined,
    });
    const updateStatus = useMutation(api.mutations.updateVolunteerStatus);

    const handleStatusChange = async (
        id: Id<"volunteers">,
        newStatus: "new" | "contacted" | "active"
    ) => {
        await updateStatus({ id, status: newStatus });
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            new: "bg-blue-100 text-blue-800",
            contacted: "bg-yellow-100 text-yellow-800",
            active: "bg-green-100 text-green-800",
        };
        return styles[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            new: "New",
            contacted: "Contacted",
            active: "Active",
        };
        return labels[status] || status;
    };

    if (!volunteers) {
        return (
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
                    <p className="text-gray-600 mt-1">Manage volunteer applications and status</p>
                </div>
                <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading volunteers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
                <p className="text-gray-600 mt-1">
                    Manage volunteer applications and status
                </p>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <select
                    className="px-4 py-2 border rounded-lg bg-white"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="active">Active</option>
                </select>
            </div>

            {/* Volunteers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {volunteers.length === 0 ? (
                    <div className="text-center py-12">
                        <i data-lucide="users" className="w-12 h-12 text-gray-300 mx-auto mb-4"></i>
                        <p className="text-gray-500">No volunteers found</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {volunteers.map((volunteer) => (
                                <tr key={volunteer._id}>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {formatDate(volunteer.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {volunteer.firstName} {volunteer.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {volunteer.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusBadge(volunteer.status)}`}
                                            value={volunteer.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    volunteer._id,
                                                    e.target.value as any
                                                )
                                            }
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="active">Active</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedVolunteer(volunteer)}
                                            className="text-primary-600 hover:underline text-sm"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Volunteer Detail Modal */}
            {selectedVolunteer && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Volunteer Details
                            </h2>
                            <button
                                onClick={() => setSelectedVolunteer(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">Name</label>
                                    <p className="font-medium">
                                        {selectedVolunteer.firstName} {selectedVolunteer.lastName}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Status</label>
                                    <p className="font-medium">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedVolunteer.status)}`}
                                        >
                                            {getStatusLabel(selectedVolunteer.status)}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <p className="font-medium">
                                    <a
                                        href={`mailto:${selectedVolunteer.email}`}
                                        className="text-primary-600 hover:underline"
                                    >
                                        {selectedVolunteer.email}
                                    </a>
                                </p>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Phone</label>
                                <p className="font-medium">
                                    {selectedVolunteer.phone ? (
                                        <a
                                            href={`tel:${selectedVolunteer.phone}`}
                                            className="text-primary-600 hover:underline"
                                        >
                                            {selectedVolunteer.phone}
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </p>
                            </div>

                            {selectedVolunteer.message && (
                                <div>
                                    <label className="text-sm text-gray-500">Message</label>
                                    <p className="font-medium bg-gray-50 p-3 rounded-lg mt-1">
                                        {selectedVolunteer.message}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="text-sm text-gray-500">Signed Up</label>
                                <p className="font-medium">
                                    {formatDate(selectedVolunteer.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t">
                            <button
                                onClick={() => setSelectedVolunteer(null)}
                                className="btn-secondary flex-1"
                            >
                                Close
                            </button>
                            <a
                                href={`mailto:${selectedVolunteer.email}`}
                                className="btn-primary flex-1 text-center"
                            >
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withConvexProvider(VolunteersListInner);
