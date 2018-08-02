/**
 * A function refactors the userdata object to exclude the user password.
 *
 * @param object {user data}
 *
 * return object {the new refactored user data}
 */
const refactorUserData = (userData) => {
  const user = {
    id: userData.id,
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    created_At: userData.created_At
  };

  return user;
};

export default refactorUserData;
