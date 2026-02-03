export const nano_banana = {
  type: "remote" as const,
  url: "http://localhost:3000/mcp", // Local nano-banana MCP server
  enabled: true,
  // Note: For stdio-based nano-banana, this would be configured differently
  // This remote config assumes a local HTTP bridge server
  oauth: false as const,
}

// Alternative configuration for direct stdio usage (for OpenCode/Claude Code)
export const nano_banana_stdio = {
  command: "npx",
  args: ["nano-banana-mcp"],
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  },
}