import errorGif from './004 error.gif';

const ErrorMessage = () => {
  return (
    <img
      src={errorGif}
      style={{
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      alt="errorGif"
    />
  );
};

export default ErrorMessage;
