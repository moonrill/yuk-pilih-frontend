import { PlusLg } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { openModal } from '../reducer/modalSlice';

/**
 * Renders a Floating Action Button (FAB) component.
 *
 * @return {JSX.Element} The rendered FAB component.
 */
export const Fab = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-lg d-flex p-3 position-fixed bottom-0 end-0 m-3 z-10 rounded-circle shadow"
        data-bs-toggle="tooltip"
        title="Add poll"
        onClick={() => dispatch(openModal())}
      >
        <PlusLg />
      </button>
    </>
  );
};
