export const DurationQueries = {
  GetDurationById: `
    SELECT * FROM durations WHERE id = ?
  `,
  PostDuration: `
    INSERT INTO durations (user_id, start_time, end_time, interrupt_times, focus_seconds, pause_seconds, type, description)
    VALUE (?, ?, ?, ?, ?, ?, ?, ?)
  `,
  DeleteDuration: `
    DELETE FROM durations WHERE id = ?
  `,
  DeleteUserDuration: `
    DELETE FROM durations WHERE user_id = ?
  `,
};
