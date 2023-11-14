import { useSelector } from "react-redux";
import { Poll } from "../components/Poll";
import { useGetPollsQuery } from "../services/pollApi";

export const Index = () => {
  const { data: poll, isLoading } = useGetPollsQuery();
  const user = useSelector((state) => state.auth.user);

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center gap-2 position-absolute start-50 top-50 translate-middle">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <div className="sr-only">Loading...</div>
      </div>
    );
  }

  if (user.role === "admin") {
    return (
      <>
        <div className="container overflow-y-hidden pb-5">
          <div className="row mt-2 g-4">
            {user?.role == "user" && (
              <h1 className="h1 fw-normal mt-3">Available polls</h1>
            )}
            {poll?.map((data) => {
              return <Poll key={data.id} {...data} />;
            })}
          </div>
        </div>
      </>
    );
  }
};
