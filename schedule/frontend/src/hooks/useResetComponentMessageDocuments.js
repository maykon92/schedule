// Redux
import { resetMessage } from "../slices/archiveSlice";

export const useResetComponentMessageDocuments = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
