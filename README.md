# Python Calculator Project

Một project Python minimal với unit tests và CI/CD workflow.

## Cấu trúc project

```
.
├── calculator.py           # Module chính
├── tests/
│   ├── __init__.py        # Package init (tùy chọn)
│   └── test_calculator.py # Unit tests
├── .github/
│   └── workflows/
│       └── test.yml       # GitHub Actions workflow
├── requirements.txt        # Dependencies (nếu cần)
└── README.md              # Documentation
```

## Cài đặt

```bash
# Clone repository
git clone <your-repo-url>
cd <your-repo-name>

# (Optional) Tạo virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# hoặc
venv\Scripts\activate     # Windows
```

## Chạy tests

### Chạy tất cả tests:

```bash
python -m unittest discover -v
```

### Chạy một file test cụ thể:

```bash
python -m unittest tests.test_calculator -v
```

### Chạy một test case cụ thể:

```bash
python -m unittest tests.test_calculator.TestCalculator.test_add -v
```

### Với coverage:

```bash
pip install coverage
coverage run -m unittest discover -s tests
coverage report
coverage html  # Tạo HTML report
```

## CI/CD Workflow

### 🧪 Unit Test Workflow

GitHub Actions workflow tự động chạy unit tests với các tính năng:

-  ✅ **Chạy tự động**: Trên mọi Pull Request và push
-  📊 **Báo cáo chi tiết**: Hiển thị số lượng tests pass/fail, thời gian, và kết quả từng test
-  🎯 **Quality Gate**: Yêu cầu tỉ lệ pass ≥ 80% mới được merge
-  💬 **PR Comments**: Tự động post kết quả test lên PR dưới dạng comment
-  📈 **Coverage Tracking**: Theo dõi code coverage
-  🔄 **Smart Updates**: Cập nhật comment thay vì tạo mới

#### Pass Rate Requirement

```
Pass Rate = (Số tests Passed / Tổng số tests) × 100
```

**Yêu cầu:** Pass rate ≥ 80% để workflow trả về success.

**Ví dụ:**

-  ✅ 8/10 tests passed = 80% → SUCCESS
-  ❌ 7/10 tests passed = 70% → FAILED

#### Xem chi tiết

Đọc tài liệu đầy đủ tại [`.github/UNITTEST_WORKFLOW.md`](.github/UNITTEST_WORKFLOW.md)

### Workflows khác

-  **CodeQL**: Quét bảo mật code
-  **Trivy Scan**: Quét lỗ hổng bảo mật dependencies
-  **PR Agent**: Tự động review PR

## Sử dụng

```python
from calculator import Calculator

calc = Calculator()
result = calc.add(5, 3)
print(result)  # Output: 8
```

## License

MIT
