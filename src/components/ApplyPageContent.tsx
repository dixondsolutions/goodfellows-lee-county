import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { withConvexProvider } from "../lib/convex";
import ApplicationForm from "./ApplicationForm";

function ApplyPageContentInner() {
    const settings = useQuery(api.queries.getAllSiteSettings);

    // Hero section
    const heroBadge = settings?.applyHeroBadge || "2026 Applications";
    const heroTitle = settings?.applyHeroTitle || "Apply for Assistance";
    const heroSubtitle = settings?.applyHeroSubtitle || "If you're a Lee County resident in need of assistance, we're here to help. Applications for holiday assistance are accepted from September 1 through October 31.";
    const applicationStartDate = settings?.applicationStartDate || "September 1";
    const applicationEndDate = settings?.applicationEndDate || "October 31";
    const currentYear = settings?.currentYear || "2026";

    // Eligibility section
    const eligibilityTitle = settings?.applyEligibilityTitle || "Eligibility Requirements";
    const eligibility1 = settings?.applyEligibility1 || "Must be a resident of Lee County, Illinois";
    const eligibility2 = settings?.applyEligibility2 || "Have children 17 years old or younger in the household";
    const eligibility3 = settings?.applyEligibility3 || `Apply between ${applicationStartDate} - ${applicationEndDate}`;
    const eligibility4 = settings?.applyEligibility4 || "Demonstrate financial need";

    // Form section
    const formTitle = settings?.applyFormTitle || "Holiday Assistance Application";
    const pdfTitle = settings?.applyPdfTitle || "Prefer Paper?";
    const pdfText = settings?.applyPdfText || "You can also download a PDF application and mail it in or drop it off at our office.";

    const eligibilityItems = [eligibility1, eligibility2, eligibility3, eligibility4];

    return (
        <main className="pt-24">
            {/* Hero */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <span>{heroBadge}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {heroTitle.includes("Assistance") ? (
                                <>
                                    {heroTitle.split("Assistance")[0]}
                                    <span className="gradient-text">Assistance</span>
                                    {heroTitle.split("Assistance")[1]}
                                </>
                            ) : (
                                heroTitle
                            )}
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {heroSubtitle}
                        </p>

                        <div className="glass rounded-2xl p-6 max-w-xl mx-auto">
                            <div className="flex items-center gap-4 justify-center">
                                <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div className="text-left">
                                    <p className="text-sm text-gray-500">Application Period</p>
                                    <p className="text-lg font-bold text-gray-900">
                                        {applicationStartDate} - {applicationEndDate}, {currentYear}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eligibility */}
            <section className="section bg-white/50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                            {eligibilityTitle}
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {eligibilityItems.map((item, index) => (
                                <div key={index} className="card flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="section">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <div className="card">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                {formTitle}
                            </h2>

                            <ApplicationForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Download PDF */}
            <section className="section bg-gray-50">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {pdfTitle}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {pdfText}
                        </p>
                        <a
                            href="/application-form.pdf"
                            className="btn-secondary inline-flex items-center gap-2"
                            download
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF Application
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default withConvexProvider(ApplyPageContentInner);
