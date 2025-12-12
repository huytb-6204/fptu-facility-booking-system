import { useEffect, useState } from "react";
import { createBooking } from "../../api/bookingApi";
import { getCampuses, getBuildings, getRooms } from "../../api/roomApi";

export default function StudentBooking() {
  const [campuses, setCampuses] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const [date, setDate] = useState("");
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getCampuses().then(setCampuses).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedCampus) {
      getBuildings(selectedCampus).then(setBuildings).catch(console.error);
    }
  }, [selectedCampus]);

  useEffect(() => {
    if (selectedBuilding) {
      getRooms(selectedBuilding).then(setRooms).catch(console.error);
    }
  }, [selectedBuilding]);

  const handleBooking = async () => {
    try {
      await createBooking({
        user: userId,
        room: selectedRoom,
        date,
        startTime,
        endTime,
      });
      alert("Booking thành công!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Đặt phòng</h1>

      <div className="grid grid-cols-2 gap-4">
        <select className="border p-2" onChange={(e) => setSelectedCampus(e.target.value)}>
          <option>Chọn cơ sở</option>
          {campuses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select className="border p-2" onChange={(e) => setSelectedBuilding(e.target.value)}>
          <option>Chọn tòa nhà</option>
          {buildings.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <select className="border p-2" onChange={(e) => setSelectedRoom(e.target.value)}>
          <option>Chọn phòng</option>
          {rooms.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>

        <input type="date" className="border p-2" onChange={(e) => setDate(e.target.value)} />

        <input type="time" className="border p-2" onChange={(e) => setStart(e.target.value)} />
        <input type="time" className="border p-2" onChange={(e) => setEnd(e.target.value)} />
      </div>

      <button onClick={handleBooking} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
        Đặt phòng
      </button>
    </div>
  );
}
