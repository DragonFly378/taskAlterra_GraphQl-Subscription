import React from "react";
import Button from "./Button";
import deleteIcon from "../trash3_fill.svg";
import editIcon from "../pencil_square.svg";

import { useState } from "react";

const Tasks = ({
  checkCompleted,
  title,
  classTitle,
  onDelete,
  completed,
  onUpdate,
}) => {
  const [updateTitle, setUpdateTitle] = useState("");
  // console.log(updateTitle);

  return (
    <>
      <div className="row">
        <div style={{ display: "flex" }}>
          <Button
            onClick={checkCompleted}
            text={completed ? "Batal" : "Selesai"}
            color={completed ? "red" : "green"}
          />
          {/* <input
            type="text"
            className={`${classTitle}`}
            value={updateTitle}
            onChange={(e) => {
              setUpdateTitle(e.target.value);
              // console.log(title);
            }}
          /> */}
          <div className={classTitle}>{title}</div>
        </div>
        <div className="action">
          <Button
            onClick={onUpdate}
            text={<img src={editIcon} style={{ width: "20px" }} alt="" />}
            color={"white"}
          />
          <Button
            onClick={onDelete}
            text={<img src={deleteIcon} style={{ width: "20px" }} alt="" />}
            color={"white"}
          />{" "}
        </div>
      </div>
    </>
  );
};

export default Tasks;
