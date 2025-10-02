/**
 * 데이터를 CSV 형식으로 변환
 */
export const convertToCSV = <T extends Record<string, any>>(
  data: T[],
  headers: { key: keyof T; label: string }[]
): string => {
  // CSV 헤더
  const headerRow = headers.map((h) => h.label).join(',');

  // CSV 데이터 행
  const dataRows = data.map((item) =>
    headers
      .map((h) => {
        const value = item[h.key];
        // 쉼표나 따옴표가 포함된 경우 처리
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      })
      .join(',')
  );

  return [headerRow, ...dataRows].join('\n');
};

/**
 * CSV 다운로드
 */
export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 엑셀 다운로드용 데이터 내보내기
 */
export const exportToExcel = <T extends Record<string, any>>(
  data: T[],
  headers: { key: keyof T; label: string }[],
  filename: string = 'export.csv'
): void => {
  const csv = convertToCSV(data, headers);
  downloadCSV(csv, filename);
};

/**
 * JSON 다운로드
 */
export const downloadJSON = <T>(data: T, filename: string): void => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
