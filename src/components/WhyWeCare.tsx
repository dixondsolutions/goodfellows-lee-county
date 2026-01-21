import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { withConvexProvider } from "../lib/convex";

function WhyWeCareInner() {
    const settings = useQuery(api.queries.getAllSiteSettings);

    const defaultContent = `One thing we're taught at a young age is to treat others as you want to be treated. The Goodfellows of Lee County don't just follow this rule, they live it.

Every year our volunteer board of directors along with community members work to make sure every child in Lee County is treated the same — that they too, regardless of income, can have their own gift during the holiday season.`;

    const content = settings?.whyWeCareContent || defaultContent;

    return (
        <section className="section bg-amber-500">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center">
                    <svg className="w-12 h-12 text-white mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>

                    <h2 className="text-3xl font-bold text-white mb-6">
                        Why We Care
                    </h2>

                    <div className="text-white/90 text-lg leading-relaxed mb-8">
                        {content.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl p-6 max-w-xl mx-auto">
                        <p className="text-gray-700">
                            Whether you donate <span className="font-bold text-amber-600">$2</span> or{" "}
                            <span className="font-bold text-amber-600">$1,000</span>, every bit helps.
                        </p>
                        <p className="text-xl font-bold text-amber-600 mt-2">
                            Empowering the children of Lee County
                        </p>
                    </div>

                    <a
                        href="#donate"
                        className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold mt-8 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Make a Difference Today
                    </a>
                </div>
            </div>
        </section>
    );
}

export default withConvexProvider(WhyWeCareInner);
