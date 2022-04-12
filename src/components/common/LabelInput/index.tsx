import "./style.scss";
type Props_input = {
  title: string;
  value: any;
  onChange: (value: any) => void;
};
export const LabelInput: React.FC<Props_input> = (props) => {
  const { value, title } = props;
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange && props.onChange(evt.target.value);
  };
  return (
    <div className="item-wrapper">
      <div className="title"> {title} </div>
      <input onChange={onChange} value={value} className="dao-input" />
    </div>
  );
};

type Props_checkbox = {
  title: string;
  value: any;
  onChange: (value: boolean) => void;
};
export const LabelCheckbox: React.FC<Props_checkbox> = (props) => {
  const { value, title } = props;
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange && props.onChange(!value);
  };
  return (
    <div className="item-wrapper">
      <div className="input-title"> {title} </div>
      <div className="input-checkbox">
        <input type="checkbox" onChange={onChange} value={value} />
      </div>
    </div>
  );
};
