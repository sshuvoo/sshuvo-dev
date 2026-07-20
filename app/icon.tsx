import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="6" fill="#0b0b0b" />
        <path
          d="M21.2 11.3c0-1.5-1.2-2.3-2.8-2.3-1.8 0-3.1 1-3.1 2.4 0 1.8 1.4 2.3 3.3 2.8 2.1.6 3.6 1.4 3.6 3.5 0 2.2-1.8 3.3-4.1 3.3-2.4 0-4-1.2-4.1-2.8"
          stroke="#34d399"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    { ...size }
  );
}
