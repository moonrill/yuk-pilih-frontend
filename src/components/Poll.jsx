import { Trash3Fill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/dateFormatter';
import { useDeletePollMutation } from '../services/pollApi';

export const Poll = ({
  children,
  id,
  title,
  description,
  creator,
  deadline,
  choices,
  result,
}) => {
  const newDeadline = formatDate(deadline);
  const [deletePoll, { isLoading }] = useDeletePollMutation();
  const { token, user } = useSelector((state) => state.auth);

  const handleClick = () => {
    deletePoll({ id, token })
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="col-lg-6">
      <div className="poll card shadow-sm h-100">
        <div className="card-header align-items-center border-0">
          <div className="poll-title fs-1">{title}</div>
          {creator && (
            <p style={{ fontSize: '13px' }} className="m-0">
              Created by : {creator}
            </p>
          )}
          <p style={{ fontSize: '13px' }} className="m-0 text-primary">
            Deadline : {newDeadline}
          </p>
          {user?.role == 'admin' && (
            <button
              type="button"
              disabled={isLoading}
              onClick={handleClick}
              className="delete-btn border-0  btn position-absolute top-0 end-0 my-2 mx-3 text-danger"
            >
              {isLoading ? (
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                <Trash3Fill size={20} />
              )}
            </button>
          )}
        </div>
        <div className="card-body p-0">
          <div className="poll-desc ps-3 pt-2">{description}</div>
          {children}
        </div>
      </div>
    </div>
  );
};
