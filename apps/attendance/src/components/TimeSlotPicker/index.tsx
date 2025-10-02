import React, { useState } from 'react';
import { generateTimeSlots } from '@repo/shared-utils';

export interface TimeSlotPickerProps {
  selectedDate: string;
  selectedTime: string;
  duration: number;
  onTimeChange: (time: string) => void;
  onDurationChange: (duration: number) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  selectedTime,
  duration,
  onTimeChange,
  onDurationChange,
}) => {
  const timeSlots = generateTimeSlots();
  const durationOptions = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];

  return (
    <div className="time-slot-picker">
      <div className="form-group">
        <label>시작 시간 (30분 단위)</label>
        <select value={selectedTime} onChange={(e) => onTimeChange(e.target.value)}>
          <option value="">시간 선택</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>근무 시간</label>
        <select value={duration} onChange={(e) => onDurationChange(Number(e.target.value))}>
          <option value="">시간 선택</option>
          {durationOptions.map((dur) => (
            <option key={dur} value={dur}>
              {dur}시간
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
