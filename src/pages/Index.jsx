import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChoiceResult } from '../components/ChoiceResult';
import { Poll } from '../components/Poll';
import { VoteButton } from '../components/VoteButton';
import { useGetPollsQuery, useVoteMutation } from '../services/pollApi';

export const Index = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { data: polls, isLoading, isFetching } = useGetPollsQuery(token);
  const [vote, { isLoading: isSaving }] = useVoteMutation();
  const [loadingChoice, setLoadingChoice] = useState(null);

  const handleVoteComplete = () => {
    setLoadingChoice(null);
  };

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
        {isFetching && <div className='mt-3'>Updating polls...</div>}
        <div className="row mt-2 g-4">
          {polls?.length == 0 && (
            <div className="fs-5">No poll has created</div>
          )}
          {polls?.map((poll) => (
            <Poll key={poll.id} {...poll}>
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
  }

  if (user?.role === 'user') {
    return (
      <div className="container overflow-y-hidden pb-5">
        <h1 className="h1 fw-normal mt-3">Available polls</h1>

        <div className="row mt-2 g-4">
          {!polls.hasOwnProperty('available_polls') && (
            <div className="fs-5">No poll available</div>
          )}
          {polls.available_polls?.map((poll) => (
            <Poll key={poll.id} {...poll}>
              <div className="choices mt-2 d-flex flex-column">
                {poll.choices?.map((choice) => (
                  <VoteButton
                    key={choice.id}
                    vote={vote}
                    isSaving={isSaving}
                    isFetching={isFetching}
                    loading={loadingChoice === choice.id}
                    onClick={() => setLoadingChoice(choice.id)}
                    onVoteComplete={handleVoteComplete}
                    {...choice}
                  />
                ))}
              </div>
            </Poll>
          ))}
        </div>
      </div>
    );
  }
};
