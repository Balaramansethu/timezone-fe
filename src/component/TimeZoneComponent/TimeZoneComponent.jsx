// src/components/TimeZoneComponent.js

import React, { useState } from "react";
import moment from "moment-timezone";

const TimeZoneComponent = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const handleStartTime = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndTime = (event) => {
    setEndDate(event.target.value);
  };

  const getTimezoneOptions = () => {
    const timezones = moment.tz.names();
    return timezones.map((timezone) => ({
      name: timezone,
      offset: moment.tz(timezone).format("Z"),
    }));
  };

  const saveData = () => {
    // Assuming you are using fetch API to send data to backend
    fetch("/api/save-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timezone: selectedTimezone,
        startDate,
        endDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Optionally, you can reset form fields here
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        // Handle error
      });
  };

  return (
    <div>
      <h2>Timezone Selector</h2>
      <select value={selectedTimezone} onChange={handleTimezoneChange}>
        <option value="">Select a Timezone</option>
        {getTimezoneOptions().map((option) => (
          <option key={option.name} value={option.name}>
            {`${option.name} (GMT${option.offset})`}
          </option>
        ))}
      </select>
      {selectedTimezone && (
        <p>
          Current time in {selectedTimezone}:{" "}
          {moment().tz(selectedTimezone).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      )}

      <div>
        <p>
          Start Date{" "}
          <input type="datetime-local" value={startDate} onChange={handleStartTime} />
        </p>
        <p>
          End Date{" "}
          <input type="datetime-local" value={endDate} onChange={handleEndTime} />
        </p>
        <button onClick={saveData}>Save Data</button>
      </div>
    </div>
  );
};

export default TimeZoneComponent;
