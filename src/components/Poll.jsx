import { Trash3Fill } from "react-bootstrap-icons";
import formatDate from "../../utils/dateFormatter";
import { Choice } from "./Choice";

// eslint-disable-next-line react/prop-types
export const Poll = ({ title, description, creator, deadline, result }) => {
  const newDeadline = formatDate(deadline);
  return (
    <div className="col-lg-6">
      <div className="poll card shadow-sm h-100">
        <div className="card-header align-items-center border-0">
          <div className="poll-title fs-1">{title}</div>
          <p style={{ fontSize: "13px" }} className="m-0">
            Created by : {creator}
          </p>
          <p style={{ fontSize: "13px" }} className="m-0 text-primary">
            Deadline : {newDeadline}
          </p>
          <a
            href=""
            className="delete-btn position-absolute top-0 end-0 my-2 mx-3 text-danger"
          >
            <Trash3Fill size={20} />
          </a>
        </div>
        <div className="card-body">
          <div className="poll-desc">{description}</div>
          {/* ------------------------------- POLL RESULT ------------------------------ */}
          <div className="poll-result mt-4">
            {Object.entries(result).map(([key, value]) => (
              <Choice key={key} name={key} percentage={value} />
            ))}
          </div>
          {/* ---------------------------- POLL RESULT END --------------------------- */}
        </div>
      </div>
    </div>
  );
};
