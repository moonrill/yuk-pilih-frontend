export const VoteButton = ({ index, poll_id, id, choice }) => {
  const handleCLick = () => {
    console.log(poll_id, id, choice);
  };

  return (
    <div className="d-flex justify-content-between align-items-center border px-3 py-2">
      <label>{choice}</label>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handleCLick}
      >
        Vote
      </button>
    </div>
  );
};