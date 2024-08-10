import './styles.css';

interface SpinnerProps {}

const Spinner = () => {
  return (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  );
};

export default Spinner;
