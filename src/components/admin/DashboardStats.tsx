import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";

function DashboardStatsInner() {
    const donationStats = useQuery(api.queries.getDonationStats);
    const boardMembers = useQuery(api.queries.getBoardMembers);
    const programs = useQuery(api.queries.getPrograms);

    const stats = {
        donations: donationStats?.total ?? 0,
        donorCount: donationStats?.count ?? 0,
        boardMembers: boardMembers?.length ?? 0,
        programs: programs?.length ?? 0,
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome to the Goodfellows CMS</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Donations</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">${stats.donations.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <i data-lucide="dollar-sign" className="w-6 h-6 text-green-600"></i>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{stats.donorCount} donors</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Board Members</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.boardMembers}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <i data-lucide="users" className="w-6 h-6 text-blue-600"></i>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Active members</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Programs</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.programs}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                            <i data-lucide="folder-heart" className="w-6 h-6 text-purple-600"></i>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Active programs</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Families Helped</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">1000+</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                            <i data-lucide="heart-handshake" className="w-6 h-6 text-orange-600"></i>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Since 1918</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <a href="/admin/board" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                <i data-lucide="user-plus" className="w-5 h-5 text-amber-600"></i>
                            </div>
                            <span className="font-medium text-gray-700">Manage Board</span>
                        </a>
                        <a href="/admin/programs" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                                <i data-lucide="folder-plus" className="w-5 h-5 text-teal-600"></i>
                            </div>
                            <span className="font-medium text-gray-700">Manage Programs</span>
                        </a>
                        <a href="/admin/donations" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <i data-lucide="heart" className="w-5 h-5 text-green-600"></i>
                            </div>
                            <span className="font-medium text-gray-700">View Donations</span>
                        </a>
                        <a href="/admin/settings" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <i data-lucide="settings" className="w-5 h-5 text-gray-600"></i>
                            </div>
                            <span className="font-medium text-gray-700">Site Settings</span>
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">CMS Status</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <i data-lucide="database" className="w-5 h-5 text-green-600"></i>
                                <span className="text-gray-700">Convex Database</span>
                            </div>
                            <span className="text-green-600 font-medium">Connected</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <i data-lucide="shield" className="w-5 h-5 text-green-600"></i>
                                <span className="text-gray-700">Clerk Auth</span>
                            </div>
                            <span className="text-green-600 font-medium">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <i data-lucide="globe" className="w-5 h-5 text-blue-600"></i>
                                <span className="text-gray-700">Public Site</span>
                            </div>
                            <a href="/" target="_blank" className="text-blue-600 font-medium hover:underline">View →</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withConvexProvider(DashboardStatsInner);
