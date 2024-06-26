import { Trash3Fill } from 'react-bootstrap-icons';
import { Choice } from './Choice';

// eslint-disable-next-line react/prop-types
export const Poll = ({title, description, creator, deadline, result}) => {
  return (
    <div className="poll card shadow-sm mt-4">
      <div className="card-header align-items-center border-0">
        <div className="poll-title fs-1">{title}</div>
        <p style={{ fontSize: '13px' }} className="m-0">
          Created by : {creator}
        </p>
        <p style={{ fontSize: '13px' }} className="m-0 text-primary">
          Deadline : {deadline}
        </p>
        <a
          href=""
          className="delete-btn position-absolute top-0 end-0 my-2 mx-3 text-danger"
        >
          <Trash3Fill size={20} />
        </a>
      </div>
      <div className="card-body">
        <div className="poll-desc">
          {description}
        </div>
        {/* ------------------------------- POLL RESULT ------------------------------ */}
        <div className="poll-result mt-4">
        {Object.entries(result).map(([key, value]) => (
          <Choice key={key} name={key} percentage={value} />
        ))}
        </div>
        {/* ---------------------------- POLL RESULT END --------------------------- */}
      </div>
    </div>
  );
};
