import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { withConvexProvider } from "../lib/convex";

const donationAmounts = [25, 50, 100, 250];

function DonationSectionInner() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
    const [customAmount, setCustomAmount] = useState("");
    const [donorInfo, setDonorInfo] = useState({ name: "", email: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const createDonation = useMutation(api.mutations.createDonation);

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
                donorName: donorInfo.name || "Anonymous",
                donorEmail: donorInfo.email || undefined,
                isAnonymous: !donorInfo.name,
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                        <p className="text-gray-600">Your donation of ${getAmount().toFixed(2)} has been recorded.</p>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Donation</h2>
                        <p className="text-gray-600">Your support helps families in Lee County.</p>
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
                                    value={donorInfo.name}
                                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
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
