import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const DOG_BREEDS = [
  {
    name: "Golden Retriever",
    origin: "Scotland",
    temperament: ["Friendly", "Intelligent", "Devoted"],
    lifespan: "10-12 years",
    weight: "25-34 kg",
    height: "51-61 cm",
    group: "Sporting",
    description: "The Golden Retriever is one of the most popular dog breeds in the world, known for their friendly, tolerant attitude. They make excellent family pets and are highly trainable.",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600",
    funFact: "Golden Retrievers have a 'soft mouth' and can carry a raw egg without breaking it!",
    exerciseLevel: "High",
    groomingNeeds: "Moderate",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "German Shepherd",
    origin: "Germany",
    temperament: ["Loyal", "Courageous", "Confident"],
    lifespan: "9-13 years",
    weight: "22-40 kg",
    height: "55-65 cm",
    group: "Herding",
    description: "German Shepherds are highly versatile working dogs, excelling in police and military roles, search and rescue, and as service dogs. They are devoted companions.",
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600",
    funFact: "A German Shepherd named Rin Tin Tin was a famous movie star in the 1920s!",
    exerciseLevel: "High",
    groomingNeeds: "Moderate",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "French Bulldog",
    origin: "France",
    temperament: ["Playful", "Adaptable", "Smart"],
    lifespan: "10-12 years",
    weight: "8-14 kg",
    height: "27-33 cm",
    group: "Non-Sporting",
    description: "French Bulldogs are charming, adaptable companions with their iconic bat ears. They're perfect for apartment living and love being the center of attention.",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600",
    funFact: "Frenchies can't swim well due to their body structure and top-heavy build!",
    exerciseLevel: "Low",
    groomingNeeds: "Low",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "Siberian Husky",
    origin: "Russia",
    temperament: ["Outgoing", "Mischievous", "Loyal"],
    lifespan: "12-14 years",
    weight: "16-27 kg",
    height: "50-60 cm",
    group: "Working",
    description: "Siberian Huskies are stunning Arctic dogs bred for endurance. With their striking eyes and wolf-like appearance, they're natural athletes who love to run.",
    imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600",
    funFact: "Huskies can have two different colored eyes, a condition called heterochromia!",
    exerciseLevel: "Very High",
    groomingNeeds: "High",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "Labrador Retriever",
    origin: "Canada",
    temperament: ["Friendly", "Active", "Outgoing"],
    lifespan: "10-12 years",
    weight: "25-36 kg",
    height: "55-62 cm",
    group: "Sporting",
    description: "Labs are America's most popular breed for good reason. These friendly, high-energy dogs make excellent family pets and are eager to please.",
    imageUrl: "https://images.unsplash.com/photo-1579213838058-80a9b82e7779?w=600",
    funFact: "Labs have webbed toes, making them excellent swimmers!",
    exerciseLevel: "High",
    groomingNeeds: "Low",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "Shiba Inu",
    origin: "Japan",
    temperament: ["Alert", "Active", "Attentive"],
    lifespan: "13-16 years",
    weight: "8-11 kg",
    height: "33-43 cm",
    group: "Non-Sporting",
    description: "The Shiba Inu is Japan's most popular companion dog. With their fox-like appearance and spirited personality, they're independent yet devoted.",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600",
    funFact: "Shibas are known for the 'Shiba scream' - a unique vocalization when excited or unhappy!",
    exerciseLevel: "Moderate",
    groomingNeeds: "Moderate",
    goodWithKids: true,
    goodWithPets: false,
    rarity: "Uncommon",
  },
  {
    name: "Corgi",
    origin: "Wales",
    temperament: ["Affectionate", "Smart", "Alert"],
    lifespan: "12-13 years",
    weight: "10-14 kg",
    height: "25-30 cm",
    group: "Herding",
    description: "Pembroke Welsh Corgis are small but mighty herding dogs. Their adorable appearance belies their athletic nature and sharp intelligence.",
    imageUrl: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=600",
    funFact: "Queen Elizabeth II owned more than 30 Corgis during her reign!",
    exerciseLevel: "Moderate",
    groomingNeeds: "Moderate",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "Pomeranian",
    origin: "Germany/Poland",
    temperament: ["Lively", "Bold", "Inquisitive"],
    lifespan: "12-16 years",
    weight: "1.4-3 kg",
    height: "18-24 cm",
    group: "Toy",
    description: "Pomeranians are tiny dogs with big personalities. These fluffy companions are alert, intelligent, and love to be pampered.",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
    funFact: "Two Pomeranians survived the Titanic sinking by being smuggled onto lifeboats!",
    exerciseLevel: "Low",
    groomingNeeds: "High",
    goodWithKids: false,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "Border Collie",
    origin: "Scotland",
    temperament: ["Energetic", "Intelligent", "Alert"],
    lifespan: "12-15 years",
    weight: "14-20 kg",
    height: "46-56 cm",
    group: "Herding",
    description: "Border Collies are considered the most intelligent dog breed. These incredible athletes excel at agility, herding, and any task requiring mental prowess.",
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600",
    funFact: "A Border Collie named Chaser learned the names of over 1,000 objects!",
    exerciseLevel: "Very High",
    groomingNeeds: "Moderate",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "Dachshund",
    origin: "Germany",
    temperament: ["Clever", "Stubborn", "Devoted"],
    lifespan: "12-16 years",
    weight: "7-15 kg",
    height: "20-23 cm",
    group: "Hound",
    description: "The 'sausage dog' is a fearless, curious breed originally bred for hunting badgers. Their unique shape and spunky personality make them unforgettable.",
    imageUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?w=600",
    funFact: "Despite their short legs, Dachshunds were bred to hunt fierce badgers underground!",
    exerciseLevel: "Moderate",
    groomingNeeds: "Low",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "Akita",
    origin: "Japan",
    temperament: ["Dignified", "Courageous", "Loyal"],
    lifespan: "10-13 years",
    weight: "32-45 kg",
    height: "61-71 cm",
    group: "Working",
    description: "The Akita is a powerful, noble breed from Japan. These majestic dogs are fiercely loyal to their families and naturally protective.",
    imageUrl: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=600",
    funFact: "Hachiko, the world's most loyal dog, was an Akita who waited 9 years for his deceased owner!",
    exerciseLevel: "Moderate",
    groomingNeeds: "High",
    goodWithKids: false,
    goodWithPets: false,
    rarity: "Uncommon",
  },
  {
    name: "Samoyed",
    origin: "Russia",
    temperament: ["Friendly", "Gentle", "Adaptable"],
    lifespan: "12-14 years",
    weight: "16-30 kg",
    height: "48-60 cm",
    group: "Working",
    description: "The Samoyed is known for its beautiful white coat and iconic 'Sammy smile.' These fluffy Arctic dogs are gentle, friendly, and love human company.",
    imageUrl: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=600",
    funFact: "Samoyeds sleep on their owners to keep them warm in freezing temperatures!",
    exerciseLevel: "High",
    groomingNeeds: "Very High",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Uncommon",
  },
  {
    name: "Australian Shepherd",
    origin: "United States",
    temperament: ["Smart", "Work-oriented", "Exuberant"],
    lifespan: "12-15 years",
    weight: "18-29 kg",
    height: "46-58 cm",
    group: "Herding",
    description: "Despite the name, Australian Shepherds were developed in America. These beautiful, intelligent dogs excel at herding and dog sports.",
    imageUrl: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600",
    funFact: "Aussies often have striking heterochromia or marbled eyes called 'split eyes'!",
    exerciseLevel: "Very High",
    groomingNeeds: "Moderate",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
  {
    name: "Great Dane",
    origin: "Germany",
    temperament: ["Friendly", "Patient", "Dependable"],
    lifespan: "7-10 years",
    weight: "50-79 kg",
    height: "71-86 cm",
    group: "Working",
    description: "Great Danes are gentle giants, combining power and elegance. Despite their intimidating size, they're friendly, patient, and surprisingly good apartment dogs.",
    imageUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600",
    funFact: "A Great Dane named Zeus holds the record for world's tallest dog at 111.8 cm!",
    exerciseLevel: "Moderate",
    groomingNeeds: "Low",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Uncommon",
  },
  {
    name: "Bernese Mountain Dog",
    origin: "Switzerland",
    temperament: ["Good-natured", "Calm", "Strong"],
    lifespan: "7-10 years",
    weight: "36-50 kg",
    height: "58-70 cm",
    group: "Working",
    description: "Berners are large, beautiful Swiss farm dogs with distinctive tri-colored coats. They're gentle, affectionate, and excellent with families.",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
    funFact: "Bernese Mountain Dogs were used to pull carts in Swiss alpine villages!",
    exerciseLevel: "Moderate",
    groomingNeeds: "High",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Uncommon",
  },
  {
    name: "Cavalier King Charles Spaniel",
    origin: "England",
    temperament: ["Affectionate", "Graceful", "Gentle"],
    lifespan: "12-15 years",
    weight: "5-8 kg",
    height: "30-33 cm",
    group: "Toy",
    description: "These elegant toy spaniels are the epitome of lap dogs. They combine the gentle nature of a toy breed with the athleticism of a sporting spaniel.",
    imageUrl: "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=600",
    funFact: "King Charles II was so devoted to his spaniels that they were allowed in Parliament!",
    exerciseLevel: "Low",
    groomingNeeds: "Moderate",
    goodWithKids: true,
    goodWithPets: true,
    rarity: "Common",
  },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("dogBreeds").first();
    if (existing) return "Already seeded";

    for (const breed of DOG_BREEDS) {
      await ctx.db.insert("dogBreeds", {
        ...breed,
        createdAt: Date.now(),
      });
    }
    return "Seeded " + DOG_BREEDS.length + " breeds";
  },
});

export const list = query({
  args: {
    group: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.searchQuery && args.searchQuery.length > 0) {
      const results = await ctx.db
        .query("dogBreeds")
        .withSearchIndex("search_name", (q) => q.search("name", args.searchQuery!))
        .collect();
      return results;
    }

    if (args.group && args.group !== "All") {
      return await ctx.db
        .query("dogBreeds")
        .withIndex("by_group", (q) => q.eq("group", args.group!))
        .collect();
    }

    return await ctx.db.query("dogBreeds").collect();
  },
});

export const get = query({
  args: { id: v.id("dogBreeds") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getGroups = query({
  args: {},
  handler: async (ctx) => {
    const breeds = await ctx.db.query("dogBreeds").collect();
    const groups = [...new Set(breeds.map((b) => b.group))];
    return ["All", ...groups.sort()];
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const breeds = await ctx.db.query("dogBreeds").collect();

    let discovered = 0;
    let favorites = 0;

    if (userId) {
      const userDiscoveries = await ctx.db
        .query("discoveries")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .collect();
      discovered = userDiscoveries.length;

      const userFavorites = await ctx.db
        .query("favorites")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .collect();
      favorites = userFavorites.length;
    }

    return {
      total: breeds.length,
      discovered,
      favorites,
    };
  },
});
