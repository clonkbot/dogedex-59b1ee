import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  dogBreeds: defineTable({
    name: v.string(),
    origin: v.string(),
    temperament: v.array(v.string()),
    lifespan: v.string(),
    weight: v.string(),
    height: v.string(),
    group: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    funFact: v.string(),
    exerciseLevel: v.string(),
    groomingNeeds: v.string(),
    goodWithKids: v.boolean(),
    goodWithPets: v.boolean(),
    rarity: v.string(),
    createdAt: v.number(),
  }).index("by_group", ["group"])
    .index("by_name", ["name"])
    .searchIndex("search_name", { searchField: "name" }),

  favorites: defineTable({
    userId: v.id("users"),
    breedId: v.id("dogBreeds"),
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_and_breed", ["userId", "breedId"]),

  discoveries: defineTable({
    userId: v.id("users"),
    breedId: v.id("dogBreeds"),
    discoveredAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_and_breed", ["userId", "breedId"]),
});
