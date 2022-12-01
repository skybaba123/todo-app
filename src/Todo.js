import cross from "./images/icon-cross.svg";
import check from "./images/icon-check.svg";

const Todo = ({
  content,
  id,
  conpletedId,
  ids,
  removeId,
  fadein,
  deleteItem,
}) => {
  const idCheck = ids.includes(id);

  const completed = () => {
    if (ids.includes(id)) {
      removeId(id);
    } else {
      conpletedId(id);
    }
  };

  const del = () => {
    deleteItem(id);
  };

  const cheked = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background:
      idCheck && "linear-gradient( hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
    border: "1px solid rgb(221, 221, 221)",
  };

  return (
    <div style={{ animation: `${fadein} .5s` }} className="todo">
      <section>
        <div onClick={completed} className="check" style={cheked}>
          {idCheck && <img src={check} alt="check" />}
        </div>
        {idCheck ? (
          <p style={{ color: "dimgray" }}>
            <del>{content}</del>
          </p>
        ) : (
          <p>{content}</p>
        )}
      </section>

      <img onClick={del} src={cross} alt="cross" />
    </div>
  );
};

export default Todo;
