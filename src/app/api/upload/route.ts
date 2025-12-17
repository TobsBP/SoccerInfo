import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename || !request.body) {
    return NextResponse.json({ error: 'Filename and body required' }, { status: 400 });
  }

  try {
     const arrayBuffer = await request.arrayBuffer();
     const buffer = Buffer.from(arrayBuffer);

     const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { public_id: filename.split('.')[0], resource_type: 'auto' }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // @ts-expect-error result is not typed by default
    return NextResponse.json({ url: result.secure_url });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
