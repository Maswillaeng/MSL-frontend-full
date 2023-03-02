const DropdownLi = ({ data }) => {
  return (
    <li onClick={data.event}>
      <a className="dropdown-item" href="/board">
        {data.name}
      </a>
    </li>
  );
};

export default DropdownLi;
