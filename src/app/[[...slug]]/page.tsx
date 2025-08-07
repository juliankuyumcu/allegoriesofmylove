
import ContentBox from "@/components/ContentBox";
import { WritingPreviewType } from "@/util/types";
import { strapiFetch } from "@/util/fetch";

// const data = (new Array(15).fill(0).map((_, i) => Object({data: {attributes: {title: `title for a memory ${i}`, slug:`title-for-a-memory-${i}`}}})));

export default async function Home() {

  const getWritings = async () => await strapiFetch({
      method: "GET",
      slug: "writings",
      fields: ["slug", "title", "createdAt", "updatedAt"],
      sort: ["createdAt:desc"],
  }) as WritingPreviewType[];

  const data = await getWritings();

  return (
    <>
    <ContentBox data={data} writing={null}/>
    </>
  );
}
