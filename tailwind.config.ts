import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#14232b", mist: "#eaf0f2", kelp: "#1f6f5c" } } },
} satisfies Config;
