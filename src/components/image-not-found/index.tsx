export const ImageNotFound = (props: { movieName: string }) => {
  const { movieName } = props;
  const imageURL = `https://placehold.co/500x600?text=${movieName}`;
  return imageURL;
};
