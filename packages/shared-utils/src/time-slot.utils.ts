import { TIME_SLOT_UNIT } from '@repo/shared-types';

/**
 * 30분 단위 시간 슬롯 생성
 */
export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeStr);
    }
  }
  return slots;
};

/**
 * 시간 문자열을 분 단위로 변환
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * 분을 시간 문자열로 변환
 */
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * duration(시간)을 분으로 변환
 */
export const hoursToMinutes = (hours: number): number => {
  return hours * 60;
};

/**
 * 종료 시간 계산
 */
export const calculateEndTime = (startTime: string, duration: number): string => {
  const startMinutes = timeToMinutes(startTime);
  const durationMinutes = hoursToMinutes(duration);
  const endMinutes = startMinutes + durationMinutes;
  return minutesToTime(endMinutes);
};

/**
 * 시간대 겹침 검증
 */
export const isTimeSlotOverlapping = (
  slot1Start: string,
  slot1Duration: number,
  slot2Start: string,
  slot2Duration: number
): boolean => {
  const slot1StartMin = timeToMinutes(slot1Start);
  const slot1EndMin = slot1StartMin + hoursToMinutes(slot1Duration);

  const slot2StartMin = timeToMinutes(slot2Start);
  const slot2EndMin = slot2StartMin + hoursToMinutes(slot2Duration);

  return !(slot1EndMin <= slot2StartMin || slot2EndMin <= slot1StartMin);
};

/**
 * 근무 시간 포맷팅 (예: 1.5 -> "1.5시간", 2 -> "2시간")
 */
export const formatDuration = (duration: number): string => {
  return `${duration}시간`;
};

/**
 * 시간대 표시 문자열 생성 (예: "09:00 - 10:30")
 */
export const formatTimeSlot = (startTime: string, duration: number): string => {
  const endTime = calculateEndTime(startTime, duration);
  return `${startTime} - ${endTime}`;
};

/**
 * 유효한 근무 시간인지 검증 (0.5 단위)
 */
export const isValidDuration = (duration: number): boolean => {
  return duration > 0 && duration % TIME_SLOT_UNIT === 0;
};
