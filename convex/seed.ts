import { mutation } from "./_generated/server";

// Seed initial data for the Goodfellows website
export const seedData = mutation({
    args: {},
    handler: async (ctx) => {
        // Check if data already seeded
        const existingPrograms = await ctx.db.query("programs").first();
        if (existingPrograms) {
            return { message: "Data already seeded" };
        }

        // Seed Programs
        const programs = [
            {
                title: "Salvation Army",
                description: "Provide items to help those who have experienced loss due to a natural disaster, house-fire, or other acts of god.",
                icon: "heart-handshake",
                order: 1,
                isActive: true,
            },
            {
                title: "Shop with a Cop",
                description: "We work with Shop with a Cop or Sheriff to provide food vouchers and shopping opportunities for families during the holiday season.",
                icon: "gift",
                order: 2,
                isActive: true,
            },
            {
                title: "Men's & Women's Recovery House",
                description: "We ensure that those who are taking the steps towards self-improvement are provided for with clothes, furniture, and household items.",
                icon: "home",
                order: 3,
                isActive: true,
            },
        ];

        for (const program of programs) {
            await ctx.db.insert("programs", program);
        }

        // Seed Board Members
        const boardMembers = [
            { name: "Clara Harris", role: "President", order: 1, isActive: true },
            { name: "Mary Kathryn Stenzel", role: "Vice President", order: 2, isActive: true },
            { name: "Janet Bushman", role: "Secretary", order: 3, isActive: true },
            { name: "Linda Erisman", role: "Treasurer", order: 4, isActive: true },
        ];

        for (const member of boardMembers) {
            await ctx.db.insert("boardMembers", member);
        }

        // Seed Site Settings
        const settings = [
            { key: "organizationName", value: "Goodfellows of Lee County" },
            { key: "tagline", value: "108 years of helping those in need" },
            { key: "address", value: "704 S. Lincoln Ave" },
            { key: "email", value: "info@goodfellowsil.org" },
            { key: "phone", value: "" },
            { key: "applicationStartDate", value: "September 1" },
            { key: "applicationEndDate", value: "October 31" },
        ];

        for (const setting of settings) {
            await ctx.db.insert("siteSettings", {
                ...setting,
                updatedAt: Date.now(),
            });
        }

        // Seed Hero Content Section
        await ctx.db.insert("contentSections", {
            page: "home",
            sectionType: "hero",
            title: "What is the Goodfellows of Lee County?",
            subtitle: "We are an organization that has been around 108 years helping those who need a helping hand. Our main giveaway is during the holiday season, but we assist people all year.",
            buttonText: "Apply Now",
            buttonLink: "/apply",
            order: 1,
            isActive: true,
        });

        // Seed Why We Care Section
        await ctx.db.insert("contentSections", {
            page: "home",
            sectionType: "text",
            title: "Why We Care",
            content: "One thing we're taught at a young age is to treat others as you want to be treated. The Goodfellows of Lee County don't just follow this rule, they live it. Every year our volunteer board of directors along with community members work to make sure every child in Lee County is treated the same, that they too, regardless of income can have their own gift during the holiday season.\n\nWhether you're able to donate $2 or $1,000 dollars, every little bit will help to support our mission; providing and empowering the children of Lee County.",
            order: 4,
            isActive: true,
        });

        return { message: "Data seeded successfully" };
    },
});
