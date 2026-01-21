import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";

function DonationsListInner() {
    const donations = useQuery(api.queries.getAllDonations, { limit: 100 });
    const stats = useQuery(api.queries.getDonationStats);

    if (!donations || !stats) {
        return (
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
                    <p className="text-gray-600 mt-1">View and manage donation records</p>
                </div>
                <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading donations...</p>
                </div>
            </div>
        );
    }

    // Calculate this month's donations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const thisMonthDonations = donations.filter(
        (d) => d.createdAt >= startOfMonth && d.status === "completed"
    );
    const thisMonthTotal = thisMonthDonations.reduce((sum, d) => sum + d.amount, 0);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            completed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            failed: "bg-red-100 text-red-800",
        };
        return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
                <p className="text-gray-600 mt-1">View and manage donation records</p>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Total Received</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        {formatAmount(stats.total)}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">This Month</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        {formatAmount(thisMonthTotal)}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">Donor Count</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stats.count}</p>
                </div>
            </div>

            {/* Donations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {donations.length === 0 ? (
                    <div className="text-center py-12">
                        <i data-lucide="heart" className="w-12 h-12 text-gray-300 mx-auto mb-4"></i>
                        <p className="text-gray-500">No donations yet</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Donor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {donations.map((donation) => (
                                <tr key={donation._id}>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {formatDate(donation.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {donation.isAnonymous
                                            ? "Anonymous"
                                            : `${donation.firstName}${donation.lastName ? ` ${donation.lastName}` : ""}`}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {formatAmount(donation.amount)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(donation.status)}`}
                                        >
                                            {donation.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default withConvexProvider(DonationsListInner);
