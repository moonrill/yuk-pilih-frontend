import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Poll } from '../components/Poll';
import { VoteButton } from '../components/VoteButton';
import { useGetPollsQuery } from '../services/pollApi';

export const Index = () => {
  const {token, user} = useSelector((state) => state.auth);
  const { data: polls, isLoading } = useGetPollsQuery(token);

  if (isLoading || user == null) {
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

  if (user?.role === 'admin') {
    return (
      <div className="container overflow-y-hidden pb-5">
        <div className="row mt-2 g-4">
          {polls?.length == 0 && <div className='fs-5'>No poll has created</div>}
          {polls?.map((poll) => {
            return <Poll key={poll.id} {...poll} />;
          })}
        </div>
      </div>
    );
  }

  if (user?.role === 'user') {
    return (
      <div className="container overflow-y-hidden pb-5">
        <h1 className="h1 fw-normal mt-3">Available polls</h1>

        <div className="row mt-2 g-4">
          {!polls.hasOwnProperty('available_polls') && <div className='fs-5'>No poll available</div>}
          {polls.available_polls?.map((poll) => (
            <Poll key={poll.id} {...poll} >
              <div className="choices mt-2 d-flex flex-column">
              {poll.choices?.map((choice) => (
                <VoteButton key={choice.id} {...choice} />
              ))}
            </div>
            </Poll>
          ))}
        </div>
      </div>
    );
  }
};
