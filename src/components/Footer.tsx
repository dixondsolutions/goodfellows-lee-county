export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container-custom">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span className="font-bold">Goodfellows of Lee County</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Helping those in need since 1918. A 100% volunteer-run organization.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/" className="hover:text-white">Home</a></li>
                            <li><a href="/volunteers" className="hover:text-white">Volunteers</a></li>
                            <li><a href="/apply" className="hover:text-white">Apply for Help</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>704 S. Lincoln Ave</li>
                            <li>Dixon, IL 61021</li>
                            <li><a href="mailto:info@goodfellowsil.org" className="hover:text-white">info@goodfellowsil.org</a></li>
                        </ul>
                        <a href="/admin" className="text-xs text-gray-500 hover:text-gray-400 mt-4 inline-block">
                            Admin Login
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Goodfellows of Lee County. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
