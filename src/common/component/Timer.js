import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "../../hooks/customHooks";

const padNumber = (number, length) =>
  String(parseInt(number)).padStart(length, "0");

export const Timer = ({
  hour = 0,
  minutes = 0,
  seconds = 0,
  callback = (f) => f,
}) => {
  const initialTime = useRef(hour * 3600 + minutes * 60 + seconds);
  const maxLength = 2;
  const [isRunning, setIsRunning] = useState(true);
  const [hh, setHh] = useState(padNumber(hour, maxLength));
  const [mm, setMm] = useState(padNumber(minutes, maxLength));
  const [ss, setSs] = useState(padNumber(seconds, maxLength));

  useInterval(
    () => {
      initialTime.current -= 1;
      setHh(padNumber(parseInt(initialTime.current / 3600), maxLength));
      setMm(padNumber(parseInt((initialTime.current % 3600) / 60), maxLength));
      setSs(padNumber(initialTime.current % 60, maxLength));
    },
    isRunning ? 1000 : null
  );

  useEffect(() => {
    if (initialTime.current <= 0) {
      setIsRunning(false);
      callback();
    }
  }, [ss]);

  return (
    <span>
      {hour !== 0 ? `${hh}:` : null}
      {hour !== 0 || minutes !== 0 ? `${mm}:` : null}
      {ss}
    </span>
  );
};
