
import ContentBox from "@/components/ContentBox";
import { WritingPreviewType, WritingType } from "@/util/types";
import { strapiFetch } from "@/util/fetch";

// const data = (new Array(15).fill(0).map((_, i) => Object({data: {attributes: {title: `title for a memory ${i}`, slug:`title-for-a-memory-${i}`}}})));

interface PageProps {
  params: {
    slug?: string;
  }
}

export default async function Home({ params } : PageProps) {

  const { slug } = await params;

  const getWritings = async () => await strapiFetch({
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
  });

  const writings = await getWritings();
  const writing = slug ? (await getSpecificWriting(slug))[0] as WritingType : null;

  return (
    <>
    <ContentBox data={writings} writing={writing}/>
    </>
  );
}
