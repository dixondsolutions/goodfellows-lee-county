import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { withConvexProvider } from "../lib/convex";
import { useState } from "react";

function VolunteerFormInner() {
    const createVolunteer = useMutation(api.mutations.createVolunteer);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            await createVolunteer({
                firstName: formData.get("firstName") as string,
                lastName: formData.get("lastName") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string || undefined,
                message: formData.get("message") as string || undefined,
            });
            setIsSubmitted(true);
        } catch (err) {
            setError("There was an error submitting your application. Please try again.");
            console.error("Error submitting volunteer form:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">We've received your volunteer application and will be in touch soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required />
                </div>
            </div>

            <div>
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" required />
            </div>

            <div>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" />
            </div>

            <div>
                <label htmlFor="message">Tell us about yourself and how you'd like to help</label>
                <textarea id="message" name="message" rows={4}></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                    </>
                ) : (
                    <>
                        <i data-lucide="send" className="w-5 h-5"></i>
                        Submit Application
                    </>
                )}
            </button>
        </form>
    );
}

export default withConvexProvider(VolunteerFormInner);
