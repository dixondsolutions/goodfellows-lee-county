import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";
import { useState, useEffect } from "react";

function SettingsEditorInner() {
    const settings = useQuery(api.queries.getAllSiteSettings);
    const updateSetting = useMutation(api.mutations.updateSiteSetting);

    const [formData, setFormData] = useState({
        organizationName: "",
        tagline: "",
        email: "",
        address: "",
        applicationStartDate: "",
        applicationEndDate: "",
        heroTitle: "",
        heroSubtitle: "",
        heroButtonText: "",
        heroButtonLink: "",
        whyWeCareContent: "",
    });

    const [isSaving, setIsSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState("");

    useEffect(() => {
        if (settings) {
            setFormData({
                organizationName: settings.organizationName || "Goodfellows of Lee County",
                tagline: settings.tagline || "108 years of helping those in need",
                email: settings.email || "info@goodfellowsil.org",
                address: settings.address || "704 S. Lincoln Ave",
                applicationStartDate: settings.applicationStartDate || "September 1",
                applicationEndDate: settings.applicationEndDate || "October 31",
                heroTitle: settings.heroTitle || "What is the Goodfellows of Lee County?",
                heroSubtitle: settings.heroSubtitle || "We are an organization that has been around 108 years helping those who need a helping hand.",
                heroButtonText: settings.heroButtonText || "Apply Now",
                heroButtonLink: settings.heroButtonLink || "/apply",
                whyWeCareContent: settings.whyWeCareContent || "",
            });
        }
    }, [settings]);

    const handleSave = async (section: string) => {
        setIsSaving(true);
        try {
            const updates: { key: string; value: string }[] = [];

            if (section === "general") {
                updates.push(
                    { key: "organizationName", value: formData.organizationName },
                    { key: "tagline", value: formData.tagline },
                    { key: "email", value: formData.email },
                    { key: "address", value: formData.address }
                );
            } else if (section === "application") {
                updates.push(
                    { key: "applicationStartDate", value: formData.applicationStartDate },
                    { key: "applicationEndDate", value: formData.applicationEndDate }
                );
            } else if (section === "hero") {
                updates.push(
                    { key: "heroTitle", value: formData.heroTitle },
                    { key: "heroSubtitle", value: formData.heroSubtitle },
                    { key: "heroButtonText", value: formData.heroButtonText },
                    { key: "heroButtonLink", value: formData.heroButtonLink }
                );
            } else if (section === "whyWeCare") {
                updates.push(
                    { key: "whyWeCareContent", value: formData.whyWeCareContent }
                );
            }

            for (const update of updates) {
                await updateSetting(update);
            }

            setSavedMessage("Settings saved!");
            setTimeout(() => setSavedMessage(""), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    if (!settings) {
        return <div className="p-8"><p>Loading...</p></div>;
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
                <p className="text-gray-600 mt-1">Configure content for the public website</p>
                {savedMessage && (
                    <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg inline-flex items-center gap-2">
                        <i data-lucide="check" className="w-4 h-4"></i>
                        {savedMessage}
                    </div>
                )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <i data-lucide="settings" className="w-5 h-5 text-gray-500"></i>
                        General Settings
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label>Organization Name</label>
                            <input
                                type="text"
                                value={formData.organizationName}
                                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Tagline</label>
                            <input
                                type="text"
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Contact Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <button
                            onClick={() => handleSave("general")}
                            disabled={isSaving}
                            className="btn-primary"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* Application Settings */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <i data-lucide="calendar" className="w-5 h-5 text-gray-500"></i>
                        Application Period
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label>Application Start Date</label>
                            <input
                                type="text"
                                value={formData.applicationStartDate}
                                onChange={(e) => setFormData({ ...formData, applicationStartDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Application End Date</label>
                            <input
                                type="text"
                                value={formData.applicationEndDate}
                                onChange={(e) => setFormData({ ...formData, applicationEndDate: e.target.value })}
                            />
                        </div>
                        <button
                            onClick={() => handleSave("application")}
                            disabled={isSaving}
                            className="btn-primary"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* Homepage Hero Content */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <i data-lucide="layout" className="w-5 h-5 text-gray-500"></i>
                        Homepage Hero Section
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label>Hero Title</label>
                            <input
                                type="text"
                                value={formData.heroTitle}
                                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Hero Subtitle</label>
                            <textarea
                                rows={3}
                                value={formData.heroSubtitle}
                                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                            />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label>Primary Button Text</label>
                                <input
                                    type="text"
                                    value={formData.heroButtonText}
                                    onChange={(e) => setFormData({ ...formData, heroButtonText: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Primary Button Link</label>
                                <input
                                    type="text"
                                    value={formData.heroButtonLink}
                                    onChange={(e) => setFormData({ ...formData, heroButtonLink: e.target.value })}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => handleSave("hero")}
                            disabled={isSaving}
                            className="btn-primary"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

                {/* Why We Care Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <i data-lucide="heart" className="w-5 h-5 text-gray-500"></i>
                        "Why We Care" Section
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label>Content (supports multiple paragraphs)</label>
                            <textarea
                                rows={5}
                                value={formData.whyWeCareContent}
                                onChange={(e) => setFormData({ ...formData, whyWeCareContent: e.target.value })}
                                placeholder="Enter the content for the Why We Care section..."
                            />
                        </div>
                        <button
                            onClick={() => handleSave("whyWeCare")}
                            disabled={isSaving}
                            className="btn-primary"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withConvexProvider(SettingsEditorInner);
