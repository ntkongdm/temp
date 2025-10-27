## 🔒 Báo Cáo Quét Bảo Mật Trivy

**ID Lần Chạy:** `{{RUN_ID}}`
**Chi tiết Workflow:** [Xem tại đây]({{WORKFLOW_URL}})
**Thời gian Quét:** `{{SCAN_TIME}}`

---

### 📊 Tóm Tắt Kết Quả Quét

| Tiêu chí                          | Giá trị              |
| :-------------------------------- | :------------------- |
| 🎯 **Bộ Lọc Độ Nghiêm Trọng**     | `CRITICAL`, `HIGH`   |
| 📦 **Tổng Lỗ Hổng (CRIT + HIGH)** | `{{VULN_COUNT}}`     |
| 💥 **Critical (Nguy hiểm)**       | `{{CRITICAL_COUNT}}` |
| 🔶 **High (Nghiêm trọng)**        | `{{HIGH_COUNT}}`     |

---

{{#if HAS_VULNERABILITIES}}

### ⚠️ Chi Tiết Lỗ Hổng Phát Hiện

Đây là danh sách chi tiết các lỗ hổng tìm thấy dựa trên bộ lọc đã đặt:

{{VULNERABILITY_TABLE}}

---

### 🔧 Kế Hoạch Hành Động Đề Xuất

Để đảm bảo tính bảo mật, vui lòng thực hiện các bước sau:

1. **Ưu tiên:** Xem xét và xử lý ngay lập tức tất cả các lỗ hổng **CRITICAL** (`{{CRITICAL_COUNT}}`).
2. **Cập nhật:** Nâng cấp các gói bị ảnh hưởng lên phiên bản đã được vá lỗi.
3. **Khắc phục:** Kiểm tra và áp dụng các bản vá hoặc giải pháp thay thế tạm thời nếu chưa có bản cập nhật chính thức.

{{else}}

### ✅ Trạng Thái Bảo Mật Hiện Tại: Đạt

**Thông báo:** Không tìm thấy lỗ hổng nào thuộc mức độ `CRITICAL` hoặc `HIGH`.
**Trạng thái:** Mã nguồn và các dependencies đang ở trạng thái tốt.

{{/if}}

---

_<sub>🤖 Báo cáo được tạo tự động bởi Trivy Scanner.</sub>_
