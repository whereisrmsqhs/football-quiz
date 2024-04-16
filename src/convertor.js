const fs = require("fs");
const xlsx = require("xlsx");

// 엑셀 파일을 JSON으로 변환하는 함수
function excelToJson(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // 첫 번째 시트 선택
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet, { header: ["key", "name"] });
  return jsonData;
}

// JSON 파일에 데이터 쓰는 함수
function writeJSONToFile(data, filename) {
  const jsonData = JSON.stringify(data, null, 2); // JSON 형식으로 변환 (들여쓰기 포함)
  fs.writeFileSync(filename, jsonData, "utf8");
  console.log(`JSON 파일 "${filename}"이 생성되었습니다.`);
}

// 엑셀 파일에서 데이터 읽기
const excelFilePath = "./list.xlsx"; // 입력할 엑셀 파일 경로
const jsonData = excelToJson(excelFilePath);

// JSON 파일에 데이터 쓰기
writeJSONToFile(jsonData, "output.json"); // 출력할 JSON 파일 경로
