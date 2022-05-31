import './Button.scss';

const Button = ({
  value,
  className,
  handler,
}: {
  value: string | number;
  className: string;
  handler: (value: string | number) => void;
}): JSX.Element => {
  return (
    <button type="button" className={className} onClick={() => handler(value)}>
      {value}
    </button>
  );
};

export default Button;
