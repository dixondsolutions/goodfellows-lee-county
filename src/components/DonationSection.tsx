import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { withConvexProvider } from "../lib/convex";

const defaultAmounts = [25, 50, 100, 250];

function DonationSectionInner() {
    const settings = useQuery(api.queries.getAllSiteSettings);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
    const [customAmount, setCustomAmount] = useState("");
    const [donorInfo, setDonorInfo] = useState({ firstName: "", email: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const createDonation = useMutation(api.mutations.createDonation);

    // CMS Settings
    const title = settings?.donationTitle || "Make a Donation";
    const subtitle = settings?.donationSubtitle || "Your support helps families in Lee County.";
    const successTitle = settings?.donationSuccessTitle || "Thank You!";
    const successMessage = settings?.donationSuccessMessage || "Your donation has been recorded. We truly appreciate your generosity.";

    // Parse donation amounts from settings
    const donationAmounts = settings?.donationAmounts
        ? settings.donationAmounts.split(",").map((n: string) => parseInt(n.trim(), 10)).filter((n: number) => !isNaN(n))
        : defaultAmounts;

    const getAmount = () => {
        if (customAmount) return parseFloat(customAmount);
        return selectedAmount ?? 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const amount = getAmount();
        if (amount <= 0) return;

        setIsSubmitting(true);
        try {
            await createDonation({
                amount,
                firstName: donorInfo.firstName || "Anonymous",
                email: donorInfo.email || "anonymous@example.com",
                isAnonymous: !donorInfo.firstName,
            });
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section className="section bg-white" id="donate">
                <div className="container-custom">
                    <div className="max-w-md mx-auto text-center card">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{successTitle}</h2>
                        <p className="text-gray-600">{successMessage}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section bg-white" id="donate">
            <div className="container-custom">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                        <p className="text-gray-600">{subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="card">
                        {/* Amount Selection */}
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {donationAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    type="button"
                                    onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                                    className={`py-3 rounded-lg font-semibold transition-colors ${selectedAmount === amount && !customAmount
                                            ? "bg-amber-500 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    ${amount}
                                </button>
                            ))}
                        </div>

                        {/* Custom Amount */}
                        <div className="mb-6">
                            <label>Custom Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    value={customAmount}
                                    onChange={(e) => {
                                        setCustomAmount(e.target.value);
                                        setSelectedAmount(null);
                                    }}
                                    placeholder="Enter amount"
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        {/* Donor Info */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <label>Name (optional)</label>
                                <input
                                    type="text"
                                    value={donorInfo.firstName}
                                    onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })}
                                    placeholder="Anonymous"
                                />
                            </div>
                            <div>
                                <label>Email (optional)</label>
                                <input
                                    type="email"
                                    value={donorInfo.email}
                                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                                    placeholder="For receipt"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting || getAmount() <= 0}
                            className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                "Processing..."
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Donate ${getAmount() > 0 ? getAmount().toFixed(2) : "0.00"}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default withConvexProvider(DonationSectionInner);
