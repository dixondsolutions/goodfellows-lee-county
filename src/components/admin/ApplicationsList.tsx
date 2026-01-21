import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";
import { useState } from "react";
import type { Id } from "../../../convex/_generated/dataModel";

function ApplicationsListInner() {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedApplication, setSelectedApplication] = useState<any>(null);

    const applications = useQuery(api.queries.getApplications, {
        year: selectedYear,
        status: selectedStatus || undefined,
    });
    const updateStatus = useMutation(api.mutations.updateApplicationStatus);

    const handleStatusChange = async (
        id: Id<"applications">,
        newStatus: "submitted" | "under_review" | "approved" | "denied"
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
            submitted: "bg-blue-100 text-blue-800",
            under_review: "bg-yellow-100 text-yellow-800",
            approved: "bg-green-100 text-green-800",
            denied: "bg-red-100 text-red-800",
        };
        return styles[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            submitted: "Submitted",
            under_review: "Under Review",
            approved: "Approved",
            denied: "Denied",
        };
        return labels[status] || status;
    };

    if (!applications) {
        return (
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                    <p className="text-gray-600 mt-1">Review and manage holiday assistance applications</p>
                </div>
                <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                <p className="text-gray-600 mt-1">
                    Review and manage holiday assistance applications
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
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                </select>
                <select
                    className="px-4 py-2 border rounded-lg bg-white"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                    <option value={currentYear}>{currentYear}</option>
                    <option value={currentYear - 1}>{currentYear - 1}</option>
                </select>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {applications.length === 0 ? (
                    <div className="text-center py-12">
                        <i data-lucide="clipboard-list" className="w-12 h-12 text-gray-300 mx-auto mb-4"></i>
                        <p className="text-gray-500">No applications found</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Applicant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Children
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
                            {applications.map((app) => (
                                <tr key={app._id}>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {formatDate(app.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {app.firstName} {app.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {app.childrenCount
                                            ? `${app.childrenCount} children${app.childrenAges ? ` (${app.childrenAges})` : ""}`
                                            : "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusBadge(app.status)}`}
                                            value={app.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    app._id,
                                                    e.target.value as any
                                                )
                                            }
                                        >
                                            <option value="submitted">Submitted</option>
                                            <option value="under_review">Under Review</option>
                                            <option value="approved">Approved</option>
                                            <option value="denied">Denied</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedApplication(app)}
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

            {/* Application Detail Modal */}
            {selectedApplication && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Application Details
                            </h2>
                            <button
                                onClick={() => setSelectedApplication(null)}
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
                                        {selectedApplication.firstName} {selectedApplication.lastName}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Email</label>
                                    <p className="font-medium">{selectedApplication.email}</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">Phone</label>
                                    <p className="font-medium">
                                        {selectedApplication.phone || "-"}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Status</label>
                                    <p className="font-medium">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedApplication.status)}`}
                                        >
                                            {getStatusLabel(selectedApplication.status)}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Address</label>
                                <p className="font-medium">
                                    {selectedApplication.address
                                        ? `${selectedApplication.address}, ${selectedApplication.city}, ${selectedApplication.state} ${selectedApplication.zip}`
                                        : "-"}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-500">Household Size</label>
                                    <p className="font-medium">
                                        {selectedApplication.householdSize || "-"}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Children</label>
                                    <p className="font-medium">
                                        {selectedApplication.childrenCount
                                            ? `${selectedApplication.childrenCount} (Ages: ${selectedApplication.childrenAges || "N/A"})`
                                            : "-"}
                                    </p>
                                </div>
                            </div>

                            {selectedApplication.needDescription && (
                                <div>
                                    <label className="text-sm text-gray-500">
                                        Situation/Needs
                                    </label>
                                    <p className="font-medium bg-gray-50 p-3 rounded-lg mt-1">
                                        {selectedApplication.needDescription}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="text-sm text-gray-500">Submitted</label>
                                <p className="font-medium">
                                    {formatDate(selectedApplication.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t">
                            <button
                                onClick={() => setSelectedApplication(null)}
                                className="btn-secondary flex-1"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withConvexProvider(ApplicationsListInner);
