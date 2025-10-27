🔒 BÁO CÁO QUÉT BẢO MẬT TRIVY

_ID Lần Chạy:_ `{{RUN_ID}}`
_Chi tiết Workflow:_ {{WORKFLOW_URL}}
_Thời gian Quét:_ `{{SCAN_TIME}}`

---

_Tóm tắt kết quả:_

-  Bộ lọc severity: `CRITICAL`, `HIGH`
-  Tổng lỗ hổng (CRIT + HIGH): `{{VULN_COUNT}}`
-  Critical: `{{CRITICAL_COUNT}}`
-  High: `{{HIGH_COUNT}}`

---

_Chi tiết lỗ hổng phát hiện:_
{{VULNERABILITY_TABLE}}

_Kế hoạch hành động đề xuất:_

1. Xử lý ngay tất cả lỗ hổng CRITICAL (`{{CRITICAL_COUNT}}`)
2. Cập nhật các package lên bản đã vá
3. Áp dụng patch/workaround nếu chưa có bản vá chính thức

---

_Báo cáo được tạo tự động bởi Trivy Scanner_
