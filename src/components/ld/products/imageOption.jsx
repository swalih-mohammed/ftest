const imageOption = props => (
  <Option {...props}>
    <div>
      <img src={props.data.image} />
    </div>
  </Option>
);
