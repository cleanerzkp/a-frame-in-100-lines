import { FrameRequest, getFrameMessage, getFrameHtmlResponse, FrameButtonMetadata, FrameMetadataType } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

const gmImageUrl = "https://ipfs.io/ipfs/bafybeiceudhd43v2h3iw5ppqp3i4i5l472xnahlwlrie3vb5pedferqqwu/";
const lightModeImageUrl = "https://ipfs.io/ipfs/bafybeiakdyxvbtavc5jd4ygbo32sofglr4mikbidv67btsd4567wjgolxu/lightmode.png";
const darkModeImageUrl = "https://ipfs.io/ipfs/bafybeiakdyxvbtavc5jd4ygbo32sofglr4mikbidv67btsd4567wjgolxu/darkmode.png";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const state = message.state ? JSON.parse(decodeURIComponent(message.state.serialized)) : { mode: 'gm' };
  const mode = state.mode || 'gm';

  let imageUrl = gmImageUrl;
  let buttons: [FrameButtonMetadata, FrameButtonMetadata] = [
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
  ];

  if (mode === 'light') {
    imageUrl = lightModeImageUrl;
    buttons = [
      {
        label: 'GM',
        action: 'post',
        target: `${NEXT_PUBLIC_URL}/api/frame?state=${encodeURIComponent(JSON.stringify({ mode: 'gm' }))}`,
      },
      {
        label: 'Dark Mode',
        action: 'post',
        target: `${NEXT_PUBLIC_URL}/api/frame?state=${encodeURIComponent(JSON.stringify({ mode: 'dark' }))}`,
      },
    ];
  } else if (mode === 'dark') {
    imageUrl = darkModeImageUrl;
    buttons = [
      {
        label: 'GM',
        action: 'post',
        target: `${NEXT_PUBLIC_URL}/api/frame?state=${encodeURIComponent(JSON.stringify({ mode: 'gm' }))}`,
      },
      {
        label: 'Light Mode',
        action: 'post',
        target: `${NEXT_PUBLIC_URL}/api/frame?state=${encodeURIComponent(JSON.stringify({ mode: 'light' }))}`,
      },
    ];
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons,
      image: { src: imageUrl },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      state: { serialized: encodeURIComponent(JSON.stringify(state)) },
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
