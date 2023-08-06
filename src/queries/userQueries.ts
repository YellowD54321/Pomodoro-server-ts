export const UserQueries = {
  GetUserById: `
        SELECT * FROM users WHERE id = ?
    `,

  GetUserByGoogleId: `
        SELECT * FROM users WHERE google_id = ?
    `,

  RegisterUserByGoogleId: `
        INSERT INTO users (id, google_id)
          VALUE (null, ?)
    `,
};
