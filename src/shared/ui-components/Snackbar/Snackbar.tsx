import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useSnackbarStore } from '../../store/snackbar.store';

export default function SimpleSnackbar() {
  const showSnackbar = useSnackbarStore((s) => s.showSnackbar);
  const message = useSnackbarStore((s) => s.message);
  const offSnackbar = useSnackbarStore((s) => s.offSnackbar);

  console.log(showSnackbar);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    offSnackbar();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
