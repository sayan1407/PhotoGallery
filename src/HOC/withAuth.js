const withAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      window.location.href = "/login";
      return null;
    }
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;