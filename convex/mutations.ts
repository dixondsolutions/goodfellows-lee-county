import { mutation } from "./_generated/server";
import { v } from "convex/values";

// ============ BOARD MEMBERS ============

export const createBoardMember = mutation({
    args: {
        name: v.string(),
        role: v.string(),
        photoUrl: v.optional(v.string()),
        photoStorageId: v.optional(v.id("_storage")),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("boardMembers", {
            ...args,
            isActive: true,
        });
    },
});

export const updateBoardMember = mutation({
    args: {
        id: v.id("boardMembers"),
        name: v.optional(v.string()),
        role: v.optional(v.string()),
        photoUrl: v.optional(v.string()),
        photoStorageId: v.optional(v.id("_storage")),
        order: v.optional(v.number()),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const filtered = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined)
        );
        await ctx.db.patch(id, filtered);
        return id;
    },
});

export const deleteBoardMember = mutation({
    args: { id: v.id("boardMembers") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// ============ PROGRAMS ============

export const createProgram = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        icon: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("programs", {
            ...args,
            isActive: true,
        });
    },
});

export const updateProgram = mutation({
    args: {
        id: v.id("programs"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        icon: v.optional(v.string()),
        order: v.optional(v.number()),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const filtered = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined)
        );
        await ctx.db.patch(id, filtered);
        return id;
    },
});

export const deleteProgram = mutation({
    args: { id: v.id("programs") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// ============ SITE SETTINGS ============

export const updateSiteSetting = mutation({
    args: {
        key: v.string(),
        value: v.string(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("siteSettings")
            .withIndex("by_key", (q) => q.eq("key", args.key))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                value: args.value,
                updatedAt: Date.now(),
            });
            return existing._id;
        } else {
            return await ctx.db.insert("siteSettings", {
                key: args.key,
                value: args.value,
                updatedAt: Date.now(),
            });
        }
    },
});

// ============ DONATIONS ============

export const createDonation = mutation({
    args: {
        amount: v.number(),
        firstName: v.string(),
        lastName: v.optional(v.string()),
        email: v.string(),
        company: v.optional(v.string()),
        comment: v.optional(v.string()),
        isAnonymous: v.boolean(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("donations", {
            ...args,
            status: "pending",
            createdAt: Date.now(),
        });
    },
});

export const updateDonationStatus = mutation({
    args: {
        id: v.id("donations"),
        status: v.union(
            v.literal("pending"),
            v.literal("completed"),
            v.literal("failed")
        ),
        stripeSessionId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
        return id;
    },
});

// ============ VOLUNTEERS ============

export const createVolunteer = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        message: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("volunteers", {
            ...args,
            status: "new",
            createdAt: Date.now(),
        });
    },
});

export const updateVolunteerStatus = mutation({
    args: {
        id: v.id("volunteers"),
        status: v.union(
            v.literal("new"),
            v.literal("contacted"),
            v.literal("active")
        ),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
        return args.id;
    },
});

// ============ APPLICATIONS ============

export const createApplication = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        address: v.optional(v.string()),
        city: v.optional(v.string()),
        state: v.optional(v.string()),
        zip: v.optional(v.string()),
        householdSize: v.optional(v.number()),
        childrenCount: v.optional(v.number()),
        childrenAges: v.optional(v.string()),
        needDescription: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const now = new Date();
        return await ctx.db.insert("applications", {
            ...args,
            status: "submitted",
            year: now.getFullYear(),
            createdAt: Date.now(),
        });
    },
});

export const updateApplicationStatus = mutation({
    args: {
        id: v.id("applications"),
        status: v.union(
            v.literal("submitted"),
            v.literal("under_review"),
            v.literal("approved"),
            v.literal("denied")
        ),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
        return args.id;
    },
});

// ============ CONTENT SECTIONS ============

export const upsertContentSection = mutation({
    args: {
        id: v.optional(v.id("contentSections")),
        page: v.string(),
        sectionType: v.union(
            v.literal("hero"),
            v.literal("text"),
            v.literal("programs"),
            v.literal("board"),
            v.literal("donation"),
            v.literal("contact")
        ),
        title: v.optional(v.string()),
        subtitle: v.optional(v.string()),
        content: v.optional(v.string()),
        buttonText: v.optional(v.string()),
        buttonLink: v.optional(v.string()),
        order: v.number(),
        isActive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;

        if (id) {
            await ctx.db.patch(id, data);
            return id;
        } else {
            return await ctx.db.insert("contentSections", data);
        }
    },
});

export const deleteContentSection = mutation({
    args: { id: v.id("contentSections") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

// ============ CONTACT MESSAGES ============

export const createContactMessage = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("contactMessages", {
            ...args,
            createdAt: Date.now(),
        });
    },
});
