const Topic = require("../../models/Topic");
const ApiError = require("../../utils/apiError");

exports.createTopic = () => {
  try {
    const newTopic = new Topic({
      title: "Thuật Toán",
      content:
        "một tập hợp hữu hạn các hướng dẫn được xác định rõ ràng, có thể thực hiện được bằng máy tính, thường để giải quyết một lớp vấn đề hoặc để thực hiện một phép tính. Các thuật toán luôn rõ ràng và được sử dụng chỉ rõ việc thực hiện các phép tính, xử lý dữ liệu, suy luận tự động và các tác vụ khác.",
    });
    return newTopic.save();
  } catch (error) {
    throw new ApiError(500, "L��i tạo chủ đ��", error.message);
  }
};
