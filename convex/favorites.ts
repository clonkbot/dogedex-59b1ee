import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    const breeds = await Promise.all(
      favorites.map(async (fav) => {
        const breed = await ctx.db.get(fav.breedId);
        return breed ? { ...breed, favoriteId: fav._id } : null;
      })
    );

    return breeds.filter(Boolean);
  },
});

export const toggle = mutation({
  args: { breedId: v.id("dogBreeds") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_and_breed", (q) =>
        q.eq("userId", userId).eq("breedId", args.breedId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { added: false };
    } else {
      await ctx.db.insert("favorites", {
        userId,
        breedId: args.breedId,
        createdAt: Date.now(),
      });
      return { added: true };
    }
  },
});

export const isFavorite = query({
  args: { breedId: v.id("dogBreeds") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_and_breed", (q) =>
        q.eq("userId", userId).eq("breedId", args.breedId)
      )
      .first();

    return !!existing;
  },
});
