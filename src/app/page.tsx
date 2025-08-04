

import ContentBox from "@/components/ContentBox";

const data2 = (new Array(15).fill(0).map((_, i) => Object({data: {attributes: {title: `title for a memory ${i}`, slug:`title-for-a-memory-${i}`}}})));

export default function Home() {
  return (
    <ContentBox data={data2} writing={null}/>
  );
}
