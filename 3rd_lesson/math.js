// Vì mình không dùng được Math.js thật nên mình nhờ Gemini viết hộ một Math.js mini (không phải mình viết)
// Nhờ vậy mà mình không cần dùng evel()

(function() {
    "use strict";

    // 1. Bộ não tính toán
    window.math = {
        evaluate: function(expression) {
            try {
                let formula = expression
                    .replace(/×/g, '*').replace(/÷/g, '/')
                    .replace(/π/g, Math.PI).replace(/e/g, Math.E)
                    .replace(/√\(/g, 'Math.sqrt(').replace(/\^/g, '**');

                // Tự động chèn dấu nhân ẩn: 2(3) -> 2*(3)
                formula = formula.replace(/(\d)(\()|(\))(\d)|(\d)(Math.PI)|(Math.PI)(\d)/g, "$1$3$5$7*$2$4$6$8");

                const result = new Function(`return (${formula})`)();
                return isFinite(result) ? parseFloat(Number(result).toPrecision(10)) : "Lỗi chia 0";
            } catch (err) { return "Error"; }
        }
    };

    // 2. Logic "Hack" nút bấm ()
    // Chúng ta đợi cho đến khi file index.js của bạn tải xong thì sẽ ghi đè logic
    window.addEventListener('load', function() {
        // Kiểm tra xem hàm addString của bạn đã tồn tại chưa
        if (typeof window.addString === 'function') {
            const originalAddString = window.addString;

            // Ghi đè hàm addString
            window.addString = function(value) {
                const input = document.getElementById('input');
                
                // Nếu tham số truyền vào là "()"
                if (value === "()") {
                    const text = input.value;
                    const openCount = (text.match(/\(/g) || []).length;
                    const closeCount = (text.match(/\)/g) || []).length;
                    const lastChar = text.slice(-1);

                    // Logic: Nếu đang thiếu ngoặc đóng và ký tự cuối là số/ngoặc đóng thì đóng lại
                    if (openCount > closeCount && (!isNaN(lastChar) && lastChar !== "" || lastChar === ")")) {
                        input.value += ")";
                    } else {
                        input.value += "(";
                    }
                } else {
                    // Nếu là các nút khác thì chạy như cũ
                    originalAddString(value);
                }
            };
        }
    });
})();
