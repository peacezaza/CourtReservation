import { useState, useEffect } from "react";

export default function DateTimeDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div className="text-base font-semibold text-gray-700"> 
      {formattedDate}
    </div>
  );
}
