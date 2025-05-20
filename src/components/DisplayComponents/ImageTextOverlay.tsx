interface ImageTextProps {
  image: string;
  text: string;
}

const ImageTextOverlay = ({ image, text }: ImageTextProps) => (
  <div className="relative inline-block p-4">
    <img src={image} alt="" className="opacity-50" />
    <div className="absolute inset-0 flex items-center justify-center">
      <span>{text}</span>
    </div>
  </div>
);

export default ImageTextOverlay;