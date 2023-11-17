import { useState } from 'react';
import { PlusLg, Trash3Fill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addChoice,
  removeChoice,
  resetForm,
  setChoices,
  setDeadline,
  setDescription,
  setTitle,
} from '../reducer/formPollSlice';
import { closeModal } from '../reducer/modalSlice';
import { useCreatePollMutation } from '../services/pollApi';

export const ModalPoll = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [createPoll, { isLoading }] = useCreatePollMutation();
  const [error, setError] = useState(null);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const formData = useSelector((state) => state.formPoll);
  const { title, description, deadline, choices } = formData;

  const action = {
    title: setTitle,
    description: setDescription,
    deadline: setDeadline,
  };

  const handleChange = (e, index) => {
    setError(null);
    if (e.target.name === 'choices')
      return dispatch(setChoices({ index, value: e.target.value }));

    return dispatch(action[e.target.name](e.target.value));
  };

  const transformData = (key, value) => {
    if (Array.isArray(value)) {
      let newValue = value.filter((item) => item !== '');
      return newValue.length >= 2 ? newValue : undefined;
    }

    if (value === '') return undefined;

    if (key === 'deadline') return value.split('T').join(' ') + ':00';

    return value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transformedData = JSON.parse(JSON.stringify(formData, transformData));

    createPoll({ data: transformedData, token })
      .unwrap()
      .then(() => {
        dispatch(resetForm());
        dispatch(closeModal());
      })
      .catch(({ data }) => {
        setError(data.message);
      });
  };

  return (
    isOpen && (
      <div
        className="row vw-100 start-0 top-0 min-vh-100 overflow-y-auto position-fixed z-3 p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', maxHeight: '100vh' }}
      >
        <div className="card col-6 start-50 translate-middle-x z-3 p-0">
          <div className="card-header">
            <h4 className="card-title fs-3 my-2">Create Poll</h4>
          </div>
          <div className="card-body p-4">
            <form id="form-poll" onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input
                  onChange={handleChange}
                  name="title"
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter poll title"
                  autoComplete="no"
                  value={title}
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  onChange={handleChange}
                  name="description"
                  className="form-control"
                  id="description"
                  rows={4}
                  value={description}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="deadline">Deadline</label>
                <input
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                  name="deadline"
                  type="datetime-local"
                  className="form-control"
                  id="deadline"
                  value={deadline}
                />
              </div>
              {choices.map((choice, index) => (
                <div
                  className="row pe-3 choices align-items-center"
                  key={index}
                >
                  <div className="col mb-3">
                    <label htmlFor="choices">Choices {index + 1}</label>
                    <input
                      onChange={(e) => handleChange(e, index)}
                      type="text"
                      autoComplete="off"
                      name="choices"
                      id="choices"
                      className="form-control"
                      value={choice}
                    />
                  </div>
                  {choices.length > 2 && (
                    <button
                      type="button"
                      className="col-1 btn btn-danger d-flex justify-content-center py-2 mt-2"
                      onClick={() => dispatch(removeChoice(index))}
                    >
                      <Trash3Fill />
                    </button>
                  )}
                </div>
              ))}
              {choices.length < 12 && (
                <button
                  type="button"
                  className="btn btn-primary d-flex justify-content-center align-items-center"
                  style={{ width: '50px', height: '40px' }}
                  onClick={() => dispatch(addChoice())}
                >
                  <PlusLg />
                </button>
              )}
            </form>
            {error && (
              <div className="error-message text-danger mt-3">
                <p>{error} </p>
              </div>
            )}
          </div>
          <div className="card-footer d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => {
                // Clear error message if any
                setError(null);

                // Reset form input
                dispatch(resetForm());
                // Close Modal
                dispatch(closeModal());
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
              form="form-poll"
            >
              {isLoading ? (
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="spinner-border text-light"
                    role="status"
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  ></div>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                'Add'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
