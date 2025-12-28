import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to top right, #3b82f6, #4f46e5)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "36px", // Apple style rounded corners
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "100px", height: "100px" }}
        >
           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="1.5" fill="white" style={{ opacity: 0.2 }} />
           <path d="M8 11h8" stroke="white" strokeWidth="2.5" />
           <path d="M8 15h8" stroke="white" strokeWidth="2.5" />
           <path d="M12 7v1" stroke="white" strokeWidth="2.5" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}