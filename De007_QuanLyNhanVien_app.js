/**
 * ĐỀ 007 - HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY TECHVIET
 * Bài làm: chương trình quản lý nhân viên chạy trong tab Console của trình duyệt.
 * Chuẩn ES6+, chỉ dùng let/const, không dùng thư viện ngoài.
 */

// ==================== DỮ LIỆU KHỞI TẠO ====================
// Mảng employees khai báo bên ngoài vòng lặp menu, dùng chung cho mọi chức năng
let employees = [
    { employeeCode: "NV-001", fullName: "Võ Hoàng Nam",
      department: "Phát Triển Phần Mềm",
      age: 28, experienceYears: 5 },
    { employeeCode: "NV-002", fullName: "Đỗ Thị Mai",
      department: "Kiểm Thử Chất Lượng",
      age: 35, experienceYears: 11 },
    { employeeCode: "NV-003", fullName: "Huỳnh Gia Bảo",
      department: "Nhân Sự Hành Chính",
      age: 24, experienceYears: 1 }
];

// Các hằng số ràng buộc dữ liệu
const CODE_PREFIX = "NV-";
const CODE_MIN_LENGTH = 6;
const MIN_AGE = 18;
const MAX_AGE = 65;
const MIN_EXPERIENCE_YEARS = 0;
const MAX_EXPERIENCE_YEARS = 40;

// ==================== CÁC HÀM BẮT BUỘC ====================

/**
 * Chuẩn hóa chuỗi: bỏ khoảng trắng thừa, viết hoa chữ cái đầu mỗi từ.
 * Ví dụ: "  võ   hoàng nam " -> "Võ Hoàng Nam"
 */
function normalizeText(rawText) {
    return rawText
        .trim()
        .split(" ")
        .filter((word) => word !== "")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

/**
 * Tìm vị trí nhân viên theo mã nhân viên (không phân biệt hoa/thường).
 * Trả về index trong mảng employees, -1 nếu không có.
 */
function findEmployeeIndex(code) {
    const searchCode = code.trim().toUpperCase();
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeCode.toUpperCase() === searchCode) {
            return i;
        }
    }
    return -1;
}

/**
 * Kiểm tra mã nhân viên theo đúng thứ tự 5 điều kiện.
 * Trả về thông báo lỗi đầu tiên gặp phải, hoặc "" nếu hợp lệ.
 */
function validateEmployeeCode(code) {
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === "") {
        return "Lỗi: Chưa nhập mã nhân viên";
    }
    if (normalizedCode.length < CODE_MIN_LENGTH) {
        return `Lỗi: Độ dài nhỏ hơn ${CODE_MIN_LENGTH} ký tự`;
    }
    if (!normalizedCode.startsWith(CODE_PREFIX)) {
        return `Lỗi: Sai tiền tố "${CODE_PREFIX}"`;
    }
    if (normalizedCode.includes(" ")) {
        return "Lỗi: Chứa khoảng trắng";
    }
    if (findEmployeeIndex(normalizedCode) !== -1) {
        return "Lỗi: Mã nhân viên đã tồn tại";
    }
    return "";
}

/**
 * Nhập một số nguyên trong đoạn [min, max], nhập sai thì báo lỗi và nhập lại.
 * Trả về số nguyên hợp lệ, hoặc null nếu người dùng bấm Cancel.
 */
function inputIntegerInRange(message, min, max) {
    while (true) {
        const rawValue = prompt(message);
        if (rawValue === null) {
            return null;
        }
        const trimmedValue = rawValue.trim();
        if (trimmedValue === "") {
            console.log("Lỗi: chưa nhập, nhập lại");
            continue;
        }
        const numberValue = Number(trimmedValue);
        if (!Number.isInteger(numberValue)) {
            console.log("Lỗi: không phải số nguyên, nhập lại");
            continue;
        }
        if (numberValue < min || numberValue > max) {
            console.log(`Lỗi: ngoài phạm vi ${min} – ${max}, nhập lại`);
            continue;
        }
        return numberValue;
    }
}

/**
 * Nhập chuỗi bắt buộc (không được rỗng), tự chuẩn hóa.
 * Trả về chuỗi đã chuẩn hóa, hoặc null nếu người dùng bấm Cancel.
 */
function inputRequiredText(message, fieldLabel) {
    while (true) {
        const rawValue = prompt(message);
        if (rawValue === null) {
            return null;
        }
        const normalizedValue = normalizeText(rawValue);
        if (normalizedValue === "") {
            console.log(`Lỗi: ${fieldLabel} không được để trống, nhập lại`);
            continue;
        }
        return normalizedValue;
    }
}

/**
 * In thông tin chi tiết của một nhân viên (dùng chung cho hiển thị, thêm, cập nhật).
 */
function printEmployee(item, orderNumber) {
    console.log(`${orderNumber}. ${item.employeeCode} - ${item.fullName} - ${item.department}`);
    console.log(`   Tuổi: ${item.age} | Số năm kinh nghiệm: ${item.experienceYears}`);
}

/**
 * In danh sách nhân viên được truyền vào và tổng số nhân viên ở cuối.
 */
function displayEmployees(list) {
    for (let i = 0; i < list.length; i++) {
        printEmployee(list[i], i + 1);
    }
    console.log(`Tổng: ${list.length} nhân viên`);
}

// ==================== CÁC CHỨC NĂNG MENU ====================

/**
 * Case 1: Hiển thị danh sách nhân viên.
 * Bonus 1: cho chọn hiển thị theo thứ tự hiện tại hoặc sắp xếp số năm kinh nghiệm tăng dần
 * (sắp xếp trên bản sao, không làm thay đổi mảng employees).
 */
function showEmployeeList() {
    if (employees.length === 0) {
        console.log("Danh sách nhân viên trống");
        return;
    }
    const displayMode = prompt(
        "Chọn cách hiển thị:\n1. Theo thứ tự hiện tại\n2. Sắp xếp theo số năm kinh nghiệm tăng dần"
    );
    const normalizedMode = displayMode === null ? "" : displayMode.trim();
    if (normalizedMode === "2") {
        const sortedList = [...employees].sort((a, b) => a.experienceYears - b.experienceYears);
        console.log("--- Danh sách nhân viên (số năm kinh nghiệm tăng dần) ---");
        displayEmployees(sortedList);
        return;
    }
    if (normalizedMode !== "1") {
        console.log("Lựa chọn không hợp lệ, hiển thị theo thứ tự hiện tại");
    }
    console.log("--- Danh sách nhân viên ---");
    displayEmployees(employees);
}

/**
 * Case 2: Thêm nhân viên mới vào cuối danh sách.
 * Bấm Cancel ở bất kỳ bước nào: hủy thao tác, danh sách không đổi.
 */
function addEmployee() {
    const cancelMessage = "Đã hủy thao tác thêm";

    const rawCode = prompt("Nhập mã nhân viên (bắt đầu bằng NV-):");
    if (rawCode === null) {
        console.log(cancelMessage);
        return;
    }
    const newCode = rawCode.trim().toUpperCase();
    const codeError = validateEmployeeCode(newCode);
    if (codeError !== "") {
        console.log(codeError);
        return;
    }

    const newName = inputRequiredText("Nhập họ tên:", "Họ tên");
    if (newName === null) {
        console.log(cancelMessage);
        return;
    }

    const newGroup = inputRequiredText("Nhập phòng ban:", "Phòng ban");
    if (newGroup === null) {
        console.log(cancelMessage);
        return;
    }

    const newAge = inputIntegerInRange(
        `Nhập tuổi (${MIN_AGE} - ${MAX_AGE}):`, MIN_AGE, MAX_AGE
    );
    if (newAge === null) {
        console.log(cancelMessage);
        return;
    }

    const newExperienceYears = inputIntegerInRange(
        `Nhập số năm kinh nghiệm (${MIN_EXPERIENCE_YEARS} - ${MAX_EXPERIENCE_YEARS}):`, MIN_EXPERIENCE_YEARS, MAX_EXPERIENCE_YEARS
    );
    if (newExperienceYears === null) {
        console.log(cancelMessage);
        return;
    }

    const newEmployee = {
        employeeCode: newCode,
        fullName: newName,
        department: newGroup,
        age: newAge,
        experienceYears: newExperienceYears,
    };
    employees.push(newEmployee);
    console.log("Thêm nhân viên thành công:");
    printEmployee(newEmployee, employees.length);
}

/**
 * Hỏi mã nhân viên và trả về index của nhân viên tìm được.
 * Trả về -1 nếu Cancel, chưa nhập hoặc không tìm thấy (đã in thông báo tương ứng).
 */
function askEmployeeIndex(actionName) {
    const rawCode = prompt(`Nhập mã nhân viên cần ${actionName}:`);
    if (rawCode === null) {
        console.log(`Đã hủy thao tác ${actionName}`);
        return -1;
    }
    const searchCode = rawCode.trim().toUpperCase();
    if (searchCode === "") {
        console.log("Lỗi: Chưa nhập mã nhân viên");
        return -1;
    }
    const foundIndex = findEmployeeIndex(searchCode);
    if (foundIndex === -1) {
        console.log(`Không tìm thấy nhân viên có mã ${searchCode}`);
    }
    return foundIndex;
}

/**
 * Case 3: Cập nhật tuổi và số năm kinh nghiệm của nhân viên.
 * Bấm Cancel: nhân viên giữ nguyên giá trị cũ. In giá trị trước và sau khi cập nhật.
 */
function updateEmployee() {
    const foundIndex = askEmployeeIndex("cập nhật");
    if (foundIndex === -1) {
        return;
    }
    const targetEmployee = employees[foundIndex];
    const oldAge = targetEmployee.age;
    const oldExperienceYears = targetEmployee.experienceYears;
    console.log(`Trước: Tuổi: ${oldAge} | Số năm kinh nghiệm: ${oldExperienceYears}`);

    const newAge = inputIntegerInRange(
        `Nhập tuổi mới (${MIN_AGE} - ${MAX_AGE}):`, MIN_AGE, MAX_AGE
    );
    if (newAge === null) {
        console.log("Bấm Cancel – đã hủy cập nhật");
        return;
    }
    const newExperienceYears = inputIntegerInRange(
        `Nhập số năm kinh nghiệm mới (${MIN_EXPERIENCE_YEARS} - ${MAX_EXPERIENCE_YEARS}):`, MIN_EXPERIENCE_YEARS, MAX_EXPERIENCE_YEARS
    );
    if (newExperienceYears === null) {
        console.log("Bấm Cancel – đã hủy cập nhật");
        return;
    }

    targetEmployee.age = newAge;
    targetEmployee.experienceYears = newExperienceYears;
    console.log("Cập nhật thành công");
    console.log(`Trước: Tuổi: ${oldAge} | Số năm kinh nghiệm: ${oldExperienceYears}`);
    console.log(`Sau  : Tuổi: ${targetEmployee.age} | Số năm kinh nghiệm: ${targetEmployee.experienceYears}`);
}

/**
 * Case 4: Xóa nhân viên theo mã, có xác nhận Y/N.
 * Chỉ "Y" hoặc "y" mới xóa; giá trị khác hoặc Cancel thì hủy.
 */
function deleteEmployee() {
    const foundIndex = askEmployeeIndex("xóa");
    if (foundIndex === -1) {
        return;
    }
    const targetEmployee = employees[foundIndex];
    const confirmAnswer = prompt(
        `Bạn có chắc muốn xóa ${targetEmployee.employeeCode} - ${targetEmployee.fullName}? (Y/N)`
    );
    const normalizedAnswer = confirmAnswer === null ? "" : confirmAnswer.trim();
    if (normalizedAnswer === "Y" || normalizedAnswer === "y") {
        employees.splice(foundIndex, 1);
        console.log(`Xóa thành công, còn ${employees.length} nhân viên`);
    } else {
        console.log(`Đã hủy thao tác xóa, còn ${employees.length} nhân viên`);
    }
}

/**
 * Case 5: Tìm nhân viên có phòng ban chứa từ khóa, không phân biệt hoa/thường.
 */
function searchEmployeesByDepartment() {
    const rawKeyword = prompt("Nhập từ khóa phòng ban cần tìm:");
    if (rawKeyword === null || rawKeyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }
    const keyword = normalizeText(rawKeyword).toLowerCase();
    const resultList = employees.filter((item) =>
        item.department.toLowerCase().includes(keyword)
    );
    if (resultList.length === 0) {
        console.log("Không tìm thấy nhân viên phù hợp");
        return;
    }
    console.log(`--- Kết quả tìm kiếm "${keyword}" ---`);
    displayEmployees(resultList);
}

/**
 * Bonus 2: In báo cáo tổng kết khi thoát chương trình.
 * Gồm tổng số nhân viên, số năm kinh nghiệm trung bình (1 chữ số thập phân) và nhân viên có số năm kinh nghiệm lớn nhất.
 */
function showSummaryReport() {
    const separator = "=".repeat(50);
    if (employees.length === 0) {
        console.log("Chưa có nhân viên nào");
        return;
    }
    let totalExperienceYears = 0;
    let topEmployee = employees[0];
    for (const item of employees) {
        totalExperienceYears += item.experienceYears;
        if (item.experienceYears > topEmployee.experienceYears) {
            topEmployee = item;
        }
    }
    const averageExperienceYears = (totalExperienceYears / employees.length).toFixed(1);

    console.log(separator);
    console.log("BÁO CÁO TỔNG KẾT");
    console.log(separator);
    console.log(`Tổng số nhân viên`.padEnd(32) + `: ${employees.length}`);
    console.log(`Số năm kinh nghiệm trung bình`.padEnd(32) + `: ${averageExperienceYears}`);
    console.log(
        `Số năm kinh nghiệm cao nhất`.padEnd(32) +
            `: ${topEmployee.employeeCode} - ${topEmployee.fullName} - ${topEmployee.experienceYears}`
    );
    console.log(separator);
}

// ==================== MENU ĐIỀU HÀNH ====================

/**
 * In menu chương trình.
 */
function displayMenu() {
    const separator = "=".repeat(55);
    console.log(separator);
    console.log("   HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY TECHVIET");
    console.log(separator);
    console.log("1. Hiển thị danh sách nhân viên");
    console.log("2. Thêm nhân viên mới");
    console.log("3. Cập nhật thông tin nhân viên");
    console.log("4. Xóa nhân viên");
    console.log("5. Tìm kiếm nhân viên theo phòng ban");
    console.log("0. Thoát chương trình");
    console.log(separator);
}

/**
 * Vòng lặp chính: hiển thị menu, đọc lựa chọn và gọi hàm tương ứng.
 * Lựa chọn ngoài 0 - 5 (rỗng, chữ, số thập phân, null) thì báo lỗi và hiện lại menu.
 */
function runProgram() {
    let isRunning = true;
    while (isRunning) {
        displayMenu();
        const rawChoice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");
        const choice = rawChoice === null ? "" : rawChoice.trim();
        switch (choice) {
            case "1":
                showEmployeeList();
                break;
            case "2":
                addEmployee();
                break;
            case "3":
                updateEmployee();
                break;
            case "4":
                deleteEmployee();
                break;
            case "5":
                searchEmployeesByDepartment();
                break;
            case "0":
                showSummaryReport();
                console.log("Cảm ơn bạn đã sử dụng chương trình. Tạm biệt!");
                isRunning = false;
                break;
            default:
                console.log("Lỗi: Lựa chọn không hợp lệ, vui lòng nhập số từ 0 đến 5");
                break;
        }
    }
}

runProgram();
