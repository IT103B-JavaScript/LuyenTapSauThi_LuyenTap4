# ĐÁNH GIÁ CHẤT LƯỢNG KỸ NĂNG – LẬP TRÌNH JAVASCRIPT
## THI CUỐI MÔN – [Mã đề: 007] – Công ty phần mềm TechViet
**Thời gian: 90 phút**

---

## Yêu cầu
- Xây dựng chương trình bằng JavaScript (chuẩn ES6+), chạy trong tab Console của trình duyệt; toàn bộ viết trong 01 file `app.js`.
- Chỉ dùng `let`, `const` để khai báo biến, không dùng `var`; không sử dụng thư viện bên ngoài hoặc kiến thức chưa học.
- Đặt tên biến, tên hàm theo camelCase, bằng tiếng Anh, có nghĩa; thụt lề chuẩn, mọi khối lệnh có đầy đủ dấu `{}`; có chú thích ngắn gọn mô tả nhiệm vụ của từng hàm.
- Đặt tên thư mục nộp bài: **HN_K25_[TênLớp]_[StudentName]** — thư mục chỉ chứa file `app.js`. *Ví dụ: HN_K25_CNTT5_NguyenVanA*
- Nộp bài lên LMS kèm link GitHub cá nhân.

## Thực hành

### 1. Bối cảnh
Công ty phần mềm TechViet cần chương trình quản lý hồ sơ nhân viên, chạy liên tục cho đến khi nhân viên phòng nhân sự chọn thoát. Chương trình cho phép:
- Hiển thị danh sách nhân viên.
- Thêm nhân viên mới.
- Cập nhật thông tin nhân viên.
- Xóa nhân viên.
- Tìm kiếm nhân viên theo phòng ban.
- Thoát chương trình.

### 2. Mục tiêu
Vận dụng mảng, object, function, vòng lặp, rẽ nhánh và xử lý chuỗi trong JavaScript để xây dựng chương trình menu thực hiện các thao tác CRUD trên danh sách nhân viên, kiểm tra dữ liệu nhập và xử lý đúng các trường hợp biên.

### 3. Tài liệu

#### 3.1 Dữ liệu khởi tạo
```js
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
```

| Thuộc tính | Ý nghĩa |
|---|---|
| **employeeCode** | Mã nhân viên, duy nhất, bắt đầu bằng "NV-" (string). |
| **fullName** | Họ tên (string). |
| **department** | Phòng ban (string). |
| **age** | Tuổi, số nguyên từ 18 đến 65 (number). |
| **experienceYears** | Số năm kinh nghiệm, số nguyên từ 0 đến 40 (number). |

- Mảng `employees` khai báo bên ngoài vòng lặp menu, dùng chung cho mọi chức năng.
- Nhập dữ liệu bằng `prompt()`, hiển thị bằng `console.log()`. `prompt()` trả về `null` khi người dùng bấm Cancel.

#### 3.2 Menu chương trình
```
=======================================================
   HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY TECHVIET
=======================================================
1. Hiển thị danh sách nhân viên
2. Thêm nhân viên mới
3. Cập nhật thông tin nhân viên
4. Xóa nhân viên
5. Tìm kiếm nhân viên theo phòng ban
0. Thoát chương trình
=======================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):
```

#### 3.3 Các hàm bắt buộc
| Hàm | Yêu cầu |
|---|---|
| **validateEmployeeCode(code)** | Trả về thông báo lỗi đầu tiên của mã nhân viên, hoặc "" nếu hợp lệ. |
| **findEmployeeIndex(code)** | Trả về vị trí nhân viên có mã code trong mảng, -1 nếu không có. |
| **normalizeText(rawText)** | Trả về chuỗi đã bỏ khoảng trắng thừa và viết hoa chữ cái đầu mỗi từ. |
| **inputIntegerInRange(message, min, max)** | Trả về số nguyên trong [min, max] (nhập lại khi sai); Cancel trả về null. |
| **displayEmployees(list)** | In danh sách nhân viên được truyền vào. |

- Mỗi chức năng trên menu viết thành một hàm riêng; `switch...case` chỉ gọi hàm tương ứng.

### 4. Yêu cầu nghiệp vụ
Mọi dữ liệu nhập phải được xóa khoảng trắng thừa ở hai đầu trước khi xử lý; mã nhân viên được chuyển sang chữ in hoa. Chương trình không được báo lỗi hoặc dừng đột ngột khi người dùng bấm Cancel (null).

#### 4.1. Menu điều hành
- Hiển thị lại menu sau mỗi chức năng. Chọn 0: in lời chào và kết thúc chương trình.
- Lựa chọn ngoài 0 – 5 (chuỗi rỗng, chữ cái, số thập phân, null): in thông báo lỗi và hiển thị lại menu.

#### 4.2. Case 1 – Hiển thị danh sách nhân viên
- Danh sách rỗng: in "Danh sách nhân viên trống".
- Mỗi nhân viên in gồm: STT, mã nhân viên, họ tên, phòng ban, tuổi, số năm kinh nghiệm.
- Cuối danh sách in tổng số nhân viên.

**Ví dụ:**
```
1. NV-001 - Võ Hoàng Nam - Phát Triển Phần Mềm
   Tuổi: 28 | Số năm kinh nghiệm: 5
2. NV-002 - Đỗ Thị Mai - Kiểm Thử Chất Lượng
   Tuổi: 35 | Số năm kinh nghiệm: 11
3. NV-003 - Huỳnh Gia Bảo - Nhân Sự Hành Chính
   Tuổi: 24 | Số năm kinh nghiệm: 1
Tổng: 3 nhân viên
```

#### 4.3. Case 2 – Thêm nhân viên mới
Nhập lần lượt: mã nhân viên, họ tên, phòng ban, tuổi, số năm kinh nghiệm. Bấm Cancel ở bất kỳ bước nào: hủy thao tác, danh sách không thay đổi.
- Mã nhân viên kiểm tra theo thứ tự, báo lỗi đầu tiên gặp phải: (1) không rỗng; (2) tối thiểu 6 ký tự; (3) bắt đầu bằng "NV-"; (4) không chứa khoảng trắng; (5) chưa tồn tại trong danh sách. Mã sai: in lỗi và quay về menu.
- Họ tên, phòng ban: không được rỗng (sai thì nhập lại); bỏ khoảng trắng thừa và viết hoa chữ cái đầu mỗi từ, ví dụ "  võ   hoàng nam " → "Võ Hoàng Nam".
- Tuổi: số nguyên từ 18 đến 65; số năm kinh nghiệm: số nguyên từ 0 đến 40. Sai thì in lỗi và nhập lại.
- Thêm nhân viên vào cuối danh sách và in đầy đủ thông tin nhân viên vừa thêm.

**Ví dụ kiểm tra mã nhân viên:**
| Nhập | Sau chuẩn hóa | Kết quả |
|---|---|---|
| " nv-004 " | "NV-004" | Hợp lệ |
| "nv" | "NV" | Lỗi: Độ dài nhỏ hơn 6 ký tự |
| "XX-0001" | "XX-0001" | Lỗi: Sai tiền tố "NV-" |
| "NV- 27" | "NV- 27" | Lỗi: Chứa khoảng trắng |
| " nv-002" | "NV-002" | Lỗi: Mã nhân viên đã tồn tại |
| "  " | "" | Lỗi: Chưa nhập mã nhân viên |
| null | – | Hủy thao tác thêm |

**Ví dụ nhập số năm kinh nghiệm (0 – 40):**
| Nhập | Kết quả |
|---|---|
| "" | Lỗi: chưa nhập, nhập lại |
| "abc" | Lỗi: không phải số nguyên, nhập lại |
| "-1" | Lỗi: ngoài phạm vi 0 – 40, nhập lại |
| "0.5" | Lỗi: không phải số nguyên, nhập lại |
| "41" | Lỗi: ngoài phạm vi 0 – 40, nhập lại |
| "0" | Hợp lệ |
| null | Hủy thao tác thêm |

#### 4.4. Case 3 – Cập nhật thông tin nhân viên
- Nhập mã nhân viên cần cập nhật. Không tìm thấy: in "Không tìm thấy nhân viên có mã [mã]".
- Tìm thấy: nhập tuổi mới và số năm kinh nghiệm mới (cùng điều kiện như Case 2). Bấm Cancel: nhân viên giữ nguyên giá trị cũ.
- In tuổi, số năm kinh nghiệm trước và sau khi cập nhật.

**Ví dụ (cột Trước/Sau ghi: tuổi / số năm kinh nghiệm):**
| Mã nhập | Trước | Sau | Kết quả |
|---|---|---|---|
| " nv-003 " | 24 / 1 | 25 / 2 | Cập nhật thành công |
| "NV-001" | 28 / 5 | 28 / 5 | Bấm Cancel – đã hủy cập nhật |
| "NV-009" | – | – | Không tìm thấy |

#### 4.5. Case 4 – Xóa nhân viên
- Nhập mã nhân viên cần xóa. Không tìm thấy: in "Không tìm thấy nhân viên có mã [mã]".
- Tìm thấy: hỏi xác nhận (Y/N). Chỉ "Y" hoặc "y" mới xóa; giá trị khác hoặc Cancel: in "Đã hủy thao tác xóa".
- Xóa thành công: in số nhân viên còn lại.

**Ví dụ:**
| Mã nhập | Xác nhận | Kết quả |
|---|---|---|
| "NV-002" | "n" | Đã hủy thao tác xóa, còn 3 nhân viên |
| " nv-002 " | " y " | Xóa thành công, còn 2 nhân viên |
| "NV-002" | – | Không tìm thấy nhân viên có mã NV-002 |
| "NV-003" | null | Đã hủy thao tác xóa, còn 2 nhân viên |

#### 4.6. Case 5 – Tìm kiếm nhân viên theo phòng ban
- Nhập từ khóa. Chuỗi rỗng hoặc Cancel: in "Chưa nhập từ khóa tìm kiếm".
- In các nhân viên có phòng ban chứa từ khóa, không phân biệt chữ hoa/thường. Không có kết quả: in "Không tìm thấy nhân viên phù hợp".

**Ví dụ:**
| Từ khóa | Số kết quả | Mã tìm thấy |
|---|---|---|
| "phần mềm" | 1 | NV-001 |
| "  KIỂM THỬ " | 1 | NV-002 |
| "kế toán" | 0 | Không tìm thấy nhân viên phù hợp |
| " " hoặc null | – | Chưa nhập từ khóa tìm kiếm |

#### 4.7. Chất lượng mã nguồn và xử lý trường hợp biên
- Chỉ dùng let/const; tên biến, tên hàm camelCase có nghĩa; mọi khối lệnh có đầy đủ dấu {}; có chú thích cho từng hàm.
- Có đủ các hàm ở mục 3.3; không lặp lại đoạn mã giữa các chức năng; không gán cứng (hard-code) kết quả theo testcase.
- Chương trình không báo lỗi hoặc dừng đột ngột với bất kỳ dữ liệu nhập nào.

#### 4.8. Điểm thưởng (tối đa +10 điểm)
- **Bonus 1 (+5):** Case 1 hỏi thêm cách hiển thị: theo thứ tự hiện tại hoặc sắp xếp theo số năm kinh nghiệm tăng dần. Việc sắp xếp không được làm thay đổi thứ tự các phần tử trong mảng `employees`.
- **Bonus 2 (+5):** khi chọn 0, in báo cáo gồm: tổng số nhân viên, số năm kinh nghiệm trung bình (làm tròn 1 chữ số thập phân) và nhân viên có số năm kinh nghiệm lớn nhất. Danh sách rỗng: in "Chưa có nhân viên nào". Ví dụ:
```
==================================================
BÁO CÁO TỔNG KẾT
==================================================
Tổng số nhân viên               : 3
Số năm kinh nghiệm trung bình   : 5.7
Số năm kinh nghiệm cao nhất     : NV-002 - Đỗ Thị Mai - 11
==================================================
```

### 5. Thang điểm chi tiết
| STT | Nghiệp vụ cần đạt được | Mô tả chi tiết nghiệp vụ | Điểm |
|---|---|---|---|
| 1 | Menu điều hành & tổ chức hàm | Menu lặp lại, thoát đúng khi chọn 0: 4 • switch...case đúng, có break/default: 3 • Bắt lỗi lựa chọn không hợp lệ: 3 • Mỗi chức năng là một hàm, đủ các hàm mục 3.3: 5 | 15 |
| 2 | Case 1 – Hiển thị danh sách | In đủ thông tin từng nhân viên: 5 • Xử lý danh sách rỗng: 2 • In tổng số nhân viên: 3 | 10 |
| 3 | Case 2 – Thêm nhân viên | Kiểm tra mã đúng 5 điều kiện, đúng thứ tự: 8 • Kiểm tra, chuẩn hóa họ tên, phòng ban: 6 • Kiểm tra tuổi, số năm kinh nghiệm đúng phạm vi, nhập lại khi sai: 8 • Thêm object đủ thuộc tính vào cuối danh sách: 4 • In thông tin nhân viên vừa thêm: 4 | 30 |
| 4 | Case 3 – Cập nhật nhân viên | Tìm theo mã, báo không tìm thấy: 4 • Nhập dữ liệu mới đúng điều kiện, Cancel giữ nguyên: 5 • Cập nhật đúng object trong mảng: 4 • In giá trị trước và sau: 2 | 15 |
| 5 | Case 4 – Xóa nhân viên | Tìm theo mã, báo không tìm thấy: 3 • Xác nhận Y/N đúng: 3 • Xóa đúng phần tử, in số còn lại: 4 | 10 |
| 6 | Case 5 – Tìm kiếm theo phòng ban | Kiểm tra từ khóa rỗng, null: 2 • Tìm đúng, không phân biệt hoa thường: 5 • In kết quả hoặc báo không tìm thấy: 3 | 10 |
| 7 | Chất lượng mã & trường hợp biên | let/const, camelCase, đủ dấu {}: 3 • Có chú thích cho từng hàm: 2 • Không lặp mã, không hard-code testcase: 5 | 10 |
| | **Tổng cộng** | | **100** |
| 8 | Điểm thưởng | Bonus 1 – hiển thị sắp xếp: +5 • Bonus 2 – báo cáo tổng kết: +5 • Điểm cuối cùng không vượt quá 100. | +10 |

### 6. Yêu cầu kỹ thuật
- Mọi chức năng thao tác trên cùng mảng `employees`.
- Không dùng thư viện bên ngoài; chỉ nộp file `app.js`.
- Giảng viên có thể dùng thêm dữ liệu kiểm thử ngoài các ví dụ trong đề.

*Lưu ý: điểm chức năng chỉ được tính khi chương trình chạy đúng và cho kết quả chính xác với các trường hợp kiểm thử tương ứng.*

---
*Bài làm mẫu: file `De007_QuanLyNhanVien_app.js` (đổi tên thành `app.js` khi nộp).*
