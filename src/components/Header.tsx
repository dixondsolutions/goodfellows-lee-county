import { useState, useEffect } from "react";

interface HeaderProps {
    currentPath?: string;
}

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/volunteers", label: "Volunteers" },
    { href: "/apply", label: "Apply" },
    { href: "/contact", label: "Contact" },
];

export default function Header({ currentPath = "/" }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="container-custom">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900">Goodfellows</span>
                            <span className="text-xs text-gray-500 block -mt-1">of Lee County</span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${currentPath === link.href
                                        ? "text-amber-600"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <a href="#donate" className="hidden md:inline-flex btn-primary text-sm py-2 px-4">
                            Donate Now
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block py-2 text-gray-600 hover:text-gray-900"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a href="#donate" className="btn-primary mt-4 block text-center">
                            Donate Now
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
}
