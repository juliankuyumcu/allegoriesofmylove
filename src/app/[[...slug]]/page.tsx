
import type { Metadata } from "next";
import ContentBox from "@/components/ContentBox";
import { WritingPreviewType, WritingType } from "@/util/types";
import { strapiFetch } from "@/util/fetch";

type PageProps = {
  params: Promise<{
    slug?: string;
  }>;
};

const getWritingPreviews = async () => await strapiFetch({
    method: "GET",
    slug: "writings",
    fields: ["slug", "title", "createdAt", "updatedAt"],
    sort: ["createdAt:desc"],
}) as WritingPreviewType[];

const getSpecificWriting = async (slug: string) => await strapiFetch({
    method: "GET",
    slug: "writings",
    populate: ["media"],
    filters: {
      "slug": {"$eq": slug}
    }
}) as WritingType[];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const writing = slug ? (await getSpecificWriting(slug))[0] : null;

  return writing ? {
    title: `${writing.title.toLowerCase()} | allegoriesofmy.love`,
    description: writing.content.split("\n")[0].substring(0, 50) + "...",
    openGraph: {
      title: `${writing.title.toLowerCase()} | allegoriesofmy.love`,
      description: writing.content.split("\n")[0].substring(0, 50) + "...",
      url: `https://allegoriesofmy.love/${slug}`,
      type: "website",
    },
  } : {
    title: `allegoriesofmy.love`,
    description: "An archive of poems, short stories, and art that aim for truth and humanity...",
    openGraph: {
      title: `allegoriesofmy.love`,
      description: "An archive of poems, short stories, and art that aim for truth and humanity...",
      url: `https://allegoriesofmy.love`,
      type: "website",
    },
  };
}

export default async function Home({ params } : PageProps) {

  const { slug } = await params;

  const writings = await getWritingPreviews();
  const writing = slug ? (await getSpecificWriting(slug))[0] : null;

  return (
    <ContentBox data={writings} writing={writing}/>
  );
}
