interface ImageProps {
  width?: string | number | undefined;
  height?: string | number | undefined;
  imgSrc?: string;
  imgAlt?: string;
}

const ImageComponent = (props: ImageProps) => {
  return (
    <img
      src={props.imgSrc}
      alt={props.imgAlt}
      width={props.width}
      height={props.height}
      data-testid="image-test"
    />
  );
};
export default ImageComponent;
