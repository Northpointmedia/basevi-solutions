import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { getMyRootsArticleEn, myRootsArticlesEn } from "@/lib/my-roots-en";
import { myRootsArticles } from "@/lib/my-roots";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return myRootsArticlesEn.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getMyRootsArticleEn(slug);
  if (!article) return {};

  const spanishArticle = myRootsArticles[myRootsArticlesEn.findIndex((item) => item.slug === article.slug)];

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/en/my-roots/${article.slug}`,
      languages: {
        "en-US": `/en/my-roots/${article.slug}`,
        "es-US": `/my-roots/${spanishArticle.slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      alternateLocale: "es_US",
      title: article.title,
      description: article.excerpt,
      url: `/en/my-roots/${article.slug}`,
      publishedTime: article.publishedAt,
      authors: ["BaseviSolutions"],
      images: [{ url: "/my-roots-hero.jpg", width: 1800, height: 900, alt: article.title }],
    },
  };
}

export default async function MyRootsEnglishArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getMyRootsArticleEn(slug);
  if (!article) notFound();

  const currentIndex = myRootsArticlesEn.findIndex((item) => item.slug === article.slug);
  const nextArticle = myRootsArticlesEn[(currentIndex + 1) % myRootsArticlesEn.length];
  const articleUrl = `https://www.basevisolutions.com/en/my-roots/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "en-US",
    mainEntityOfPage: articleUrl,
    author: { "@type": "Organization", name: "BaseviSolutions" },
    publisher: {
      "@type": "Organization",
      name: "BaseviSolutions",
      logo: { "@type": "ImageObject", url: "https://www.basevisolutions.com/basevi-logo.webp" },
    },
    image: "https://www.basevisolutions.com/my-roots-hero.jpg",
  };

  return (
    <main className="bg-[#fffdf8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article>
        <header className="border-b border-[#dcd8cb] bg-[#f6f1e7]">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:py-20 lg:px-8">
            <Link href="/en/my-roots#articulos" className="inline-flex items-center gap-2 text-sm font-bold text-[#173f33] transition hover:text-[#b85f3d]"><ArrowLeft className="h-4 w-4" /> Back to the blog</Link>
            <div className="mt-12 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.14em]"><span className="rounded-full bg-[#b85f3d]/10 px-3 py-1.5 text-[#a84f30]">{article.category}</span><span className="text-[#77827b]">{article.readingTime} read</span></div>
            <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.04] tracking-tight text-[#173f33] md:text-6xl">{article.title}</h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-[#66716b]">{article.dek}</p>
            <p className="mt-7 text-sm text-[#7b857f]">Published by BaseviSolutions · Personal details changed for confidentiality</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
          <div className="mb-12 rounded-2xl border border-[#d8c9b8] bg-[#fbf3ea] p-5 text-sm leading-6 text-[#66584e]"><strong>Editorial note:</strong> this story is based on document-preparation experiences. Names and identifying details have been changed. It is not legal advice and does not guarantee USCIS decisions or processing times.</div>

          <div className="space-y-14">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-3xl font-bold leading-tight text-[#173f33]">{section.heading}</h2>
                <div className="mt-5 space-y-5 text-[17px] leading-8 text-[#445148]">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                {section.bullets && <ul className="mt-6 space-y-3 pl-6 text-[17px] leading-7 text-[#445148] marker:text-[#b85f3d]">{section.bullets.map((bullet) => <li key={bullet} className="list-disc pl-2">{bullet}</li>)}</ul>}
                {section.quote && <blockquote className="my-8 border-l-4 border-[#b85f3d] bg-[#f6f1e7] px-7 py-6 font-serif text-2xl font-semibold leading-9 text-[#173f33]">“{section.quote}”</blockquote>}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-[26px] border border-[#dcd8cb] bg-[#f6f1e7] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b85f3d]">Official source</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#173f33]">Always verify current information</h2>
            <p className="mt-3 text-sm leading-6 text-[#66716b]">Fees, form editions, and instructions may change. Check the official page directly before filing.</p>
            <a href={article.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-[#173f33] transition hover:text-[#b85f3d]">{article.formLabel} on the official website <ExternalLink className="h-4 w-4" /></a>
          </div>

          <div className="mt-8 rounded-[26px] bg-[#173f33] p-8 text-white">
            <h2 className="font-serif text-3xl font-bold">Need help organizing your documents?</h2>
            <p className="mt-3 max-w-xl leading-7 text-[#d4ddd7]">BaseviSolutions provides bilingual document preparation and administrative support throughout the United States.</p>
            <Link href="/#contacto" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f6f1e7] px-5 py-3 font-bold text-[#173f33]">Contact BaseviSolutions <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <Link href={`/en/my-roots/${nextArticle.slug}`} className="group mt-12 block border-t border-[#dcd8cb] pt-9">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#b85f3d]">Next story</span>
            <span className="mt-3 flex items-center justify-between gap-6 font-serif text-2xl font-bold text-[#173f33] transition group-hover:text-[#b85f3d]">{nextArticle.title} <ArrowRight className="h-5 w-5 shrink-0" /></span>
          </Link>
        </div>
      </article>
    </main>
  );
}
