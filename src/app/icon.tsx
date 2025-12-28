import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: "linear-gradient(to top right, #3b82f6, #4f46e5)", // Primary to Violet gradient
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "8px", 
        }}
      >
        {/* 👇 FIX: Increased size to 24px and stroke width for visibility */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3" // Thicker lines
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "24px", height: "24px" }}
        >
          {/* Main Shape */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="none" fill="white" style={{ opacity: 0.25 }} />
          {/* Lines */}
          <path d="M7 11h10" />
          <path d="M7 15h10" />
          <path d="M12 7v1" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}