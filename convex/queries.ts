import { query } from "./_generated/server";
import { v } from "convex/values";

// ============ BOARD MEMBERS ============

export const getBoardMembers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("boardMembers")
            .withIndex("by_order")
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();
    },
});

export const getAllBoardMembers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("boardMembers").withIndex("by_order").collect();
    },
});

// ============ PROGRAMS ============

export const getPrograms = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("programs")
            .withIndex("by_order")
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();
    },
});

export const getAllPrograms = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("programs").withIndex("by_order").collect();
    },
});

// ============ SITE SETTINGS ============

export const getSiteSetting = query({
    args: { key: v.string() },
    handler: async (ctx, args) => {
        const setting = await ctx.db
            .query("siteSettings")
            .withIndex("by_key", (q) => q.eq("key", args.key))
            .first();
        return setting?.value ?? null;
    },
});

export const getAllSiteSettings = query({
    args: {},
    handler: async (ctx) => {
        const settings = await ctx.db.query("siteSettings").collect();
        return Object.fromEntries(settings.map((s) => [s.key, s.value]));
    },
});

// ============ CONTENT SECTIONS ============

export const getPageSections = query({
    args: { page: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("contentSections")
            .withIndex("by_page", (q) => q.eq("page", args.page))
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();
    },
});

export const getAllContentSections = query({
    args: { page: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (args.page) {
            const page = args.page;
            return await ctx.db
                .query("contentSections")
                .withIndex("by_page", (q) => q.eq("page", page))
                .collect();
        }
        return await ctx.db.query("contentSections").collect();
    },
});

// ============ DONATIONS ============

export const getRecentDonations = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        const limit = args.limit ?? 10;
        return await ctx.db
            .query("donations")
            .withIndex("by_date")
            .order("desc")
            .filter((q) => q.eq(q.field("status"), "completed"))
            .take(limit);
    },
});

export const getDonationStats = query({
    args: {},
    handler: async (ctx) => {
        const allDonations = await ctx.db
            .query("donations")
            .filter((q) => q.eq(q.field("status"), "completed"))
            .collect();

        const total = allDonations.reduce((sum, d) => sum + d.amount, 0);
        const count = allDonations.length;

        return { total, count };
    },
});

// ============ VOLUNTEERS ============

export const getVolunteers = query({
    args: { status: v.optional(v.string()) },
    handler: async (ctx, args) => {
        let query = ctx.db.query("volunteers").withIndex("by_date").order("desc");

        if (args.status) {
            query = query.filter((q) => q.eq(q.field("status"), args.status));
        }

        return await query.collect();
    },
});

// ============ APPLICATIONS ============

export const getApplications = query({
    args: {
        year: v.optional(v.number()),
        status: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        let query = ctx.db.query("applications").withIndex("by_date").order("desc");

        if (args.year) {
            query = query.filter((q) => q.eq(q.field("year"), args.year));
        }
        if (args.status) {
            query = query.filter((q) => q.eq(q.field("status"), args.status));
        }

        return await query.collect();
    },
});

export const getApplicationStats = query({
    args: { year: v.number() },
    handler: async (ctx, args) => {
        const applications = await ctx.db
            .query("applications")
            .filter((q) => q.eq(q.field("year"), args.year))
            .collect();

        const total = applications.length;
        const byStatus = {
            submitted: applications.filter((a) => a.status === "submitted").length,
            under_review: applications.filter((a) => a.status === "under_review").length,
            approved: applications.filter((a) => a.status === "approved").length,
            denied: applications.filter((a) => a.status === "denied").length,
        };

        return { total, byStatus };
    },
});

// ============ CONTACT MESSAGES ============

export const getContactMessages = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        const limit = args.limit ?? 50;
        return await ctx.db
            .query("contactMessages")
            .withIndex("by_date")
            .order("desc")
            .take(limit);
    },
});

// ============ ALL DONATIONS (for admin) ============

export const getAllDonations = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        const limit = args.limit ?? 100;
        return await ctx.db
            .query("donations")
            .withIndex("by_date")
            .order("desc")
            .take(limit);
    },
});
