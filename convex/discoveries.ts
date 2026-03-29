import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const markDiscovered = mutation({
  args: { breedId: v.id("dogBreeds") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;

    const existing = await ctx.db
      .query("discoveries")
      .withIndex("by_user_and_breed", (q) =>
        q.eq("userId", userId).eq("breedId", args.breedId)
      )
      .first();

    if (!existing) {
      await ctx.db.insert("discoveries", {
        userId,
        breedId: args.breedId,
        discoveredAt: Date.now(),
      });
    }
  },
});

export const isDiscovered = query({
  args: { breedId: v.id("dogBreeds") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const existing = await ctx.db
      .query("discoveries")
      .withIndex("by_user_and_breed", (q) =>
        q.eq("userId", userId).eq("breedId", args.breedId)
      )
      .first();

    return !!existing;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("discoveries")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});
