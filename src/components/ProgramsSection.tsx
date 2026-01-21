import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { withConvexProvider } from "../lib/convex";

const HeartIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const GiftIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
);

const HomeIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const iconMap: Record<string, React.FC> = {
    "heart-handshake": HeartIcon,
    "gift": GiftIcon,
    "home": HomeIcon,
    "heart": HeartIcon,
};

const defaultPrograms = [
    { _id: "1", title: "Salvation Army", description: "Provide items to help those who have experienced loss due to a natural disaster, house-fire, or other acts of god.", icon: "heart-handshake" },
    { _id: "2", title: "Shop with a Cop", description: "We work with Shop with a Cop or Sheriff to provide food vouchers and shopping opportunities for families.", icon: "gift" },
    { _id: "3", title: "Men's & Women's Recovery House", description: "We ensure those taking steps towards self-improvement are provided with clothes, furniture, and household items.", icon: "home" },
];

function ProgramsSectionInner() {
    const programs = useQuery(api.queries.getPrograms);
    const settings = useQuery(api.queries.getAllSiteSettings);
    const displayPrograms = programs ?? defaultPrograms;

    const sectionTitle = settings?.programsSectionTitle || "Our Programs";
    const sectionSubtitle = settings?.programsSectionSubtitle || "Throughout the year, the Goodfellows of Lee County supports various initiatives to help those in need.";

    return (
        <section className="section bg-white" id="programs">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {sectionTitle}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {sectionSubtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {displayPrograms.map((program) => {
                        const IconComponent = iconMap[program.icon] || HeartIcon;
                        return (
                            <div key={program._id} className="card">
                                <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center mb-4">
                                    <IconComponent />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                                <p className="text-gray-600">{program.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default withConvexProvider(ProgramsSectionInner);
