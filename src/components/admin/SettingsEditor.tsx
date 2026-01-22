import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";
import { useState, useEffect } from "react";

type TabKey = "general" | "header" | "footer" | "colors";

const TABS: { key: TabKey; label: string; icon: string }[] = [
    { key: "general", label: "General", icon: "settings" },
    { key: "header", label: "Header", icon: "layout" },
    { key: "footer", label: "Footer", icon: "align-justify" },
    { key: "colors", label: "Colors", icon: "palette" },
];

function SettingsEditorInner() {
    const settings = useQuery(api.queries.getAllSiteSettings);
    const updateSetting = useMutation(api.mutations.updateSiteSetting);

    const [activeTab, setActiveTab] = useState<TabKey>("general");
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState("");

    // Default values for all settings
    const defaults: Record<string, string> = {
        // General
        organizationName: "Goodfellows of Lee County",
        tagline: "Helping those in need since 1918. A 100% volunteer-run organization.",
        email: "info@goodfellowsil.org",
        phone: "",
        address: "704 S. Lincoln Ave",
        city: "Dixon",
        state: "IL",
        zip: "61021",
        applicationStartDate: "September 1",
        applicationEndDate: "October 31",
        currentYear: "2026",

        // Header
        headerLogoText: "Goodfellows",
        headerShowLogo: "true",
        headerNavHome: "Home",
        headerNavVolunteers: "Volunteers",
        headerNavApply: "Apply",
        headerNavContact: "Contact",
        headerCtaText: "Donate",
        headerCtaLink: "/#donate",

        // Footer
        footerTagline: "Helping those in need since 1918. A 100% volunteer-run organization.",
        footerShowAdminLink: "true",
        footerCopyrightText: "All rights reserved.",

        // Colors
        primaryColor: "#f59e0b",
        primaryColorDark: "#d97706",
        accentColor: "#10b981",
        accentColorDark: "#059669",
    };

    useEffect(() => {
        if (settings) {
            const merged: Record<string, string> = {};
            Object.keys(defaults).forEach(key => {
                merged[key] = settings[key] || defaults[key];
            });
            setFormData(merged);
        }
    }, [settings]);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveAll = async () => {
        setIsSaving(true);
        try {
            const updates = Object.entries(formData).filter(([key, value]) => {
                return value !== (settings?.[key] || defaults[key]);
            });

            for (const [key, value] of updates) {
                await updateSetting({ key, value });
            }

            setSavedMessage("Settings saved!");
            setTimeout(() => setSavedMessage(""), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    if (!settings) {
        return (
            <div className="p-8">
                <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading settings...</p>
                </div>
            </div>
        );
    }

    const renderInput = (key: string, label: string, type: "text" | "textarea" | "email" | "color" = "text", rows = 3) => (
        <div key={key}>
            <label>{label}</label>
            {type === "textarea" ? (
                <textarea
                    rows={rows}
                    value={formData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            ) : type === "color" ? (
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={formData[key] || "#000000"}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-12 h-10 p-1 rounded cursor-pointer"
                    />
                    <input
                        type="text"
                        value={formData[key] || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                    />
                </div>
            ) : (
                <input
                    type={type}
                    value={formData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            )}
        </div>
    );

    const renderToggle = (key: string, label: string) => (
        <div key={key} className="flex items-center gap-3">
            <input
                type="checkbox"
                id={key}
                checked={formData[key] === "true"}
                onChange={(e) => handleChange(key, e.target.checked ? "true" : "false")}
                className="w-5 h-5"
            />
            <label htmlFor={key} className="mb-0 cursor-pointer">{label}</label>
        </div>
    );

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
                    <p className="text-gray-600 mt-1">Configure global site settings</p>
                </div>
                <div className="flex items-center gap-4">
                    {savedMessage && (
                        <div className="p-3 bg-green-100 text-green-800 rounded-lg inline-flex items-center gap-2">
                            <i data-lucide="check" className="w-4 h-4"></i>
                            {savedMessage}
                        </div>
                    )}
                    <button
                        onClick={handleSaveAll}
                        disabled={isSaving}
                        className="btn-primary flex items-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <i data-lucide="save" className="w-4 h-4"></i>
                                Save All Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b overflow-x-auto">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 font-medium whitespace-nowrap flex items-center gap-2 transition-colors ${
                            activeTab === tab.key
                                ? "text-primary-600 border-b-2 border-primary-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <i data-lucide={tab.icon} className="w-4 h-4"></i>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* General Tab */}
            {activeTab === "general" && (
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Organization Info</h2>
                        <div className="space-y-4">
                            {renderInput("organizationName", "Organization Name")}
                            {renderInput("tagline", "Tagline", "textarea", 2)}
                            {renderInput("email", "Contact Email", "email")}
                            {renderInput("phone", "Phone Number")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Address</h2>
                        <div className="space-y-4">
                            {renderInput("address", "Street Address")}
                            <div className="grid grid-cols-3 gap-4">
                                {renderInput("city", "City")}
                                {renderInput("state", "State")}
                                {renderInput("zip", "ZIP")}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Period</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {renderInput("applicationStartDate", "Start Date")}
                            {renderInput("applicationEndDate", "End Date")}
                            {renderInput("currentYear", "Current Year")}
                        </div>
                    </div>
                </div>
            )}

            {/* Header Tab */}
            {activeTab === "header" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Logo & Branding</h2>
                        <div className="space-y-4">
                            {renderInput("headerLogoText", "Logo Text")}
                            {renderToggle("headerShowLogo", "Show Logo Icon")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation Labels</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {renderInput("headerNavHome", "Home Link")}
                            {renderInput("headerNavVolunteers", "Volunteers Link")}
                            {renderInput("headerNavApply", "Apply Link")}
                            {renderInput("headerNavContact", "Contact Link")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Call to Action Button</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {renderInput("headerCtaText", "Button Text")}
                            {renderInput("headerCtaLink", "Button Link")}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Tab */}
            {activeTab === "footer" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Footer Content</h2>
                        <div className="space-y-4">
                            {renderInput("footerTagline", "Footer Tagline", "textarea", 2)}
                            {renderInput("footerCopyrightText", "Copyright Text")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Footer Options</h2>
                        <div className="space-y-4">
                            {renderToggle("footerShowAdminLink", "Show Admin Login Link")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Info (from General)</h2>
                        <p className="text-gray-500 text-sm">
                            The footer automatically uses the organization name, address, and email from the General tab.
                        </p>
                    </div>
                </div>
            )}

            {/* Colors Tab */}
            {activeTab === "colors" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Primary Color (Amber/Gold)</h2>
                        <p className="text-gray-500 text-sm mb-4">Used for buttons, highlights, and brand elements</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {renderInput("primaryColor", "Primary Color", "color")}
                            {renderInput("primaryColorDark", "Primary Dark (hover)", "color")}
                        </div>
                        <div className="mt-4 flex gap-4">
                            <div
                                className="w-24 h-12 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                                style={{ backgroundColor: formData.primaryColor }}
                            >
                                Primary
                            </div>
                            <div
                                className="w-24 h-12 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                                style={{ backgroundColor: formData.primaryColorDark }}
                            >
                                Hover
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Accent Color (Green)</h2>
                        <p className="text-gray-500 text-sm mb-4">Used for secondary actions and accents</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {renderInput("accentColor", "Accent Color", "color")}
                            {renderInput("accentColorDark", "Accent Dark (hover)", "color")}
                        </div>
                        <div className="mt-4 flex gap-4">
                            <div
                                className="w-24 h-12 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                                style={{ backgroundColor: formData.accentColor }}
                            >
                                Accent
                            </div>
                            <div
                                className="w-24 h-12 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                                style={{ backgroundColor: formData.accentColorDark }}
                            >
                                Hover
                            </div>
                        </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <h3 className="font-semibold text-yellow-800 mb-2">Note about Colors</h3>
                        <p className="text-yellow-700 text-sm">
                            Color changes require CSS variable updates to take full effect. Currently, the site uses Tailwind CSS classes. Full dynamic color support will require additional configuration.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withConvexProvider(SettingsEditorInner);
