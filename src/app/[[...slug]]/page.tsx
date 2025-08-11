
import ContentBox from "@/components/ContentBox";
import { WritingPreviewType, WritingType } from "@/util/types";
import { strapiFetch } from "@/util/fetch";

type PageProps = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Home({ params } : PageProps) {

  const { slug } = await params;

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

  const writings = await getWritingPreviews();
  const writing = slug ? (await getSpecificWriting(slug))[0] : null;

  return (
    <ContentBox data={writings} writing={writing}/>
  );
}
