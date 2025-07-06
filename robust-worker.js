/**
 * robust-worker.js
 * Một Web Worker được thiết kế để xử lý lỗi một cách an toàn.
 */

// Bắt các lỗi chưa được xử lý trong worker scope
self.onerror = function(message, source, lineno, colno, error) {
  console.error("Lỗi chưa được bắt trong Worker:", message, source, lineno, colno, error);
  // Gửi thông báo lỗi chi tiết về cho luồng chính
  self.postMessage({
    status: 'error',
    type: 'unhandled',
    message: message,
    source: source,
    lineno: lineno,
    colno: colno
  });
  // Trả về true để ngăn trình duyệt hiển thị lỗi mặc định
  return true;
};

// Lắng nghe các thông điệp từ luồng chính
self.onmessage = function(e) {
  const { command, data } = e.data;

  try {
    switch (command) {
      case 'longRunningTask':
        // Mô phỏng một tác vụ tốn thời gian
        const result = performLongTask(data);
        self.postMessage({
          status: 'success',
          command: command,
          result: result
        });
        break;

      case 'taskWithError':
        // Mô phỏng một tác vụ sẽ gây ra lỗi
        performErrorTask();
        break;
        
      case 'importScripts':
        // An toàn khi nhập các kịch bản khác
        importExternalScripts(data);
        self.postMessage({
            status: 'success',
            command: command,
            message: 'Các kịch bản đã được nhập thành công.'
        });
        break;

      default:
        // Gửi lại lỗi nếu lệnh không được nhận dạng
        throw new Error(`Lệnh không xác định: ${command}`);
    }
  } catch (err) {
    // Bắt và gửi các lỗi có thể đoán trước được
    self.postMessage({
      status: 'error',
      type: 'handled',
      command: command,
      message: err.message,
      stack: err.stack // Bao gồm cả stack trace để dễ gỡ lỗi
    });
  }
};

/**
 * Thực hiện một tác vụ tính toán nặng.
 * @param {any} input - Dữ liệu đầu vào cho tác vụ.
 * @returns {string} Kết quả của tác vụ.
 */
function performLongTask(input) {
  console.log('Worker bắt đầu tác vụ dài:', input);
  // Một ví dụ tính toán nặng
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return `Tác vụ dài đã hoàn thành với kết quả cuối cùng (chỉ là ví dụ): ${result}`;
}

/**
 * Một hàm được thiết kế để gây ra lỗi.
 */
function performErrorTask() {
  // Cố gắng truy cập một biến không xác định để tạo ra ReferenceError
  console.log(nonExistentVariable);
}

/**
 * Nhập các kịch bản bên ngoài một cách an toàn.
 * @param {string[]} scripts - Một mảng các URL kịch bản để nhập.
 */
function importExternalScripts(scripts) {
    if (!Array.isArray(scripts) || scripts.length === 0) {
        throw new Error('Không có kịch bản nào được cung cấp để nhập.');
    }
    try {
        self.importScripts(...scripts);
    } catch(e) {
        // Ném lại lỗi để khối try...catch bên ngoài có thể bắt được
        throw new Error(`Không thể nhập kịch bản: ${e.message}`);
    }
}


console.log("Worker đã sẵn sàng và đang chờ tin nhắn.");
