import { AppBar, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/auth");
    }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={6}
      >
        <Toolbar>
          <Button variant='contained' color='error' onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar