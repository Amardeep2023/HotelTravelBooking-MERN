export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://hoteltravelbooking-mern.onrender.com/api/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }