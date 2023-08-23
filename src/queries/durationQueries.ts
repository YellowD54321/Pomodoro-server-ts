export const DurationQueries = {
  GetDurationById: `
    SELECT * FROM durations WHERE id = ?
  `,
  GetDurationByParams: `
    SELECT * FROM durations WHERE
    user_id = ?
    AND start_time >= IF(? IS NOT NULL, ?, '1000-01-01')
    AND start_time <= IF(? IS NOT NULL, ?, '3000-12-31')
    AND (? IS NULL OR type = ?)
    AND (? IS NULL OR description LIKE CONCAT('%', ?, '%'))
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
