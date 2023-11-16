import { useSelector } from 'react-redux';
import { ChoiceResult } from '../components/ChoiceResult';
import { Poll } from '../components/Poll';
import { useGetPollsQuery } from '../services/pollApi';

export const UserVotes = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { data: polls, isLoading } = useGetPollsQuery(token);

  if (isLoading || !user) {
    return (
      <div className="d-flex flex-column align-items-center gap-2 position-absolute start-50 top-50 translate-middle">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: '3rem', height: '3rem' }}
        ></div>
        <div className="sr-only">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container pb-5">
      <h1 className="h1 fw-normal mt-3">Your votes</h1>
      <h5 className="fw-normal mt-3">The poll have you voted</h5>

      <div className="row mt-2 g-4">
        {!polls.hasOwnProperty('user_votes') && (
          <div className="fs-5">No poll has voted, please vote first.</div>
        )}
        {polls.user_votes?.map((poll) => (
          <Poll key={poll.id} {...poll} >
            <div className="poll-result mt-2 p-3 border-top">
              {Object.entries(poll.result).map(([key, value]) => (
                <ChoiceResult key={key} name={key} percentage={value} />
              ))}
            </div>
          </Poll>
        ))}
      </div>
    </div>
  );
};

export const ExpiredPolls = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { data: polls, isLoading } = useGetPollsQuery(token);

  if (isLoading || !user) {
    return (
      <div className="d-flex flex-column align-items-center gap-2 position-absolute start-50 top-50 translate-middle">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: '3rem', height: '3rem' }}
        ></div>
        <div className="sr-only">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container pb-5">
      <h1 className="h1 fw-normal mt-3">Expired polls</h1>

      <div className="row mt-2 g-4">
        {!polls.hasOwnProperty('expired_polls') && (
          <div className="fs-5">Expired poll is not found</div>
        )}
        {polls.expired_polls?.map((poll) => (
          <Poll key={poll.id} {...poll} >
            <div className="poll-result mt-2 p-3 border-top">
              {Object.entries(poll.result).map(([key, value]) => (
                <ChoiceResult key={key} name={key} percentage={value} />
              ))}
            </div>
          </Poll>
        ))}
      </div>
    </div>
  );
};
