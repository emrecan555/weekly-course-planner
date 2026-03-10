export const createCourse = ({
  id,
  courseName,
  day,
  startTime,
  endTime,
  classroom = "",
  instructor = "",
  color = "bg-blue-500",
}) => ({
  id,
  courseName,
  day,
  startTime,
  endTime,
  classroom,
  instructor,
  color,
});