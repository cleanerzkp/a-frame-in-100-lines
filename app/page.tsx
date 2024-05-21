import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const gmImageUrl = "https://ipfs.io/ipfs/bafybeiceudhd43v2h3iw5ppqp3i4i5l472xnahlwlrie3vb5pedferqqwu/";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Light Mode',
      action: 'post',
      target: `${NEXT_PUBLIC_URL}/api/frame?state=${encodeURIComponent(JSON.stringify({ mode: 'light' }))}`,
    },
    {
      label: 'Dark Mode',
      action: 'post',
      target: `${NEXT_PUBLIC_URL}/api/frame?state=${encodeURIComponent(JSON.stringify({ mode: 'dark' }))}`,
    },
  ],
  image: {
    src: gmImageUrl,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [gmImageUrl],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>zizzamia.xyz</h1>
    </>
  );
}
