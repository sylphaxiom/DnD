import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button
        onClick={() =>
          logout({
            logoutParams: {
              returnTo: "http://localhost:5173/",
            },
          })
        }
        className="button logout"
      >
        Log Out
      </button>
    )
  );
};

export default LogoutButton;
