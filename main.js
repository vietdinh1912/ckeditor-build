// main.js
// Kiểm tra xem trình duyệt có hỗ trợ Web Workers không
if (window.Worker) {
  const myWorker = new Worker('robust-worker.js');

  // Xử lý các thông điệp thành công từ worker
  myWorker.onmessage = function(e) {
    const { status, command, result, message } = e.data;
    if (status === 'success') {
      console.log(`[MAIN] Nhận được thành công từ lệnh '${command}':`, result || message);
    } else {
        // Điều này không nên xảy ra nếu lỗi được xử lý bởi 'onerror'
      console.warn('[MAIN] Nhận được thông điệp không phải lỗi nhưng không thành công:', e.data);
    }
  };

  // Xử lý các lỗi được gửi từ worker
  myWorker.onerror = function(event) {
    console.error(`[MAIN] Bắt được lỗi từ Worker:`);
    console.error(`- Tin nhắn: ${event.message}`);
    console.error(`- Tệp: ${event.filename}`);
    console.error(`- Dòng: ${event.lineno}`);
    event.preventDefault(); // Ngăn lỗi lan truyền thêm
  };
  
  // Gửi các lệnh khác nhau đến worker
  
  // 1. Chạy một tác vụ dài
  console.log('[MAIN] Gửi lệnh longRunningTask đến worker.');
  myWorker.postMessage({
    command: 'longRunningTask',
    data: { duration: 4000 }
  });

  // 2. Chạy một tác vụ sẽ gây ra lỗi
  setTimeout(() => {
    console.log('[MAIN] Gửi lệnh taskWithError đến worker.');
    myWorker.postMessage({
      command: 'taskWithError'
    });
  }, 2000);
  
  // 3. Yêu cầu nhập một kịch bản không tồn tại
  setTimeout(() => {
    console.log('[MAIN] Yêu cầu worker nhập một kịch bản không hợp lệ.');
    myWorker.postMessage({
        command: 'importScripts',
        data: ['path/to/non-existent-script.js']
    });
  }, 4000);


  // Tùy chọn: chấm dứt worker khi không còn cần thiết
  // setTimeout(() => {
  //   myWorker.terminate();
  //   console.log('[MAIN] Worker đã được chấm dứt.');
  // }, 10000);

} else {
  console.log('Trình duyệt của bạn không hỗ trợ Web Workers.');
}
