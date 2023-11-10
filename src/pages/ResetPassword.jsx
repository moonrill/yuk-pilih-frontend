const ResetPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="container vh-100 ">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-6 p-5 border rounded-4 shadow">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-5">Reset Password</h1>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Enter old password"
              />
              <label htmlFor="floatingInput">Old password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Enter new password"
              />
              <label htmlFor="floatingPassword">New password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Confirm new password"
              />
              <label htmlFor="floatingPassword">Confirm new password</label>
            </div>

            <div className="error-message text-danger">
              <p>Old password did not match !</p>
            </div>

            <button type="submit" className="btn btn-primary px-4 py-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
