import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } =
    process.env;

  if (
    !CLOUDINARY_NAME ||
    !CLOUDINARY_API_KEY ||
    !CLOUDINARY_SECRET_KEY ||
    CLOUDINARY_NAME.includes("<") ||
    CLOUDINARY_NAME.startsWith("your_")
  ) {
    console.warn(
      "[WARNING] Cloudinary credentials not configured in backend/.env. Image uploads will be disabled until valid credentials are provided."
    );
    return;
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
  });
};

export default connectCloudinary;
