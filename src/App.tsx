import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../convex/_generated/api";
import { useState, useEffect } from "react";
import { Id } from "../convex/_generated/dataModel";

type DogBreed = {
  _id: Id<"dogBreeds">;
  name: string;
  origin: string;
  temperament: string[];
  lifespan: string;
  weight: string;
  height: string;
  group: string;
  description: string;
  imageUrl: string;
  funFact: string;
  exerciseLevel: string;
  groomingNeeds: string;
  goodWithKids: boolean;
  goodWithPets: boolean;
  rarity: string;
};

function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const seed = useMutation(api.breeds.seed);

  useEffect(() => {
    if (isAuthenticated) {
      seed();
    }
  }, [isAuthenticated, seed]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <MainApp />;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-amber-200 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 animate-bounce flex items-center justify-center">
            <span className="text-4xl">🐕</span>
          </div>
        </div>
        <p className="font-serif text-xl text-amber-800 tracking-wide animate-pulse">Loading Dogédex...</p>
      </div>
    </div>
  );
}

function AuthScreen() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await signIn("password", formData);
    } catch {
      setError(flow === "signIn" ? "Invalid credentials" : "Could not create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">🐕</div>
        <div className="absolute top-1/4 right-20 text-5xl opacity-10 animate-float-delayed">🦴</div>
        <div className="absolute bottom-1/3 left-1/4 text-4xl opacity-10 animate-float">🐾</div>
        <div className="absolute bottom-20 right-1/3 text-5xl opacity-10 animate-float-delayed">🐶</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 shadow-2xl mb-6 transform hover:scale-110 transition-transform">
              <span className="text-4xl md:text-5xl">🐕</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent mb-2">
              Dogédex
            </h1>
            <p className="text-amber-700/70 font-medium tracking-wide">Discover Every Breed</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-amber-100">
            <div className="flex gap-2 mb-6 p-1 bg-amber-100/50 rounded-2xl">
              <button
                type="button"
                onClick={() => setFlow("signIn")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  flow === "signIn"
                    ? "bg-white shadow-lg text-amber-700"
                    : "text-amber-600/60 hover:text-amber-600"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setFlow("signUp")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  flow === "signUp"
                    ? "bg-white shadow-lg text-amber-700"
                    : "text-amber-600/60 hover:text-amber-600"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-white/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-white/50"
                  placeholder="••••••••"
                />
              </div>
              <input name="flow" type="hidden" value={flow} />

              {error && (
                <p className="text-rose-500 text-sm bg-rose-50 p-3 rounded-xl">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none"
              >
                {loading ? "Loading..." : flow === "signIn" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-amber-100">
              <button
                onClick={() => signIn("anonymous")}
                className="w-full py-3 rounded-xl font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                Continue as Guest 🐾
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function MainApp() {
  const { signOut } = useAuthActions();
  const [selectedBreed, setSelectedBreed] = useState<DogBreed | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);

  const breeds = useQuery(api.breeds.list, {
    group: selectedGroup,
    searchQuery: searchQuery.length > 0 ? searchQuery : undefined
  });
  const groups = useQuery(api.breeds.getGroups);
  const stats = useQuery(api.breeds.getStats);
  const favorites = useQuery(api.favorites.list);

  const displayBreeds = showFavorites ? favorites : breeds;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-xl md:text-2xl">🐕</span>
              </div>
              <div>
                <h1 className="font-serif text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-600 to-rose-500 bg-clip-text text-transparent">
                  Dogédex
                </h1>
                <p className="text-xs text-amber-600/60 hidden sm:block">Your Canine Encyclopedia</p>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">{stats?.total ?? 0}</p>
                <p className="text-xs text-amber-500/70">Breeds</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-rose-500">{stats?.favorites ?? 0}</p>
                <p className="text-xs text-rose-400/70">Favorites</p>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              className="px-3 py-2 md:px-4 rounded-xl text-sm font-medium text-amber-600 hover:bg-amber-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="sticky top-[57px] md:top-[73px] z-30 bg-white/60 backdrop-blur-lg border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search breeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 md:px-5 py-3 md:py-4 pl-12 md:pl-14 rounded-2xl border-2 border-amber-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-white/80 text-base md:text-lg"
            />
            <span className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-xl md:text-2xl">🔍</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            <button
              onClick={() => { setShowFavorites(false); setSelectedGroup("All"); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                !showFavorites && selectedGroup === "All"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                  : "bg-white/80 text-amber-600 hover:bg-amber-100"
              }`}
            >
              All Dogs
            </button>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                showFavorites
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/80 text-rose-500 hover:bg-rose-50"
              }`}
            >
              ❤️ Favorites
            </button>
            {groups?.filter((g: string) => g !== "All").map((group: string) => (
              <button
                key={group}
                onClick={() => { setShowFavorites(false); setSelectedGroup(group); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  !showFavorites && selectedGroup === group
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                    : "bg-white/80 text-amber-600 hover:bg-amber-100"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 md:py-8 w-full">
        {displayBreeds === undefined ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/60 rounded-3xl p-4 animate-pulse">
                <div className="aspect-square rounded-2xl bg-amber-100 mb-4"></div>
                <div className="h-6 bg-amber-100 rounded-lg mb-2"></div>
                <div className="h-4 bg-amber-100 rounded-lg w-2/3"></div>
              </div>
            ))}
          </div>
        ) : displayBreeds.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl md:text-8xl block mb-4">🐕‍🦺</span>
            <p className="text-xl md:text-2xl font-serif text-amber-700 mb-2">
              {showFavorites ? "No favorites yet!" : "No breeds found"}
            </p>
            <p className="text-amber-500">
              {showFavorites ? "Start exploring and add some favorites!" : "Try a different search"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {displayBreeds.map((breed: DogBreed | null) => breed && (
              <BreedCard
                key={breed._id}
                breed={breed as DogBreed}
                onClick={() => setSelectedBreed(breed as DogBreed)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedBreed && (
        <BreedDetail
          breed={selectedBreed}
          onClose={() => setSelectedBreed(null)}
        />
      )}

      <Footer />
    </div>
  );
}

function BreedCard({ breed, onClick }: { breed: DogBreed; onClick: () => void }) {
  const toggleFavorite = useMutation(api.favorites.toggle);
  const markDiscovered = useMutation(api.discoveries.markDiscovered);
  const isFavorite = useQuery(api.favorites.isFavorite, { breedId: breed._id });

  const handleClick = () => {
    markDiscovered({ breedId: breed._id });
    onClick();
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({ breedId: breed._id });
  };

  const rarityColors: Record<string, string> = {
    Common: "bg-emerald-100 text-emerald-700",
    Uncommon: "bg-blue-100 text-blue-700",
    Rare: "bg-purple-100 text-purple-700",
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white/80 backdrop-blur rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-amber-100/50"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={breed.imageUrl}
          alt={breed.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Rarity Badge */}
        <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${rarityColors[breed.rarity] || rarityColors.Common}`}>
          {breed.rarity}
        </span>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? "bg-rose-500 text-white scale-110"
              : "bg-white/80 text-gray-400 hover:text-rose-500"
          }`}
        >
          <span className="text-lg">{isFavorite ? "❤️" : "🤍"}</span>
        </button>

        {/* Group Badge */}
        <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-amber-700">
          {breed.group}
        </span>
      </div>

      <div className="p-4 md:p-5">
        <h3 className="font-serif text-lg md:text-xl font-bold text-amber-900 mb-1 group-hover:text-amber-600 transition-colors">
          {breed.name}
        </h3>
        <p className="text-sm text-amber-600/70 mb-3">📍 {breed.origin}</p>

        <div className="flex flex-wrap gap-1.5">
          {breed.temperament.slice(0, 3).map((trait) => (
            <span
              key={trait}
              className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BreedDetail({ breed, onClose }: { breed: DogBreed; onClose: () => void }) {
  const toggleFavorite = useMutation(api.favorites.toggle);
  const isFavorite = useQuery(api.favorites.isFavorite, { breedId: breed._id });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 md:h-72">
          <img
            src={breed.imageUrl}
            alt={breed.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
          >
            ✕
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  {breed.name}
                </h2>
                <p className="text-white/80">📍 {breed.origin}</p>
              </div>
              <button
                onClick={() => toggleFavorite({ breedId: breed._id })}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${
                  isFavorite
                    ? "bg-rose-500 text-white"
                    : "bg-white/90 text-gray-400"
                }`}
              >
                <span className="text-xl md:text-2xl">{isFavorite ? "❤️" : "🤍"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-12rem)] sm:max-h-[calc(85vh-18rem)]">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {breed.temperament.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-amber-800 leading-relaxed mb-6">{breed.description}</p>

          {/* Fun Fact */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 mb-6 border border-amber-100">
            <p className="text-sm font-medium text-amber-600 mb-1">✨ Fun Fact</p>
            <p className="text-amber-800">{breed.funFact}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <StatCard icon="⏱️" label="Lifespan" value={breed.lifespan} />
            <StatCard icon="⚖️" label="Weight" value={breed.weight} />
            <StatCard icon="📏" label="Height" value={breed.height} />
            <StatCard icon="🏃" label="Exercise" value={breed.exerciseLevel} />
            <StatCard icon="✂️" label="Grooming" value={breed.groomingNeeds} />
            <StatCard icon="🏷️" label="Group" value={breed.group} />
          </div>

          {/* Compatibility */}
          <div className="flex gap-3">
            <div className={`flex-1 p-3 rounded-xl text-center ${breed.goodWithKids ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-400"}`}>
              <span className="text-xl md:text-2xl block mb-1">👶</span>
              <p className="text-xs font-medium">
                {breed.goodWithKids ? "Good with Kids" : "Not for Kids"}
              </p>
            </div>
            <div className={`flex-1 p-3 rounded-xl text-center ${breed.goodWithPets ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-400"}`}>
              <span className="text-xl md:text-2xl block mb-1">🐱</span>
              <p className="text-xs font-medium">
                {breed.goodWithPets ? "Good with Pets" : "Solo Pet"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-amber-100 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{icon}</span>
        <span className="text-xs text-amber-500">{label}</span>
      </div>
      <p className="font-semibold text-amber-900 text-sm">{value}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-4 text-center border-t border-amber-100/50 bg-white/30">
      <p className="text-xs text-amber-400/60">
        Requested by <span className="font-medium">@web-user</span> · Built by <span className="font-medium">@clonkbot</span>
      </p>
    </footer>
  );
}

export default App;
