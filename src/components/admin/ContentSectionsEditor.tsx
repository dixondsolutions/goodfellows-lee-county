import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { withConvexProvider } from "../../lib/convex";
import { useState } from "react";
import type { Id } from "../../../convex/_generated/dataModel";

type SectionType = "hero" | "text" | "programs" | "board" | "donation" | "contact";

interface ContentSection {
    _id: Id<"contentSections">;
    page: string;
    sectionType: SectionType;
    title?: string;
    subtitle?: string;
    content?: string;
    buttonText?: string;
    buttonLink?: string;
    order: number;
    isActive: boolean;
}

const PAGES = ["home", "apply", "volunteers", "contact"] as const;
const SECTION_TYPES: { value: SectionType; label: string }[] = [
    { value: "hero", label: "Hero Section" },
    { value: "text", label: "Text Block" },
    { value: "programs", label: "Programs" },
    { value: "board", label: "Board Members" },
    { value: "donation", label: "Donation" },
    { value: "contact", label: "Contact" },
];

function ContentSectionsEditorInner() {
    const [selectedPage, setSelectedPage] = useState<string>("home");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
    const [formData, setFormData] = useState({
        page: "home",
        sectionType: "text" as SectionType,
        title: "",
        subtitle: "",
        content: "",
        buttonText: "",
        buttonLink: "",
        order: 1,
        isActive: true,
    });

    const sections = useQuery(api.queries.getAllContentSections, {
        page: selectedPage,
    });
    const upsertSection = useMutation(api.mutations.upsertContentSection);
    const deleteSection = useMutation(api.mutations.deleteContentSection);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await upsertSection({
            id: editingSection?._id,
            page: formData.page,
            sectionType: formData.sectionType,
            title: formData.title || undefined,
            subtitle: formData.subtitle || undefined,
            content: formData.content || undefined,
            buttonText: formData.buttonText || undefined,
            buttonLink: formData.buttonLink || undefined,
            order: formData.order,
            isActive: formData.isActive,
        });
        setIsModalOpen(false);
        setEditingSection(null);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            page: selectedPage,
            sectionType: "text",
            title: "",
            subtitle: "",
            content: "",
            buttonText: "",
            buttonLink: "",
            order: (sections?.length ?? 0) + 1,
            isActive: true,
        });
    };

    const handleEdit = (section: ContentSection) => {
        setEditingSection(section);
        setFormData({
            page: section.page,
            sectionType: section.sectionType,
            title: section.title || "",
            subtitle: section.subtitle || "",
            content: section.content || "",
            buttonText: section.buttonText || "",
            buttonLink: section.buttonLink || "",
            order: section.order,
            isActive: section.isActive,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: Id<"contentSections">) => {
        if (confirm("Are you sure you want to delete this content section?")) {
            await deleteSection({ id });
        }
    };

    const handleAddNew = () => {
        setEditingSection(null);
        resetForm();
        setFormData((prev) => ({ ...prev, page: selectedPage }));
        setIsModalOpen(true);
    };

    if (!sections) {
        return (
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Content Sections</h1>
                    <p className="text-gray-600 mt-1">Manage page content</p>
                </div>
                <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading content...</p>
                </div>
            </div>
        );
    }

    const sortedSections = [...sections].sort((a, b) => a.order - b.order);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Content Sections</h1>
                    <p className="text-gray-600 mt-1">Manage page content blocks</p>
                </div>
                <button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
                    <i data-lucide="plus" className="w-5 h-5"></i>
                    Add Section
                </button>
            </div>

            {/* Page Tabs */}
            <div className="flex gap-2 mb-6 border-b">
                {PAGES.map((page) => (
                    <button
                        key={page}
                        onClick={() => setSelectedPage(page)}
                        className={`px-4 py-2 font-medium capitalize transition-colors ${
                            selectedPage === page
                                ? "text-primary-600 border-b-2 border-primary-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Sections List */}
            <div className="space-y-4">
                {sortedSections.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <i data-lucide="layout" className="w-12 h-12 text-gray-300 mx-auto mb-4"></i>
                        <p className="text-gray-500">No content sections for this page</p>
                        <button
                            onClick={handleAddNew}
                            className="mt-4 text-primary-600 hover:underline"
                        >
                            Add your first section
                        </button>
                    </div>
                ) : (
                    sortedSections.map((section) => (
                        <div
                            key={section._id}
                            className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${
                                !section.isActive ? "opacity-50" : ""
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                                            #{section.order}
                                        </span>
                                        <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded capitalize">
                                            {section.sectionType}
                                        </span>
                                        {!section.isActive && (
                                            <span className="text-xs font-medium px-2 py-1 bg-gray-200 text-gray-600 rounded">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {section.title || "(No title)"}
                                    </h3>
                                    {section.subtitle && (
                                        <p className="text-gray-600 mt-1">{section.subtitle}</p>
                                    )}
                                    {section.content && (
                                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                                            {section.content}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(section)}
                                        className="p-2 text-gray-400 hover:text-gray-600"
                                    >
                                        <i data-lucide="pencil" className="w-4 h-4"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(section._id)}
                                        className="p-2 text-gray-400 hover:text-red-600"
                                    >
                                        <i data-lucide="trash-2" className="w-4 h-4"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto py-8">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {editingSection ? "Edit Content Section" : "Add Content Section"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label>Page *</label>
                                    <select
                                        value={formData.page}
                                        onChange={(e) =>
                                            setFormData({ ...formData, page: e.target.value })
                                        }
                                        required
                                    >
                                        {PAGES.map((page) => (
                                            <option key={page} value={page}>
                                                {page.charAt(0).toUpperCase() + page.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Section Type *</label>
                                    <select
                                        value={formData.sectionType}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                sectionType: e.target.value as SectionType,
                                            })
                                        }
                                        required
                                    >
                                        {SECTION_TYPES.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    placeholder="Section title"
                                />
                            </div>

                            <div>
                                <label>Subtitle</label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subtitle: e.target.value })
                                    }
                                    placeholder="Optional subtitle"
                                />
                            </div>

                            <div>
                                <label>Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    rows={4}
                                    placeholder="Main content text"
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label>Button Text</label>
                                    <input
                                        type="text"
                                        value={formData.buttonText}
                                        onChange={(e) =>
                                            setFormData({ ...formData, buttonText: e.target.value })
                                        }
                                        placeholder="e.g., Learn More"
                                    />
                                </div>
                                <div>
                                    <label>Button Link</label>
                                    <input
                                        type="text"
                                        value={formData.buttonLink}
                                        onChange={(e) =>
                                            setFormData({ ...formData, buttonLink: e.target.value })
                                        }
                                        placeholder="e.g., /apply"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label>Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                order: parseInt(e.target.value) || 1,
                                            })
                                        }
                                        min="1"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isActive: e.target.checked })
                                        }
                                        className="w-5 h-5"
                                    />
                                    <label htmlFor="isActive" className="mb-0">
                                        Active (visible on site)
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingSection(null);
                                    }}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary flex-1">
                                    {editingSection ? "Update Section" : "Add Section"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withConvexProvider(ContentSectionsEditorInner);
