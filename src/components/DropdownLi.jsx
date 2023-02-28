const DropdownLi = ({ data }) => {
  return (
    <li onClick={data.event}>
      <a className="dropdown-item" href="#!">
        {data.name}
      </a>
    </li>
  );
};

export default DropdownLi;
