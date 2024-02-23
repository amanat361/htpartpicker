import React from "react";

interface ImagePreviewProps {
  image_url: string;
  span: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image_url, span }) => {
  const [isValidUrl, setIsValidUrl] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Simple check to see if the URL is valid
    setIsValidUrl(() => {
      try {
        new URL(image_url);
        return true;
      } catch (_) {
        return false;
      }
    });
  }, [image_url]);

  return (
    // <div className="aspect-1 bg-gray-900 dark:bg-gray-100 flex justify-center items-center col-span-2 rounded-2xl">
    <div className={`border-[1px] border-gray-900 dark:border-gray-400 p-2 aspect-1 flex justify-center items-center rounded-xl overflow-hidden ${span}`}>
      {isValidUrl ? (
        <img
          src={image_url}
          alt="Preview"
          className="h-full w-full object-cover rounded-lg"
          onError={() => setIsValidUrl(false)}
        />
      ) : (
        <div className="text-gray-400">No image available</div>
      )}
    </div>
  );
};

export default ImagePreview;
