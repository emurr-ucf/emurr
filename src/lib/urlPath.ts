export const urlPath =
  process.env.NODE_ENV === "production"
    ? "https://chdr.cs.ucf.edu/emurr"
    : "http://localhost:3000";
export const urlLocalPath =
  process.env.NODE_ENV === "production" ? "/emurr" : "";
export const urlBasePath =
  process.env.NODE_ENV === "production"
    ? "https://chdr.cs.ucf.edu"
    : "http://localhost:3000";
