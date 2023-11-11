import { ModalPoll } from '../components/ModalPoll';
import { Poll } from '../components/Poll';
import { useGetPollsQuery } from '../services/pollApi';

export const Index = () => {
  const { data: poll, isLoading } = useGetPollsQuery();

  return (
    <>
      <ModalPoll />
      <div className="container pb-5">
        {isLoading ? (
          <div className="d-flex flex-column align-items-center gap-2 position-absolute start-50 top-50 translate-middle">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: '3rem', height: '3rem' }}
            ></div>
            <div className="sr-only">Loading...</div>
          </div>
        ) : (
          poll?.map((data) => {
            return <Poll key={data.id} {...data} />;
          })
        )}
      </div>
    </>
  );
};
