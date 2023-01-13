const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://talentsprintbam.com";

export default baseUrl;
