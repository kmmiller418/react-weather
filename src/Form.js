export const Input = (props) => {
  return (
    <input
      placeholder={props.placeholder}
      type="text"
      onChange={props.onChange}
    />
  );
};

export const Button = (props) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

export const Link = () => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      alt="ISO lookup"
      href="https://www.iso.org/obp/ui/#search"
    >
      ISO format
    </a>
  );
};

