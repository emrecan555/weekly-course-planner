const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function WeeklySchedule({ courses }) {
  const parseHour = (time) => Number(time.split(":")[0]);

  const getCourseAtSlot = (day, time) => {
    return courses.find(
      (course) => course.day === day && course.startTime === time
    );
  };

  const getRowSpan = (startTime, endTime) => {
    const startHour = parseHour(startTime);
    const endHour = parseHour(endTime);
    return endHour - startHour;
  };

  const isCoveredByPreviousCourse = (day, time) => {
    const currentHour = parseHour(time);

    return courses.some((course) => {
      if (course.day !== day) return false;

      const startHour = parseHour(course.startTime);
      const endHour = parseHour(course.endTime);

      return currentHour > startHour && currentHour < endHour;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Haftalık Ders Programı
      </h2>

      <table className="w-full min-w-[900px] border-collapse table-fixed">
        <thead>
          <tr>
            <th className="border border-gray-300 bg-gray-100 p-3 w-24 text-center">
              Saat
            </th>
            {days.map((day) => (
              <th
                key={day}
                className="border border-gray-300 bg-gray-100 p-3 text-center"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {timeSlots.map((time) => (
            <tr key={time} className="h-24">
              <td className="border border-gray-300 bg-gray-50 text-center font-semibold align-top pt-3">
                {time}
              </td>

              {days.map((day) => {
                if (isCoveredByPreviousCourse(day, time)) {
                  return null;
                }

                const course = getCourseAtSlot(day, time);

                if (course) {
                  return (
                    <td
                      key={`${day}-${time}`}
                      rowSpan={getRowSpan(course.startTime, course.endTime)}
                      className={`border border-gray-300 align-top p-2 text-white ${course.color}`}
                    >
                      <div className="font-bold text-lg">{course.courseName}</div>
                      <div className="text-sm">
                        {course.startTime} - {course.endTime}
                      </div>
                      <div className="text-sm mt-1">{course.classroom || "-"}</div>
                      <div className="text-sm mt-1">{course.instructor || "-"}</div>
                    </td>
                  );
                }

                return (
                  <td
                    key={`${day}-${time}`}
                    className="border border-gray-300 bg-white"
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklySchedule;