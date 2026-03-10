import { useMemo, useState } from "react";

const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];

const colorOptions = [
  { value: "bg-blue-500", label: "Mavi" },
  { value: "bg-green-500", label: "Yeşil" },
  { value: "bg-purple-500", label: "Mor" },
  { value: "bg-pink-500", label: "Pembe" },
  { value: "bg-orange-500", label: "Turuncu" },
  { value: "bg-red-500", label: "Kırmızı" },
  { value: "bg-teal-500", label: "Turkuaz" },
];

const timeOptions = [
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
  "18:00",
];

function CourseForm({ onAddCourse, courses }) {
  const initialState = {
    courseName: "",
    day: "Pazartesi",
    startTime: "",
    endTime: "",
    classroom: "",
    instructor: "",
    color: "bg-blue-500",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const parseHour = (time) => Number(time.split(":")[0]);

  const hasConflictForRange = (day, startTime, endTime) => {
    const newStart = parseHour(startTime);
    const newEnd = parseHour(endTime);

    return courses.some((course) => {
      if (course.day !== day) return false;

      const existingStart = parseHour(course.startTime);
      const existingEnd = parseHour(course.endTime);

      return newStart < existingEnd && newEnd > existingStart;
    });
  };

  const getAvailableStartTimes = (day) => {
    return timeOptions.filter((startTime, index) => {
      return timeOptions.slice(index + 1).some((endTime) => {
        return !hasConflictForRange(day, startTime, endTime);
      });
    });
  };

  const availableStartTimes = useMemo(() => {
    return getAvailableStartTimes(formData.day);
  }, [courses, formData.day]);

  const availableEndTimes = useMemo(() => {
    if (!formData.startTime) return [];

    const startIndex = timeOptions.indexOf(formData.startTime);

    return timeOptions.filter((endTime, index) => {
      if (index <= startIndex) return false;

      return !hasConflictForRange(formData.day, formData.startTime, endTime);
    });
  }, [courses, formData.day, formData.startTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "day") {
        const nextAvailableStartTimes = getAvailableStartTimes(value);
        const stillValidStart = nextAvailableStartTimes.includes(updated.startTime);

        if (!stillValidStart) {
          updated.startTime = "";
          updated.endTime = "";
        }
      }

      if (name === "startTime") {
        updated.endTime = "";
      }

      return updated;
    });

    setError("");
  };

  const validateTimes = () => {
    if (!formData.startTime || !formData.endTime) {
      return "Başlangıç ve bitiş saati seçilmelidir.";
    }

    if (formData.startTime >= formData.endTime) {
      return "Bitiş saati başlangıç saatinden büyük olmalıdır.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.courseName.trim() ||
      !formData.day ||
      !formData.startTime ||
      !formData.endTime
    ) {
      setError("Lütfen zorunlu alanları doldurun.");
      return;
    }

    const timeError = validateTimes();
    if (timeError) {
      setError(timeError);
      return;
    }

    const result = onAddCourse(formData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError("");
    setFormData(initialState);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Yeni Ders Ekle</h2>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 border border-red-300 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Ders Adı</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Örn: Veri Tabanı"
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Gün</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Başlangıç</label>
            <select
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Saat seçin</option>
              {timeOptions.map((time) => (
                <option
                  key={time}
                  value={time}
                  disabled={!availableStartTimes.includes(time)}
                >
                  {time}
                  {!availableStartTimes.includes(time) ? " (uygun değil)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Bitiş</label>
            <select
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              disabled={!formData.startTime}
              className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">Saat seçin</option>
              {timeOptions.map((time) => {
                const isDisabled =
                  !formData.startTime || !availableEndTimes.includes(time);

                return (
                  <option key={time} value={time} disabled={isDisabled}>
                    {time}
                    {isDisabled && formData.startTime ? " (uygun değil)" : ""}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Sistem çakışan saat aralıklarını otomatik olarak pasif hale getirir.
        </p>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Sınıf</label>
          <input
            type="text"
            name="classroom"
            value={formData.classroom}
            onChange={handleChange}
            placeholder="Örn: B201"
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Öğretim Görevlisi
          </label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Örn: Dr. Ayşe Yılmaz"
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Renk</label>
          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            {colorOptions.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
        >
          Ekle
        </button>
      </form>
    </div>
  );
}

export default CourseForm;