exports.getYoutubeVideoId = (url) => {
  if (typeof url !== "string" || !url) {
    return null;
  }

  // Tạo đối tượng URL từ chuỗi URL
  let urlObject;
  try {
    urlObject = new URL(url);
  } catch (e) {
    return null;
  }

  // Kiểm tra xem URL có phải là youtube.com không
  if (
    urlObject.hostname.indexOf("youtube.com") === -1 &&
    urlObject.hostname.indexOf("youtu.be") === -1
  ) {
    return null;
  }

  // Lấy ID video từ URL
  if (urlObject.pathname.startsWith("/embed/")) {
    // URL có dạng /embed/{id}
    return urlObject.pathname.substring("/embed/".length);
  } else if (urlObject.pathname === "/watch") {
    // URL có dạng /watch?v={id}
    const videoId = urlObject.searchParams.get("v");
    if (videoId) {
      return videoId;
    }
  }

  // Không tìm thấy ID video
  return null;
};
