import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// CMS Schema for Goodfellows of Lee County
export default defineSchema({
  // Board Members - displayed on homepage
  boardMembers: defineTable({
    name: v.string(),
    role: v.string(),
    photoUrl: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  // Programs - Salvation Army, Shop with a Cop, Recovery House, etc.
  programs: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.string(), // Icon name (e.g., "heart", "gift", "home")
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_order", ["order"]),

  // Site Settings - key-value store for global settings
  siteSettings: defineTable({
    key: v.string(),
    value: v.string(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  // Donations - track donation submissions
  donations: defineTable({
    amount: v.number(),
    firstName: v.string(),
    lastName: v.optional(v.string()),
    email: v.string(),
    company: v.optional(v.string()),
    comment: v.optional(v.string()),
    isAnonymous: v.boolean(),
    stripeSessionId: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
    createdAt: v.number(),
  }).index("by_status", ["status"]).index("by_date", ["createdAt"]),

  // Content Sections - flexible content blocks for pages
  contentSections: defineTable({
    page: v.string(), // "home", "volunteers", "about"
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
  }).index("by_page", ["page", "order"]),

  // Volunteers - volunteer signup submissions
  volunteers: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("active")
    ),
    createdAt: v.number(),
  }).index("by_status", ["status"]).index("by_date", ["createdAt"]),

  // Application submissions
  applications: defineTable({
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
    status: v.union(
      v.literal("submitted"),
      v.literal("under_review"),
      v.literal("approved"),
      v.literal("denied")
    ),
    year: v.number(),
    createdAt: v.number(),
  }).index("by_status", ["status"]).index("by_year", ["year"]).index("by_date", ["createdAt"]),

  // Contact Messages
  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_date", ["createdAt"]),
});
