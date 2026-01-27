// SSG PAGE
export const dynamic = "force-static"; //This forces the page to be static
import Header from "@/components/Header";

type AboutStat = {
  label: string;
  value: string;
  detail: string;
};

type CollectionSpotlight = {
  name: string;
  blurb: string;
  items: string[];
};

const ABOUT_STATS: AboutStat[] = [
  {
    label: "Orders shipped",
    value: "128k+",
    detail: "Fulfilled across 42 states this year.",
  },
  {
    label: "Average delivery",
    value: "2.7 days",
    detail: "From checkout to doorstep.",
  },
  {
    label: "Return rate",
    value: "3.1%",
    detail: "Because we fit the details right.",
  },
];

const COLLECTION_SPOTLIGHT: CollectionSpotlight[] = [
  {
    name: "Studio Essentials",
    blurb: "Minimal gear with maximal intent.",
    items: ["Stacked canvas totes", "Matte steel mugs", "Everyday hoodies"],
  },
  {
    name: "Weekend Drop",
    blurb: "Slow mornings and quick getaways.",
    items: ["Travel-ready duffels", "Soft knit layers", "Cloudlight sneakers"],
  },
  {
    name: "Desk to Doorstep",
    blurb: "A tactile, tidy, productive workday.",
    items: ["Wireless organizers", "Focus journals", "LED task lamps"],
  },
];

async function getAboutContent() {
  return {
    stats: ABOUT_STATS,
    spotlights: COLLECTION_SPOTLIGHT,
    lastUpdated: "January 20, 2026",
  };
} //"Local" fetching only works for static pages

const AboutPage = async () => {
  const { stats, spotlights, lastUpdated } = await getAboutContent();

  return (
    <main className="min-h-screen bg-white py-4 text-slate-900 sm:px-10 ">
      <Header title="About" showBack />

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="space-y-6">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Crafted for the modern checkout journey.
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            This page is statically generated with data fetched at build time.
            It highlights the momentum behind the storefront and the collections
            shoppers return to.
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {stat.label}
              </p>
              <p className="text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500">{stat.detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {spotlights.map((spotlight) => (
            <article
              key={spotlight.name}
              className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_50px_-40px_rgba(15,23,42,0.6)]"
            >
              <div>
                <h2 className="text-xl font-semibold">{spotlight.name}</h2>
                <p className="mt-2 text-sm text-slate-500">{spotlight.blurb}</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {spotlight.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default AboutPage;
