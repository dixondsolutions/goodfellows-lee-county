import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";
import { useState, useEffect } from "react";

type TabKey = "general" | "home" | "apply" | "volunteers" | "contact" | "donation";

const TABS: { key: TabKey; label: string; icon: string }[] = [
    { key: "general", label: "General", icon: "settings" },
    { key: "home", label: "Home Page", icon: "home" },
    { key: "apply", label: "Apply Page", icon: "clipboard-list" },
    { key: "volunteers", label: "Volunteers Page", icon: "users" },
    { key: "contact", label: "Contact Page", icon: "mail" },
    { key: "donation", label: "Donation Section", icon: "heart" },
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
        tagline: "108 years of helping those in need",
        email: "info@goodfellowsil.org",
        phone: "",
        address: "704 S. Lincoln Ave",
        city: "Dixon",
        state: "IL",
        zip: "61021",
        applicationStartDate: "September 1",
        applicationEndDate: "October 31",
        currentYear: "2026",

        // Home - Hero
        heroTitle: "What is the Goodfellows of Lee County?",
        heroSubtitle: "We are an organization that has been around 108 years helping those who need a helping hand. Our main giveaway is during the holiday season, but we assist people all year.",
        heroBadge: "Serving Lee County Since 1918",
        heroButtonText: "Apply Now",
        heroButtonLink: "/apply",
        heroStat1Value: "108+",
        heroStat1Label: "Years of Service",
        heroStat2Value: "1000+",
        heroStat2Label: "Families Helped",
        heroStat3Value: "100%",
        heroStat3Label: "Volunteer Run",

        // Home - Programs Section
        programsSectionTitle: "Our Programs",
        programsSectionSubtitle: "Throughout the year, the Goodfellows of Lee County supports various initiatives to help those in need.",

        // Home - Why We Care
        whyWeCareTitle: "Why We Care",
        whyWeCareContent: `One thing we're taught at a young age is to treat others as you want to be treated. The Goodfellows of Lee County don't just follow this rule, they live it.

Every year our volunteer board of directors along with community members work to make sure every child in Lee County is treated the same — that they too, regardless of income, can have their own gift during the holiday season.`,
        whyWeCareHighlight: "Whether you donate $2 or $1,000, every bit helps.",
        whyWeCareTagline: "Empowering the children of Lee County",

        // Home - Board Section
        boardSectionTitle: "Our Board",
        boardSectionSubtitle: "Meet the dedicated volunteers who make our mission possible.",

        // Apply Page
        applyHeroTitle: "Apply for Assistance",
        applyHeroBadge: "2026 Applications",
        applyHeroSubtitle: "If you're a Lee County resident in need of assistance, we're here to help. Applications for holiday assistance are accepted from September 1 through October 31.",
        applyEligibilityTitle: "Eligibility Requirements",
        applyEligibility1: "Must be a resident of Lee County, Illinois",
        applyEligibility2: "Have children 17 years old or younger in the household",
        applyEligibility3: "Apply between September 1 - October 31",
        applyEligibility4: "Demonstrate financial need",
        applyFormTitle: "Holiday Assistance Application",
        applyPdfText: "You can also download a PDF application and mail it in or drop it off at our office.",

        // Volunteers Page
        volunteersHeroTitle: "Become a Volunteer",
        volunteersHeroBadge: "Join Our Team",
        volunteersHeroSubtitle: "The Goodfellows of Lee County is 100% volunteer-run. Every hour you contribute helps ensure that children in our community have a brighter holiday season.",
        volunteersWaysTitle: "Ways to Help",
        volunteersWay1Title: "Holiday Distribution",
        volunteersWay1Description: "Help sort, wrap, and distribute gifts during our annual holiday giveaway event.",
        volunteersWay2Title: "Application Processing",
        volunteersWay2Description: "Assist with reviewing and processing applications from families in need.",
        volunteersWay3Title: "Community Outreach",
        volunteersWay3Description: "Help spread the word about our programs and fundraising efforts throughout the year.",
        volunteersFormTitle: "Sign Up to Volunteer",
        volunteersFormNote: "We'll reach out to you within 2-3 business days to discuss volunteer opportunities.",

        // Contact Page
        contactHeroTitle: "Contact Us",
        contactHeroBadge: "Get in Touch",
        contactHeroSubtitle: "Have questions about our programs, want to volunteer, or need assistance? We'd love to hear from you.",
        contactInfoTitle: "Contact Information",
        contactAboutTitle: "About Our Organization",
        contactAboutText: "Goodfellows of Lee County is an all-volunteer organization. As we don't have regular office hours, email is the best way to reach us. We typically respond within 1-2 business days.",
        contactFormTitle: "Send a Message",

        // Donation Section
        donationTitle: "Make a Donation",
        donationSubtitle: "Your support helps families in Lee County.",
        donationAmounts: "25,50,100,250",
        donationSuccessTitle: "Thank You!",
        donationSuccessMessage: "Your donation has been recorded. We truly appreciate your generosity.",
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

            setSavedMessage("All settings saved!");
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

    const renderInput = (key: string, label: string, type: "text" | "textarea" | "email" = "text", rows = 3) => (
        <div key={key}>
            <label>{label}</label>
            {type === "textarea" ? (
                <textarea
                    rows={rows}
                    value={formData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            ) : (
                <input
                    type={type}
                    value={formData[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                />
            )}
        </div>
    );

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
                    <p className="text-gray-600 mt-1">Configure all content for the public website</p>
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
                            {renderInput("tagline", "Tagline")}
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

            {/* Home Tab */}
            {activeTab === "home" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
                        <div className="space-y-4">
                            {renderInput("heroBadge", "Badge Text")}
                            {renderInput("heroTitle", "Title")}
                            {renderInput("heroSubtitle", "Subtitle", "textarea")}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {renderInput("heroButtonText", "Button Text")}
                                {renderInput("heroButtonLink", "Button Link")}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Stats</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="space-y-4">
                                {renderInput("heroStat1Value", "Stat 1 Value")}
                                {renderInput("heroStat1Label", "Stat 1 Label")}
                            </div>
                            <div className="space-y-4">
                                {renderInput("heroStat2Value", "Stat 2 Value")}
                                {renderInput("heroStat2Label", "Stat 2 Label")}
                            </div>
                            <div className="space-y-4">
                                {renderInput("heroStat3Value", "Stat 3 Value")}
                                {renderInput("heroStat3Label", "Stat 3 Label")}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Programs Section</h2>
                        <div className="space-y-4">
                            {renderInput("programsSectionTitle", "Title")}
                            {renderInput("programsSectionSubtitle", "Subtitle", "textarea", 2)}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Why We Care Section</h2>
                        <div className="space-y-4">
                            {renderInput("whyWeCareTitle", "Title")}
                            {renderInput("whyWeCareContent", "Content (use blank line for paragraphs)", "textarea", 5)}
                            {renderInput("whyWeCareHighlight", "Highlight Text")}
                            {renderInput("whyWeCareTagline", "Tagline")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Board Section</h2>
                        <div className="space-y-4">
                            {renderInput("boardSectionTitle", "Title")}
                            {renderInput("boardSectionSubtitle", "Subtitle", "textarea", 2)}
                        </div>
                    </div>
                </div>
            )}

            {/* Apply Tab */}
            {activeTab === "apply" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
                        <div className="space-y-4">
                            {renderInput("applyHeroBadge", "Badge Text")}
                            {renderInput("applyHeroTitle", "Title")}
                            {renderInput("applyHeroSubtitle", "Subtitle", "textarea")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Requirements</h2>
                        <div className="space-y-4">
                            {renderInput("applyEligibilityTitle", "Section Title")}
                            {renderInput("applyEligibility1", "Requirement 1")}
                            {renderInput("applyEligibility2", "Requirement 2")}
                            {renderInput("applyEligibility3", "Requirement 3")}
                            {renderInput("applyEligibility4", "Requirement 4")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Section</h2>
                        <div className="space-y-4">
                            {renderInput("applyFormTitle", "Form Title")}
                            {renderInput("applyPdfText", "PDF Download Text", "textarea", 2)}
                        </div>
                    </div>
                </div>
            )}

            {/* Volunteers Tab */}
            {activeTab === "volunteers" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
                        <div className="space-y-4">
                            {renderInput("volunteersHeroBadge", "Badge Text")}
                            {renderInput("volunteersHeroTitle", "Title")}
                            {renderInput("volunteersHeroSubtitle", "Subtitle", "textarea")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ways to Help</h2>
                        <div className="space-y-4">
                            {renderInput("volunteersWaysTitle", "Section Title")}
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium text-gray-700">Option 1</h3>
                                    {renderInput("volunteersWay1Title", "Title")}
                                    {renderInput("volunteersWay1Description", "Description", "textarea", 2)}
                                </div>
                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium text-gray-700">Option 2</h3>
                                    {renderInput("volunteersWay2Title", "Title")}
                                    {renderInput("volunteersWay2Description", "Description", "textarea", 2)}
                                </div>
                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium text-gray-700">Option 3</h3>
                                    {renderInput("volunteersWay3Title", "Title")}
                                    {renderInput("volunteersWay3Description", "Description", "textarea", 2)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Section</h2>
                        <div className="space-y-4">
                            {renderInput("volunteersFormTitle", "Form Title")}
                            {renderInput("volunteersFormNote", "Note Text", "textarea", 2)}
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
                        <div className="space-y-4">
                            {renderInput("contactHeroBadge", "Badge Text")}
                            {renderInput("contactHeroTitle", "Title")}
                            {renderInput("contactHeroSubtitle", "Subtitle", "textarea")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Info Card</h2>
                        <div className="space-y-4">
                            {renderInput("contactInfoTitle", "Info Section Title")}
                            {renderInput("contactAboutTitle", "About Section Title")}
                            {renderInput("contactAboutText", "About Section Text", "textarea")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Section</h2>
                        <div className="space-y-4">
                            {renderInput("contactFormTitle", "Form Title")}
                        </div>
                    </div>
                </div>
            )}

            {/* Donation Tab */}
            {activeTab === "donation" && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Section</h2>
                        <div className="space-y-4">
                            {renderInput("donationTitle", "Title")}
                            {renderInput("donationSubtitle", "Subtitle")}
                            {renderInput("donationAmounts", "Preset Amounts (comma-separated)")}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Success Message</h2>
                        <div className="space-y-4">
                            {renderInput("donationSuccessTitle", "Success Title")}
                            {renderInput("donationSuccessMessage", "Success Message", "textarea", 2)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withConvexProvider(SettingsEditorInner);
