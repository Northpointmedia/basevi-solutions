import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, FolderCheck, HeartHandshake, Mail } from "lucide-react";
import { myRootsArticlesEn, myRootsCategoriesEn } from "@/lib/my-roots-en";
import ArticleBrowser from "@/app/my-roots/ArticleBrowser";
import NewsletterForm from "@/app/my-roots/NewsletterForm";

export const metadata: Metadata = {
  title: "My Roots | U.S. immigration process blog",
  description: "Stories, practical guides, and experiences about U.S. immigration processes, created by BaseviSolutions.",
  alternates: {
    canonical: "/en/my-roots",
    languages: { "es-US": "/my-roots", "en-US": "/en/my-roots" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
    title: "My Roots — Stories that guide",
    description: "A BaseviSolutions blog created to explain immigration processes with clarity, calm, and humanity.",
    url: "/en/my-roots",
    images: [{ url: "/my-roots-hero.jpg", width: 1800, height: 900, alt: "My Roots by BaseviSolutions" }],
  },
};

export default function MyRootsEnglishPage() {
  const featured = myRootsArticlesEn.find((article) => article.featured) ?? myRootsArticlesEn[0];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#dcd8cb] bg-[#fffdf8]">
        <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
          <Image src="/my-roots-hero.jpg" alt="Notebook and natural elements representing roots and stories" fill priority className="object-cover" sizes="56vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf8] via-[#fffdf8]/35 to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-[610px] max-w-7xl items-center px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b85f3d]">A BaseviSolutions blog</p>
            <h1 className="mt-5 font-serif text-6xl font-bold leading-[0.98] tracking-tight text-[#173f33] md:text-7xl">Stories that help you put down roots.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f6d65]">Immigration processes explained through human experience: documents, decisions, and next steps presented with clarity.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#articulos" className="inline-flex items-center gap-2 rounded-full bg-[#173f33] px-6 py-3.5 font-bold text-white transition hover:bg-[#225844]">Explore articles <ArrowRight className="h-4 w-4" /></a>
              <a href="#newsletter" className="inline-flex items-center gap-2 rounded-full border border-[#173f33]/25 bg-white px-6 py-3.5 font-bold text-[#173f33] transition hover:border-[#b85f3d] hover:text-[#b85f3d]">Get My Roots <Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1e7] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="overflow-hidden rounded-[34px] bg-[#173f33] text-white shadow-[0_24px_70px_rgba(23,63,51,0.18)]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative min-h-72 overflow-hidden lg:min-h-[460px]">
                <Image src="/my-roots-hero.jpg" alt="Featured My Roots story" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="absolute inset-0 bg-[#173f33]/20" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e3b399]">Story of the week</p>
                <h2 className="mt-5 font-serif text-4xl font-bold leading-tight md:text-5xl">{featured.title}</h2>
                <p className="mt-6 max-w-xl leading-7 text-[#d7ded8]">{featured.dek}</p>
                <div className="mt-7 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-[#b9c9bf]"><span>{featured.category}</span><span aria-hidden="true">•</span><span>{featured.readingTime} read</span></div>
                <Link href={`/en/my-roots/${featured.slug}`} className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[#f6f1e7] px-6 py-3.5 font-bold text-[#173f33] transition hover:bg-white">Read the full story <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArticleBrowser language="en" articles={myRootsArticlesEn} categories={myRootsCategoriesEn} />

      <section id="experiencias" className="scroll-mt-28 bg-[#f6f1e7] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b85f3d]">Experiences</p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#173f33] md:text-5xl">We do not publish case files. We share lessons.</h2>
              <p className="mt-6 text-base leading-8 text-[#66716b]">These stories grow from situations handled by BaseviSolutions. Names and identifying details are changed to protect privacy, while the documentary challenges and lessons remain real.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [FolderCheck, "Organization", "We turn scattered records into a story that can be verified."],
                [BookOpen, "Clarity", "We explain every step without turning it into a promise."],
                [HeartHandshake, "Humanity", "Behind every form is a family and a purpose."],
              ].map(([Icon, title, text]) => {
                const ExperienceIcon = Icon as typeof FolderCheck;
                return <div key={String(title)} className="rounded-[26px] border border-[#dcd8cb] bg-[#fffdf8] p-6"><ExperienceIcon className="h-7 w-7 text-[#b85f3d]" /><h3 className="mt-5 font-serif text-2xl font-bold text-[#173f33]">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-[#66716b]">{String(text)}</p></div>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="scroll-mt-28 bg-[#fffdf8] py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[34px] bg-[#b85f3d] p-8 text-white shadow-[0_22px_60px_rgba(100,48,29,0.18)] sm:p-12 lg:p-16">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[38px] border-white/10" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffe1d2]">Newsletter</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-5xl">A useful read. No noise and no false promises.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-[#fff1e9]">Receive new stories, document reminders, and practical explanations directly in your inbox.</p>
              <NewsletterForm language="en" />
              <p className="mt-4 text-xs text-[#ffe1d2]">By subscribing, you agree to receive the My Roots newsletter. You may unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
