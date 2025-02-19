const S3_URL = process.env.NEXT_PUBLIC_S3_URL;

export const checkToolIdFileExists = async (
  toolId: string
): Promise<boolean> => {
  try {
    const url = `${S3_URL}/${toolId}`;
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const checkToolIdLaserFileExists = async (
  toolId: string
): Promise<boolean> => {
  try {
    const url = `${S3_URL}/${toolId}_LASER`;
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};
