import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../reducer/modalSlice';

export const ModalPoll = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

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
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter poll title"
                autoComplete="no"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                className="form-control"
                id="description"
                rows={4}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="choices">Choices</label>
              <input type="text" autoComplete='no' name='choices' id='choices' className='form-control' />
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => dispatch(closeModal())}
            >
              Close
            </button>
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    )
  );
};
