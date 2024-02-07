import React, { useEffect, useState } from "react";

import UsersList from "../Components/UsersList";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const [loadedUsers, setLoadedUsers] = useState();

  const { isLoading, error, sendrequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendrequest(process.env.REACT_APP_API_URL + "/api/users");
        setLoadedUsers(responseData.users);
        // console.log(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendrequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
