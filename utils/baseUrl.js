const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://localhost:3000"
    // "https://socialfair.netlify.app";

export default baseUrl;
