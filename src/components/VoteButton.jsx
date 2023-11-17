import { useState } from 'react';
import { useSelector } from 'react-redux';

export const VoteButton = ({
  poll_id,
  id,
  choice,
  vote,
  isSaving,
  isFetching,
  loading,
  onClick,
  onVoteComplete,
}) => {
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState(null);
  const handleCLick = () => {
    onClick();
    if (!isSaving && !isFetching && !loading) {
      vote({ poll_id, choice_id: id, token })
        .unwrap()
        .then((res) => {
          console.log(res);
          setMessage(res.message);
          onVoteComplete();
        })
        .catch((err) => {
          console.log(err);
          onVoteComplete();
        });
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2">
      <label>{choice}</label>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      ) : message ? (
        <div className="text-success">{message} !</div>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleCLick}
          disabled={isSaving || isFetching}
        >
          Vote
        </button>
      )}
    </div>
  );
};
